import Link from 'next/link'
import { Logo, Shards } from './brand'
import { CtaButton, TrackedA } from './interactive'
import { ConsentSettingsButton } from './consent'
import { IconInstagram } from './icons'
import { services, site, telHref } from '@/lib/site'

export function FinalCta({ title = 'Hai să facem asta.', text = 'Spune-ne unde ești acum. Îți arătăm, la telefon, cum te putem ajuta să-ți crești business-ul.', location }: { title?: string; text?: string; location: string }) {
  return (
    <section className="on-grad relative overflow-hidden text-white" style={{ background: 'var(--grad-heart)' }} aria-labelledby={`final-${location}`}>
      <Shards w={1440} h={600} n={22} seed={5} alpha={0.35} className="absolute inset-0 size-full" />
      <div className="wrap relative z-10 pb-[clamp(6rem,4rem+8vw,10rem)] pt-[clamp(4rem,3rem+5vw,7rem)]">
        <h2 id={`final-${location}`} className="text-[clamp(2.5rem,1.8rem+3vw,4.25rem)]">
          {title}
        </h2>
        <p className="mb-8 mt-4 max-w-[52ch] text-[0.9375rem] font-semibold uppercase tracking-[0.06em]">{text}</p>
        <CtaButton location={`final-${location}`} variant="btn-dark" />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[38%] bg-charcoal" style={{ clipPath: 'polygon(0 100%, 100% 22%, 100% 100%)' }} />
    </section>
  )
}

export function Footer() {
  const col = 'mb-4 text-lg font-extrabold uppercase tracking-[0.06em] text-white'
  const a = 'text-[#d9d6de] no-underline hover:text-white hover:underline underline-offset-4'
  return (
    <footer className="on-dark relative overflow-hidden pb-28 pt-16 lg:pb-12">
      <span aria-hidden="true" className="pointer-events-none absolute -right-10 bottom-[-6rem] select-none font-display text-[28rem] leading-none text-white/[0.035]">
        H
      </span>
      <div className="wrap relative grid gap-12 lg:grid-cols-[1fr_auto]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className={col}>Servicii</h2>
            <ul className="grid gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link className={a} href={`/servicii/${s.slug}`}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={col}>Despre noi</h2>
            <ul className="grid gap-2.5">
              <li><Link className={a} href="/despre-noi">Povestea noastră</Link></li>
              <li><Link className={a} href="/apel-gratuit">Apel gratuit</Link></li>
            </ul>
          </div>
          <div>
            <h2 className={col}>Rezultate</h2>
            <ul className="grid gap-2.5">
              <li><Link className={a} href="/portofoliu">Portofoliu</Link></li>
            </ul>
          </div>
          <div>
            <h2 className={col}>Blog</h2>
            <p className="text-[#d9d6de]">În curând.</p>
          </div>
        </div>
        <div className="grid content-start gap-5 lg:justify-items-end lg:text-right">
          <Logo light />
          <p className="max-w-[30ch] text-[#d9d6de]">{site.tagline}</p>
          <TrackedA href={telHref} event="click_call" location="footer" className="font-display text-4xl tracking-[0.02em] text-white no-underline">
            {site.phoneDisplay}
          </TrackedA>
          <CtaButton location="footer" label="Contactează-ne" />
          <TrackedA href={site.instagramUrl} event="click_instagram" location="footer" external className="inline-flex items-center gap-2 text-white no-underline hover:underline" ariaLabel={`Instagram @${site.instagramHandle} (se deschide într-o filă nouă)`}>
            <IconInstagram className="size-6" /> @{site.instagramHandle}
          </TrackedA>
        </div>
      </div>
      <div className="wrap relative mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-[#bdb9c4] lg:flex-row lg:items-center lg:justify-between">
        <p>
          © {new Date().getFullYear()} Heart Social
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li><Link className={a} href="/politica-de-confidentialitate">Politica de confidențialitate</Link></li>
          <li><Link className={a} href="/politica-cookies">Politica de cookies</Link></li>
          <li><Link className={a} href="/termeni-si-conditii">Termeni și condiții</Link></li>
          <li><ConsentSettingsButton className={`${a} cursor-pointer`} /></li>
          <li><a className={a} href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">ANPC – SAL</a></li>
        </ul>
      </div>
    </footer>
  )
}
