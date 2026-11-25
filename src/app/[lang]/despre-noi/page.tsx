import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CtaButton, TrackedA } from '@/components/interactive'
import { FinalCta } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { servicesFor, site } from '@/lib/site'
import { JsonLd, breadcrumbLd, personLd } from '@/lib/schema'
import { alternatesFor, isLocale, localePath, type Locale } from '@/i18n/config'

const copy = {
  ro: {
    title: 'Despre Heart Social, agenția lui Emilian Horea',
    description: 'Heart Social e o agenție de promovare online din București, fondată de Emilian Horea, absolvent de Publicitate la FSPAC. Află povestea noastră.',
    crumb: 'Despre noi',
    h1: ['O agenție construită ', 'din inimă', ', pentru afaceri care vor să crească.'],
    lead: 'Heart Social e o agenție de promovare online din București. Facem social media, ședințe foto și video, Reels, site-uri și reclame pentru afaceri locale, firme B2B și profesioniști independenți. Mică prin alegere, implicată în fiecare proiect.',
    photoAlt: 'Emilian Horea, fondatorul Heart Social, cu eșarfa violet de absolvent Publicitate FSPAC',
    photoCaption: 'Violetul de pe eșarfa de absolvent e același violet al brandului.',
    founderEyebrow: 'Fondatorul',
    founderTitle: 'Salut, sunt Emilian Horea.',
    story: (year: number) => [
      `Am absolvit Publicitatea la Facultatea de Științe Politice, Administrative și ale Comunicării (FSPAC) a Universității Babeș-Bolyai din Cluj-Napoca, în ${year}.`,
      'Încă din facultate am văzut același lucru la afacerile mici: oameni care fac lucruri foarte bune, dar pe care nu-i știe aproape nimeni. Nu le lipsea calitatea, le lipsea cineva care să le spună povestea.',
      'Așa a apărut Heart Social. Numele nu e întâmplător: mă implic în fiecare proiect de parcă ar fi al meu. Dacă nu pot face asta, prefer să spun nu.',
    ],
    quote: '„Dacă nu mă pot implica din inimă într-un proiect, nu îl iau.”',
    talk: 'Hai să vorbim',
    instagram: 'Urmărește-ne pe Instagram',
    instagramAria: 'Urmărește-ne pe Instagram (se deschide într-o filă nouă)',
    valuesEyebrow: 'Ce ne ghidează',
    valuesTitle: 'Patru lucruri pe care nu le negociem.',
    values: [
      ['Implicare', 'Trăim proiectul tău, nu doar îl bifăm.'],
      ['Sinceritate', 'Îți spunem ce merge și ce nu, chiar și când nu e ce vrei să auzi.'],
      ['Muncă făcută de noi', 'Filmăm, montăm și scriem noi. Știi mereu cine lucrează pentru tine.'],
      ['Răbdare', 'Rezultatele bune se construiesc lună de lună, nu peste noapte.'],
    ] as [string, string][],
    doEyebrow: 'Ce facem',
    doTitle: 'Cinci servicii, un singur partener.',
    finalTitle: 'Hai să ne cunoaștem.',
    finalText: 'Un apel, fără obligații. Afli cum te putem ajuta să-ți crești business-ul. Iar noi aflăm dacă ne potrivim.',
  },
  en: {
    title: 'About Heart Social, the agency founded by Emilian Horea',
    description: 'Heart Social is an online marketing agency in Bucharest, founded by Emilian Horea, an Advertising graduate of FSPAC. Read our story.',
    crumb: 'About us',
    h1: ['An agency built ', 'from the heart', ', for businesses that want to grow.'],
    lead: 'Heart Social is an online marketing agency in Bucharest. We do social media, photo and video shoots, Reels, websites and ads for local businesses, B2B companies and independent professionals. Small by choice, involved in every project.',
    photoAlt: 'Emilian Horea, founder of Heart Social, wearing the violet sash of an FSPAC Advertising graduate',
    photoCaption: 'The violet of the graduation sash is the same violet as the brand.',
    founderEyebrow: 'The founder',
    founderTitle: "Hi, I'm Emilian Horea.",
    story: (year: number) => [
      `I graduated in Advertising from the Faculty of Political, Administrative and Communication Sciences (FSPAC) at Babeș-Bolyai University in Cluj-Napoca, in ${year}.`,
      'Back in university I kept seeing the same thing with small businesses: people doing really good work that almost nobody knew about. They didn’t lack quality; they lacked someone to tell their story.',
      'That is how Heart Social started. The name is no accident: I get involved in every project as if it were my own. If I can’t do that, I’d rather say no.',
    ],
    quote: '“If I can’t put my heart into a project, I don’t take it on.”',
    talk: "Let's talk",
    instagram: 'Follow us on Instagram',
    instagramAria: 'Follow us on Instagram (opens in a new tab)',
    valuesEyebrow: 'What guides us',
    valuesTitle: 'Four things we don’t compromise on.',
    values: [
      ['Commitment', 'We live your project, we don’t just tick it off.'],
      ['Honesty', 'We tell you what works and what doesn’t, even when it isn’t what you want to hear.'],
      ['Work we do ourselves', 'We shoot, edit and write it ourselves. You always know who is working for you.'],
      ['Patience', 'Good results are built month by month, not overnight.'],
    ] as [string, string][],
    doEyebrow: 'What we do',
    doTitle: 'Five services, one partner.',
    finalTitle: "Let's get to know each other.",
    finalText: 'One call, no strings attached. You find out how we can help you grow your business. And we find out if we are a good fit.',
  },
} satisfies Record<Locale, unknown>

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const { title, description } = copy[lang]
  return { title, description, alternates: alternatesFor(lang, '/despre-noi'), openGraph: { title, description, url: localePath(lang, '/despre-noi'), type: 'profile' } }
}

export default async function About({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const c = copy[lang]
  return (
    <>
      <JsonLd data={personLd(lang)} />
      <JsonLd data={breadcrumbLd(lang, [{ name: c.crumb, path: '/despre-noi' }])} />
      <section className="section" aria-labelledby="h1">
        <div className="wrap max-w-5xl">
          <Breadcrumbs lang={lang} trail={[{ name: c.crumb }]} />
          <p className="eyebrow">{c.crumb}</p>
          <h1 id="h1">
            {c.h1[0]}
            <span className="u">{c.h1[1]}</span>
            {c.h1[2]}
          </h1>
          <p className="lead mt-6">{c.lead}</p>
        </div>
      </section>

      <section id="emilian-horea" className="section bg-alt" aria-labelledby="fondator">
        <div className="wrap grid items-start gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <figure className="mx-auto w-full max-w-sm md:sticky md:top-28 md:max-w-none">
            <Image src="/img/emilian-horea.webp" alt={c.photoAlt} width={455} height={742} sizes="(min-width: 768px) 40vw, 90vw" className="w-full object-cover" priority={false} />
            <figcaption className="mt-3 text-sm text-grey-700">{c.photoCaption}</figcaption>
          </figure>
          <div>
            <p className="eyebrow">{c.founderEyebrow}</p>
            <h2 id="fondator">{c.founderTitle}</h2>
            <div className="mt-6 grid gap-5 text-lg">
              {c.story(site.founder.year).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <blockquote className="mt-8 border-l-[3px] border-magenta-600 pl-5 text-2xl font-extrabold leading-snug">{c.quote}</blockquote>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <CtaButton location="about-founder" label={c.talk} />
              <TrackedA href={site.instagramUrl} event="click_instagram" location="about" external className="link-arrow" ariaLabel={c.instagramAria}>
                {c.instagram} <span aria-hidden="true">›</span>
              </TrackedA>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="valori">
        <div className="wrap">
          <p className="eyebrow">{c.valuesEyebrow}</p>
          <h2 id="valori">{c.valuesTitle}</h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.map(([t, d]) => (
              <li key={t} className="border-t-[3px] border-ink pt-4">
                <h3 className="text-xl">{t}</h3>
                <p className="mt-2 text-grey-700">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="ce-facem">
        <div className="wrap">
          <p className="eyebrow">{c.doEyebrow}</p>
          <h2 id="ce-facem">{c.doTitle}</h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {servicesFor(lang).map((s) => (
              <li key={s.slug}>
                <Link href={localePath(lang, `/servicii/${s.slug}`)} className="link-arrow">
                  {s.name} <span aria-hidden="true">›</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta lang={lang} location="about" title={c.finalTitle} text={c.finalText} />
    </>
  )
}
