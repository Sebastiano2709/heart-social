import 'server-only'
// Fixed-window limiter. Production uses a shared store (Upstash Redis REST); without it the limiter
// fails closed. The in-memory store is for development and tests only.

export type LimitResult = { ok: true; remaining: number } | { ok: false; reason: 'limited' | 'unavailable' }

const mem = new Map<string, { n: number; reset: number }>()

export async function rateLimit(key: string, { limit, windowSec }: { limit: number; windowSec: number }): Promise<LimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (url && token) {
    try {
      const k = `rl:${key}:${Math.floor(Date.now() / 1000 / windowSec)}`
      const res = await fetch(`${url}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([
          ['INCR', k],
          ['EXPIRE', k, String(windowSec)],
        ]),
        cache: 'no-store',
        signal: AbortSignal.timeout(2500),
      })
      if (!res.ok) return { ok: false, reason: 'unavailable' }
      const data = (await res.json()) as [{ result: number }, unknown]
      const n = data[0]?.result ?? Number.POSITIVE_INFINITY
      return n > limit ? { ok: false, reason: 'limited' } : { ok: true, remaining: limit - n }
    } catch {
      return { ok: false, reason: 'unavailable' }
    }
  }

  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_MEMORY_RATE_LIMIT !== 'true') {
    return { ok: false, reason: 'unavailable' } // fail closed: no shared store configured
  }

  const now = Date.now()
  const cur = mem.get(key)
  if (!cur || cur.reset < now) {
    mem.set(key, { n: 1, reset: now + windowSec * 1000 })
    return { ok: true, remaining: limit - 1 }
  }
  cur.n += 1
  return cur.n > limit ? { ok: false, reason: 'limited' } : { ok: true, remaining: limit - cur.n }
}
