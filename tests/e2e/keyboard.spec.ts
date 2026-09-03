import { expect, test, type Locator, type Page } from '@playwright/test'

import { headerCtaHref } from '@/config/navigation'
import { banner, preferences } from '@/content/consent'

/**
 * Keyboard and focus requirements KF-01 to KF-10 (redesign 16 section 2),
 * measured on the shell: skip link, header, Solutions disclosure, footer,
 * consent sheet and preferences dialog. Everything inside `main` belongs to the
 * page rebuilds and is measured by their own specs. The KF-04 modal inventory
 * is a source check and lives in `tests/unit/modal-inventory.test.ts`.
 */

/**
 * `--focus` is `--hx-cyan-500` on the canvas ground and stays that value inside
 * `.on-plate`, because the canvas has one ground. The ring is 2 px at a 3 px
 * offset, from the `:focus-visible` rule in globals.css.
 */
const FOCUS_RING = 'rgb(0, 194, 216)'
const FOCUS_RING_WIDTH = '2px'
const FOCUS_RING_OFFSET = '3px'

/** The site target rule: 44 by 44 CSS px at every width (KF-09). */
const TARGET = 44

const sheet = (page: Page) => page.getByRole('region', { name: banner.title })

async function box(locator: Locator) {
  const rect = await locator.boundingBox()
  expect(rect, 'element has no box').not.toBeNull()
  return rect!
}

/**
 * Every visible link and button inside `root`, with its box. A link inside a
 * paragraph is running copy and exempt under the 2.5.8 inline exception; the
 * consent body's Privacy Notice link is the one the shell carries.
 */
function controlBoxes(root: Locator) {
  return root.locator('a, button').evaluateAll((nodes) =>
    nodes
      .filter((node) => node.getClientRects().length > 0 && !node.closest('p'))
      .map((node) => {
        const rect = node.getBoundingClientRect()
        return {
          name: (node.getAttribute('aria-label') ?? node.textContent ?? '').trim(),
          width: rect.width,
          height: rect.height,
        }
      }),
  )
}

function undersized(boxes: Array<{ name: string; width: number; height: number }>) {
  return boxes.filter((item) => item.width < TARGET - 0.5 || item.height < TARGET - 0.5)
}

test.describe('KF-01 skip link', () => {
  for (const route of ['/', '/diagnostic', '/privacy', '/no-such-route']) {
    test(`${route}: first tab stop targets main`, async ({ page }) => {
      await page.goto(route)

      // Nothing steals focus on load (KF-02).
      expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('BODY')

      await page.keyboard.press('Tab')
      const skipLink = page.getByRole('link', { name: 'Skip to main content' })
      await expect(skipLink).toBeFocused()
      await expect(skipLink).toBeVisible()

      await page.keyboard.press('Enter')
      await expect(page.locator('main#main')).toBeFocused()
      await expect(page.locator('main#main')).toHaveAttribute('tabindex', '-1')
    })
  }
})

test.describe('KF-02 document order', () => {
  test('skip link, header, main, live region, footer, then the consent sheet', async ({ page }) => {
    await page.goto('/')
    await expect(sheet(page)).toBeVisible()
    const sheetTitleId = await sheet(page).getAttribute('aria-labelledby')

    const order = await page.evaluate((titleId) => {
      const nodes = [
        document.querySelector('a[href="#main"]'),
        document.querySelector('header'),
        document.querySelector('main'),
        document.querySelector('[role="status"]'),
        document.querySelector('footer'),
        document.querySelector(`section[aria-labelledby="${titleId}"]`),
      ]
      return nodes.map((node, index) => {
        const next = nodes[index + 1]
        if (!node) return 'missing'
        if (!next) return 'end'
        return node.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING
          ? 'before'
          : 'after'
      })
    }, sheetTitleId)

    expect(order).toEqual(['before', 'before', 'before', 'before', 'before', 'end'])
  })

  test('the tab sequence runs skip link, wordmark, primary navigation, header button', async ({
    page,
  }) => {
    await page.goto('/')

    const expected = [
      'Skip to main content',
      'Hendricks, home',
      'Solutions',
      'Show the four solutions',
      // Focus inside the group opens the panel, so its four links join the sequence.
      'Search Demand Intelligence',
      'Selection Intelligence',
      'Search Presence Engineering',
      'Search Impact Measurement',
      'How It Works',
      'For Brands',
      'For Agencies',
      'Research',
      'About',
      'Start with a Diagnostic',
    ]

    for (const name of expected) {
      await page.keyboard.press('Tab')
      const active = await page.evaluate(() => {
        const node = document.activeElement
        return (node?.getAttribute('aria-label') ?? node?.textContent ?? '').trim()
      })
      expect(active).toBe(name)
    }
  })
})

test.describe('KF-03 consent sheet', () => {
  test('is a labelled region with three real buttons of one variant and height', async ({
    page,
  }) => {
    await page.goto('/')
    const region = sheet(page)
    await expect(region).toBeVisible()

    const buttons = region.getByRole('button')
    await expect(buttons).toHaveText([banner.reject, banner.manage, banner.accept])

    const styles = await buttons.evaluateAll((nodes) =>
      nodes.map((node) => {
        const style = getComputedStyle(node)
        return {
          tag: node.tagName,
          height: node.getBoundingClientRect().height,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          background: style.backgroundColor,
          color: style.color,
          border: style.borderColor,
        }
      }),
    )

    expect(styles.map((style) => style.tag)).toEqual(['BUTTON', 'BUTTON', 'BUTTON'])
    expect(new Set(styles.map((style) => style.height)).size).toBe(1)
    expect(new Set(styles.map((style) => style.fontSize)).size).toBe(1)
    const variants = styles.map(({ fontSize, fontWeight, background, color, border }) =>
      JSON.stringify({ fontSize, fontWeight, background, color, border }),
    )
    expect(new Set(variants).size).toBe(1)
    expect(styles[0].height).toBeGreaterThanOrEqual(TARGET)
  })

  test('tabs Reject, Manage, Accept in that order and opens the dialog from a button', async ({
    page,
  }) => {
    await page.goto('/')
    const region = sheet(page)

    await region.getByRole('button', { name: banner.reject }).focus()
    await page.keyboard.press('Tab')
    await expect(region.getByRole('button', { name: banner.manage })).toBeFocused()
    await expect(region.getByRole('button', { name: banner.manage })).toHaveAttribute(
      'aria-haspopup',
      'dialog',
    )
    await page.keyboard.press('Tab')
    await expect(region.getByRole('button', { name: banner.accept })).toBeFocused()

    await expect(region.getByRole('link', { name: banner.manage })).toHaveCount(0)
  })

  test('Escape on the dialog records nothing and returns focus to Manage choices', async ({
    page,
  }) => {
    await page.goto('/')
    const manage = sheet(page).getByRole('button', { name: banner.manage })
    await manage.click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toBeHidden()
    await expect(manage).toBeFocused()
    await expect(sheet(page)).toBeVisible()
    expect(await page.evaluate(() => window.localStorage.length)).toBe(0)
  })
})

test.describe('KF-05 and KF-06 focus ring', () => {
  test('is Insight Cyan on the ground and inside .on-plate, and set at rest', async ({
    page,
  }) => {
    await page.goto('/')

    // The resting outline colour is the ring colour on every element, so the
    // ring never fades in from currentColor (KF-06).
    const resting = await page
      .getByRole('link', { name: 'Hendricks, home' })
      .evaluate((node) => getComputedStyle(node).outlineColor)
    expect(resting).toBe(FOCUS_RING)

    await page.keyboard.press('Tab')
    const focused = await page
      .getByRole('link', { name: 'Skip to main content' })
      .evaluate((node) => {
        const style = getComputedStyle(node)
        return {
          color: style.outlineColor,
          style: style.outlineStyle,
          width: style.outlineWidth,
          offset: style.outlineOffset,
        }
      })
    expect(focused).toEqual({
      color: FOCUS_RING,
      style: 'solid',
      width: FOCUS_RING_WIDTH,
      offset: FOCUS_RING_OFFSET,
    })

    // A control inside a plate reads the same ring through one token, no
    // variant: the canvas has one ground, so the re-scope changes nothing today
    // and this is what proves it.
    const plate = await page.evaluate(() => {
      const wrapper = document.createElement('div')
      wrapper.className = 'on-plate'
      const button = document.createElement('button')
      button.type = 'button'
      button.textContent = 'probe'
      wrapper.append(button)
      document.querySelector('main')?.append(wrapper)
      return getComputedStyle(button).outlineColor
    })
    expect(plate).toBe(FOCUS_RING)
  })
})

test.describe('KF-07 focus not obscured', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('every focusable element in main lands between the header and the open sheet', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(sheet(page)).toBeVisible()

    const count = await page
      .locator('main')
      .locator('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex="0"]')
      .count()
    expect(count).toBeGreaterThan(0)

    const sheetTitleId = await sheet(page).getAttribute('aria-labelledby')
    const failures = await page.evaluate((titleId) => {
      const header = document.querySelector('header')!.getBoundingClientRect()
      const sheetRect = document
        .querySelector(`section[aria-labelledby="${titleId}"]`)!
        .getBoundingClientRect()
      const focusables = document
        .querySelector('main')!
        .querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex="0"]',
        )
      const problems: string[] = []

      for (const node of focusables) {
        if (node.getClientRects().length === 0) continue
        node.focus()
        const rect = node.getBoundingClientRect()
        const label = (node.getAttribute('aria-label') ?? node.textContent ?? '').trim().slice(0, 40)
        if (rect.top < header.bottom) problems.push(`${label}: under the header (${rect.top})`)
        if (rect.bottom > sheetRect.top) problems.push(`${label}: under the sheet (${rect.bottom})`)
      }
      return problems
    }, sheetTitleId)

    expect(failures, failures.join('\n')).toEqual([])
  })
})

test.describe('KF-08 Solutions disclosure', () => {
  test('opens from the chevron, closes on Escape without moving focus', async ({ page }) => {
    await page.goto('/')

    const trigger = page.getByRole('button', { name: 'Show the four solutions' })
    const panelId = await trigger.getAttribute('aria-controls')
    const panel = page.locator(`#${panelId}`)

    await expect(box(trigger)).resolves.toMatchObject({ width: TARGET, height: TARGET })

    // Focus lands with the keyboard, which also opens the panel on focus.
    await trigger.focus()
    await expect(trigger).toBeFocused()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(panel).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(panel).toBeHidden()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await expect(trigger).toBeFocused()

    // A press reopens it after a dismissal.
    await page.keyboard.press('Enter')
    await expect(panel).toBeVisible()
    await expect(panel.getByRole('link')).toHaveCount(4)
  })

  test('Escape from a panel link returns focus to the chevron', async ({ page }) => {
    await page.goto('/')

    const trigger = page.getByRole('button', { name: 'Show the four solutions' })
    const panel = page.locator(`#${await trigger.getAttribute('aria-controls')}`)

    await trigger.focus()
    await panel.getByRole('link', { name: 'Search Impact Measurement' }).focus()
    await expect(panel.getByRole('link', { name: 'Search Impact Measurement' })).toBeFocused()

    // Hiding the panel would otherwise drop focus to body (2.4.3).
    await page.keyboard.press('Escape')
    await expect(panel).toBeHidden()
    await expect(trigger).toBeFocused()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  test('is hoverable and persistent under the pointer', async ({ page }) => {
    await page.goto('/')
    // Dismiss the sheet so the pointer path below is unobstructed.
    await sheet(page).getByRole('button', { name: banner.reject }).click()

    const link = page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', {
      name: 'Solutions',
      exact: true,
    })
    const trigger = page.getByRole('button', { name: 'Show the four solutions' })
    const panel = page.locator(`#${await trigger.getAttribute('aria-controls')}`)

    await link.hover()
    await expect(panel).toBeVisible()

    // Travel from the trigger onto the panel: the last item is the farthest.
    await panel.getByRole('link', { name: 'Search Impact Measurement' }).hover()
    await expect(panel).toBeVisible()

    await page.waitForTimeout(5000)
    await expect(panel).toBeVisible()

    await page.mouse.move(10, 600)
    await expect(panel).toBeHidden()
  })

  test('closes when focus leaves the group', async ({ page }) => {
    await page.goto('/')

    const trigger = page.getByRole('button', { name: 'Show the four solutions' })
    const panel = page.locator(`#${await trigger.getAttribute('aria-controls')}`)

    await trigger.focus()
    await expect(panel).toBeVisible()

    // Through the four panel links and out to How It Works.
    for (let step = 0; step < 5; step += 1) await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'How It Works' }).first()).toBeFocused()
    await expect(panel).toBeHidden()
  })
})

test.describe('KF-09 target size', () => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
  ]) {
    test(`shell controls are at least 44 px at ${viewport.width}`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto('/')

      const header = await controlBoxes(page.locator('header'))
      const footer = await controlBoxes(page.locator('footer'))
      const consent = await controlBoxes(sheet(page))

      expect(header.length + footer.length + consent.length).toBeGreaterThan(20)
      expect(undersized([...header, ...footer, ...consent])).toEqual([])

      if (viewport.width < 1024) {
        await page.getByRole('button', { name: 'Open menu' }).click()
        const dialog = page.getByRole('dialog')
        await page.getByRole('button', { name: 'Show the four solutions' }).click()
        expect(undersized(await controlBoxes(dialog))).toEqual([])
        await page.keyboard.press('Escape')
      }

      await sheet(page).getByRole('button', { name: banner.manage }).click()
      const dialog = page.getByRole('dialog', { name: preferences.title })
      await expect(dialog).toBeVisible()
      expect(undersized(await controlBoxes(dialog))).toEqual([])
    })
  }
})

test.describe('DX-05 header button on /diagnostic', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('targets an anchor that exists and lands clear of the header with the sheet open', async ({
    page,
  }) => {
    await page.goto('/diagnostic')
    await expect(sheet(page)).toBeVisible()

    const href = headerCtaHref('/diagnostic')
    expect(href.startsWith('#')).toBe(true)

    const button = page.locator('header').getByRole('link', { name: 'Start with a Diagnostic' })
    await expect(button).toHaveAttribute('href', href)

    const target = page.locator(href)
    await expect(target).toHaveCount(1)
    await expect(target).toHaveAttribute('tabindex', '-1')

    // The sheet's button carries the same destination (09 5.2).
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(
      page.getByRole('dialog').getByRole('link', { name: 'Start with a Diagnostic' }),
    ).toHaveAttribute('href', href)
    await page.keyboard.press('Escape')

    await button.click()
    await expect(target).toBeFocused()

    // KF-07: the jump inherits the header offset from `scroll-padding-top`, so
    // the focused target starts below the sticky header, not under it.
    const gap = await target.evaluate((node) => {
      const header = document.querySelector('header')!.getBoundingClientRect()
      return node.getBoundingClientRect().top - header.bottom
    })
    expect(gap).toBeGreaterThan(0)
  })
})

test.describe('KF-10 aria-current', () => {
  const routes = [
    { path: '/about', header: 'About', footer: 'About' },
    { path: '/research', header: 'Research', footer: 'Research Hub' },
    { path: '/solutions/selection-intelligence', header: 'Solutions', footer: 'Selection Intelligence' },
    { path: '/for-agencies', header: 'For Agencies', footer: 'For Agencies' },
  ]

  for (const route of routes) {
    test(`${route.path} marks its link in the header and footer`, async ({ page }) => {
      await page.goto(route.path)

      const header = page.locator('header')
      await expect(header.getByRole('link', { name: route.header, exact: true })).toHaveAttribute(
        'aria-current',
        'page',
      )
      await expect(header.locator('a[aria-current="page"]:visible')).toHaveCount(1)

      const footer = page.locator('footer')
      await expect(footer.getByRole('link', { name: route.footer, exact: true })).toHaveAttribute(
        'aria-current',
        'page',
      )
      await expect(footer.locator('a[aria-current="page"]')).toHaveCount(1)
    })
  }

  test('marks the current page in the mobile sheet', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/about')

    await page.getByRole('button', { name: 'Open menu' }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog.getByRole('link', { name: 'About', exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    )
    await expect(dialog.locator('a[aria-current="page"]')).toHaveCount(1)
  })
})
