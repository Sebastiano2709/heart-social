import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

// Indexing is OFF until NEXT_PUBLIC_ALLOW_INDEXING=true is set on the production deployment.
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'
  return {
    rules: allow ? [{ userAgent: '*', allow: '/', disallow: ['/multumim'] }] : [{ userAgent: '*', disallow: '/' }],
    sitemap: allow ? new URL('/sitemap.xml', site.url).toString() : undefined,
  }
}
