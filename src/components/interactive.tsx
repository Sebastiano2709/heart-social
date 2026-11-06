'use client'
import Link from 'next/link'
import { useEffect, useRef, type ReactNode } from 'react'
import { trackEvent, type EventName } from '@/lib/analytics'
import { CTA } from '@/lib/site'

/** Primary CTA link — every "Rezervă-ți un apel gratuit" button goes through here (event cta_click). */
export function CtaButton({ location, label = CTA.primary, variant = '', className = '' }: { location: string; label?: string; variant?: '' | 'btn-dark' | 'btn-ghost'; className?: string }) {
  return (
    <Link href={CTA.href} className={`btn ${variant} ${className}`} onClick={() => trackEvent('cta_click', { location })}>
      {label} <span className="chev" aria-hidden="true">›</span>
    </Link>
  )
}

export function TrackedA({ href, event, location, className, children, external, ariaLabel }: { href: string; event: EventName; location: string; className?: string; children: ReactNode; external?: boolean; ariaLabel?: string }) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackEvent(event, { location })}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

/** Reveal on scroll (09 §15.1 pattern): visible by default; armed only when JS runs and motion is allowed. */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'li' | 'section' }) {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const r = el.getBoundingClientRect()
    if (r.top < innerHeight) return // already on screen: never hide visible content
    el.classList.add('reveal--armed')
    el.style.transitionDelay = `${delay}ms`
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            el.classList.add('reveal--in')
            io.disconnect()
          }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  )
}

/** Animated number for the stats band; renders the final value on the server and without motion. */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      io.disconnect()
      const t0 = performance.now()
      const dur = 1600
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = `${Math.round(value * eased)}${suffix}`
        if (p < 1) requestAnimationFrame(step)
      }
      el.textContent = `0${suffix}`
      requestAnimationFrame(step)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [value, suffix])
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}
