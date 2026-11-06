import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MobileCallBar } from '@/components/mobile-bar'
import { Analytics, ConsentBanner } from '@/components/consent'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Agenție social media București | Heart Social', template: '%s' },
  description: 'Social media, ședințe foto/video, Reels, site-uri și reclame pentru afaceri din București. Rezervă-ți un apel gratuit cu Heart Social.',
  applicationName: 'Heart Social',
  openGraph: { type: 'website', locale: 'ro_RO', siteName: 'Heart Social' },
  twitter: { card: 'summary_large_image' },
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true' ? { index: true, follow: true } : { index: false, follow: false },
}

export const viewport: Viewport = { themeColor: '#5e1b94', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        {/* Hide the server-rendered cookie banner before paint when a choice already exists. */}
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('hs-consent'))document.documentElement.classList.add('hs-consented')}catch(e){}" }} />
        <link rel="preload" href="/fonts/manrope-latin-800-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/anton-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <Header />
        <main id="continut" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
        <ConsentBanner />
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
      </body>
    </html>
  )
}
