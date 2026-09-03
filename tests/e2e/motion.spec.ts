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
 * so no element inside the plate may move at any point of a whole cycle, at
 * any width.
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
 * The island's holds, and the whole cycle they add up to: three questions,
 * each shown at rest and then under its intervention. Nine seconds, which is
 * what this file used to wait, reaches only the first intervention, and that
 * is the one step of the cycle where nothing about the frame changes size.
 * A shift gate that never sees the other five frames is not a gate.
 */
const HOLD_SCENARIO_MS = 2200
const HOLD_INTERVENTION_MS = 2600
const CYCLE_MS = 3 * (SEQUENCE_MS + HOLD_SCENARIO_MS + SEQUENCE_MS + HOLD_INTERVENTION_MS)

/** Every frame the cycle passes through, as `scenario:intervention`. */
const FRAMES = ['q1:off', 'q1:on', 'q2:off', 'q2:on', 'q3:off', 'q3:on']

/**
 * The widths the shift gate runs at. 320 is the one that mattered: the
 * question line wraps to three lines there, so a reserved slot that is right
 * at 1440 can be short by half a question at 320 and move the whole figure
 * every time the cycle steps.
 */
const SHIFT_WIDTHS = [1440, 390, 320]

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

/**
 * The residual the metric still reports after nothing in the plate moves.
 *
 * Question 3 draws its rows in a different order, so two label cells trade
 * words when the cycle reaches it and again when it leaves. No box moves, but
 * a word that changes changes the ink box of its own text node, and Chrome
 * attributes that to the layout-shift entry. It is 0.00011 at its worst,
 * three orders of magnitude under the 0.1 the AGENTS.md target allows, and it
 * is the drawing relabelling itself, which is the instrument working. The
 * assertion that actually holds the line is the one below it: no element
 * inside the plate moves at all.
 */
const SHIFT_BUDGET = 0.001

test('MO-02, the plate shifts nothing through a whole cycle', async ({ page }) => {
  // A whole cycle is 22.8 s, and it is driven by the clock rather than by
  // clicks on purpose: a shift within half a second of an interaction carries
  // `hadRecentInput` and is dropped from the score, so stepping the frames
  // from the controls would hide exactly the shifts this test exists to catch.
  test.setTimeout(SHIFT_WIDTHS.length * (CYCLE_MS + 20_000))

  const supported = await page.evaluate(
    () => PerformanceObserver.supportedEntryTypes?.includes('layout-shift') ?? false,
  )
  test.skip(!supported, 'The Layout Instability API is Chromium only')

  for (const width of SHIFT_WIDTHS) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(ROUTE)

    // Scores only what happens inside the plate, so a shift elsewhere on the
    // fixture cannot pass or fail this, and records every frame the cycle
    // actually reached so a short window cannot pass by never getting there.
    //
    // The plate is looked up per callback rather than captured once: the
    // island replaces the figure when it hydrates, and a held reference would
    // point at a detached node and quietly score nothing at all.
    await page.evaluate(() => {
      const plate = () => document.querySelector<HTMLElement>('#plate-01')
      const frames = new Set<string>()
      const record = () => {
        const figure = plate()
        if (figure) frames.add(`${figure.dataset.scenario}:${figure.dataset.intervention}`)
      }
      record()

      Object.assign(window, { __shift: 0, __frames: frames, __moved: [] as string[] })
      new MutationObserver(record).observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ['data-scenario', 'data-intervention'],
      })
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as (PerformanceEntry & {
          value: number
          hadRecentInput: boolean
          sources?: { node?: Node }[]
        })[]) {
          if (entry.hadRecentInput) continue
          const inside = (entry.sources ?? []).filter((source) => source.node && plate()?.contains(source.node))
          if (inside.length === 0) continue

          const scored = window as unknown as { __shift: number; __moved: string[] }
          scored.__shift += entry.value
          for (const source of inside) {
            const node = source.node!
            if (node.nodeType === Node.ELEMENT_NODE) {
              scored.__moved.push(`${(node as Element).tagName}.${(node as Element).className}`)
            }
          }
        }
      }).observe({ type: 'layout-shift', buffered: true })
    })

    await page.waitForTimeout(CYCLE_MS + 1500)

    const result = await page.evaluate(() => {
      const scored = window as unknown as { __shift: number; __moved: string[]; __frames: Set<string> }
      return { shift: scored.__shift, moved: [...new Set(scored.__moved)], frames: [...scored.__frames].sort() }
    })

    expect(result.frames, `frames reached at ${width}`).toEqual(FRAMES)
    expect(result.moved, `elements that moved inside the plate at ${width}`).toEqual([])
    expect(result.shift, `layout shift inside the plate at ${width}`).toBeLessThan(SHIFT_BUDGET)
  }
})
