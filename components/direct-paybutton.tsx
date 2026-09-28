'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

const PAYBUTTON_URL = 'https://mypos.com/vmp/btn/BMFVSS4N9BP85'

export function DirectPayButton() {
  const [email, setEmail] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [digitalConsent, setDigitalConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    if (!termsAccepted || !digitalConsent) {
      setError('Моля, потвърдете Общите условия и изричното съгласие за дигитална доставка.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/paybutton-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, customerName, termsAccepted, digitalContentConsent: digitalConsent }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Неуспешно стартиране на плащането.')
      window.location.assign(PAYBUTTON_URL)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Възникна грешка.')
      setLoading(false)
    }
  }

  return <form className="checkout-form" onSubmit={submit}>
    <div className="checkout-fields">
      <label><span>ИМЕ</span><input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Вашето име" autoComplete="name" required /></label>
      <label><span>ИМЕЙЛ</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></label>
    </div>
    <div className="consent-box">
      <label className="consent-row">
        <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />
        <span>Приемам <a href="/legal#terms" target="_blank" rel="noopener noreferrer">Общите условия</a> и съм запознат/а с крайната цена €149, начина и срока на доставка.</span>
      </label>
      <label className="consent-row">
        <input type="checkbox" checked={digitalConsent} onChange={(e) => setDigitalConsent(e.target.checked)} required />
        <span>Изрично искам дигиталното съдържание да бъде доставено след потвърждение на плащането и разбирам, че при започване на доставката губя правото на отказ, когато законовите условия за това са изпълнени.</span>
      </label>
      <p>Личните данни се обработват за покупката и свързаните законови задължения. <a href="/legal#privacy" target="_blank" rel="noopener noreferrer">Политика за поверителност</a>.</p>
    </div>
    {error && <p className="checkout-error" role="alert">{error}</p>}
    <button className="button primary checkout-submit" type="submit" disabled={loading}>
      {loading ? <><Loader2 className="spin" /> Прехвърляне към myPOS...</> : <>КУПИ ЗА €149 <ArrowRight /></>}
    </button>
    <small className="checkout-note">Плащането се извършва на защитената страница на myPOS PayButton. В myPOS може да бъдете помолени да потвърдите отново контактните си данни.</small>
  </form>
}
