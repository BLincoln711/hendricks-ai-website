# 07 — Analytics and Lead Capture

## 1. Measurement principle

The website must measure useful decisions without collecting unnecessary personal information or flooding analytics with low-value interactions.

Use a typed analytics layer. UI components must call semantic helper functions rather than writing raw `dataLayer.push()` logic everywhere.

## 2. Platforms

- Google Tag Manager
- Google Analytics 4
- Vercel Web Analytics
- Vercel Speed Insights
- CRM or webhook destination selected by the business
- Search Console configured after launch

Do not install duplicate GA4 implementations. If GTM deploys GA4, do not also load a separate GA4 component.

## 3. Data layer

Initialize `window.dataLayer` once. Standard page context may include:

- `page_type`
- `page_name`
- `audience`
- `solution_name`
- `content_category`
- `content_author`
- `content_publish_date`
- `content_data_through_date`
- `environment`

Do not send:

- Full form messages
- Email addresses
- Names
- Phone numbers
- Confidential business details
- Raw CRM identifiers unless explicitly approved and properly handled

## 4. Event taxonomy

Use `templates/analytics-events.csv` as the source of truth.

Core events:

- `audience_path_select`
- `solution_view`
- `primary_cta_click`
- `diagnostic_start`
- `diagnostic_step_complete` if the form is multistep
- `diagnostic_submit`
- `diagnostic_success`
- `diagnostic_error`
- `agency_partner_inquiry_start`
- `agency_partner_inquiry_submit`
- `research_view`
- `research_related_click`
- `case_study_view`
- `external_venture_click`
- `contact_submit`
- `form_validation_error`

Use lowercase snake_case.

## 5. Common event parameters

- `cta_label`
- `cta_location`
- `destination_url`
- `audience_type`
- `solution_name`
- `form_name`
- `form_step`
- `error_type`
- `content_slug`
- `content_category`
- `case_study_slug`
- `external_brand_name`

Do not put free-text field values into event parameters.

## 6. UTM and attribution capture

Capture at first landing and preserve through the lead journey:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `gclid` when available and permitted
- `msclkid` when available and permitted
- Landing page
- Initial referrer
- Current page

Store this information with the lead submission, not just GA4.

Use a first-party cookie or session/local storage only after determining the appropriate consent behavior. Version the storage schema.

## 7. Diagnostic form

### Fields

- Audience type: Brand / Agency
- First and last name
- Work email
- Organization
- Website
- Role
- Primary product, service, or market
- Primary business/search question
- Current search, analytics, and CRM systems
- Approximate monthly search investment range
- Desired timing
- Additional context
- Privacy consent

### Suggested investment ranges

- Under $10,000/month
- $10,000–$25,000/month
- $25,000–$50,000/month
- $50,000–$100,000/month
- More than $100,000/month
- Prefer not to say

This field is a qualifier, not a public pricing gate.

### Validation

- Email must be valid.
- Website must be a valid HTTP(S) URL.
- Text fields have sensible maximum lengths.
- Consent is required.
- Honeypot must remain empty.
- Submission time under a minimum threshold is suspicious.
- Validate on server even when client validation exists.

### Accessibility

- Visible labels
- Helpful instructions
- Error summary with links to invalid fields
- `aria-describedby` for field errors
- Focus moves to error summary or success state
- Success message is announced
- No color-only error indication

## 8. Submission delivery

### Required

- Email notification to configured Hendricks address
- Confirmation email to submitter only after legal and copy approval
- Server log with delivery status and request ID

### Optional

- CRM webhook
- Slack notification through a separate webhook adapter
- Database persistence

### Failure handling

- If email fails but CRM succeeds, log partial success and alert.
- If all destinations fail, return a user-friendly retry message and capture server error telemetry.
- Never show provider error details publicly.
- Never report success when every delivery failed.

## 9. Spam prevention

Layered controls:

- Honeypot
- Submission timing
- Server-side rate limit
- URL and message heuristics
- Optional Turnstile
- Generic public response for suspicious requests

Do not use an inaccessible visual CAPTCHA.

## 10. Consent and privacy

- Make consent language configurable.
- Implement consent mode and a configurable CMP integration point.
- Legal counsel or the business owner decides the final banner and policy requirements.
- Do not load advertising tags before appropriate consent where required.
- Do not claim the developer has provided legal advice.

## 11. Verification

Before launch:

- Use GTM preview/debug mode.
- Confirm one page view per navigation.
- Confirm events fire once.
- Confirm no PII appears in GA4 DebugView.
- Confirm UTM fields arrive with the lead.
- Confirm success and error events.
- Confirm staging traffic is separated or excluded.
- Test ad blockers and graceful degradation.
- Test email and webhook delivery with nonproduction endpoints.
