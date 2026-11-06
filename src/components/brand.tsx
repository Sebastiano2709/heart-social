import { useId } from 'react'
import { HEART_PATH, heartFacets, shards } from '@/lib/lowpoly'

const FACETS = heartFacets()

/** Provisional SVG rebuild of the Heart Social low-poly heart (replace with the original logo file). */
export function HeartMark({ className, title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 100 92" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <clipPath id={`h${id}`}>
          <path d={HEART_PATH} />
        </clipPath>
      </defs>
      <g clipPath={`url(#h${id})`}>
        {FACETS.map((t, i) => (
          <polygon key={i} points={t.points} fill={t.fill} stroke={t.fill} strokeWidth={0.4} />
        ))}
      </g>
      <g fill="#fff">
        <rect x="36" y="27" width="8" height="34" />
        <rect x="56" y="27" width="8" height="34" />
        <rect x="36" y="40" width="28" height="7" />
      </g>
    </svg>
  )
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <HeartMark className="h-auto w-10" />
      <span className={`hidden whitespace-nowrap text-[1.05rem] min-[420px]:inline font-extrabold tracking-[0.06em] ${light ? 'text-white' : 'text-grey-700'}`}>HEART SOCIAL</span>
    </span>
  )
}

export function Shards({ w, h, n, seed, alpha, className }: { w: number; h: number; n: number; seed: number; alpha: number; className?: string }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      {shards(w, h, n, seed, alpha).map((s, i) => (
        <polygon key={i} points={s.points} fill={s.fill} opacity={s.opacity} />
      ))}
    </svg>
  )
}

function star(x: number, y: number, s: number) {
  let p = ''
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 ? s * 0.42 : s
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    p += `${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)} `
  }
  return p.trim()
}

/** Rosette badge built from the brand heart — decorative, promises no award. */
export function Rosette({ className }: { className?: string }) {
  const n = 22
  const R = 112
  const cx = 150
  const cy = 128
  return (
    <svg viewBox="0 0 300 300" className={className} aria-hidden="true" focusable="false">
      <path d="M105 200 L80 292 L108 276 L122 300 L140 215Z" fill="#211E25" />
      <path d="M195 200 L220 292 L192 276 L178 300 L160 215Z" fill="#211E25" />
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2
        return <circle key={i} cx={(cx + Math.cos(a) * R).toFixed(1)} cy={(cy + Math.sin(a) * R).toFixed(1)} r="17" fill="#16141A" />
      })}
      <circle cx={cx} cy={cy} r="110" fill="#16141A" />
      <circle cx={cx} cy={cy} r="92" fill="#fff" />
      <circle cx={cx} cy={cy} r="84" fill="none" stroke="#16141A" strokeWidth="2" />
      <svg x="96" y="80" width="108" height="99" viewBox="0 0 100 92">
        <HeartMark />
      </svg>
      {[star(28, 150, 16), star(272, 150, 16), star(62, 72, 11), star(238, 72, 11)].map((p, i) => (
        <polygon key={i} points={p} fill="#B3166E" />
      ))}
    </svg>
  )
}
