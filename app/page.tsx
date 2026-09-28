'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowRight, CircleDot, Menu, X, Zap } from 'lucide-react'
import { resources } from '@/lib/resources'

const nodes = [
  ['INPUT', 'Business Data'], ['AI', 'Analysis'], ['LOGIC', 'Decision'], ['WORKFLOW', 'Automation'], ['OUTPUT', 'Business Action'],
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <main className="site-shell">
      <header className="topbar">
        <Link href="#top" className="brand" onClick={() => setMenuOpen(false)}><span>STANISLAV ILIEV</span><strong>WORKFLOWS <i>&amp;</i> AUTOMATIONS</strong></Link>
        <button className="menu-toggle" aria-label="Отвори меню" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#resources" onClick={() => setMenuOpen(false)}>Resources</a><a href="#workflows" onClick={() => setMenuOpen(false)}>Workflows</a><a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <Link className="library-link" href="#resources" onClick={() => setMenuOpen(false)}><span className="status-dot" /> My Library</Link>
        </nav>
      </header>

      <section className="hero section-pad" id="top">
        <div className="hero-copy"><div className="eyebrow"><span className="pulse" /> WORKFLOWS &amp; AUTOMATIONS</div><h1>AI, автоматизации и бизнес системи, които превръщат информацията в <em>действие.</em></h1><p>Практични дигитални ресурси за хора и компании, които искат да откриват възможности, автоматизират процеси и изграждат по-ефективен онлайн бизнес.</p><div className="hero-actions"><a className="button primary" href="#resources">Разгледай ресурсите <ArrowRight /></a><a className="text-link" href="#how-it-works">Как работи? <ArrowDown /></a></div></div>
        <div className="hero-system"><div className="system-top"><span>SYSTEM / ACTIVE</span><span>FLOW_001</span></div><div className="system-line" />{['INPUT', 'AI', 'ANALYSIS', 'WORKFLOW', 'ACTION'].map((label, i) => <div className="system-node" key={label}><span className="node-index">0{i + 1}</span><div><small>{i === 0 ? 'SOURCE' : i === 4 ? 'RESULT' : 'PROCESS'}</small><strong>{label}</strong></div><CircleDot /></div>)}<div className="system-foot"><span>STATUS</span><b>READY TO EXECUTE</b></div></div>
      </section>

      <section className="concept section-pad" id="about"><div className="section-kicker"><span>01</span><span>THE CONCEPT</span></div><div className="concept-grid"><h2>Knowledge <i>→</i> Workflow <i>→</i> Action</h2><p>Не просто информация. Структурирани ресурси, които помагат да видиш възможността, да изградиш процес и да направиш следващата бизнес стъпка.</p></div></section>

      <section className="resources section-pad" id="resources"><div className="section-heading"><div><div className="section-kicker"><span>02</span><span>FOUR RESOURCES / 04</span></div><h2>Избери своята <em>система.</em></h2></div><span className="heading-meta">DIGITAL BUSINESS INTELLIGENCE<br />NO PHYSICAL PRODUCTS</span></div><div className="resource-grid">{resources.map((resource) => { const Icon = resource.icon; return <article className="resource-card" key={resource.slug}><div className="card-head"><span className="card-number">{resource.number}</span><span className="badge">{resource.badge}</span><Icon /></div><h3>{resource.title}</h3><p>{resource.description}</p><div className="mini-flow">{resource.flow.map((item, i) => <span key={item}><b>{item}</b>{i < resource.flow.length - 1 && <ArrowRight />}</span>)}</div><div className="card-foot"><span>{resource.meta}</span><div className="card-actions">{resource.slug === 'ai-bug-bounty-playbook' && <Link className="button primary product-cta" href="/resources/ai-bug-bounty-playbook">КУПИ ЗА €149 <ArrowRight /></Link>}<Link href={'/resources/' + resource.slug}>Виж ресурса <ArrowRight /></Link></div></div></article> })}</div></section>

      <section className="how section-pad" id="how-it-works"><div className="section-kicker"><span>03</span><span>HOW IT WORKS / WORKFLOW SYSTEM</span></div><div className="section-heading simple"><h2>От информация към <em>автоматизация.</em></h2><p>Четири ясни стъпки между ресурса и реалното бизнес действие.</p></div><div className="process-track">{[['01','INPUT','Избираш ресурс'],['02','KNOWLEDGE','Получаваш структурирана информация'],['03','WORKFLOW','Прилагаш конкретни стъпки'],['04','ACTION','Превръщаш знанията в бизнес действие']].map(([num,label,desc], i) => <div className="process-step" key={num}><span>{num}</span><div className="process-icon"><Zap /></div><small>{label}</small><p>{desc}</p>{i < 3 && <ArrowRight className="process-arrow" />}</div>)}</div></section>

      <section className="automation section-pad" id="workflows"><div className="section-kicker"><span>04</span><span>AUTOMATION MINDSET / LIVE FLOW</span></div><div className="automation-layout"><div><h2>Данните са началото.<br /><em>Действието е резултатът.</em></h2><p>Всеки workflow започва с вход, минава през интелигентна логика и завършва с конкретен изход. Точно така са проектирани и ресурсите тук.</p></div><div className="node-flow">{nodes.map(([label, title], i) => <div className="flow-node-wrap" key={label}><div className="flow-node"><span>[ {label} ]</span><strong>{title}</strong><small>{i === 0 ? 'COLLECT' : i === 4 ? 'EXECUTE' : 'PROCESS'}</small></div>{i < nodes.length - 1 && <div className="flow-connector"><span /><ArrowDown /></div>}</div>)}</div></div></section>

      <section className="final-cta section-pad"><div className="cta-grid"><span className="cta-number">05 / NEXT ACTION</span><h2>Избери своя ресурс и превърни информацията в <em>действие.</em></h2><a className="button primary" href="#resources">Разгледай ресурсите <ArrowRight /></a></div></section>

      <footer className="footer section-pad" id="contact"><div className="footer-brand"><span>STANISLAV ILIEV</span><strong>WORKFLOWS &amp; AUTOMATIONS</strong><small>AI • AUTOMATION • BUSINESS</small></div><div className="footer-links"><div><span>EXPLORE</span><a href="#resources">Resources</a><a href="#workflows">Workflows</a><a href="#how-it-works">How it works</a></div><div><span>LEGAL &amp; CONTACT</span><Link href="/legal#terms">Общи условия</Link><Link href="/legal#privacy">Поверителност</Link><Link href="/legal#withdrawal">Отказ/възстановяване</Link><Link href="/legal#cookies">Бисквитки</Link><a href="mailto:ilievstanislav5@gmail.com">ilievstanislav5@gmail.com</a><a href="tel:+359877665447">+359 877 665 447</a></div></div><div className="footer-bottom"><span>© 2026 STANISLAV ILIEV</span><Link href="/legal">Правна информация</Link></div></footer>
    </main>
  )
}
