# Hendricks.ai — Implementation Plan

Derived from the handoff kit in `docs/`, `content/pages/`, and `templates/`.
Source-of-truth order per `README.md`: `AGENTS.md` → `.cursor/rules/` → `docs/01` →
`docs/03` → `docs/04` → `content/pages/` → remaining technical and QA documents.

**Scope of the current pass:** Phase 0 through Phase 4 (`docs/11-BUILD-PLAN.md`).
Phases 5–9 are planned here but deliberately not implemented yet. Phase 4
decisions are recorded in §17.

---

## 1. Repository structure

Target structure, following `docs/02-TECHNICAL-ARCHITECTURE.md` §4:

```text
hendricks-ai/
├── .cursor/rules/                 # from handoff
├── docs/                          # from handoff
├── content/pages/                 # approved copy, markdown reference
├── templates/                     # env, events, inventory, redirects
├── public/
│   ├── brand/                     # wordmark lockups, favicon, dot
│   ├── images/                    # portrait
│   └── social/                    # OG output
├── scripts/
│   ├── build-brand-assets.ts      # PNG recolor pipeline
│   ├── validate-content.ts
│   └── check-links.ts
├── src/
│   ├── app/
│   │   ├── (marketing)/           # /, solutions, diagnostic, how-it-works,
│   │   │                          # for-brands, for-agencies, results,
│   │   │                          # about, contact
│   │   ├── (editorial)/           # research, definitions, methodology
│   │   ├── api/leads/route.ts
│   │   ├── studio/[[...tool]]/
│   │   ├── layout.tsx, error.tsx, global-error.tsx, not-found.tsx
│   │   ├── robots.ts, sitemap.ts, manifest.ts, opengraph-image.tsx
│   ├── components/
│   │   ├── analytics/ forms/ layout/ sections/ seo/ visuals/ ui/
│   ├── config/                    # site, routes, navigation, feature-flags
│   ├── content/pages/             # typed content objects (source of truth in code)
│   ├── lib/                       # analytics, env, forms, leads, rate-limit,
│   │                              # sanity, seo, utils
│   ├── styles/globals.css
│   └── types/
└── tests/{e2e,unit,fixtures}
```

## 2. Route inventory

From `docs/03-INFORMATION-ARCHITECTURE.md` §3. Status reflects this pass.

| Route | Template family | Indexable | Status |
|---|---|---|---|
| `/` | Homepage | Yes | **Built** |
| `/solutions` | Commercial | Yes | **Built** |
| `/solutions/search-demand-intelligence` | Commercial | Yes | **Built** |
| `/solutions/selection-intelligence` | Commercial | Yes | **Built** |
| `/solutions/search-presence-engineering` | Commercial | Yes | **Built** |
| `/solutions/search-impact-measurement` | Commercial | Yes | **Built** |
| `/diagnostic` | Form | Yes | **Built** — body only; form is Phase 5 |
| `/how-it-works` | Commercial | Yes | **Built** |
| `/for-brands` | Commercial | Yes | **Built** |
| `/for-agencies` | Commercial | Yes | **Built** |
| `/results` | Proof | Flagged off | Phase 6 |
| `/research` | Editorial index | Yes | Phase 6 |
| `/research/[slug]` | Article | Yes | Phase 6 |
| `/what-is-search-intelligence-engineering` | Definition | Yes | Phase 6 |
| `/what-is-selection-intelligence` | Definition | Yes | Phase 6 |
| `/ai-selection-problem` | Definition | Yes | Phase 6 |
| `/methodology` | Definition | Yes | Phase 6 |
| `/about` | Commercial | Yes | **Built** |
| `/contact` | Form | Yes | **Built** — body only; form is Phase 5 |
| `/privacy` | Legal | Yes | Blocked on counsel |
| `/terms` | Legal | Yes | Blocked on counsel |
| `/corrections` | Editorial policy | Yes | Phase 6 |
| `/studio/[[...tool]]` | Sanity Studio | No | Phase 6 |
| 404 / error | System | No | **Built** |

Every unbuilt route carries `built: false` in `src/config/routes.ts`. Navigation,
footer columns, related-content lists, the 404 page, and the sitemap all filter on
that flag, so no link or `<loc>` can point at a route that does not exist. See §17.

Routes explicitly **not** built (`docs/01` §15): login, dashboard, public pricing,
free prompt checker, chatbot, e-commerce, user accounts.

## 3. Shared components

**Layout:** `SiteHeader`, `DesktopNavigation`, `MobileNavigation`, `SiteFooter`,
`PageShell`, `Section`, `Container`, `Breadcrumbs`, `SkipLink`.

**Content:** `PageHero`, `SectionHeading`, `DirectAnswer`, `Callout`, `QuoteBlock`,
`DataTable`, `FeatureList`, `DefinitionBlock`, `FaqAccordion`, `ArticleCard`,
`CaseStudyCard`, `AuthorCard`.

**Hendricks visuals:** `SignalDot`, `SelectionMap`, `TraditionalVsAiFlow`,
`DemandToSelectionPath`, `SelectionStageTable`, `ContextPanelDiagram`,
`EvidenceGradeMatrix`, `InterventionLedgerPreview`, `ImpactMeasurementStack`.

**Conversion:** `PrimaryCta`, `CtaGroup`, `DiagnosticApplicationForm`,
`AgencyInquiryForm`, `ContactForm`, `FormStatus`, `FormErrorSummary`, `FormSuccess`.

Built through Phase 3: layout set, `Section`, `SectionHeading`, `Container`,
`Callout`, `DataTable`, `PrimaryCta`, `CtaGroup`, `PageHero`, `SignalDot`,
`SelectionMap`, `TraditionalVsAiFlow`, `DemandToSelectionPath`,
`SelectionStageTable`, `SolutionFeature`, `AudiencePath`, `FounderFeature`.

Added in Phase 4 — shared: `SignalList`, `FitList`, `Deliverables`,
`RelatedLinks`, `ClosingCta`, `ExternalVentureCard`. Page visuals: `SystemFlow`,
`ContextPanelDiagram`, `MetricDefinitions`, `EngineeringLayers`,
`InterventionLedgerPreview`, `ImpactMeasurementStack`, `PartnershipModels`,
`OperatingLayer`.

`FaqAccordion`, `QuoteBlock`, `DefinitionBlock`, `ArticleCard`, `CaseStudyCard`,
and `AuthorCard` remain unbuilt: no page in Phase 4 has approved content for them.
The three form components are Phase 5.

Every Phase 4 component is a Server Component. The client bundle is unchanged
from Phase 3.

Client components are limited to `MobileNavigation`, the `SelectionMap` entry
animation, and the analytics dispatcher. Everything else is a Server Component.

## 4. Content model

Marketing copy lives in version-controlled typed objects under
`src/content/pages/`, keyed to the approved markdown in `content/pages/`. Copy is
kept out of TSX so it can be reviewed without reading components
(`docs/02` §6).

Sanity owns research articles, authors, categories, methodology documents, and
verified case studies only. No generic page builder.

## 5. Design tokens

From `docs/04-DESIGN-SYSTEM.md` §4, exposed as CSS custom properties and mapped to
shadcn semantic tokens.

| Token | Hex | Role |
|---|---|---|
| `--color-navy` | `#071A2B` | Primary dark surface, headings |
| `--color-navy-2` | `#0B253A` | Alternate dark surface |
| `--color-blue` | `#2458E6` | Primary action, links |
| `--color-blue-hover` | `#1946C8` | Primary hover |
| `--color-cyan` | `#00C2D8` | Discovery, connecting paths |
| `--color-amber` | `#F3A712` | Decision points, gaps |
| `--color-field` | `#F7F9FC` | Main light background |
| `--color-white` | `#FFFFFF` | Cards |
| `--color-graphite` | `#18222D` | Body text |
| `--color-slate` | `#5E6C7B` | Secondary text |
| `--color-border` | `#D9E1E8` | Borders, grids |
| `--color-soft` | `#EDF2F6` | Section separation |
| `--color-positive` | `#15856A` | Verified positive movement |
| `--color-destructive` | `#B42318` | Errors only |

Type: Geist Sans and Geist Mono only, fluid `clamp()` scale per `docs/04` §6,
weights restrained to 500–650.

Containers: 1440 site / 1280 standard / 1200 wide data / 760 narrow editorial.
Radius: 8 control, 10 button, 16 card, 20 panel.

## 6. Brand asset pipeline

Decision recorded: the source wordmark's dot is `#1DA1F3`, which is **not** a
design-system token and fails WCAG AA on white at 2.8:1. It is recolored to
Signal Blue `#2458E6` so the wordmark dot matches the signal-dot motif used in
diagrams. `#1DA1F3` is never introduced as a token.

Source: `~/claudecode/hendricks/public/hendricks-logo.png` (2346×507, alpha),
flat two-color — ink `#03060D`, dot `#1DA1F3`.

`scripts/build-brand-assets.ts` classifies pixels by chroma (blue channel 13 vs
243), then paints each target color through the source alpha as a mask. This
preserves exact letterforms and avoids the dark fringing a naive color replace
leaves on antialiased edges. The wordmark is not traced or rebuilt.

Outputs:

- `public/brand/hendricks-wordmark-light.png` — near-black ink, `#2458E6` dot
- `public/brand/hendricks-wordmark-dark.png` — `#F7F9FC` ink, `#2458E6` dot
- `public/brand/signal-dot.svg` — hand-written circle, favicon and app icon source
- `public/social/og-default.png` — 1200×630 template

The wordmark is a heavy geometric sans, not Geist. It ships as artwork, never as
live text. Alt text is `Hendricks` without the period (`docs/01` §4).

## 7. Integrations and environment

Per `templates/env.example`. Every variable is parsed in a server-only `env`
module; public variables are explicitly prefixed.

Required for production: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GTM_ID`,
`NEXT_PUBLIC_VERCEL_ENV`, `NEXT_PUBLIC_SANITY_PROJECT_ID`,
`NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`,
`SANITY_PREVIEW_SECRET`, `SANITY_REVALIDATE_SECRET`, `RESEND_API_KEY`,
`LEAD_FROM_EMAIL`, `LEAD_NOTIFICATION_EMAIL`.

Optional: `SANITY_READ_TOKEN`, `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET`,
Turnstile keys, rate-limit provider credentials.

**None are available yet.** Adapters are built behind validated env modules and
stubbed with documented placeholders so the build never blocks. See §11.

## 8. Feature flags

```ts
export const features = {
  showResults: false,        // until 2 verified case studies exist
  showNewsletter: false,     // until provider + consent language approved
  enableSanityVisualEditing: true,
  enableTurnstile: false,
} as const
```

## 9. Build sequence

- **Phase 0** — read handoff, this plan, `CONTENT_VERIFICATION.md`, route inventory
  of the existing site, initial redirect map. *(this pass)*
- **Phase 1** — scaffold on pnpm, TypeScript strict, Tailwind, shadcn/Radix, Geist,
  Lucide, Vitest, Playwright + axe, package scripts. *(this pass)*
- **Phase 2** — tokens, primitives, layout shell, visual language, metadata and
  JSON-LD system, OG images. *(this pass)*
- **Phase 3** — homepage, 13 sections, Selection Map, homepage QA. *(this pass)*
- **Phase 4** — 10 commercial pages, plus the `/diagnostic` and `/contact` bodies.
  *(this pass — see §17 for why the two form pages were pulled forward)*
- **Phase 5** — diagnostic form, contact form, agency inquiry form, lead service.
- **Phase 6** — Sanity, research hub, article template, definition pages, Results
  behind flag.
- **Phase 7** — GTM/GA4, typed events, Vercel Analytics, sitemap, robots, JSON-LD
  validation, staging noindex.
- **Phase 8** — migration and redirects (see §12).
- **Phase 9** — full verification and `RELEASE_REPORT.md`.

## 10. Homepage composition

Sequence is fixed by `docs/03` §4 and `content/pages/01-home.md`:

1. Hero — eyebrow, H1, shortlist subhead, lead, two CTAs, operating line, credibility
   line, Selection Map
2. The AI Selection Problem — `TraditionalVsAiFlow`, pull quote, complete path
3. What Hendricks actually does — four business questions with named outputs
4. Four solutions — `SolutionFeature` ×4, distinct motifs, not four identical cards
5. Selection Intelligence distinction — `SelectionStageTable`
6. Demand-to-Selection methodology — `DemandToSelectionPath`
7. Tangible outputs — 13-item editorial list
8. Honest measurement — observed / inferred / measured / tested
9. Audience paths — For Brands and For Agencies, visually distinct
10. Diagnostic entry
11. Results — rendered only when `showResults` is true
12. Founder — portrait, biography, About link. **No Search Economy mention.**
13. Final CTA

Hard constraints: no fabricated metric, logo, testimonial, or dashboard; the
Selection Map carries the caption *Illustrative interface. Not a client result.*
and a text alternative; The Search Economy appears nowhere on this page.

**Composition change from the wireframe.** `docs/14` §1 places the H1 inside the
left column beside the Selection Map. At the design system's H1 size that breaks
the category line across four lines in a 600px column and strands the diagram in
dead space. The headline and shortlist subhead now span the full container, and
the lead, CTAs, and operating line sit beside the Selection Map below. Hierarchy,
reading order, and required content are unchanged — `docs/14` permits improving
composition on those terms.

**The Selection Map does not animate.** `docs/13` §5 allows a progressive entry
animation after hydration. It is deliberately omitted: the diagram is the primary
explanation of the category, so it must not depend on JavaScript, and skipping it
makes the default and reduced-motion states identical rather than two states to
keep in sync.

## 11. Missing credentials and assets

| Item | Blocks | Handling this pass |
|---|---|---|
| Sanity project ID | Research hub, Studio | Adapter + placeholder env; Phase 6 |
| Resend API key | Lead email delivery | Adapter + placeholder env; Phase 5 |
| GTM container ID | Analytics | Typed event layer built; GTM not loaded |
| Founder claim verification | About, homepage credibility line | See `CONTENT_VERIFICATION.md` |
| Higher-resolution portrait | Founder sections | Design to available resolution; see §13 |
| Privacy / Terms copy | `/privacy`, `/terms`, and both Phase 5 forms | Routes not built; footer links filtered out rather than pointing at an empty page |
| Vector wordmark | — | Not required; raster pipeline is sufficient |

## 12. Migration surface

Crawl of `~/claudecode/hendricks/src/app` (read-only reference) found **127 page
routes**:

- 73 `/insights/*` — AI-agent and automation editorial
- 10 `/industries/*`
- 19 `/dashboard`, `/login`, `/questionnaire` — authenticated, not public
- Plus `/lines/*`, `/portal/*`, `/preview/*`, `/pricing`, `/security`, `/audit`,
  `/results`, `/about`, `/contact`, `/diagnostic`, `/privacy`, `/terms`

`docs/09` §5 is directly relevant: the existing agent positioning must not remain
the dominant branded search result after launch, and blanket homepage redirects are
prohibited. Each of the 73 insight URLs needs an individual disposition — retain,
rewrite, merge, redirect, archive, or 410.

This is Phase 8 work and requires a live crawl plus Search Console data for
backlink and traffic priority. `templates/redirects.csv` is seeded with the route
inventory and every row marked `pending`.

## 13. Portrait handling

No higher-resolution original exists. Source is
`~/claudecode/hendricks/public/brandon-hendricks-2026.jpg` (1024×819 landscape),
cropped to roughly 660×819 portrait and graded cool to match
`~/claudecode/hendricks-rebrand-2026-08/instrument/brandon-graded-crop.jpg`. The
original warm studio backdrop reads muddy against Field White `#F7F9FC`.

Founder portrait columns are sized to about 380px so the crop covers them at 2×.
No AI upscaling — it would invent facial detail on a real person, which `docs/04`
§15 and `docs/12` §6 prohibit in spirit. Logged as a known limitation.

## 14. Testing strategy

- **Unit (Vitest + RTL):** content-object shape, metadata builder, JSON-LD
  sanitizer, feature-flag gating, analytics helper parameter shape, Selection Map
  text alternative presence. Phase 4 adds the route registry (`tests/unit/routes.test.ts`)
  and a governance sweep over all eleven commercial content objects
  (`tests/unit/commercial-content.test.ts`): banned hype language, unnegated
  guarantees, ambiguous CTAs, the retired "Selection Engineering" name, Search
  Economy containment, and internal links that resolve.
- **E2E (Playwright + axe):** homepage renders at 1440/1024/390, no serious or
  critical axe violations, skip link works, mobile menu traps and restores focus,
  keyboard-only journey, no horizontal overflow at 320px, reduced-motion renders
  the final Selection Map state. Phase 4 adds `tests/e2e/commercial-routes.spec.ts`:
  a per-route sweep of status, title, description, canonical, single H1, single
  main landmark, breadcrumb trail, axe, console errors, and conversion path;
  plus a whole-site internal link crawl, sitemap parity against the built routes,
  narrow-viewport overflow on all eleven routes, and keyboard reachability of the
  wide evidence-grade table.
- **Scripts:** both were declared in `package.json` from Phase 1 but only written in
  Phase 4, so the "fails the build" claim in this plan was untrue until now. Both
  are in `pnpm verify`.
  - `check:content` scans every `.ts`/`.tsx` file under `src/` for placeholder text,
    banned hype language, retired terminology, any Search Economy reference outside
    the three files allowed to name it, and sample-data components missing the
    *Illustrative interface. Not a client result.* label. Comments are stripped
    first, so a note explaining why a term is banned is not itself a hit.
  - `check:links` reconciles `src/config/routes.ts` against the filesystem: every
    built route has a `page.tsx` and an `opengraph-image.tsx`, no unbuilt route has
    a page that nothing can link to, and every href the navigation actually exports
    resolves. It inspects the exported arrays post-filter, so it checks the values
    the site renders rather than the source that produces them.

Two guards deliberately assert shape rather than wording. Titles and H1s in the
E2E sweep are read from the content objects, so it verifies that approved copy
reaches the rendered document while the unit suite pins the copy itself. And the
guarantee guard drops the two sections whose heading carries the negation — the
poor-fit list on `/diagnostic`, the partner commitments on `/for-agencies` —
because no list item inside them reads as negated on its own.

## 15. Risks and assumptions

1. **Migration scale.** 73 insight URLs on a conflicting positioning is the largest
   unplanned surface in the project. Assumption: they are dispositioned
   individually in Phase 8, not bulk-redirected.
2. **Unverified founder claims.** The homepage credibility line and founder section
   both carry "more than fifteen years" and an experience summary that
   `content/pages/01-home.md` itself flags for verification. Built as approved copy,
   blocked from publication until signed off.
3. **Lighthouse ≥ 90 mobile** with GTM added in Phase 7 is the main performance
   risk. Mitigated by deferring analytics and keeping homepage client JS under the
   180 KB budget.
4. **No live crawl yet.** Route inventory is derived from the local repository, which
   may differ from production. Must be reconciled against a real crawl.
5. **Sanity schema churn.** Research and case-study schemas are designed in Phase 6;
   definition pages stay version-controlled at launch to avoid a CMS dependency on
   the critical path.

## 16. Acceptance checklist mapping

Each `docs/10-ACCEPTANCE-CRITERIA.md` section maps to a verification owner:

| Criteria section | Verified by | Phase |
|---|---|---|
| 1 Product and positioning | Manual copy review vs `content/pages/` | 3–4 |
| 2 Search Economy separation | `check:content` script + manual | 3, 6 |
| 3 Routes | Playwright route status sweep | 9 |
| 4 Navigation | Playwright keyboard + axe | 2–3 |
| 5 Copy and evidence | `check:content` + `CONTENT_VERIFICATION.md` | all |
| 6 Design | Browser verification at 3 widths | 3 |
| 7 Accessibility | axe + manual keyboard/zoom/VoiceOver | 3, 9 |
| 8 Performance | `pnpm build` + Lighthouse + bundle analysis | 9 |
| 9 SEO | Metadata builder tests + JSON-LD validation | 2, 7 |
| 10 Forms | Vitest + Playwright form suite | 5 |
| 11 Analytics | GTM preview + DebugView | 7 |
| 12 CMS | Sanity auth + publish validation | 6 |
| 13 Migration | Crawl + redirect QA | 8 |
| 14 Automated verification | `pnpm verify` | every phase |
| 15 Browser verification | Playwright screenshots + manual | 3, 9 |

## 17. Phase 4 decisions

**Scope expanded to twelve routes, not ten.** `docs/11` scopes Phase 4 to the ten
commercial pages and leaves `/diagnostic` and `/contact` to Phase 5. Both were
pulled forward as bodies without forms. Every primary CTA on the site converts to
`/diagnostic`, and `/for-agencies` converts to `/contact`, so leaving either route
unbuilt would have meant either two dead ends or rewriting approved CTA copy. The
forms themselves remain Phase 5 and are blocked on `CONTENT_VERIFICATION.md` L1
and L3, which is a legal dependency rather than an engineering one.

**No FAQ sections.** Three approved pages carry a "FAQ topics" list of questions
with no answers. `docs/12` §6 and `AGENTS.md` forbid inventing them, so the
sections are omitted rather than shipped empty, and no `FAQPage` JSON-LD is
emitted. Registered as `CONTENT_VERIFICATION.md` Q1–Q3.

**Unbuilt routes are gated in one place.** Approved copy points at six Phase 6
editorial routes and two legal routes. Rather than editing the copy, each route
carries a `built` flag in `src/config/routes.ts`; `isBuilt` filters navigation,
footer columns, related-content lists, the 404 page, and the sitemap. Footer
columns with nothing built left — Research — hide entirely rather than render an
empty heading. Where a CTA's approved destination is unbuilt, `ctaHref` records
the canonical target and serves a working fallback, so the link reverts to its
intended destination the moment that route is marked built, with no copy change.
Registered as `CONTENT_VERIFICATION.md` R1–R7.

**Solution pages cross-link siblings, not research.** `docs/03` §6 asks each
solution page to link at least two relevant research pages. None exist yet, so
each links two or three sibling solutions instead. The unit suite asserts the
sibling minimum; the research requirement lands in Phase 6.

**Vercel Analytics is conditional.** `Analytics` and `SpeedInsights` render only
when `NEXT_PUBLIC_VERCEL_ENV` or `VERCEL` is set. Off-platform they 404 and the
browser rejects the response as `text/plain`, which put real console errors on
every page and made the "no console errors" assertion untestable locally.

**Wide tables need `min-w-0`.** The evidence-grade table on
`/solutions/search-impact-measurement` sets `min-w-[34rem]`, which became the
wrapper's min-content width and pushed its grid column past the viewport instead
of letting the scroll region take over. `min-w-0` on the wrapper is load-bearing,
not cosmetic.
