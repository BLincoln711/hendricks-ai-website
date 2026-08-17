# Hendricks Form, Privacy-Choice, and Consent Copy

## Status

**Approved draft for implementation, subject to final review by Hendricks' attorney and completion of the remaining bracketed dates, venue, vendor, and operational details. The legal entity is Hendricks Agency LLC, and no mailing address is published on the website at this stage.**

## Core legal-design decision

Do **not** require visitors to check a box stating that they “consent to the Privacy Notice” merely to submit an inquiry. Hendricks needs the submitted information to evaluate and respond to the visitor's request; the form should provide a clear notice at collection instead of relying on bundled consent.

Use a separate, optional, unchecked checkbox only for marketing email.

Do not collect a phone number at launch unless there is a defined business need. Do not send recurring or automated marketing text messages without a separate, purpose-specific consent flow reviewed for telephone and text-message compliance.

---

# 1. Diagnostic Application Form

## Placement

Place the following notice immediately above the submit button. It must be readable without opening a modal.

## Notice at collection

> Hendricks will use the contact, professional, company, and inquiry information you provide to evaluate and respond to your request, maintain business records, and protect the form from fraud and abuse. We may share this information with service providers that host the website, deliver email, secure the form, and operate our customer-relationship systems. Do not submit confidential, proprietary, financial, health, government-identifier, or other sensitive personal information through this form. Learn more in our [Privacy Notice](/privacy).

## Optional marketing checkbox

**Unchecked by default. Submission must work when left unchecked.**

- [ ] Send me occasional Hendricks research, event invitations, and service updates by email. I can unsubscribe at any time. This is optional and is not a condition of receiving a response.

## Submit button

**Apply for a Diagnostic**

## Confirmation message

> Thank you. Your request has been received and is being reviewed for fit. A Hendricks representative may contact you using the business contact information you provided. Submitting this form does not create a client relationship or require Hendricks to accept an engagement.

## Confirmation email footer

> You received this service message because you submitted a request through Hendricks.ai. This message confirms your inquiry; it does not enroll you in marketing unless you separately selected the optional marketing checkbox.

---

# 2. General Contact Form

## Notice at collection

> Hendricks will use the information you provide to route, evaluate, and respond to your inquiry; maintain business records; and protect the website from fraud and abuse. We may share it with service providers that host the website, deliver email, secure the form, and operate our customer-relationship systems. Do not submit confidential, proprietary, financial, health, government-identifier, or other sensitive personal information. See our [Privacy Notice](/privacy).

## Optional marketing checkbox

- [ ] Send me occasional Hendricks research and service updates by email. I can unsubscribe at any time. This is optional and is not a condition of receiving a response.

## Submit button

**Send Inquiry**

## Confirmation message

> Thank you. Your inquiry has been received. Hendricks will review the information and respond when an appropriate next step is available. Submitting this form does not create a client relationship.

---

# 3. Agency Partnership Form

## Notice at collection

> Hendricks will use the contact, company, opportunity, and partnership information you provide to evaluate and respond to this request, maintain business records, and protect the form from fraud and abuse. We may share it with service providers that host the website, deliver email, secure the form, and operate our customer-relationship systems. Do not include client-confidential information unless an appropriate confidentiality agreement is already in place. See our [Privacy Notice](/privacy).

## Optional marketing checkbox

- [ ] Send me occasional Hendricks agency-partner research and service updates by email. I can unsubscribe at any time. This is optional and is not a condition of partnership consideration.

## Submit button

**Discuss an Agency Partnership**

## Confirmation message

> Thank you. Your partnership inquiry has been received. Hendricks will review the opportunity and respond if the requested model appears appropriate. Submission does not create a partnership, exclusivity obligation, or confidentiality duty.

---

# 4. Newsletter or Research Subscription

Do not launch a newsletter or recurring marketing-email program until the sending provider, sender identity, a valid physical postal address for the email footer, unsubscribe process, suppression list, and retention practices are configured. The postal address is intentionally not published on Hendricks.ai at this stage.

## Email field label

**Work email**

## Consent checkbox

**Unchecked by default and required for newsletter enrollment.**

- [ ] I agree to receive Hendricks research and occasional company updates by email. I can unsubscribe at any time. See the [Privacy Notice](/privacy).

## Button

**Subscribe**

## Success message

> You're subscribed. Please check your inbox for confirmation. Every marketing email will include an unsubscribe option.

## Recommended implementation

Use confirmed opt-in when practical:

1. Visitor submits the form.
2. Hendricks sends a confirmation email.
3. The address is added to the marketing list only after the confirmation link is selected.
4. Store the consent language version, timestamp, form URL, and confirmation timestamp.
5. Retain a minimal suppression record after unsubscribe so the choice continues to be honored.

---

# 5. Phone Calls and Text Messages

## Launch recommendation

Do not collect mobile numbers and do not offer SMS marketing at launch.

## If a phone field is later added for a requested human follow-up

Place this text beneath the field:

> By providing a phone number, you authorize a Hendricks representative to call you about this inquiry. Hendricks will not use your number for automated or recurring marketing text messages without separate consent.

## If SMS marketing is later introduced

Do not reuse the inquiry-form notice. Create a separate, unchecked consent with the exact program name, sending entity, message purpose, expected frequency, automated-technology disclosure where applicable, message-and-data-rate disclosure, STOP and HELP instructions, and a statement that consent is not a condition of purchase. Obtain legal review before launch.

---

# 6. Sensitive-Information Warning

Display this directly above every free-text field that could invite confidential material:

> Do not include passwords, payment-card information, government identification numbers, health information, precise location information, client-confidential materials, or other sensitive personal information.

For agency forms, also display:

> Do not identify an agency client or upload client data unless you have authority to disclose it and an appropriate Hendricks agreement is already in place.

---

# 7. Privacy-Rights Request Form

## Route

`/privacy-request`

## Introductory copy

# Submit a Privacy Request

Depending on where you live and subject to applicable exceptions, you may have rights concerning personal information Hendricks maintains about you.

Use this form to request access, correction, deletion, a portable copy, restriction or objection, withdrawal of consent, an appeal of a previous decision, or information about Hendricks' data practices.

Do not use this form for sales, support, or client-delivery requests.

## Fields

- First name
- Last name
- Email address
- Country
- State or province
- Relationship to Hendricks
  - Website visitor
  - Inquiry submitter
  - Marketing subscriber
  - Current or former client representative
  - Agency-partner representative
  - Authorized agent
  - Other
- Request type
  - Access or know
  - Correct
  - Delete
  - Obtain a portable copy
  - Object or restrict processing
  - Withdraw marketing consent
  - Opt out of sale, sharing, or targeted advertising
  - Appeal a previous decision
  - Other
- Request details
- Authorized-agent status
- Required truthfulness attestation
- Honeypot
- Optional secure verification step after submission

## Required attestation

- [ ] I declare that the information in this request is accurate and that I am the person identified above or am authorized to act for that person.

## Notice

> Hendricks will use the information in this form to verify, process, document, and respond to your privacy request. We may request only the additional information reasonably needed to verify the request. See our [Privacy Notice](/privacy).

## Submit button

**Submit Privacy Request**

## Appeal copy

> To appeal a decision, select “Appeal a previous decision,” identify the original request, and explain why you believe the decision should be reconsidered.

---

# 8. Consent Banner Decision

## Decision

**Yes. Implement a global consent banner.**

The site is planned to use Google Tag Manager and Google Analytics 4 and will be publicly accessible to visitors in jurisdictions that require prior consent for non-essential analytics technologies. A single global opt-in experience is easier to operate, audit, and explain than relying on perfect geolocation.

## Launch behavior

- Block all non-essential analytics scripts until consent.
- Use **basic Google Consent Mode v2**: do not load Google Analytics or send Google measurement requests before analytics consent.
- Set these states to `denied` by default:
  - `analytics_storage`
  - `ad_storage`
  - `ad_user_data`
  - `ad_personalization`
- At launch, keep advertising-related states denied even after analytics acceptance because the site is not using advertising or retargeting tags.
- Treat Vercel Web Analytics and Vercel Speed Insights as optional analytics and do not load them until analytics consent. This is more conservative than relying solely on their cookie-free design.
- Store only the visitor's consent choice, policy version, and timestamp before consent. That storage is strictly necessary to remember the request.
- Show the banner on the first visit and when the consent version changes.
- Re-prompt no later than six months after the recorded choice, or sooner if purposes or vendors materially change.
- Provide a persistent **Privacy Choices** link in the footer that reopens the settings.
- Detect Global Privacy Control. When enabled, automatically reject optional analytics and do not ask the visitor to weaken that signal.
- Do not use pre-checked boxes, deceptive color hierarchy, or a harder rejection path.
- “Accept” and “Reject” must be equally visible and require the same number of actions.
- Do not fire form analytics containing personal information, regardless of consent.

---

# 9. Consent Banner Copy

## Banner title

# Your privacy choices

## Banner body

> We use essential technologies to operate and secure this website. With your permission, we also use analytics technologies to understand how the site is used and improve its performance. Optional analytics are off until you accept them. You can change your choice at any time through **Privacy Choices**.

## Links

- [Privacy Notice](/privacy)
- **Manage choices**

## Buttons

In this order on mobile and with equal visual prominence:

1. **Reject optional**
2. **Manage choices**
3. **Accept analytics**

Do not use “Continue,” “Got it,” or closing the banner as consent.

---

# 10. Privacy-Choices Modal Copy

## Title

# Privacy choices

## Introductory copy

> Choose whether Hendricks may use optional analytics technologies. Strictly necessary technologies remain active because they are required to operate, secure, and remember choices for the website.

## Category 1 — Strictly necessary

**Status:** Always active

> These technologies are required to deliver and secure the website, process requested forms, prevent abuse, balance traffic, and remember your privacy choice. They are not used for advertising.

Examples may include:

- Consent-preference storage
- Security and rate-limiting controls
- Form-session and anti-abuse controls
- Hosting and network-delivery functions

## Category 2 — Analytics

**Status:** Off by default; visitor controlled

> Analytics help Hendricks understand page use, navigation, form performance, and site speed. When enabled, this category may load Google Analytics 4, Vercel Web Analytics, and Vercel Speed Insights. Analytics data must not include form-field values, email addresses, names, company names, message content, or other directly identifying information.

## Buttons

- **Reject optional**
- **Save choices**
- **Accept analytics**

## Footer statement

> You may withdraw consent at any time. Withdrawal does not affect processing that occurred before the change.

---

# 11. Footer Links

The footer must include:

- [Privacy Notice](/privacy)
- [Terms of Use](/terms)
- **Privacy Choices** — button that reopens the consent manager
- [Privacy Request](/privacy-request)

Do not display a “Do Not Sell or Share My Personal Information” link at launch because Hendricks will not sell personal information or share it for cross-context behavioral advertising. Add the required link and opt-out mechanism before introducing advertising pixels, retargeting, audience matching, or another practice that may constitute sale or sharing under applicable law.

---

# 12. Consent Records

Store the following for each consent event:

- Random consent record ID
- Consent policy version
- Categories granted or denied
- Timestamp
- Source page
- Global Privacy Control status
- Consent-management interface version
- Country or region only if already provided by the consent platform; do not retain precise location
- Proof that no optional tag fired before the decision

Do not store a full IP address solely to prove cookie consent. If an anti-abuse key is necessary, use a one-way hash with a rotating secret and short retention.

---

# 13. Marketing Consent Records

When a visitor opts into email marketing, store:

- Email address
- Consent wording version
- Form name and URL
- Consent timestamp
- Confirmation timestamp when confirmed opt-in is used
- Source or campaign
- Unsubscribe timestamp
- Minimal suppression record

Do not infer marketing consent from:

- A Diagnostic application
- A Contact submission
- A downloaded resource
- A client relationship
- A checked privacy acknowledgement
- Continued use of the website

---

# 14. Developer Acceptance Criteria

- Inquiry forms submit when marketing opt-in is false.
- No required “I agree to the Privacy Notice” checkbox exists.
- The notice at collection is visible before submission.
- Marketing opt-in is unchecked by default.
- Marketing opt-in choice and consent-version metadata are stored separately from the inquiry.
- No analytics receives personal information from form fields.
- No optional analytics request occurs before acceptance.
- Rejecting is as easy as accepting.
- Withdrawing consent stops future optional analytics.
- GPC causes optional analytics to remain denied.
- The footer Privacy Choices button works on every route.
- The site works fully when optional analytics are rejected.
- The privacy-request route is rate-limited, accessible, and does not require an account.
