import type { MetadataRoute } from 'next'
import { SERVICE_SLUGS, site } from '@/lib/site'
import { localePath, locales } from '@/i18n/config'

// Every page in both languages, each entry carrying its hreflang alternates (07 §2.14).
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/servicii', ...SERVICE_SLUGS.map((s) => `/servicii/${s}`), '/portofoliu', '/despre-noi', '/apel-gratuit', '/politica-de-confidentialitate', '/politica-cookies', '/termeni-si-conditii']
  const abs = (p: string) => new URL(p, site.url).toString()
  return locales.flatMap((lang) =>
    paths.map((p) => ({
      url: abs(localePath(lang, p)),
      changeFrequency: 'monthly' as const,
      priority: p === '/' ? 1 : p.startsWith('/servicii') || p === '/apel-gratuit' ? 0.8 : 0.5,
      alternates: { languages: { ...Object.fromEntries(locales.map((l) => [l, abs(localePath(l, p))])), 'x-default': abs('/') } },
    })),
  )
}
