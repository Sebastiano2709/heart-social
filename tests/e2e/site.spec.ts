import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { readFile } from 'node:fs/promises'

const ip = () => `198.51.100.${Math.floor(Math.random() * 250) + 1}`

const pages = ['/', '/servicii', '/servicii/social-media-marketing', '/servicii/campanii-ads', '/despre-noi', '/apel-gratuit', '/portofoliu', '/multumim', '/politica-cookies']

test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => localStorage.setItem('hs-consent', JSON.stringify({ analytics: false, marketing: false, v: 1 })))
})

for (const path of pages) {
  test(`axe + one h1 + no overflow + no console errors: ${path}`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(e.message))
    // Reduced motion: scroll-reveal elements are not armed, so axe measures final colours, not mid-fade opacity.
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(path)
    await expect(page.locator('h1')).toHaveCount(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0)
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
    const serious = axe.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([])
    expect(errors).toEqual([])
  })
}

test('form: errors are announced next to fields and values survive', async ({ page }) => {
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': ip() })
  await page.goto('/apel-gratuit')
  await page.getByLabel('Cum te numești?').fill('A')
  await page.getByLabel('Numărul de telefon').fill('0712')
  await page.getByRole('button', { name: /Rezervă apelul gratuit/ }).click()
  await expect(page.getByText('Spune-ne cum te numești.')).toBeVisible()
  await expect(page.getByText(/Numărul pare incomplet/)).toBeVisible()
  await expect(page.getByText('Bifează acordul ca să te putem contacta.')).toBeVisible()
  await expect(page.getByLabel('Numărul de telefon')).toHaveValue('0712')
  await expect(page.getByLabel('Cum te numești?')).toBeFocused()
  await expect(page.getByLabel('Cum te numești?')).toHaveAttribute('aria-invalid', 'true')
})

test('form: valid submission is stored and lands on /multumim', async ({ page }) => {
  const marker = `E2E ${Date.now()}`
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': ip() })
  await page.goto('/apel-gratuit')
  await page.getByLabel('Cum te numești?').fill(marker)
  await page.getByLabel('Numărul de telefon').fill('0712 345 678')
  await page.getByLabel(/Instagramul sau site-ul/).fill('instagram.com/test')
  await page.getByLabel('Cu ce te putem ajuta?').selectOption('Editare Reels')
  await page.getByLabel(/Sunt de acord/).check()
  await page.getByRole('button', { name: /Rezervă apelul gratuit/ }).click()
  await expect(page).toHaveURL(/\/multumim$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('am primit')
  const stored = await readFile('.data/leads.jsonl', 'utf8')
  expect(stored).toContain(marker)
})

test('keyboard: skip link, services menu and CTA reachable', async ({ page, isMobile }) => {
  test.skip(!!isMobile, 'desktop navigation')
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Sari la conținut' })).toBeFocused()
  const svc = page.getByRole('button', { name: 'Servicii' })
  await svc.focus()
  await page.keyboard.press('Enter')
  await expect(svc).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(svc).toHaveAttribute('aria-expanded', 'false')
})

test('mobile menu opens and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile navigation')
  await page.goto('/')
  await page.getByRole('button', { name: 'Deschide meniul' }).click()
  await expect(page.getByRole('navigation', { name: 'Navigare mobilă' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation', { name: 'Navigare mobilă' })).toBeHidden()
})

test('showreel: plays, pauses (WCAG 2.2.2), static under reduced motion', async ({ page, browser }) => {
  await page.goto('/')
  await page.waitForTimeout(1200)
  await expect(page.locator('.sc-intro')).toBeVisible()
  const pause = page.getByRole('button', { name: 'Pune pe pauză animațiile' })
  await pause.click()
  await expect(page.getByRole('button', { name: 'Pornește din nou animațiile' })).toHaveAttribute('aria-pressed', 'true')
  const before = await page.locator('.reel .sc').first().getAttribute('class')
  await page.waitForTimeout(3000)
  expect(await page.locator('.reel .sc').first().getAttribute('class')).toBe(before)

  const ctx = await browser.newContext({ reducedMotion: 'reduce' })
  const p2 = await ctx.newPage()
  await p2.goto('/')
  await p2.waitForTimeout(1500)
  await expect(p2.locator('.sc-static')).toBeVisible()
  await ctx.close()
})

test('consent: no analytics requests before opt-in', async ({ browser }) => {
  const ctx = await browser.newContext()
  const p = await ctx.newPage()
  const third: string[] = []
  p.on('request', (r) => { if (/googletagmanager|facebook/.test(r.url())) third.push(r.url()) })
  await p.goto('/')
  await expect(p.getByRole('region', { name: 'Preferințe cookie' })).toBeVisible()
  await p.getByRole('button', { name: 'Doar necesare' }).click()
  await expect(p.getByRole('region', { name: 'Preferințe cookie' })).toBeHidden()
  expect(third).toEqual([])
  await ctx.close()
})

test('/contact redirects to /apel-gratuit; robots blocks indexing by default', async ({ page, request }) => {
  await page.goto('/contact')
  await expect(page).toHaveURL(/\/apel-gratuit$/)
  const robots = await (await request.get('/robots.txt')).text()
  expect(robots).toMatch(/Disallow: \//)
})

test('rate limit: the 6th request from one IP in 10 minutes is refused', async ({ page, isMobile }) => {
  test.skip(!!isMobile, 'server behaviour, run once')
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': '192.0.2.77' })
  await page.goto('/apel-gratuit')
  for (let i = 0; i < 6; i++) {
    await page.getByRole('button', { name: /Rezervă apelul gratuit/ }).click()
    await page.waitForTimeout(400)
  }
  await expect(page.getByText(/prea multe cereri/)).toBeVisible()
})

test('showreel: sound button starts muted and toggles on click', async ({ page }) => {
  await page.goto('/')
  const on = page.getByRole('button', { name: 'Pornește sunetul' })
  await expect(on).toBeVisible({ timeout: 5000 })
  await expect(on).toHaveAttribute('aria-pressed', 'false')
  expect(await page.evaluate(() => (document.querySelector('.reel-wrap audio') as HTMLAudioElement | null)?.paused)).toBe(true)
  await on.click()
  await expect(page.getByRole('button', { name: 'Oprește sunetul' })).toHaveAttribute('aria-pressed', 'true')
  expect(await page.evaluate(() => (document.querySelector('.reel-wrap audio') as HTMLAudioElement | null)?.paused)).toBe(false)
})
