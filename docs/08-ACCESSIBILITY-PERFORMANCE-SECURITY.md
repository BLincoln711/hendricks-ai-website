# 08 — Accessibility, Performance, and Security

## 1. Accessibility target

Target **WCAG 2.2 AA**.

Automated checks are necessary but insufficient. Perform keyboard, screen-reader-oriented, zoom, motion, and content-structure reviews.

## 2. Accessibility requirements

### Semantics

- One primary `<main>` landmark.
- Proper header, nav, main, aside, and footer landmarks.
- Logical heading order.
- Real buttons for actions and real links for navigation.
- Tables use captions, headers, and scope where appropriate.
- Definition lists are used for term/definition content when appropriate.

### Navigation

- Skip link appears on focus.
- Keyboard users can access every control.
- Focus order matches visual order.
- Focus is trapped and restored in mobile navigation/dialogs.
- Current navigation state is identified.
- Client-side route changes have unique document titles and H1s.

### Forms

- Visible labels.
- Required fields communicated textually.
- Error summary and inline errors.
- Success announcements.
- Autocomplete tokens where appropriate.
- No placeholder-only labels.

### Visual

- AA contrast.
- Visible focus ring.
- 200% zoom without loss of function.
- Reflow at narrow widths.
- Touch targets at least 44×44px.
- Color is never the only signal.

### Motion

- Honor `prefers-reduced-motion`.
- No flashing content.
- No essential meaning conveyed only by animation.
- User can pause any long-running motion.

### Media

- Accurate alt text.
- Decorative images use empty alt.
- Captions/transcripts for video when added.
- Charts and diagrams have text summaries.

## 3. Accessibility testing

### Automated

- ESLint accessibility rules
- axe in Playwright
- Lighthouse accessibility

### Manual

- Keyboard-only navigation
- Safari + VoiceOver spot check
- 200% and 400% zoom spot check
- Reduced-motion mode
- Windows High Contrast or forced-colors spot check where available
- Mobile screen reader spot check when practical

No serious or critical axe violations are allowed at launch.

## 4. Performance targets

### Real-user targets at p75

- LCP <= 2.5 seconds
- INP <= 200 milliseconds
- CLS <= 0.1

### Lighthouse targets for primary routes

- Performance >= 90 mobile
- Accessibility >= 95
- Best Practices >= 95
- SEO >= 95

Lighthouse scores are diagnostic targets, not substitutes for field data.

## 5. Performance budgets

Suggested launch budgets:

- Initial client JavaScript for homepage: target <= 180 KB compressed
- No single decorative image above 250 KB without justification
- Hero LCP image: responsive, optimized, and preloaded only when actually the LCP element
- Fonts self-hosted through the Geist package/Next font loading
- No autoplay background video in the hero
- No third-party chat widget
- No animation framework solely for fades

## 6. Next.js performance practices

- Server Components by default.
- Parallelize independent data fetching.
- Keep CMS queries focused.
- Use `next/image` with correct `sizes`.
- Use static generation/caching for public content.
- Defer analytics and nonessential third-party scripts.
- Dynamically import genuinely heavy interactive visuals.
- Avoid passing large server objects into client components.
- Avoid duplicate icon or utility libraries.
- Run bundle analysis before launch.

## 7. Core Web Vitals monitoring

- Enable Vercel Speed Insights.
- Monitor mobile and desktop separately.
- Segment by route.
- Review after launch and after major visual changes.
- Create an owner for performance regressions.

## 8. Security headers

Configure and test:

- `Strict-Transport-Security` in production
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling unused camera, microphone, geolocation, and payment features
- Content Security Policy, initially report-only if integration compatibility is uncertain
- `frame-ancestors` compatible with approved Sanity preview behavior

Do not blindly copy a CSP without testing analytics, Sanity, images, and form integrations.

## 9. Data security

- Secrets remain server-only.
- `.env*` is excluded in `.cursorignore` and git, except `.env.example`.
- Do not print environment values in logs or screenshots.
- Validate all external webhook URLs and secrets.
- Limit server logs containing personal data.
- Sanitize untrusted CMS content and JSON-LD.
- Keep dependencies patched.
- Pin through lockfile.

## 10. Dependency review

Before launch:

- Run package audit.
- Remove unused packages.
- Review Next.js and React security advisories.
- Confirm no canary or preview package is used unintentionally.
- Record any accepted risk.

## 11. Browser support

Support current evergreen releases of:

- Chrome
- Edge
- Firefox
- Safari

Test at least:

- Safari on macOS/iOS
- Chrome on Android or emulation
- Chrome desktop
- Firefox desktop

## 12. Graceful degradation

Without JavaScript:

- Core content is readable.
- Navigation works through normal links.
- CTA links work.
- Diagrams have text equivalents.
- Forms may require JavaScript only when necessary, but provide a clear fallback message or server-rendered submission path.
