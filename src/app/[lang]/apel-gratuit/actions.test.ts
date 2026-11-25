import { it, expect, vi, beforeEach } from 'vitest'

const calls: string[] = []
const afterFns: (() => Promise<void>)[] = []

vi.mock('next/server', () => ({ after: (fn: () => Promise<void>) => afterFns.push(fn) }))
vi.mock('@/server/client-ip', () => ({ getClientIp: vi.fn(async () => '203.0.113.7') }))
vi.mock('@/server/rate-limit', () => ({ rateLimit: vi.fn(async () => ({ ok: true, remaining: 4 })) }))
vi.mock('@/server/leads', () => ({
  saveLead: vi.fn(async () => { calls.push('save'); return { id: 'lead_1' } }),
  notifyLead: vi.fn(async () => { calls.push('notify') }),
}))

import { submitCall } from './actions'
import { saveLead, notifyLead } from '@/server/leads'
import { rateLimit } from '@/server/rate-limit'

const form = (o: Record<string, string>) => { const f = new FormData(); for (const [k, v] of Object.entries(o)) f.set(k, v); return f }
const valid = { name: ' Ana Pop ', phone: '0712 345 678', link: 'instagram.com/ana', service: 'Social media', consent: 'da' }

beforeEach(() => { vi.clearAllMocks(); calls.length = 0; afterFns.length = 0 })

it('returns Romanian field errors, keeps values and stores nothing for invalid input', async () => {
  const res = await submitCall({ status: 'idle' }, form({ name: '', phone: '12', link: 'nu e link', service: '', consent: '' }))
  expect(res.status).toBe('error')
  expect(Object.keys(res.fieldErrors ?? {})).toEqual(expect.arrayContaining(['name', 'phone', 'link', 'service', 'consent']))
  expect(res.fieldErrors?.phone?.[0]).toMatch(/incomplet/)
  expect(res.values?.link).toBe('nu e link')
  expect(saveLead).not.toHaveBeenCalled()
})

it('honeypot: fake success, nothing stored or sent', async () => {
  const res = await submitCall({ status: 'idle' }, form({ ...valid, website: 'spam.example' }))
  expect(res).toEqual({ status: 'success' })
  expect(saveLead).not.toHaveBeenCalled()
  expect(afterFns).toHaveLength(0)
})

it('persists before notifying and trims input', async () => {
  const res = await submitCall({ status: 'idle' }, form(valid))
  expect(res).toEqual({ status: 'success' })
  expect(vi.mocked(saveLead).mock.calls[0]?.[0]).toMatchObject({ name: 'Ana Pop', phone: '0712 345 678', service: 'Social media' })
  expect(calls).toEqual(['save'])
  await afterFns[0]?.()
  expect(calls).toEqual(['save', 'notify'])
})

it('limiter unavailable fails closed with the phone number', async () => {
  vi.mocked(rateLimit).mockResolvedValueOnce({ ok: false, reason: 'unavailable' })
  const res = await submitCall({ status: 'idle' }, form(valid))
  expect(res.status).toBe('error')
  expect(res.message).toMatch(/0799 521 159/)
  expect(saveLead).not.toHaveBeenCalled()
})

it('storage failure returns an error instead of a false success', async () => {
  vi.mocked(saveLead).mockRejectedValueOnce(new Error('db down'))
  const res = await submitCall({ status: 'idle' }, form(valid))
  expect(res.status).toBe('error')
  expect(notifyLead).not.toHaveBeenCalled()
})

it('notification failure does not lose the stored lead', async () => {
  vi.mocked(notifyLead).mockRejectedValueOnce(new Error('resend 500'))
  const res = await submitCall({ status: 'idle' }, form(valid))
  expect(res.status).toBe('success')
  await expect(afterFns[0]?.()).resolves.toBeUndefined()
  expect(saveLead).toHaveBeenCalledTimes(1)
})
