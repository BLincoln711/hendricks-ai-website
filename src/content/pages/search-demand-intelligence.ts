import type { RelatedLink } from '@/components/sections/related-links'
import type { NamedDeliverable } from '@/components/sections/deliverables'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from content/pages/03-search-demand-intelligence.md.
 *
 * The markdown's "FAQ topics" list supplies five approved questions. Their answers
 * are now written and mirrored back into the markdown beneath each question, so the
 * two files stay a matched pair a reviewer can diff. Tracked in
 * CONTENT_VERIFICATION.md as Q1.
 *
 * Every answer restates substance this page already carries, in question-shaped
 * form, so a retrieval system can lift one block and still have the whole claim.
 * Nothing in `faq` introduces a capability the rest of the file does not state.
 *
 * The section ships as visible copy only. docs/06 §10 forbids FAQPage markup, so
 * no JSON-LD accompanies it and none should be added.
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

export const faq = {
  eyebrow: 'Questions',
  title: 'Five questions about mapping search demand.',
  items: [
    {
      question: 'Is this different from keyword research?',
      answer: [
        'Yes. Keyword research produces a list of strings and their estimated volumes. Search Demand Intelligence produces a model of the decisions customers are trying to make: who has the need, how the need changes by context, where the customer sits in the decision process, whether the business is qualified to solve it, and what the resulting relationship may be worth.',
        'Keyword data is one input among many. Hendricks combines it with Search Console queries, paid-search terms, CRM opportunities, closed-customer data, sales-call transcripts, reviews, and support questions. A keyword names a topic. An intent context describes a customer, and only the second carries enough information to judge eligibility, relevance, and value.',
      ],
    },
    {
      question: 'How do you estimate demand when AI prompts are not publicly reported?',
      answer: [
        'The assistant platforms do not publish prompt volumes. Hendricks therefore does not hold a prompt-volume dataset for AI-mediated search and does not present an estimate as though it were a measurement. Demand is modeled from evidence that can be observed directly: Search Console queries, paid-search terms, keyword and SERP data, CRM opportunities, closed-customer data, sales-call transcripts, customer interviews, reviews, support questions, and on-site search.',
        'Those proxies become intent contexts, and the intent contexts are run as controlled tests against the three systems Hendricks observes: Google AI Overviews, ChatGPT, and Perplexity. Gemini and Microsoft Copilot exist in the same information environment, and Hendricks does not measure, test, monitor, or report on Gemini or Microsoft Copilot. This is why the weighting model carries an Evidence Confidence term. An estimated demand figure stays labeled estimated for as long as it remains one.',
      ],
    },
    {
      question: 'How do paid-search and CRM data affect prioritization?',
      answer: [
        'Paid-search and CRM data move prioritization from estimated interest to observed commercial behavior. Paid-search terms show which queries real buyers clicked and what reaching them cost. CRM opportunities and closed-customer data show which of those needs became pipeline, which became revenue, and which produced the kind of customer the business wants more of.',
        'That evidence enters the weighting model through expected customer value and evidence confidence. A high-volume question that has never produced a qualified opportunity ranks below a low-volume question that repeatedly precedes a closed customer. Where the data is not available, Hendricks records the gap and lowers the confidence on that priority rather than filling it with an assumption.',
      ],
    },
    {
      question: 'Can this support product strategy, not just marketing?',
      answer: [
        'Yes. A Demand Map records what customers are trying to accomplish, which of those needs the business is qualified to solve, and which competitors currently capture the needs it is not solving. Those are product and market questions before they are marketing questions.',
        'The Intent Context Library is built to be used outside marketing, in market research, sales enablement, and executive opportunity analysis. Repeated, well-evidenced demand for a need the business cannot currently serve is a product finding. Hendricks reports it as one rather than converting it into a content brief.',
      ],
    },
    {
      question: 'What if the business has little historical data?',
      answer: [
        'Search Demand Intelligence does not require a long analytics history. Sales-call transcripts, customer interviews, reviews, support questions, competitor positioning, geographic demand, and market and trend data can carry a demand model on their own, and for a new business line or a new market they are often the only honest evidence available.',
        'The difference is confidence, not feasibility. With less first-party history, more of the model rests on estimated rather than observed demand, evidence confidence falls, and the resulting priorities are framed as hypotheses to test rather than conclusions to fund. If the business cannot yet name which customer decisions it wants to win, no volume of historical data would have answered that question for it.',
      ],
    },
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
