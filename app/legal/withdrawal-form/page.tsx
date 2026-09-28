import Link from 'next/link'
import { getLegalConfig } from '@/lib/legal'

export default function WithdrawalForm() {
  const legal = getLegalConfig()
  return <main id="main-content" className="site-shell legal-page">
    <header className="topbar">
      <Link href="/" className="brand"><span>STANISLAV ILIEV</span><strong>WORKFLOWS <i>&amp;</i> AUTOMATIONS</strong></Link>
      <Link href="/legal" className="back-link">Правна информация</Link>
    </header>
    <section className="legal-hero section-pad">
      <div className="section-kicker"><span>LEGAL</span><span>STANDARD WITHDRAWAL FORM</span></div>
      <h1>Формуляр за отказ</h1>
      <p>Можете да копирате текста по-долу и да го изпратите по имейл, когато законовото право на отказ е приложимо.</p>
    </section>
    <section className="legal-grid section-pad">
      <article className="legal-card legal-wide">
        <p>До: {legal.sellerName}</p>
        <p>Адрес: {legal.address || '____________________________'}</p>
        <p>Имейл: {legal.email}</p>
        <hr />
        <p>С настоящото уведомявам, че се отказвам от договора за продажба на следния цифров продукт:</p>
        <p>Продукт: ____________________________</p>
        <p>Номер на поръчката: ____________________________</p>
        <p>Дата на поръчката: ____________________________</p>
        <p>Дата на получаване/доставка: ____________________________</p>
        <p>Име на потребителя: ____________________________</p>
        <p>Адрес на потребителя (ако е приложимо): ____________________________</p>
        <p>Дата: ____________________________</p>
        <p>Подпис на потребителя (само ако формулярът е на хартия): ____________________________</p>
        <p><strong>Изпратете попълнения формуляр или ясно заявление за отказ на {legal.email}.</strong></p>
      </article>
    </section>
  </main>
}
