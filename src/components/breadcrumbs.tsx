import Link from 'next/link'

export function Breadcrumbs({ trail }: { trail: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Fir de navigare" className="mb-6 text-sm text-grey-700">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="underline-offset-4 hover:underline">
            Acasă
          </Link>
        </li>
        {trail.map((t) => (
          <li key={t.name} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {t.href ? (
              <Link href={t.href} className="underline-offset-4 hover:underline">
                {t.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-bold text-ink">
                {t.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
