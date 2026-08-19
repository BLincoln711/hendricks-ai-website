import type { Cta } from '@/components/ui/cta'
import { ctaHref, routes } from '@/config/routes'

/**
 * Approved homepage copy, transcribed from content/pages/01-home.md.
 *
 * Copy lives here rather than inside components so it can be reviewed without
 * reading TSX (docs/02 §6). Do not edit these strings without a corresponding
 * change to the approved markdown.
 */

export const homeMeta = {
  title: 'Search Intelligence Engineering for the AI Era | Hendricks',
  description:
    'Hendricks maps valuable search demand, measures whether brands enter consideration across Google and AI search, engineers search-presence gaps, and connects the work to business impact.',
} as const

export const hero = {
  eyebrow: 'Search Intelligence Engineering',
  title: 'Search Intelligence Engineering for the AI Era.',
  subtitle: 'Know where your brand is missing from the shortlist.',
  lead: [
    'Search increasingly interprets the need, researches the market, compares options, and narrows consideration before a customer reaches your website.',
    'Hendricks maps the questions and decisions that drive your market, measures whether your brand enters the consideration set, improves the conditions that shape visibility and trust, and connects the work to pipeline and revenue.',
  ],
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: '/diagnostic',
    analytics: { location: 'home_hero' },
  } satisfies Cta,
  secondaryCta: {
    label: 'See What Hendricks Actually Does',
    href: '#what-hendricks-does',
    analytics: { location: 'home_hero_secondary' },
  } satisfies Cta,
  operatingLine:
    'Measure demand. Understand AI visibility. Engineer selection. Prove business impact.',
  // CONTENT_VERIFICATION.md F2 — the approved copy itself requires this line to
  // be verified before publication.
  credibilityLine:
    'Built from more than fifteen years of enterprise search, paid and organic acquisition, analytics, and search operating systems.',
} as const

export const problem = {
  eyebrow: 'The AI Selection Problem',
  title: 'Brands are losing control over the path between being discovered and being chosen.',
  traditional: {
    label: 'Traditional search was largely a ranking problem',
    steps: ['Query', 'Search Results', 'Website', 'Conversion'],
  },
  aiMediated: {
    label: 'AI-mediated search is increasingly a selection journey',
    steps: [
      'Need',
      'Intent Interpretation',
      'Research',
      'Comparison',
      'Synthesis',
      'Shortlist',
      'Choice',
    ],
  },
  body: 'A business can have a strong website, high rankings, excellent reviews, active paid media, respected leadership, and a recognizable brand, and still fail to enter an AI-mediated buying journey.',
  emphasis: ['The loss can happen before a visit.', 'Before a click.', 'Before the company’s analytics records the buyer.'],
  quote:
    'You cannot be chosen if you are not seen. But being seen does not guarantee being understood. Being understood does not guarantee trust. And trust does not guarantee selection.',
  completePath: [
    'Discoverable',
    'Understood',
    'Relevant',
    'Trusted',
    'Cited',
    'Considered',
    'Recommended',
    'Selected',
    'Revenue',
  ],
  closing: 'Most organizations have major blind spots across that path.',
  // The section states the wedge in the buyer's own terms and, until this entry
  // existed, carried no link of any kind. docs/03 §6: the highest-authority
  // section on the site should not be a dead end. Destination is the page that
  // owns "rank well and still lose the shortlist" (docs/17 §3.2), and the label
  // is descriptive rather than exact-match commercial (docs/06 §13).
  cta: {
    label: 'See why a brand can rank #1 on Google and still not appear in AI answers',
    href: routes.whatIsAiMediatedSearch.path,
    analytics: { location: 'home_problem' },
  } satisfies Cta,
} as const

export const whatWeDo = {
  eyebrow: 'From Theory to Execution',
  title: 'We find where you are being excluded, change the conditions, and measure what happens.',
  lead: 'Hendricks does not sell screenshots of chatbot mentions.',
  supporting: 'We build an evidence-based system that answers four business questions.',
  questions: [
    {
      number: '01',
      question: 'What demand is worth pursuing?',
      description:
        'Determine what customers are trying to accomplish, what they search and ask, how those needs differ by context, and which decisions have commercial value.',
      output: 'Demand Map',
    },
    {
      number: '02',
      question: 'Where are we winning or losing consideration?',
      description:
        'Measure whether the brand is absent, referenced, considered, or recommended across controlled customer contexts, platforms, competitors, and time periods.',
      output: 'Selection Map',
    },
    {
      number: '03',
      question: 'What should change?',
      description:
        'Identify and implement the technical, entity, content, evidence, authority, acquisition, and conversion improvements most likely to close valuable gaps.',
      output: 'Intervention Roadmap and implementation',
    },
    {
      number: '04',
      question: 'Did it produce business impact?',
      description:
        'Connect changes in search and AI visibility with customer behavior, branded demand, qualified leads, opportunities, pipeline, and revenue.',
      output: 'Impact Ledger',
    },
  ],
} as const

export const solutions = {
  eyebrow: 'The Hendricks Solution System',
  title: 'Four solutions. One path from demand to business impact.',
  items: [
    {
      number: '01',
      name: 'Search Demand Intelligence',
      title: 'Know which customer decisions are worth winning.',
      description: [
        'Map the questions, needs, comparisons, markets, and buying contexts that represent meaningful commercial demand.',
        'Hendricks combines available search, paid media, customer, sales, CRM, competitor, and market data to separate real opportunity from prompt volume.',
      ],
      cta: {
        label: 'Explore Search Demand Intelligence',
        href: '/solutions/search-demand-intelligence',
        analytics: { location: 'home_solutions', solutionName: 'Search Demand Intelligence' },
      } satisfies Cta,
      motif: 'demand' as const,
    },
    {
      number: '02',
      name: 'Selection Intelligence',
      title: 'Know when your brand enters the shortlist, and when it disappears.',
      description: [
        'Measure how search and AI systems represent, cite, compare, consider, and recommend your brand across realistic customer contexts.',
        'See which competitors win, which sources shape the result, how stable the outcome is, and where evidence is missing.',
      ],
      cta: {
        label: 'Explore Selection Intelligence',
        href: '/solutions/selection-intelligence',
        analytics: { location: 'home_solutions', solutionName: 'Selection Intelligence' },
      } satisfies Cta,
      motif: 'selection' as const,
    },
    {
      number: '03',
      name: 'Search Presence Engineering',
      title:
        'Build the conditions that make your brand easier to find, understand, trust, and recommend.',
      description: [
        'Improve technical access, entity clarity, decision-stage content, independent evidence, authority, paid and organic coverage, and conversion experiences.',
        'Not every visibility problem is a content problem. Hendricks diagnoses the complete information environment.',
      ],
      cta: {
        label: 'Explore Search Presence Engineering',
        href: '/solutions/search-presence-engineering',
        analytics: { location: 'home_solutions', solutionName: 'Search Presence Engineering' },
      } satisfies Cta,
      motif: 'presence' as const,
    },
    {
      number: '04',
      name: 'Search Impact Measurement',
      title: 'Connect visibility with outcomes the business can defend.',
      description: [
        'Combine search visibility, AI referrals, branded demand, website behavior, CRM data, pipeline, and controlled experiments.',
        'Hendricks does not promise perfect attribution. We build a stronger body of evidence and state the confidence behind every conclusion.',
      ],
      cta: {
        label: 'Explore Search Impact Measurement',
        href: '/solutions/search-impact-measurement',
        analytics: { location: 'home_solutions', solutionName: 'Search Impact Measurement' },
      } satisfies Cta,
      motif: 'impact' as const,
    },
  ],
} as const

export const distinction = {
  eyebrow: 'Beyond AI Visibility',
  title:
    'Visibility tells you that you appeared. Selection Intelligence tells you what that appearance means.',
  statements: [
    'A brand mention is not the same as consideration.',
    'A citation is not the same as recommendation.',
    'A recommendation is not the same as customer selection.',
  ],
  tableCaption: 'How each stage of AI-mediated search maps to a business question.',
  stages: [
    { stage: 'Visibility', question: 'Did the brand appear?' },
    { stage: 'Understanding', question: 'Was the brand represented accurately?' },
    { stage: 'Relevance', question: 'Was it connected to the customer’s specific need?' },
    { stage: 'Consideration', question: 'Was it presented as a legitimate option?' },
    { stage: 'Recommendation', question: 'Was it actively favored or shortlisted?' },
    { stage: 'Selection', question: 'Did the customer choose it?' },
    { stage: 'Impact', question: 'Did that choice produce commercial value?' },
  ],
  closing:
    'AI-mediated results can vary by context, wording, location, platform, and time. Hendricks therefore measures controlled intent contexts and repeated outcomes, not one pretend universal ranking.',
  cta: {
    label: 'Learn What Selection Intelligence Measures',
    href: ctaHref('/what-is-selection-intelligence', '/solutions/selection-intelligence'),
    analytics: { location: 'home_distinction' },
  } satisfies Cta,
} as const

export const methodology = {
  eyebrow: 'The Demand-to-Selection System',
  title: 'From customer need to measurable impact.',
  steps: [
    {
      number: '1',
      name: 'Map demand',
      description:
        'Identify the questions, needs, comparisons, customer groups, markets, and buying decisions that matter.',
    },
    {
      number: '2',
      name: 'Observe selection',
      description:
        'Test controlled customer contexts and determine whether the brand is absent, referenced, considered, or recommended.',
    },
    {
      number: '3',
      name: 'Engineer the presence',
      description:
        'Implement the technical, content, evidence, authority, acquisition, and conversion changes associated with stronger consideration.',
    },
    {
      number: '4',
      name: 'Measure impact',
      description:
        'Track exposure, behavior, commercial outcomes, and controlled evidence over time.',
    },
  ],
  cta: {
    label: 'See How the System Works',
    href: '/how-it-works',
    analytics: { location: 'home_methodology' },
  } satisfies Cta,
} as const

export const outputs = {
  eyebrow: 'Decisions, Not More Reports',
  title:
    'Every output should tell the organization what happened, why it matters, and what to do next.',
  lead: 'A typical Hendricks engagement can produce:',
  items: [
    'A commercially weighted Demand Map',
    'An Intent Context Library',
    'A competitor consideration benchmark',
    'An observed consideration and recommendation baseline',
    'A source and Evidence Graph',
    'A Commercial Selection Gap',
    'A prioritized intervention backlog',
    'Technical and entity requirements',
    'Decision-stage content architecture',
    'Authority and third-party source priorities',
    'A measurement and experimentation plan',
    'An executive Impact Ledger',
    'A 90-day implementation roadmap',
  ],
} as const

export const measurement = {
  eyebrow: 'Proof Without False Precision',
  title: 'We separate what is observed, inferred, measured, and proven.',
  layers: [
    {
      name: 'Observed',
      description:
        'Responses, citations, sources, rankings, impressions, referrals, customer behavior, and repeated test outcomes.',
    },
    {
      name: 'Inferred',
      description:
        'The likely relationship between evidence gaps, source patterns, brand understanding, and recommendation outcomes.',
    },
    {
      name: 'Measured',
      description:
        'Leads, appointments, opportunities, pipeline, revenue, branded demand, and assisted customer journeys.',
    },
    {
      name: 'Tested',
      description:
        'Changes evaluated through baselines, staggered rollouts, matched groups, holdouts, or other controlled comparisons where feasible.',
    },
  ],
  closing: [
    'Hendricks does not claim access to a model’s hidden reasoning.',
    'We study inputs, outputs, sources, interventions, and business outcomes, then state how much confidence the evidence supports.',
  ],
  cta: {
    label: 'Read the Hendricks Measurement Methodology',
    href: ctaHref('/methodology', '/solutions/search-impact-measurement'),
    analytics: { location: 'home_measurement' },
  } satisfies Cta,
} as const

export const audiences = {
  eyebrow: 'Built for Valuable Search Decisions',
  title: 'One system. Two ways to work with Hendricks.',
  paths: [
    {
      audience: 'For Brands',
      title: 'Turn fragmented search investment into a path to selection.',
      description: [
        'For organizations where search materially affects a valuable purchase, shortlist, appointment, demo, or customer relationship.',
        'Connect demand, traditional search, AI visibility, paid media, organic performance, evidence, analytics, and revenue.',
      ],
      cta: {
        label: 'Hendricks for Brands',
        href: '/for-brands',
        analytics: { location: 'home_audiences', audienceType: 'brand' as const },
      } satisfies Cta,
      audienceType: 'brand' as const,
    },
    {
      audience: 'For Agencies',
      title: 'Add specialized Search Intelligence without building the complete capability in-house.',
      description: [
        'Use Hendricks as a white-label specialist, embedded intelligence lead, co-branded partner, or system builder.',
        'Your agency keeps the client relationship. Responsibilities, branding, data access, and communication ownership are established before delivery.',
      ],
      cta: {
        label: 'Hendricks for Agencies',
        href: '/for-agencies',
        analytics: { location: 'home_audiences', audienceType: 'agency' as const },
      } satisfies Cta,
      audienceType: 'agency' as const,
    },
  ],
} as const

export const diagnostic = {
  eyebrow: 'Start with Evidence',
  title: 'Direct engagements begin with a fixed-scope diagnostic, not an open-ended retainer.',
  lead: 'The Search Intelligence Diagnostic establishes the market demand, customer contexts, competitive baseline, selection gaps, data quality, implementation priorities, and measurement plan.',
  outcomeLead: 'At the end, the client knows:',
  outcomes: [
    'What problem is actually worth solving',
    'Where the brand is losing valuable consideration',
    'Which observations are supported by evidence',
    'What should be changed first',
    'What data and access are required',
    'How success should be measured',
    'Whether Hendricks is the right implementation partner',
  ],
  cta: {
    label: 'Explore the Search Intelligence Diagnostic',
    href: '/diagnostic',
    analytics: { location: 'home_diagnostic' },
  } satisfies Cta,
} as const

export const founder = {
  eyebrow: 'Built from Search',
  title: 'More than fifteen years inside search. Now engineering what comes next.',
  // CONTENT_VERIFICATION.md F1, F8, F9 — all three claims below require sign-off.
  body: [
    'Brandon Lincoln Hendricks is the founder of Hendricks and a Search Intelligence Engineer.',
    'His work spans enterprise search strategy, paid media, organic search, analytics, AI-mediated discovery, data systems, and cross-functional operating models.',
    'Brandon personally architects Hendricks engagements.',
  ],
  portrait: {
    src: '/images/brandon-lincoln-hendricks-portrait.jpg',
    alt: 'Brandon Lincoln Hendricks, founder of Hendricks',
    width: 660,
    height: 819,
  },
  cta: {
    label: 'About Brandon Lincoln Hendricks',
    href: '/about',
    analytics: { location: 'home_founder' },
  } satisfies Cta,
} as const

export const finalCta = {
  eyebrow: 'Find the Gap',
  title: 'What decision can your current search system not answer?',
  body: [
    'Tell Hendricks what your organization needs to understand, improve, or build.',
    'We will determine whether a Search Intelligence Diagnostic is the appropriate first step, and say directly when a simpler solution is sufficient.',
  ],
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: '/diagnostic',
    analytics: { location: 'home_final_cta' },
  } satisfies Cta,
  secondaryCta: {
    label: 'Discuss an Agency Partnership',
    href: '/for-agencies',
    analytics: { location: 'home_final_cta', audienceType: 'agency' as const },
  } satisfies Cta,
} as const
