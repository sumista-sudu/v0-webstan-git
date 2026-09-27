'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

export function CheckoutButton({ slug, amount, currency }: { slug: string; amount: string | null; currency: string }) {
  const [email, setEmail] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, email, customerName }),
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

  if (!amount) {
    return <button className="button primary" type="button" disabled>Продажбата не е конфигурирана</button>
  }

  return <form className="checkout-form" onSubmit={submit}>
    <div className="checkout-fields">
      <label><span>ИМЕ</span><input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Вашето име" required /></label>
      <label><span>ИМЕЙЛ</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></label>
    </div>
    {error && <p className="checkout-error">{error}</p>}
    <button className="button primary checkout-submit" type="submit" disabled={loading}>
      {loading ? <><Loader2 className="spin" /> Прехвърляне към myPOS...</> : <>Плати {amount} {currency} <ArrowRight /></>}
    </button>
  </form>
}
