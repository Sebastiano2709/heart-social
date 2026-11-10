import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Showreel } from '@/components/showreel'
import { Marquee, SectionHead, ServiceCards, CtaRow } from '@/components/sections'
import { Rosette } from '@/components/brand'
import { CountUp, CtaButton, Reveal, TrackedA } from '@/components/interactive'
import { FinalCta } from '@/components/footer'
import { IconHeartHand, IconCamera, IconTarget, IconReport, IconRings, IconStack, IconPeople, IconLink, IconInstagram } from '@/components/icons'
import { CTA, services, site } from '@/lib/site'
import { JsonLd, organizationLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Agenție social media București | Heart Social',
  description: 'Social media, ședințe foto/video, Reels, site-uri și reclame pentru afaceri din București. Rezervă-ți un apel gratuit cu Heart Social.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Agenție social media București | Heart Social', description: 'Social media, ședințe foto/video, Reels, site-uri și reclame pentru afaceri din București. Rezervă-ți un apel gratuit cu Heart Social.', url: '/' },
}

const pillars = [
  { Icon: IconHeartHand, t: 'Implicare reală.', d: 'Ne pasă de afacerea ta ca de a noastră. De aici ne vine și numele.' },
  { Icon: IconCamera, t: 'Conținut filmat de noi.', d: 'Ședințele foto și video le facem noi, așa că ce postezi arată ca tine, nu ca o bancă de imagini.' },
  { Icon: IconTarget, t: 'Strategie + execuție.', d: 'Nu doar îți spunem ce să faci. Facem noi, de la idee la postare.' },
  { Icon: IconReport, t: 'Raportare transparentă.', d: 'Vezi clar ce a mers, ce nu și ce schimbăm, pe limba ta.' },
  { Icon: IconRings, t: 'Parteneriat pe termen lung.', d: 'Construim împreună, lună de lună, nu proiect cu proiect.' },
]

const audiences = [
  {
    t: 'Pentru afaceri locale',
    items: ([
      ['Mai mulți clienți din zonă.', 'Cafenele, saloane, restaurante: te găsesc oamenii care sunt la câțiva pași de tine.'],
      ['Conținut care arată locul.', 'Filmăm atmosfera, oamenii și produsele, ca lumea să vină cu încredere de la prima vizită.'],
      ['Mesaje, rezervări, telefoane.', 'Totul e gândit ca urmăritorii să devină clienți.'],
    ] as [string, string][]),
  },
  {
    t: 'Pentru companii B2B',
    items: [
      ['Credibilitate în fața partenerilor.', 'O prezență online la fel de serioasă ca firma ta.'],
      ['Mesaje clare pentru servicii complicate.', 'Explicăm ce faci pe înțelesul celui care decide.'],
      ['Un singur partener.', 'Site, foto-video și campanii, coordonate de aceeași echipă.'],
    ] as [string, string][],
  },
  {
    t: 'Pentru profesioniști independenți',
    items: [
      ['Un brand personal care inspiră încredere.', 'Antrenori, consultanți, creatori: oamenii aleg oameni.'],
      ['Consecvență fără stres.', 'Tu îți faci treaba; noi ne ocupăm de conținut și de calendar.'],
      ['O imagine profesionistă, dar autentică.', 'Fotografii și Reels în care te recunoști.'],
    ] as [string, string][],
  },
]

export default function Home() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      {/* 1. Showreel + band */}
      <Showreel />
      <Marquee items={services.map((s) => s.name.toUpperCase())} />

      {/* 2. Main block (H1) */}
      <section className="section" aria-labelledby="h1">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[7fr_5fr]">
          <div>
            <p className="eyebrow">Agenție de promovare online · București</p>
            <h1 id="h1">
              Postezi constant. Dar <span className="u">clienții</span> tot nu sună?
            </h1>
            <p className="lead mt-6">
              Rareori e vina efortului tău. De obicei lipsește legătura dintre ce postezi și ce vrei să vinzi. Noi o construim cap-coadă: strategie, ședințe foto și video, Reels, site și reclame, făcute sub același acoperiș, din inimă și cu ochii pe rezultate.
            </p>
            <div className="mt-9">
              <CtaButton location="home-hero" />
              <p className="mt-3 text-grey-700">{CTA.sub}</p>
            </div>
          </div>
          <div>
            <Rosette className="mx-auto w-48 max-w-full sm:w-64 lg:w-[22rem]" />
          </div>
        </div>
      </section>

      {/* 3. What the free call covers (launch variant of testimonials) */}
      <section className="section bg-alt" aria-labelledby="apel">
        <div className="wrap">
          <SectionHead eyebrow="Apel gratuit, fără obligații" id="apel" title="Un apel. O imagine clară despre ce merge și ce nu." center />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ['Te ascultăm.', 'Ne spui ce vinzi, cui și ce ai încercat până acum. Fără formulare lungi și fără jargon.'],
              ['Ne uităm împreună.', 'Trecem prin Instagramul, site-ul sau reclamele tale și îți arătăm unde se pierd atenția și clienții.'],
              ['Pleci cu pașii următori.', 'Primești câteva idei pe care le poți aplica imediat, cu noi sau fără noi.'],
            ].map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 80} className="facet-card p-8 text-center">
                <span className="font-display text-5xl text-violet-700">0{i + 1}</span>
                <h3 className="mt-3">{t}</h3>
                <p className="mt-2 text-grey-700">{d}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <CtaButton location="home-call" label="Vreau apelul gratuit" />
          </div>
        </div>
      </section>

      {/* 4. Stats band (facts only) */}
      <section className="on-dark" aria-label="Heart Social în cifre">
        <div className="h-2.5" style={{ background: 'var(--grad-heart)' }} />
        <div className="wrap grid gap-10 py-16 text-center sm:grid-cols-3">
          {[
            { Icon: IconStack, n: 5, l: 'servicii sub un singur acoperiș' },
            { Icon: IconPeople, n: 3, l: 'tipuri de clienți: afaceri locale, B2B și independenți' },
            { Icon: IconLink, n: 1, l: 'singur partener, de la strategie la postare' },
          ].map(({ Icon, n, l }) => (
            <div key={l}>
              <Icon className="mx-auto mb-4 size-16 text-white" accent={false} />
              <p className="font-display text-6xl leading-none">
                <CountUp value={n} />
              </p>
              <p className="mx-auto mt-3 max-w-[24ch] text-[#d9d6de]">{l}</p>
            </div>
          ))}
        </div>
        <div className="wrap pb-14 text-center">
          <Link href="/portofoliu" className="link-arrow">
            Vezi portofoliul <span aria-hidden="true">›</span>
          </Link>
        </div>
      </section>

      {/* 5. Meet Heart Social */}
      <section className="section" aria-labelledby="cunoaste">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Cunoaște Heart Social</p>
              <h2 id="cunoaste">O agenție tânără, care se implică de parcă ar fi afacerea ei.</h2>
            </div>
            <p className="lead self-end">
              Multe agenții îți vând ori postări, ori reclame, ori un site. Rezultatul: bucăți care nu se leagă. La Heart Social, strategia, filmarea, montajul, site-ul și campaniile pleacă din același plan și duc spre același scop: mai mulți clienți pentru tine.
            </p>
          </div>
          <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map(({ Icon, t, d }, i) => (
              <Reveal as="li" key={t} delay={i * 80} className="text-center">
                <Icon className="mx-auto mb-5 size-20 text-ink" />
                <h3 className="text-lg">{t.replace('.', '')}</h3>
                <p className="mt-2 text-[0.9375rem] text-grey-700">{d}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-14 text-center">
            <CtaButton location="home-pillars" label="Hai să vorbim" />
          </div>
        </div>
      </section>

      {/* 6. Services */}
      <section className="section bg-alt" aria-labelledby="servicii">
        <div className="wrap">
          <SectionHead eyebrow="Ce facem" id="servicii" title="Tot ce îi trebuie afacerii tale ca să fie văzută. Și aleasă." />
          <ServiceCards />
          <CtaRow location="home-services" note="Nu știi de unde să începi? Exact asta lămurim la telefon." />
        </div>
      </section>

      {/* 7. Who we work with */}
      <section className="section" aria-labelledby="cine">
        <div className="wrap">
          <SectionHead eyebrow="Cu cine lucrăm" id="cine" title="Afacere locală, firmă B2B sau pe cont propriu: pornim de la ce ai nevoie tu.">
            Clienții noștri sunt foarte diferiți. Au însă un lucru în comun: vor să fie găsiți, recunoscuți și aleși.
          </SectionHead>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal key={a.t} delay={i * 80}>
                <h3 className="border-t-[3px] border-ink pt-4 text-xl">
                  Pentru <span className="text-magenta-600">{a.t.replace('Pentru ', '')}</span>
                </h3>
                <dl className="mt-6 grid gap-6">
                  {a.items.map(([h, d]) => (
                    <div key={h}>
                      <dt className="font-extrabold uppercase tracking-[0.02em]">{h.replace('.', '')}</dt>
                      <dd className="mt-1 text-grey-700">{d}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <CtaButton location="home-audiences" label="Vezi ce putem face pentru tine" variant="btn-ghost" />
          </div>
        </div>
      </section>

      {/* 8. Founder */}
      <section className="section bg-alt" aria-labelledby="fondator">
        <div className="wrap grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Reveal className="relative mx-auto w-full max-w-sm md:max-w-none">
            <Image src="/img/emilian-horea.webp" alt="Emilian Horea, fondatorul Heart Social, cu eșarfa violet de absolvent Publicitate FSPAC" width={455} height={742} sizes="(min-width: 768px) 40vw, 90vw" className="aspect-[4/5] w-full object-cover object-[50%_20%]" />
            <span aria-hidden="true" className="absolute -bottom-3 -right-3 -z-0 hidden h-24 w-24 md:block" style={{ background: 'var(--grad-heart)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
          </Reveal>
          <div>
            <p className="eyebrow">Cine e în spatele Heart Social</p>
            <h2 id="fondator">Salut, sunt Emilian.</h2>
            <p className="lead mt-5">
              Am absolvit Publicitatea la FSPAC, Universitatea Babeș-Bolyai din Cluj-Napoca, în {site.founder.year}. Am pornit Heart Social ca să ajut afacerile mici să fie văzute, recunoscute și alese.
            </p>
            <blockquote className="mt-8 border-l-[3px] border-magenta-600 pl-5 text-xl font-extrabold leading-snug">
              „Dacă nu mă pot implica din inimă într-un proiect, nu îl iau.”
            </blockquote>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/despre-noi" className="link-arrow">
                Află povestea mea <span aria-hidden="true">›</span>
              </Link>
              <TrackedA href={site.instagramUrl} event="click_instagram" location="home-founder" external className="link-arrow" ariaLabel={`@${site.instagramHandle} pe Instagram (se deschide într-o filă nouă)`}>
                <IconInstagram className="size-5" /> @{site.instagramHandle}
              </TrackedA>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Recent work (launch variant of the second testimonials block) */}
      <section className="section" aria-labelledby="lucrari">
        <div className="wrap">
          <SectionHead eyebrow="Lucrări recente" id="lucrari" title="Mai bine îți arătăm." center />
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-grey-700">Cele mai noi Reels, fotografii și campanii le găsești pe Instagram.</p>
          <div className="mt-8 text-center">
            <TrackedA href={site.instagramUrl} event="click_instagram" location="home-work" external className="link-arrow" ariaLabel="Vezi mai multe pe Instagram (se deschide într-o filă nouă)">
              Vezi mai multe pe Instagram <span aria-hidden="true">›</span>
            </TrackedA>
          </div>
        </div>
      </section>

      <FinalCta location="home" />
    </>
  )
}
