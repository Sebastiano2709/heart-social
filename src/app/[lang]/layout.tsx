// Root layout per locale (03 §8.7.2): <html lang>, static params for ro/en, locale guard.
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MobileCallBar } from '@/components/mobile-bar'
import { Analytics, ConsentBanner } from '@/components/consent'
import { ctaText, navFor, servicesFor, site, siteText, whatsappHref } from '@/lib/site'
import { isLocale, locales, ogLocale, type Locale } from '@/i18n/config'
import { getUi } from '@/i18n/ui'
import { I18nProvider, type ClientUi } from '@/i18n/client'
import { homeCopy } from '@/i18n/pages/home'

export const dynamicParams = false
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const m = homeCopy[lang].meta
  return {
    metadataBase: new URL(site.url),
    title: { default: m.title, template: '%s' },
    description: m.description,
    applicationName: 'Heart Social',
    openGraph: { type: 'website', locale: ogLocale[lang], alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]), siteName: 'Heart Social' },
    twitter: { card: 'summary_large_image' },
    robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true' ? { index: true, follow: true } : { index: false, follow: false },
  }
}

export const viewport: Viewport = { themeColor: '#5e1b94', width: 'device-width', initialScale: 1 }

function clientUi(lang: Locale): ClientUi {
  const ui = getUi(lang)
  return {
    newTab: ui.newTab,
    header: ui.header,
    consent: ui.consent,
    reel: ui.reel,
    form: ui.form,
    mobileBar: ui.mobileBar,
    notFound: ui.notFound,
    cta: ctaText(lang),
    nav: navFor(lang).labels,
    services: servicesFor(lang).map((s) => ({ slug: s.slug, name: s.name })),
    phone: siteText(lang).phone,
    whatsapp: whatsappHref(lang),
  }
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Hide the server-rendered cookie banner before paint when a choice already exists. */}
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('hs-consent'))document.documentElement.classList.add('hs-consented')}catch(e){}" }} />
        <link rel="preload" href="/fonts/manrope-latin-800-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/anton-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {lang === 'ro' && <link rel="preload" href="/fonts/manrope-latin-ext-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />}
      </head>
      <body>
        <I18nProvider lang={lang} ui={clientUi(lang)}>
          <Header />
          <main id="continut" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer lang={lang} />
          <MobileCallBar />
          <ConsentBanner />
          <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        </I18nProvider>
      </body>
    </html>
  )
}
