// Single source of truth for business facts. Anything in [BRACKETS] is a visible placeholder
// awaiting real data from the client — see PLACEHOLDERS.md.

export const site = {
  name: 'Heart Social',
  tagline: 'Ne implicăm din inimă în promovarea afacerii tale.',
  descriptor: 'Agenție de promovare online',
  city: 'București',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  phoneDisplay: '0799 521 159',
  phoneE164: '+40799521159',
  whatsappText: 'Bună! Aș vrea să aflu cum mă puteți ajuta cu promovarea afacerii mele.',
  instagramHandle: 'heartsocial_promovareonline',
  instagramUrl: 'https://www.instagram.com/heartsocial_promovareonline/',
  email: '[EMAIL]',
  companyData: '[DATE FIRMĂ: denumire, CUI, nr. Registrul Comerțului, sediu]',
  founder: {
    name: 'Emilian Horea',
    degree: 'Publicitate, FSPAC, Universitatea Babeș-Bolyai din Cluj-Napoca',
    year: 2023,
  },
} as const

export const whatsappHref = `https://wa.me/${site.phoneE164.replace('+', '')}?text=${encodeURIComponent(site.whatsappText)}`
export const telHref = `tel:${site.phoneE164}`

export const CTA = {
  primary: 'Rezervă-ți un apel gratuit',
  short: 'Apel gratuit',
  sub: 'Află cum te putem ajuta să-ți crești business-ul.',
  href: '/apel-gratuit',
} as const

export type ServiceSlug =
  | 'social-media-marketing'
  | 'sedinte-foto-video'
  | 'editare-reels'
  | 'creare-site-web-design'
  | 'campanii-ads'

export type Service = {
  slug: ServiceSlug
  name: string
  benefit: string
  summary: string
  icon: 'social' | 'camera' | 'reels' | 'web' | 'ads'
  related: ServiceSlug[]
}

export const services: Service[] = [
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    benefit: 'Un Instagram care vinde, nu doar arată bine.',
    summary: 'Strategie, calendar de postări, texte și comunitate, gestionate cap-coadă.',
    icon: 'social',
    related: ['sedinte-foto-video', 'editare-reels'],
  },
  {
    slug: 'sedinte-foto-video',
    name: 'Ședințe foto/video',
    benefit: 'Imagini care arată cine ești cu adevărat.',
    summary: 'Fotografii de produs, de echipă și de locație, plus filmări pentru Reels și reclame.',
    icon: 'camera',
    related: ['editare-reels', 'social-media-marketing'],
  },
  {
    slug: 'editare-reels',
    name: 'Editare Reels',
    benefit: 'Reels care opresc scroll-ul.',
    summary: 'Montaj ritmat, subtitrări, sunet și formate gândite pentru Instagram și TikTok.',
    icon: 'reels',
    related: ['sedinte-foto-video', 'social-media-marketing'],
  },
  {
    slug: 'creare-site-web-design',
    name: 'Website & web design',
    benefit: 'Un site care transformă vizitatorii în clienți.',
    summary: 'Rapid, clar pe telefon și construit în jurul unui singur scop: să te contacteze.',
    icon: 'web',
    related: ['campanii-ads', 'social-media-marketing'],
  },
  {
    slug: 'campanii-ads',
    name: 'Campanii Ads',
    benefit: 'Reclame care aduc oameni, nu doar afișări.',
    summary: 'Campanii pe Meta și TikTok [GOOGLE: DE CONFIRMAT], cu bugetul pus acolo unde aduce rezultate.',
    icon: 'ads',
    related: ['creare-site-web-design', 'social-media-marketing'],
  },
]

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)

export const nav = [
  { label: 'Servicii', href: '/servicii', children: services.map((s) => ({ label: s.name, href: `/servicii/${s.slug}` })) },
  { label: 'Portofoliu', href: '/portofoliu' },
  { label: 'Despre noi', href: '/despre-noi' },
  // Recenzii: added when ≥3 real reviews exist. Blog: phase 2.
] as const
