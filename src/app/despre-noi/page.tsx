import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CtaButton, TrackedA } from '@/components/interactive'
import { FinalCta } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { services, site, CTA } from '@/lib/site'
import { JsonLd, breadcrumbLd, personLd } from '@/lib/schema'

const title = 'Despre Heart Social, agenția lui Emilian Horea'
const description = 'Heart Social e o agenție de promovare online din București, fondată de Emilian Horea, absolvent de Publicitate la FSPAC. Află povestea noastră.'

export const metadata: Metadata = { title, description, alternates: { canonical: '/despre-noi' }, openGraph: { title, description, url: '/despre-noi', type: 'profile' } }

const values: [string, string][] = [
  ['Implicare.', 'Trăim proiectul tău, nu doar îl bifăm.'],
  ['Sinceritate.', 'Îți spunem ce merge și ce nu, chiar și când nu e ce vrei să auzi.'],
  ['Muncă făcută de noi.', 'Filmăm, montăm și scriem noi. Știi mereu cine lucrează pentru tine.'],
  ['Răbdare.', 'Rezultatele bune se construiesc lună de lună, nu peste noapte.'],
]

export default function About() {
  return (
    <>
      <JsonLd data={personLd()} />
      <JsonLd data={breadcrumbLd([{ name: 'Acasă', path: '/' }, { name: 'Despre noi', path: '/despre-noi' }])} />
      <section className="section" aria-labelledby="h1">
        <div className="wrap max-w-5xl">
          <Breadcrumbs trail={[{ name: 'Despre noi' }]} />
          <p className="eyebrow">Despre noi</p>
          <h1 id="h1">
            O agenție construită <span className="u">din inimă</span>, pentru afaceri care vor să crească.
          </h1>
          <p className="lead mt-6">
            Heart Social e o agenție de promovare online din București. Facem social media, ședințe foto și video, Reels, site-uri și reclame pentru afaceri locale, firme B2B și profesioniști independenți. Mică prin alegere, implicată în fiecare proiect.
          </p>
        </div>
      </section>

      <section id="emilian-horea" className="section bg-alt" aria-labelledby="fondator">
        <div className="wrap grid items-start gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <figure className="mx-auto w-full max-w-sm md:sticky md:top-28 md:max-w-none">
            <Image src="/img/emilian-horea.webp" alt="Emilian Horea, fondatorul Heart Social, cu eșarfa violet de absolvent Publicitate FSPAC" width={455} height={742} sizes="(min-width: 768px) 40vw, 90vw" className="w-full object-cover" priority={false} />
            <figcaption className="mt-3 text-sm text-grey-700">Violetul de pe eșarfa de absolvent e același violet al brandului.</figcaption>
          </figure>
          <div>
            <p className="eyebrow">Fondatorul</p>
            <h2 id="fondator">Salut, sunt Emilian Horea.</h2>
            <div className="mt-6 grid gap-5 text-lg">
              <p>Am absolvit Publicitatea la Facultatea de Științe Politice, Administrative și ale Comunicării (FSPAC) a Universității Babeș-Bolyai din Cluj-Napoca, în {site.founder.year}.</p>
              <p>
                Încă din facultate am văzut același lucru la afacerile mici: oameni care fac lucruri foarte bune, dar pe care nu-i știe aproape nimeni. Nu le lipsea calitatea, le lipsea cineva care să le spună povestea.
              </p>
              <p>
                Așa a apărut Heart Social. Numele nu e întâmplător: mă implic în fiecare proiect de parcă ar fi al meu. Dacă nu pot face asta, prefer să spun nu.
              </p>
            </div>
            <blockquote className="mt-8 border-l-[3px] border-magenta-600 pl-5 text-2xl font-extrabold leading-snug">„Dacă nu mă pot implica din inimă într-un proiect, nu îl iau.”</blockquote>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <CtaButton location="about-founder" label="Hai să vorbim" />
              <TrackedA href={site.instagramUrl} event="click_instagram" location="about" external className="link-arrow" ariaLabel="Urmărește-ne pe Instagram (se deschide într-o filă nouă)">
                Urmărește-ne pe Instagram <span aria-hidden="true">›</span>
              </TrackedA>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="valori">
        <div className="wrap">
          <p className="eyebrow">Ce ne ghidează</p>
          <h2 id="valori">Patru lucruri pe care nu le negociem.</h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([t, d]) => (
              <li key={t} className="border-t-[3px] border-ink pt-4">
                <h3 className="text-xl">{t.replace(/\.$/, '')}</h3>
                <p className="mt-2 text-grey-700">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="ce-facem">
        <div className="wrap">
          <p className="eyebrow">Ce facem</p>
          <h2 id="ce-facem">Cinci servicii, un singur partener.</h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicii/${s.slug}`} className="link-arrow">
                  {s.name} <span aria-hidden="true">›</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta location="about" title="Hai să ne cunoaștem." text={`Un apel, fără obligații. ${CTA.sub.replace('Află', 'Afli')} Iar noi aflăm dacă ne potrivim.`} />
    </>
  )
}
