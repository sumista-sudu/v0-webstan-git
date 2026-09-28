import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function CheckoutCancel() {
  return <main id="main-content" className="site-shell detail-page"><header className="topbar"><Link href="/" className="brand"><span>STANISLAV ILIEV</span><strong>WORKFLOWS <i>&amp;</i> AUTOMATIONS</strong></Link></header><section className="detail-hero section-pad"><div className="section-kicker"><span>PAYMENT</span><span>CHECKOUT CANCELLED</span></div><h1>Плащането не е завършено.</h1><p>Можете да се върнете към ресурса и да стартирате нова поръчка.</p><div className="detail-meta"><span>STATUS</span><strong><XCircle /> CANCELLED</strong><Link href="/" className="button primary">Към ресурсите</Link></div></section></main>
}
