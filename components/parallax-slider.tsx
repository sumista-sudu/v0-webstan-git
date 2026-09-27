"use client"

import { useState } from "react"
import {
  ArrowRight,
  BarChart3,
  Boxes,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Cloud,
  Code2,
  FileSpreadsheet,
  Headphones,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Workflow,
  X,
} from "lucide-react"

const categories = [
  ["Компютри", "01"], ["Лаптопи", "02"], ["Компоненти", "03"], ["Периферия", "04"],
  ["Монитори", "05"], ["Софтуер", "06"], ["Електроника", "07"], ["Кабели и аксесоари", "08"],
]

const automationCards = [
  { icon: Workflow, title: "Софтуерна интеграция", copy: "Свързване на системи и процеси в един работещ поток." },
  { icon: Code2, title: "API интеграция", copy: "Сигурен обмен на данни между вашите платформи." },
  { icon: FileSpreadsheet, title: "Автоматизация на документи", copy: "По-малко ръчна работа, повече контрол и видимост." },
]

export default function ParallaxSlider() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [activeAdmin, setActiveAdmin] = useState("Overview")

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#111827]">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <button onClick={() => scrollTo("top")} className="flex items-center gap-3" aria-label="Начало">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#1257e5] text-lg font-black text-white">SI</span>
            <span className="text-[15px] font-bold tracking-[-0.03em]">СТАНИСЛАВ ИЛИЕВ</span>
          </button>
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-slate-600 md:flex">
            <button onClick={() => scrollTo("shop")} className="transition-colors hover:text-[#1257e5]">Магазин</button>
            <button onClick={() => scrollTo("solutions")} className="transition-colors hover:text-[#1257e5]">Решения</button>
            <button onClick={() => scrollTo("about")} className="transition-colors hover:text-[#1257e5]">За нас</button>
            <button onClick={() => scrollTo("contact")} className="transition-colors hover:text-[#1257e5]">Контакти</button>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setAdminOpen(true)} className="hidden rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-[#1257e5] hover:text-[#1257e5] sm:block">Admin panel</button>
            <button onClick={() => scrollTo("contact")} className="hidden rounded-lg bg-[#1257e5] px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-[#0d46ba] sm:block">Свържете се с нас</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 md:hidden" aria-label="Меню">{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {menuOpen && <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm font-medium"><button onClick={() => { scrollTo("shop"); setMenuOpen(false) }}>Магазин</button><button onClick={() => { scrollTo("solutions"); setMenuOpen(false) }}>Решения</button><button onClick={() => { scrollTo("contact"); setMenuOpen(false) }}>Контакти</button></div></div>}
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-[#0b1427] text-white">
          <div className="absolute -right-32 -top-40 size-[520px] rounded-full bg-blue-600/20 blur-3xl" />
          <div className="mx-auto grid min-h-[580px] max-w-[1240px] items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
            <div className="relative z-10 max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200"><Sparkles className="size-3.5" /> технологии за бизнеса</div>
              <h1 className="text-balance text-5xl font-semibold leading-[1.03] tracking-[-0.06em] sm:text-6xl lg:text-[76px]">Технологии, електроника и <span className="text-blue-400">софтуерни решения.</span></h1>
              <p className="mt-7 max-w-lg text-base leading-7 text-slate-300">Компютри, периферия, електроника, софтуер и решения за автоматизация, съобразени с начина, по който работи вашият бизнес.</p>
              <div className="mt-9 flex flex-wrap gap-3"><button onClick={() => scrollTo("shop")} className="group inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0b1427] transition hover:bg-blue-50">Разгледай магазина <ArrowRight className="size-4 transition group-hover:translate-x-1" /></button><button onClick={() => scrollTo("contact")} className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Свържете се с нас</button></div>
              <div className="mt-12 flex flex-wrap gap-6 text-xs text-slate-400"><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-blue-400" /> Проверени решения</span><span className="flex items-center gap-2"><Headphones className="size-4 text-blue-400" /> Директна поддръжка</span></div>
            </div>
            <div className="relative hidden lg:block"><div className="absolute -inset-5 rounded-[28px] bg-blue-500/10 blur-2xl" /><img src="/automation-flow.png" alt="Илюстративна визуализация на свързани системи и автоматизиран поток от данни" className="relative w-full rounded-[22px] border border-white/10 object-cover shadow-2xl shadow-black/30" /></div>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#1257e5]">Онлайн магазин</p><h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Изберете по категория</h2></div><button className="inline-flex items-center gap-1 text-sm font-semibold text-[#1257e5]">Всички категории <ChevronRight className="size-4" /></button></div><div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{categories.map(([name, no]) => <button key={name} className="group rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60"><span className="text-[11px] font-bold text-slate-300">{no}</span><span className="mt-8 block text-sm font-semibold leading-5 text-slate-800 group-hover:text-[#1257e5]">{name}</span></button>)}</div><div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-[#1257e5]"><Package className="size-5" /></div><h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">Очаквайте скоро нашите продукти.</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Каталогът се подготвя. Реалните продукти, цени и наличности ще бъдат добавени от административния панел.</p><button onClick={() => scrollTo("contact")} className="mt-6 rounded-lg bg-[#1257e5] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d46ba]">Свържете се с нас</button></div></section>

        <section id="solutions" className="border-y border-slate-200 bg-white"><div className="mx-auto max-w-[1240px] px-5 py-24 lg:px-8"><div className="max-w-2xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#1257e5]">Интеграция и автоматизация</p><h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">По-умни процеси. По-малко ръчна работа.</h2><p className="mt-4 text-base leading-7 text-slate-500">Разработваме и свързваме технологични решения според конкретните нужди на вашия бизнес.</p></div><div className="mt-12 grid gap-4 md:grid-cols-3">{automationCards.map(({ icon: Icon, title, copy }) => <div key={title} className="rounded-2xl border border-slate-200 p-6"><div className="flex size-11 items-center justify-center rounded-xl bg-[#edf4ff] text-[#1257e5]"><Icon className="size-5" /></div><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p></div>)}</div><p className="mt-8 text-xs text-slate-400">Примерни визуализации на решения за интеграция и автоматизация.</p></div></section>

        <section id="about" className="mx-auto grid max-w-[1240px] gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#1257e5]">Защо да изберете нас</p><h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Технологии, които работят за вас.</h2></div><div className="grid gap-6 sm:grid-cols-2"><div><BarChart3 className="size-5 text-[#1257e5]" /><h3 className="mt-4 font-semibold">Практичен подход</h3><p className="mt-2 text-sm leading-6 text-slate-500">Фокус върху измерим резултат и надеждна работа.</p></div><div><Cloud className="size-5 text-[#1257e5]" /><h3 className="mt-4 font-semibold">Готови за растеж</h3><p className="mt-2 text-sm leading-6 text-slate-500">Архитектура, която се развива с бизнеса ви.</p></div></div></section>

        <section id="contact" className="bg-[#eaf1ff]"><div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#1257e5]">Контакти</p><h2 className="text-3xl font-semibold tracking-[-0.04em]">Нека поговорим за вашата задача.</h2><p className="mt-3 text-sm text-slate-600">Станислав Илиев · България</p></div><div className="flex flex-col gap-2 text-sm font-semibold text-slate-700"><a href="mailto:ilievstanislav5@gmail.com" className="hover:text-[#1257e5]">ilievstanislav5@gmail.com</a><a href="tel:+359877665447" className="hover:text-[#1257e5]">+359 877 665 447</a></div></div></section>
      </main>

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><span className="font-semibold text-slate-800">СТАНИСЛАВ ИЛИЕВ</span><span>© {new Date().getFullYear()} Всички права запазени.</span><span>Магазин · Доставка · Плащане · Поверителност</span></div></footer>

      {adminOpen && <div className="fixed inset-0 z-[60] flex bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-label="Admin panel"><div className="m-auto flex h-full max-h-[760px] w-full max-w-5xl overflow-hidden rounded-2xl bg-[#f8fafc] shadow-2xl"><aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white p-4 sm:block"><div className="flex items-center justify-between"><span className="font-semibold">Admin panel</span><button onClick={() => setAdminOpen(false)} aria-label="Затвори"><X className="size-4" /></button></div><p className="mt-1 text-[11px] text-slate-400">Store operations</p><div className="mt-8 flex flex-col gap-1">{[[LayoutDashboard,"Overview"],[Package,"Products"],[Boxes,"Categories"],[ShoppingBag,"Orders"],[Settings2,"Settings"]].map(([Icon, label]) => <button key={label as string} onClick={() => setActiveAdmin(label as string)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${activeAdmin === label ? "bg-blue-50 font-semibold text-[#1257e5]" : "text-slate-500 hover:bg-slate-50"}`}><Icon className="size-4" />{label as string}</button>)}</div></aside><section className="min-w-0 flex-1 overflow-y-auto p-5 sm:p-8"><div className="flex items-center justify-between sm:hidden"><span className="font-semibold">Admin panel</span><button onClick={() => setAdminOpen(false)} aria-label="Затвори"><X className="size-5" /></button></div><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1257e5]">{activeAdmin}</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{activeAdmin === "Settings" ? "Store settings" : activeAdmin === "Products" ? "Products" : "Добре дошли обратно"}</h2></div><button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1257e5] px-4 py-2.5 text-sm font-semibold text-white"><Package className="size-4" />{activeAdmin === "Products" ? "Добави продукт" : "Нова поръчка"}</button></div>{activeAdmin === "Settings" ? <div className="mt-8 max-w-2xl rounded-xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><div><h3 className="font-semibold">myPOS payments</h3><p className="mt-1 text-sm text-slate-500">Онлайн плащането ще бъде активирано след настройване на myPOS.</p></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Not configured</span></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{["Store ID","Store Password / Secret","Key Index","Private Key","Public Key","Mode: Sandbox / Live"].map(field => <label key={field} className="text-xs font-semibold text-slate-600">{field}<input disabled placeholder="Не е конфигурирано" className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-400 outline-none" /></label>)}</div><p className="mt-5 flex gap-2 text-xs leading-5 text-slate-400"><CircleHelp className="mt-0.5 size-4 shrink-0" />Чувствителните данни се съхраняват server-side чрез защитена конфигурация.</p></div> : <><div className="mt-8 grid gap-4 sm:grid-cols-3">{[[Package,"Products","0"],[ShoppingBag,"Orders","0"],[BarChart3,"Revenue","—"]].map(([Icon, label, value]) => <div key={label as string} className="rounded-xl border border-slate-200 bg-white p-5"><Icon className="size-5 text-[#1257e5]" /><p className="mt-5 text-sm text-slate-500">{label as string}</p><p className="mt-1 text-2xl font-semibold">{value as string}</p></div>)}</div><div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center"><Search className="mx-auto size-6 text-slate-300" /><h3 className="mt-4 font-semibold">Няма добавени {activeAdmin === "Products" ? "продукти" : "данни"}</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">Добавете реални данни от административния панел. Няма да показваме измислени продукти или поръчки.</p></div></>}</section></div></div>}
    </div>
  )
}
