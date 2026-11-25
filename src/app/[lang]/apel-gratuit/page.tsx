import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CallForm } from './call-form'
import { TrackedA } from '@/components/interactive'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { IconInstagram, IconPhone, IconWhatsApp } from '@/components/icons'
import { site, siteText, telHref, whatsappHref } from '@/lib/site'
import { JsonLd, breadcrumbLd } from '@/lib/schema'
import { alternatesFor, isLocale, localePath, type Locale } from '@/i18n/config'

const copy = {
  ro: {
    title: 'Rezervă-ți un apel gratuit | Heart Social',
    description: `Lasă-ne câteva detalii și te sunăm noi. Află cum te putem ajuta să-ți crești business-ul. Telefon: ${site.phoneDisplay}.`,
    crumb: 'Apel gratuit',
    eyebrow: 'Apel gratuit, fără obligații',
    h1: ['Rezervă-ți un apel ', 'gratuit', '.'],
    lead: 'Află cum te putem ajuta să-ți crești business-ul. Lasă-ne câteva detalii și te sunăm noi.',
    nextTitle: 'Ce urmează după ce trimiți formularul',
    steps: (phone: string) => [
      ['Primim cererea ta.', 'O citește Emilian, nu un robot.'],
      ['Te sunăm.', `De pe ${phone}, ca să știi că suntem noi.`],
      ['Vorbim despre afacerea ta.', 'Și pleci cu un plan clar, indiferent dacă lucrăm împreună sau nu.'],
    ],
    otherTitle: 'Preferi să ne scrii sau să ne suni tu?',
    phoneLabel: 'Telefon',
    newTab: '(se deschide într-o filă nouă)',
    onInstagram: 'pe Instagram',
    base: 'Lucrăm din București.',
  },
  en: {
    title: 'Book your free call | Heart Social',
    description: `Leave us a few details and we'll call you. Find out how we can help you grow your business. Phone: ${site.phoneDisplayIntl}.`,
    crumb: 'Free call',
    eyebrow: 'Free call, no strings attached',
    h1: ['Book your ', 'free', ' call.'],
    lead: "Find out how we can help you grow your business. Leave us a few details and we'll call you.",
    nextTitle: 'What happens after you send the form',
    steps: (phone: string) => [
      ['We get your request.', 'Emilian reads it, not a bot.'],
      ['We call you.', `From ${phone}, so you know it's us.`],
      ['We talk about your business.', 'And you leave with a clear plan, whether we work together or not.'],
    ],
    otherTitle: 'Would you rather write to us or call us yourself?',
    phoneLabel: 'Phone',
    newTab: '(opens in a new tab)',
    onInstagram: 'on Instagram',
    base: 'We work from Bucharest.',
  },
} satisfies Record<Locale, unknown>

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const { title, description } = copy[lang]
  return { title, description, alternates: alternatesFor(lang, '/apel-gratuit'), openGraph: { title, description, url: localePath(lang, '/apel-gratuit') } }
}

const contactLink = 'mt-1 inline-flex items-center gap-2 text-xl font-extrabold text-ink no-underline hover:underline'
const contactLabel = 'text-sm font-bold uppercase tracking-[0.1em] text-grey-700'

export default async function CallPage({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const c = copy[lang]
  const phone = siteText(lang).phone
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: c.crumb, path: '/apel-gratuit' }])} />
      <section className="section bg-alt" aria-labelledby="h1">
        <div className="wrap grid gap-14 lg:grid-cols-[5fr_7fr]">
          <div>
            <Breadcrumbs lang={lang} trail={[{ name: c.crumb }]} />
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 id="h1">
              {c.h1[0]}
              <span className="u">{c.h1[1]}</span>
              {c.h1[2]}
            </h1>
            <p className="lead mt-6">{c.lead}</p>

            <h2 className="mt-12 text-2xl">{c.nextTitle}</h2>
            <ol className="mt-6 grid gap-5">
              {c.steps(phone).map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="font-display text-3xl leading-none text-violet-700">{i + 1}</span>
                  <p>
                    <b>{t}</b> {d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="facet-card p-6 shadow-[0_20px_50px_rgba(22,20,26,.08)] sm:p-10">
              <CallForm location="apel-gratuit" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="alte">
        <div className="wrap">
          <h2 id="alte" className="text-3xl">{c.otherTitle}</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <p className={contactLabel}>{c.phoneLabel}</p>
              <TrackedA href={telHref} event="click_call" location="contact" className={contactLink}>
                <IconPhone className="size-5" /> {phone}
              </TrackedA>
            </li>
            <li>
              <p className={contactLabel}>WhatsApp</p>
              <TrackedA href={whatsappHref(lang)} event="click_whatsapp" location="contact" external className={contactLink} ariaLabel={`WhatsApp ${phone} ${c.newTab}`}>
                <IconWhatsApp className="size-5" /> {phone}
              </TrackedA>
            </li>
            <li>
              <p className={contactLabel}>Instagram</p>
              <TrackedA href={site.instagramUrl} event="click_instagram" location="contact" external className={contactLink} ariaLabel={`@${site.instagramHandle} ${c.onInstagram} ${c.newTab}`}>
                <IconInstagram className="size-5" /> @{site.instagramHandle}
              </TrackedA>
            </li>
          </ul>
          <p className="mt-8 text-grey-700">{c.base}</p>
        </div>
      </section>
    </>
  )
}
