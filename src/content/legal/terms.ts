import type { LegalDocument } from '@/content/legal/types'

/**
 * Approved copy, transcribed from `content/pages/20-terms.md`.
 *
 * Two resolved values, both requiring counsel confirmation before launch and
 * both tracked in CONTENT_VERIFICATION.md:
 *
 * - `[COUNTY], Texas` in the venue clause is set to Harris County.
 * - The effective and last-updated dates are set to the transcription date.
 *
 * The source's "Before publication … have counsel confirm the governing-law,
 * liability, and venue provisions" paragraph is an instruction to the
 * implementer and is not rendered.
 *
 * Sections 17 and 18 are capitalised in the source. That is a legal convention
 * for conspicuous disclaimers, not shouting, and is preserved verbatim.
 */

/** Version recorded against form submissions alongside the Privacy Notice. */
export const TERMS_VERSION = '2026-08-16'

export const termsOfUse: LegalDocument = {
  meta: {
    title: 'Terms of Use | Hendricks',
    description:
      'The terms governing access to and use of hendricks.ai, including permitted use, intellectual property, disclaimers, and dispute provisions.',
  },
  hero: {
    eyebrow: 'Legal',
    title: 'Terms of Use',
  },
  effectiveDate: '2026-08-16',
  lastUpdated: '2026-08-16',
  intro: [
    'These Terms of Use (“Terms”) govern access to and use of **hendricks.ai** and the public content, forms, features, and materials made available through the website (collectively, the “Site”).',
    'The Site is operated by **Hendricks Agency LLC**, doing business as **Hendricks** (“Hendricks,” “we,” “us,” or “our”).',
    'By accessing or using the Site, you agree to these Terms. If you do not agree, do not use the Site.',
  ],
  sections: [
    {
      id: 'website-purpose',
      title: 'Website Purpose',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hendricks provides information about Search Intelligence Engineering, its methodology, services, research, and potential business engagements.',
        },
        {
          type: 'paragraph',
          text: 'The Site is provided for general informational and business-development purposes. It is not a client portal, software subscription, or substitute for a signed services agreement.',
        },
      ],
    },
    {
      id: 'eligibility',
      title: 'Eligibility and Business Use',
      blocks: [
        {
          type: 'paragraph',
          text: 'You may use the Site only if you are legally capable of agreeing to these Terms.',
        },
        {
          type: 'paragraph',
          text: 'The Site is intended for adults and business professionals. It is not directed to children under 16.',
        },
        {
          type: 'paragraph',
          text: 'If you use the Site on behalf of an organization, you represent that you have authority to act for that organization with respect to your use of the Site.',
        },
      ],
    },
    {
      id: 'no-client-relationship',
      title: 'No Client Relationship',
      blocks: [
        {
          type: 'paragraph',
          text: 'Submitting a form, sending an email, scheduling a meeting, receiving information, or discussing a possible project does not:',
        },
        {
          type: 'list',
          items: [
            'Create a client, agency, partnership, fiduciary, employment, or joint-venture relationship;',
            'Require Hendricks to accept an engagement;',
            'Create exclusivity;',
            'Create a duty to keep unsolicited information confidential; or',
            'Replace a signed master services agreement, statement of work, data-processing agreement, nondisclosure agreement, or other written contract.',
          ],
        },
        {
          type: 'paragraph',
          text: 'A client relationship begins only when Hendricks and the applicable client execute a written agreement.',
        },
      ],
    },
    {
      id: 'no-confidential-information',
      title: 'Do Not Submit Confidential or Sensitive Information',
      blocks: [
        { type: 'paragraph', text: 'Do not submit through a public form:' },
        {
          type: 'list',
          items: [
            'Passwords or authentication credentials;',
            'Payment-card or financial-account information;',
            "Social Security, tax, driver's-license, passport, or other government identifiers;",
            'Health, genetic, or biometric information;',
            'Precise geolocation;',
            'Information about children;',
            'Trade secrets or privileged materials;',
            'Client data you are not authorized to disclose; or',
            'Other confidential, regulated, or sensitive information.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you need to discuss confidential information, first request an appropriate secure channel and, where necessary, a written confidentiality agreement.',
        },
      ],
    },
    {
      id: 'separate-service-terms',
      title: 'Separate Terms for Services',
      blocks: [
        {
          type: 'paragraph',
          text: 'Any paid or professional service is governed by the signed agreement for that service. If these Terms conflict with a signed client or partner agreement, the signed agreement controls for the covered service.',
        },
        {
          type: 'paragraph',
          text: 'Descriptions, examples, methodologies, timelines, and price ranges on the Site are illustrative unless incorporated into a signed agreement.',
        },
      ],
    },
    {
      id: 'no-professional-advice',
      title: 'No Professional Advice',
      blocks: [
        {
          type: 'paragraph',
          text: 'Site content is not legal, financial, accounting, tax, investment, medical, cybersecurity, or other regulated professional advice.',
        },
        {
          type: 'paragraph',
          text: 'You are responsible for obtaining advice from qualified professionals concerning your specific circumstances.',
        },
        {
          type: 'paragraph',
          text: 'Hendricks may discuss measurement, privacy, analytics, AI systems, search strategy, or technical architecture, but public Site content does not constitute a legal opinion, compliance certification, or guarantee.',
        },
      ],
    },
    {
      id: 'no-guarantee',
      title: 'No Guarantee of Search, AI, or Business Outcomes',
      blocks: [
        {
          type: 'paragraph',
          text: 'Search engines, AI systems, advertising platforms, analytics providers, and other third parties control their own systems and may change them without notice.',
        },
        { type: 'paragraph', text: 'Hendricks does not guarantee:' },
        {
          type: 'list',
          items: [
            'Search rankings;',
            'Inclusion in AI-generated answers;',
            'Citations or mentions;',
            'Consideration, recommendation, or selection by an external system;',
            'Traffic, leads, opportunities, pipeline, revenue, or return on investment;',
            'Accuracy, stability, availability, or reproducibility of third-party outputs; or',
            'That a stated strategy will produce the same result for every organization.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Any case study, benchmark, example, score, forecast, estimate, or illustrative interface must be evaluated in its stated context, methodology, timeframe, and limitations. Past results do not guarantee future results.',
        },
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Site and its content, including text, research, frameworks, graphics, diagrams, designs, software, code, interfaces, trademarks, service marks, logos, trade dress, and compilations, are owned by or licensed to Hendricks and are protected by applicable intellectual-property laws.',
        },
        {
          type: 'paragraph',
          text: "“Hendricks,” “Search Intelligence Engineering,” Hendricks' signal-dot identity, and related names or branding may not be used in a way that suggests sponsorship, endorsement, affiliation, or source without written permission.",
        },
        {
          type: 'paragraph',
          text: 'Except as expressly permitted, you may not copy, reproduce, republish, distribute, display, perform, modify, create derivative works from, license, sell, or commercially exploit Site content.',
        },
      ],
    },
    {
      id: 'permitted-use',
      title: 'Permitted Use and Attribution',
      blocks: [
        { type: 'paragraph', text: 'You may:' },
        {
          type: 'list',
          items: [
            'View and use the Site for lawful internal business and informational purposes;',
            'Link to public Site pages without implying endorsement;',
            'Quote limited portions of public research with accurate attribution and a link to the original page; and',
            'Download materials expressly offered for download, subject to any additional stated terms.',
          ],
        },
        {
          type: 'paragraph',
          text: 'You may not republish a substantial portion of a page, report, database, framework, or research product without written permission.',
        },
      ],
    },
    {
      id: 'automated-access',
      title: 'Automated Access',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ordinary search-engine indexing and retrieval that respects `robots.txt`, rate limits, technical controls, and applicable law is permitted.',
        },
        {
          type: 'paragraph',
          text: 'You may not use bots, scrapers, agents, crawlers, or automated systems to:',
        },
        {
          type: 'list',
          items: [
            'Circumvent access controls or `robots.txt`;',
            'Create unreasonable traffic or operational burden;',
            'Extract personal information;',
            'Reproduce a substantial part of the Site or a proprietary dataset;',
            'Test or probe for vulnerabilities without authorization;',
            'Interfere with the Site; or',
            'Use content in a manner that violates these Terms or applicable law.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Hendricks may limit or block automated access that creates security, performance, legal, or commercial risk.',
        },
      ],
    },
    {
      id: 'user-submissions',
      title: 'User Submissions',
      blocks: [
        {
          type: 'paragraph',
          text: 'If you submit an inquiry, feedback, correction, suggestion, or other material, you represent that:',
        },
        {
          type: 'list',
          items: [
            'The information is accurate to the best of your knowledge;',
            'You have the right to provide it;',
            "It does not violate another person's rights, contract, or law;",
            'It does not contain malicious code; and',
            'It does not include information prohibited by Section 4.',
          ],
        },
        {
          type: 'paragraph',
          text: 'You grant Hendricks a nonexclusive, worldwide, royalty-free license to use, reproduce, and process the submission only as reasonably necessary to evaluate and respond to it, operate the business, protect legal rights, and improve services.',
        },
        {
          type: 'paragraph',
          text: 'If you provide general feedback or suggestions that do not contain your confidential information, Hendricks may use those ideas without restriction or compensation.',
        },
      ],
    },
    {
      id: 'prohibited-conduct',
      title: 'Prohibited Conduct',
      blocks: [
        { type: 'paragraph', text: 'You may not:' },
        {
          type: 'list',
          items: [
            'Use the Site for unlawful, fraudulent, deceptive, harassing, or abusive activity;',
            'Impersonate another person or misrepresent your affiliation;',
            'Submit false, misleading, or unauthorized information;',
            'Attempt to gain unauthorized access to systems or accounts;',
            'Introduce malware or harmful code;',
            'Interfere with availability, security, or performance;',
            'Bypass rate limits, consent controls, or security measures;',
            'Harvest contact or personal information;',
            'Send unsolicited promotions through Site forms;',
            'Infringe intellectual-property, privacy, publicity, or other rights;',
            'Reverse engineer Site software except where law expressly permits and the right cannot be waived; or',
            'Use the Site to train, build, or operate a competing commercial database or service through unauthorized bulk extraction.',
          ],
        },
      ],
    },
    {
      id: 'research-and-corrections',
      title: 'Research, Definitions, and Corrections',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hendricks may publish research, definitions, frameworks, and analysis based on stated data sources and methodologies.',
        },
        {
          type: 'paragraph',
          text: 'Research may contain estimates, classifications, samples, inferences, limitations, and information that changes over time. Publication does not mean that every observation is universal, causal, or permanent.',
        },
        {
          type: 'paragraph',
          text: 'Hendricks may correct, revise, update, archive, or withdraw content. A corrections process may be provided.',
        },
      ],
    },
    {
      id: 'third-party-services',
      title: 'Third-Party Services and Links',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Site may link to or integrate with third-party websites, analytics services, hosting providers, content systems, communications tools, and independent brands.',
        },
        {
          type: 'paragraph',
          text: 'Hendricks does not control and is not responsible for third-party content, availability, security, terms, privacy practices, or actions. A link does not necessarily constitute endorsement.',
        },
        {
          type: 'paragraph',
          text: 'The Search Economy is a separate website and brand founded by Brandon Lincoln Hendricks. Its content and use are governed by the terms displayed on that website, not these Terms.',
        },
      ],
    },
    {
      id: 'availability',
      title: 'Availability and Changes',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hendricks may modify, suspend, restrict, or discontinue any part of the Site at any time.',
        },
        {
          type: 'paragraph',
          text: 'Hendricks does not promise that the Site will be uninterrupted, error free, secure, current, or compatible with every device or browser.',
        },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy',
      blocks: [
        {
          type: 'paragraph',
          text: "Hendricks' [Privacy Notice](/privacy) explains how personal information is handled. Privacy choices can be changed through the **Privacy Choices** control in the Site footer.",
        },
      ],
    },
    {
      id: 'warranty-disclaimer',
      title: 'Disclaimer of Warranties',
      blocks: [
        {
          type: 'paragraph',
          text: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SITE AND ALL CONTENT ARE PROVIDED “AS IS” AND “AS AVAILABLE.”',
        },
        {
          type: 'paragraph',
          text: 'HENDRICKS DISCLAIMS ALL EXPRESS, IMPLIED, AND STATUTORY WARRANTIES, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, COMPLETENESS, AVAILABILITY, SECURITY, AND RESULTS.',
        },
        {
          type: 'paragraph',
          text: 'SOME JURISDICTIONS DO NOT ALLOW CERTAIN WARRANTY DISCLAIMERS, SO SOME OF THE ABOVE MAY NOT APPLY TO YOU.',
        },
      ],
    },
    {
      id: 'limitation-of-liability',
      title: 'Limitation of Liability',
      blocks: [
        {
          type: 'paragraph',
          text: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, HENDRICKS AND ITS OWNERS, OFFICERS, EMPLOYEES, CONTRACTORS, AFFILIATES, LICENSORS, AND SERVICE PROVIDERS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES; LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITY; OR COSTS OF SUBSTITUTE SERVICES ARISING FROM OR RELATED TO THE SITE.',
        },
        {
          type: 'paragraph',
          text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, HENDRICKS' TOTAL LIABILITY ARISING FROM OR RELATED TO THE SITE WILL NOT EXCEED THE GREATER OF:",
        },
        {
          type: 'list',
          items: [
            'THE AMOUNT YOU PAID HENDRICKS SPECIFICALLY FOR ACCESS TO THE SITE DURING THE SIX MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM; OR',
            'ONE HUNDRED U.S. DOLLARS.',
          ],
        },
        {
          type: 'paragraph',
          text: 'THIS SECTION DOES NOT LIMIT LIABILITY THAT CANNOT LAWFULLY BE LIMITED.',
        },
      ],
    },
    {
      id: 'indemnification',
      title: 'Indemnification',
      blocks: [
        {
          type: 'paragraph',
          text: 'To the maximum extent permitted by law, you agree to defend, indemnify, and hold harmless Hendricks and its owners, officers, employees, contractors, affiliates, licensors, and service providers from claims, damages, liabilities, judgments, costs, and expenses, including reasonable attorneys\u2019 fees, arising from:',
        },
        {
          type: 'list',
          items: [
            'Your unlawful or unauthorized use of the Site;',
            'Your violation of these Terms;',
            'Your submission of information you lacked authority to provide; or',
            "Your infringement or violation of another person's rights.",
          ],
        },
        {
          type: 'paragraph',
          text: 'Hendricks may control the defense of a covered claim, and you agree to provide reasonable cooperation.',
        },
      ],
    },
    {
      id: 'termination',
      title: 'Suspension and Termination',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hendricks may suspend or terminate access to the Site when it reasonably believes that use violates these Terms, threatens security or operations, exposes Hendricks or another person to risk, or is otherwise unlawful.',
        },
        {
          type: 'paragraph',
          text: 'Sections that by their nature should survive termination will survive, including intellectual property, disclaimers, liability limitations, indemnification, governing law, and dispute provisions.',
        },
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing Law and Venue',
      blocks: [
        {
          type: 'paragraph',
          text: 'These Terms are governed by the laws of the State of Texas, without regard to conflict-of-law principles.',
        },
        {
          type: 'paragraph',
          text: 'Subject to any non-waivable law, the state and federal courts located in **Harris County, Texas** will have exclusive jurisdiction over disputes arising from or related to the Site or these Terms, and you consent to personal jurisdiction and venue in those courts.',
        },
        {
          type: 'paragraph',
          text: 'This website Terms document does not create an arbitration agreement. Any arbitration obligation for paid services must appear in the applicable signed services agreement.',
        },
      ],
    },
    {
      id: 'international-use',
      title: 'International Use',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hendricks operates the Site from the United States. You are responsible for compliance with laws applicable to your access and use.',
        },
        {
          type: 'paragraph',
          text: 'Nothing in these Terms limits mandatory consumer or privacy rights that cannot legally be waived.',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Changes to These Terms',
      blocks: [
        {
          type: 'paragraph',
          text: 'Hendricks may update these Terms by posting the revised version and changing the “Last Updated” date.',
        },
        {
          type: 'paragraph',
          text: 'Material changes will be communicated when required by law. Continued use after an update constitutes acceptance to the extent permitted by law.',
        },
      ],
    },
    {
      id: 'general',
      title: 'General Terms',
      blocks: [
        {
          type: 'paragraph',
          text: 'If a provision is held unenforceable, it will be modified to the minimum extent necessary or severed, and the remaining provisions will remain effective.',
        },
        { type: 'paragraph', text: 'A failure to enforce a provision is not a waiver.' },
        {
          type: 'paragraph',
          text: 'You may not assign your rights or obligations under these Terms without written consent. Hendricks may assign these Terms in connection with a merger, reorganization, financing, sale of assets, or similar transaction.',
        },
        {
          type: 'paragraph',
          text: 'These Terms and the Privacy Notice constitute the entire agreement concerning public use of the Site, except that a signed agreement controls for services governed by that agreement.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      blocks: [
        { type: 'paragraph', text: 'Questions about these Terms may be sent to:' },
        {
          type: 'list',
          items: [
            '**Hendricks Agency LLC, doing business as Hendricks**',
            'Email: **legal@hendricks.ai**',
          ],
        },
      ],
    },
  ],
}
