// Deterministic low-poly geometry (the brand "facet" signature). Same output on server and client.

export const HEART_PATH =
  'M50 90 L7 45 C-5 30 4 5 27 5 C39 5 46 12 50 19 C54 12 61 5 73 5 C96 5 105 30 93 45 Z'

const STOPS = ['#3A0F63', '#5E1B94', '#7A2BB8', '#A3208F', '#D81B7F'] as const

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function hex(h: string) {
  return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
}

export function ramp(t: number): string {
  const c = Math.max(0, Math.min(0.999, t)) * (STOPS.length - 1)
  const i = Math.floor(c)
  const a = hex(STOPS[i] ?? '#3A0F63')
  const b = hex(STOPS[i + 1] ?? '#D81B7F')
  const f = c - i
  return `rgb(${a.map((v, k) => Math.round(v + ((b[k] ?? v) - v) * f)).join(',')})`
}

export type Tri = { points: string; fill: string }

/** Triangulated 100×92 grid, coloured violet→magenta, to be clipped by HEART_PATH. */
export function heartFacets(seed = 7): Tri[] {
  const r = seeded(seed)
  const cols = 7
  const rows = 7
  const W = 100
  const H = 92
  const pts: [number, number][][] = []
  for (let y = 0; y <= rows; y++) {
    const row: [number, number][] = []
    for (let x = 0; x <= cols; x++) {
      const jx = x > 0 && x < cols ? (r() - 0.5) * 9 : 0
      const jy = y > 0 && y < rows ? (r() - 0.5) * 9 : 0
      row.push([(x * W) / cols + jx, (y * H) / rows + jy])
    }
    pts.push(row)
  }
  const tris: Tri[] = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const a = pts[y]![x]!
      const b = pts[y]![x + 1]!
      const c = pts[y + 1]![x]!
      const d = pts[y + 1]![x + 1]!
      for (const t of [
        [a, b, d],
        [a, d, c],
      ] as const) {
        const cx = (t[0][0] + t[1][0] + t[2][0]) / 3
        const cy = (t[0][1] + t[1][1] + t[2][1]) / 3
        const fill = ramp((cx / W) * 0.55 + (cy / H) * 0.45 + (r() - 0.5) * 0.28)
        tris.push({ points: t.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' '), fill })
      }
    }
  }
  return tris
}

export type Shard = { points: string; fill: string; opacity: number }

/** Scattered triangles for backgrounds (cover, final CTA, hero fallbacks). */
export function shards(w: number, h: number, n: number, seed: number, alpha: number): Shard[] {
  const r = seeded(seed)
  const out: Shard[] = []
  for (let i = 0; i < n; i++) {
    const x = r() * w
    const y = r() * h
    const sz = 60 + r() * 220
    const p: [number, number][] = [
      [x, y],
      [x + (r() - 0.3) * sz, y + (r() - 0.5) * sz],
      [x + (r() - 0.7) * sz, y + (r() + 0.2) * sz * 0.8],
    ]
    out.push({ points: p.map((q) => `${q[0].toFixed(0)},${q[1].toFixed(0)}`).join(' '), fill: ramp(r()), opacity: Number((alpha * (0.35 + r() * 0.65)).toFixed(2)) })
  }
  return out
}
