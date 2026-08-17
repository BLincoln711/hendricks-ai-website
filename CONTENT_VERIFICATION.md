# Content Verification Register

Nothing on this list may be published until its status is `approved` and an
approved source is recorded. Seeded from `templates/content-verification.csv` and
extended with items found while reading the approved copy in `content/pages/`.

Governing rules: `docs/12-CONTENT-GOVERNANCE.md` §6 (proof rules) and §7 (founder
claims), and `.cursor/rules/20-content-seo.mdc`.

## Status legend

- `pending` — not yet reviewed by Brandon
- `approved` — wording and source confirmed, safe to publish
- `blocked` — cannot publish; needs external permission or legal review

---

## Founder claims

| # | Claim | Proposed location | What must be verified | Status |
|---|---|---|---|---|
| F1 | "More than fifteen years inside search" | Homepage founder section, About | Exact start year and approved wording. `content/pages/01-home.md` flags this explicitly. | wording approved, start year pending |
| F2 | Homepage credibility line: "more than fifteen years of enterprise search, paid and organic acquisition, analytics, and search operating systems" | Homepage hero | The approved copy itself says "Verify the exact experience statement before publication." | wording approved, start year pending |
| F3 | SolarWinds title and dates | About | Exact title, start and end dates | approved |
| F4 | Merkle / Dentsu title and dates | About | Exact title, start and end dates, which entity | approved |
| F5 | Ahrefs advisory role | About | Current or former, approved wording | approved |
| F6 | University relationship | About | Institution, role, approved wording | pending |
| F7 | Speaking credentials | About | Named events and dates | pending |
| F8 | "Brandon personally architects Hendricks engagements" | Homepage founder section | Confirm this remains accurate as the firm scales | pending |
| F9 | Job title — "Search Intelligence Engineer" | Homepage, About, `Person` JSON-LD | Confirm this is the title to publish | approved |

### Resolution log — 2026-08-17

Source: the canonical career record in
`~/claudecode/CLAUDE-md-templates/brandon-facts.md` (confirmed by Brandon
2026-08-15), corroborated by the retired hendricks.ai `/about` page
(`~/Archive/archived-2026-06-03/Hendricks.AI/hendricks-ai-website/app/about/page.tsx`,
Nov 2025), which was publicly published under this positioning.

- F3 — **approved.** SolarWinds, **Global Search and Innovation Lead**,
  **Apr 2024 to Sep 2025**. Confirmed by Brandon 2026-08-17. Four competing
  titles existed for this one role: the LinkedIn header (published), the body
  text of that same entry ("Global Senior Search Lead"), "Global Director of
  Search" (`brandon-facts.md`), and "Director of Search" (retired Nov 2025
  site). The last three are rejected.
- F4 — **approved.** **Merkle**, **Global Paid Search Director**, **Jan 2022 to
  Dec 2023**. Confirmed by Brandon 2026-08-17. The title is paid-search
  specific; "Global Search Director" overstates scope and is not published.
  Recorded as a single employer, not "Merkle and Dentsu".

> **`brandon-facts.md` corrected 2026-08-17.** The canonical career record had
> the wrong title for both roles and no dates. It now carries the verbatim
> LinkedIn titles and dates plus the Ahrefs advisory entry. Any deliverable
> that reused the old titles is wrong and should be re-checked.

> **Coverage gap.** The three recovered LinkedIn entries span Jan 2022 onward
> only. They do not evidence F1/F2's "more than fifteen years", which depends on
> roles before 2022 that have not been recovered.
- F9 — **approved.** "Search Intelligence Engineer" was already the published
  founder title on the retired site, in both visible copy and `Person` JSON-LD.
- F1 / F2 — the "more than fifteen years" wording appeared on both retired
  pages and remains true, so it is safe to publish. The exact start year is
  still unrecorded. Note the phrase has been carried unchanged since Nov 2025
  and will understate the number over time; revisit when the start year lands.
- F5 — **approved.** Ahrefs Customer Advisory Board, Mar 2025 to Present, so
  **current**, not former. One of thirteen members. Source: LinkedIn.
- F6 — **still pending.** No university relationship appears on either retired
  page. Nothing recovered; this needs Brandon directly.
- F7 — **still pending.** The retired page listed speaking *topics* only, with
  no named event or date. That is the exact unsupported form F7 guards against.
- F8 — not addressed by the recovered sources.

C1 remains blocked and no client or employer logo is used. No client brand is
named in the experience section, including brands reached through a former
employer.

Per `docs/12` §7, where relationship context matters the copy must state whether
work occurred through employment, agency, consulting, or direct Hendricks
engagement.

## Client and brand assets

| # | Item | Proposed location | What must be verified | Status |
|---|---|---|---|---|
| C1 | Any client or employer logo | About, Results | Written permission and correct relationship context. A client name may not be used merely because Brandon worked with it through a former employer (`docs/12` §6). | blocked |
| C2 | Testimonials | Results | Attribution, role, relationship, written permission | blocked |
| C3 | Case study metrics | Results | Baseline, intervention, timeframe, measurement source, limitations, permission | blocked |

`showResults` stays `false` until at least two verified case studies exist, or one
verified case study plus one clearly labeled research experiment.

## Imagery

| # | Item | Proposed location | What must be verified | Status |
|---|---|---|---|---|
| I1 | Founder portrait | Homepage founder section, About | Approved original photograph and final alt text | pending |
| I2 | Portrait resolution ceiling | Homepage, About | **Known limitation.** Best available source is 1024×819 landscape, cropped to ~660×819. Founder columns are sized to ~380px so this covers 2×. Replace when a photographer re-export is available. No AI upscaling. | pending |
| I3 | Wordmark provenance | Global | Confirm Hendricks owns the wordmark artwork and typeface licensing permits web use as artwork | pending |

## External venture

| # | Item | Proposed location | What must be verified | Status |
|---|---|---|---|---|
| E1 | The Search Economy description | About page only, founder biography | Final approved description. Approved wording is in `docs/01` §13 and `docs/12` §8. | pending |

Hard constraints, from `docs/10` §2. The Search Economy must be absent from
Solutions, primary navigation, and the footer; must never be described as a
Hendricks research arm; must have no Hendricks route; must appear only in
Brandon's founder context on About; and must link externally to
`https://thesearcheconomy.com`.

The `check:content` script fails the build if any Search Economy reference appears
outside `/about`.

## Pricing claims

**Decided 2026-08-16 (Brandon): fees are disclosed in conversation, not published.**
This resolves P1–P3 and matches `docs/01` §15, which excludes a public pricing
calculator, and `docs/03` §2, which excludes a pricing nav item. `/diagnostic`
describes the fee as fixed and scope-based, and `/for-brands` lists engagement types
without amounts. A unit test asserts no currency figure reaches `/diagnostic`.

| # | Item | Proposed location | Decision | Status |
|---|---|---|---|---|
| P1 | Diagnostic fee | `/diagnostic` | Withheld. Page states a fixed fee set by scope rather than hours, and lists the eight scope factors that determine it. | resolved — withheld |
| P2 | 90-Day Program fee | `/for-brands` | Withheld. Engagement type described without an amount. | resolved — withheld |
| P3 | Managed Search Intelligence monthly fee | `/for-brands` | Withheld. Engagement type described without an amount. | resolved — withheld |

If this reverses, the figures live in `content/pages/07-diagnostic.md` and
`content/pages/09-for-brands.md` and would need re-transcribing into the content
objects; the guard test in `tests/unit/commercial-content.test.ts` would need
removing at the same time.

## Legal

| # | Item | Proposed location | What must be verified | Status |
|---|---|---|---|---|
| L1 | Privacy notice | `/privacy` | Approved copy supplied 2026-08-16 and published verbatim. Counsel review of the privacy language is still outstanding (docs/16 §14). | approved — pending counsel review |
| L2 | Website terms | `/terms` | Approved copy supplied 2026-08-16 and published verbatim. Venue resolved to Harris County, Texas by Brandon. Counsel review of liability and venue is still outstanding. | approved — pending counsel review |
| L3 | Form consent language | `/diagnostic`, `/contact`, `/privacy-request` | Resolved by `legal/01-FORM-AND-CONSENT-COPY.md`. Forms now carry a notice at collection and a separate, unticked marketing opt-in; submitting is not treated as consent to marketing. | approved |
| L4 | Cookie and consent banner | Global | Resolved by `docs/16`. Opt-in banner, Privacy Choices modal, Consent Mode v2 defaults, and Global Privacy Control support are built. No third-party CMP is used. | approved |
| L5 | AI crawler policy | `robots.ts` | `docs/06` §7 requires a separately approved policy for AI training versus search discovery. Not to be decided silently in code. | pending |
| L6 | `privacy@hendricks.ai` and `legal@hendricks.ai` | `/privacy`, `/terms`, `/privacy-request` | Both addresses are published in the legal copy. They must exist and be monitored before launch. | blocked — mailboxes not confirmed |
| L7 | Vendor list, CRM provider, and retention settings | `/privacy` §"Additional U.S. State Disclosures" and §"How We Share" | The notice describes categories rather than named vendors. Confirm the actual processors, the CRM, and the retention periods match what is written. | pending |
| L8 | Privacy request workflow | `/privacy-request` | Requests are validated, rate limited, and given a case reference, but delivery is stubbed pending a mailbox. Confirm who works the queue and the response deadline. | blocked on L6 |

## Unanswered FAQ topics

Three approved pages carry a "FAQ topics" list: questions without answers.
`docs/12` §6 and `AGENTS.md` forbid inventing the answers, so none of these
sections are rendered and no `FAQPage` JSON-LD is emitted. Each needs approved
answers before it can ship.

| # | Source | Proposed location | Topics | Status |
|---|---|---|---|---|
| Q1 | `content/pages/03-search-demand-intelligence.md` §"FAQ topics" | `/solutions/search-demand-intelligence` | 5 questions, incl. how demand is estimated when AI prompts are not publicly reported | pending |
| Q2 | `content/pages/04-selection-intelligence.md` §"FAQ topics" | `/solutions/selection-intelligence` | 6 questions, incl. personalization handling and which AI systems are tested | pending |
| Q3 | `content/pages/06-search-impact-measurement.md` §"FAQ topics" | `/solutions/search-impact-measurement` | 6 questions, incl. correlation versus causation and self-reported attribution | pending |

Q2's "Is this the same as AI rank tracking?" and Q3's correlation-versus-causation
question are category-defining answers. Both carry the risk of overclaiming, so
their wording needs the same scrutiny as a metric definition.

## SEO copy

| # | Item | Proposed location | What must be verified | Status |
|---|---|---|---|---|
| S1 | Two approved title tags exceed the width Google renders | `/solutions` (85 chars), `/diagnostic` (78 chars) | Both are transcribed verbatim from the approved copy and are published as written. Confirm whether to shorten them or accept SERP truncation. | pending |
| S2 | `/how-it-works` title ends "\| How It Works" rather than "\| Hendricks" | `/how-it-works` | The only page whose approved title does not close on the brand. Confirm intentional. | pending |

## Internal links to unbuilt routes

Nothing links to a 404: `src/config/routes.ts` marks each unbuilt route
`built: false`, navigation and related-content lists filter on it, and CTAs whose
approved destination is unbuilt fall back through `ctaHref`.

Four of the six editorial routes shipped in Phase 6. Their references resolved
automatically — no copy changed, because the approved destinations were recorded
in the content objects from the start and the gate simply opened.

| # | Approved destination | Referenced from | Current behaviour | Status |
|---|---|---|---|---|
| R1 | `/methodology` | All four solution pages, `/how-it-works`, `/diagnostic`, `/for-agencies`, `/ai-selection-problem`, homepage measurement CTA, footer | Live. Homepage CTA reverted from its `/solutions/search-impact-measurement` fallback | resolved |
| R2 | `/what-is-selection-intelligence` | `/solutions/selection-intelligence`, `/solutions/search-impact-measurement`, homepage distinction CTA, footer | Live. Homepage CTA reverted from its `/solutions/selection-intelligence` fallback | resolved |
| R3 | `/what-is-search-intelligence-engineering` | `/solutions/search-demand-intelligence`, `/solutions/search-presence-engineering`, footer | Live | resolved |
| R4 | `/ai-selection-problem` | `/solutions/selection-intelligence`, footer | Live | resolved |
| R5 | `/research` | Footer, 404 page | Footer column now renders the four definition pages and omits the hub | blocked on Sanity credentials |
| R6 | `/corrections` | Footer legal row | Filtered | blocked — no approved copy exists for this route |
| R7 | `/privacy`, `/terms` | Footer legal row, both form notices, consent banner and modal | Live | resolved |
| R8 | `/privacy-request` | Footer legal row, `/privacy` | Live, and deliberately excluded from the sitemap and from indexing (docs/16 §9). It is a destination for people who already have a reason to be there, not a search result. | resolved |

`docs/03` §6 asks each solution page to link at least two relevant research pages.
That is now satisfied on all four, and a unit test enforces it. Two of them —
`/solutions/search-presence-engineering` and `/solutions/search-impact-measurement`
— shipped Phase 4 with only one editorial link and were corrected in Phase 6.

## Definition page review dates

The four definition pages each publish a "last reviewed" date, because a reader
cannot judge whether a definition is current without one (`docs/03`, definition
page template). The date is stored in each content object as `sources.reviewed`.

| # | Item | Current value | What must be confirmed | Status |
|---|---|---|---|---|
| D1 | Last-reviewed date on all four definition pages | 2026-08-16 | This is the date the approved copy was transcribed, not a date Brandon reviewed the substance. Either confirm it or supply the real review date. | pending |
| D2 | Who owns the review cycle and how often | not stated | The pages claim to be revised as platform behaviour changes. Decide the interval, or soften the claim. | pending |

## Organization structured data

Per `docs/06` §8, these `Organization` fields may only be emitted once verified:

| # | Field | Status |
|---|---|---|
| O1 | Founding date | pending |
| O2 | Public business address | pending |
| O3 | Public contact point | pending |
| O4 | `sameAs` official profiles | pending |

Until approved, the homepage `Organization` node emits only name, URL, logo, and
founder.
