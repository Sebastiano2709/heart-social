import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal'
import { ConsentSettingsButton } from '@/components/consent'

export const metadata: Metadata = { title: 'Politica de cookies | Heart Social', alternates: { canonical: '/politica-cookies' } }

export default function Cookies() {
  return (
    <LegalPage title="Politica de cookies">
      <p>Folosim cookie-uri de analiză și de marketing doar după ce îți dai acordul. Îți poți schimba alegerea oricând.</p>
      <p>
        <ConsentSettingsButton className="btn btn-sm btn-ghost" />
      </p>
      <h2>Ce cookie-uri folosim</h2>
      <table className="w-full border-collapse text-left text-[0.9375rem]">
        <thead>
          <tr className="border-b-2 border-ink">
            <th className="py-2 pr-4">Categorie</th>
            <th className="py-2 pr-4">Furnizor</th>
            <th className="py-2">Scop</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="py-2 pr-4">Necesare</td>
            <td className="py-2 pr-4">Heart Social (stocare locală „hs-consent”)</td>
            <td className="py-2">Ține minte alegerea ta despre cookie-uri.</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-2 pr-4">Analiză</td>
            <td className="py-2 pr-4">Google Analytics 4</td>
            <td className="py-2">Statistici de vizitare.</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-2 pr-4">Marketing</td>
            <td className="py-2 pr-4">Meta Pixel</td>
            <td className="py-2">Măsurarea reclamelor.</td>
          </tr>
        </tbody>
      </table>
    </LegalPage>
  )
}
