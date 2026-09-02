import { expect, test, type Page } from '@playwright/test'

import { routes } from '@/config/routes'
import { banner } from '@/content/consent'

/**
 * Layout at the three narrow viewports (redesign 16 MG-03, TY-03, KF-07,
 * KF-09) on every built route: no horizontal overflow, and the consent sheet
 * at its reduced footprint with every decision button fully visible before the
 * visitor scrolls anything.
 *
 * The sheet body is the approved four-sentence banner. The two-sentence
 * variant in 16 decision 1 ships only after counsel amends legal/01 section 9;
 * when it lands, this file runs the sheet assertions once per body.
 */

const VIEWPORTS = [
  { width: 320, height: 568 },
  { width: 320, height: 800 },
  { width: 390, height: 844 },
]

/** `--consent-sheet-max`: `min(360px, 40vh)` below 1024 px. */
const sheetCap = (height: number) => Math.min(360, height * 0.4)

const TARGET = 44

const builtRoutes = Object.values(routes)
  .filter((route) => route.built)
  .map((route) => route.path)

const sheet = (page: Page) => page.getByRole('region', { name: banner.title })

/** Waits for the sheet's entry transition (11 section 4) before geometry is read. */
function settled(page: Page) {
  return page.waitForFunction(() =>
    document.getAnimations().every((animation) => animation.playState !== 'running'),
  )
}

async function assertNoHorizontalOverflow(page: Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }))
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
}

async function assertSheetFootprint(page: Page, viewport: { width: number; height: number }) {
  const region = sheet(page)
  await expect(region).toBeVisible()
  await settled(page)

  const sheetBox = (await region.boundingBox())!
  expect(sheetBox.height).toBeLessThanOrEqual(sheetCap(viewport.height) + 0.5)
  expect(sheetBox.y + sheetBox.height).toBeLessThanOrEqual(viewport.height + 0.5)

  // The body is the only scrolling part, and it has not been scrolled.
  const scrollTops = await region.evaluate((node) =>
    [...node.querySelectorAll<HTMLElement>('*')]
      .filter((child) => getComputedStyle(child).overflowY === 'auto')
      .map((child) => child.scrollTop),
  )
  expect(scrollTops.every((top) => top === 0)).toBe(true)

  for (const name of [banner.reject, banner.manage, banner.accept]) {
    const button = region.getByRole('button', { name })
    await expect(button).toBeVisible()
    const box = (await button.boundingBox())!

    expect(box.height, `${name} height`).toBeGreaterThanOrEqual(TARGET)
    expect(box.width, `${name} width`).toBeGreaterThanOrEqual(TARGET)
    expect(box.y, `${name} top inside the viewport`).toBeGreaterThanOrEqual(0)
    expect(box.y + box.height, `${name} bottom inside the viewport`).toBeLessThanOrEqual(
      viewport.height + 0.5,
    )
    expect(box.y, `${name} top inside the sheet`).toBeGreaterThanOrEqual(sheetBox.y - 0.5)
    expect(box.y + box.height, `${name} bottom inside the sheet`).toBeLessThanOrEqual(
      sheetBox.y + sheetBox.height + 0.5,
    )
  }
}

for (const viewport of VIEWPORTS) {
  test.describe(`${viewport.width} by ${viewport.height}`, () => {
    test.use({ viewport })

    for (const path of builtRoutes) {
      test(`${path} fits the viewport with every consent button visible`, async ({ page }) => {
        await page.goto(path)

        await assertNoHorizontalOverflow(page)
        await assertSheetFootprint(page, viewport)
      })
    }

    test('/ keeps the H1 and the locked CTA visible once the sheet is dismissed', async ({
      page,
    }) => {
      await page.goto('/')
      await sheet(page).getByRole('button', { name: banner.reject }).click()
      await expect(sheet(page)).toBeHidden()

      const h1 = page.getByRole('heading', { level: 1 })
      await expect(h1).toBeVisible()
      await expect(h1).toBeInViewport()
      await expect(
        page.getByRole('link', { name: 'Start with a Search Intelligence Diagnostic' }).first(),
      ).toBeVisible()

      await assertNoHorizontalOverflow(page)
    })

    test('the mobile sheet fits the viewport with no horizontal overflow', async ({ page }) => {
      await page.goto('/')
      await page.getByRole('button', { name: 'Open menu' }).click()

      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
      await page.getByRole('button', { name: 'Show the four solutions' }).click()
      await expect(dialog.getByRole('link', { name: 'Search Impact Measurement' })).toBeVisible()

      const box = (await dialog.boundingBox())!
      expect(box.width).toBeLessThanOrEqual(viewport.width + 0.5)
      await assertNoHorizontalOverflow(page)
    })
  })
}
