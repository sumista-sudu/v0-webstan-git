import { readOrder, readPrivatePdf, saveOrder, getMyPosClient } from '@/lib/commerce'
import { makeInvoicePdf } from '@/lib/invoice'
import { sendOrderEmail } from '@/lib/resend'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const raw = await request.text()
    const params = Object.fromEntries(new URLSearchParams(raw))
    const client = getMyPosClient()
    const result = await client.validateNotification(params)

    if (!result.success) {
      console.error('myPOS payment validation failed:', result.error)
      return new Response('Invalid payment notification', { status: 400 })
    }

    const { orderId, amount, currency, transactionRef } = result.data
    if (!orderId || amount == null || !currency) return new Response('Missing payment fields', { status: 400 })

    const order = await readOrder(orderId)
    if (order.amount !== Number(amount).toFixed(2) || order.currency !== currency) {
      return new Response('Payment mismatch', { status: 400 })
    }

    if (order.deliverySentAt) return new Response('OK', { status: 200 })

    const paidOrder = { ...order, status: 'PAID' as const, paidAt: new Date().toISOString(), transactionRef }
    await saveOrder(paidOrder)

    try {
      const { buffer: productBuffer } = await readPrivatePdf(order.productPath)
      const invoiceBuffer = makeInvoicePdf(paidOrder)
      await sendOrderEmail(paidOrder, productBuffer, invoiceBuffer)
      await saveOrder({ ...paidOrder, deliverySentAt: new Date().toISOString() })
    } catch (deliveryError) {
      await saveOrder({ ...paidOrder, status: 'DELIVERY_FAILED' })
      console.error('Digital delivery failed', deliveryError)
      return new Response('Delivery failed', { status: 500 })
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('myPOS notify error', error)
    return new Response('Server error', { status: 500 })
  }
}
