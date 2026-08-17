# 15 — API and Data Contracts

## 1. Lead submission endpoint

Recommended route:

`POST /api/leads`

A Server Action may wrap the same service, but provider logic remains in `LeadService`.

## 2. Request schema

```ts
const leadInputSchema = z.object({
  formName: z.enum(['diagnostic', 'agency-partnership', 'contact']),
  audienceType: z.enum(['brand', 'agency', 'media', 'other']),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  workEmail: z.string().trim().email().max(254),
  organization: z.string().trim().min(1).max(160),
  website: z.string().trim().url().max(500),
  role: z.string().trim().min(1).max(160),
  primaryMarket: z.string().trim().min(1).max(500),
  primaryQuestion: z.string().trim().min(10).max(3000),
  currentStack: z.string().trim().max(2000).optional(),
  monthlySearchInvestment: z.enum([
    'under-10k',
    '10k-25k',
    '25k-50k',
    '50k-100k',
    'over-100k',
    'prefer-not-to-say',
  ]).optional(),
  desiredTiming: z.string().trim().max(160).optional(),
  additionalContext: z.string().trim().max(5000).optional(),
  marketingOptIn: z.boolean().default(false),
  honeypot: z.string().max(0),
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().optional(),
  attribution: z.object({
    utmSource: z.string().max(200).optional(),
    utmMedium: z.string().max(200).optional(),
    utmCampaign: z.string().max(300).optional(),
    utmTerm: z.string().max(300).optional(),
    utmContent: z.string().max(300).optional(),
    gclid: z.string().max(300).optional(),
    msclkid: z.string().max(300).optional(),
    landingPage: z.string().url().max(1000).optional(),
    referrer: z.string().url().max(1000).optional(),
  }).optional(),
})
```

Agency and contact forms may make some Diagnostic-specific fields optional. Use discriminated unions if that creates clearer validation.


### Server-controlled privacy metadata

Do not accept privacy-notice or consent-language versions as authoritative client values. After validation, the server adds:

```ts
type PrivacySubmissionMetadata = {
  privacyNoticeVersion: string
  formCopyVersion: string
  submittedAt: string
  marketingConsent?: {
    optedIn: true
    languageVersion: string
    collectedAt: string
    sourceUrl: string
  }
}
```

When `marketingOptIn` is false, do not create a marketing-consent record and do not add the email address to a marketing list.

The form notice is a notice at collection, not bundled consent to the Privacy Notice.

## 3. Public response schema

### Success

HTTP `200` or `201`

```json
{
  "ok": true,
  "submissionId": "public-safe-id",
  "message": "Thank you. Your request is being reviewed for fit."
}
```

### Validation error

HTTP `400`

```json
{
  "ok": false,
  "code": "VALIDATION_ERROR",
  "message": "Review the highlighted fields and try again.",
  "fieldErrors": {
    "workEmail": ["Enter a valid work email."]
  }
}
```

### Rate limited

HTTP `429`

```json
{
  "ok": false,
  "code": "RATE_LIMITED",
  "message": "This form cannot be submitted again right now."
}
```

Do not reveal rate-limit internals.

### Provider failure

HTTP `503`

```json
{
  "ok": false,
  "code": "DELIVERY_UNAVAILABLE",
  "message": "The application could not be delivered. Please try again."
}
```

## 4. Delivery result

Internal type:

```ts
type DeliveryResult = {
  email: 'success' | 'failed' | 'skipped'
  crmWebhook: 'success' | 'failed' | 'skipped'
  notificationId?: string
  crmRecordId?: string
}
```

Public success requires at least one approved durable destination to succeed. Log partial failure for operator review.

## 5. Idempotency

Generate a short-lived idempotency key from:

- form name
- normalized email hash
- normalized organization hash
- time bucket

Prevent accidental duplicate sends from repeated clicks while allowing legitimate later submissions.

Do not expose hashes in analytics.

## 6. Rate-limit contract

Suggested default:

- 5 attempts per privacy-safe key per 15 minutes
- Lower threshold for repeated identical payloads
- Configurable by environment

Do not store raw IP longer than necessary. Prefer one-way hashing with a rotating secret when used.

## 7. Analytics helper

```ts
type AnalyticsEventMap = {
  primary_cta_click: {
    cta_label: string
    cta_location: string
    destination_url: string
    audience_type?: 'brand' | 'agency'
    solution_name?: string
  }
  diagnostic_start: {
    form_name: 'diagnostic'
    page_name: string
    audience_type?: 'brand' | 'agency'
  }
  // Continue from analytics-events.csv
}

export function trackEvent<K extends keyof AnalyticsEventMap>(
  event: K,
  payload: AnalyticsEventMap[K]
): void
```

The helper should no-op safely when GTM is unavailable.

## 8. Route configuration contract

```ts
type RouteConfig = {
  path: string
  label: string
  pageName: string
  audience?: 'brand' | 'agency' | 'all'
  indexable: boolean
  featureFlag?: keyof typeof features
}
```

Navigation, sitemap, and breadcrumb generation should draw from shared route configuration where practical, while avoiding overcoupling.

## 9. Feature flags

Server-owned flags:

```ts
export const features = {
  showResults: false,
  showNewsletter: false,
  enableSanityVisualEditing: true,
  enableTurnstile: false,
} as const
```

Do not expose disabled proof routes in navigation, sitemap, or structured data.

## 10. Sanity article contract

The frontend query result should include only:

```ts
type ArticlePageData = {
  title: string
  slug: string
  dek: string
  directAnswer: string
  keyFindings: string[]
  body: PortableTextBlock[]
  author: AuthorSummary
  categories: CategorySummary[]
  publishedAt: string
  updatedAt?: string
  dataThroughDate?: string
  methodology?: PortableTextBlock[]
  limitations?: PortableTextBlock[]
  sources: Source[]
  relatedArticles: ArticleCardData[]
  relatedSolution?: Cta
  seo: SeoFields
}
```

Do not pass full author or category documents into client components.

## 11. Case-study publication gate

A case study query must filter:

- `approvedForPublicUse == true`
- supported public status
- defined slug
- defined evidence grade
- defined limitations

The frontend must not trust UI hiding alone; the query and route enforce the gate.


## 9. Privacy request endpoint

Recommended route:

`POST /api/privacy-requests`

```ts
const privacyRequestInputSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  country: z.string().trim().min(2).max(100),
  stateOrProvince: z.string().trim().max(100).optional(),
  relationship: z.enum([
    'website-visitor',
    'inquiry-submitter',
    'marketing-subscriber',
    'client-representative',
    'agency-partner-representative',
    'authorized-agent',
    'other',
  ]),
  requestType: z.enum([
    'access',
    'correct',
    'delete',
    'portability',
    'object-or-restrict',
    'withdraw-consent',
    'opt-out',
    'appeal',
    'other',
  ]),
  details: z.string().trim().min(10).max(5000),
  isAuthorizedAgent: z.boolean().default(false),
  originalRequestId: z.string().trim().max(100).optional(),
  attestation: z.literal(true),
  honeypot: z.string().max(0),
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().optional(),
})
```

The endpoint returns a public-safe request ID and stores the case in a restricted system. Do not send request details to analytics, Slack, or a broad email distribution list.

Recommended success response:

```json
{
  "ok": true,
  "requestId": "PRIV-2026-000123",
  "message": "Your privacy request has been received."
}
```

## 10. Consent preference contract

Consent preference must be available synchronously before optional scripts are evaluated.

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

Rules:

- Missing, invalid, expired, or version-mismatched state means analytics is denied.
- GPC means analytics is denied.
- Advertising remains denied at launch.
- Do not send the consent record itself to GA4.
- Store consent events in the CMP or approved first-party consent log.
