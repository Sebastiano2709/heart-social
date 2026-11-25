// Locale routing (03 §8.7): every page lives under /ro or /en. Only the bare "/" is negotiated —
// the visitor's saved choice (cookie) first, then Accept-Language, then Romanian. Localized URLs are
// never redirected by language. Legacy unprefixed URLs (/servicii, /apel-gratuit…) move permanently to /ro.
import { NextResponse, type NextRequest } from 'next/server'
import { LOCALE_COOKIE, defaultLocale, isLocale, type Locale } from '@/i18n/config'

/** Pick the best supported locale from an Accept-Language header ("en-GB,en;q=0.9,ro;q=0.8"). */
export function negotiate(header: string | null): Locale {
  if (!header) return defaultLocale
  const ranked = header
    .split(',')
    .map((part, i) => {
      const [tag = '', ...params] = part.trim().split(';')
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='))
      return { base: tag.trim().toLowerCase().split('-')[0], q: q ? Number(q.slice(2)) : 1, i }
    })
    .filter((r) => r.base && r.q > 0 && !Number.isNaN(r.q))
    .sort((a, b) => b.q - a.q || a.i - b.i)
  return ranked.find((r) => isLocale(r.base))?.base as Locale | undefined ?? defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]
  if (isLocale(first)) return NextResponse.next()

  const url = request.nextUrl.clone()
  if (pathname === '/') {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value
    const lang = isLocale(saved) ? saved : negotiate(request.headers.get('accept-language'))
    url.pathname = `/${lang}`
    const res = NextResponse.redirect(url, 307)
    res.headers.set('Vary', 'Accept-Language, Cookie')
    res.headers.set('Cache-Control', 'private, no-store')
    return res
  }
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url, 308)
}

export const config = {
  // Skip Next internals, API routes, metadata files and anything with a file extension (public assets).
  matcher: ['/((?!_next/|api/|favicon|icon|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]+$).*)'],
}
