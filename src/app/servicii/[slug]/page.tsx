import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { serviceContent } from '@/content/services'
import { serviceBySlug, services, CTA, type ServiceSlug } from '@/lib/site'
import { CtaButton, Reveal } from '@/components/interactive'
import { FinalCta } from '@/components/footer'
import { serviceIcon } from '@/components/icons'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PhText } from '@/components/ph-text'
import { JsonLd, breadcrumbLd, faqLd, serviceLd } from '@/lib/schema'

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = serviceContent[slug as ServiceSlug]
  if (!c) return {}
  return { title: c.title, description: c.description, alternates: { canonical: `/servicii/${slug}` }, openGraph: { title: c.title, description: c.description, url: `/servicii/${slug}` } }
}

const plain = (s: string) => s.replace(/\s*\[[^\]]*\]/g, '').trim()

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const s = serviceBySlug(slug)
  const c = serviceContent[slug as ServiceSlug]
  if (!s || !c) notFound()
  const Icon = serviceIcon[s.icon]
  const faqForSchema = c.faq.filter((f) => !/\[/.test(f.a)).map((f) => ({ q: f.q, a: plain(f.a) }))

  return (
    <>
      <JsonLd data={serviceLd(s.slug, s.name, c.description)} />
      <JsonLd data={breadcrumbLd([{ name: 'Acasă', path: '/' }, { name: 'Servicii', path: '/servicii' }, { name: s.name, path: `/servicii/${s.slug}` }])} />
      {faqForSchema.length > 0 && <JsonLd data={faqLd(faqForSchema)} />}

      <section className="section pb-16" aria-labelledby="h1">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[8fr_4fr]">
          <div>
            <Breadcrumbs trail={[{ name: 'Servicii', href: '/servicii' }, { name: s.name }]} />
            <p className="eyebrow">{s.name} · București</p>
            <h1 id="h1">
              {c.h1[0]}
              <span className="u">{c.h1[1]}</span>
              {c.h1[2]}
            </h1>
            <p className="lead mt-6"><PhText text={c.intro} /></p>
            <div className="mt-9">
              <CtaButton location={`service-${s.slug}-hero`} />
              <p className="mt-3 text-grey-700">{c.ctaSub}</p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative grid aspect-square place-items-center bg-violet-950" style={{ clipPath: 'polygon(0 0,100% 0,100% calc(100% - 28px),calc(100% - 28px) 100%,0 100%)' }}>
              <Icon className="size-1/2 text-white" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="problema">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <h2 id="problema">Sună cunoscut?</h2>
          <div>
            <ul className="checks text-lg">
              {c.problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mt-8 text-xl font-extrabold">{c.problemClose}</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ce-facem">
        <div className="wrap">
          <p className="eyebrow">Ce facem, concret</p>
          <h2 id="ce-facem" className="max-w-3xl">
            {c.doTitle}
          </h2>
          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.does.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={(i % 3) * 80} className="border-t-[3px] border-ink pt-4">
                <h3 className="text-lg">{t.replace(/\.$/, '')}</h3>
                <p className="mt-2 text-grey-700"><PhText text={d} /></p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark section" aria-labelledby="cum">
        <div className="wrap">
          <p className="eyebrow">Cum lucrăm</p>
          <h2 id="cum" className="max-w-3xl">
            {c.processTitle}
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {c.process.map(([t, d], i) => (
              <li key={t} className="border-l-2 border-pink-300 pl-5">
                <span className="font-display text-4xl text-lilac-300">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-lg">{t.replace(/\.$/, '')}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-[#d9d6de]">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="primesti">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Ce primești</p>
            <h2 id="primesti">Ce primești</h2>
            <p className="lead mt-5">{c.deliverablesNote}</p>
          </div>
          <ul className="checks self-center text-lg">
            {c.deliverables.map((d) => (
              <li key={d}><PhText text={d} /></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="portofoliu">
        <div className="wrap">
          <p className="eyebrow">Din portofoliu</p>
          <h2 id="portofoliu">Conținut făcut de noi</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <li key={n} className="grid aspect-[4/5] place-items-center bg-white p-6 text-center shadow-[inset_0_0_0_1px_var(--color-line)]">
                <span className="ph">[MOSTRĂ REALĂ {n}]</span>
              </li>
            ))}
          </ul>
          <Link href="/portofoliu" className="link-arrow mt-8">
            Vezi tot portofoliul <span aria-hidden="true">›</span>
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="faq">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">Întrebări frecvente</p>
            <h2 id="faq">Ce ne întreabă lumea</h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {c.faq.map((f) => (
              <details key={f.q} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-extrabold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-2xl text-magenta-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-5 text-grey-700"><PhText text={f.a} /></p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-label="Servicii înrudite">
        <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="font-bold">Merge bine împreună cu:</span>
          {s.related.map((r) => {
            const rs = serviceBySlug(r)!
            return (
              <Link key={r} href={`/servicii/${r}`} className="link-arrow">
                {rs.name} <span aria-hidden="true">›</span>
              </Link>
            )
          })}
        </div>
      </section>

      <FinalCta location={`service-${s.slug}`} title={c.finalTitle} text={CTA.sub} />
    </>
  )
}
