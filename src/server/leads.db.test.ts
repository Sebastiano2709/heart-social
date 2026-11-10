// Integration test against a real PostgreSQL. Runs only when TEST_DATABASE_URL points at an empty test database.
import { describe, expect, it } from 'vitest'
import postgres from 'postgres'

const url = process.env.TEST_DATABASE_URL

describe.skipIf(!url)('saveLead on a fresh database', () => {
  it('creates the call_requests table on first use and stores leads', async () => {
    process.env.DATABASE_URL = url
    const { saveLead } = await import('./leads')
    const lead = { name: 'Test Integrare', phone: '0799521159', link: '', service: 'Social media', location: 'apel-gratuit' }
    const a = await saveLead(lead)
    const b = await saveLead({ ...lead, link: 'instagram.com/test' })
    expect(a.id).not.toBe(b.id)
    const sql = postgres(url!)
    const rows = await sql`select name, link, notified_at from call_requests order by created_at`
    await sql.end()
    expect(rows).toHaveLength(2)
    expect(rows[0]).toMatchObject({ name: 'Test Integrare', link: null, notified_at: null })
    expect(rows[1]?.link).toBe('instagram.com/test')
  })
})
