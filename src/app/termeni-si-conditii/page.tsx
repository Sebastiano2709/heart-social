import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Termeni și condiții | Heart Social', alternates: { canonical: '/termeni-si-conditii' } }

export default function Terms() {
  return (
    <LegalPage title="Termeni și condiții">
      <h2>Informații despre furnizor (Legea 365/2002)</h2>
      <p>
        Heart Social · Telefon {site.phoneDisplay}
      </p>
      <h2>Soluționarea litigiilor</h2>
      <p>
        ANPC – Soluționarea alternativă a litigiilor:{' '}
        <a href="https://anpc.ro/ce-este-sal/" className="font-bold text-violet-700 underline" target="_blank" rel="noopener noreferrer">
          anpc.ro/ce-este-sal
        </a>
        .
      </p>
    </LegalPage>
  )
}
