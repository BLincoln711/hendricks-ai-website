# Phase 0–3 Verification Report

Scope: discovery, scaffold, design system and shell, homepage.

Superseded for current status by `PHASE_4_REPORT.md`. The 320px overflow defect
below recurred in Phase 4 from a different cause, which is worth noting: narrow
viewports are where this design system breaks first.

## Automated verification

| Gate | Result |
|---|---|
| `pnpm lint` | Pass, 0 errors, 0 warnings |
| `pnpm typecheck` | Pass |
| `pnpm test` | Pass, 25 tests across 3 files |
| `pnpm build` | Pass, 8 routes prerendered static |
| `pnpm test:e2e` | Pass, 63 passed, 2 skipped |

The 2 skips are the keyboard skip-link traversal on WebKit and mobile. WebKit only
tabs to links when macOS Full Keyboard Access is enabled, and touch devices have no
Tab key. The skip link itself is asserted on every engine.

## Browser verification

Chromium, Firefox, and WebKit at 1440×900; Chromium at 1024×768; iPhone 14
emulation at 390×844; plus a 320px reflow check.

- No blank pages, error overlays, or console errors
- No horizontal overflow at 320, 390, 1024, or 1440
- Navigation, mobile menu, and the 404 route work on every engine
- Screenshots captured in `.screens/` (gitignored)

## Accessibility

Zero serious or critical axe violations on every project, tested against the
production build using the wcag2a, wcag2aa, wcag21a, wcag21aa, and wcag22aa rule
sets.

Verified manually or by assertion:

- Skip link is the first tab stop and moves focus to `#main`
- One `<main>` landmark, one H1
- Mobile menu traps focus, closes on Escape, and restores focus to the trigger
- Selection Map has a single text alternative and an illustrative-interface caption
- Reduced motion renders the same final diagram state as the default
- Touch targets are at least 44px

## Defects found and fixed during verification

1. **Navy headings rendered at body size.** `tailwind-merge` classified the custom
   `text-h2` utility as a text *color*, so it treated it as conflicting with
   `text-[var(--color-field)]` and dropped the font size. Every navy section
   heading rendered at 17px instead of 56px. Fixed by registering the type scale
   in twMerge's `font-size` class group in `src/lib/utils/cn.ts`.

2. **Contrast failure on navy lead paragraphs, 3.27:1.** The `.text-lead` utility
   declared a color in the same cascade layer as Tailwind's color utilities and
   silently won, painting slate text on navy. Fixed by removing color from the
   utility so it controls size and rhythm only.

3. **Horizontal overflow at 320px.** An attempted fix for CTA label wrapping used
   `whitespace-nowrap`, which set a min-content width wider than the viewport and
   pushed the entire hero column out. Fixed by letting the CTA group wrap instead.

## Deferred with reasons

- **Content Security Policy.** `docs/08` §8 warns against shipping an untested
  policy. Analytics, Sanity, and forms are not wired yet, so CSP lands in Phase 7
  in report-only mode first. Other security headers are live now.
- **AI crawler policy.** `docs/06` §7 requires an approved brand and legal
  decision. `robots.ts` does not encode one. Logged as `CONTENT_VERIFICATION.md` L5.
- **Sanity, Resend, and GTM.** No credentials exist. The typed analytics layer and
  environment module are built and every value is optional, so the build never
  blocks. The GTM script itself is not loaded.
- **`react-hook-form`, `next-sanity`, and `resend`** are not installed until the
  phases that use them, per `docs/08` §10 on removing unused packages.

## Blocking items before this can go to production

1. Founder claims F1–F9 in `CONTENT_VERIFICATION.md` are unverified. The homepage
   credibility line and founder section both carry the "more than fifteen years"
   claim that the approved copy itself flags for verification.
2. The 73 `/insights/*` URLs on the existing site need individual dispositions.
   `migration/redirect-map.csv` has all 126 routes seeded and every row is
   `pending`. This needs a live crawl plus Search Console data.
3. Privacy, Terms, and form consent language need legal review.
4. Lighthouse has not been run yet. `docs/08` §4 sets a 90 mobile performance
   target, which is most at risk once GTM is added in Phase 7.
