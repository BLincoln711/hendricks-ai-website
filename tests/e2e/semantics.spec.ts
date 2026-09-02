import { expect, test, type Page } from '@playwright/test'

import { NOT_FOUND_PATH, sweepRoutes } from './lib/routes'

/**
 * Semantics and landmarks SM-01 to SM-08 (redesign 16 section 3) on every
 * built route and the not-found state. SM-03 (heading order) is the elevated
 * axe rule in `axe.spec.ts`; SM-06 (ordered stages as `ol`) is asserted on
 * the components that draw them in the unit suites; SM-04's "real buttons for
 * actions" rule is the source grep in `tests/unit/interactive-elements.test.ts`
 * (React never serialises `onClick`, so the DOM cannot show it) and the
 * role-without-element check below.
 */

/**
 * The footer positions of the two consistent-help controls (SM-07): Contact
 * among every footer control, and Privacy Choices within the legal row, which
 * is the list that holds the button.
 */
async function consistentHelp(page: Page) {
  return page.locator('footer').evaluate((footer) => {
    const controls = [...footer.querySelectorAll<HTMLElement>('a, button')].map((node) =>
      (node.textContent ?? '').trim(),
    )
    const legalRow = footer.querySelector('button')?.closest('ul')
    const legalItems = legalRow
      ? [...legalRow.querySelectorAll('li')].map((item) => (item.textContent ?? '').trim())
      : []
    return {
      contact: controls.indexOf('Contact'),
      privacyChoices: legalItems.indexOf('Privacy Choices'),
      legalCount: legalItems.length,
    }
  })
}

/**
 * CONTENT_VERIFICATION S2: the approved /how-it-works title closes on
 * "| How It Works" rather than the brand, and stays pending Brandon's
 * confirmation. Its uniqueness is still asserted; only the template check
 * skips it until S2 is resolved.
 */
const TITLE_TEMPLATE_PENDING = new Set(['/how-it-works'])

test.describe('SM-05 unique titles', () => {
  test('every route carries a distinct title from the "| Hendricks" template', async ({ page }) => {
    const titles = new Map<string, string>()

    for (const path of sweepRoutes) {
      await page.goto(path)
      const title = await page.title()

      if (!TITLE_TEMPLATE_PENDING.has(path)) expect(title, path).toMatch(/ \| Hendricks$/)
      expect(titles.get(title), `${path} repeats the title of ${titles.get(title)}`).toBeUndefined()
      titles.set(title, path)
    }

    expect(titles.get('Search Intelligence Engineering for the AI Era | Hendricks')).toBe('/')
  })
})

test.describe('SM-07 consistent help', () => {
  test('Contact and Privacy Choices keep their footer positions on every route', async ({ page }) => {
    await page.goto('/')
    const reference = await consistentHelp(page)
    expect(reference.contact).toBeGreaterThan(-1)
    expect(reference.privacyChoices).toBeGreaterThan(-1)

    for (const path of sweepRoutes) {
      await page.goto(path)
      expect(await consistentHelp(page), path).toEqual(reference)
    }
  })
})

for (const path of sweepRoutes) {
  test.describe(path, () => {
    test.beforeEach(async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(path === NOT_FOUND_PATH ? 404 : 200)
    })

    test('SM-01: one H1', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    })

    test('SM-02: no heading carries its eyebrow', async ({ page }) => {
      // Every eyebrow is a `p` sibling of its heading, never a descendant, and
      // the heading that follows an eyebrow does not repeat its text.
      const offenders = await page.evaluate(() => {
        const found: string[] = []
        for (const eyebrow of document.querySelectorAll<HTMLElement>('[data-eyebrow]')) {
          const text = (eyebrow.textContent ?? '').trim()
          if (eyebrow.closest('h1, h2, h3, h4, h5, h6')) {
            found.push(`eyebrow "${text}" is inside a heading`)
            continue
          }
          const heading = eyebrow.nextElementSibling
          if (heading && /^H[1-6]$/.test(heading.tagName)) {
            const headingText = (heading.textContent ?? '').trim()
            if (text.length > 0 && headingText.includes(text)) {
              found.push(`${heading.tagName} "${headingText}" repeats its eyebrow "${text}"`)
            }
          }
        }
        return found
      })

      expect(offenders, offenders.join('\n')).toEqual([])
    })

    test('SM-04: one header, one main, one footer; every nav labelled', async ({ page }) => {
      await expect(page.getByRole('banner')).toHaveCount(1)
      await expect(page.getByRole('main')).toHaveCount(1)
      await expect(page.getByRole('contentinfo')).toHaveCount(1)

      const unlabelled = await page
        .locator('nav')
        .evaluateAll((navs) =>
          navs.filter((nav) => !nav.getAttribute('aria-label') && !nav.getAttribute('aria-labelledby')).length,
        )
      expect(unlabelled).toBe(0)

      // Real buttons for actions, real links for navigation: no element
      // borrows the button or link role, and nothing joins the tab order by
      // `tabindex` unless it is a native control or a labelled scroll region.
      const borrowed = await page.evaluate(() => {
        const native = 'a, button, input, select, textarea, summary'
        const offenders: string[] = []
        for (const node of document.querySelectorAll<HTMLElement>('[role="button"], [role="link"]')) {
          if (!node.matches(native)) offenders.push(`<${node.tagName.toLowerCase()} role="${node.getAttribute('role')}">`)
        }
        for (const node of document.querySelectorAll<HTMLElement>('[tabindex]')) {
          const tabIndex = Number(node.getAttribute('tabindex'))
          if (tabIndex < 0 || node.matches(native)) continue
          if (node.getAttribute('role') === 'region' && node.getAttribute('aria-label')) continue
          offenders.push(`<${node.tagName.toLowerCase()} tabindex="${tabIndex}">`)
        }
        return offenders
      })
      expect(borrowed, borrowed.join('\n')).toEqual([])
    })

    test('SM-08: every table is captioned, scoped and inside a labelled scroll region', async ({ page }) => {
      const tables = await page.locator('table').evaluateAll((nodes) =>
        nodes.map((table) => {
          const caption = table.querySelector('caption')?.textContent?.trim() ?? ''
          const region = table.closest<HTMLElement>('[role="region"]')
          const hint = region?.parentElement?.querySelector('p[aria-hidden="true"]')
          return {
            caption,
            regionLabel: region?.getAttribute('aria-label') ?? null,
            regionTabIndex: region?.getAttribute('tabindex') ?? null,
            unscopedHeaders: [...table.querySelectorAll('th')].filter((th) => !th.getAttribute('scope')).length,
            hint: Boolean(hint),
          }
        }),
      )

      for (const table of tables) {
        expect(table.caption, 'caption').not.toBe('')
        expect(table.regionLabel, 'region named by the caption').toBe(table.caption)
        expect(table.regionTabIndex, 'region reachable by keyboard').toBe('0')
        expect(table.unscopedHeaders, 'th scope').toBe(0)
        expect(table.hint, 'scroll hint').toBe(true)
      }
    })
  })
}
