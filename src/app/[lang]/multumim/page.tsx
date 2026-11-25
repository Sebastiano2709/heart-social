import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TrackedA } from '@/components/interactive'
import { site, siteText } from '@/lib/site'
import { isLocale, localePath, type Locale } from '@/i18n/config'

const copy = {
  ro: {
    title: 'Mulțumim | Heart Social',
    eyebrow: 'Cerere trimisă',
    h1: ['Gata, am primit ', 'cererea', ' ta.'],
    lead: (phone: string) => `Te sunăm de pe ${phone}. Până atunci, vezi ce facem pentru alți antreprenori.`,
    ig: 'Urmărește-ne pe Instagram',
    igAria: 'Urmărește-ne pe Instagram (se deschide într-o filă nouă)',
    portfolio: 'Vezi portofoliul',
    home: 'Înapoi la pagina principală',
  },
  en: {
    title: 'Thank you | Heart Social',
    eyebrow: 'Request sent',
    h1: ["Done, we've received your ", 'request', '.'],
    lead: (phone: string) => `We'll call you from ${phone}. In the meantime, see what we do for other business owners.`,
    ig: 'Follow us on Instagram',
    igAria: 'Follow us on Instagram (opens in a new tab)',
    portfolio: 'See the portfolio',
    home: 'Back to the home page',
  },
} satisfies Record<Locale, unknown>

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return { title: copy[lang].title, robots: { index: false, follow: false } }
}

export default async function ThankYou({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const c = copy[lang]
  return (
    <section className="section bg-alt" aria-labelledby="h1">
      <div className="wrap max-w-3xl text-center">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1 id="h1">
          {c.h1[0]}
          <span className="u">{c.h1[1]}</span>
          {c.h1[2]}
        </h1>
        <p className="lead mx-auto mt-6">{c.lead(siteText(lang).phone)}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <TrackedA href={site.instagramUrl} event="click_instagram" location="thank-you" external className="btn" ariaLabel={c.igAria}>
            {c.ig} <span className="chev" aria-hidden="true">›</span>
          </TrackedA>
          <Link href={localePath(lang, '/portofoliu')} className="btn btn-ghost">
            {c.portfolio}
          </Link>
        </div>
        <p className="mt-10">
          <Link href={localePath(lang, '/')} className="text-grey-700 underline underline-offset-4">
            {c.home}
          </Link>
        </p>
      </div>
    </section>
  )
}
