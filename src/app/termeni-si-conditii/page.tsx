import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Termeni și condiții | Heart Social', alternates: { canonical: '/termeni-si-conditii' } }

export default function Terms() {
  return (
    <LegalPage title="Termeni și condiții">
      <h2>Informații despre furnizor (Legea 365/2002)</h2>
      <p>
        <span className="ph">{site.companyData}</span> · Telefon {site.phoneDisplay} · Email <span className="ph">{site.email}</span>
      </p>
      <h2>Utilizarea site-ului</h2>
      <p><span className="ph">[DE COMPLETAT DE CONSILIER]</span></p>
      <h2>Proprietate intelectuală</h2>
      <p><span className="ph">[DE COMPLETAT DE CONSILIER]</span></p>
      <h2>Soluționarea litigiilor</h2>
      <p>
        ANPC – Soluționarea alternativă a litigiilor:{' '}
        <a href="https://anpc.ro/ce-este-sal/" className="font-bold text-violet-700 underline" target="_blank" rel="noopener noreferrer">
          anpc.ro/ce-este-sal
        </a>
        . <span className="ph">[Aplicabilitatea pentru clienți persoane juridice — de confirmat de consilier]</span>
      </p>
    </LegalPage>
  )
}
