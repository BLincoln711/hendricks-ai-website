# Hendricks Legal and Consent Addendum

This addendum supersedes older handoff references that required a `privacyConsent` checkbox or deferred the consent-banner decision.

---

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
- Keep advertising-related Consent Mode states denied even after analytics acceptance. After analytics consent, the LinkedIn Insight Tag may load to measure visits and LinkedIn-referred traffic. It is not used for retargeting, audience matching, or advertising personalization.
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

> We use essential technologies to operate and secure this website. With your permission, we also use analytics technologies to understand how the site is used and improve its performance, and may use the LinkedIn Insight Tag to measure visits and LinkedIn-referred traffic. Optional analytics are off until you accept them. You can change your choice at any time through **Privacy Choices**.

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

> Analytics help Hendricks understand page use, navigation, form performance, and site speed. When enabled, this category may load Google Analytics 4, Vercel Web Analytics, Vercel Speed Insights, and the LinkedIn Insight Tag to measure visits and LinkedIn-referred traffic. Analytics data must not include form-field values, email addresses, names, company names, message content, or other directly identifying information.

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

Do not display a “Do Not Sell or Share My Personal Information” link because Hendricks does not sell personal information or share it for cross-context behavioral advertising. The LinkedIn Insight Tag may load after analytics consent to measure visits and LinkedIn-referred traffic; advertising storage remains denied. Add the required link and opt-out mechanism before enabling retargeting, audience matching, or another practice that may constitute sale or sharing under applicable law.

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


---

# Privacy Notice

**Effective Date:** [EFFECTIVE DATE]  
**Last Updated:** [LAST UPDATED DATE]

This Privacy Notice explains how **Hendricks Agency LLC**, doing business as **Hendricks** (“Hendricks,” “we,” “us,” or “our”), collects, uses, discloses, and protects personal information when you visit **hendricks.ai**, submit an inquiry or application, subscribe to communications, interact with us, or receive services that refer to this Notice.

Before publication, complete the remaining bracketed dates and confirm that this Notice accurately reflects the website's actual vendors, settings, retention periods, and business practices. Hendricks Agency LLC is the confirmed legal entity. No mailing address is published in this Notice at this stage.

## 1. Who We Are

Hendricks is a Search Intelligence Engineering firm based in Texas.

**Legal entity:** Hendricks Agency LLC  
**Privacy email:** privacy@hendricks.ai  
**Privacy request form:** `/privacy-request`

For personal information processed under a separate client agreement, statement of work, data-processing agreement, or agency-partner agreement, that agreement may provide additional or different terms.

## 2. Scope

This Notice applies to personal information Hendricks processes in connection with:

- The Hendricks website and its public pages;
- Diagnostic, contact, agency-partnership, and privacy-request forms;
- Research and marketing subscriptions;
- Emails, meetings, and business communications;
- Prospective, current, and former client and partner relationships;
- Website security, analytics, and performance monitoring; and
- Other interactions that link to this Notice.

This Notice does not govern third-party websites or services that have their own privacy notices. The Search Economy is a separate website and brand; its privacy practices are governed by the notice displayed on that website.

## 3. Personal Information We Collect

The information we collect depends on how you interact with Hendricks.

### A. Information You Provide

We may collect:

- **Contact information**, such as name, business email address, and other contact details you choose to provide;
- **Professional and company information**, such as employer, role, company website, industry, market, agency relationship, and business priorities;
- **Inquiry and application information**, such as your search, AI-visibility, analytics, technical, measurement, timing, budget-range, and service questions;
- **Communications**, including emails, meeting notes, feedback, and other correspondence;
- **Marketing preferences**, including whether you requested or withdrew email communications;
- **Privacy-request information**, including information needed to verify and respond to a request; and
- **Client and partner records**, such as contracts, authorized contacts, project administration, invoices, and service-delivery communications.

Do not provide passwords, payment-card information, government identification numbers, health information, precise geolocation, client-confidential data, or other sensitive personal information through a public website form.

### B. Information Collected Automatically

When you visit the website, we and our service providers may automatically process:

- IP address and network information;
- Browser, device, and operating-system information;
- Approximate location derived from IP address, such as country, state, or city;
- Page views, routes, referring page, navigation, and interaction events;
- Date and time of access;
- Website-performance and error information;
- Security and anti-abuse signals; and
- Consent and privacy-preference information.

Optional analytics technologies are blocked until you accept analytics through the consent interface. Hendricks does not permit analytics events to contain names, email addresses, company names, form-field values, inquiry text, or other directly identifying form content.

### C. Information From Other Sources

We may receive business contact or professional information from:

- Your employer, colleague, agency, or authorized representative;
- Service providers used to operate our business;
- Publicly available professional and company sources;
- Business partners or referral sources; and
- Clients or agencies that authorize us to communicate with you.

We do not knowingly purchase consumer lists for unrelated mass marketing.

## 4. How We Use Personal Information

We may use personal information to:

- Evaluate, route, and respond to inquiries;
- Determine whether a Diagnostic, partnership, or other engagement is appropriate;
- Take steps requested before entering a contract;
- Provide, administer, secure, and improve services;
- Communicate with client and agency-partner representatives;
- Send service, administrative, and security messages;
- Send marketing communications when permitted and honor unsubscribe choices;
- Operate, troubleshoot, secure, and improve the website;
- Measure website use and performance after required consent;
- Prevent fraud, spam, abuse, and security incidents;
- Maintain business, tax, accounting, legal, and compliance records;
- Establish, exercise, or defend legal claims;
- Enforce agreements and website terms;
- Comply with law and lawful requests;
- Evaluate or complete a merger, financing, acquisition, reorganization, or transfer of all or part of the business; and
- Use deidentified or aggregated information for analysis, provided it is not used to identify an individual.

Hendricks does not use website inquiries to make solely automated decisions that produce legal or similarly significant effects. Automated tools may help route, categorize, summarize, or prioritize an inquiry, but a human remains responsible for material business decisions.

## 5. Legal Bases for EEA and UK Processing

If European Economic Area or United Kingdom data-protection law applies, Hendricks relies on one or more of the following legal bases:

- **Steps requested before a contract or performance of a contract**, such as evaluating an inquiry or delivering agreed services;
- **Legitimate interests**, such as operating a B2B website, responding to business inquiries, maintaining business relationships, improving services, preventing fraud, and protecting systems, when those interests are not overridden by your rights;
- **Consent**, such as optional analytics and optional email marketing;
- **Legal obligations**, such as tax, accounting, regulatory, and lawful-request requirements; and
- **Legal claims**, when processing is necessary to establish, exercise, or defend rights.

Where processing relies on consent, you may withdraw it at any time. Withdrawal does not affect processing that occurred before withdrawal.

## 6. Cookies, Similar Technologies, and Analytics

### A. Strictly Necessary Technologies

We use technologies required to:

- Deliver and secure the website;
- Process forms you request;
- Prevent spam and abuse;
- Balance and route traffic; and
- Remember your privacy choice.

These technologies are active because the website cannot reliably provide the requested function without them.

### B. Optional Analytics

With your permission, Hendricks may use:

- **Google Analytics 4**, to measure website use and events;
- **Vercel Web Analytics**, to understand page visits and referral patterns;
- **Vercel Speed Insights**, to measure website performance; and
- **LinkedIn Insight Tag**, to measure visits and LinkedIn-referred traffic.

Although Vercel describes its analytics and performance products as cookie-free and privacy focused, Hendricks treats them as optional at launch and blocks them until analytics consent.

Hendricks uses basic consent mode for Google tags: Google Analytics is not loaded and Google measurement requests are not sent before analytics consent. Advertising storage, advertising user data, and advertising personalization remain denied.

You may accept, reject, or withdraw optional analytics at any time through the **Privacy Choices** link in the website footer.

### C. Global Privacy Control

Where a supported browser sends a Global Privacy Control signal, Hendricks treats the signal as a request to reject optional analytics and, where applicable, to opt out of sale, sharing, and targeted advertising.

### D. Advertising and Retargeting

With analytics consent, Hendricks may use the LinkedIn Insight Tag to measure visits and LinkedIn-referred traffic. Google advertising storage, advertising user data, and advertising personalization remain denied. Hendricks does not use the Insight Tag for retargeting, audience matching, or cross-context behavioral advertising, and does not use session-replay or product-analytics tools such as Hotjar, Microsoft Clarity, or Mixpanel. If these practices change, Hendricks will update this Notice and the privacy-choice mechanism before enabling them.

## 7. How We Disclose Personal Information

We may disclose personal information to the following categories of recipients for the purposes described in this Notice:

### A. Service Providers

Service providers may process information only to provide contracted functions, such as:

- Website hosting, content delivery, and infrastructure;
- Content management;
- Email delivery;
- Customer-relationship management;
- Form security and anti-abuse;
- Analytics and performance measurement after consent;
- Logging, monitoring, backup, and security;
- Professional consulting; and
- Accounting, legal, and administrative support.

The service-provider stack may include Vercel, Google, Sanity, Resend, Cloudflare, and the selected customer-relationship platform. After analytics consent, it may also include LinkedIn as a measurement vendor. The actual vendor list and configuration must be verified before publication.

### B. Professional Advisers

We may disclose information to attorneys, accountants, insurers, auditors, and other advisers when reasonably necessary.

### C. Business Partners and Authorized Parties

We may disclose information to a client's agency, a partner, or another party when you request or authorize the disclosure, or when necessary to deliver an agreed engagement.

### D. Legal and Safety Purposes

We may disclose information when we reasonably believe it is necessary to comply with law or legal process; protect rights, property, or safety; investigate fraud or security incidents; or enforce agreements.

### E. Business Transactions

Information may be disclosed or transferred as part of a merger, acquisition, financing, reorganization, bankruptcy, sale of assets, or similar transaction, subject to appropriate confidentiality and legal requirements.

## 8. Sale, Sharing, and Targeted Advertising

Hendricks does not sell personal information for money.

Hendricks also does not share personal information for cross-context behavioral advertising and does not process personal information for targeted advertising as those terms are defined by applicable U.S. state privacy laws.

If those practices change, Hendricks will provide the required notice, opt-out method, and recognition of applicable browser-based opt-out signals before the change takes effect.

## 9. Data Retention

Hendricks retains personal information only for as long as reasonably necessary for the purposes described in this Notice, including legal, accounting, security, dispute, and contract requirements.

Unless a longer or shorter period is required, the recommended launch schedule is:

| Record | General retention |
|---|---|
| Unconverted inquiry or Diagnostic application | 24 months after the last meaningful interaction |
| Marketing subscription | Until unsubscribe or invalidation; retain a minimal suppression record as needed to honor the choice |
| Consent and privacy-preference record | Five years after the last recorded preference, unless a different period is legally appropriate |
| Security and anti-abuse logs | Up to 12 months, unless needed for an active incident or legal requirement |
| Privacy-rights request and response | 24 months after closure, unless a longer period is required |
| Client, contract, invoice, and project-administration records | During the relationship and generally seven years afterward, subject to contract and legal requirements |
| Analytics data | According to configured vendor-retention settings and only for as long as reasonably needed |
| Backups | Until overwritten or deleted under the applicable backup cycle |

Hendricks may retain information longer when necessary to comply with law, resolve disputes, enforce agreements, investigate security events, or establish or defend legal claims. Information may be deidentified instead of deleted where permitted.

## 10. Security

Hendricks uses reasonable administrative, technical, and organizational safeguards designed to protect personal information. Measures may include access controls, encryption in transit, least-privilege access, vendor review, secure development practices, monitoring, backups, and incident-response procedures.

No method of transmission or storage is completely secure. Hendricks cannot guarantee absolute security, and you should not submit information through the website that is inappropriate for ordinary business email or web-form transmission.

## 11. International Data Transfers

Hendricks is based in the United States, and personal information may be processed in the United States and other countries where Hendricks or its service providers operate.

Where required, Hendricks will use an approved transfer mechanism, such as contractual safeguards, an applicable adequacy decision, or a service provider's participation in a recognized data-transfer framework.

## 12. Your Privacy Rights

Depending on where you live and subject to applicable exceptions, you may have the right to:

- Confirm whether Hendricks processes personal information about you;
- Access personal information and obtain a copy;
- Correct inaccurate information;
- Delete information;
- Obtain certain information in a portable format;
- Restrict or object to certain processing;
- Withdraw consent;
- Opt out of sale, sharing, targeted advertising, or certain profiling;
- Limit certain uses of sensitive personal information, where applicable;
- Appeal a decision concerning a privacy request; and
- Receive equal service without unlawful discrimination for exercising a right.

### How to Exercise a Right

Submit a request through `/privacy-request` or email **privacy@hendricks.ai** with the subject line **Privacy Request**.

Please describe the request and provide the information reasonably necessary to identify the relevant records. Hendricks may take proportionate steps to verify your identity or authority. Do not send government identification unless Hendricks specifically requests a secure verification method.

Hendricks will respond within the period required by applicable law. If a request is denied in whole or part, the response will explain the basis when required.

### Appeals

To appeal a privacy-request decision, use `/privacy-request`, select **Appeal a previous decision**, and identify the original request. You may also reply to the decision email with the subject line **Privacy Appeal**.

### Authorized Agents

An authorized agent may submit a request where permitted by law. Hendricks may request evidence of authority and may verify the consumer directly when allowed.

## 13. Additional U.S. State Disclosures

For residents of U.S. states with applicable comprehensive privacy laws, the following summary describes Hendricks' expected website practices during the preceding 12 months:

| Category | Examples | Sources | Purposes | Categories of recipients |
|---|---|---|---|---|
| Identifiers | Name, email, IP address, online identifiers | You; automatically from the website; service providers | Inquiry response, security, communications, administration | Hosting, email, CRM, security, professional advisers |
| Professional information | Employer, title, role, company, industry | You; employer; public professional sources | Qualification, engagement planning, business communications | CRM, email, professional advisers |
| Internet or network activity | Pages, referrer, browser, device, consented analytics events | Automatically from the website | Security, site operation, consented analytics and performance | Hosting, analytics, security |
| Approximate geolocation | Country, state, or city inferred from IP | Automatically from network request | Security, routing, aggregate analytics | Hosting, security, consented analytics |
| Commercial and relationship information | Service interest, budget range, client or partner relationship, invoices | You; client or partner; internal records | Engagement evaluation, administration, accounting | CRM, email, accounting, professional advisers |
| Communications | Inquiry content, emails, meeting notes, feedback | You; authorized representatives | Response, service delivery, records, disputes | Email, CRM, professional advisers |
| Preferences and inferences | Marketing choice, audience type, likely service fit | You; internal analysis | Honor choices, route inquiries, improve operations | CRM, email, analytics in aggregated form |

Hendricks does not intentionally collect sensitive personal information through the public website and does not use or disclose sensitive personal information for purposes requiring a separate right to limit.

Hendricks does not sell the categories above and does not share them for cross-context behavioral advertising.

## 14. Marketing Communications

A service or confirmation message sent in response to your inquiry is not enrollment in marketing.

Hendricks sends recurring marketing email only when permitted. Marketing consent is optional and separated from inquiry submission. You may unsubscribe through the link in any marketing email or by contacting privacy@hendricks.ai.

Hendricks may retain a minimal suppression record to ensure that an unsubscribe request continues to be honored.

## 15. Children

The website is intended for business professionals and is not directed to children under 16. Hendricks does not knowingly collect personal information from children through the website. If you believe a child submitted personal information, contact privacy@hendricks.ai so Hendricks can evaluate and delete it where appropriate.

## 16. Third-Party Links

The website may link to third-party websites, including independent companies, publications, social platforms, and service providers. Hendricks does not control their privacy practices. Review the privacy notice of the destination before providing personal information.

## 17. Changes to This Notice

Hendricks may update this Notice to reflect changes in law, technology, vendors, services, or practices. The updated Notice will be posted with a revised “Last Updated” date. Hendricks will provide additional notice or request new consent when required by law.

## 18. Contact

Questions or privacy requests may be submitted to:

**Hendricks Agency LLC, doing business as Hendricks**  
Email: **privacy@hendricks.ai**  
Privacy requests: `/privacy-request`

For legal notices unrelated to privacy, use **legal@hendricks.ai** after confirming that the address is active and monitored.


---

# Terms of Use

**Effective Date:** [EFFECTIVE DATE]  
**Last Updated:** [LAST UPDATED DATE]

These Terms of Use (“Terms”) govern access to and use of **hendricks.ai** and the public content, forms, features, and materials made available through the website (collectively, the “Site”).

The Site is operated by **Hendricks Agency LLC**, doing business as **Hendricks** (“Hendricks,” “we,” “us,” or “our”).

By accessing or using the Site, you agree to these Terms. If you do not agree, do not use the Site.

Before publication, complete the remaining bracketed dates and venue and have counsel confirm the governing-law, liability, and venue provisions. Hendricks Agency LLC is the confirmed legal entity. No mailing address is published in these Terms at this stage.

## 1. Website Purpose

Hendricks provides information about Search Intelligence Engineering, its methodology, services, research, and potential business engagements.

The Site is provided for general informational and business-development purposes. It is not a client portal, software subscription, or substitute for a signed services agreement.

## 2. Eligibility and Business Use

You may use the Site only if you are legally capable of agreeing to these Terms.

The Site is intended for adults and business professionals. It is not directed to children under 16.

If you use the Site on behalf of an organization, you represent that you have authority to act for that organization with respect to your use of the Site.

## 3. No Client Relationship

Submitting a form, sending an email, scheduling a meeting, receiving information, or discussing a possible project does not:

- Create a client, agency, partnership, fiduciary, employment, or joint-venture relationship;
- Require Hendricks to accept an engagement;
- Create exclusivity;
- Create a duty to keep unsolicited information confidential; or
- Replace a signed master services agreement, statement of work, data-processing agreement, nondisclosure agreement, or other written contract.

A client relationship begins only when Hendricks and the applicable client execute a written agreement.

## 4. Do Not Submit Confidential or Sensitive Information

Do not submit through a public form:

- Passwords or authentication credentials;
- Payment-card or financial-account information;
- Social Security, tax, driver's-license, passport, or other government identifiers;
- Health, genetic, or biometric information;
- Precise geolocation;
- Information about children;
- Trade secrets or privileged materials;
- Client data you are not authorized to disclose; or
- Other confidential, regulated, or sensitive information.

If you need to discuss confidential information, first request an appropriate secure channel and, where necessary, a written confidentiality agreement.

## 5. Separate Terms for Services

Any paid or professional service is governed by the signed agreement for that service. If these Terms conflict with a signed client or partner agreement, the signed agreement controls for the covered service.

Descriptions, examples, methodologies, timelines, and price ranges on the Site are illustrative unless incorporated into a signed agreement.

## 6. No Professional Advice

Site content is not legal, financial, accounting, tax, investment, medical, cybersecurity, or other regulated professional advice.

You are responsible for obtaining advice from qualified professionals concerning your specific circumstances.

Hendricks may discuss measurement, privacy, analytics, AI systems, search strategy, or technical architecture, but public Site content does not constitute a legal opinion, compliance certification, or guarantee.

## 7. No Guarantee of Search, AI, or Business Outcomes

Search engines, AI systems, advertising platforms, analytics providers, and other third parties control their own systems and may change them without notice.

Hendricks does not guarantee:

- Search rankings;
- Inclusion in AI-generated answers;
- Citations or mentions;
- Consideration, recommendation, or selection by an external system;
- Traffic, leads, opportunities, pipeline, revenue, or return on investment;
- Accuracy, stability, availability, or reproducibility of third-party outputs; or
- That a stated strategy will produce the same result for every organization.

Any case study, benchmark, example, score, forecast, estimate, or illustrative interface must be evaluated in its stated context, methodology, timeframe, and limitations. Past results do not guarantee future results.

## 8. Intellectual Property

The Site and its content, including text, research, frameworks, graphics, diagrams, designs, software, code, interfaces, trademarks, service marks, logos, trade dress, and compilations, are owned by or licensed to Hendricks and are protected by applicable intellectual-property laws.

“Hendricks,” “Search Intelligence Engineering,” Hendricks' signal-dot identity, and related names or branding may not be used in a way that suggests sponsorship, endorsement, affiliation, or source without written permission.

Except as expressly permitted, you may not copy, reproduce, republish, distribute, display, perform, modify, create derivative works from, license, sell, or commercially exploit Site content.

## 9. Permitted Use and Attribution

You may:

- View and use the Site for lawful internal business and informational purposes;
- Link to public Site pages without implying endorsement;
- Quote limited portions of public research with accurate attribution and a link to the original page; and
- Download materials expressly offered for download, subject to any additional stated terms.

You may not republish a substantial portion of a page, report, database, framework, or research product without written permission.

## 10. Automated Access

Ordinary search-engine indexing and retrieval that respects `robots.txt`, rate limits, technical controls, and applicable law is permitted.

You may not use bots, scrapers, agents, crawlers, or automated systems to:

- Circumvent access controls or `robots.txt`;
- Create unreasonable traffic or operational burden;
- Extract personal information;
- Reproduce a substantial part of the Site or a proprietary dataset;
- Test or probe for vulnerabilities without authorization;
- Interfere with the Site; or
- Use content in a manner that violates these Terms or applicable law.

Hendricks may limit or block automated access that creates security, performance, legal, or commercial risk.

## 11. User Submissions

If you submit an inquiry, feedback, correction, suggestion, or other material, you represent that:

- The information is accurate to the best of your knowledge;
- You have the right to provide it;
- It does not violate another person's rights, contract, or law;
- It does not contain malicious code; and
- It does not include information prohibited by Section 4.

You grant Hendricks a nonexclusive, worldwide, royalty-free license to use, reproduce, and process the submission only as reasonably necessary to evaluate and respond to it, operate the business, protect legal rights, and improve services.

If you provide general feedback or suggestions that do not contain your confidential information, Hendricks may use those ideas without restriction or compensation.

## 12. Prohibited Conduct

You may not:

- Use the Site for unlawful, fraudulent, deceptive, harassing, or abusive activity;
- Impersonate another person or misrepresent your affiliation;
- Submit false, misleading, or unauthorized information;
- Attempt to gain unauthorized access to systems or accounts;
- Introduce malware or harmful code;
- Interfere with availability, security, or performance;
- Bypass rate limits, consent controls, or security measures;
- Harvest contact or personal information;
- Send unsolicited promotions through Site forms;
- Infringe intellectual-property, privacy, publicity, or other rights;
- Reverse engineer Site software except where law expressly permits and the right cannot be waived; or
- Use the Site to train, build, or operate a competing commercial database or service through unauthorized bulk extraction.

## 13. Research, Definitions, and Corrections

Hendricks may publish research, definitions, frameworks, and analysis based on stated data sources and methodologies.

Research may contain estimates, classifications, samples, inferences, limitations, and information that changes over time. Publication does not mean that every observation is universal, causal, or permanent.

Hendricks may correct, revise, update, archive, or withdraw content. A corrections process may be provided at `/corrections`.

## 14. Third-Party Services and Links

The Site may link to or integrate with third-party websites, analytics services, hosting providers, content systems, communications tools, and independent brands.

Hendricks does not control and is not responsible for third-party content, availability, security, terms, privacy practices, or actions. A link does not necessarily constitute endorsement.

The Search Economy is a separate website and brand founded by Brandon Lincoln Hendricks. Its content and use are governed by the terms displayed on that website, not these Terms.

## 15. Availability and Changes

Hendricks may modify, suspend, restrict, or discontinue any part of the Site at any time.

Hendricks does not promise that the Site will be uninterrupted, error free, secure, current, or compatible with every device or browser.

## 16. Privacy

Hendricks' [Privacy Notice](/privacy) explains how personal information is handled. Privacy choices can be changed through the **Privacy Choices** control in the Site footer.

## 17. Disclaimer of Warranties

TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SITE AND ALL CONTENT ARE PROVIDED “AS IS” AND “AS AVAILABLE.”

HENDRICKS DISCLAIMS ALL EXPRESS, IMPLIED, AND STATUTORY WARRANTIES, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, COMPLETENESS, AVAILABILITY, SECURITY, AND RESULTS.

SOME JURISDICTIONS DO NOT ALLOW CERTAIN WARRANTY DISCLAIMERS, SO SOME OF THE ABOVE MAY NOT APPLY TO YOU.

## 18. Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW, HENDRICKS AND ITS OWNERS, OFFICERS, EMPLOYEES, CONTRACTORS, AFFILIATES, LICENSORS, AND SERVICE PROVIDERS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES; LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITY; OR COSTS OF SUBSTITUTE SERVICES ARISING FROM OR RELATED TO THE SITE.

TO THE MAXIMUM EXTENT PERMITTED BY LAW, HENDRICKS' TOTAL LIABILITY ARISING FROM OR RELATED TO THE SITE WILL NOT EXCEED THE GREATER OF:

1. THE AMOUNT YOU PAID HENDRICKS SPECIFICALLY FOR ACCESS TO THE SITE DURING THE SIX MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM; OR
2. ONE HUNDRED U.S. DOLLARS.

THIS SECTION DOES NOT LIMIT LIABILITY THAT CANNOT LAWFULLY BE LIMITED.

## 19. Indemnification

To the maximum extent permitted by law, you agree to defend, indemnify, and hold harmless Hendricks and its owners, officers, employees, contractors, affiliates, licensors, and service providers from claims, damages, liabilities, judgments, costs, and expenses, including reasonable attorneys' fees, arising from:

- Your unlawful or unauthorized use of the Site;
- Your violation of these Terms;
- Your submission of information you lacked authority to provide; or
- Your infringement or violation of another person's rights.

Hendricks may control the defense of a covered claim, and you agree to provide reasonable cooperation.

## 20. Suspension and Termination

Hendricks may suspend or terminate access to the Site when it reasonably believes that use violates these Terms, threatens security or operations, exposes Hendricks or another person to risk, or is otherwise unlawful.

Sections that by their nature should survive termination will survive, including intellectual property, disclaimers, liability limitations, indemnification, governing law, and dispute provisions.

## 21. Governing Law and Venue

These Terms are governed by the laws of the State of Texas, without regard to conflict-of-law principles.

Subject to any non-waivable law, the state and federal courts located in **[COUNTY], Texas** will have exclusive jurisdiction over disputes arising from or related to the Site or these Terms, and you consent to personal jurisdiction and venue in those courts.

This website Terms document does not create an arbitration agreement. Any arbitration obligation for paid services must appear in the applicable signed services agreement.

## 22. International Use

Hendricks operates the Site from the United States. You are responsible for compliance with laws applicable to your access and use.

Nothing in these Terms limits mandatory consumer or privacy rights that cannot legally be waived.

## 23. Changes to These Terms

Hendricks may update these Terms by posting the revised version and changing the “Last Updated” date.

Material changes will be communicated when required by law. Continued use after an update constitutes acceptance to the extent permitted by law.

## 24. General Terms

If a provision is held unenforceable, it will be modified to the minimum extent necessary or severed, and the remaining provisions will remain effective.

A failure to enforce a provision is not a waiver.

You may not assign your rights or obligations under these Terms without written consent. Hendricks may assign these Terms in connection with a merger, reorganization, financing, sale of assets, or similar transaction.

These Terms and the Privacy Notice constitute the entire agreement concerning public use of the Site, except that a signed agreement controls for services governed by that agreement.

## 25. Contact

Questions about these Terms may be sent to:

**Hendricks Agency LLC, doing business as Hendricks**  
Email: **legal@hendricks.ai**


---

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
- LinkedIn Insight Tag
- Session replay
- A/B testing
- Heatmaps
- Other measurement scripts

### Advertising

After analytics consent, Hendricks may load the LinkedIn Insight Tag to measure visits and LinkedIn-referred traffic. Advertising storage, advertising user data, and advertising personalization remain denied. The Insight Tag is not used for retargeting, audience matching, or cross-context behavioral advertising.

Still not permitted:

- Google Ads remarketing
- Meta Pixel
- TikTok Pixel
- Audience matching
- Cross-context behavioral advertising
- Retargeting
- Advertising personalization
- Session-replay or product-analytics tools such as Hotjar, Microsoft Clarity, or Mixpanel

If another advertising tag is proposed, or if retargeting, audience matching, or advertising storage would be enabled, stop implementation until the Privacy Notice, banner categories, opt-out methods, vendor contracts, state-law analysis, and GPC behavior are updated.

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
- Do not load the LinkedIn Insight Tag or other optional measurement tags.

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

- Execute or accept applicable data-processing terms with Vercel, Google, LinkedIn, Sanity, Resend, Cloudflare, and the CRM provider.
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
- Confirmation that retargeting, audience matching, and advertising storage remain disabled; the LinkedIn Insight Tag loads only after analytics consent
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
- The LinkedIn Insight Tag may load to measure visits and LinkedIn-referred traffic.
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

