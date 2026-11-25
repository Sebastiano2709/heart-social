import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LegalPage } from '@/components/legal'
import { ConsentSettingsButton } from '@/components/consent'
import { alternatesFor, isLocale, type Locale } from '@/i18n/config'

// [LEGAL] Structure for counsel to complete (09 §5.13). The English text is a translation of the Romanian one.
const copy = {
  ro: {
    title: 'Politica de cookies',
    intro: 'Folosim cookie-uri de analiză și de marketing doar după ce îți dai acordul. Îți poți schimba alegerea oricând.',
    tableTitle: 'Ce cookie-uri folosim',
    head: ['Categorie', 'Furnizor', 'Scop'],
    rows: [
      ['Necesare', 'Heart Social (stocare locală „hs-consent”)', 'Ține minte ce ai ales privind cookie-urile.'],
      ['Necesare', 'Heart Social (cookie „locale”)', 'Ține minte limba în care vrei să vezi site-ul.'],
      ['Analiză', 'Google Analytics 4', 'Statistici de vizitare.'],
      ['Marketing', 'Meta Pixel', 'Măsurarea reclamelor.'],
    ],
  },
  en: {
    title: 'Cookie policy',
    intro: 'We only use analytics and marketing cookies after you give your consent. You can change your choice at any time.',
    tableTitle: 'Which cookies we use',
    head: ['Category', 'Provider', 'Purpose'],
    rows: [
      ['Necessary', 'Heart Social (local storage “hs-consent”)', 'Remembers your cookie choice.'],
      ['Necessary', 'Heart Social (cookie “locale”)', 'Remembers the language you want to see the site in.'],
      ['Analytics', 'Google Analytics 4', 'Visitor statistics.'],
      ['Marketing', 'Meta Pixel', 'Ad measurement.'],
    ],
  },
} satisfies Record<Locale, unknown>

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return { title: `${copy[lang].title} | Heart Social`, alternates: alternatesFor(lang, '/politica-cookies') }
}

export default async function Cookies({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const c = copy[lang]
  return (
    <LegalPage lang={lang} title={c.title}>
      <p>{c.intro}</p>
      <p>
        <ConsentSettingsButton className="btn btn-sm btn-ghost" />
      </p>
      <h2>{c.tableTitle}</h2>
      <table className="w-full border-collapse text-left text-[0.9375rem]">
        <thead>
          <tr className="border-b-2 border-ink">
            {c.head.map((h, i) => (
              <th key={h} className={i < 2 ? 'py-2 pr-4' : 'py-2'}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {c.rows.map((r) => (
            <tr key={r[1]} className="border-b border-line">
              <td className="py-2 pr-4">{r[0]}</td>
              <td className="py-2 pr-4">{r[1]}</td>
              <td className="py-2">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </LegalPage>
  )
}
