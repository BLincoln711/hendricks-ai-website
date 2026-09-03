import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { privacyNotice } from '@/content/legal/privacy'
import * as privacyRequest from '@/content/legal/privacy-request'
import { termsOfUse } from '@/content/legal/terms'

/**
 * Legal routes (docs/10 privacy and consent acceptance).
 *
 * Kept out of the main route sweep because these pages are obligations rather
 * than propositions: they carry no breadcrumb trail and no conversion CTA, and
 * asserting either would be asserting the wrong thing.
 */

const documents = [
  { path: '/privacy', document: privacyNotice },
  { path: '/terms', document: termsOfUse },
] as const

for (const { path, document } of documents) {
  test.describe(path, () => {
    test('renders the approved title, description, canonical, and H1', async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(200)

      await expect(page).toHaveTitle(document.meta.title)
      await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
        'content',
        document.meta.description,
      )

      const canonical = await page.locator('head link[rel="canonical"]').getAttribute('href')
      expect(new URL(canonical ?? '').pathname).toBe(path)

      const h1 = page.getByRole('heading', { level: 1 })
      await expect(h1).toHaveCount(1)
      await expect(h1).toHaveText(document.hero.title)
    })

    test('shows no unresolved legal placeholder', async ({ page }) => {
      // docs/16 §14 — the single highest-consequence defect on these routes.
      await page.goto(path)

      const text = (await page.getByRole('main').textContent()) ?? ''
      expect(text).not.toMatch(/\[[A-Z][A-Z ]{2,}\]/)
    })

    test('dates itself in machine-readable form', async ({ page }) => {
      await page.goto(path)

      const times = page.getByRole('main').locator('time')
      await expect(times).toHaveCount(2)
      for (const time of await times.all()) {
        expect(await time.getAttribute('datetime')).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      }
    })

    test('links every section from a contents list', async ({ page }) => {
      await page.goto(path)

      const contents = page.getByRole('navigation', { name: 'Contents' })

      // Below 1024 px the outline collapses behind its own control, so open it
      // before reading the list. Nothing is cut either way: the count below is
      // taken against the whole list, collapsed or not.
      const toggle = contents.getByRole('button', { name: 'Contents' })
      if (await toggle.isVisible()) {
        // Collapsed, not cut: count the rows in the document, which a role query
        // would skip while the list is hidden, then open it.
        await expect(contents.locator('ol > li')).toHaveCount(document.sections.length)
        await toggle.click()
      }

      await expect(contents.getByRole('listitem')).toHaveCount(document.sections.length)

      for (const section of document.sections) {
        await expect(contents.getByRole('link', { name: section.title })).toBeVisible()
        await expect(page.locator(`#${section.id}`)).toHaveCount(1)
      }
    })

    test('names the confirmed legal entity', async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('main')).toContainText('Hendricks Agency LLC')
    })

    test('has no serious or critical accessibility violations', async ({ page }) => {
      await page.goto(path)

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze()

      const blocking = results.violations.filter(
        (violation) => violation.impact === 'serious' || violation.impact === 'critical',
      )

      expect(blocking, blocking.map((v) => `${v.id}: ${v.help}`).join('\n')).toEqual([])
    })

    test('renders without console errors', async ({ page }) => {
      const errors: string[] = []
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text())
      })
      page.on('pageerror', (error) => errors.push(error.message))

      await page.goto(path)
      expect(errors).toEqual([])
    })
  })
}

test.describe('/terms', () => {
  test('states the resolved venue', async ({ page }) => {
    await page.goto('/terms')
    await expect(page.locator('#governing-law')).toContainText('Harris County, Texas')
  })
})

test.describe('/privacy-request', () => {
  test('is reachable from the footer but absent from primary navigation', async ({ page }) => {
    // docs/16 §9.
    await page.goto('/')

    await expect(
      page.getByRole('navigation', { name: 'Primary' }).getByRole('link', {
        name: 'Privacy Request',
      }),
    ).toHaveCount(0)

    await expect(page.locator('footer').getByRole('link', { name: 'Privacy Request' })).toBeVisible()
  })

  test('stays out of the sitemap and asks not to be indexed', async ({ page }) => {
    const sitemap = await page.goto('/sitemap.xml')
    expect(await sitemap?.text()).not.toContain('/privacy-request')

    await page.goto('/privacy-request')
    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/,
    )
  })

  test('shows the notice at collection without opening anything', async ({ page }) => {
    // legal/01 §1 — must be readable in place.
    await page.goto('/privacy-request')

    await expect(page.getByRole('main')).toContainText(
      'Hendricks will use the information in this form to verify, process, document, and respond',
    )
    await expect(page.getByRole('main').getByRole('link', { name: 'Privacy Notice' })).toBeVisible()
  })

  test('requires no account and offers every request type', async ({ page }) => {
    await page.goto('/privacy-request')

    await expect(page.getByLabel('Password')).toHaveCount(0)

    const options = page.getByLabel(privacyRequest.form.labels.requestType).locator('option')
    // Every approved type plus the empty prompt.
    await expect(options).toHaveCount(privacyRequest.requestTypeOptions.length + 1)
  })

  test('collects no phone number or file upload', async ({ page }) => {
    // docs/16 §8.
    await page.goto('/privacy-request')

    await expect(page.locator('input[type="tel"]')).toHaveCount(0)
    await expect(page.locator('input[type="file"]')).toHaveCount(0)
  })

  test('uses no CAPTCHA', async ({ page }) => {
    // `21-privacy-request.md` — an inaccessible CAPTCHA is prohibited.
    await page.goto('/privacy-request')

    await expect(page.locator('iframe[src*="recaptcha"]')).toHaveCount(0)
    await expect(page.locator('iframe[src*="hcaptcha"]')).toHaveCount(0)
  })

  test('reports validation failures in a focusable error summary', async ({ page }) => {
    await page.goto('/privacy-request')

    await page.getByLabel(privacyRequest.form.labels.firstName).fill('Ada')
    await page.getByRole('button', { name: privacyRequest.form.submit }).click()

    // Scoped to main: Next.js mounts its own route announcer with role="alert".
    const summary = page.getByRole('main').getByRole('alert')
    await expect(summary).toBeVisible()
    await expect(summary).toContainText(privacyRequest.errors.summaryTitle)
    await expect(summary).toBeFocused()
  })

  test('preserves submitted values through a validation error', async ({ page }) => {
    // `21-privacy-request.md` — non-sensitive values must survive.
    await page.goto('/privacy-request')

    await page.getByLabel(privacyRequest.form.labels.firstName).fill('Ada')
    await page.getByLabel(privacyRequest.form.labels.lastName).fill('Lovelace')
    await page.getByRole('button', { name: privacyRequest.form.submit }).click()

    await expect(page.getByRole('main').getByRole('alert')).toBeVisible()
    await expect(page.getByLabel(privacyRequest.form.labels.firstName)).toHaveValue('Ada')
    await expect(page.getByLabel(privacyRequest.form.labels.lastName)).toHaveValue('Lovelace')
  })

  test('puts no submitted value into the URL', async ({ page }) => {
    // docs/16 §8 — form values never appear in a URL.
    await page.goto('/privacy-request')

    await page.getByLabel(privacyRequest.form.labels.email).fill('ada@example.com')
    await page.getByRole('button', { name: privacyRequest.form.submit }).click()
    await expect(page.getByRole('main').getByRole('alert')).toBeVisible()

    expect(page.url()).not.toContain('ada@example.com')
    expect(page.url()).not.toContain('email=')
  })

  test('has no serious or critical accessibility violations', async ({ page }) => {
    await page.goto('/privacy-request')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()

    const blocking = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    )

    expect(blocking, blocking.map((v) => `${v.id}: ${v.help}`).join('\n')).toEqual([])
  })
})

test.describe('Footer legal row', () => {
  for (const path of ['/', '/solutions', '/methodology', '/privacy']) {
    test(`${path} offers the policies, the request route, and Privacy Choices`, async ({ page }) => {
      // legal/01 §11, plus docs/10: Privacy Choices on every route.
      await page.goto(path)
      const footer = page.locator('footer')

      await expect(footer.getByRole('link', { name: 'Privacy Notice' })).toBeVisible()
      await expect(footer.getByRole('link', { name: 'Terms of Use' })).toBeVisible()
      await expect(footer.getByRole('link', { name: 'Privacy Request' })).toBeVisible()
      await expect(footer.getByRole('button', { name: 'Privacy Choices' })).toBeVisible()
    })
  }

  test('offers no Do Not Sell link while nothing is sold or shared', async ({ page }) => {
    // legal/01 §11 — the link would misdescribe the site at launch.
    await page.goto('/')
    await expect(page.locator('footer')).not.toContainText('Do Not Sell')
  })
})

test.describe('Narrow viewport integrity', () => {
  test.use({ viewport: { width: 320, height: 800 } })

  for (const path of ['/privacy', '/terms', '/privacy-request']) {
    test(`${path} does not overflow horizontally at 320px`, async ({ page }) => {
      await page.goto(path)

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }))

      expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
    })
  }
})
