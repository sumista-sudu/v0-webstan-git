import Link from 'next/link'
import { Clock3 } from 'lucide-react'

export default function CheckoutSuccess() {
  return <main id="main-content" className="site-shell detail-page">
    <header className="topbar"><Link href="/" className="brand"><span>STANISLAV ILIEV</span><strong>WORKFLOWS <i>&amp;</i> AUTOMATIONS</strong></Link></header>
    <section className="detail-hero section-pad">
      <div className="section-kicker"><span>PAYMENT</span><span>RETURNED FROM myPOS</span></div>
      <h1>Плащането е прието за обработка.</h1>
      <p>Връщането от myPOS не е само по себе си доказателство за платена поръчка. При API Checkout доставката започва след валидирано server-to-server известие от myPOS. Потвърждението и продуктът се изпращат на имейла от поръчката.</p>
      <div className="detail-meta"><span>STATUS</span><strong><Clock3 /> Доставка след server-side confirmation</strong><Link href="/" className="button primary">Към ресурсите</Link></div>
    </section>
  </main>
}
