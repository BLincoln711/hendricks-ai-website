# Implementation Plan: redesign-2026-09

Status tracking for the seventeen-PR build order in the redesign developer handoff (`~/claudecode/hendricks-redesign-2026-09/18-developer-handoff.md`, section 11). Branch `redesign-2026-09` from `main` at `f2006e8`; every PR targets the branch, and the branch merges to `main` only when the handoff's section 10 launch checklist is green.

This file replaces the Cursor-era plan, which tracked the original handoff kit in `docs/` and was closed out at Phase 6. Positioning, copy rules and locked strings live in `AGENTS.md` and `_inputs/CANON.md`; this file records only what has shipped.

Gate means what must be green before merge, on top of `pnpm verify` as it then stands. Status is one of: not started, in progress, done (commit), deferred (reason).

| PR | Scope | Gate | Status |
|---|---|---|---|
| 1 | Truth and hygiene, no visual change: the 4.2 observed-systems drift fixes and rewritten boundary test with fixtures under `tests/fixtures/content/`; CM-14 comments; this file replaced; `@lhci/cli` with `lighthouserc.js` informational | Within `src`, `content` and `tests`, "three systems" appears only in dated scope rows, the allowlisted 2026-08-19 sentence and the failing fixture; `pnpm test` green including `analytics.test.ts` | done |
| 2 | Tokens: 5.1 to 5.6, `src/styles/`, `check:tokens` and `check:contrast` registered; `.on-plate` transitional class | `check:contrast` and `check:tokens` green; zero console errors at 1440, 1024, 390, 320 | not started |
| 3 | Shell: layout, header, navigation, footer, consent, wordmark; Research restored to primary navigation (R6 default); PNG wordmark placeholder | `keyboard.spec.ts`; `layout.spec.ts` MG-03; `consent.spec.ts`; KF-01 to KF-10 | not started |
| 4 | Primitives: remaining phase 2 rows, retokens, 404, error, global-error; `onNavy` and `outlineOnNavy` no-ops. No deletions | axe on every route; SM-01 to SM-08; `names.spec.ts` | not started |
| 5 | Plate system, static: `selection-map-data.ts` with invariant test, phase 3 RSC components, `check:census` registered. No deletions | `plate-render.test.ts`; no-JS render; VZ-01, 02, 05 to 08, 11, 12; `check:census` | not started |
| 6 | Motion and the island: `motion.ts`, `plate-controls.tsx` via `next/dynamic`, ladder selection, toggle, `useAnnounce`, grep gates | `motion.spec.ts` and `instrument.spec.ts`; MO-01 to MO-05; VZ-03, 04, 09, 10; `motion.ts` under 3 KB; chunk under 50 KB | not started |
| 7 | Homepage rebuilt to the eleven sections; `home.ts` and `01-home.md` per 4.1; deletes `visuals/selection-map.tsx`; mirror check made blocking | `homepage.spec.ts`; MG-01 on `/`; gate map green; CTA-label dump | not started |
| 8 | Forms infrastructure: 6.4 modules, action and primitives, `events.ts`, `gtag.ts` allowlist, `trackEvent` buffer, CSV rows. No page mounts a form | `forms.test.ts`; `analytics.test.ts`; blocker 8 e2e | not started |
| 9 | /diagnostic: ten regions, phase table and plate, six-tile strip, fit tool, application at `#apply` | DX-01 to DX-09, DX-38 to DX-41; FM-01 to FM-12; fit network test; dollar guard; MG-01 | not started |
| 10 | /for-agencies and /contact: the two forms, preselects, model rows, pointers, both mirrors; deletes `visuals/partnership-models.tsx` | Submissions reach the action on all three forms; KF-07 with the sheet open; preselects without JavaScript; query redaction | not started |
| 11 | Commercial pages: /solutions ledger, the four solution pages, /how-it-works, /for-brands, /about, /methodology, /corrections; five visual deletions | `routes.spec.ts`; `link-map.test.ts` (L-01, L-04); `json-ld.test.ts` S-02 | not started |
| 12 | Research contract and migration: 4.5 applied, study and editorial migrations, RT-50 rules, `vocabulary.ts` | Typecheck on removed keys; `research-contract.test.ts`; RT-50 fixtures | not started |
| 13 | Research templates and hub; `case-study-record.tsx`; four deletions after PRs 9, 10 and 11 | RT-01 to RT-64 as applicable; RC-01 to RC-11, RC-17 to RC-19; CS tests; MG-01 on the flagship | not started |
| 14 | SEO and crawler: section 9 in full, `check-jsonld.ts`, `robots.test.ts`, STRATEGY.md 4.7 diff filed | `check:jsonld`; `feed.test.ts`; `seo.spec.ts`; `curl -sI` on the artifacts | not started |
| 15 | Sanity cleanup: `enableSanityVisualEditing` and `/studio` disallow removed; unread `SANITY_*` entries retired | P-02 path count updated | not started |
| 16 | Gates and budgets: `check-size.ts`, `check-census.ts`, Lighthouse CI blocking, Mono subsetting, web-vitals route behind `WEB_VITALS_BEACON=off`, `verify` final order | MG-05; shell under 180 KB on every route or a recorded variance | not started |
| 17 | Docs and records: section 10 supersession notes, this file closed out, CONTENT_VERIFICATION reconciled, manual script appended, memory and vault notes | Review | not started |

## Dependencies

PRs 12 to 14 depend on 4 and run in parallel with 7 to 11, except PR 13's deletions, which wait on 9, 10 and 11. PR 5's geometry and PR 6's controller wait on register decision B3; everything else in them does not. A component is deleted only in the PR that rebuilds its last consumer, so typecheck, build and `pnpm verify` stay green at every PR.

## Decisions the build is waiting on

Recorded in handoff section 3. Group A (R1 hero H1, Diagnostic H1, R4 label overrides, fee state, R5 proof line, fit H2, hero boundary noun, R6 navigation) and group C (content-gate rows) are Brandon's, and a gated line renders its approved fallback until its row is `approved`. Closing CONTENT_VERIFICATION rows R5 and R6 and adding L9 are register acts, not commits.

## PR 1 record

- Observed-systems drift (audit V7, CM-02, CM-03, CM-06, SEO-14): `selection-intelligence.ts`, `search-impact-measurement.ts` and `no-shared-source-across-engines.ts` render the shared sentence or the run-date boundary; eleven `content/pages` mirrors re-mirrored to their `.ts` twins; the four dated studies gain a change-history table with a `scope` row; `24-corrections.md` gains the three 2026-09-01 entries from `corrections.ts`.
- Guard: `scripts/lib/observed-systems-guard.ts` is the one rule; `tests/unit/observed-systems-boundary.test.ts` runs it over `src/content`, `content/pages` and the fixtures. `check:content` adopts it under handoff 4.7 rule 2.
- `tests/setup.ts` restores jsdom's `localStorage` over Node 25's inert Web Storage global, which was why the five GA4 send-gate tests failed on `main`.
- `docs/17`, `docs/19` and `docs/20` still carry three-system lines; they take PR 17's supersession notes.
