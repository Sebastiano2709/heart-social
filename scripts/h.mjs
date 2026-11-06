import { chromium } from '@playwright/test'
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome' })
const p = await b.newPage()
p.on('pageerror', e => console.log('ERR', e.message.slice(0,200)))
await p.goto(process.argv[2]); await p.waitForTimeout(4000)
console.log(await p.evaluate(() => ({ hydrated: Object.keys(document.querySelector('header')||{}).some(k=>k.startsWith('__react')) })))
await b.close()
