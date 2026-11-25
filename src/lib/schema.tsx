// Structured data. Only facts we hold; no Review/AggregateRating until real reviews exist.
// One organization (@id at the site root), described in the language of the page.
import { servicesFor, site, siteText } from './site'
import { localePath, type Locale } from '@/i18n/config'
import { getUi } from '@/i18n/ui'

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

const abs = (p: string) => new URL(p, site.url).toString()
const ORG = () => abs('/#org')
const PERSON = () => abs('/ro/despre-noi#emilian-horea')

const text = {
  ro: {
    org: (d: string, c: string) => `${d} din ${c}: social media, ședințe foto/video, editare Reels, website și campanii Ads.`,
    job: 'Fondator',
    alumni: 'Universitatea Babeș-Bolyai, Facultatea de Științe Politice, Administrative și ale Comunicării',
  },
  en: {
    org: (d: string, c: string) => `${d} in ${c}: social media, photo and video shoots, Reels editing, websites and ad campaigns.`,
    job: 'Founder',
    alumni: 'Babeș-Bolyai University, Faculty of Political, Administrative and Communication Sciences',
  },
} satisfies Record<Locale, unknown>

export function organizationLd(lang: Locale) {
  const s = siteText(lang)
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG(),
    name: site.name,
    description: text[lang].org(s.descriptor, s.city),
    inLanguage: lang,
    url: abs(localePath(lang, '/')),
    logo: abs('/icon.svg'),
    image: abs(`${localePath(lang, '/')}/opengraph-image`),
    telephone: site.phoneE164,
    areaServed: { '@type': 'City', name: s.city },
    address: { '@type': 'PostalAddress', addressLocality: 'București', addressCountry: 'RO' },
    sameAs: [site.instagramUrl],
    founder: { '@id': PERSON() },
    makesOffer: servicesFor(lang).map((x) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: x.name, url: abs(localePath(lang, `/servicii/${x.slug}`)) } })),
  }
}

export function personLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON(),
    name: site.founder.name,
    jobTitle: text[lang].job,
    worksFor: { '@id': ORG() },
    alumniOf: { '@type': 'CollegeOrUniversity', name: text[lang].alumni },
    image: abs('/img/emilian-horea.webp'),
    sameAs: [site.instagramUrl],
  }
}

export function serviceLd(lang: Locale, slug: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: name,
    inLanguage: lang,
    url: abs(localePath(lang, `/servicii/${slug}`)),
    provider: { '@id': ORG() },
    areaServed: { '@type': 'City', name: siteText(lang).city },
  }
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  }
}

/** trail paths are locale-neutral; "Home" is added first. */
export function breadcrumbLd(lang: Locale, trail: { name: string; path: string }[]) {
  const full = [{ name: getUi(lang).breadcrumbs.home, path: '/' }, ...trail]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: full.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(localePath(lang, t.path)) })),
  }
}
