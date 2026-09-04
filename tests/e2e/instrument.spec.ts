import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Locator, type Page } from '@playwright/test'

/**
 * Plate 01 in the browser (redesign 16 VZ-02, VZ-03, VZ-08 to VZ-12).
 *
 * The centrepiece is VZ-12, the label-collision gate: at every tested width no
 * two labels overlap and no label overlaps a mark. A drawing whose words sit on
 * top of each other is not a hard failure anywhere in the build, which is
 * exactly why it needs a test rather than a look.
 *
 * Every case pauses the automatic cycle first. A moving figure cannot be
 * measured, and pausing is also the interaction the gate is asserting works.
 */

const ROUTE = '/plate-fixtures'
const WIDTHS = [1440, 1280, 1024, 320]
/** Overlaps below this are shared subpixel edges, not collisions. */
const TOLERANCE = 0.5

type Box = { x: number; y: number; width: number; height: number; label: string }
type Point = { x: number; y: number }

const plate = (page: Page) => page.locator('#plate-01')

/** Loads the fixture with the cycle stopped, so geometry is stable and repeatable. */
async function openPaused(page: Page, width: number) {
  await page.setViewportSize({ width, height: 900 })
  await page.goto(ROUTE)
  await page.locator('.kbtn-cycle').click()
  await expect(page.locator('.kbtn-cycle')).toHaveText('Play')
  await page.waitForFunction(() =>
    document.getAnimations().every((animation) => animation.playState === 'finished'),
  )
}

/**
 * The geometry VZ-12 compares, from the variant actually on screen at this
 * width. Labels are boxes. Marks are sampled along their length and mapped
 * through the screen transform rather than taken as bounding boxes, because a
 * fan curve's bounding box covers a large empty rectangle that its stroke
 * never enters, and comparing against it would fail every label beside it.
 *
 * The one permitted overlap is the vertical drawing's stage band, which is a
 * knockout: it paints the page ground behind itself and punches a hole in the
 * track it crosses. It is still checked against every other label.
 */
async function geometryOf(page: Page): Promise<{ labels: Box[]; knockouts: Box[]; marks: Point[] }> {
  return page.evaluate(() => {
    const shown = [...document.querySelectorAll('#plate-01 .drawing')].find(
      (element) => getComputedStyle(element).display !== 'none',
    )!

    const box = (element: Element, label: string) => {
      const { x, y, width, height } = element.getBoundingClientRect()
      return { x, y, width, height, label }
    }

    const all = [...shown.querySelectorAll('.lb')].filter((element) => element.textContent!.trim().length > 0)
    const labels = all.filter((element) => !element.classList.contains('lb-band')).map((element) => box(element, element.textContent!.trim()))
    const knockouts = all.filter((element) => element.classList.contains('lb-band')).map((element) => box(element, element.textContent!.trim()))

    const marks: { x: number; y: number }[] = []
    const drawn = shown.querySelectorAll<SVGGeometryElement>('svg.dts [data-n], svg.dts [data-seq]')
    for (const element of drawn) {
      // A group carries the attribute; its children carry the geometry.
      const parts = element.tagName === 'g' ? [...element.children] : [element]
      for (const part of parts as SVGGeometryElement[]) {
        const matrix = part.getScreenCTM()
        if (!matrix || typeof part.getTotalLength !== 'function') continue
        const length = part.getTotalLength()
        const steps = Math.max(8, Math.ceil(length / 3))
        for (let step = 0; step <= steps; step += 1) {
          const point = part.getPointAtLength((length * step) / steps)
          const screen = new DOMPoint(point.x, point.y).matrixTransform(matrix)
          marks.push({ x: screen.x, y: screen.y })
        }
      }
    }

    return { labels, knockouts, marks }
  })
}

function overlap(a: Box, b: Box): boolean {
  return (
    a.x < b.x + b.width - TOLERANCE &&
    b.x < a.x + a.width - TOLERANCE &&
    a.y < b.y + b.height - TOLERANCE &&
    b.y < a.y + a.height - TOLERANCE
  )
}

function contains(box: Box, point: Point): boolean {
  return (
    point.x > box.x + TOLERANCE &&
    point.x < box.x + box.width - TOLERANCE &&
    point.y > box.y + TOLERANCE &&
    point.y < box.y + box.height - TOLERANCE
  )
}

/** Every pair of labels that share space, named so a failure says which words collided. */
function labelCollisions(labels: Box[]): string[] {
  const found: string[] = []
  labels.forEach((label, index) => {
    labels.slice(index + 1).forEach((other) => {
      if (overlap(label, other)) found.push(`"${label.label}" over "${other.label}"`)
    })
  })
  return found
}

/**
 * A canonical serialisation of an element: tag, attributes in name order with
 * inline styles read through the CSSOM, and text. Attribute order, React's
 * text separators and CSS shorthand spelling are serialisation detail, so
 * comparing raw `outerHTML` would fail on differences no reader can see;
 * everything a reader or a crawler does see is compared here.
 */
const NORMALIZE = (root: Element): string => {
  const write = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent!.replace(/\s+/g, ' ')
    if (node.nodeType !== Node.ELEMENT_NODE) return ''
    const element = node as Element
    const attributes = [...element.attributes]
      .map((attribute) => {
        // Read an inline style through the CSSOM, which normalises it the same
        // way whichever side wrote it.
        const value = attribute.name === 'style' ? (element as HTMLElement).style.cssText : attribute.value
        return `${attribute.name}=${value}`
      })
      .sort()
      .join(' ')
    return `<${element.tagName} ${attributes}>${[...element.childNodes].map(write).join('')}</${element.tagName}>`
  }
  return write(root)
}

/** Every label a mark's stroke runs through. */
function markCollisions(labels: Box[], marks: Point[]): string[] {
  return labels.filter((label) => marks.some((mark) => contains(label, mark))).map((label) => `a mark crosses "${label.label}"`)
}

test.describe('VZ-12, label collisions', () => {
  for (const width of WIDTHS) {
    test(`no label overlaps another label or a mark at ${width}`, async ({ page }) => {
      await openPaused(page, width)

      for (const intervention of [false, true]) {
        if (intervention) await page.getByRole('button', { name: 'Show an illustrative intervention' }).click()
        const { labels, knockouts, marks } = await geometryOf(page)

        expect(labels.length).toBeGreaterThan(4)
        expect(labelCollisions([...labels, ...knockouts]), `label pairs at ${width}`).toEqual([])
        // A label may sit in a band that holds no word; it may never sit on a mark.
        expect(markCollisions(labels, marks), `labels over marks at ${width}`).toEqual([])
      }
    })
  }

  test('every question keeps its labels apart at 1440', async ({ page }) => {
    await openPaused(page, 1440)

    for (const question of ['Question 1', 'Question 2', 'Question 3']) {
      await page.getByRole('radio', { name: new RegExp(`^${question}`) }).check()
      const { labels, knockouts, marks } = await geometryOf(page)
      expect(labelCollisions([...labels, ...knockouts]), question).toEqual([])
      expect(markCollisions(labels, marks), question).toEqual([])
    }
  })
})

test.describe('VZ-11, the label type floor', () => {
  for (const width of [1440, 320]) {
    test(`no rendered text in the instrument falls below 12 px at ${width}`, async ({ page }) => {
      await openPaused(page, width)

      const small = await page.evaluate(() => {
        const under: string[] = []
        for (const element of document.querySelectorAll('#plate-01 *')) {
          const text = [...element.childNodes]
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent!.trim())
            .join('')
          if (!text) continue
          const size = Number.parseFloat(getComputedStyle(element).fontSize)
          if (size < 12) under.push(`${text.slice(0, 30)} at ${size}px`)
        }
        return under
      })

      expect(small).toEqual([])
    })
  }
})

test.describe('the resting frame', () => {
  test('renders completely with JavaScript off', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto(ROUTE)

    await expect(plate(page).locator('svg.dts')).toHaveCount(2)
    await expect(plate(page).locator('.plate-states li')).toHaveCount(5)
    await expect(plate(page).locator('.sources li')).toHaveCount(6)
    await expect(page.locator('.illus')).toHaveText('Illustrative interface. Not a client result.')
    await expect(plate(page).locator('#plate-01-alt')).toContainText(
      'An illustrative diagram, not a client result.',
    )
    await expect(plate(page).locator('.plate-list')).toBeHidden()
    await expect(plate(page).getByRole('radio', { name: /^Question 1/ })).toBeChecked()

    await context.close()
  })

  test('is byte-identical with the island mounted and idle', async ({ browser }) => {
    // Under reduce the cycle never starts, so "mounted" and "idle" are the same
    // moment and the comparison is meaningful rather than a race.
    const serverContext = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' })
    const serverPage = await serverContext.newPage()
    await serverPage.goto(ROUTE)
    const server = await plate(serverPage).evaluate(NORMALIZE)
    await serverContext.close()

    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto(ROUTE)
    await page.waitForFunction(() => document.documentElement.dataset.motion === 'reduce')
    const hydrated = await plate(page).evaluate(NORMALIZE)
    await context.close()

    expect(hydrated).toBe(server)
  })
})

test.describe('the controls', () => {
  test.beforeEach(async ({ page }) => {
    await openPaused(page, 1440)
  })

  test('VZ-03, the keyboard switches all three questions', async ({ page }) => {
    const question = (n: number) => page.getByRole('radio', { name: new RegExp(`^Question ${n}`) })

    await question(1).focus()
    await page.keyboard.press('ArrowRight')
    await expect(question(2)).toBeChecked()
    await expect(plate(page)).toHaveAttribute('data-scenario', 'q2')

    await page.keyboard.press('ArrowRight')
    await expect(question(3)).toBeChecked()
    await expect(plate(page)).toHaveAttribute('data-scenario', 'q3')
  })

  test('VZ-04, a scenario change announces one sentence', async ({ page }) => {
    await page.getByRole('radio', { name: /^Question 3/ }).check()
    await expect(plate(page).locator('.live')).toHaveText(/Question 3 of 3\./)
    await expect(plate(page).locator('.live')).toHaveText(/Brand C reaches the shortlist and is not chosen\./)
  })

  test('the intervention shows its note, moves Your Brand, and draws nothing at Selection', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Show an illustrative intervention' })
    const note = plate(page).locator('.iv-note')

    await expect(note).toHaveAttribute('data-off', '')
    await toggle.click()

    await expect(toggle).toHaveAttribute('aria-pressed', 'true')
    await expect(note).not.toHaveAttribute('data-off', '')
    const yourBrand = plate(page).locator('.plate-states li', { hasText: 'Your Brand' })
    await expect(yourBrand).toContainText('shortlisted')
    await expect(yourBrand).not.toContainText('outcome connected')
  })

  test('VZ-10, the list view is reachable and the drawing stays in the document', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'View as list' })
    await toggle.click()

    await expect(plate(page).locator('.plate-list')).toBeVisible()
    await expect(plate(page)).toHaveAttribute('data-view', 'list')
    await expect(plate(page).locator('.plate-list tbody tr')).toHaveCount(5)
    await expect(page.getByRole('button', { name: 'View as drawing' })).toBeVisible()
  })

  test('a source lane presses, and only one at a time', async ({ page }) => {
    const lanes = plate(page).locator('.src')
    await lanes.first().click()
    await expect(lanes.first()).toHaveAttribute('aria-pressed', 'true')

    await lanes.nth(1).click()
    await expect(lanes.first()).toHaveAttribute('aria-pressed', 'false')
    await expect(lanes.nth(1)).toHaveAttribute('aria-pressed', 'true')
  })

  test('VZ-06, the ledger names source types and never a publication or an engine', async ({ page }) => {
    const types = await plate(page).locator('.src .type, .src-static .type').allTextContents()
    expect(types).toEqual([
      'independent review site',
      'analyst or industry report',
      "brand's own site",
      'community thread',
      'news coverage',
      'documentation',
    ])

    const text = (await plate(page).textContent())!
    for (const engine of ['ChatGPT', 'Perplexity', 'Gemini', 'AI Overviews', 'Copilot']) {
      expect(text).not.toContain(engine)
    }
  })
})

test.describe('VZ-02 and VZ-08, the drawing is read once and read in words', () => {
  test('each drawing is an image named by its own title and described by the alternative', async ({ page }) => {
    await openPaused(page, 1440)

    const drawings: Locator = plate(page).locator('svg.dts')
    await expect(drawings).toHaveCount(2)

    for (const svg of await drawings.all()) {
      await expect(svg).toHaveAttribute('role', 'img')
      await expect(svg).toHaveAttribute('aria-describedby', 'plate-01-alt')
      const first = await svg.evaluate((node) => node.children[0]?.tagName)
      expect(first).toBe('title')

      // The description comes from `aria-describedby`. The locked illustrative
      // line is the page legend, outside the figure. A `desc` element would
      // repeat the alternative in the accessibility tree, once per breakpoint.
      await expect(svg.locator('desc')).toHaveCount(0)
    }

    await expect(plate(page).locator('#plate-01-alt')).toContainText('An illustrative diagram, not a client result.')
    // The words on the drawing are decorative; the label layer is never read.
    await expect(plate(page).locator('.dts-labels').first()).toHaveAttribute('aria-hidden', 'true')
  })
})

test.describe('the list view at the width it scrolls at', () => {
  test('its scroll region is a named keyboard stop', async ({ page }) => {
    // The table is 620 px wide inside a 320 px column, so it scrolls, and a
    // scroll region a keyboard cannot reach is content a keyboard cannot read.
    await openPaused(page, 320)
    await page.getByRole('button', { name: 'View as list' }).click()
    await expect(plate(page).getByRole('region', { name: 'Brand states by stage' })).toBeVisible()

    await plate(page).locator('.pick input').first().focus()
    let reached = false
    for (let step = 0; step < 12 && !reached; step += 1) {
      await page.keyboard.press('Tab')
      reached = await page.evaluate(() => document.activeElement?.classList.contains('plate-list') ?? false)
    }
    expect(reached, 'the table scroll region is reachable by keyboard').toBe(true)
  })
})

/**
 * axe on the instrument itself.
 *
 * `/plate-fixtures` is deliberately unregistered in `src/config/routes.ts`, so
 * the sitemap and `llms.txt` never see it, and so `axe.spec.ts`, which sweeps
 * the registry, never sees it either. The one interactive component this work
 * adds would otherwise be the only new surface in the build the site's own
 * accessibility gate does not read. This is that gate, scoped to the plate and
 * run at both widths in both views.
 */
test.describe('CF-01 on the plate', () => {
  const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

  for (const width of [1440, 320]) {
    for (const listView of [false, true]) {
      test(`no serious or critical violation at ${width}, list view ${listView ? 'on' : 'off'}`, async ({ page }) => {
        await openPaused(page, width)
        if (listView) await page.getByRole('button', { name: 'View as list' }).click()
        // Back to the top: a control half under the sticky masthead reads as a
        // target-size failure that is an artefact of where the page is scrolled.
        await page.evaluate(() => window.scrollTo(0, 0))

        const results = await new AxeBuilder({ page }).include('#plate-01').withTags(TAGS).analyze()
        const blocking = results.violations.filter(
          (violation) => violation.impact === 'serious' || violation.impact === 'critical',
        )

        expect(
          blocking,
          blocking
            .map((violation) => `${violation.id} [${violation.impact}]: ${violation.help} (${violation.nodes.length} nodes)`)
            .join('\n'),
        ).toEqual([])
      })
    }
  }
})
