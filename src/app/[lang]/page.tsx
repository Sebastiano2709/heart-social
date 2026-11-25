import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Showreel } from '@/components/showreel'
import { Marquee, SectionHead, ServiceCards, CtaRow } from '@/components/sections'
import { Rosette } from '@/components/brand'
import { CountUp, CtaButton, Reveal, TrackedA } from '@/components/interactive'
import { FinalCta } from '@/components/footer'
import { IconHeartHand, IconCamera, IconTarget, IconReport, IconRings, IconStack, IconPeople, IconLink, IconInstagram } from '@/components/icons'
import { ctaText, servicesFor, site } from '@/lib/site'
import { JsonLd, organizationLd } from '@/lib/schema'
import { alternatesFor, localePath, type Locale } from '@/i18n/config'
import { getUi } from '@/i18n/ui'
import { homeCopy } from '@/i18n/pages/home'

type Props = { params: Promise<{ lang: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const m = homeCopy[lang].meta
  return { title: m.title, description: m.description, alternates: alternatesFor(lang, '/'), openGraph: { title: m.title, description: m.description, url: localePath(lang, '/') } }
}

const pillarIcons = [IconHeartHand, IconCamera, IconTarget, IconReport, IconRings]
const statIcons = [IconStack, IconPeople, IconLink]
const statValues = [5, 3, 1]

export default async function Home({ params }: Props) {
  const { lang } = await params
  const t = homeCopy[lang]
  const newTab = getUi(lang).newTab
  return (
    <>
      <JsonLd data={organizationLd(lang)} />

      {/* 1. Showreel + band */}
      <Showreel />
      <Marquee lang={lang} items={servicesFor(lang).map((s) => s.name.toUpperCase())} />

      {/* 2. Main block (H1) */}
      <section className="section" aria-labelledby="h1">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[7fr_5fr]">
          <div>
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1 id="h1">
              {t.hero.h1[0]}
              <span className="u">{t.hero.h1[1]}</span>
              {t.hero.h1[2]}
            </h1>
            <p className="lead mt-6">{t.hero.lead}</p>
            <div className="mt-9">
              <CtaButton location="home-hero" />
              <p className="mt-3 text-grey-700">{ctaText(lang).sub}</p>
            </div>
          </div>
          <div>
            <Rosette className="mx-auto w-48 max-w-full sm:w-64 lg:w-[22rem]" />
          </div>
        </div>
      </section>

      {/* 3. What the free call covers */}
      <section className="section bg-alt" aria-labelledby="apel">
        <div className="wrap">
          <SectionHead eyebrow={t.call.eyebrow} id="apel" title={t.call.title} center />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {t.call.steps.map(([h, d], i) => (
              <Reveal as="li" key={h} delay={i * 80} className="facet-card p-8 text-center">
                <span className="font-display text-5xl text-violet-700">0{i + 1}</span>
                <h3 className="mt-3">{h}</h3>
                <p className="mt-2 text-grey-700">{d}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <CtaButton location="home-call" label={t.call.cta} />
          </div>
        </div>
      </section>

      {/* 4. Stats band (facts only) */}
      <section className="on-dark" aria-label={t.stats.aria}>
        <div className="h-2.5" style={{ background: 'var(--grad-heart)' }} />
        <div className="wrap grid gap-10 py-16 text-center sm:grid-cols-3">
          {t.stats.items.map((l, i) => {
            const Icon = statIcons[i]!
            return (
              <div key={l}>
                <Icon className="mx-auto mb-4 size-16 text-white" accent={false} />
                <p className="font-display text-6xl leading-none">
                  <CountUp value={statValues[i]!} />
                </p>
                <p className="mx-auto mt-3 max-w-[24ch] text-[#d9d6de]">{l}</p>
              </div>
            )
          })}
        </div>
        <div className="wrap pb-14 text-center">
          <Link href={localePath(lang, '/portofoliu')} className="link-arrow">
            {t.stats.portfolio} <span aria-hidden="true">›</span>
          </Link>
        </div>
      </section>

      {/* 5. Meet Heart Social */}
      <section className="section" aria-labelledby="cunoaste">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">{t.meet.eyebrow}</p>
              <h2 id="cunoaste">{t.meet.title}</h2>
            </div>
            <p className="lead self-end">{t.meet.lead}</p>
          </div>
          <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {t.meet.pillars.map(([h, d], i) => {
              const Icon = pillarIcons[i]!
              return (
                <Reveal as="li" key={h} delay={i * 80} className="text-center">
                  <Icon className="mx-auto mb-5 size-20 text-ink" />
                  <h3 className="text-lg">{h}</h3>
                  <p className="mt-2 text-[0.9375rem] text-grey-700">{d}</p>
                </Reveal>
              )
            })}
          </ul>
          <div className="mt-14 text-center">
            <CtaButton location="home-pillars" label={t.meet.cta} />
          </div>
        </div>
      </section>

      {/* 6. Services */}
      <section className="section bg-alt" aria-labelledby="servicii">
        <div className="wrap">
          <SectionHead eyebrow={t.services.eyebrow} id="servicii" title={t.services.title} />
          <ServiceCards lang={lang} />
          <CtaRow location="home-services" note={t.services.note} />
        </div>
      </section>

      {/* 7. Who we work with */}
      <section className="section" aria-labelledby="cine">
        <div className="wrap">
          <SectionHead eyebrow={t.audiences.eyebrow} id="cine" title={t.audiences.title}>
            {t.audiences.lead}
          </SectionHead>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {t.audiences.groups.map((a, i) => (
              <Reveal key={a.name} delay={i * 80}>
                <h3 className="border-t-[3px] border-ink pt-4 text-xl">
                  {t.audiences.for} <span className="text-magenta-600">{a.name}</span>
                </h3>
                <dl className="mt-6 grid gap-6">
                  {a.items.map(([h, d]) => (
                    <div key={h}>
                      <dt className="font-extrabold uppercase tracking-[0.02em]">{h}</dt>
                      <dd className="mt-1 text-grey-700">{d}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <CtaButton location="home-audiences" label={t.audiences.cta} variant="btn-ghost" />
          </div>
        </div>
      </section>

      {/* 8. Founder */}
      <section className="section bg-alt" aria-labelledby="fondator">
        <div className="wrap grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Reveal className="relative mx-auto w-full max-w-sm md:max-w-none">
            <Image src="/img/emilian-horea.webp" alt={t.founder.photoAlt} width={455} height={742} sizes="(min-width: 768px) 40vw, 90vw" className="aspect-[4/5] w-full object-cover object-[50%_20%]" />
            <span aria-hidden="true" className="absolute -bottom-3 -right-3 -z-0 hidden h-24 w-24 md:block" style={{ background: 'var(--grad-heart)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
          </Reveal>
          <div>
            <p className="eyebrow">{t.founder.eyebrow}</p>
            <h2 id="fondator">{t.founder.title}</h2>
            <p className="lead mt-5">{t.founder.lead(site.founder.year)}</p>
            <blockquote className="mt-8 border-l-[3px] border-magenta-600 pl-5 text-xl font-extrabold leading-snug">{t.founder.quote}</blockquote>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href={localePath(lang, '/despre-noi')} className="link-arrow">
                {t.founder.story} <span aria-hidden="true">›</span>
              </Link>
              <TrackedA href={site.instagramUrl} event="click_instagram" location="home-founder" external className="link-arrow" ariaLabel={`@${site.instagramHandle} ${t.founder.instagramAria} ${newTab}`}>
                <IconInstagram className="size-5" /> @{site.instagramHandle}
              </TrackedA>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Recent work */}
      <section className="section" aria-labelledby="lucrari">
        <div className="wrap">
          <SectionHead eyebrow={t.work.eyebrow} id="lucrari" title={t.work.title} center />
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-grey-700">{t.work.text}</p>
          <div className="mt-8 text-center">
            <TrackedA href={site.instagramUrl} event="click_instagram" location="home-work" external className="link-arrow" ariaLabel={`${t.work.link} ${newTab}`}>
              {t.work.link} <span aria-hidden="true">›</span>
            </TrackedA>
          </div>
        </div>
      </section>

      <FinalCta lang={lang} location="home" />
    </>
  )
}
