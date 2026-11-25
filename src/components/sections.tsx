import Link from 'next/link'
import type { ReactNode } from 'react'
import { servicesFor } from '@/lib/site'
import { localePath, type Locale } from '@/i18n/config'
import { getUi } from '@/i18n/ui'
import { serviceIcon } from './icons'
import { CtaButton, Reveal } from './interactive'
import { PhText } from './ph-text'

/** Grey marquee under the hero. Lists services until ≥6 real client logos (with permission) exist. */
export function Marquee({ items, lang }: { items: string[]; lang: Locale }) {
  const row = (
    <ul className="marquee__row" aria-hidden="true">
      {items.map((t) => (
        <li key={t}>
          {t}
          <span className="marquee__dot">◆</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee bg-grey-100">
      <p className="sr-only">{getUi(lang).sections.servicesSr}: {items.join(', ')}.</p>
      <div className="marquee__track">
        {row}
        {row}
      </div>
      <style>{`
        .marquee{overflow:hidden;border-bottom:1px solid var(--color-line)}
        .marquee__track{display:flex;width:max-content;animation:marquee 32s linear infinite}
        .marquee:hover .marquee__track,.marquee:focus-within .marquee__track{animation-play-state:paused}
        .marquee__row{display:flex;gap:3rem;padding:1.35rem 1.5rem;margin:0;list-style:none}
        .marquee__row li{display:flex;align-items:center;gap:3rem;white-space:nowrap;font-weight:800;letter-spacing:.14em;font-size:.9375rem;color:var(--color-grey-500)}
        .marquee__dot{color:var(--color-lilac-300);font-size:.6rem}
        @keyframes marquee{to{transform:translateX(-50%)}}
        @media (prefers-reduced-motion:reduce){.marquee__track{animation:none}}
      `}</style>
    </div>
  )
}

export function SectionHead({ eyebrow, title, id, children, center = false }: { eyebrow: string; title: ReactNode; id: string; children?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {children && <div className={`lead mt-5 ${center ? 'mx-auto' : ''}`}>{children}</div>}
    </div>
  )
}

export function ServiceCards({ lang, headingLevel = 3 }: { lang: Locale; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const t = getUi(lang).sections
  return (
    <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
      {servicesFor(lang).map((s, i) => {
        const Icon = serviceIcon[s.icon]
        return (
          <Reveal as="li" key={s.slug} delay={(i % 3) * 80} className={`facet-card relative flex flex-col p-7 shadow-[inset_0_0_0_1px_var(--color-line)] ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <Icon className="mb-5 size-14 text-ink" />
            <p className="text-sm font-bold uppercase tracking-[0.1em] text-magenta-600">{s.name}</p>
            <H className="mt-2 text-[1.35rem] leading-tight">{s.benefit}</H>
            <p className="mt-3 text-grey-700"><PhText text={s.summary} /></p>
            <Link href={localePath(lang, `/servicii/${s.slug}`)} className="link-arrow mt-auto pt-6 after:absolute after:inset-0">
              {t.details} <span aria-hidden="true">›</span>
              <span className="sr-only"> {t.about} {s.name}</span>
            </Link>
          </Reveal>
        )
      })}
    </ul>
  )
}

export function CtaRow({ location, note }: { location: string; note?: string }) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
      <CtaButton location={location} />
      {note && <p className="text-grey-700">{note}</p>}
    </div>
  )
}
