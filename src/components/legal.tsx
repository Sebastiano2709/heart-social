import type { ReactNode } from 'react'
import { Breadcrumbs } from './breadcrumbs'

/** Legal page shell. The text is a structure for counsel to complete — not legal advice ([LEGAL], 09 §5.13). */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="section" aria-labelledby="h1">
      <div className="wrap max-w-3xl">
        <Breadcrumbs trail={[{ name: title }]} />
        <h1 id="h1" className="text-[clamp(2rem,1.6rem+2vw,3rem)]">
          {title}
        </h1>
        <div className="legal mt-10 grid gap-6 [&_h2]:mt-6 [&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc">{children}</div>
      </div>
    </section>
  )
}
