import type { Metadata } from 'next'
import { ServiceCards, CtaRow } from '@/components/sections'
import { FinalCta } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd, breadcrumbLd } from '@/lib/schema'

const title = 'Servicii de promovare online în București | Heart Social'
const description = 'Cinci servicii sub un singur acoperiș: social media, foto/video, Reels, website și campanii Ads. Află ce ți se potrivește într-un apel gratuit.'

export const metadata: Metadata = { title, description, alternates: { canonical: '/servicii' }, openGraph: { title, description, url: '/servicii' } }

export default function ServicesHub() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Acasă', path: '/' }, { name: 'Servicii', path: '/servicii' }])} />
      <section className="section bg-alt" aria-labelledby="h1">
        <div className="wrap">
          <Breadcrumbs trail={[{ name: 'Servicii' }]} />
          <p className="eyebrow">Ce facem</p>
          <h1 id="h1" className="max-w-4xl">
            Tot ce îi trebuie afacerii tale ca să fie <span className="u">văzută</span>. Și aleasă.
          </h1>
          <p className="lead mt-6">Cinci servicii care pleacă din același plan: strategie, ședințe foto și video, Reels, site și reclame. Poți începe cu unul și adăuga restul când ai nevoie.</p>
          <ServiceCards headingLevel={2} />
          <CtaRow location="services-hub" note="Nu știi de unde să începi? Exact asta lămurim la telefon." />
        </div>
      </section>
      <FinalCta location="services-hub" />
    </>
  )
}
