import type { Metadata } from 'next'
import { CallForm } from './call-form'
import { TrackedA } from '@/components/interactive'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { IconInstagram, IconPhone, IconWhatsApp } from '@/components/icons'
import { site, telHref, whatsappHref } from '@/lib/site'
import { JsonLd, breadcrumbLd } from '@/lib/schema'

const title = 'Rezervă-ți un apel gratuit | Heart Social'
const description = 'Lasă-ne câteva detalii și te sunăm noi. Află cum te putem ajuta să-ți crești business-ul. Telefon: 0799 521 159.'

export const metadata: Metadata = { title, description, alternates: { canonical: '/apel-gratuit' }, openGraph: { title, description, url: '/apel-gratuit' } }

export default function CallPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Acasă', path: '/' }, { name: 'Apel gratuit', path: '/apel-gratuit' }])} />
      <section className="section bg-alt" aria-labelledby="h1">
        <div className="wrap grid gap-14 lg:grid-cols-[5fr_7fr]">
          <div>
            <Breadcrumbs trail={[{ name: 'Apel gratuit' }]} />
            <p className="eyebrow">Apel gratuit, fără obligații</p>
            <h1 id="h1">
              Rezervă-ți un apel <span className="u">gratuit</span>.
            </h1>
            <p className="lead mt-6">Află cum te putem ajuta să-ți crești business-ul. Lasă-ne câteva detalii și te sunăm noi.</p>

            <h2 className="mt-12 text-2xl">Ce urmează după ce trimiți formularul</h2>
            <ol className="mt-6 grid gap-5">
              {[
                ['Primim cererea ta.', 'O citește Emilian, nu un robot.'],
                ['Te sunăm.', `De pe ${site.phoneDisplay}, ca să știi că suntem noi.`],
                ['Vorbim despre afacerea ta.', 'Și pleci cu pașii următori, indiferent dacă lucrăm împreună sau nu.'],
              ].map(([t, d], i) => (
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
          <h2 id="alte" className="text-3xl">Preferi să ne scrii sau să ne suni tu?</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <p className="text-sm font-bold uppercase tracking-[0.1em] text-grey-700">Telefon</p>
              <TrackedA href={telHref} event="click_call" location="contact" className="mt-1 inline-flex items-center gap-2 text-xl font-extrabold text-ink no-underline hover:underline">
                <IconPhone className="size-5" /> {site.phoneDisplay}
              </TrackedA>
            </li>
            <li>
              <p className="text-sm font-bold uppercase tracking-[0.1em] text-grey-700">WhatsApp</p>
              <TrackedA href={whatsappHref} event="click_whatsapp" location="contact" external className="mt-1 inline-flex items-center gap-2 text-xl font-extrabold text-ink no-underline hover:underline" ariaLabel={`WhatsApp ${site.phoneDisplay} (se deschide într-o filă nouă)`}>
                <IconWhatsApp className="size-5" /> {site.phoneDisplay}
              </TrackedA>
            </li>
            <li>
              <p className="text-sm font-bold uppercase tracking-[0.1em] text-grey-700">Instagram</p>
              <TrackedA href={site.instagramUrl} event="click_instagram" location="contact" external className="mt-1 inline-flex items-center gap-2 text-xl font-extrabold text-ink no-underline hover:underline" ariaLabel={`@${site.instagramHandle} pe Instagram (se deschide într-o filă nouă)`}>
                <IconInstagram className="size-5" /> @{site.instagramHandle}
              </TrackedA>
            </li>
            <li>
              <p className="text-sm font-bold uppercase tracking-[0.1em] text-grey-700">Email</p>
              <p className="mt-1 text-xl font-extrabold">
                <span className="ph">{site.email}</span>
              </p>
            </li>
          </ul>
          <p className="mt-8 text-grey-700">Lucrăm din București.</p>
        </div>
      </section>
    </>
  )
}
