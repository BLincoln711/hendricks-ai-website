import { expect, test, type Page } from '@playwright/test'

/**
 * The motion rules on the one figure that moves (redesign 16 MO-01 to MO-05,
 * VZ-09).
 *
 * Two claims are load bearing. Under reduced motion no animation is created at
 * all, which is stronger than one created and collapsed to a near-zero
 * duration, and is asserted with a spy on `Element.prototype.animate` rather
 * than by counting animations afterwards. And the plate never shifts: a figure
 * that reflows while it plays is a figure that moves the page under a reader,
 * so the layout-shift score across a whole cycle has to be zero.
 */

const ROUTE = '/plate-fixtures'
/**
 * The island's own sequence budget. Recorded conflict: 16 MO-02 asks for a
 * final state within 1000 ms of a trigger, and the approved canvas staggers
 * nine stages at 120 ms, so a full run lands at about 1.4 s. The canvas wins;
 * the plate carries a pause control throughout, which is what MO-04 requires
 * of a run of this length.
 */
const SEQUENCE_MS = 1400

/**
 * The finished-or-zero-duration predicate, over the instrument's own subtree.
 * A strict count of zero is flaky by construction, and a document-wide count
 * would also be answering for the consent sheet and the shell.
 */
const SETTLED = () =>
  (document.querySelector('#plate-01')?.getAnimations({ subtree: true }) ?? []).every(
    (animation) =>
      animation.playState === 'finished' || (animation.effect?.getComputedTiming().activeDuration ?? 0) === 0,
  )

/** Counts every `animate()` call from the first byte, before any script of ours runs. */
async function spyOnAnimate(page: Page) {
  await page.addInitScript(() => {
    const original = Element.prototype.animate
    Object.assign(window, { __animateCalls: 0 })
    Element.prototype.animate = function patched(...args: Parameters<Element['animate']>) {
      ;(window as unknown as { __animateCalls: number }).__animateCalls += 1
      return original.apply(this, args)
    }
  })
}

const animateCalls = (page: Page) => page.evaluate(() => (window as unknown as { __animateCalls: number }).__animateCalls)

test.describe('MO-01, reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })

  test('creates no animation, hides the pause control, and rests at the final state', async ({ page }) => {
    await spyOnAnimate(page)
    await page.goto(ROUTE)
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'reduce')

    await page.waitForTimeout(2000)
    expect(await animateCalls(page)).toBe(0)
    expect(await page.evaluate(SETTLED)).toBe(true)

    // Nothing plays, so the control that would pause it has nothing to pause.
    await expect(page.locator('.kbtn-cycle')).toBeHidden()
    await expect(page.locator('#plate-01')).toHaveAttribute('data-scenario', 'q1')
  })

  test('renders a chosen scenario immediately, and still announces it', async ({ page }) => {
    await spyOnAnimate(page)
    await page.goto(ROUTE)
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'reduce')

    await page.getByRole('radio', { name: /^Question 2/ }).check()
    await expect(page.locator('#plate-01')).toHaveAttribute('data-scenario', 'q2')
    await expect(page.locator('#plate-01 .live')).toHaveText(/Question 2 of 3\./)

    expect(await animateCalls(page)).toBe(0)
    expect(await page.evaluate(SETTLED)).toBe(true)
  })
})

test.describe('MO-03, the final state is the served state', () => {
  test('nothing is animating at load', async ({ page }) => {
    await spyOnAnimate(page)
    await page.goto(ROUTE)
    // The frame on arrival is the one the server sent, and it is never drawn
    // in: motion that plays itself at load is decoration, not argument.
    await page.waitForTimeout(100)
    expect(await animateCalls(page)).toBe(0)
    expect(await page.evaluate(SETTLED)).toBe(true)
  })

  test('every mark is present before any animation runs', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto(ROUTE)

    const marks = await page
      .locator('#plate-01 .drawing-desktop svg.dts [data-n], #plate-01 .drawing-desktop svg.dts [data-seq]')
      .count()
    expect(marks).toBeGreaterThan(30)
    await context.close()
  })
})

test.describe('MO-02 and MO-04, the cycle', () => {
  test('plays, settles inside its sequence budget, and pauses on request', async ({ page }) => {
    await page.goto(ROUTE)
    const control = page.locator('.kbtn-cycle')
    await expect(control).toHaveText('Pause')
    await expect(control).toHaveAttribute('aria-label', 'Pause the automatic cycle')

    // The first step is the intervention. Once it lands, the staggered draw
    // reaches its final state inside the sequence budget the island holds a
    // frame for, so a frame is never replaced while it is still arriving.
    await expect(page.locator('#plate-01')).toHaveAttribute('data-intervention', 'on', { timeout: 6000 })
    await page.waitForFunction(SETTLED, undefined, { timeout: SEQUENCE_MS })

    await control.click()
    await expect(control).toHaveText('Play')
    const frame = await page.locator('#plate-01').getAttribute('data-scenario')
    await page.waitForTimeout(5000)
    // A paused cycle stays paused. It does not resume behind the visitor.
    await expect(page.locator('#plate-01')).toHaveAttribute('data-scenario', frame!)
  })

  test('hands over for good on any deliberate interaction', async ({ page }) => {
    await page.goto(ROUTE)
    await page.getByRole('radio', { name: /^Question 3/ }).check()

    await expect(page.locator('.kbtn-cycle')).toHaveText('Play')
    await page.waitForTimeout(5000)
    await expect(page.locator('#plate-01')).toHaveAttribute('data-scenario', 'q3')
  })
})

test('MO-02, the plate shifts nothing through a whole cycle', async ({ page }) => {
  await page.goto(ROUTE)

  // Scores only the shifts inside the plate, so a shift elsewhere on the
  // fixture cannot pass or fail this.
  await page.evaluate(() => {
    Object.assign(window, { __shift: 0 })
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & {
        value: number
        hadRecentInput: boolean
        sources?: { node?: Node }[]
      })[]) {
        if (entry.hadRecentInput) continue
        const inPlate = entry.sources?.some((source) => source.node && document.querySelector('#plate-01')?.contains(source.node))
        if (inPlate) (window as unknown as { __shift: number }).__shift += entry.value
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })

  // Long enough for two scenario changes and two intervention steps.
  await page.waitForTimeout(9000)
  expect(await page.evaluate(() => (window as unknown as { __shift: number }).__shift)).toBe(0)
})
