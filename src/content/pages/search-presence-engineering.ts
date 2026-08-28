import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import type { EngineeringLayer } from '@/components/visuals/engineering-layers'
import { routes } from '@/config/routes'

/** Approved copy, transcribed from content/pages/05-search-presence-engineering.md. */

export const meta = {
  title: 'Search Presence Engineering for Google and AI Search | Hendricks',
  description:
    'Improve the technical, entity, content, evidence, authority, acquisition, and conversion conditions that make your brand easier to discover, understand, trust, and recommend.',
} as const

export const hero = {
  eyebrow: 'Search Presence Engineering',
  title:
    'Build the conditions that make your brand easier to discover, understand, trust, and recommend.',
  lead: [
    'Selection Intelligence identifies where the brand is losing.',
    'Search Presence Engineering turns those findings into prioritized implementation.',
    'The work is not limited to publishing more articles.',
    'A selection gap can originate from technical access, unclear positioning, weak service associations, missing proof, insufficient independent evidence, inconsistent profiles, poor decision content, ineffective landing pages, or disconnected paid and organic strategies.',
  ],
  primaryCta: {
    label: 'Review Your Search Presence',
    href: routes.diagnostic.path,
    analytics: { location: 'spe_hero', solutionName: 'Search Presence Engineering' },
  } satisfies Cta,
} as const

export const layers = {
  eyebrow: 'Seven Engineering Layers',
  title: 'Seven conditions a brand can actually control.',
  items: [
    {
      number: '01',
      title: 'Technical access',
      description:
        'Ensure important information can be crawled, indexed, rendered, retrieved, and understood without unnecessary barriers. Structured data is implemented here for entity clarity and eligibility in traditional search features, not because it lifts AI citation. Google Search Central states there is no special structured data to add for AI Overviews or AI Mode, and Hendricks does not sell it as a citation lever.',
      workItems: [
        'Crawl and indexation',
        'Server-rendered content',
        'Canonicalization',
        'Internal linking',
        'Site architecture',
        'Performance',
        'Structured data aligned with visible content',
        'Bot access and server-log analysis',
        'Sitemap and update systems',
      ],
    },
    {
      number: '02',
      title: 'Entity clarity',
      description:
        'Define the organization, services, products, people, expertise, locations, categories, credentials, and relationships consistently.',
      workItems: [
        'Organization and service definitions',
        'Founder and expert profiles',
        'Product and service relationships',
        'Location relationships',
        'Author identity',
        'External profile consistency',
        'Naming and category clarity',
      ],
    },
    {
      number: '03',
      title: 'Decision-stage content',
      description: 'Create resources that help customers evaluate options and make decisions.',
      workItems: [
        'Service and product pages',
        'Use-case pages',
        'Comparison pages',
        'Alternative pages',
        'Buyer guides',
        'FAQs',
        'Methodology pages',
        'Original research',
        'Decision tables',
        'Expert answers',
        'Video transcripts',
        'Case studies',
      ],
    },
    {
      number: '04',
      title: 'Evidence',
      description: 'Support claims with information a customer and external system can verify.',
      workItems: [
        'Customer proof',
        'Case evidence',
        'Original data',
        'Methodology',
        'Credentials',
        'Security and compliance evidence',
        'Pricing clarity',
        'Availability and service information',
        'Product details',
        'Clear limitations',
      ],
    },
    {
      number: '05',
      title: 'Authority and independent corroboration',
      description: 'Strengthen the off-site information environment around the brand.',
      workItems: [
        'Relevant media',
        'Expert commentary',
        'Industry publications',
        'Review platforms',
        'Directories and databases',
        'Partner pages',
        'Associations',
        'Podcasts and speaking',
        'Digital PR',
        'Source corrections',
      ],
    },
    {
      number: '06',
      description: 'Use paid and organic search as one demand-capture system.',
      workItems: [
        'Shared query taxonomy',
        'Paid-versus-organic coverage',
        'Budget overlap',
        'Landing-page alignment',
        'Message testing',
        'Incrementality analysis',
        'Competitor coverage',
        'Conversion-quality analysis',
      ],
    },
    {
      number: '07',
      title: 'Conversion readiness',
      description:
        'Ensure that the customer can act after discovering or researching the brand.',
      workItems: [
        'Calls to action',
        'Proof placement',
        'Forms',
        'Appointment paths',
        'Lead qualification',
        'Landing-page experience',
        'CRM capture',
        'Sales handoff',
      ],
    },
  ] satisfies readonly EngineeringLayer[],
} as const

export const scope = {
  title: 'Not every problem needs every layer.',
  body: [
    'Hendricks does not sell a predetermined content package.',
    'The Search Intelligence Diagnostic identifies which conditions are most relevant, which can be changed, what should be tested first, and what should not be built.',
  ],
} as const

export const deliverables = {
  title: 'What Search Presence Engineering produces.',
  items: [
    'Prioritized intervention roadmap',
    'Technical and entity specifications',
    'Content and information architecture',
    'Evidence-development plan',
    'Third-party authority priorities',
    'Paid and organic search plan',
    'Landing-page requirements',
    'Experiment backlog',
    'Implementation documentation',
    'Intervention Ledger',
    'Before-and-after measurement',
  ],
} as const

export const ledger = {
  eyebrow: 'Intervention Ledger',
  title: 'Every change is recorded so the result can be defended later.',
  lead: 'Each intervention records:',
  fields: [
    'Target demand context',
    'Baseline condition',
    'Observed gap',
    'Hypothesis',
    'Change',
    'Owner',
    'Implementation date',
    'Leading indicator',
    'Commercial indicator',
    'Result',
    'Evidence grade',
    'Learning',
  ],
  caption:
    'Field structure only. Hendricks does not publish a populated dashboard as though it were a client result.',
} as const

export const trust = {
  title: 'What Hendricks can and cannot control.',
  body: [
    'No firm controls whether an external AI or search system includes, cites, or recommends a brand.',
    'Hendricks improves the quality, clarity, accessibility, relevance, evidence, authority, and measurement of the brand’s search presence.',
  ],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.selectionIntelligence.path,
    label: 'Selection Intelligence',
    description: 'Identify the gaps before deciding what to change.',
  },
  {
    href: routes.searchImpactMeasurement.path,
    label: 'Search Impact Measurement',
    description: 'Connect implemented changes to commercial outcomes.',
  },
  {
    href: routes.howItWorks.path,
    label: 'How It Works',
    description: 'See how engineering fits the six-stage system.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'How interventions are prioritized, tested, and graded.',
  },
  {
    href: routes.whatIsSearchIntelligenceEngineering.path,
    label: 'What Is Search Intelligence Engineering?',
    description: 'The seven layers this solution engineers, and why the work is engineering.',
  },
  {
    href: routes.whatIsGenerativeEngineOptimization.path,
    label: 'What Is Generative Engine Optimization?',
    description:
      'What Google Search Central documents about structured data and AI surfaces, and where the GEO framing runs out.',
  },
  /**
   * The reciprocal of the outbound reference in the `/for-agencies`
   * client-conversation block. That block tells an agency principal what not to
   * promise a client and references the no-control claim this page owns
   * (docs/17 §3.2), so the link runs both ways rather than one.
   */
  {
    href: routes.forAgencies.path,
    label: 'For Agencies',
    description: 'What an agency tells a client who asks why the brand is not in ChatGPT.',
  },
]

export const closing = {
  title: 'Turn Selection Intelligence into implementation.',
  primaryCta: {
    label: 'Discuss a 90-Day Demand-to-Selection Program',
    href: routes.contact.path,
    analytics: { location: 'spe_closing', solutionName: 'Search Presence Engineering' },
  } satisfies Cta,
  secondaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'spe_closing_secondary' },
  } satisfies Cta,
} as const
