import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

import { banner, preferences } from '@/content/consent'
import { CONSENT_VERSION } from '@/lib/consent/state'

/**
 * Consent acceptance tests (docs/16 §15, docs/10 privacy and consent acceptance).
 *
 * Written against rendered behaviour rather than the store, because the rules
 * being checked are promises made to a visitor: nothing optional runs before
 * they decide, refusing costs the same as accepting, and the browser's own
 * signal is honoured without argument.
 */

const CONSENT_KEY = 'hendricks_privacy_v1'

/** Endpoints that must stay silent until the visitor accepts analytics. */
const OPTIONAL_ANALYTICS = [
  'google-analytics.com',
  'googletagmanager.com',
  'analytics.google.com',
  '/_vercel/insights',
  '/_vercel/speed-insights',
  'doubleclick.net',
  'facebook.net',
  'linkedin.com/px',
  'tiktok.com',
]

function recordAnalyticsRequests(page: Page): string[] {
  const seen: string[] = []

  page.on('request', (request) => {
    const url = request.url()
    if (OPTIONAL_ANALYTICS.some((fragment) => url.includes(fragment))) seen.push(url)
  })

  return seen
}

function readConsent(page: Page) {
  return page.evaluate((key) => {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : null
  }, CONSENT_KEY)
}

/**
 * Waits for the client store to settle before reading its record.
 *
 * The Global Privacy Control decision is taken during hydration, so reading
 * storage straight after `goto` can catch the page either before any record
 * exists or while a planted one is still there. Polling asserts the outcome the
 * rules actually require: the signal is honoured, promptly, without a prompt.
 */
async function waitForConsentSource(page: Page, source: string) {
  await expect.poll(async () => (await readConsent(page))?.source ?? null).toBe(source)

  return readConsent(page)
}

function readConsentModeDefaults(page: Page) {
  return page.evaluate(() => {
    const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []
    return layer
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((entry) => entry[0] === 'consent')
      .map((entry) => ({ command: entry[1] as string, state: entry[2] as Record<string, string> }))
  })
}

test.describe('Before a decision', () => {
  test('sends no optional analytics request', async ({ page }) => {
    const requests = recordAnalyticsRequests(page)

    await page.goto('/')
    await expect(page.getByRole('heading', { name: banner.title })).toBeVisible()

    expect(requests, `optional analytics fired before consent:\n${requests.join('\n')}`).toEqual([])
  })

  test('sets every Google consent state to denied except the necessary two', async ({ page }) => {
    await page.goto('/')

    const commands = await readConsentModeDefaults(page)
    const defaults = commands.find((command) => command.command === 'default')

    expect(defaults).toBeDefined()
    expect(defaults?.state.analytics_storage).toBe('denied')
    expect(defaults?.state.ad_storage).toBe('denied')
    expect(defaults?.state.ad_user_data).toBe('denied')
    expect(defaults?.state.ad_personalization).toBe('denied')
    expect(defaults?.state.functionality_storage).toBe('granted')
    expect(defaults?.state.security_storage).toBe('granted')
  })

  test('writes nothing to storage until a control is used', async ({ page }) => {
    // legal/01 §8 — only the consent choice itself may be stored before consent,
    // and no choice has been made yet.
    await page.goto('/')
    await expect(page.getByRole('heading', { name: banner.title })).toBeVisible()

    expect(await readConsent(page)).toBeNull()
  })

  test('offers reject and accept with equal prominence and one action each', async ({ page }) => {
    // docs/16 §6. Compared as rendered geometry and computed style, because this
    // is a rule about what the visitor sees, not about markup.
    await page.goto('/')

    const reject = page.getByRole('button', { name: banner.reject })
    const accept = page.getByRole('button', { name: banner.accept })

    await expect(reject).toBeVisible()
    await expect(accept).toBeVisible()

    const [rejectBox, acceptBox] = await Promise.all([reject.boundingBox(), accept.boundingBox()])
    expect(rejectBox?.height).toBe(acceptBox?.height)

    const styleOf = (name: string) =>
      page.getByRole('button', { name }).evaluate((node) => {
        const style = getComputedStyle(node)
        return {
          background: style.backgroundColor,
          color: style.color,
          border: style.borderColor,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
        }
      })

    expect(await styleOf(banner.reject)).toEqual(await styleOf(banner.accept))
  })

  test('never offers a control that treats dismissal as consent', async ({ page }) => {
    await page.goto('/')

    const region = page.getByRole('region', { name: banner.title })
    for (const forbidden of ['Continue', 'Got it', 'OK', 'Close']) {
      await expect(region.getByRole('button', { name: forbidden })).toHaveCount(0)
    }
  })

  test('has no serious or critical accessibility violations', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: banner.title })).toBeVisible()

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()

    const blocking = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    )

    expect(blocking, blocking.map((v) => `${v.id}: ${v.help}`).join('\n')).toEqual([])
  })
})

test.describe('Accepting analytics', () => {
  test('records the grant and keeps advertising denied', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: banner.accept }).click()

    const state = await readConsent(page)
    expect(state?.analytics).toBe('granted')
    expect(state?.advertising).toBe('denied')
    expect(state?.source).toBe('banner')

    const update = (await readConsentModeDefaults(page)).find(
      (command) => command.command === 'update',
    )
    expect(update?.state.analytics_storage).toBe('granted')
    expect(update?.state.ad_storage).toBe('denied')
    expect(update?.state.ad_user_data).toBe('denied')
    expect(update?.state.ad_personalization).toBe('denied')
  })

  test('dismisses the banner and does not ask again on the next page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: banner.accept }).click()
    await expect(page.getByRole('heading', { name: banner.title })).toBeHidden()

    await page.goto('/about')
    await expect(page.getByRole('heading', { name: banner.title })).toBeHidden()
  })

  test('announces the outcome to assistive technology', async ({ page }) => {
    // docs/16 §6 — consent status announced.
    await page.goto('/')
    await page.getByRole('button', { name: banner.accept }).click()

    await expect(page.locator('[aria-live="polite"]')).toHaveText('Optional analytics accepted.')
  })
})

test.describe('Rejecting analytics', () => {
  test('records the refusal and sends no analytics request', async ({ page }) => {
    const requests = recordAnalyticsRequests(page)

    await page.goto('/')
    await page.getByRole('button', { name: banner.reject }).click()

    const state = await readConsent(page)
    expect(state?.analytics).toBe('denied')

    await page.goto('/about')
    expect(requests).toEqual([])
  })

  test('leaves the page fully usable', async ({ page }) => {
    // legal/01 §14 — the site works when optional analytics are rejected.
    await page.goto('/')
    await page.getByRole('button', { name: banner.reject }).click()

    await page.getByRole('link', { name: 'About', exact: true }).first().click()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})

test.describe('Withdrawing consent', () => {
  test('stops future optional analytics from the footer control on any route', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: banner.accept }).click()
    expect((await readConsent(page))?.analytics).toBe('granted')

    await page.goto('/methodology')
    await page.getByRole('button', { name: 'Privacy Choices' }).click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await dialog.getByRole('button', { name: preferences.reject }).click()

    const state = await readConsent(page)
    expect(state?.analytics).toBe('denied')
    expect(state?.source).toBe('preferences')

    const update = (await readConsentModeDefaults(page))
      .filter((command) => command.command === 'update')
      .at(-1)
    expect(update?.state.analytics_storage).toBe('denied')
  })
})

test.describe('Privacy Choices modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: banner.manage }).click()
  })

  test('is a labelled modal dialog', async ({ page }) => {
    const dialog = page.getByRole('dialog')

    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
    await expect(dialog.getByRole('heading', { name: preferences.title })).toBeVisible()
  })

  test('offers no pre-selected analytics toggle', async ({ page }) => {
    // docs/16 §6.
    await expect(page.getByRole('checkbox', { name: 'Allow optional analytics' })).not.toBeChecked()
  })

  test('closes on Escape without implying consent', async ({ page }) => {
    // docs/16 §6 — Escape closes the modal but records nothing.
    await page.keyboard.press('Escape')

    await expect(page.getByRole('dialog')).toBeHidden()
    expect(await readConsent(page)).toBeNull()
    await expect(page.getByRole('heading', { name: banner.title })).toBeVisible()
  })

  test('traps focus inside the dialog', async ({ page }) => {
    const dialog = page.getByRole('dialog')

    for (let step = 0; step < 12; step += 1) {
      await page.keyboard.press('Tab')
      const inside = await dialog.evaluate((node) => node.contains(document.activeElement))
      expect(inside, `focus escaped the dialog after ${step + 1} tabs`).toBe(true)
    }
  })

  test('saves the toggle state through Save choices', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Allow optional analytics' }).check()
    await page.getByRole('button', { name: 'Save choices' }).click()

    expect((await readConsent(page))?.analytics).toBe('granted')
  })

  test('has no serious or critical accessibility violations', async ({ page }) => {
    await expect(page.getByRole('dialog')).toBeVisible()

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()

    const blocking = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    )

    expect(blocking, blocking.map((v) => `${v.id}: ${v.help}`).join('\n')).toEqual([])
  })
})

test.describe('Global Privacy Control', () => {
  test.use({
    // Set before any document script runs, so the store reads it on first pass.
    // Chromium does not expose a real GPC toggle to automation; defining the
    // property is how the browser would present it.
    storageState: { cookies: [], origins: [] },
  })

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'globalPrivacyControl', {
        value: true,
        configurable: true,
      })
    })
  })

  test('denies analytics without asking', async ({ page }) => {
    const requests = recordAnalyticsRequests(page)

    await page.goto('/')

    const state = await waitForConsentSource(page, 'gpc')
    expect(state?.analytics).toBe('denied')
    expect(state?.gpc).toBe(true)
    expect(requests).toEqual([])

    // docs/16 §5 — the interface must not pressure the visitor to override it,
    // which starts with not putting the question in front of them. Asserted
    // after the record lands, so an unhydrated page cannot pass this by default.
    await expect(page.getByRole('heading', { name: banner.title })).toBeHidden()
  })

  test('explains the signal in the modal and offers no way to accept', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Privacy Choices' }).click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toContainText('Global Privacy Control')
    await expect(dialog.getByRole('button', { name: preferences.accept })).toHaveCount(0)
    await expect(dialog.getByRole('checkbox', { name: 'Allow optional analytics' })).toHaveCount(0)
  })

  test('overrides an earlier grant', async ({ page }) => {
    // A visitor who accepted, then switched Global Privacy Control on, is making
    // a newer request than the record they left behind (docs/16 §5). The stored
    // grant is planted before the page loads so the store meets both at once.
    await page.addInitScript(
      ({ key, granted }) => window.localStorage.setItem(key, granted),
      {
        key: CONSENT_KEY,
        granted: JSON.stringify({
          version: CONSENT_VERSION,
          analytics: 'granted',
          advertising: 'denied',
          source: 'banner',
          gpc: false,
          decidedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
        }),
      },
    )

    await page.goto('/')

    const state = await waitForConsentSource(page, 'gpc')
    expect(state?.analytics).toBe('denied')
    await expect(page.getByRole('heading', { name: banner.title })).toBeHidden()
  })
})
