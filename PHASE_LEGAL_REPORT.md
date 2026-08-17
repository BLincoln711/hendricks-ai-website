# Privacy, Consent, and Legal Verification Report

Scope: `docs/16-PRIVACY-CONSENT-AND-LEGAL-IMPLEMENTATION.md` and
`legal/01-FORM-AND-CONSENT-COPY.md`. Nineteen routes are now built.

Routes added: `/privacy`, `/terms`, `/privacy-request`.

This closes L1–L4 in `CONTENT_VERIFICATION.md`, which were the items blocking
Phase 5. The Diagnostic and Contact forms can now be built against a settled legal
model rather than a guess at one.

## Automated verification

| Gate | Result | Phase 6 |
|---|---|---|
| `pnpm lint` | Pass, 0 errors, 0 warnings | same |
| `pnpm typecheck` | Pass | same |
| `pnpm check:content` | Pass, 137 source files clean | 107 |
| `pnpm check:links` | Pass, 19 built routes have a page and an OG image, 26 navigation links resolve | 16 routes, 23 links |
| `pnpm test` | Pass, 271 tests across 7 files | 206 across 5 |
| `pnpm build` | Pass, 42 routes prerendered static, 1 dynamic | 39 static |
| `pnpm test:e2e` | Pass, 953 passed, 2 skipped | 683 passed |

The 2 skips are unchanged since Phase 3: keyboard skip-link traversal on WebKit and
mobile. The 1 dynamic route is `/privacy-request`, which is deliberate — see below.

## Browser verification

Nineteen routes captured at 1440, 1024, and 390 px, plus a 320 px overflow sweep.
No horizontal overflow, no console errors, no failed requests, and exactly one `h1`
per route at every width. Screenshots in `.screens/legal/`.

## What was built

**Consent.** An opt-in banner, a Privacy Choices modal reachable from the footer on
every route, Google Consent Mode v2 defaults queued ahead of any tag, versioned
storage with a 180-day expiry, and Global Privacy Control support. Vercel Analytics
and Speed Insights now mount only after an explicit grant, behind a master
`NEXT_PUBLIC_ENABLE_OPTIONAL_ANALYTICS` flag that is off by default.

**Legal pages.** The Privacy Notice and Terms of Use are transcribed verbatim into
typed block structures and rendered by a shared `LegalDocument`, which gives each
document a linked contents list, machine-readable dates, and stable section
anchors. Venue is Harris County, Texas; effective and last-updated dates are
2026-08-16, both per Brandon's decision.

**Privacy requests.** `/privacy-request` collects a request without requiring an
account, a phone number, a file upload, or a CAPTCHA. It is validated with Zod on
the server, defended by a honeypot, a minimum elapsed time, and a rate limit, and
returns a case reference. Delivery is stubbed pending a mailbox.

**Form legal model.** Contact and Diagnostic now carry a notice at collection and a
separate, unticked marketing opt-in. Submitting a form is no longer treated as
consent to marketing, and the confirmation copy no longer implies a subscription.

## Defects found and fixed

**The consent banner covered the bottom of every page.** It is fixed to the
viewport bottom, so the last stretch of every route sat underneath it permanently.
On a 390 px viewport that was enough to swallow the privacy request form's submit
button — the form was genuinely unusable on a phone until a decision was recorded,
which is the worst possible page to make conditional on dismissing a banner. The
banner now measures itself and publishes `--consent-banner-height`, which `body`
consumes as bottom padding. Found by an e2e click that could not reach its target.

**The sticky header ate anchor targets.** Scrolling to an in-page anchor landed the
target underneath the header. The legal documents are the first pages with a table
of contents, so every jump would have hit it. Fixed with `scroll-padding-top` on
`html`, sized from a new `--header-height` token that mirrors the header's own
classes.

**A select could not fit a 320 px viewport.** A select's min-content width is its
longest option, and "Opt out of sale, sharing, or targeted advertising" is wider
than the viewport. `min-w-0` on the field wrapper plus `w-full` on the control.

**`Date.now()` at build time.** The privacy request form stamps a `startedAt` for
its timing defense. Prerendered, that timestamp would be the build time, so every
real submission would look impossibly slow and be rejected. The route now renders
per request via a `connection()`-gated helper.

**Consent state cascaded renders.** Reading `localStorage` and
`navigator.globalPrivacyControl` in an effect and calling `setState` re-rendered
every visitor on every page and tripped the compiler's purity rules. Replaced with
`useSyncExternalStore` over a standalone store, which also gives the server
snapshot an honest `unknown` status.

**Two e2e tests were passing for the wrong reason.** The Global Privacy Control
tests asserted the banner was hidden and then read storage. Both are true of a page
that has not hydrated yet, so the tests could pass without GPC being honoured at
all, and failed intermittently under parallel load for the same reason. They now
wait for the store to write a `source: 'gpc'` record before asserting anything
else.

## New test coverage

**Unit.** `tests/unit/consent.test.ts` covers consent state creation, version and
expiry invalidation, Consent Mode defaults and updates, the copy contract, and the
conditions under which optional analytics may load.
`tests/unit/legal-content.test.ts` covers legal document structure, contents-list
completeness, unresolved-placeholder detection, the resolved venue and dates, the
privacy request schema's accepted and rejected shapes, and the form legal model on
Contact and Diagnostic.

**E2E.** `tests/e2e/consent.spec.ts` asserts that no optional analytics request is
made before a decision, that every Google consent state defaults to denied except
the necessary two, that reject and accept are rendered with equal prominence and
cost one action each, that no control treats dismissal as consent, that withdrawal
works from any route, and that Global Privacy Control is honoured and overrides an
earlier grant. `tests/e2e/legal-routes.spec.ts` covers the two documents and the
request form, including that no submitted value reaches the URL.

**Content governance.** `check:content` now fails on any `[BRACKETED UPPERCASE]`
string, which is how an unresolved venue or date would otherwise have shipped.

## Accessibility

No serious or critical axe violations on any of the nineteen routes across five
browser projects, including with the banner on screen and the modal open. Specific
to this phase:

- The banner is a labelled `<section>`, not a dialog. It does not trap focus,
  because it does not block the page.
- The modal sets `aria-modal` explicitly, traps focus, and closes on Escape without
  recording a decision.
- Consent outcomes are announced through a polite live region that is mounted
  permanently, so it survives the banner unmounting.
- The request form reports failures in a focusable error summary and preserves
  submitted values through a validation error.
- Under Global Privacy Control the modal offers no accept control and no analytics
  toggle, rather than showing a disabled one.

## Blocking items

Resolved since Phase 6: L1–L4.

- **Mailboxes (L6).** `privacy@hendricks.ai` and `legal@hendricks.ai` are published
  in the legal copy. They must exist and be monitored before launch. Privacy
  request delivery stays stubbed until then (L8).
- **Vendor and retention confirmation (L7).** The notice describes categories of
  processors and retention rather than naming them. Confirm the actual vendors, the
  CRM, and the retention settings match what is written.
- **Counsel review.** The liability, venue, and privacy language is published as
  supplied and has not been reviewed by counsel (`docs/16` §14).
- **Confirmation that advertising and retargeting are disabled.** The site asserts
  this and the code enforces it, but the claim covers the business, not just the
  website.
- **Founder claims (F1–F9).** Unchanged. Still the largest visible gap on the site.
- **FAQ answers (Q1–Q3).** Unchanged. 17 approved questions with no answers.
- **Sanity credentials.** Unchanged. Blocks the rest of Phase 6.
- **Review dates (D1–D2).** Unchanged.
- **`/corrections`.** Unchanged. No approved copy exists.
