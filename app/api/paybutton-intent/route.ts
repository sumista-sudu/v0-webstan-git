import { NextResponse } from 'next/server'
import { findProductBlob, newOrderId, saveOrder, splitCustomerName } from '@/lib/commerce'
import { assertLegalReady } from '@/lib/legal'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    assertLegalReady()
    const body = await request.json()
    const email = String(body.email ?? '').trim().toLowerCase()
    const customerName = String(body.customerName ?? '').trim()
    const termsAccepted = Boolean(body.termsAccepted)
    const digitalConsent = Boolean(body.digitalConsent)

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Моля, въведете валиден имейл.' }, { status: 400 })
    }
    if (customerName.length < 2) {
      return NextResponse.json({ error: 'Моля, въведете име.' }, { status: 400 })
    }
    if (!termsAccepted || !digitalConsent) {
      return NextResponse.json({ error: 'Необходимо е да приемете условията и да дадете изричното съгласие за дигитална доставка.' }, { status: 400 })
    }

    const resource = 'ai-bug-bounty-playbook'
    const productPath = await findProductBlob({
      slug: resource,
      assetAliases: ['AI-Bug-Bounty-Playbook', 'ai-bug-bounty-playbook'],
    } as any)

    const id = newOrderId()
    const { firstNames, familyName } = splitCustomerName(customerName)
    void firstNames
    void familyName

    await saveOrder({
      id,
      slug: resource,
      title: 'AI-BUG-BOUNTY-PLAYBOOK',
      email,
      customerName,
      amount: '149.00',
      currency: 'EUR',
      productPath,
      paymentMethod: 'MYPOS_PAYBUTTON',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      invoiceNumber: 'INV-' + id,
      termsAcceptedAt: new Date().toISOString(),
      digitalContentConsentAt: new Date().toISOString(),
      consentVersion: '2026-09-28',
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('PayButton intent error', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Payment initialization error' }, { status: 500 })
  }
}
