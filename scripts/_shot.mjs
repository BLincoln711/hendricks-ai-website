import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'

const BASE = 'http://127.0.0.1:3100'
const OUT = '.screens/phase4'
mkdirSync(OUT, { recursive: true })

const paths = [
  ['solutions', '/solutions'],
  ['sdi', '/solutions/search-demand-intelligence'],
  ['si', '/solutions/selection-intelligence'],
  ['spe', '/solutions/search-presence-engineering'],
  ['sim', '/solutions/search-impact-measurement'],
  ['how-it-works', '/how-it-works'],
  ['for-brands', '/for-brands'],
  ['for-agencies', '/for-agencies'],
  ['about', '/about'],
  ['diagnostic', '/diagnostic'],
  ['contact', '/contact'],
]

const viewports = [
  ['desktop', 1440, 1000],
  ['tablet', 1024, 768],
  ['mobile', 390, 844],
]

const browser = await chromium.launch()
const problems = []

for (const [vpName, width, height] of viewports) {
  const context = await browser.newContext({ viewport: { width, height } })
  const page = await context.newPage()

  const consoleErrors = []
  const failedRequests = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`))
  page.on('response', (res) => {
    if (res.status() >= 400) failedRequests.push(`${res.status()} ${res.url()}`)
  })

  for (const [name, path] of paths) {
    consoleErrors.length = 0
    failedRequests.length = 0
    const response = await page.goto(BASE + path, { waitUntil: 'load' })
    await page.waitForTimeout(600)
    if (response.status() !== 200) problems.push(`${path} -> HTTP ${response.status()}`)

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    if (overflow > 0) problems.push(`${vpName} ${path} horizontal overflow ${overflow}px`)

    const h1s = await page.locator('h1').count()
    if (h1s !== 1) problems.push(`${path} has ${h1s} h1 elements`)

    if (consoleErrors.length) problems.push(`${vpName} ${path} console: ${consoleErrors.join(' | ')}`)
    if (failedRequests.length)
      problems.push(`${vpName} ${path} failed requests: ${[...new Set(failedRequests)].join(' | ')}`)

    await page.screenshot({ path: `${OUT}/${vpName}-${name}.png`, fullPage: true })
  }

  await context.close()
}

// 320px overflow sweep — the narrowest width the design system must survive.
const narrow = await browser.newContext({ viewport: { width: 320, height: 800 } })
const narrowPage = await narrow.newPage()
for (const [, path] of paths) {
  await narrowPage.goto(BASE + path, { waitUntil: 'load' })
  const overflow = await narrowPage.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  if (overflow > 0) problems.push(`320px ${path} horizontal overflow ${overflow}px`)
}
await narrow.close()

await browser.close()

console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'No problems found.')
