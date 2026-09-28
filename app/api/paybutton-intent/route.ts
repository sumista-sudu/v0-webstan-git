import { NextResponse } from 'next/server'
import { findProductBlob, newOrderId, saveOrder } from '@/lib/commerce'
import { assertLegalReady } from '@/lib/legal'
import { resources } from '@/lib/resources'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    assertLegalReady()
    const body = await request.json()
    const email = String(body.email ?? '').trim().toLowerCase()
    const customerName = String(body.customerName ?? '').trim()
    const termsAccepted = Boolean(body.termsAccepted)
    const digitalContentConsent = Boolean(body.digitalContentConsent)
    const billing = body.billing && typeof body.billing === 'object' ? {
      companyName: String(body.billing.companyName ?? '').trim(),
      uic: String(body.billing.uic ?? '').trim(),
      vatId: String(body.billing.vatId ?? '').trim(),
      address: String(body.billing.address ?? '').trim(),
    } : undefined

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Моля, въведете валиден имейл.' }, { status: 400 })
    if (customerName.length < 2) return NextResponse.json({ error: 'Моля, въведете име.' }, { status: 400 })
    if (!termsAccepted || !digitalContentConsent) return NextResponse.json({ error: 'Необходимо е да приемете условията и да дадете изричното съгласие за дигитална доставка.' }, { status: 400 })
    if (billing && (!billing.companyName || !billing.uic || !billing.address)) return NextResponse.json({ error: 'Непълни данни за фирмена фактура.' }, { status: 400 })

    const product = resources.find((item) => item.slug === 'ai-bug-bounty-playbook')
    if (!product) return NextResponse.json({ error: 'Продуктът не е конфигуриран.' }, { status: 500 })

    const id = newOrderId()
    const consentAt = new Date().toISOString()
    const productPath = await findProductBlob(product)

    await saveOrder({
      id,
      slug: product.slug,
      title: product.title,
      email,
      customerName,
      ...(billing ? { billing } : {}),
      amount: '149.00',
      currency: 'EUR',
      productPath,
      paymentMethod: 'MYPOS_PAYBUTTON',
      status: 'PENDING',
      createdAt: consentAt,
      invoiceNumber: 'INV-' + id,
      termsAcceptedAt: consentAt,
      digitalContentConsentAt: consentAt,
      consentVersion: process.env.LEGAL_POLICY_VERSION?.trim() || '2026-09-28',
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('PayButton intent error', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Payment initialization error' }, { status: 500 })
  }
}
