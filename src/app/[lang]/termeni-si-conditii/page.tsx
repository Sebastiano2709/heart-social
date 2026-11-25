import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LegalPage } from '@/components/legal'
import { siteText } from '@/lib/site'
import { alternatesFor, isLocale, type Locale } from '@/i18n/config'

// [LEGAL] Structure for counsel to complete (09 §5.13). The English text is a translation of the Romanian one.
const copy = {
  ro: { title: 'Termeni și condiții', provider: 'Informații despre furnizor (Legea 365/2002)', phone: 'Telefon', disputes: 'Soluționarea litigiilor', adr: 'ANPC – Soluționarea alternativă a litigiilor:' },
  en: { title: 'Terms and conditions', provider: 'Provider information (Law 365/2002)', phone: 'Phone', disputes: 'Dispute resolution', adr: 'ANPC (Romanian consumer protection authority) – alternative dispute resolution:' },
} satisfies Record<Locale, Record<string, string>>

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return { title: `${copy[lang].title} | Heart Social`, alternates: alternatesFor(lang, '/termeni-si-conditii') }
}

export default async function Terms({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const c = copy[lang]
  return (
    <LegalPage lang={lang} title={c.title}>
      <h2>{c.provider}</h2>
      <p>
        Heart Social · {c.phone} {siteText(lang).phone}
      </p>
      <h2>{c.disputes}</h2>
      <p>
        {c.adr}{' '}
        <a href="https://anpc.ro/ce-este-sal/" className="font-bold text-violet-700 underline" target="_blank" rel="noopener noreferrer" hrefLang="ro">
          anpc.ro/ce-este-sal
        </a>
        .
      </p>
    </LegalPage>
  )
}
