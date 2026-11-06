import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Politica de confidențialitate | Heart Social', alternates: { canonical: '/politica-de-confidentialitate' } }

export default function Privacy() {
  return (
    <LegalPage title="Politica de confidențialitate">
      <h2>Cine prelucrează datele</h2>
      <p>
        Heart Social · <span className="ph">{site.companyData}</span> · Telefon {site.phoneDisplay} · Email <span className="ph">{site.email}</span>
      </p>
      <h2>Ce date colectăm prin formularul „Apel gratuit”</h2>
      <ul>
        <li>numele;</li>
        <li>numărul de telefon;</li>
        <li>linkul spre Instagramul sau site-ul afacerii (opțional);</li>
        <li>serviciul care te interesează.</li>
      </ul>
      <h2>De ce le folosim</h2>
      <p>Ca să te sunăm înapoi și să discutăm despre cererea ta. <span className="ph">[TEMEI LEGAL — de stabilit de consilier: consimțământ / demersuri precontractuale]</span></p>
      <h2>Cât timp le păstrăm</h2>
      <p><span className="ph">[PERIOADA DE PĂSTRARE]</span></p>
      <h2>Cui le transmitem</h2>
      <p><span className="ph">[FURNIZORI: găzduire site, bază de date, serviciu de email, Google Analytics, Meta — cu acordul tău pentru ultimele două]</span></p>
      <h2>Drepturile tale</h2>
      <p>Acces, rectificare, ștergere, restricționare, portabilitate, opoziție, retragerea consimțământului și plângere la ANSPDCP. <span className="ph">[CUM SE EXERCITĂ — de completat]</span></p>
    </LegalPage>
  )
}
