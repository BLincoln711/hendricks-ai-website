import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders the approved hero and category positioning', async ({ page }) => {
    await expect(page).toHaveTitle('Search Intelligence Engineering for the AI Era | Hendricks')

    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toHaveCount(1)
    await expect(h1).toHaveText('Search Intelligence Engineering for the AI Era.')

    await expect(
      page.getByText('Know where your brand is missing from the shortlist.'),
    ).toBeVisible()

    // The operating line appears in both the hero and the footer, so scope it.
    const hero = page.getByRole('region', { name: /Search Intelligence Engineering/i })
    await expect(
      hero.getByText(
        'Measure demand. Understand AI visibility. Engineer selection. Prove business impact.',
      ),
    ).toBeVisible()
  })

  test('has no serious or critical accessibility violations', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()

    const blocking = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    )

    expect(
      blocking,
      blocking.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`).join('\n'),
    ).toEqual([])
  })

  test('labels the Selection Map as illustrative and provides a text alternative', async ({
    page,
  }) => {
    await expect(page.getByText('Illustrative interface. Not a client result.')).toBeVisible()

    // The diagram's meaning must reach assistive technology as text.
    const summary = page.getByText(/An illustrative diagram showing a customer need/)
    await expect(summary).toHaveCount(1)
  })

  test('exposes a working skip link as the first tab stop', async ({ page, browserName, isMobile }) => {
    // WebKit only tabs to links when macOS "Full Keyboard Access" is on, and
    // touch devices have no Tab key. The link itself is asserted below on every
    // engine; only the keyboard traversal is engine-specific.
    test.skip(browserName === 'webkit' || Boolean(isMobile), 'Tab-to-link is not available here')

    await page.keyboard.press('Tab')
    const skipLink = page.getByRole('link', { name: 'Skip to main content' })
    await expect(skipLink).toBeFocused()

    await page.keyboard.press('Enter')
    await expect(page.locator('#main')).toBeFocused()
  })

  test('never mentions The Search Economy', async ({ page }) => {
    // docs/10 §2 — it may appear only inside the founder biography on /about.
    await expect(page.locator('body')).not.toContainText('Search Economy')
  })

  test('does not expose the Results route while the flag is off', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Results', exact: true })).toHaveCount(0)
  })

  test('has exactly one main landmark', async ({ page }) => {
    await expect(page.getByRole('main')).toHaveCount(1)
  })
})

test.describe('Layout integrity', () => {
  test('has no horizontal overflow at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 })
    await page.goto('/')

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement
      return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth }
    })

    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth)
  })

  test('renders the Selection Map final state under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    await expect(page.getByText('Illustrative interface. Not a client result.')).toBeVisible()
    await expect(page.getByText(/An illustrative diagram showing a customer need/)).toHaveCount(1)
  })
})

test.describe('System routes', () => {
  test('serves a custom 404 without an error overlay', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist')
    expect(response?.status()).toBe(404)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('This path did not resolve.')
    await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible()
  })

  test('serves robots and sitemap', async ({ request }) => {
    expect((await request.get('/robots.txt')).status()).toBe(200)
    expect((await request.get('/sitemap.xml')).status()).toBe(200)
  })
})
