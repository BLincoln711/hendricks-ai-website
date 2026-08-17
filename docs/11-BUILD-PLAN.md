# 11 — Build Plan

Cursor must convert this into `IMPLEMENTATION_PLAN.md` with actual file paths and status tracking.

## Phase 0 — Discovery and safeguards

### HEN-0001 Read and reconcile the handoff

- Read every handoff file.
- Identify conflicts and resolve through the source-of-truth hierarchy.
- Record assumptions.
- List missing real assets and credentials.

### HEN-0002 Inventory the existing site

- Crawl current Hendricks.ai.
- Export routes and metadata.
- Create the initial redirect map.
- Preserve output outside the public repository if it contains sensitive data.

### HEN-0003 Verify claims

- Create `CONTENT_VERIFICATION.md`.
- List founder titles, dates, client names, logos, testimonials, and metrics that require approval.
- Do not publish unverified claims.

## Phase 1 — Project foundation

### HEN-0101 Scaffold Next.js

- App Router
- TypeScript strict
- pnpm
- Tailwind
- ESLint
- source directory and alias

### HEN-0102 Add Cursor and repository rules

- Root `AGENTS.md`
- `.cursor/rules`
- `.cursorignore`
- `.env.example`

### HEN-0103 Add UI and fonts

- shadcn with Radix
- Geist Sans and Mono
- Lucide
- base tokens
- focus styles
- reduced-motion utilities

### HEN-0104 Add quality tooling

- Vitest
- React Testing Library
- Playwright
- axe
- scripts
- CI workflow if repository uses GitHub

## Phase 2 — Design system and shell

### HEN-0201 Build primitives

- Container
- Section
- SectionHeading
- Button variants
- Link treatment
- Card treatments
- Data table
- Callout
- Quote
- Badge

### HEN-0202 Build layout

- Header
- Desktop nav
- Mobile nav
- Footer
- Breadcrumbs
- Skip link
- page shell

### HEN-0203 Build visual language

- SignalDot
- grid lines
- query labels
- diagram nodes
- evidence states
- selection states

### HEN-0204 Create route metadata system

- site config
- route config
- metadata builder
- JSON-LD helper
- OG image system

## Phase 3 — Homepage

### HEN-0301 Hero

- Approved copy
- CTA tracking
- Selection Map
- illustrative label
- reduced-motion state

### HEN-0302 Problem and journey

- Traditional versus AI flow
- full selection path

### HEN-0303 What Hendricks does

- Four business questions
- outputs

### HEN-0304 Four solutions

- Distinct layouts and links

### HEN-0305 Selection Intelligence and methodology

- stage table
- Demand-to-Selection path

### HEN-0306 Outputs, measurement, audiences, founder, CTA

- No unverified proof
- Do not mention The Search Economy on the homepage; keep the external founder reference on About only

### HEN-0307 Homepage QA

- Responsive
- keyboard
- reduced motion
- analytics
- performance

## Phase 4 — Commercial pages

### HEN-0401 Solutions overview
### HEN-0402 Search Demand Intelligence
### HEN-0403 Selection Intelligence
### HEN-0404 Search Presence Engineering
### HEN-0405 Search Impact Measurement
### HEN-0406 How It Works
### HEN-0407 For Brands
### HEN-0408 For Agencies
### HEN-0409 About
### HEN-0410 Contact

For each:

- Approved copy
- Metadata
- Breadcrumbs
- JSON-LD
- Responsive QA
- Related links
- CTA tracking

## Phase 5 — Diagnostic and lead system

### HEN-0501 Form UX

- Brand/agency route
- fields
- validation
- errors
- success

### HEN-0502 Lead service

- Zod schema
- honeypot
- timing
- rate limit
- optional Turnstile
- email adapter
- CRM webhook adapter

### HEN-0503 Attribution capture

- UTM
- landing page
- referrer
- click IDs when approved

### HEN-0504 Form tests

- valid
- invalid
- spam
- rate limit
- provider failure
- accessibility

## Phase 6 — Editorial system

### HEN-0601 Sanity setup

- Studio
- schemas
- typed queries
- preview
- revalidation

### HEN-0602 Research hub

- index
- pagination
- article card
- categories

### HEN-0603 Article template

- direct answer
- findings
- body
- methodology
- limitations
- sources
- author
- related solution

### HEN-0604 Definition pages

- Search Intelligence Engineering
- Selection Intelligence
- AI Selection Problem
- Methodology

These may be version-controlled at launch or seeded into Sanity, but their visible copy must remain approved.

### HEN-0605 Results feature

- Build schema and route
- Keep disabled
- Add publishing validation

## Phase 7 — Analytics and SEO

### HEN-0701 GTM and data layer
### HEN-0702 Typed event helpers
### HEN-0703 Vercel Analytics and Speed Insights
### HEN-0704 Sitemap, robots, manifest
### HEN-0705 JSON-LD validation
### HEN-0706 Internal links and breadcrumbs
### HEN-0707 Staging noindex

## Phase 8 — Migration

### HEN-0801 Final route map
### HEN-0802 Redirect implementation
### HEN-0803 Prelaunch crawl
### HEN-0804 Search Console and sitemap readiness

## Phase 9 — Verification

### HEN-0901 Automated checks

- lint
- typecheck
- unit
- build
- e2e
- axe
- links
- content

### HEN-0902 Browser verification

- Desktop
- Tablet
- Mobile
- Safari
- Chrome
- Firefox
- Screenshots
- Console

### HEN-0903 Performance review

- Lighthouse
- bundle analysis
- LCP
- CLS
- script review

### HEN-0904 Final release report

Create `RELEASE_REPORT.md` with:

- Route status
- Tests
- Accessibility
- Performance
- Form delivery
- Analytics
- SEO
- Migration
- Missing credentials/assets
- Known limitations
- Rollback notes


## Privacy and legal phase

Before enabling production analytics or forms:

1. Implement `/privacy`, `/terms`, and `/privacy-request`.
2. Replace all bracketed legal placeholders.
3. Create and monitor `privacy@hendricks.ai` and `legal@hendricks.ai`.
4. Implement the global consent banner and Privacy Choices modal.
5. Implement basic Google Consent Mode v2.
6. Keep all optional analytics disabled until consent.
7. Remove the required privacy-consent checkbox from inquiry forms.
8. Add the approved notice at collection and optional marketing checkbox.
9. Configure privacy-request workflow, deadlines, verification, appeal, and processor deletion.
10. Obtain legal review against actual vendors and practices.

Do not enable `NEXT_PUBLIC_ENABLE_OPTIONAL_ANALYTICS=true` until the consent network tests pass.
