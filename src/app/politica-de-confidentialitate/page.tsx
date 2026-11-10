import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Politica de confidențialitate | Heart Social', alternates: { canonical: '/politica-de-confidentialitate' } }

export default function Privacy() {
  return (
    <LegalPage title="Politica de confidențialitate">
      <h2>Cine prelucrează datele</h2>
      <p>
        Heart Social · Telefon {site.phoneDisplay}
      </p>
      <h2>Ce date colectăm prin formularul „Apel gratuit”</h2>
      <ul>
        <li>numele;</li>
        <li>numărul de telefon;</li>
        <li>linkul spre Instagramul sau site-ul afacerii (opțional);</li>
        <li>serviciul care te interesează.</li>
      </ul>
      <h2>De ce le folosim</h2>
      <p>Ca să te sunăm înapoi și să discutăm despre cererea ta.</p>
      <h2>Cui le transmitem</h2>
      <p>Folosim furnizori care ne ajută să facem site-ul să funcționeze: găzduirea site-ului (Vercel), baza de date (Neon) și protecția împotriva spamului (Upstash). Google Analytics și Meta primesc date doar dacă accepți cookie-urile de analiză și de marketing.</p>
      <h2>Drepturile tale</h2>
      <p>Acces, rectificare, ștergere, restricționare, portabilitate, opoziție, retragerea consimțământului și plângere la ANSPDCP. Pentru oricare dintre ele, ne poți contacta la telefonul de mai sus.</p>
    </LegalPage>
  )
}
