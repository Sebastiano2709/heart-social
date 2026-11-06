import Link from 'next/link'
import type { Metadata } from 'next'
import { TrackedA } from '@/components/interactive'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Mulțumim | Heart Social', robots: { index: false, follow: false } }

export default function ThankYou() {
  return (
    <section className="section bg-alt" aria-labelledby="h1">
      <div className="wrap max-w-3xl text-center">
        <p className="eyebrow">Cerere trimisă</p>
        <h1 id="h1">
          Gata, am primit <span className="u">cererea</span> ta.
        </h1>
        <p className="lead mx-auto mt-6">Te sunăm de pe {site.phoneDisplay}. Până atunci, vezi ce facem pentru alți antreprenori.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <TrackedA href={site.instagramUrl} event="click_instagram" location="thank-you" external className="btn" ariaLabel="Urmărește-ne pe Instagram (se deschide într-o filă nouă)">
            Urmărește-ne pe Instagram <span className="chev" aria-hidden="true">›</span>
          </TrackedA>
          <Link href="/portofoliu" className="btn btn-ghost">
            Vezi portofoliul
          </Link>
        </div>
        <p className="mt-10">
          <Link href="/" className="text-grey-700 underline underline-offset-4">
            Înapoi la pagina principală
          </Link>
        </p>
      </div>
    </section>
  )
}
