// Custom line-art icons: 1.75 stroke on a 48 grid, one magenta "facet" accent each (Stage 1, §05).
import type { ReactNode, SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { accent?: boolean }

function Base({ children, accent = true, ...rest }: P & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" data-accent={accent} {...rest}>
      {children}
    </svg>
  )
}

const acc = { fill: '#B3166E', stroke: 'none' } as const

export const IconHeartHand = (p: P) => (
  <Base {...p}>
    <path d="M24 36s-11-6.6-11-14.2A6 6 0 0124 18.5a6 6 0 0111 3.3C35 29.4 24 36 24 36z" />
    <path d="M6 40h9l6-3h7" />
    <path d="M42 40h-9" />
    {p.accent !== false && <path {...acc} d="M27 22l5-3 0 5z" />}
  </Base>
)
export const IconCamera = (p: P) => (
  <Base {...p}>
    <rect x="6" y="15" width="28" height="22" rx="2" />
    <path d="M34 22l8-5v18l-8-5" />
    <circle cx="20" cy="26" r="5.5" />
    {p.accent !== false && <path {...acc} d="M10 19h6l-6 4z" />}
  </Base>
)
export const IconTarget = (p: P) => (
  <Base {...p}>
    <circle cx="22" cy="26" r="14" />
    <circle cx="22" cy="26" r="8" />
    <circle cx="22" cy="26" r="2" />
    <path d="M22 26L40 8" />
    <path d="M34 8h6v6" />
    {p.accent !== false && <path {...acc} d="M36 30l5 0-5 5z" />}
  </Base>
)
export const IconReport = (p: P) => (
  <Base {...p}>
    <path d="M12 6h18l8 8v28H12z" />
    <path d="M30 6v8h8" />
    <path d="M18 36V28M24 36V22M30 36v-10" />
    {p.accent !== false && <path {...acc} d="M17 12h7l-7 5z" />}
  </Base>
)
export const IconRings = (p: P) => (
  <Base {...p}>
    <circle cx="18" cy="24" r="10" />
    <circle cx="30" cy="24" r="10" />
    <path d="M8 42h32" />
    {p.accent !== false && <path {...acc} d="M22 22l4 2-4 2z" />}
  </Base>
)
export const IconSocial = (p: P) => (
  <Base {...p}>
    <rect x="12" y="4" width="24" height="40" rx="4" />
    <path d="M21 39h6" />
    <path d="M24 30s-6-3.6-6-7.8A3.3 3.3 0 0124 20.4a3.3 3.3 0 016 1.8C30 26.4 24 30 24 30z" />
    {p.accent !== false && <path {...acc} d="M16 9h6l-6 4z" />}
  </Base>
)
export const IconReels = (p: P) => (
  <Base {...p}>
    <rect x="6" y="8" width="36" height="32" rx="3" />
    <path d="M6 16h36M14 8l4 8M24 8l4 8M34 8l4 8" />
    <path d="M21 23v10l8-5z" />
    {p.accent !== false && <path {...acc} d="M35 33h4l-4 4z" />}
  </Base>
)
export const IconWeb = (p: P) => (
  <Base {...p}>
    <rect x="4" y="8" width="40" height="30" rx="2" />
    <path d="M4 15h40" />
    <path d="M11 22h14M11 28h10" />
    <rect x="29" y="21" width="9" height="11" />
    <path d="M18 44h12" />
    {p.accent !== false && <path {...acc} d="M8 10.5h4l-4 3z" />}
  </Base>
)
export const IconAds = (p: P) => (
  <Base {...p}>
    <path d="M6 20v8h6l14 9V11l-14 9z" />
    <path d="M12 28l3 10h5l-2-8" />
    <path d="M33 18a8 8 0 010 12M37 13a14 14 0 010 22" />
    {p.accent !== false && <path {...acc} d="M7 21h4l-4 3z" />}
  </Base>
)
export const IconStack = (p: P) => (
  <Base {...p}>
    <path d="M24 6l18 9-18 9-18-9z" />
    <path d="M6 24l18 9 18-9" />
    <path d="M6 33l18 9 18-9" />
    {p.accent !== false && <path {...acc} d="M24 9l6 3-6 3z" />}
  </Base>
)
export const IconPeople = (p: P) => (
  <Base {...p}>
    <circle cx="14" cy="15" r="5" />
    <circle cx="34" cy="15" r="5" />
    <circle cx="24" cy="26" r="5" />
    <path d="M6 34c0-5 4-8 8-8M42 34c0-5-4-8-8-8M14 44c0-6 4-10 10-10s10 4 10 10" />
    {p.accent !== false && <path {...acc} d="M21 7h6l-6 4z" />}
  </Base>
)
export const IconLink = (p: P) => (
  <Base {...p}>
    <path d="M20 28l8-8" />
    <path d="M22 14l4-4a8 8 0 0112 12l-4 4M26 34l-4 4a8 8 0 01-12-12l4-4" />
    {p.accent !== false && <path {...acc} d="M34 34h6l-6 5z" />}
  </Base>
)

export const serviceIcon = { social: IconSocial, camera: IconCamera, reels: IconReels, web: IconWeb, ads: IconAds } as const

export const IconPhone = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />
  </svg>
)
export const IconWhatsApp = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" {...p}>
    <path d="M3 21l1.6-4.8A9 9 0 1112 21a9 9 0 01-4.2-1z" />
    <path d="M9 9.5c.5 2.5 2.5 4.5 5 5l1.2-1.2 2 1-.4 1.6c-3.7.3-8.4-4.4-8.1-8.1L10.3 7l1 2z" />
  </svg>
)
export const IconInstagram = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
)
export const IconStar = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21.2l1.6-7L2 9.5l7.1-.6z" />
  </svg>
)
export const IconSpark = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M20 0l3.5 14L38 10 26 20l12 10-14.5-4L20 40l-3.5-14L2 30l12-10L2 10l14.5 4z" />
  </svg>
)
