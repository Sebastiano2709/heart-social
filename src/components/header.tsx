'use client'
// Sticky header. Mobile menu = disclosure pattern (13 §3.1: ≤7 links), Services = disclosure dropdown.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { Logo } from './brand'
import { CTA, nav, services } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'

function Chevron() {
  return (
    <svg viewBox="0 0 10 10" className="size-2.5 stroke-magenta-600" fill="none" strokeWidth={1.6} aria-hidden="true">
      <path d="M1 3l4 4 4-4" />
    </svg>
  )
}

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [svcOpen, setSvcOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuId = useId()
  const svcId = useId()
  const svcRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on route change (state adjusted during render, React-recommended pattern).
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setMenuOpen(false)
    setSvcOpen(false)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSvcOpen(false)
        setMenuOpen(false)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) setSvcOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const linkCls = 'flex items-center gap-1.5 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-ink no-underline hover:text-violet-700'

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-[0_8px_24px_rgba(22,20,26,.08)]' : ''}`}>
      <a href="#continut" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-white focus:p-3 focus:font-bold">
        Sari la conținut
      </a>
      <div className="wrap flex min-h-[76px] flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2">
        <Link href="/" aria-label="Heart Social, pagina principală" className="no-underline">
          <Logo />
        </Link>

        <nav aria-label="Navigare principală" className="hidden lg:block">
          <ul className="flex flex-wrap items-center justify-end gap-x-8 gap-y-3">
            <li ref={svcRef} className="relative">
              <button type="button" className={linkCls} aria-expanded={svcOpen} aria-controls={svcId} onClick={() => setSvcOpen((v) => !v)}>
                Servicii <Chevron />
              </button>
              <div id={svcId} hidden={!svcOpen} className="absolute left-0 top-full mt-4 w-72 border border-line bg-white p-2 shadow-[0_16px_40px_rgba(22,20,26,.12)]">
                <ul>
                  <li>
                    <Link href="/servicii" className="block px-3 py-2.5 font-bold no-underline hover:bg-grey-100">
                      Toate serviciile
                    </Link>
                  </li>
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/servicii/${s.slug}`} className="block px-3 py-2.5 no-underline hover:bg-grey-100" aria-current={pathname === `/servicii/${s.slug}` ? 'page' : undefined}>
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkCls} aria-current={pathname === n.href ? 'page' : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={CTA.href} className="btn btn-sm" onClick={() => trackEvent('cta_click', { location: 'header' })}>
                <span className="hidden xl:inline">{CTA.primary}</span>
                <span className="xl:hidden">{CTA.short}</span> <span className="chev" aria-hidden="true">›</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-wrap items-center justify-end gap-2 lg:hidden">
          <Link href={CTA.href} className="btn btn-sm !px-3.5" onClick={() => trackEvent('cta_click', { location: 'header-mobile' })}>
            {CTA.short}
          </Link>
          <button type="button" className="grid size-12 place-items-center" aria-expanded={menuOpen} aria-controls={menuId} onClick={() => setMenuOpen((v) => !v)}>
            <span className="sr-only">{menuOpen ? 'Închide meniul' : 'Deschide meniul'}</span>
            <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div id={menuId} hidden={!menuOpen} className="fixed inset-x-0 bottom-0 top-[76px] overflow-y-auto bg-white lg:hidden">
        <nav aria-label="Navigare mobilă" className="wrap py-6">
          <ul className="grid gap-1">
            <li>
              <Link href="/servicii" className="block py-3 text-2xl font-extrabold no-underline">
                Servicii
              </Link>
              <ul className="mb-3 grid gap-0.5 border-l-2 border-line pl-4">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/servicii/${s.slug}`} className="block py-2 text-grey-700 no-underline">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block py-3 text-2xl font-extrabold no-underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={CTA.href} className="btn mt-6 w-full" onClick={() => trackEvent('cta_click', { location: 'mobile-menu' })}>
            {CTA.primary} <span className="chev" aria-hidden="true">›</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
