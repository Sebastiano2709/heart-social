import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CtaButton, TrackedA } from '@/components/interactive'
import { FinalCta } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { IconInstagram } from '@/components/icons'
import { site } from '@/lib/site'
import { JsonLd, breadcrumbLd } from '@/lib/schema'
import { alternatesFor, isLocale, localePath, type Locale } from '@/i18n/config'

const copy = {
  ro: {
    title: 'Portofoliu: Reels, foto și social media | Heart Social',
    description: 'Vezi conținutul făcut de Heart Social pentru afaceri locale, firme B2B și profesioniști independenți.',
    crumb: 'Portofoliu',
    h1: ['Mai bine îți ', 'arătăm', '.'],
    lead: 'Reels, fotografii și campanii făcute de noi. Cele mai noi lucrări le publicăm pe Instagram.',
    igAria: `@${site.instagramHandle} pe Instagram (se deschide într-o filă nouă)`,
    cta: 'Vreau și eu așa ceva',
  },
  en: {
    title: 'Portfolio: Reels, photo and social media | Heart Social',
    description: 'See the content Heart Social has made for local businesses, B2B companies and independent professionals.',
    crumb: 'Portfolio',
    h1: ["We'd rather ", 'show you', '.'],
    lead: 'Reels, photos and campaigns we made. We publish our latest work on Instagram.',
    igAria: `@${site.instagramHandle} on Instagram (opens in a new tab)`,
    cta: 'I want something like this',
  },
} satisfies Record<Locale, unknown>

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const { title, description } = copy[lang]
  return { title, description, alternates: alternatesFor(lang, '/portofoliu'), openGraph: { title, description, url: localePath(lang, '/portofoliu') } }
}

export default async function Portfolio({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const c = copy[lang]
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: c.crumb, path: '/portofoliu' }])} />
      <section className="section" aria-labelledby="h1">
        <div className="wrap">
          <Breadcrumbs lang={lang} trail={[{ name: c.crumb }]} />
          <p className="eyebrow">{c.crumb}</p>
          <h1 id="h1" className="max-w-4xl">
            {c.h1[0]}
            <span className="u">{c.h1[1]}</span>
            {c.h1[2]}
          </h1>
          <p className="lead mt-6">{c.lead}</p>
          <TrackedA href={site.instagramUrl} event="click_instagram" location="portfolio" external className="link-arrow mt-6" ariaLabel={c.igAria}>
            <IconInstagram className="size-5" /> @{site.instagramHandle}
          </TrackedA>
          <div className="mt-10">
            <CtaButton location="portfolio" label={c.cta} />
          </div>
        </div>
      </section>
      <FinalCta lang={lang} location="portfolio" />
    </>
  )
}
