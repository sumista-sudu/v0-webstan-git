import { NextResponse } from 'next/server'
import { readOrder, readPrivatePdf, saveOrder, verifyMyPos } from '@/lib/commerce'
import { makeInvoicePdf } from '@/lib/invoice'
import { sendOrderEmail } from '@/lib/resend'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const raw = await request.text()
    const params = new URLSearchParams(raw)
    const fields = Array.from(params.entries())

    if (!verifyMyPos(fields)) {
      return new Response('Invalid signature', { status: 400, headers: { 'Content-Type': 'text/plain' } })
    }

    const orderId = params.get('OrderID')
    const amount = params.get('Amount')
    const currency = params.get('Currency')
    const transactionRef = params.get('IPC_Trnref') || undefined

    if (!orderId || !amount || !currency) return new Response('Missing payment fields', { status: 400 })

    const order = await readOrder(orderId)
    if (order.amount !== Number(amount).toFixed(2) || order.currency !== currency) {
      return new Response('Payment mismatch', { status: 400 })
    }

    if (order.deliverySentAt) {
      return new Response('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } })
    }

    const paidOrder = {
      ...order,
      status: 'PAID',
      paidAt: new Date().toISOString(),
      transactionRef,
    } as const

    await saveOrder(paidOrder)

    try {
      const { buffer: productBuffer } = await readPrivatePdf(order.productPath)
      const invoiceBuffer = makeInvoicePdf(paidOrder)
      await sendOrderEmail(paidOrder, productBuffer, invoiceBuffer)
      await saveOrder({ ...paidOrder, deliverySentAt: new Date().toISOString(), status: 'PAID' })
    } catch (deliveryError) {
      await saveOrder({ ...paidOrder, status: 'DELIVERY_FAILED' })
      console.error('Digital delivery failed', deliveryError)
      return new Response('Delivery failed', { status: 500 })
    }

    return new Response('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } })
  } catch (error) {
    console.error('myPOS notify error', error)
    return new Response('Server error', { status: 500 })
  }
}
