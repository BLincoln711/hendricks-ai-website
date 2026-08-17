# 16 — Privacy, Consent, and Legal Implementation

## 1. Launch decision

Hendricks requires a consent-management experience because the planned stack includes Google Tag Manager and Google Analytics 4 and the site is accessible globally.

Implement a **global opt-in banner**. This is intentionally more conservative than a U.S.-only or regionally targeted banner and reduces dependence on error-prone location detection.

## 2. Consent architecture

### Strictly necessary

May run before a decision:

- Website delivery and hosting
- Consent-state storage
- Security and anti-abuse
- Rate limiting
- Form processing requested by the visitor
- Load balancing
- Error handling necessary to deliver the requested page or form

### Analytics

Must not run before analytics acceptance:

- Google Analytics 4
- Google Tag Manager tags that perform analytics
- Vercel Web Analytics
- Vercel Speed Insights
- Session replay
- A/B testing
- Heatmaps
- Other measurement scripts

### Advertising

Not permitted at launch:

- Google Ads remarketing
- Meta Pixel
- LinkedIn Insight Tag
- TikTok Pixel
- Audience matching
- Cross-context behavioral advertising
- Retargeting
- Advertising personalization

If an advertising tag is proposed, stop implementation until the Privacy Notice, banner categories, opt-out methods, vendor contracts, state-law analysis, and GPC behavior are updated.

## 3. Google Consent Mode

Use **basic Consent Mode v2**.

Before consent:

```ts
{
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted'
}
```

After analytics acceptance:

```ts
{
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted'
}
```

Do not send Google cookieless analytics pings before consent under the launch configuration.

## 4. Consent state

Recommended type:

```ts
type ConsentState = {
  version: string
  analytics: 'granted' | 'denied'
  advertising: 'denied'
  source: 'banner' | 'preferences' | 'gpc'
  gpc: boolean
  decidedAt: string
  expiresAt: string
}
```

Store only the consent object in a strictly necessary first-party cookie or local storage item.

Recommended key:

`hendricks_privacy_v1`

Recommended maximum duration:

Six months, with early invalidation after a material vendor, purpose, or policy change.

## 5. Global Privacy Control

On initial load:

```ts
const gpcEnabled =
  typeof navigator !== 'undefined' &&
  (navigator as Navigator & { globalPrivacyControl?: boolean })
    .globalPrivacyControl === true
```

When GPC is true:

- Set analytics to denied.
- Do not load optional analytics.
- Persist the source as `gpc`.
- The user may view the preferences panel, but the interface must not pressure the user to override GPC.
- Do not add an advertising tag.

## 6. Banner UI

Required controls:

- Reject optional
- Manage choices
- Accept analytics

Requirements:

- Equal visual prominence for accept and reject.
- Same number of actions.
- No preselected analytics toggle.
- Escape closes the preferences modal but does not imply consent.
- Focus trap in modal.
- Full keyboard support.
- `aria-modal`, accessible title, and description.
- Consent status announced to assistive technology.
- Reduced-motion support.

## 7. Form legal model

### Do not use bundled consent

Remove `privacyConsent: z.literal(true)` from inquiry schemas.

Form processing to respond to a visitor's request does not use marketing consent. Present a notice at collection and provide the Privacy Notice link.

### Add optional marketing consent

```ts
const marketingConsentSchema = z.object({
  optedIn: z.boolean().default(false),
  languageVersion: z.string().max(50),
  collectedAt: z.string().datetime().optional(),
  confirmedAt: z.string().datetime().optional(),
  sourceUrl: z.string().url().max(1000),
})
```

The server, not the browser, sets authoritative timestamps and form-version values.

### Add notice metadata

```ts
const noticeMetadataSchema = z.object({
  privacyNoticeVersion: z.string().max(50),
  formCopyVersion: z.string().max(50),
})
```

This records what notice was displayed. It is not a statement that the visitor “consented to the Privacy Notice.”

## 8. Form data minimization

At launch:

- Do not collect phone numbers.
- Do not collect uploads.
- Do not collect payment information.
- Do not ask for sensitive personal information.
- Budget range is optional.
- Use work email only when reasonably relevant.
- Free-text maximums remain enforced.
- Sanitize for display and email.
- Never place form values into analytics events or URLs.

## 9. Privacy request route

Add:

`/privacy-request`

The route is linked from the footer and Privacy Notice but omitted from primary navigation.

Required request types:

- Access or know
- Correction
- Deletion
- Portability
- Object or restrict
- Withdraw consent
- Opt out
- Appeal
- Other

Do not require account creation.

Do not require identity verification for a simple opt-out request beyond what is reasonably necessary.

Maintain a case record with:

- Request ID
- Request type
- Received date
- Jurisdiction claimed
- Verification status
- Due date
- Extension
- Outcome
- Appeal status
- Closure date
- Systems searched
- Processors notified

## 10. Vendor requirements

Before production:

- Execute or accept applicable data-processing terms with Vercel, Google, Sanity, Resend, Cloudflare, and the CRM provider.
- Maintain a subprocessor register.
- Configure minimum access and retention.
- Prohibit personal information in analytics event properties.
- Configure Vercel redaction for sensitive URLs and query parameters.
- Ensure forms never put email or identifiers in URLs.
- Configure Sanity document IDs so they do not contain personal information.
- Restrict access to leads and privacy requests.
- Configure SPF, DKIM, and DMARC for sending domains.
- Confirm deletion and export paths for each vendor.

## 11. Retention implementation

Recommended scheduled policies:

- Unconverted inquiry: delete or anonymize 24 months after last interaction.
- Marketing: retain until unsubscribe; preserve minimal suppression record.
- Consent records: five years after last preference.
- Security logs: up to 12 months.
- Privacy requests: 24 months after closure.
- Client and accounting records: seven years after relationship unless contract or law requires another period.

Create an internal retention job or recurring operational checklist. A privacy-policy promise without an operational deletion process is not sufficient.

## 12. Email rules

Service-response email:

- May be sent because the visitor requested contact.
- Must not silently subscribe the visitor to recurring marketing.
- Must state why the recipient is receiving it.

Marketing email:

- Send only to permitted recipients.
- Use accurate sender and subject information.
- Include a valid physical postal address for Hendricks Agency LLC in each commercial marketing email.
- Include a clear unsubscribe mechanism.
- Honor unsubscribe promptly.
- Maintain suppression.

Hendricks has not designated a public mailing address for the website. Keep recurring marketing email and newsletter sends disabled until a compliant postal address has been selected and configured in the email footer.

## 13. Required production addresses

Create and monitor:

- `privacy@hendricks.ai`
- `legal@hendricks.ai`

Recommended:

- `security@hendricks.ai`

Do not publish an inbox until it is monitored and included in an incident and request workflow.

## 14. Required launch confirmations

Do not launch until these are completed:

- Legal entity confirmed as **Hendricks Agency LLC**
- Public Privacy Notice and Terms intentionally omit a mailing address
- A valid physical postal address is configured before any recurring commercial marketing email or newsletter is sent
- `[COUNTY], Texas`
- Effective and last-updated dates
- Actual vendor list
- Actual CRM provider
- Actual retention settings
- Actual privacy-request workflow
- Confirmation that advertising and retargeting are disabled
- Counsel review of liability, venue, and privacy language

## 15. Acceptance tests

### Network

Before consent:

- No request to Google Analytics.
- No optional GTM tag.
- No Vercel Analytics or Speed Insights request.
- No advertising endpoint.
- Consent preference storage only.

After analytics acceptance:

- GA4 loads exactly once.
- Approved analytics events fire exactly once.
- Vercel analytics and Speed Insights may load.
- Advertising consent states remain denied.

After withdrawal:

- Future optional analytics stop.
- Consent state updates immediately.
- Page continues to function.

### Forms

- Submits without marketing consent.
- Notice is visible.
- Optional marketing checkbox is unchecked.
- No form field appears in analytics, URLs, logs intended for general telemetry, or page HTML after submission.
- Confirmation email distinguishes service response from marketing.
- Privacy request form supports appeal.
- Rate limiting and anti-abuse work without inaccessible CAPTCHA.

### Accessibility

- Banner and modal are keyboard usable.
- Reject and accept are equally available.
- Modal focus is trapped and restored.
- Errors are announced.
- 200% and 400% zoom remain usable.

## 16. Legal review reminder

These documents are implementation-ready drafts, not a substitute for advice from counsel who has verified Hendricks' legal entity, locations, actual vendors, client-data practices, marketing methods, and insurance requirements.
