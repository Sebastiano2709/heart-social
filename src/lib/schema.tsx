// Structured data. Only facts we hold; no Review/AggregateRating until real reviews exist.
import { services, site } from './site'

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

const abs = (p: string) => new URL(p, site.url).toString()

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': abs('/#org'),
    name: site.name,
    description: `${site.descriptor} din ${site.city}: social media, ședințe foto/video, editare Reels, website și campanii Ads.`,
    url: abs('/'),
    logo: abs('/icon.svg'),
    image: abs('/opengraph-image'),
    telephone: site.phoneE164,
    areaServed: { '@type': 'City', name: 'București' },
    address: { '@type': 'PostalAddress', addressLocality: 'București', addressCountry: 'RO' },
    sameAs: [site.instagramUrl],
    founder: { '@id': abs('/despre-noi#emilian-horea') },
    makesOffer: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: abs(`/servicii/${s.slug}`) } })),
  }
}

export function personLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': abs('/despre-noi#emilian-horea'),
    name: site.founder.name,
    jobTitle: 'Fondator',
    worksFor: { '@id': abs('/#org') },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitatea Babeș-Bolyai, Facultatea de Științe Politice, Administrative și ale Comunicării' },
    image: abs('/img/emilian-horea.webp'),
    sameAs: [site.instagramUrl],
  }
}

export function serviceLd(slug: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: name,
    url: abs(`/servicii/${slug}`),
    provider: { '@id': abs('/#org') },
    areaServed: { '@type': 'City', name: 'București' },
  }
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  }
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(t.path) })),
  }
}
