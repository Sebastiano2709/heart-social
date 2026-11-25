import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LegalPage } from '@/components/legal'
import { siteText } from '@/lib/site'
import { alternatesFor, isLocale, type Locale } from '@/i18n/config'

// [LEGAL] Structure for counsel to complete (09 §5.13). The English text is a translation of the Romanian one.
const copy = {
  ro: {
    title: 'Politica de confidențialitate',
    who: 'Cine prelucrează datele',
    phone: 'Telefon',
    whatTitle: 'Ce date colectăm prin formularul „Apel gratuit”',
    what: ['numele;', 'numărul de telefon;', 'linkul spre Instagramul sau site-ul afacerii (opțional);', 'serviciul care te interesează.'],
    whyTitle: 'De ce le folosim',
    why: 'Ca să te sunăm înapoi și să discutăm despre cererea ta.',
    toWhomTitle: 'Cui le transmitem',
    toWhom: 'Folosim furnizori care ne ajută să facem site-ul să funcționeze: găzduirea site-ului (Vercel), baza de date (Neon) și protecția împotriva spamului (Upstash). Google Analytics și Meta primesc date doar dacă accepți cookie-urile de analiză și de marketing.',
    rightsTitle: 'Drepturile tale',
    rights: 'Acces, rectificare, ștergere, restricționare, portabilitate, opoziție, retragerea consimțământului și plângere la ANSPDCP. Pentru oricare dintre ele, ne poți contacta la telefonul de mai sus.',
  },
  en: {
    title: 'Privacy policy',
    who: 'Who processes the data',
    phone: 'Phone',
    whatTitle: 'What data we collect through the “Free call” form',
    what: ['your name;', 'your phone number;', 'the link to your business’s Instagram or website (optional);', 'the service you are interested in.'],
    whyTitle: 'Why we use it',
    why: 'To call you back and talk about your request.',
    toWhomTitle: 'Who we share it with',
    toWhom: 'We use providers that help us run the site: website hosting (Vercel), the database (Neon) and spam protection (Upstash). Google Analytics and Meta only receive data if you accept analytics and marketing cookies.',
    rightsTitle: 'Your rights',
    rights: 'Access, rectification, erasure, restriction, portability, objection, withdrawal of consent and a complaint to ANSPDCP (the Romanian data protection authority). For any of them, you can contact us at the phone number above.',
  },
} satisfies Record<Locale, unknown>

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return { title: `${copy[lang].title} | Heart Social`, alternates: alternatesFor(lang, '/politica-de-confidentialitate') }
}

export default async function Privacy({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const c = copy[lang]
  return (
    <LegalPage lang={lang} title={c.title}>
      <h2>{c.who}</h2>
      <p>
        Heart Social · {c.phone} {siteText(lang).phone}
      </p>
      <h2>{c.whatTitle}</h2>
      <ul>
        {c.what.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
      <h2>{c.whyTitle}</h2>
      <p>{c.why}</p>
      <h2>{c.toWhomTitle}</h2>
      <p>{c.toWhom}</p>
      <h2>{c.rightsTitle}</h2>
      <p>{c.rights}</p>
    </LegalPage>
  )
}
