'use server'
// Canonical lead flow (05 §10.9): rate limit (trusted IP, fails closed) → validate (honeypot → fake success)
// → PERSIST → notify after the response. Deviation recorded in docs/ADR-002: notification runs in
// next/server `after()` with an idempotency key instead of a job queue; unsent rows are reconcilable.
import { after } from 'next/server'
import { z } from 'zod'
import { CallSchema, type CallState } from './schema'
import { getClientIp } from '@/server/client-ip'
import { rateLimit } from '@/server/rate-limit'
import { notifyLead, saveLead } from '@/server/leads'
import { site } from '@/lib/site'

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v : '')

export async function submitCall(_prev: CallState, formData: FormData): Promise<CallState> {
  const values = {
    name: str(formData.get('name')).trim(),
    phone: str(formData.get('phone')).trim(),
    link: str(formData.get('link')).trim(),
    service: str(formData.get('service')),
    consent: str(formData.get('consent')),
  }
  const failure = `Nu am putut trimite cererea. Încearcă din nou sau sună-ne direct la ${site.phoneDisplay}.`

  // 1. Rate limit
  let ip: string
  try {
    ip = await getClientIp()
  } catch (err) {
    console.error('lead.client_ip_failed', err)
    return { status: 'error', message: failure, values }
  }
  const limit = await rateLimit(`call:${ip}`, { limit: 5, windowSec: 600 })
  if (!limit.ok) {
    return {
      status: 'error',
      message: limit.reason === 'unavailable' ? `Momentan nu putem primi cereri prin formular. Sună-ne la ${site.phoneDisplay}.` : 'Ai trimis prea multe cereri într-un timp scurt. Încearcă din nou peste câteva minute.',
      values,
    }
  }

  // 2. Validate
  const parsed = CallSchema.safeParse({
    ...values,
    location: str(formData.get('location')) || 'apel-gratuit',
    website: str(formData.get('website')) || undefined,
  })
  if (!parsed.success) {
    if (parsed.error.issues.some((i) => i.path[0] === 'website')) return { status: 'success' } // honeypot
    return { status: 'error', message: 'Te rugăm să verifici câmpurile marcate.', fieldErrors: z.flattenError(parsed.error).fieldErrors, values }
  }

  const lead = { name: parsed.data.name, phone: parsed.data.phone, link: parsed.data.link, service: parsed.data.service, location: parsed.data.location }

  // 3. Persist first
  let id: string
  try {
    ;({ id } = await saveLead(lead))
  } catch (err) {
    console.error('lead.persist_failed', err)
    return { status: 'error', message: failure, values }
  }

  // 4. Notify after the response; a failure is logged, the stored lead is never lost.
  after(async () => {
    try {
      await notifyLead(id, lead)
    } catch (err) {
      console.error('lead.notify_failed', { id, err })
    }
  })

  return { status: 'success' }
}
