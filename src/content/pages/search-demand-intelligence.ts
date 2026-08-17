import type { RelatedLink } from '@/components/sections/related-links'
import type { NamedDeliverable } from '@/components/sections/deliverables'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from content/pages/03-search-demand-intelligence.md.
 *
 * The markdown's "FAQ topics" list is deliberately not rendered: it supplies
 * questions without approved answers, and docs/12 §6 plus AGENTS.md forbid
 * inventing them. Tracked in CONTENT_VERIFICATION.md as Q1.
 */

export const meta = {
  title: 'Search Demand Intelligence and Intent Mapping | Hendricks',
  description:
    'Map the customer needs, questions, comparisons, trends, and buying contexts that represent meaningful commercial demand across traditional and AI-mediated search.',
} as const

export const hero = {
  eyebrow: 'Search Demand Intelligence',
  title: 'Know which customer decisions are worth winning.',
  lead: [
    'Before tracking ChatGPT mentions, citations, or thousands of prompts, determine what the market is actually trying to accomplish.',
    'Hendricks maps the questions, needs, comparisons, constraints, customer contexts, and buying stages that represent meaningful commercial demand.',
  ],
  primaryCta: {
    label: 'Map Your Search Demand',
    href: routes.diagnostic.path,
    analytics: {
      location: 'sdi_hero',
      solutionName: 'Search Demand Intelligence',
    },
  } satisfies Cta,
} as const

export const problem = {
  eyebrow: 'The Problem',
  title: 'A large prompt list is not a demand strategy.',
  statements: [
    'A question can be frequently generated and commercially irrelevant.',
    'A keyword can have volume and produce poor customers.',
    'An AI mention can increase while qualified pipeline remains flat.',
  ],
  determinesLead: 'Demand Intelligence determines:',
  determines: [
    'Which needs matter',
    'Who has those needs',
    'How the need changes by context',
    'Where the customer is in the decision process',
    'Whether the business is qualified to solve it',
    'What the customer relationship may be worth',
    'Which competitors currently capture the opportunity',
  ],
} as const

export const inputs = {
  eyebrow: 'Inputs',
  title: 'One demand model, built from the evidence that already exists.',
  lead: 'Where available, Hendricks can combine:',
  items: [
    'Search Console queries',
    'Paid-search terms',
    'Keyword and SERP data',
    'AI-question patterns',
    'CRM opportunities',
    'Closed-customer data',
    'Sales-call transcripts',
    'Customer interviews',
    'Reviews',
    'Support questions',
    'On-site search',
    'Competitor positioning',
    'Geographic demand',
    'Market and trend data',
  ],
  closing:
    'The objective is not to collect every possible signal. It is to produce a useful model of the decisions customers are trying to make.',
} as const

export const intentContext = {
  eyebrow: 'Intent Context',
  title: 'A keyword names a topic. An intent context describes a customer.',
  keywordLabel: 'Traditional keyword',
  keyword: 'best wealth manager Houston',
  contextLabel: 'Intent context',
  context:
    'A Houston business owner has sold a company, expects approximately $8 million in proceeds, wants tax-aware wealth management, and prefers a firm experienced with entrepreneurial exits.',
  comparison:
    'The second contains the information required to understand actual eligibility, relevance, and value.',
  libraryLead: 'Hendricks builds an Intent Context Library used for:',
  libraryUses: [
    'AI-selection testing',
    'SEO strategy',
    'Paid-search planning',
    'Content architecture',
    'Landing pages',
    'Sales enablement',
    'Market research',
    'Executive opportunity analysis',
  ],
} as const

export const deliverables = {
  title: 'What Search Demand Intelligence produces.',
  items: [
    {
      name: 'Demand Map',
      description:
        'A structured model of customer needs, topics, questions, comparisons, stages, audiences, and markets.',
    },
    {
      name: 'Intent Context Library',
      description:
        'Realistic customer situations used to test visibility, consideration, and recommendation.',
    },
    {
      name: 'Commercial Opportunity Model',
      description:
        'A transparent weighting model based on demand, intent, customer value, strategic fit, and confidence.',
    },
    {
      name: 'Competitor Demand Capture',
      description:
        'A view of which competitors currently dominate the most valuable decisions and content territories.',
    },
    {
      name: 'Priority Measurement Set',
      description:
        'The defined contexts that should become the client’s controlled search and AI-selection baseline.',
    },
  ] satisfies readonly NamedDeliverable[],
} as const

export const weighting = {
  title: 'Example weighting model',
  formula:
    'Demand Weight = Observed or Estimated Demand × Commercial Intent × Expected Customer Value × Strategic Fit × Evidence Confidence',
  note: 'The model is customized to each engagement and shared in full. Hendricks does not present invented weights as universal.',
} as const

export const bestFit = {
  eyebrow: 'Best Fit',
  title: 'Where Search Demand Intelligence earns its place.',
  lead: 'Search Demand Intelligence is best suited for organizations that:',
  items: [
    'Have meaningful search demand',
    'Sell a valuable or considered product or service',
    'Have multiple customer groups or use cases',
    'Are producing content without a clear demand model',
    'Track AI visibility without knowing which prompts matter',
    'Need one search-demand model across paid, organic, AI, content, and sales',
  ],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.selectionIntelligence.path,
    label: 'Selection Intelligence',
    description:
      'Measure whether the demand you mapped actually converts into brand consideration.',
  },
  {
    href: routes.howItWorks.path,
    label: 'How It Works',
    description: 'See where demand mapping sits in the Demand-to-Selection System.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'Read the research and measurement standards behind every Hendricks conclusion.',
  },
  {
    href: routes.whatIsSearchIntelligenceEngineering.path,
    label: 'What Is Search Intelligence Engineering?',
    description: 'Understand the category this solution belongs to.',
  },
]

export const closing = {
  title: 'Do not optimize the channel before understanding the demand.',
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: {
      location: 'sdi_closing',
      solutionName: 'Search Demand Intelligence',
    },
  } satisfies Cta,
} as const
