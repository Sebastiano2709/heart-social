import { chromium } from '@playwright/test'
const base = 'http://localhost:3300/share/'
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome' })
for (const vp of [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch })
  const page = await ctx.newPage()
  const errors = [], failed = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 160)))
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message.slice(0, 160)))
  page.on('requestfailed', (r) => failed.push(r.url()))
  page.on('response', (r) => r.status() >= 400 && failed.push(r.status() + ' ' + r.url()))
  await page.goto(base + 'index.html', { waitUntil: 'load' })
  await page.waitForTimeout(6000)
  const vids = await page.$$eval('video', (vs) => vs.map((v) => ({ src: v.currentSrc.split('/').pop(), t: v.currentTime.toFixed(1), paused: v.paused })))
  console.log(vp.name, 'videos', JSON.stringify(vids.slice(0, 4)))
  await page.screenshot({ path: `/home/claude/preview/${vp.name}-home.png` })
  // accept cookies if banner
  const accept = page.getByRole('button', { name: /accept/i }).first()
  if (await accept.isVisible().catch(() => false)) await accept.click()
  // navigate to apel gratuit via first CTA
  await page.locator('a[href^="apel-gratuit.html"]:visible').first().click()
  await page.waitForLoadState('load')
  console.log(vp.name, 'after CTA ->', page.url())
  await page.getByRole('button', { name: /trimite|rezerv/i }).last().click()
  await page.waitForTimeout(800)
  console.log(vp.name, 'invalid-submit focus ->', await page.evaluate(() => document.activeElement?.getAttribute('name')))
  await page.fill('[name=name]', 'Test Preview')
  await page.fill('[name=phone]', '0799521159')
  const sel = page.locator('[name=service]')
  if (await sel.count()) { const tag = await sel.first().evaluate((e) => e.tagName); if (tag === 'SELECT') await sel.selectOption({ index: 1 }); else await sel.first().check() }
  await page.locator('[name=consent]').check()
  await page.getByRole('button', { name: /trimite|rezerv/i }).last().click()
  await page.waitForURL(/multumim/, { timeout: 8000 }).catch(() => {})
  console.log(vp.name, 'after valid submit ->', page.url())
  await page.goto(base + 'servicii-social-media-marketing.html'); await page.waitForTimeout(1500)
  await page.screenshot({ path: `/home/claude/preview/${vp.name}-smm.png`, fullPage: false })
  console.log(vp.name, 'errors', JSON.stringify([...new Set(errors)].slice(0, 8)))
  console.log(vp.name, 'failed', JSON.stringify([...new Set(failed)].slice(0, 8)))
  await ctx.close()
}
await browser.close()
