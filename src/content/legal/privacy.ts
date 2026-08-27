import type { LegalDocument } from '@/content/legal/types'

/**
 * Approved copy, transcribed from `content/pages/19-privacy.md`.
 *
 * Two things in the source are instructions to the implementer rather than page
 * copy and are deliberately not rendered: the "Before publication, complete the
 * remaining bracketed dates" paragraph, and the note inside section 7 that the
 * vendor list "must be verified before publication". Both are tracked in
 * CONTENT_VERIFICATION.md instead, where an unmet condition blocks launch rather
 * than being published to visitors as an admission.
 *
 * The retention and state-disclosure tables are transcribed exactly. Changing a
 * retention period here changes a published promise, so any edit needs the same
 * approval the original did.
 */

/** Version recorded against form submissions (docs/16 §7). */
export const PRIVACY_NOTICE_VERSION = '2026-08-27'

export const privacyNotice: LegalDocument = {
  meta: {
    title: 'Privacy Notice | Hendricks',
    description:
      'How Hendricks Agency LLC collects, uses, discloses, and protects personal information across the Hendricks website, forms, and business relationships.',
  },
  hero: {
    eyebrow: 'Legal',
    title: 'Privacy Notice',
  },
  effectiveDate: '2026-08-27',
  lastUpdated: '2026-08-27',
  intro: [
    'This Privacy Notice explains how **Hendricks Agency LLC**, doing business as **Hendricks** (“Hendricks,” “we,” “us,” or “our”), collects, uses, discloses, and protects personal information when you visit **hendricks.ai**, submit an inquiry or application, subscribe to communications, interact with us, or receive services that refer to this Notice.',
  ],
  sections: [
    {
      id: 'who-we-are',
      title: 'Who We Are',
      blocks: [
        { type: 'paragraph', text: 'Hendricks is a Search Intelligence Engineering firm based in Texas.' },
        {
          type: 'list',
          items: [
            '**Legal entity:** Hendricks Agency LLC',
            '**Privacy email:** privacy@hendricks.ai',
            '**Privacy request form:** [/privacy-request](/privacy-request)',
          ],
        },
        {
          type: 'paragraph',
          text: 'For personal information processed under a separate client agreement, statement of work, data-processing agreement, or agency-partner agreement, that agreement may provide additional or different terms.',
        },
      ],
    },
    {
      id: 'scope',
      title: 'Scope',
      blocks: [
        {
          type: 'paragraph',
          text: 'This Notice applies to personal information Hendricks processes in connection with:',
        },
        {
          type: 'list',
          items: [
            'The Hendricks website and its public pages;',
            'Diagnostic, contact, agency-partnership, and privacy-request forms;',
            'Research and marketing subscriptions;',
            'Emails, meetings, and business communications;',
            'Prospective, current, and former client and partner relationships;',
            'Website security, analytics, and performance monitoring; and',
            'Other interactions that link to this Notice.',
          ],
        },
        {
          type: 'paragraph',
          text: 'This Notice does not govern third-party websites or services that have their own privacy notices. The Search Economy is a separate website and brand; its privacy practices are governed by the notice displayed on that website.',
        },
      ],
    },
    {
      id: 'information-we-collect',
      title: 'Personal Information We Collect',
      blocks: [
        {
          type: 'paragraph',
          text: 'The information we collect depends on how you interact with Hendricks.',
        },
        { type: 'subheading', text: 'A. Information You Provide' },
        { type: 'paragraph', text: 'We may collect:' },
        {
          type: 'list',
          items: [
            '**Contact information**, such as name, business email address, and other contact details you choose to provide;',
            '**Professional and company information**, such as employer, role, company website, industry, market, agency relationship, and business priorities;',
            '**Inquiry and application information**, such as your search, AI-visibility, analytics, technical, measurement, timing, budget-range, and service questions;',
            '**Communications**, including emails, meeting notes, feedback, and other correspondence;',
            '**Marketing preferences**, including whether you requested or withdrew email communications;',
            '**Privacy-request information**, including information needed to verify and respond to a request; and',
            '**Client and partner records**, such as contracts, authorized contacts, project administration, invoices, and service-delivery communications.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Do not provide passwords, payment-card information, government identification numbers, health information, precise geolocation, client-confidential data, or other sensitive personal information through a public website form.',
        },
        { type: 'subheading', text: 'B. Information Collected Automatically' },
        {
          type: 'paragraph',
          text: 'When you visit the website, we and our service providers may automatically process:',
        },
        {
          type: 'list',
          items: [
            'IP address and network information;',
            'Browser, device, and operating-system information;',
            'Approximate location derived from IP address, such as country, state, or city;',
            'Page views, routes, referring page, navigation, and interaction events;',
            'Date and time of access;',
            'Website-performance and error information;',
            'Security and anti-abuse signals; and',
            'Consent and privacy-preference information.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Optional analytics technologies are blocked until you accept analytics through the consent interface. Hendricks does not permit analytics events to contain names, email addresses, company names, form-field values, inquiry text, or other directly identifying form content.',
        },
        { type: 'subheading', text: 'C. Information From Other Sources' },
        {
          type: 'paragraph',
          text: 'We may receive business contact or professional information from:',
        },
        {
          type: 'list',
          items: [
            'Your employer, colleague, agency, or authorized representative;',
            'Service providers used to operate our business;',
            'Publicly available professional and company sources;',
            'Business partners or referral sources; and',
            'Clients or agencies that authorize us to communicate with you.',
          ],
        },
        {
          type: 'paragraph',
          text: 'We do not knowingly purchase consumer lists for unrelated mass marketing.',
        },
      ],
    },
    {
      id: 'how-we-use',
      title: 'How We Use Personal Information',
      blocks: [
        { type: 'paragraph', text: 'We may use personal information to:' },
        {
          type: 'list',
          items: [
            'Evaluate, route, and respond to inquiries;',
            'Determine whether a Diagnostic, partnership, or other engagement is appropriate;',
            'Take steps requested before entering a contract;',
            'Provide, administer, secure, and improve services;',
            'Communicate with client and agency-partner representatives;',
            'Send service, administrative, and security messages;',
            'Send marketing communications when permitted and honor unsubscribe choices;',
            'Operate, troubleshoot, secure, and improve the website;',
            'Measure website use and performance after required consent;',
            'Prevent fraud, spam, abuse, and security incidents;',
            'Maintain business, tax, accounting, legal, and compliance records;',
            'Establish, exercise, or defend legal claims;',
            'Enforce agreements and website terms;',
            'Comply with law and lawful requests;',
            'Evaluate or complete a merger, financing, acquisition, reorganization, or transfer of all or part of the business; and',
            'Use deidentified or aggregated information for analysis, provided it is not used to identify an individual.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Hendricks does not use website inquiries to make solely automated decisions that produce legal or similarly significant effects. Automated tools may help route, categorize, summarize, or prioritize an inquiry, but a human remains responsible for material business decisions.',
        },
      ],
    },
    {
      id: 'legal-bases',
      title: 'Legal Bases for EEA and UK Processing',
      blocks: [
        {
          type: 'paragraph',
          text: 'If European Economic Area or United Kingdom data-protection law applies, Hendricks relies on one or more of the following legal bases:',
        },
        {
          type: 'list',
          items: [
            '**Steps requested before a contract or performance of a contract**, such as evaluating an inquiry or delivering agreed services;',
            '**Legitimate interests**, such as operating a B2B website, responding to business inquiries, maintaining business relationships, improving services, preventing fraud, and protecting systems, when those interests are not overridden by your rights;',
            '**Consent**, such as optional analytics and optional email marketing;',
            '**Legal obligations**, such as tax, accounting, regulatory, and lawful-request requirements; and',
            '**Legal claims**, when processing is necessary to establish, exercise, or defend rights.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Where processing relies on consent, you may withdraw it at any time. Withdrawal does not affect processing that occurred before withdrawal.',
        },
      ],
    },
    {
      id: 'cookies-and-analytics',
      title: 'Cookies, Similar Technologies, and Analytics',
      blocks: [
        { type: 'subheading', text: 'A. Strictly Necessary Technologies' },
        { type: 'paragraph', text: 'We use technologies required to:' },
        {
          type: 'list',
          items: [
            'Deliver and secure the website;',
            'Process forms you request;',
            'Prevent spam and abuse;',
            'Balance and route traffic; and',
            'Remember your privacy choice.',
          ],
        },
        {
          type: 'paragraph',
          text: 'These technologies are active because the website cannot reliably provide the requested function without them.',
        },
        { type: 'subheading', text: 'B. Optional Analytics' },
        { type: 'paragraph', text: 'With your permission, Hendricks may use:' },
        {
          type: 'list',
          items: [
            '**Google Analytics 4**, to measure website use and events;',
            '**Vercel Web Analytics**, to understand page visits and referral patterns; and',
            '**Vercel Speed Insights**, to measure website performance.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Although Vercel describes its analytics and performance products as cookie-free and privacy focused, Hendricks treats them as optional at launch and blocks them until analytics consent.',
        },
        {
          type: 'paragraph',
          text: 'Hendricks uses basic consent mode for Google tags: Google Analytics is not loaded and Google measurement requests are not sent before analytics consent. Advertising storage, advertising user data, and advertising personalization remain denied.',
        },
        {
          type: 'paragraph',
          text: 'You may accept, reject, or withdraw optional analytics at any time through the **Privacy Choices** link in the website footer.',
        },
        { type: 'subheading', text: 'C. Global Privacy Control' },
        {
          type: 'paragraph',
          text: 'Where a supported browser sends a Global Privacy Control signal, Hendricks treats the signal as a request to reject optional analytics and, where applicable, to opt out of sale, sharing, and targeted advertising.',
        },
        { type: 'subheading', text: 'D. Advertising and Retargeting' },
        {
          type: 'paragraph',
          text: 'With analytics consent, Hendricks may use the LinkedIn Insight Tag to measure visits and LinkedIn-referred traffic. Advertising storage remains denied. Hendricks does not use retargeting, audience matching, or cross-context behavioral advertising, and does not use session-replay or product-analytics tools such as Hotjar, Microsoft Clarity, or Mixpanel. If these practices change, Hendricks will update this Notice and the privacy-choice mechanism before enabling them.',
        },
      ],
    },
    {
      id: 'how-we-disclose',
      title: 'How We Disclose Personal Information',
      blocks: [
        {
          type: 'paragraph',
          text: 'We may disclose personal information to the following categories of recipients for the purposes described in this Notice:',
        },
        { type: 'subheading', text: 'A. Service Providers' },
        {
          type: 'paragraph',
          text: 'Service providers may process information only to provide contracted functions, such as:',
        },
        {
          type: 'list',
          items: [
            'Website hosting, content delivery, and infrastructure;',
            'Content management;',
            'Email delivery;',
            'Customer-relationship management;',
            'Form security and anti-abuse;',
            'Analytics and performance measurement after consent;',
            'Logging, monitoring, backup, and security;',
            'Professional consulting; and',
            'Accounting, legal, and administrative support.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The service-provider stack may include Vercel, Google, Sanity, Resend, Cloudflare, and the selected customer-relationship platform. After analytics consent, it may also include LinkedIn as a measurement vendor.',
        },
        { type: 'subheading', text: 'B. Professional Advisers' },
        {
          type: 'paragraph',
          text: 'We may disclose information to attorneys, accountants, insurers, auditors, and other advisers when reasonably necessary.',
        },
        { type: 'subheading', text: 'C. Business Partners and Authorized Parties' },
        {
          type: 'paragraph',
          text: "We may disclose information to a client's agency, a partner, or another party when you request or authorize the disclosure, or when necessary to deliver an agreed engagement.",
        },
        { type: 'subheading', text: 'D. Legal and Safety Purposes' },
        {
          type: 'paragraph',
          text: 'We may disclose information when we reasonably believe it is necessary to comply with law or legal process; protect rights, property, or safety; investigate fraud or security incidents; or enforce agreements.',
        },
        { type: 'subheading', text: 'E. Business Transactions' },
        {
          type: 'paragraph',
          text: 'Information may be disclosed or transferred as part of a merger, acquisition, financing, reorganization, bankruptcy, sale of assets, or similar transaction, subject to appropriate confidentiality and legal requirements.',
        },
      ],
    },
    {
      id: 'sale-and-sharing',
      title: 'Sale, Sharing, and Targeted Advertising',
      blocks: [
        { type: 'paragraph', text: 'Hendricks does not sell personal information for money.' },
        {
          type: 'paragraph',
          text: 'Hendricks also does not share personal information for cross-context behavioral advertising and does not process personal information for targeted advertising as those terms are defined by applicable U.S. state privacy laws.',
        },
        {
          type: 'paragraph',
          text: 'If those practices change, Hendricks will provide the required notice, opt-out method, and recognition of applicable browser-based opt-out signals before the change takes effect.',
        },
      ],
    },
    {
      id: 'retention',
      title: 'Data Retention',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hendricks retains personal information only for as long as reasonably necessary for the purposes described in this Notice, including legal, accounting, security, dispute, and contract requirements.',
        },
        {
          type: 'paragraph',
          text: 'Unless a longer or shorter period is required, the recommended launch schedule is:',
        },
        {
          type: 'table',
          caption: 'Record types and their general retention periods',
          columns: ['Record', 'General retention'],
          rows: [
            [
              'Unconverted inquiry or Diagnostic application',
              '24 months after the last meaningful interaction',
            ],
            [
              'Marketing subscription',
              'Until unsubscribe or invalidation; retain a minimal suppression record as needed to honor the choice',
            ],
            [
              'Consent and privacy-preference record',
              'Five years after the last recorded preference, unless a different period is legally appropriate',
            ],
            [
              'Security and anti-abuse logs',
              'Up to 12 months, unless needed for an active incident or legal requirement',
            ],
            [
              'Privacy-rights request and response',
              '24 months after closure, unless a longer period is required',
            ],
            [
              'Client, contract, invoice, and project-administration records',
              'During the relationship and generally seven years afterward, subject to contract and legal requirements',
            ],
            [
              'Analytics data',
              'According to configured vendor-retention settings and only for as long as reasonably needed',
            ],
            ['Backups', 'Until overwritten or deleted under the applicable backup cycle'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Hendricks may retain information longer when necessary to comply with law, resolve disputes, enforce agreements, investigate security events, or establish or defend legal claims. Information may be deidentified instead of deleted where permitted.',
        },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hendricks uses reasonable administrative, technical, and organizational safeguards designed to protect personal information. Measures may include access controls, encryption in transit, least-privilege access, vendor review, secure development practices, monitoring, backups, and incident-response procedures.',
        },
        {
          type: 'paragraph',
          text: 'No method of transmission or storage is completely secure. Hendricks cannot guarantee absolute security, and you should not submit information through the website that is inappropriate for ordinary business email or web-form transmission.',
        },
      ],
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hendricks is based in the United States, and personal information may be processed in the United States and other countries where Hendricks or its service providers operate.',
        },
        {
          type: 'paragraph',
          text: "Where required, Hendricks will use an approved transfer mechanism, such as contractual safeguards, an applicable adequacy decision, or a service provider's participation in a recognized data-transfer framework.",
        },
      ],
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      blocks: [
        {
          type: 'paragraph',
          text: 'Depending on where you live and subject to applicable exceptions, you may have the right to:',
        },
        {
          type: 'list',
          items: [
            'Confirm whether Hendricks processes personal information about you;',
            'Access personal information and obtain a copy;',
            'Correct inaccurate information;',
            'Delete information;',
            'Obtain certain information in a portable format;',
            'Restrict or object to certain processing;',
            'Withdraw consent;',
            'Opt out of sale, sharing, targeted advertising, or certain profiling;',
            'Limit certain uses of sensitive personal information, where applicable;',
            'Appeal a decision concerning a privacy request; and',
            'Receive equal service without unlawful discrimination for exercising a right.',
          ],
        },
        { type: 'subheading', text: 'How to Exercise a Right' },
        {
          type: 'paragraph',
          text: 'Submit a request through [/privacy-request](/privacy-request) or email **privacy@hendricks.ai** with the subject line **Privacy Request**.',
        },
        {
          type: 'paragraph',
          text: 'Please describe the request and provide the information reasonably necessary to identify the relevant records. Hendricks may take proportionate steps to verify your identity or authority. Do not send government identification unless Hendricks specifically requests a secure verification method.',
        },
        {
          type: 'paragraph',
          text: 'Hendricks will respond within the period required by applicable law. If a request is denied in whole or part, the response will explain the basis when required.',
        },
        { type: 'subheading', text: 'Appeals' },
        {
          type: 'paragraph',
          text: 'To appeal a privacy-request decision, use [/privacy-request](/privacy-request), select **Appeal a previous decision**, and identify the original request. You may also reply to the decision email with the subject line **Privacy Appeal**.',
        },
        { type: 'subheading', text: 'Authorized Agents' },
        {
          type: 'paragraph',
          text: 'An authorized agent may submit a request where permitted by law. Hendricks may request evidence of authority and may verify the consumer directly when allowed.',
        },
      ],
    },
    {
      id: 'state-disclosures',
      title: 'Additional U.S. State Disclosures',
      blocks: [
        {
          type: 'paragraph',
          text: "For residents of U.S. states with applicable comprehensive privacy laws, the following summary describes Hendricks' expected website practices during the preceding 12 months:",
        },
        {
          type: 'table',
          caption:
            'Categories of personal information, their sources, purposes, and recipients',
          columns: ['Category', 'Examples', 'Sources', 'Purposes', 'Categories of recipients'],
          rows: [
            [
              'Identifiers',
              'Name, email, IP address, online identifiers',
              'You; automatically from the website; service providers',
              'Inquiry response, security, communications, administration',
              'Hosting, email, CRM, security, professional advisers',
            ],
            [
              'Professional information',
              'Employer, title, role, company, industry',
              'You; employer; public professional sources',
              'Qualification, engagement planning, business communications',
              'CRM, email, professional advisers',
            ],
            [
              'Internet or network activity',
              'Pages, referrer, browser, device, consented analytics events',
              'Automatically from the website',
              'Security, site operation, consented analytics and performance',
              'Hosting, analytics, security',
            ],
            [
              'Approximate geolocation',
              'Country, state, or city inferred from IP',
              'Automatically from network request',
              'Security, routing, aggregate analytics',
              'Hosting, security, consented analytics',
            ],
            [
              'Commercial and relationship information',
              'Service interest, budget range, client or partner relationship, invoices',
              'You; client or partner; internal records',
              'Engagement evaluation, administration, accounting',
              'CRM, email, accounting, professional advisers',
            ],
            [
              'Communications',
              'Inquiry content, emails, meeting notes, feedback',
              'You; authorized representatives',
              'Response, service delivery, records, disputes',
              'Email, CRM, professional advisers',
            ],
            [
              'Preferences and inferences',
              'Marketing choice, audience type, likely service fit',
              'You; internal analysis',
              'Honor choices, route inquiries, improve operations',
              'CRM, email, analytics in aggregated form',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'Hendricks does not intentionally collect sensitive personal information through the public website and does not use or disclose sensitive personal information for purposes requiring a separate right to limit.',
        },
        {
          type: 'paragraph',
          text: 'Hendricks does not sell the categories above and does not share them for cross-context behavioral advertising.',
        },
      ],
    },
    {
      id: 'marketing',
      title: 'Marketing Communications',
      blocks: [
        {
          type: 'paragraph',
          text: 'A service or confirmation message sent in response to your inquiry is not enrollment in marketing.',
        },
        {
          type: 'paragraph',
          text: 'Hendricks sends recurring marketing email only when permitted. Marketing consent is optional and separated from inquiry submission. You may unsubscribe through the link in any marketing email or by contacting privacy@hendricks.ai.',
        },
        {
          type: 'paragraph',
          text: 'Hendricks may retain a minimal suppression record to ensure that an unsubscribe request continues to be honored.',
        },
      ],
    },
    {
      id: 'children',
      title: 'Children',
      blocks: [
        {
          type: 'paragraph',
          text: 'The website is intended for business professionals and is not directed to children under 16. Hendricks does not knowingly collect personal information from children through the website. If you believe a child submitted personal information, contact privacy@hendricks.ai so Hendricks can evaluate and delete it where appropriate.',
        },
      ],
    },
    {
      id: 'third-party-links',
      title: 'Third-Party Links',
      blocks: [
        {
          type: 'paragraph',
          text: 'The website may link to third-party websites, including independent companies, publications, social platforms, and service providers. Hendricks does not control their privacy practices. Review the privacy notice of the destination before providing personal information.',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to This Notice',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hendricks may update this Notice to reflect changes in law, technology, vendors, services, or practices. The updated Notice will be posted with a revised “Last Updated” date. Hendricks will provide additional notice or request new consent when required by law.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      blocks: [
        { type: 'paragraph', text: 'Questions or privacy requests may be submitted to:' },
        {
          type: 'list',
          items: [
            '**Hendricks Agency LLC, doing business as Hendricks**',
            'Email: **privacy@hendricks.ai**',
            'Privacy requests: [/privacy-request](/privacy-request)',
          ],
        },
        {
          type: 'paragraph',
          text: 'For legal notices unrelated to privacy, use **legal@hendricks.ai**.',
        },
      ],
    },
  ],
}
