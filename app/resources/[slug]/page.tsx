import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, CircleDot } from 'lucide-react'
import { resources } from '@/lib/resources'
import { getCurrency, getPrice } from '@/lib/commerce'
import { CheckoutButton } from '@/components/checkout-button'
import { DirectPayButton } from '@/components/direct-paybutton'
import { getLegalConfig } from '@/lib/legal'

export function generateStaticParams() { return resources.map((resource) => ({ slug: resource.slug })) }

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resource = resources.find((item) => item.slug === slug) ?? resources[0]
  const price = getPrice(resource)
  const currency = getCurrency()
  const legal = getLegalConfig()
  const isPayButton = resource.slug === 'ai-bug-bounty-playbook'

  return <main className="site-shell detail-page">
    <header className="topbar">
      <Link href="/" className="brand"><span>STANISLAV ILIEV</span><strong>WORKFLOWS <i>&amp;</i> AUTOMATIONS</strong></Link>
      <Link href="/" className="back-link"><ArrowLeft /> Back to resources</Link>
    </header>

    <section className="detail-hero section-pad">
      <div className="section-kicker"><span>{resource.number}</span><span>{resource.badge}</span></div>
      <h1>{resource.title}</h1>
      <p>{resource.description}</p>
      <div className="detail-meta">
        <span>PRICE</span>
        <strong>{isPayButton ? '149 EUR' : price ? price + ' ' + currency : 'Цена — очаквайте скоро'}</strong>
        {isPayButton ? <DirectPayButton /> : <CheckoutButton slug={resource.slug} amount={price} currency={currency} />}
      </div>
      <div className="seller-summary">
        <strong>{legal.sellerName}</strong>
        <span>{legal.address || 'Адресът на търговеца ще бъде показан след конфигурация.'}</span>
        <span>{legal.email} · {legal.phone}</span>
        <span>{legal.priceTaxNote || 'Данъчната информация за цената трябва да бъде конфигурирана преди продажба.'}</span>
      </div>
    </section>

    <section className="detail-content section-pad">
      <div className="detail-column">
        <div className="section-kicker"><span>01</span><span>WHAT YOU GET</span></div>
        <h2>Структурирана база за следващата ти <em>стъпка.</em></h2>
        <p>Дигиталният продукт се предоставя като PDF. Начинът и срокът на доставка са описани предварително в <Link href="/legal#delivery">правната информация</Link>.</p>
        <div className="check-list">
          <span><Check /> Дигитален PDF ресурс</span>
          <span><Check /> Доставка по имейл след потвърдено плащане</span>
          <span><Check /> Документ за покупката/фактура според приложимия режим</span>
        </div>
      </div>
      <div className="module-panel">
        <span className="panel-label">RESOURCE / MODULES</span>
        {['STRUCTURED KNOWLEDGE','PRACTICAL WORKFLOW','NEXT ACTION'].map((item, i) => <div className="module-row" key={item}><span>0{i + 1}</span><strong>{item}</strong><CircleDot /></div>)}
        <p>{isPayButton ? 'PayButton плащането се потвърждава в myPOS; фиксираният PayButton URL не е същият server-to-server механизъм като Checkout API PurchaseNotify.' : 'Доставката се активира само след server-side потвърждение от myPOS.'}</p>
      </div>
    </section>

    <section className="detail-workflow section-pad">
      <div className="section-kicker"><span>02</span><span>WORKFLOW</span></div>
      <h2>Resource <em>→</em> Action</h2>
      <div className="detail-flow"><span>RESOURCE</span><ArrowRight /><span>KNOWLEDGE</span><ArrowRight /><span>WORKFLOW</span><ArrowRight /><span>ACTION</span></div>
      <div className="audience"><span>WHO IS IT FOR</span><p>За хора и компании, които искат да откриват възможности, да автоматизират процеси и да изграждат по-ефективен онлайн бизнес.</p></div>
    </section>

    <footer className="footer section-pad">
      <div className="footer-brand"><span>STANISLAV ILIEV</span><strong>WORKFLOWS &amp; AUTOMATIONS</strong></div>
      <div className="footer-links"><div><span>LEGAL</span><Link href="/legal#terms">Общи условия</Link><Link href="/legal#withdrawal">Отказ и възстановяване</Link><Link href="/legal#delivery">Доставка</Link></div><div><span>CONTACT</span><a href={'mailto:' + legal.email}>{legal.email}</a><a href={'tel:' + legal.phone.replace(/\s+/g, '')}>{legal.phone}</a></div></div>
      <div className="footer-bottom"><span>© 2026 {legal.sellerName}</span><Link href="/">Към сайта</Link></div>
    </footer>
  </main>
}
