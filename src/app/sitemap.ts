import type { MetadataRoute } from 'next'
import { services, site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/servicii', ...services.map((s) => `/servicii/${s.slug}`), '/portofoliu', '/despre-noi', '/apel-gratuit', '/politica-de-confidentialitate', '/politica-cookies', '/termeni-si-conditii']
  return paths.map((p) => ({ url: new URL(p, site.url).toString(), changeFrequency: 'monthly', priority: p === '/' ? 1 : p.startsWith('/servicii') || p === '/apel-gratuit' ? 0.8 : 0.5 }))
}
