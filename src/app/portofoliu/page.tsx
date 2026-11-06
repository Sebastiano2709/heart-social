import type { Metadata } from 'next'
import { CtaButton, TrackedA } from '@/components/interactive'
import { FinalCta } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { IconReels, IconCamera, IconInstagram } from '@/components/icons'
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
          <p className="lead mt-6">Reels, fotografii și campanii făcute de noi. Pentru cele mai noi lucrări, urmărește-ne pe Instagram.</p>
          <TrackedA href={site.instagramUrl} event="click_instagram" location="portfolio" external className="link-arrow mt-6" ariaLabel={`@${site.instagramHandle} pe Instagram (se deschide într-o filă nouă)`}>
            <IconInstagram className="size-5" /> @{site.instagramHandle}
          </TrackedA>

          <h2 className="mt-16 text-2xl">Reels</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="grid aspect-[9/16] place-items-center bg-grey-100 p-4 text-center shadow-[inset_0_0_0_1px_var(--color-line)]">
                <div>
                  <IconReels className="mx-auto mb-3 size-10 text-grey-500" accent={false} />
                  <span className="ph">[REEL REAL {n}]</span>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-2xl">Fotografii</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <li key={n} className="grid aspect-[4/5] place-items-center bg-grey-100 p-4 text-center shadow-[inset_0_0_0_1px_var(--color-line)]">
                <div>
                  <IconCamera className="mx-auto mb-3 size-10 text-grey-500" accent={false} />
                  <span className="ph">[FOTO REALĂ {n}]</span>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-2xl">Studii de caz</h2>
          <p className="mt-3 text-grey-700">
            <span className="ph">[STUDIU DE CAZ: client, provocare, ce am făcut, [CIFRĂ REALĂ] cu sursa ei]</span>
          </p>
          <div className="mt-10">
            <CtaButton location="portfolio" label="Vreau și eu așa ceva" />
          </div>
        </div>
      </section>
      <FinalCta location="portfolio" />
    </>
  )
}
