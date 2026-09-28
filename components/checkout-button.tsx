'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

export function CheckoutButton({ slug, amount, currency }: { slug: string; amount: string | null; currency: string }) {
  const [email, setEmail] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [isBusiness, setIsBusiness] = useState(false)
  const [billing, setBilling] = useState({ companyName: '', uic: '', vatId: '', address: '' })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [digitalContentConsent, setDigitalContentConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    if (!termsAccepted || !digitalContentConsent) {
      setError('Моля, потвърдете Общите условия и изричното съгласие за дигитална доставка.')
      return
    }
    if (isBusiness && (!billing.companyName.trim() || !billing.uic.trim() || !billing.address.trim())) {
      setError('За фирмена фактура са нужни име на фирмата, ЕИК/регистрационен номер и адрес.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, email, customerName, termsAccepted, digitalContentConsent, billing: isBusiness ? billing : undefined }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Неуспешно стартиране на плащането.')

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = data.endpoint
      form.style.display = 'none'
      Object.entries(data.fields as Record<string, string>).forEach(([name, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        form.appendChild(input)
      })
      document.body.appendChild(form)
      form.submit()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Възникна грешка.')
      setLoading(false)
    }
  }

  if (!amount) return <button className="button primary" type="button" disabled>Продажбата не е конфигурирана</button>

  return <form className="checkout-form" onSubmit={submit}>
    <div className="checkout-fields">
      <label><span>ИМЕ</span><input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Вашето име" autoComplete="name" required /></label>
      <label><span>ИМЕЙЛ</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></label>
    </div>
    <label className="business-toggle"><input type="checkbox" checked={isBusiness} onChange={(e) => setIsBusiness(e.target.checked)} /> Искам фирмена фактура</label>
    {isBusiness && <div className="billing-fields">
      <label><span>ФИРМА</span><input value={billing.companyName} onChange={(e) => setBilling({ ...billing, companyName: e.target.value })} autoComplete="organization" required /></label>
      <label><span>ЕИК / REG. NO.</span><input value={billing.uic} onChange={(e) => setBilling({ ...billing, uic: e.target.value })} required /></label>
      <label><span>VAT ID (ако е приложимо)</span><input value={billing.vatId} onChange={(e) => setBilling({ ...billing, vatId: e.target.value })} /></label>
      <label className="billing-wide"><span>АДРЕС НА ФИРМАТА</span><input value={billing.address} onChange={(e) => setBilling({ ...billing, address: e.target.value })} autoComplete="street-address" required /></label>
    </div>}
    <div className="consent-box">
      <label className="consent-row"><input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required /><span>Приемам <a href="/legal#terms" target="_blank" rel="noopener noreferrer">Общите условия</a> и съм запознат/а с крайната цена, начина и срока на доставка.</span></label>
      <label className="consent-row"><input type="checkbox" checked={digitalContentConsent} onChange={(e) => setDigitalContentConsent(e.target.checked)} required /><span>Изрично искам дигиталното съдържание да бъде доставено веднага след потвърждение на плащането и разбирам, че след започване на доставката губя правото на отказ, когато законовите условия за това са изпълнени.</span></label>
      <p>Личните данни се обработват за изпълнение на покупката и свързаните законови задължения. <a href="/legal#privacy" target="_blank" rel="noopener noreferrer">Политика за поверителност</a>.</p>
    </div>
    {error && <p className="checkout-error" role="alert">{error}</p>}
    <button className="button primary checkout-submit" type="submit" disabled={loading}>{loading ? <><Loader2 className="spin" /> Прехвърляне към myPOS...</> : <>Плати {amount} {currency} <ArrowRight /></>}</button>
    <small className="checkout-note">Плащането се извършва на защитената страница на myPOS.</small>
  </form>
}
