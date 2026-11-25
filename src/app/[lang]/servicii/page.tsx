import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceCards, CtaRow } from '@/components/sections'
import { FinalCta } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd, breadcrumbLd } from '@/lib/schema'
import { alternatesFor, isLocale, localePath, type Locale } from '@/i18n/config'

const copy = {
  ro: {
    title: 'Servicii de promovare online în București | Heart Social',
    description: 'Cinci servicii sub un singur acoperiș: social media, foto/video, Reels, website și campanii Ads. Află ce ți se potrivește într-un apel gratuit.',
    crumb: 'Servicii',
    eyebrow: 'Ce facem',
    h1: ['Tot ce îi trebuie afacerii tale ca să fie ', 'văzută', '. Și aleasă.'],
    lead: 'Cinci servicii care pleacă din același plan: strategie, ședințe foto și video, Reels, site și reclame. Poți începe cu unul și adăuga restul când ai nevoie.',
    note: 'Nu știi de unde să începi? Exact asta lămurim la telefon.',
  },
  en: {
    title: 'Online marketing services in Bucharest | Heart Social',
    description: 'Five services under one roof: social media, photo/video, Reels, websites and ad campaigns. Find out what suits you on a free call.',
    crumb: 'Services',
    eyebrow: 'What we do',
    h1: ['Everything your business needs to be ', 'seen', '. And chosen.'],
    lead: 'Five services that start from the same plan: strategy, photo and video shoots, Reels, websites and ads. You can start with one and add the rest when you need them.',
    note: "Not sure where to start? That's exactly what we sort out on the phone.",
  },
} satisfies Record<Locale, unknown>

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const { title, description } = copy[lang]
  return { title, description, alternates: alternatesFor(lang, '/servicii'), openGraph: { title, description, url: localePath(lang, '/servicii') } }
}

export default async function ServicesHub({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const c = copy[lang]
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: c.crumb, path: '/servicii' }])} />
      <section className="section bg-alt" aria-labelledby="h1">
        <div className="wrap">
          <Breadcrumbs lang={lang} trail={[{ name: c.crumb }]} />
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 id="h1" className="max-w-4xl">
            {c.h1[0]}
            <span className="u">{c.h1[1]}</span>
            {c.h1[2]}
          </h1>
          <p className="lead mt-6">{c.lead}</p>
          <ServiceCards lang={lang} headingLevel={2} />
          <CtaRow location="services-hub" note={c.note} />
        </div>
      </section>
      <FinalCta lang={lang} location="services-hub" />
    </>
  )
}
