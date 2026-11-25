import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import { getUi } from '@/i18n/ui'

/** trail hrefs are locale-neutral ("/servicii"); they are prefixed with the page locale here. */
export function Breadcrumbs({ lang, trail }: { lang: Locale; trail: { name: string; href?: string }[] }) {
  const t = getUi(lang).breadcrumbs
  return (
    <nav aria-label={t.aria} className="mb-6 text-sm text-grey-700">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={localePath(lang, '/')} className="underline-offset-4 hover:underline">
            {t.home}
          </Link>
        </li>
        {trail.map((x) => (
          <li key={x.name} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {x.href ? (
              <Link href={localePath(lang, x.href)} className="underline-offset-4 hover:underline">
                {x.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-bold text-ink">
                {x.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
