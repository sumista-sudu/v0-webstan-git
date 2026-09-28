import Link from 'next/link'
import { getLegalConfig, missingLegalConfig } from '@/lib/legal'

export default function LegalPage() {
  const legal = getLegalConfig()
  const missing = missingLegalConfig()

  return <main className="site-shell legal-page">
    <header className="topbar">
      <Link href="/" className="brand"><span>STANISLAV ILIEV</span><strong>WORKFLOWS <i>&amp;</i> AUTOMATIONS</strong></Link>
      <Link href="/" className="back-link">Back to site</Link>
    </header>

    <section className="legal-hero section-pad">
      <div className="section-kicker"><span>LEGAL</span><span>ONLINE SALES / DIGITAL CONTENT</span></div>
      <h1>Правна информация</h1>
      <p>Информацията по-долу е част от условията за дистанционна продажба на дигитално съдържание.</p>
      {missing.length > 0 && <div className="legal-warning"><strong>Сайтът не е готов за реални продажби.</strong><span>Липсва конфигурация: {missing.join(', ')}. Плащанията се блокират, докато тези данни не бъдат попълнени.</span></div>}
    </section>

    <section className="legal-grid section-pad">
      <article id="terms" className="legal-card">
        <span className="legal-index">01 / TERMS</span>
        <h2>Общи условия</h2>
        <p><strong>Търговец:</strong> {legal.sellerName}</p>
        <p><strong>Адрес:</strong> {legal.address || 'Не е конфигуриран'}</p>
        {legal.registrationNumber && <p><strong>ЕИК/регистрационен номер:</strong> {legal.registrationNumber}</p>}
        {legal.vatId && <p><strong>ДДС номер:</strong> {legal.vatId}</p>}
        <p><strong>Контакти:</strong> {legal.email} · {legal.phone}</p>
        <p>Продуктите са дигитално съдържание във формат PDF. Преди плащане клиентът получава информация за характеристиките на продукта, крайната цена, начина на плащане, начина и срока на доставка, функционалностите и ограниченията за използване, както и правилата за отказ и несъответствие.</p>
        <p>Поръчката се счита за платена само след потвърждение от платежната система по приложимия сървърен механизъм. При стандартния myPOS Checkout това е server-to-server <code>PurchaseNotify</code>, а не само връщането на браузъра към <code>URL_OK</code>. Това следва директно от myPOS документацията. fileciteturn138file0L8-L10</p>
        <p>Правата при несъответствие на дигиталното съдържание не се изключват с тези условия; при приложимите случаи потребителят има законови средства за привеждане в съответствие, намаляване на цената или прекратяване на договора.</p>
      </article>

      <article id="withdrawal" className="legal-card">
        <span className="legal-index">02 / WITHDRAWAL</span>
        <h2>Отказ и възстановяване</h2>
        <p>При дистанционни договори потребителят по принцип разполага с 14-дневно право на отказ, но при цифрово съдържание без материален носител това право може да бъде загубено, когато са изпълнени едновременно законовите условия: изрично предварително съгласие за започване на доставката, изрично потвърждение, че правото на отказ се губи, и потвърждение на договора на траен носител. citeturn946184search3turn946184search5</p>
        <p>Затова checkout формата съдържа отделно, незадължително за други цели съгласие за незабавна доставка на дигиталното съдържание и отделно потвърждение за загубата на правото на отказ. Съгласието не се използва за маркетингови цели.</p>
        <p>За да упражните отказ, изпратете недвусмислено заявление до <a href={'mailto:' + legal.email}>{legal.email}</a> с име, имейл на поръчката, номер на поръчката и ясно изявление за отказ. При необходимост може да се използва и стандартният формуляр за отказ по правилата за дистанционни договори.</p>
      </article>

      <article id="delivery" className="legal-card">
        <span className="legal-index">03 / DELIVERY</span>
        <h2>Доставка на дигитално съдържание</h2>
        <p>{legal.deliveryPolicy}</p>
        <p>За продуктите през server-side myPOS Checkout PDF файлът се взема от Private Blob storage и се изпраща след успешно валидирано плащане. Публични URL адреси към платените PDF файлове не се използват.</p>
        <p>При PayButton плащанията сайтът записва заявката за покупка и плащането се следи в myPOS. Автоматично server-to-server потвърждение е възможно само когато съответният myPOS продукт/конфигурация предоставя такова уведомяване; фиксирaният PayButton URL сам по себе си не е документиран в предоставените източници като еквивалент на PurchaseNotify. Затова този маршрут не трябва да бъде представян като автоматично потвърден API Checkout.</p>
      </article>

      <article id="privacy" className="legal-card">
        <span className="legal-index">04 / PRIVACY</span>
        <h2>Политика за поверителност</h2>
        <p><strong>Администратор:</strong> {legal.sellerName}, {legal.address || 'адресът трябва да бъде конфигуриран'}, {legal.email}.</p>
        <p>За изпълнение на покупка се обработват идентификационни и контактни данни, данни за поръчката, плащането и доставката. Правните основания зависят от целта: изпълнение на договора, спазване на законово задължение, защита срещу измами/спорове и, когато е приложимо, съгласие. GDPR изисква законосъобразност, прозрачност, ограничение на целите, минимизиране на данните, ограничение на съхранението и сигурност. citeturn216099search1turn216099search5</p>
        <p>Получатели/обработващи могат да бъдат myPOS за плащането, Vercel за инфраструктурата и Private Blob storage, и Resend за изпращане на транзакционни имейли. Данните се съхраняват за срокове, съобразени с договорните, счетоводните и законовите задължения.</p>
        <p>Субектите на данни могат да упражняват приложимите права за достъп, коригиране, изтриване, ограничаване, възражение и преносимост, както и право на жалба до компетентния надзорен орган по защита на данните.</p>
      </article>

      <article id="cookies" className="legal-card">
        <span className="legal-index">05 / COOKIES</span>
        <h2>Бисквитки</h2>
        <p>Сайтът не използва маркетингови или рекламни cookies за продажбите по подразбиране. Строго необходимото техническо съхранение, нужно за функционирането на услугата, може да се използва без отделно съгласие. Незадължителни analytics/marketing технологии не трябва да бъдат активирани преди съответното съгласие. citeturn216099search10</p>
      </article>

      <article id="complaints" className="legal-card">
        <span className="legal-index">06 / COMPLAINTS</span>
        <h2>Контакти и жалби</h2>
        <p>За въпроси, оплаквания, проблеми с доставката или несъответствие на цифровото съдържание: <a href={'mailto:' + legal.email}>{legal.email}</a>, тел. {legal.phone}.</p>
        <p>Опишете номера на поръчката, датата, продукта и проблема. Търговецът обработва жалбата без неоправдано забавяне и прилага приложимите законови средства за защита.</p>
      </article>

      <article className="legal-card legal-wide">
        <span className="legal-index">07 / PRE-CONTRACT INFO</span>
        <h2>Информация преди покупка</h2>
        <p>Преди сключване на договор от разстояние сайтът трябва ясно да показва основните характеристики на продукта, общата цена с приложимите данъци и такси, начина на плащане, начина и срока на доставка, самоличността и адреса на търговеца, имейл и телефон, информацията за отказ и механизмите за жалби. За цифрово съдържание трябва да е описана и информация за функционалност/съвместимост, когато е приложима. citeturn216099search0turn216099search2</p>
        <p><strong>Ценообразуване:</strong> {legal.priceTaxNote || 'Трябва да бъде конфигурирано изрично от търговеца според действителния му данъчен статут.'}</p>
        <p>Електронният магазин попада и в обхвата на българските правила за е-търговци; НАП посочва, че лицата, извършващи продажби чрез електронен магазин, подават информация за дейността си и имат специфични изисквания за документиране на продажбите. citeturn216099search6turn216099search4</p>
        <p>При трансгранични B2C електронни услуги могат да се прилагат правилата за ДДС/OSS според мястото на изпълнение и данъчния статут на търговеца. НАП публикува отделни указания за OSS и облагането на електронно предоставяни услуги. citeturn364943search3turn364943search7</p>
      </article>
    </section>

    <footer className="footer section-pad">
      <div className="footer-brand"><span>STANISLAV ILIEV</span><strong>WORKFLOWS &amp; AUTOMATIONS</strong><small>LEGAL / {legal.policyVersion}</small></div>
      <div className="footer-links"><div><span>LEGAL</span><a href="#terms">Общи условия</a><a href="#withdrawal">Отказ и възстановяване</a><a href="#delivery">Доставка</a></div><div><span>DATA</span><a href="#privacy">Поверителност</a><a href="#cookies">Бисквитки</a><a href="#complaints">Жалби</a></div></div>
      <div className="footer-bottom"><span>© 2026 {legal.sellerName}</span><Link href="/">Към сайта</Link></div>
    </footer>
  </main>
}
