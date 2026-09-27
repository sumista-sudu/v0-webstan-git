import { NextResponse } from 'next/server'
import { getPrice, getCurrency, findProductBlob, getMyPosEndpoint, getSiteUrl, newOrderId, requiredSeller, saveOrder, signMyPos, splitCustomerName } from '@/lib/commerce'
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
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return NextResponse.json({ error: 'Моля, въведете валиден имейл.' }, { status: 400 })
    if (customerName.length < 2) return NextResponse.json({ error: 'Моля, въведете име.' }, { status: 400 })

    const amount = getPrice(resource)
    if (!amount) return NextResponse.json({ error: 'Този продукт все още не е конфигуриран за продажба.' }, { status: 503 })

    const productPath = await findProductBlob(resource)
    const orderId = newOrderId()
    const invoiceNumber = 'INV-' + orderId
    const currency = getCurrency()
    const { firstNames, familyName } = splitCustomerName(customerName)

    const fields: Record<string, string> = {
      IPCmethod: 'IPCPurchase',
      IPCVersion: '1.4',
      IPCLanguage: process.env.MYPOS_LANGUAGE?.trim() || 'EN',
      SID: requiredSeller('MYPOS_STORE_ID', ''),
      WalletNumber: requiredSeller('MYPOS_WALLET_NUMBER', ''),
      Amount: amount,
      Currency: currency,
      OrderID: orderId,
      URL_OK: getSiteUrl() + '/checkout/success?orderId=' + encodeURIComponent(orderId),
      URL_Cancel: getSiteUrl() + '/checkout/cancel?orderId=' + encodeURIComponent(orderId),
      URL_Notify: getSiteUrl() + '/api/payment/notify',
      CardTokenRequest: '0',
      KeyIndex: requiredSeller('MYPOS_KEY_INDEX', ''),
      PaymentParametersRequired: '1',
      CustomerEmail: email,
      CustomerFirstNames: firstNames,
      CustomerFamilyName: familyName,
      Note: 'Digital product order ' + orderId,
      Source: 'Stanislav Iliev — Workflows & Automations',
      CartItems: '1',
      Article_1: resource.title,
      Quantity_1: '1',
      Price_1: amount,
      Currency_1: currency,
      Amount_1: amount,
    }

    if (!fields.SID || !fields.WalletNumber || !fields.KeyIndex) {
      throw new Error('Missing myPOS Store ID, Wallet Number or Key Index')
    }

    fields.Signature = signMyPos(fields)

    const order = {
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
    } as const

    await saveOrder(order)

    return NextResponse.json({
      endpoint: getMyPosEndpoint(),
      fields,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Checkout error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
