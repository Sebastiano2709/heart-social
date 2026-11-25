// Locale config (03 §8.7.3). Dependency-free: imported by proxy.ts, layouts and the language switcher.
export const locales = ['ro', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'ro'
/** The visitor's explicit choice from the language switcher (a strictly necessary preference, 09 §5.13.3). */
export const LOCALE_COOKIE = 'locale'

export const isLocale = (value: string | undefined | null): value is Locale => !!value && (locales as readonly string[]).includes(value)

/** Prefix a locale-neutral path ("/", "/servicii") with the locale: "/ro", "/en/servicii". */
export const localePath = (lang: Locale, path: string) => (path === '/' ? `/${lang}` : `/${lang}${path}`)

/** Locale-neutral path of a pathname: "/en/servicii" → "/servicii", "/ro" → "/". */
export const stripLocale = (pathname: string) => {
  const m = /^\/(ro|en)(?=\/|$)/.exec(pathname)
  return m ? pathname.slice(m[0].length) || '/' : pathname
}

/** hreflang alternates per 07 §2.14: self-canonical + every alternate + x-default ("/" negotiates). */
export const alternatesFor = (lang: Locale, path: string) => ({
  canonical: localePath(lang, path),
  languages: { ro: localePath('ro', path), en: localePath('en', path), 'x-default': '/' },
})

export const ogLocale: Record<Locale, string> = { ro: 'ro_RO', en: 'en_GB' }
