import { ImageResponse } from 'next/og'
import { isLocale, locales, type Locale } from '@/i18n/config'
import { site } from '@/lib/site'

export const alt = 'Heart Social'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const copy = {
  ro: { top: 'HEART SOCIAL · BUCUREȘTI', lines: ['Din inimă,', 'cu rezultate.'], bottom: `Rezervă-ți un apel gratuit · ${site.phoneDisplay}` },
  en: { top: 'HEART SOCIAL · BUCHAREST', lines: ['From the heart,', 'with results.'], bottom: `Book your free call · ${site.phoneDisplayIntl}` },
} satisfies Record<Locale, unknown>

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = copy[isLocale(lang) ? lang : 'ro']
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: 'linear-gradient(125deg,#4A1477 0%,#7A2BB8 48%,#D81B7F 100%)', color: '#fff' }}>
        <div style={{ fontSize: 28, letterSpacing: 6, fontWeight: 700, opacity: 0.9 }}>{c.top}</div>
        <div style={{ fontSize: 104, lineHeight: 1, marginTop: 24, fontWeight: 800, display: 'flex', flexDirection: 'column' }}>
          <span>{c.lines[0]}</span>
          <span>{c.lines[1]}</span>
        </div>
        <div style={{ fontSize: 30, marginTop: 36 }}>{c.bottom}</div>
      </div>
    ),
    size,
  )
}
