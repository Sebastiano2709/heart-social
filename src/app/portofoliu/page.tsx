import type { Metadata } from 'next'
import { CtaButton, TrackedA } from '@/components/interactive'
import { FinalCta } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { IconInstagram } from '@/components/icons'
import { site } from '@/lib/site'

const title = 'Portofoliu: Reels, foto și social media | Heart Social'
const description = 'Vezi conținutul făcut de Heart Social pentru afaceri locale, firme B2B și profesioniști independenți.'

export const metadata: Metadata = { title, description, alternates: { canonical: '/portofoliu' }, openGraph: { title, description, url: '/portofoliu' } }

export default function Portfolio() {
  return (
    <>
      <section className="section" aria-labelledby="h1">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: 'Portofoliu' }]} />
          <p className="eyebrow">Portofoliu</p>
          <h1 id="h1" className="max-w-4xl">
            Mai bine îți <span className="u">arătăm</span>.
          </h1>
          <p className="lead mt-6">Reels, fotografii și campanii făcute de noi. Cele mai noi lucrări le publicăm pe Instagram.</p>
          <TrackedA href={site.instagramUrl} event="click_instagram" location="portfolio" external className="link-arrow mt-6" ariaLabel={`@${site.instagramHandle} pe Instagram (se deschide într-o filă nouă)`}>
            <IconInstagram className="size-5" /> @{site.instagramHandle}
          </TrackedA>
          <div className="mt-10">
            <CtaButton location="portfolio" label="Vreau și eu așa ceva" />
          </div>
        </div>
      </section>
      <FinalCta location="portfolio" />
    </>
  )
}
