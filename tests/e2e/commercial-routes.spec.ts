import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

import { indexableBuiltRoutes } from '@/config/routes'
import * as about from '@/content/pages/about'
import * as contact from '@/content/pages/contact'
import * as diagnostic from '@/content/pages/diagnostic'
import * as forAgencies from '@/content/pages/for-agencies'
import * as forBrands from '@/content/pages/for-brands'
import * as howItWorks from '@/content/pages/how-it-works'
import * as sdi from '@/content/pages/search-demand-intelligence'
import * as sim from '@/content/pages/search-impact-measurement'
import * as spe from '@/content/pages/search-presence-engineering'
import * as si from '@/content/pages/selection-intelligence'
import * as solutions from '@/content/pages/solutions'

/**
 * Route sweep for the Phase 4 commercial pages.
 *
 * Titles and H1s are read from the content objects rather than duplicated here,
 * so this suite verifies that the approved copy actually reaches the rendered
 * document. The unit suite is what pins the copy itself.
 */
const commercialRoutes = [
  { path: '/solutions', meta: solutions.solutionsMeta, h1: solutions.solutionsHero.title },
  { path: '/solutions/search-demand-intelligence', meta: sdi.meta, h1: sdi.hero.title },
  { path: '/solutions/selection-intelligence', meta: si.meta, h1: si.hero.title },
  { path: '/solutions/search-presence-engineering', meta: spe.meta, h1: spe.hero.title },
  { path: '/solutions/search-impact-measurement', meta: sim.meta, h1: sim.hero.title },
  { path: '/how-it-works', meta: howItWorks.meta, h1: howItWorks.hero.title },
  { path: '/for-brands', meta: forBrands.meta, h1: forBrands.hero.title },
  { path: '/for-agencies', meta: forAgencies.meta, h1: forAgencies.hero.title },
  { path: '/about', meta: about.meta, h1: about.hero.title },
  { path: '/diagnostic', meta: diagnostic.meta, h1: diagnostic.hero.title },
  { path: '/contact', meta: contact.meta, h1: contact.hero.title },
] as const

for (const route of commercialRoutes) {
  test.describe(route.path, () => {
    test('renders the approved title, description, canonical, and H1', async ({ page }) => {
      const response = await page.goto(route.path)
      expect(response?.status()).toBe(200)

      await expect(page).toHaveTitle(route.meta.title)

      const description = page.locator('head meta[name="description"]')
      await expect(description).toHaveAttribute('content', route.meta.description)

      // Compared as a pathname so the assertion holds whatever origin the
      // environment configures.
      const canonical = await page
        .locator('head link[rel="canonical"]')
        .getAttribute('href')
      expect(new URL(canonical ?? '').pathname).toBe(route.path)

      const h1 = page.getByRole('heading', { level: 1 })
      await expect(h1).toHaveCount(1)
      await expect(h1).toHaveText(route.h1)
    })

    test('exposes one main landmark and a breadcrumb trail', async ({ page }) => {
      await page.goto(route.path)

      await expect(page.getByRole('main')).toHaveCount(1)
      await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toBeVisible()
    })

    test('has no serious or critical accessibility violations', async ({ page }) => {
      await page.goto(route.path)

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

    test('mentions The Search Economy only on /about', async ({ page }) => {
      // docs/10 §2.
      await page.goto(route.path)
      const body = page.locator('body')

      if (route.path === '/about') {
        await expect(body).toContainText('The Search Economy')
      } else {
        await expect(body).not.toContainText('Search Economy')
      }
    })

    test('routes conversion to the Diagnostic or Contact', async ({ page }) => {
      await page.goto(route.path)

      const conversionLinks = page
        .getByRole('main')
        .locator('a[href="/diagnostic"], a[href="/contact"]')
      expect(await conversionLinks.count()).toBeGreaterThan(0)
    })

    test('renders without console errors', async ({ page }) => {
      const errors: string[] = []
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text())
      })
      page.on('pageerror', (error) => errors.push(error.message))

      await page.goto(route.path)
      expect(errors).toEqual([])
    })
  })
}

test.describe('Narrow viewport integrity', () => {
  test.use({ viewport: { width: 320, height: 800 } })

  for (const route of commercialRoutes) {
    test(`${route.path} does not overflow horizontally at 320px`, async ({ page }) => {
      await page.goto(route.path)

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }))

      expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
    })
  }
})

test.describe('Wide tables', () => {
  test('keeps the evidence grade table reachable by keyboard on a narrow viewport', async ({
    page,
  }) => {
    // The table is wider than a phone, so its wrapper must be a focusable
    // scroll region rather than silently clipping rows (WCAG 2.1.1).
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/solutions/search-impact-measurement')

    const table = page.getByRole('table')
    await expect(table.first()).toBeVisible()

    const region = page.getByRole('region', { name: sim.evidenceGrades.caption })
    await expect(region).toHaveAttribute('tabindex', '0')
  })

  test('gives every table a caption', async ({ page }) => {
    await page.goto('/solutions/search-impact-measurement')

    const tables = page.getByRole('table')
    const count = await tables.count()
    expect(count).toBeGreaterThan(0)

    for (let index = 0; index < count; index += 1) {
      await expect(tables.nth(index).locator('caption')).not.toBeEmpty()
    }
  })
})

test.describe('Internal link integrity', () => {
  async function internalLinksOn(page: Page, path: string): Promise<string[]> {
    await page.goto(path)
    return page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]')].map(
        (anchor) => anchor.getAttribute('href') ?? '',
      ),
    )
  }

  test('every internal link across the built site resolves', async ({ page, request }) => {
    const hrefs = new Set<string>()

    for (const route of [{ path: '/' }, ...commercialRoutes]) {
      for (const href of await internalLinksOn(page, route.path)) {
        hrefs.add(href.split('#')[0] || '/')
      }
    }

    const broken: string[] = []
    for (const href of hrefs) {
      const status = (await request.get(href)).status()
      if (status !== 200) broken.push(`${href} → ${status}`)
    }

    expect(broken, broken.join('\n')).toEqual([])
  })
})

test.describe('Sitemap', () => {
  test('advertises exactly the built, indexable routes', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => new URL(match[1]).pathname,
    )

    const expected = indexableBuiltRoutes().map((route) => route.path)

    expect(paths.sort()).toEqual(expected.sort())
  })

  test('omits routes that are not built yet', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()

    for (const path of ['/research', '/methodology', '/results', '/privacy', '/terms']) {
      expect(xml, `sitemap advertises unbuilt ${path}`).not.toContain(`${path}</loc>`)
    }
  })
})
