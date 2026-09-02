import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { sweepRoutes } from './lib/routes'

/**
 * axe on every route (16 CF-01, CF-02, MG-02): the five WCAG tags, serious
 * and critical violations blocking, moderate and minor printed for triage.
 *
 * Three rule ids are elevated to blocking whatever impact axe assigns them:
 * `heading-order` (SM-03, levels never skip), and the three text-alternative
 * rules `image-alt`, `svg-img-alt` and `role-img-alt` (SM-09), plus
 * `link-name` (SM-10).
 */

const BLOCKING_RULES = new Set(['heading-order', 'image-alt', 'svg-img-alt', 'role-img-alt', 'link-name'])
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

for (const path of sweepRoutes) {
  test(`${path} has no serious or critical accessibility violations`, async ({ page }) => {
    await page.goto(path)

    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()

    const describe = (violation: (typeof results.violations)[number]) =>
      `${violation.id} [${violation.impact}]: ${violation.help} (${violation.nodes.length} nodes)`

    const blocking = results.violations.filter(
      (violation) =>
        violation.impact === 'serious' ||
        violation.impact === 'critical' ||
        BLOCKING_RULES.has(violation.id),
    )
    const reported = results.violations.filter((violation) => !blocking.includes(violation))

    if (reported.length > 0) {
      console.log(`axe ${path}: ${reported.map(describe).join('; ')}`)
    }

    expect(blocking, blocking.map(describe).join('\n')).toEqual([])
  })
}
