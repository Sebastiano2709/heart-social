// Single source of truth for business facts. Language-neutral facts live in `site`; anything a visitor
// reads is per locale (ro is the reference, en must have the same keys). Missing client facts are tracked
// in docs/PLACEHOLDERS.md and are not shown on the site.
import type { Locale } from '@/i18n/config'

export const site = {
  name: 'Heart Social',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  phoneDisplay: '0799 521 159',
  phoneDisplayIntl: '+40 799 521 159',
  phoneE164: '+40799521159',
  instagramHandle: 'heartsocial_promovareonline',
  instagramUrl: 'https://www.instagram.com/heartsocial_promovareonline/',
  email: '[EMAIL]',
  companyData: '[DATE FIRMĂ: denumire, CUI, nr. Registrul Comerțului, sediu]',
  founder: { name: 'Emilian Horea', year: 2023 },
} as const

const local = {
  ro: {
    tagline: 'Ne implicăm din inimă în promovarea afacerii tale.',
    descriptor: 'Agenție de promovare online',
    city: 'București',
    whatsappText: 'Bună! Aș vrea să aflu cum mă puteți ajuta cu promovarea afacerii mele.',
    phone: site.phoneDisplay,
  },
  en: {
    tagline: 'We put our heart into promoting your business.',
    descriptor: 'Online marketing agency',
    city: 'Bucharest',
    whatsappText: 'Hi! I’d like to find out how you can help me promote my business.',
    phone: site.phoneDisplayIntl,
  },
} satisfies Record<Locale, Record<string, string>>

export const siteText = (lang: Locale) => local[lang]

export const whatsappHref = (lang: Locale) => `https://wa.me/${site.phoneE164.replace('+', '')}?text=${encodeURIComponent(local[lang].whatsappText)}`
export const telHref = `tel:${site.phoneE164}`

const cta = {
  ro: { primary: 'Rezervă-ți un apel gratuit', short: 'Apel gratuit', sub: 'Află cum te putem ajuta să-ți crești business-ul.' },
  en: { primary: 'Book your free call', short: 'Free call', sub: 'Find out how we can help you grow your business.' },
} satisfies Record<Locale, Record<string, string>>

/** Locale-neutral href; prefix with localePath(lang, CTA_HREF). */
export const CTA_HREF = '/apel-gratuit'
export const ctaText = (lang: Locale) => cta[lang]

export type ServiceSlug = 'social-media-marketing' | 'sedinte-foto-video' | 'editare-reels' | 'creare-site-web-design' | 'campanii-ads'

export type Service = {
  slug: ServiceSlug
  name: string
  benefit: string
  summary: string
  icon: 'social' | 'camera' | 'reels' | 'web' | 'ads'
  related: ServiceSlug[]
}

const serviceList: Record<Locale, Service[]> = {
  ro: [
    { slug: 'social-media-marketing', name: 'Social Media Marketing', benefit: 'Un Instagram care vinde, nu doar unul care arată bine.', summary: 'Strategie, calendar de postări, texte și comunitate, de la cap la coadă.', icon: 'social', related: ['sedinte-foto-video', 'editare-reels'] },
    { slug: 'sedinte-foto-video', name: 'Ședințe foto/video', benefit: 'Imagini care arată cine ești cu adevărat.', summary: 'Fotografii de produs, de echipă și de locație, plus filmări pentru Reels și reclame.', icon: 'camera', related: ['editare-reels', 'social-media-marketing'] },
    { slug: 'editare-reels', name: 'Editare Reels', benefit: 'Reels care opresc scroll-ul.', summary: 'Montaj ritmat, subtitrări, sunet și formate gândite pentru Instagram și TikTok.', icon: 'reels', related: ['sedinte-foto-video', 'social-media-marketing'] },
    { slug: 'creare-site-web-design', name: 'Website & web design', benefit: 'Un site care transformă vizitatorii în clienți.', summary: 'Rapid, clar pe telefon și construit în jurul unui singur scop: să te contacteze.', icon: 'web', related: ['campanii-ads', 'social-media-marketing'] },
    { slug: 'campanii-ads', name: 'Campanii Ads', benefit: 'Reclame care aduc oameni, nu doar afișări.', summary: 'Campanii pe Meta și TikTok, cu bugetul pus acolo unde aduce rezultate.', icon: 'ads', related: ['creare-site-web-design', 'social-media-marketing'] },
  ],
  en: [
    { slug: 'social-media-marketing', name: 'Social Media Marketing', benefit: 'An Instagram that sells, not just one that looks good.', summary: 'Strategy, a content calendar, copy and community management, handled from start to finish.', icon: 'social', related: ['sedinte-foto-video', 'editare-reels'] },
    { slug: 'sedinte-foto-video', name: 'Photo & video shoots', benefit: 'Images that show who you really are.', summary: 'Product, team and location photography, plus footage for Reels and ads.', icon: 'camera', related: ['editare-reels', 'social-media-marketing'] },
    { slug: 'editare-reels', name: 'Reels editing', benefit: 'Reels that stop the scroll.', summary: 'Tight editing, subtitles, sound and formats built for Instagram and TikTok.', icon: 'reels', related: ['sedinte-foto-video', 'social-media-marketing'] },
    { slug: 'creare-site-web-design', name: 'Website & web design', benefit: 'A website that turns visitors into customers.', summary: 'Fast, clear on a phone and built around one goal: getting people to contact you.', icon: 'web', related: ['campanii-ads', 'social-media-marketing'] },
    { slug: 'campanii-ads', name: 'Ad campaigns', benefit: 'Ads that bring in people, not just impressions.', summary: 'Campaigns on Meta and TikTok, with the budget put where it brings results.', icon: 'ads', related: ['creare-site-web-design', 'social-media-marketing'] },
  ],
}

export const SERVICE_SLUGS: ServiceSlug[] = serviceList.ro.map((s) => s.slug)
export const servicesFor = (lang: Locale) => serviceList[lang]
export const serviceBySlug = (lang: Locale, slug: string) => serviceList[lang].find((s) => s.slug === slug)

const navLabels = {
  ro: { home: 'Acasă', services: 'Servicii', allServices: 'Toate serviciile', portfolio: 'Portofoliu', about: 'Despre noi' },
  en: { home: 'Home', services: 'Services', allServices: 'All services', portfolio: 'Portfolio', about: 'About us' },
} satisfies Record<Locale, Record<string, string>>

export const navFor = (lang: Locale) => {
  const n = navLabels[lang]
  return {
    labels: n,
    links: [
      { label: n.portfolio, href: '/portofoliu' },
      { label: n.about, href: '/despre-noi' },
    ],
  }
}
