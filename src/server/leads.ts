import 'server-only'
// Lead storage + notification. Persist first (05 §10.9): the database is the source of truth, not the inbox.
// DATABASE_URL → PostgreSQL (see db/001_call_requests.sql). Development without it → .data/leads.jsonl.
import { randomUUID } from 'node:crypto'
import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import postgres from 'postgres'

export type Lead = { name: string; phone: string; link: string; service: string; location: string }

let sql: ReturnType<typeof postgres> | null = null
function db() {
  const url = process.env.DATABASE_URL
  if (!url) return null
  sql ??= postgres(url, { max: 3, idle_timeout: 20, connect_timeout: 5 })
  return sql
}

export async function saveLead(lead: Lead): Promise<{ id: string }> {
  const conn = db()
  if (conn) {
    const rows = await conn<{ id: string }[]>`
      insert into call_requests (name, phone, link, service, form_location)
      values (${lead.name}, ${lead.phone}, ${lead.link || null}, ${lead.service}, ${lead.location})
      returning id`
    const id = rows[0]?.id
    if (!id) throw new Error('insert returned no id')
    return { id }
  }
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_FILE_LEADS !== 'true') {
    throw new Error('DATABASE_URL is not configured') // never accept a lead we cannot store
  }
  const id = randomUUID()
  const dir = path.join(process.cwd(), '.data')
  await mkdir(dir, { recursive: true })
  await appendFile(path.join(dir, 'leads.jsonl'), JSON.stringify({ id, at: new Date().toISOString(), ...lead }) + '\n', 'utf8')
  return { id }
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c)

/** Runs after the response (next/server `after`). Idempotent per lead id; failures are logged, the lead stays stored. */
export async function notifyLead(id: string, lead: Lead): Promise<void> {
  const key = process.env.RESEND_API_KEY
  const to = process.env.LEAD_NOTIFY_TO
  const from = process.env.LEAD_NOTIFY_FROM
  if (!key || !to || !from) {
    console.warn('lead.notify_skipped', { id, reason: 'email not configured' })
    return
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `lead-${id}` },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Cerere de apel: ${lead.name} (${lead.service})`,
      html: `<p><b>Nume:</b> ${esc(lead.name)}<br><b>Telefon:</b> ${esc(lead.phone)}<br><b>Link:</b> ${esc(lead.link || '—')}<br><b>Serviciu:</b> ${esc(lead.service)}<br><b>Formular:</b> ${esc(lead.location)}</p>`,
    }),
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`resend ${res.status}`)
  const conn = db()
  if (conn) await conn`update call_requests set notified_at = now() where id = ${id}`
}
