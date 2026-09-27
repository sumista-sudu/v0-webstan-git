import Link from 'next/link'
import { CheckCircle2, Clock3 } from 'lucide-react'

export default function CheckoutSuccess() {
  return <main className="site-shell detail-page"><header className="topbar"><Link href="/" className="brand"><span>STANISLAV ILIEV</span><strong>WORKFLOWS <i>&amp;</i> AUTOMATIONS</strong></Link></header><section className="detail-hero section-pad"><div className="section-kicker"><span>PAYMENT</span><span>RETURNED FROM myPOS</span></div><h1>Плащането е прието за обработка.</h1><p>Сървърът потвърждава плащането чрез myPOS. След потвърждението ще получите продукта PDF и фактурния документ на имейла, който сте посочили при поръчката.</p><div className="detail-meta"><span>STATUS</span><strong><Clock3 /> Доставка след server-side confirmation</strong><Link href="/" className="button primary">Към ресурсите</Link></div></section></main>
}
