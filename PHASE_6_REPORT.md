# Phase 6 Verification Report

Scope: HEN-0604, the four definition pages. Sixteen routes are now built.

Routes added: `/what-is-search-intelligence-engineering`,
`/what-is-selection-intelligence`, `/ai-selection-problem`, `/methodology`.

The other four Phase 6 tickets were not attempted. HEN-0601 (Sanity setup),
HEN-0602 (research hub), HEN-0603 (article template), and HEN-0605 (Results schema)
all require a Sanity project ID, dataset, and tokens that do not exist yet.
`docs/11` explicitly permits the definition pages to be version-controlled at launch,
so they needed none of that. Phase 5 remains blocked on legal, not on engineering.

## Automated verification

| Gate | Result | Phase 4 |
|---|---|---|
| `pnpm lint` | Pass, 0 errors, 0 warnings | same |
| `pnpm typecheck` | Pass | same |
| `pnpm check:content` | Pass, 107 source files clean | 89 |
| `pnpm check:links` | Pass, 16 built routes have a page and an OG image, 23 navigation links resolve | 12 routes, 19 links |
| `pnpm test` | Pass, 206 tests across 5 files | 148 |
| `pnpm build` | Pass, 39 routes prerendered static | 30 |
| `pnpm test:e2e` | Pass, 683 passed, 2 skipped | 473 |

The 2 skips are unchanged since Phase 3: keyboard skip-link traversal on WebKit and
mobile.

## Browser verification

Sixteen routes captured at 1440, 1024, and 390 px, plus a 320 px overflow sweep.
No horizontal overflow, no console errors, no failed requests, and exactly one `h1`
per route at every width. Screenshots in `.screens/phase6/`.

## Defects found and fixed

**Playwright was testing a stale build.** `playwright.config.ts` set
`reuseExistingServer: !process.env.CI`, so locally the suite adopted whatever was
already listening on port 3100. A production server left running from the previous
session had had its `.next` directory rebuilt underneath it, so it served 404s for
the new routes and returned chunk files as `text/plain`. The browser then refused
the stylesheet and the script, which produced unstyled pages, which produced 18-node
`target-size` violations and horizontal overflow on *every* route — around 40
failures whose stated causes were all fictional. Now set to `false`
unconditionally: failing loudly on a busy port beats passing against the wrong
build.

**Outcome classifications were rendered as a sequence.** `/methodology` initially
used `CompletePath` for the ten outcome classifications. That component separates
chips with chevrons and marks the last one amber, so it read as an ordered
progression ending at "Uncertain". They are categories a single observation can
carry several of at once. Replaced with a new `ChipSet`, which renders an unordered
set. Found in the screenshot audit rather than by a test; a test now pins it.

**Two Phase 4 pages violated the internal-linking rule.** `docs/03` §6 requires each
solution page to link at least two research pages.
`/solutions/search-presence-engineering` and `/solutions/search-impact-measurement`
each had one, because three of the four editorial routes did not exist when they
shipped. Both fixed, and `/ai-selection-problem` gained the `/methodology` link the
research-page rule requires. All three rules are now unit assertions.

**The shell was implemented twice.** `not-found.tsx` duplicated the
`(marketing)` layout's skip link, header, main landmark, and footer. Adding an
`(editorial)` group would have made three copies. Extracted to `SiteShell`.

## What resolved itself

R1–R4 in `CONTENT_VERIFICATION.md` closed without a single copy change. The approved
destinations were already recorded in the content objects and gated on the `built`
flag, so marking four routes built was the entire change:

- The footer Research column appeared, carrying the four definition pages.
- Related-content lists on seven pages gained their editorial links.
- Both homepage CTAs reverted from fallbacks to canonical destinations —
  `/what-is-selection-intelligence` and `/methodology`. A unit test now asserts no
  fallback is still in use.

## New test coverage

**Unit.** `tests/unit/commercial-content.test.ts` was renamed to
`page-content.test.ts` and now sweeps all fifteen content objects rather than
running a parallel suite for editorial pages, so a new page cannot skip the language
and brand guards. Added: the three `docs/03` §6 linking rules, review-date format,
direct-answer shape, the honesty claims on `/methodology` (citation does not prove
influence, correlation does not prove causation, no weighting model is universal, no
claim to reverse-engineer model logic), and that `/what-is-selection-intelligence`
describes an observed distribution rather than a universal ranking.
`tests/unit/json-ld.test.ts` covers `definedTermSchema`.

**E2E.** `tests/e2e/commercial-routes.spec.ts` was renamed to `routes.spec.ts` and
the full per-route sweep now covers all sixteen routes. Added for the definition
pages: the direct answer renders between the `h1` and the first `h2`, the
`DefinedTerm` description equals the visible direct answer, the two pages that
define no term emit no `DefinedTerm`, each page publishes one machine-readable
review date, the outcome classifications render as an unordered set, and the two new
wide tables are focusable scroll regions with captions.

## Accessibility

No serious or critical axe violations on any of the sixteen routes across five
browser projects. Specific to this phase:

- The direct answer is a `<p>`, not a `<blockquote>`. The page is the source of the
  definition, so attributing it elsewhere would be wrong.
- The two competing questions on `/what-is-selection-intelligence` *are* blockquotes
  inside `<figure>`/`<figcaption>`, because those are attributed positions.
- `NegationLadder` de-emphasises "does not guarantee" by splitting the rendered
  sentence rather than storing two halves, so the copy has one source and the
  meaning does not depend on the styling.
- `ChipSet`'s `+` separator is text with `aria-hidden`, and the summing relationship
  is also stated in the visible `= Intent Context` line.
- The three wide tables are `role="region"` with `tabindex="0"` and an accessible
  name from the caption.

## Deferred

- **`FaqAccordion`, `ArticleCard`, `CaseStudyCard`, `AuthorCard`** — belong to the
  Sanity-backed research hub.
- **`DefinitionBlock`** — superseded. The pages needed a `DirectAnswer` at the top
  and a `SourcesNote` at the bottom, so the planned single component was split.

## Blocking items

Unchanged from Phase 4, minus the four resolved link items:

- **Founder claims (F1–F9).** `/about` still publishes no employer, title, date,
  advisory role, or speaking credential. This is the largest visible gap on the site.
- **FAQ answers (Q1–Q3).** 17 approved questions with no answers across three
  solution pages.
- **Legal (L1–L4).** Consent language, privacy notice, terms, and the cookie
  decision. Blocks all of Phase 5.
- **Sanity credentials.** Blocks the rest of Phase 6.
- **Review dates (D1–D2).** The definition pages publish 2026-08-16 as last
  reviewed, which is the transcription date rather than a substantive review.
- **`/corrections`** has no approved copy in `content/pages/`, so the route cannot
  be built as specified.

Resolved since Phase 4: P1–P3 (fees are conversation-only, decided 2026-08-16) and
R1–R4.
