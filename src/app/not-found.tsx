import Link from 'next/link'
import { HeartMark } from '@/components/brand'
import { CtaButton } from '@/components/interactive'

export default function NotFound() {
  return (
    <section className="section" aria-labelledby="h1">
      <div className="wrap max-w-2xl text-center">
        <HeartMark className="mx-auto mb-8 w-24 opacity-90" />
        <p className="eyebrow">Eroare 404</p>
        <h1 id="h1">Pagina asta nu există. Dar noi da.</h1>
        <p className="lead mx-auto mt-5">Poate linkul e greșit sau pagina a fost mutată.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-ghost">
            Pagina principală
          </Link>
          <CtaButton location="404" />
        </div>
      </div>
    </section>
  )
}
