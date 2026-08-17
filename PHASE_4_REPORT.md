# Phase 4 Verification Report

Scope: the ten commercial pages, plus the `/diagnostic` and `/contact` bodies.
Twelve routes are now built. Phases 5–9 are not started.

Routes added: `/solutions`, the four `/solutions/*` detail pages, `/how-it-works`,
`/for-brands`, `/for-agencies`, `/about`, `/diagnostic`, `/contact`.

## Automated verification

| Gate | Result |
|---|---|
| `pnpm lint` | Pass, 0 errors, 0 warnings |
| `pnpm typecheck` | Pass |
| `pnpm check:content` | Pass, 89 source files clean |
| `pnpm check:links` | Pass, 12 built routes have a page and an OG image, 19 navigation links resolve |
| `pnpm test` | Pass, 148 tests across 5 files (was 25 across 3) |
| `pnpm build` | Pass, 30 routes prerendered static |
| `pnpm test:e2e` | Pass, 473 passed, 2 skipped (was 63) |

The 2 skips are unchanged from Phase 3: keyboard skip-link traversal on WebKit and
mobile.

`check:content` and `check:links` were declared in `package.json` from Phase 1 but
had never been written, so the "fails the build" claim in `IMPLEMENTATION_PLAN.md`
§14 was untrue until this phase. Both now exist and both run inside `pnpm verify`.

## New test coverage

**Unit.** `tests/unit/routes.test.ts` covers the route registry: unique paths, path
shape, the built set, sitemap filtering, `isBuilt`, `ctaHref` fallback behaviour, and
that no exported navigation entry points at an unbuilt route.

`tests/unit/commercial-content.test.ts` runs a governance sweep over all eleven
commercial content objects: title and description shape, banned hype language,
unnegated guarantees, ambiguous CTAs, the retired "Selection Engineering" name,
Search Economy containment, and internal links that resolve. It then asserts the
structural rules per page family — solution ordering, Diagnostic conversion,
sibling cross-linking, observed-rate metric naming, evidence grading, the
publication framing on `/about`, and that no price is published.

**E2E.** `tests/e2e/commercial-routes.spec.ts` sweeps every route for status, title,
description, canonical pathname, single H1, single main landmark, breadcrumb trail,
axe violations, console errors, and a conversion path into the main content. It adds
a whole-site internal link crawl, sitemap parity against the built route set, a
320px overflow check on all eleven routes, and keyboard reachability plus captions
for the wide evidence-grade table.

Titles and H1s in the E2E sweep are read from the content objects rather than
duplicated, so the suite verifies that approved copy reaches the rendered document
while the unit suite pins the copy itself.

## Browser verification

Chromium, Firefox, and WebKit at 1440×900; Chromium at 1024×768; iPhone 14
emulation at 390×844; plus a 320px reflow sweep. Screenshots at all three widths
captured in `.screens/phase4/` (gitignored).

- No blank pages, error overlays, console errors, or failed requests
- No horizontal overflow at 320, 390, 1024, or 1440 on any of the eleven routes
- Exactly one H1 per route

## Accessibility

Zero serious or critical axe violations on all five Playwright projects across
every route, tested against the production build with the wcag2a, wcag2aa, wcag21a,
wcag21aa, and wcag22aa rule sets.

- The evidence-grade table is a focusable scroll region with a caption, rather than
  a silently clipped table on narrow viewports (WCAG 2.1.1)
- `Callout` variants carry a visible text label alongside the icon, so meaning is
  never conveyed by colour or shape alone (WCAG 1.4.1)
- Breadcrumbs take an `onNavy` variant so contrast holds on dark hero surfaces
- `SystemFlow` and the other sequence visuals render as ordered lists rather than
  SVG, so the order reaches assistive technology as structure

## Defects found and fixed during verification

1. **Broken internal links to unbuilt Phase 6 routes.** The footer and two homepage
   CTAs linked to `/research`, `/methodology`, and
   `/what-is-selection-intelligence`, which Next.js prefetched on hover, recording
   404s. Fixed by adding a `built` flag to every entry in `src/config/routes.ts` and
   filtering navigation, footer columns, related-content lists, the 404 page, and
   the sitemap through `isBuilt`. Footer columns left with nothing built now hide
   entirely. `ctaHref` records a CTA's canonical destination and serves a working
   fallback until that route lands.

2. **Horizontal overflow on `/solutions/search-impact-measurement` at 320px.** The
   evidence-grade table's `min-w-[34rem]` became its wrapper's min-content width and
   pushed the grid column past the viewport instead of letting the scroll region
   take over. Fixed with `min-w-0` on the wrapper.

3. **Console errors from Vercel Analytics off-platform.** `Analytics` and
   `SpeedInsights` requested scripts that do not exist outside Vercel; the browser
   rejected the `text/plain` response and logged an error on every page. Now
   rendered only when `NEXT_PUBLIC_VERCEL_ENV` or `VERCEL` is set.

4. **Type error on optional contact routing fields.** Not every `routing.choices`
   entry has an `href`. Fixed by declaring a `RoutingChoice` type with optional
   `href` and `linkLabel` and applying it with `satisfies`.

## Deferred with reasons

- **All three forms.** The diagnostic application, contact, and agency inquiry forms
  are Phase 5 and blocked on `CONTENT_VERIFICATION.md` L1 and L3: approved consent
  wording and a published privacy notice. This is a legal dependency, not an
  engineering one. Both pages ship their approved body copy and route conversion
  through the existing contact path.
- **FAQ sections on three solution pages.** The approved markdown supplies questions
  without answers. `docs/12` §6 and `AGENTS.md` forbid inventing them, so the
  sections are omitted rather than shipped empty and no `FAQPage` JSON-LD is
  emitted. Registered as Q1–Q3.
- **Research cross-links.** `docs/03` §6 asks each solution page to link at least two
  relevant research pages. None exist yet, so each links two or three sibling
  solutions instead. Lands in Phase 6.
- **Pricing.** The Diagnostic fee and both programme ranges are withheld pending
  P1–P3.

## Blocking items before this can go to production

Unchanged from Phase 0–3, plus two new ones:

1. Founder claims F1–F9 are unverified. `/about` now publishes the biography, so
   this blocks a larger surface than it did at Phase 3.
2. The 73 `/insights/*` URLs need individual dispositions. Every row in
   `migration/redirect-map.csv` is still `pending`.
3. Privacy, Terms, and form consent language need legal review. This also blocks all
   of Phase 5.
4. Lighthouse has not been run. The 90 mobile target is most at risk once GTM lands
   in Phase 7.
5. **New — S1.** Two approved title tags exceed the width Google renders:
   `/solutions` at 85 characters and `/diagnostic` at 78. Published verbatim as
   approved; confirm whether to shorten or accept truncation.
6. **New — E1.** `/about` publishes The Search Economy description. The wording needs
   sign-off before launch.
