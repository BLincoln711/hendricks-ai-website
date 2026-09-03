import { expect, test } from '@playwright/test'

import expected from '../fixtures/accessible-names.json'
import { sweepRoutes } from './lib/routes'

/**
 * Text alternatives and link purpose (16 SM-09, SM-10) on every built route
 * and the not-found state.
 *
 * Images: every `img` carries an `alt`; the names on each route equal the
 * checked-in list in `tests/fixtures/accessible-names.json` (the shell's two
 * wordmarks on every route, plus the route's own), so a new image, a changed
 * alt or a dropped one fails here rather than in review. `alt=""` appears
 * only on the two wordmarks, in the masthead and in the footer, each of which
 * sits inside the link named "Hendricks, home".
 *
 * Inline SVG: every `svg` is either decorative (`aria-hidden="true"`) or
 * exposed with `role="img"` and a name; the named ones are listed per route.
 *
 * Links: no accessible name maps to two destinations on one page unless the
 * text `aria-describedby` resolves to differs between them (the same
 * description on both does not qualify either), and "Read more", "Learn
 * more" and "Click here" never appear. The name follows the accname
 * precedence the site uses: `aria-labelledby`, then `aria-label`, then the
 * text content with any image alt inside it.
 */

type Names = { img?: string[]; svg?: string[] }
const fixture = expected as { shell: Names; routes: Record<string, Names> }

const BANNED_LINK_TEXT = /^(read more|learn more|click here)$/i

for (const path of sweepRoutes) {
  test.describe(path, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path)
    })

    test('SM-09: image and SVG names match the checked-in list', async ({ page }) => {
      const dump = await page.evaluate(() => {
        const images = [...document.querySelectorAll('img')].map((img) => ({
          alt: img.getAttribute('alt'),
          decorativeInsideNamedLink: img.getAttribute('alt') === '' && Boolean(img.closest('a[aria-label]')),
        }))
        const svgs = [...document.querySelectorAll('svg')].map((svg) => ({
          hidden: svg.getAttribute('aria-hidden') === 'true',
          role: svg.getAttribute('role'),
          name:
            svg.getAttribute('aria-label') ??
            (svg.getAttribute('aria-labelledby')
              ? document.getElementById(svg.getAttribute('aria-labelledby') ?? '')?.textContent?.trim()
              : svg.querySelector(':scope > title')?.textContent?.trim()) ??
            null,
        }))
        return { images, svgs }
      })

      for (const image of dump.images) {
        expect(image.alt, 'every img has an alt attribute').not.toBeNull()
        if (image.alt === '') {
          expect(image.decorativeInsideNamedLink, 'alt="" only inside a named link').toBe(true)
        }
      }

      const route = fixture.routes[path] ?? {}
      const expectedImages = [...(fixture.shell.img ?? []), ...(route.img ?? [])].sort()
      expect(dump.images.map((image) => image.alt).sort()).toEqual(expectedImages)

      const namedSvgs: string[] = []
      for (const svg of dump.svgs) {
        if (svg.hidden) continue
        expect(svg.role, 'an exposed svg is role="img"').toBe('img')
        expect(svg.name, 'an exposed svg has a name').toBeTruthy()
        namedSvgs.push(svg.name ?? '')
      }
      expect(namedSvgs.sort()).toEqual([...(fixture.shell.svg ?? []), ...(route.svg ?? [])].sort())
    })

    test('SM-10: every link name states one destination', async ({ page }) => {
      const links = await page.locator('a[href]').evaluateAll((anchors) => {
        const collapse = (text: string | null | undefined) => (text ?? '').replace(/\s+/g, ' ').trim()
        const referenced = (ids: string | null) =>
          collapse(
            (ids ?? '')
              .split(/\s+/)
              .filter(Boolean)
              .map((id) => document.getElementById(id)?.textContent ?? '')
              .join(' '),
          )
        return anchors.map((anchor) => {
          const clone = anchor.cloneNode(true) as HTMLElement
          for (const img of clone.querySelectorAll('img')) img.replaceWith(img.getAttribute('alt') ?? '')
          return {
            name:
              referenced(anchor.getAttribute('aria-labelledby')) ||
              collapse(anchor.getAttribute('aria-label')) ||
              collapse(clone.textContent),
            href: anchor.getAttribute('href') ?? '',
            description: referenced(anchor.getAttribute('aria-describedby')),
          }
        })
      })

      const banned = links.filter((link) => BANNED_LINK_TEXT.test(link.name))
      expect(banned, banned.map((link) => `${link.name} -> ${link.href}`).join('\n')).toEqual([])

      const empty = links.filter((link) => link.name === '')
      expect(empty, empty.map((link) => link.href).join('\n')).toEqual([])

      // Two links share a key when both their name and their description
      // match; a key that reaches two hrefs is ambiguous in context.
      const destinations = new Map<string, Set<string>>()
      for (const link of links) {
        const key = link.description ? `${link.name} (${link.description})` : link.name
        destinations.set(key, (destinations.get(key) ?? new Set()).add(link.href))
      }
      const ambiguous = [...destinations]
        .filter(([, hrefs]) => hrefs.size > 1)
        .map(([key, hrefs]) => `${key} -> ${[...hrefs].join(' | ')}`)

      expect(ambiguous, ambiguous.join('\n')).toEqual([])
    })
  })
}
