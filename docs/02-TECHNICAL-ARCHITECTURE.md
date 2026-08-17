# 02 — Technical Architecture

## 1. Architecture decision

Build a **server-rendered Next.js marketing site** with a hybrid content model:

- Approved commercial copy lives in version control.
- Research articles and verified case studies live in Sanity.
- The app is deployed to Vercel.
- Lead forms submit through server-side code to email and an optional CRM webhook.
- Analytics is implemented through a typed event layer.

This architecture prioritizes speed, accessibility, source control, editorial quality, and low operational complexity.

## 2. Recommended stack

Use current stable releases available at build time and record exact versions in `pnpm-lock.yaml`.

### Runtime and framework

- Current active Node.js LTS
- Next.js App Router
- React
- TypeScript with `strict: true`
- pnpm

### Styling and UI

- Tailwind CSS
- shadcn/ui using Radix primitives
- Geist Sans and Geist Mono via the `geist` package
- Lucide icons
- CSS custom properties for design tokens

### Content

- Version-controlled typed content for marketing pages
- Sanity Content Lake and Studio for research and verified case studies
- `next-sanity`
- Portable Text renderer for rich editorial content
- Optional Sanity Visual Editing for CMS-managed pages only

### Forms and validation

- Zod
- React Hook Form when needed
- Server Action or Route Handler with server-side validation
- Resend email adapter
- Optional CRM webhook adapter
- Rate limiting adapter
- Optional Cloudflare Turnstile adapter

### Analytics and monitoring

- Google Tag Manager
- Google Analytics 4
- Vercel Web Analytics
- Vercel Speed Insights
- Structured server logs with no unnecessary personal data

### Testing

- Vitest
- React Testing Library
- Playwright
- `@axe-core/playwright`
- Optional Lighthouse CI

## 3. Initialization commands

Cursor should verify current CLI syntax before execution. A reasonable starting sequence is:

```bash
pnpm create next-app@latest hendricks-ai --yes
cd hendricks-ai

pnpm add geist lucide-react zod react-hook-form @hookform/resolvers
pnpm add @vercel/analytics @vercel/speed-insights
pnpm add next-sanity sanity @sanity/vision @sanity/visual-editing @portabletext/react
pnpm add resend

pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test @axe-core/playwright

npx shadcn@latest init -d --base radix
npx shadcn@latest add button sheet accordion input textarea select form label badge separator dialog navigation-menu tabs
```

Do not install every shadcn component. Add only the components the design uses.

## 4. Repository structure

```text
hendricks-ai/
├── .cursor/
│   └── rules/
├── public/
│   ├── brand/
│   ├── images/
│   └── social/
├── sanity/
│   ├── schemaTypes/
│   │   ├── article.ts
│   │   ├── author.ts
│   │   ├── caseStudy.ts
│   │   ├── category.ts
│   │   ├── methodology.ts
│   │   └── index.ts
│   ├── structure.ts
│   └── sanity.config.ts
├── scripts/
│   ├── validate-content.ts
│   ├── check-links.ts
│   └── generate-redirects.ts
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx
│   │   │   ├── solutions/
│   │   │   ├── diagnostic/
│   │   │   ├── how-it-works/
│   │   │   ├── for-brands/
│   │   │   ├── for-agencies/
│   │   │   ├── results/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── layout.tsx
│   │   ├── (editorial)/
│   │   │   ├── research/
│   │   │   ├── what-is-search-intelligence-engineering/
│   │   │   ├── what-is-selection-intelligence/
│   │   │   └── ai-selection-problem/
│   │   ├── api/
│   │   │   ├── leads/route.ts
│   │   │   ├── draft-mode/enable/route.ts
│   │   │   └── draft-mode/disable/route.ts
│   │   ├── studio/[[...tool]]/page.tsx
│   │   ├── error.tsx
│   │   ├── global-error.tsx
│   │   ├── not-found.tsx
│   │   ├── layout.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── manifest.ts
│   │   └── opengraph-image.tsx
│   ├── components/
│   │   ├── analytics/
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── seo/
│   │   ├── visuals/
│   │   └── ui/
│   ├── config/
│   │   ├── navigation.ts
│   │   ├── routes.ts
│   │   ├── site.ts
│   │   └── feature-flags.ts
│   ├── content/
│   │   ├── pages/
│   │   ├── faqs/
│   │   └── index.ts
│   ├── lib/
│   │   ├── analytics/
│   │   ├── env/
│   │   ├── forms/
│   │   ├── leads/
│   │   ├── rate-limit/
│   │   ├── sanity/
│   │   ├── seo/
│   │   └── utils/
│   ├── styles/
│   │   └── globals.css
│   └── types/
├── tests/
│   ├── e2e/
│   ├── unit/
│   └── fixtures/
├── .cursorignore
├── .env.example
├── AGENTS.md
├── next.config.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── vitest.config.ts
```

## 5. Rendering strategy

### Static/server-rendered by default

The marketing site is primarily public content. Prefer static generation or cached Server Component rendering.

- Marketing pages: static or build-time generated.
- Definition pages: static.
- Research index: cached Sanity query.
- Article pages: generated from Sanity slugs with on-demand or tagged revalidation.
- Case studies: hidden from navigation until verified; cached when enabled.
- Forms: server-side submission.

### Client components are limited to

- Mobile navigation
- Accessible accordion state
- Form interaction
- Analytics event dispatch
- Small Selection Map interaction
- Optional filters on the research hub
- Sanity Visual Editing overlay in draft mode

Do not turn page shells into client components.

## 6. Content implementation

### Marketing content

Create typed page-content objects, for example:

```ts
export type PageHeroContent = {
  eyebrow?: string
  title: string
  lead: string
  primaryCta?: Cta
  secondaryCta?: Cta
  proof?: string
}
```

Each route imports approved content and passes it to reusable sections. Keep copy separate from component markup so it can be reviewed without editing TSX.

### Editorial content

Sanity manages:

- Articles
- Authors
- Research categories
- Methodology documents
- Verified case studies

Do not put the complete marketing website into a generic Sanity page builder at launch.

## 7. Shared components

### Layout

- `SiteHeader`
- `DesktopNavigation`
- `MobileNavigation`
- `SiteFooter`
- `PageShell`
- `Section`
- `Container`
- `Breadcrumbs`

### Content

- `PageHero`
- `SectionHeading`
- `DefinitionBlock`
- `DirectAnswer`
- `Callout`
- `QuoteBlock`
- `DataTable`
- `FeatureList`
- `FaqAccordion`
- `ArticleCard`
- `CaseStudyCard`
- `AuthorCard`

### Hendricks visuals

- `SignalDot`
- `SelectionMap`
- `TraditionalVsAiFlow`
- `DemandToSelectionPath`
- `SelectionStageTable`
- `ContextPanelDiagram`
- `EvidenceGradeMatrix`
- `InterventionLedgerPreview`
- `ImpactMeasurementStack`

### Conversion

- `PrimaryCta`
- `DiagnosticApplicationForm`
- `AgencyInquiryForm`
- `ContactForm`
- `FormStatus`

## 8. Component principles

- Components accept structured data and render semantic markup.
- Avoid one universal `SectionRenderer` with dozens of conditionals.
- Use composition for page-specific layouts.
- Keep visual components accessible without animation.
- Do not use Canvas for content-bearing visuals; prefer HTML and SVG.
- All charts and diagrams require text equivalents.
- All tables must be responsive without becoming unreadable.

## 9. Environment variables

See `templates/env.example`.

Required for production:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_VERCEL_ENV`
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION`
- `SANITY_READ_TOKEN` only if private/draft content requires it
- `SANITY_PREVIEW_SECRET`
- `RESEND_API_KEY`
- `LEAD_FROM_EMAIL`
- `LEAD_NOTIFICATION_EMAIL`

Optional:

- `CRM_WEBHOOK_URL`
- `CRM_WEBHOOK_SECRET`
- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- rate-limit provider credentials

Every environment variable must be parsed and validated in a server-only `env` module. Public variables must be explicitly prefixed.

## 10. Lead architecture

Create a `LeadService` interface:

```ts
export interface LeadService {
  submit(input: LeadInput): Promise<LeadSubmissionResult>
}
```

The implementation should:

1. Validate input.
2. Verify honeypot and submission timing.
3. Verify Turnstile when configured.
4. Rate-limit by a privacy-conscious key.
5. Normalize and sanitize strings.
6. Send a notification email.
7. Post to the CRM webhook when configured.
8. Return a generic public success response.
9. Log delivery status without logging full sensitive message text.

Do not expose provider-specific code throughout the UI.

## 11. Error handling

- Custom 404 page with useful navigation.
- Segment error boundaries.
- Global error boundary.
- Form errors displayed inline and in an accessible summary.
- External integration failures logged server-side.
- The user receives a clear retry path without stack traces.
- Do not silently discard lead submissions.

## 12. Feature flags

Create typed server-side feature flags:

```ts
export const features = {
  showResults: false,
  showNewsletter: false,
  enableSanityVisualEditing: true,
  enableTurnstile: false,
} as const
```

`showResults` remains false until at least two verified case studies or one verified case study plus one clearly labeled research experiment exists.

## 13. Security basics

- No secrets in the browser bundle.
- No real secrets in git, logs, screenshots, or Cursor context.
- Validate and limit every form field.
- Use safe serialization for JSON-LD.
- Add security headers.
- Start CSP in report-only mode if Sanity preview and analytics make immediate enforcement risky.
- Restrict Sanity Studio access through Sanity authentication.
- Protect draft-mode endpoints with a secret.
- Disable indexing for preview and staging environments.

## 14. Package scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "sanity:typegen": "sanity schema extract && sanity typegen generate",
    "check:links": "tsx scripts/check-links.ts",
    "check:content": "tsx scripts/validate-content.ts",
    "verify": "pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e"
  }
}
```

Adjust only when current framework tooling requires it.
