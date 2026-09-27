import { NextResponse } from 'next/server'
import { getPrice, getCurrency, findProductBlob, getMyPosClient, getSiteUrl, newOrderId, saveOrder, splitCustomerName } from '@/lib/commerce'
import { resources } from '@/lib/resources'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const slug = String(body.slug ?? '')
    const email = String(body.email ?? '').trim().toLowerCase()
    const customerName = String(body.customerName ?? '').trim()
    const resource = resources.find((item) => item.slug === slug)

    if (!resource) return NextResponse.json({ error: 'Невалиден продукт.' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Моля, въведете валиден имейл.' }, { status: 400 })
    if (customerName.length < 2) return NextResponse.json({ error: 'Моля, въведете име.' }, { status: 400 })

    const amount = getPrice(resource)
    if (!amount) return NextResponse.json({ error: 'Този продукт все още не е конфигуриран за продажба.' }, { status: 503 })

    const productPath = await findProductBlob(resource)
    const orderId = newOrderId()
    const invoiceNumber = 'INV-' + orderId
    const currency = getCurrency()
    const { firstNames, familyName } = splitCustomerName(customerName)
    const client = getMyPosClient()

    const fields = await client.generateCheckoutFields({
      orderId,
      amount: Number(amount),
      currency,
      urlOk: getSiteUrl() + '/checkout/success?orderId=' + encodeURIComponent(orderId),
      urlCancel: getSiteUrl() + '/checkout/cancel?orderId=' + encodeURIComponent(orderId),
      urlNotify: getSiteUrl() + '/api/payment/notify',
      cartItems: [{ name: resource.title, quantity: 1, price: Number(amount) }],
      customer: { email, firstNames, familyName },
    })

    await saveOrder({
      id: orderId,
      slug: resource.slug,
      title: resource.title,
      email,
      customerName,
      amount,
      currency,
      productPath,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      invoiceNumber,
    })

    return NextResponse.json({ endpoint: client.checkoutUrl, fields })
  } catch (error) {
    console.error('myPOS checkout error', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Checkout error' }, { status: 500 })
  }
}
