# 10 — Acceptance Criteria

This document is the release gate. “Looks good” is not sufficient.

## 1. Product and positioning

- [ ] Homepage identifies Hendricks as a Search Intelligence Engineering firm above the fold.
- [ ] Category line is correct.
- [ ] Operating line is correct.
- [ ] The AI Selection Problem is explained clearly.
- [ ] The site answers “What do you actually do?” through four solutions and tangible outputs.
- [ ] The primary direct-client CTA is the Search Intelligence Diagnostic.
- [ ] For Brands and For Agencies paths are distinct.
- [ ] No page presents Hendricks as a generic AI-agent agency.
- [ ] No page presents a self-service platform that does not exist.
- [ ] No guaranteed citation, ranking, recommendation, or revenue language appears.

## 2. The Search Economy separation

- [ ] The Search Economy is absent from Solutions.
- [ ] It is absent from primary navigation and footer.
- [ ] It is not called a Hendricks research arm.
- [ ] No Hendricks route is created for it.
- [ ] It appears only in Brandon's founder context, if included.
- [ ] The external link points to `https://thesearcheconomy.com`.
- [ ] The description identifies it as an independent publication focused on Google Trends data.

## 3. Routes

- [ ] Every required route exists.
- [ ] Every required route returns 200 in production mode.
- [ ] Results is hidden or unavailable while the feature flag is false.
- [ ] Studio and preview routes are noindex.
- [ ] Custom 404 works.
- [ ] Error states render without exposing stack traces.

## 4. Navigation

- [ ] Desktop navigation matches the approved hierarchy.
- [ ] Mobile navigation is keyboard accessible.
- [ ] Focus is trapped and restored in the mobile menu.
- [ ] Active/current state is communicated.
- [ ] All internal links resolve.
- [ ] No ambiguous “Learn More” primary CTAs remain.

## 5. Copy and evidence

- [ ] Approved page copy is used.
- [ ] No lorem ipsum or generic placeholder copy appears.
- [ ] No fake client logo, testimonial, metric, dashboard, citation, or result appears.
- [ ] Illustrative interfaces are labeled.
- [ ] Founder credentials are verified before publication.
- [ ] Case-study routes remain hidden until proof requirements are met.
- [ ] Research articles include methodology and limitations when data-driven.

## 6. Design

- [ ] Design uses approved palette and typography.
- [ ] Geist Sans and Geist Mono load without layout shift.
- [ ] The signal dot is restrained and consistent.
- [ ] Hero Selection Map is responsive and understandable.
- [ ] No generic AI imagery appears.
- [ ] No horizontal overflow at 320px.
- [ ] Cards, diagrams, and tables remain readable on mobile.
- [ ] Hover and focus states are coherent.
- [ ] Reduced-motion mode removes nonessential motion.

## 7. Accessibility

- [ ] WCAG 2.2 AA is the target and manual review is completed.
- [ ] Skip link works.
- [ ] One primary main landmark per page.
- [ ] Unique, descriptive page titles.
- [ ] Logical headings.
- [ ] All controls have accessible names.
- [ ] All form fields have visible labels.
- [ ] Error summary and inline errors work.
- [ ] Focus indicators are visible.
- [ ] Touch targets meet minimum size.
- [ ] Color is not the only signal.
- [ ] Images have accurate alt behavior.
- [ ] Diagrams have text equivalents.
- [ ] No serious or critical axe violations.
- [ ] Keyboard-only journey passes.

## 8. Performance

- [ ] Production build completes.
- [ ] Homepage initial client JS is within budget or variance is documented.
- [ ] Images use responsive optimization.
- [ ] LCP element is identified and optimized.
- [ ] No autoplay hero video.
- [ ] No unnecessary large animation dependency.
- [ ] Mobile Lighthouse performance is at least 90 on key routes in a controlled test.
- [ ] Vercel Speed Insights is enabled for production.
- [ ] No visible layout shift from fonts, hero, or diagrams.

## 9. SEO

- [ ] Each indexable route has unique title and description.
- [ ] One H1 per page.
- [ ] Canonicals are absolute and correct.
- [ ] OG images and social metadata render.
- [ ] `sitemap.ts` contains only indexable production URLs.
- [ ] `robots.ts` is environment-aware.
- [ ] Breadcrumbs and BreadcrumbList schema match.
- [ ] JSON-LD is sanitized and validates.
- [ ] No fake reviews or aggregate ratings.
- [ ] Research articles include author and dates.
- [ ] Staging is noindex.

## 10. Forms

- [ ] Diagnostic form validates client- and server-side.
- [ ] Required fields are correct.
- [ ] Honeypot and rate limiting work.
- [ ] Optional Turnstile can be enabled without redesign.
- [ ] Success state is accessible.
- [ ] Error state is accessible.
- [ ] Email delivery is verified.
- [ ] CRM webhook delivery is verified when configured.
- [ ] UTM, landing page, and referrer are captured.
- [ ] No PII is sent to analytics.
- [ ] The site never reports success when every delivery destination failed.

## 11. Analytics

- [ ] GTM loads once.
- [ ] GA4 page views are not duplicated.
- [ ] Event names match the taxonomy.
- [ ] Events fire once per action.
- [ ] No free-text or personal information appears in DebugView.
- [ ] Preview/staging traffic is labeled or excluded.
- [ ] Vercel Analytics is enabled.
- [ ] Primary CTA and form funnel are measurable.

## 12. CMS

- [ ] Sanity Studio is accessible only through authentication.
- [ ] Research article schema matches requirements.
- [ ] Case-study approval validation prevents unapproved publication.
- [ ] Queries are typed.
- [ ] Draft mode is secret-protected.
- [ ] Preview is noindex.
- [ ] Revalidation works after publish.
- [ ] No fake case studies are seeded.

## 13. Migration

- [ ] Current URL inventory exists.
- [ ] Redirect map is approved.
- [ ] High-value old URLs are tested.
- [ ] No blanket homepage redirects.
- [ ] Redirects are one hop.
- [ ] New sitemap is submitted.
- [ ] Production crawl has no critical errors.

## 14. Automated verification

- [ ] `pnpm lint` passes.
- [ ] `pnpm typecheck` passes.
- [ ] `pnpm test` passes.
- [ ] `pnpm build` passes.
- [ ] `pnpm test:e2e` passes.
- [ ] Link checker passes.
- [ ] Content validator passes.

## 15. Browser verification

Verify at minimum:

- [ ] 1440×900
- [ ] 1024×768
- [ ] 390×844
- [ ] Safari desktop
- [ ] Chrome desktop
- [ ] Firefox desktop
- [ ] Mobile emulation

For every primary route:

- [ ] Page is not blank.
- [ ] No error overlay.
- [ ] No console errors.
- [ ] Key content renders.
- [ ] Navigation works.
- [ ] Screenshot is captured.


## Privacy and consent acceptance

- `/privacy`, `/terms`, and `/privacy-request` are complete and responsive.
- No legal placeholder is visible in production.
- Inquiry forms do not require bundled privacy consent.
- Approved notice at collection is visible before submit.
- Optional marketing consent is unchecked and non-blocking.
- No phone or file-upload field exists at launch.
- No optional analytics request occurs before consent.
- Google Consent Mode v2 defaults to denied.
- Advertising consent remains denied.
- GPC keeps optional analytics denied.
- Reject and accept have equal prominence and equal interaction cost.
- Privacy Choices is available in the footer on every route.
- Withdrawal stops future optional analytics.
- No personal information appears in analytics, URLs, or generic telemetry.
- Privacy request supports access, correction, deletion, portability, objection, opt-out, and appeal.
- Privacy inboxes are monitored.
- Actual vendor list and retention settings match the Privacy Notice.
- Counsel has reviewed the final entity, venue, liability, and privacy copy.
