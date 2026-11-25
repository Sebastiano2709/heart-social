'use client'
// 404 body. A client component so it reads the locale from the [lang] layout's I18nProvider —
// not-found.tsx gets no params, and the root-param getter is not reliable on the not-found path.
import Link from 'next/link'
import { HeartMark } from '@/components/brand'
import { CtaButton } from '@/components/interactive'
import { localePath } from '@/i18n/config'
import { useI18n } from '@/i18n/client'

export function NotFoundView() {
  const { lang, ui } = useI18n()
  const t = ui.notFound
  return (
    <section className="section" aria-labelledby="h1">
      <div className="wrap max-w-2xl text-center">
        <HeartMark className="mx-auto mb-8 w-24 opacity-90" />
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 id="h1">{t.title}</h1>
        <p className="lead mx-auto mt-5">{t.text}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href={localePath(lang, '/')} className="btn btn-ghost">
            {t.home}
          </Link>
          <CtaButton location="404" />
        </div>
      </div>
    </section>
  )
}
