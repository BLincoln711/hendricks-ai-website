import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from content/pages/07-diagnostic.md.
 *
 * Two deliberate omissions:
 *
 * - The "$15,000–$25,000" range and the "$15,000" support line are withheld.
 *   CONTENT_VERIFICATION.md P1 is `pending`: whether the fee is published on the
 *   site or disclosed in conversation is an open decision. The factors that set
 *   the fee are approved and are published.
 * - The application form is Phase 5 and blocked on approved consent language and
 *   a published privacy notice (L1, L3).
 */

export const meta = {
  title: 'Search Intelligence Diagnostic: Find Your Commercial Selection Gap | Hendricks',
  description:
    'A fixed-scope engagement that maps valuable search demand, measures brand consideration across Google and AI-mediated search, identifies selection gaps, and produces a 90-day roadmap.',
} as const

export const hero = {
  eyebrow: 'The Entry Engagement',
  title: 'Find Your Commercial Selection Gap.',
  lead: [
    'The Search Intelligence Diagnostic is a fixed-scope engagement that identifies where valuable customer demand exists, whether your brand enters consideration, which observable conditions separate you from stronger competitors, and what should be implemented first.',
    'You leave with a system map and an evidence-based roadmap—not a generic audit.',
  ],
  primaryCta: {
    label: 'Apply for a Diagnostic',
    href: routes.contact.path,
    analytics: { location: 'diagnostic_hero' },
  } satisfies Cta,
} as const

export const questions = {
  eyebrow: 'Questions Answered',
  title: 'Thirteen questions the Diagnostic is designed to answer.',
  items: [
    'What customer decisions are commercially important?',
    'Which customer contexts should be measured?',
    'Where does the brand appear?',
    'Where does it fail to enter consideration?',
    'Where is it recommended?',
    'Which competitors win instead?',
    'Which sources repeatedly shape the outcome?',
    'What does the market appear to understand about the brand?',
    'Which services, products, topics, and customer needs are weakly associated?',
    'Where is evidence missing?',
    'Which technical, content, authority, acquisition, or conversion changes should be prioritized?',
    'What data is available to measure business impact?',
    'What can be tested within the next 90 days?',
  ],
} as const

export const scope = {
  eyebrow: 'Typical Scope',
  title: 'What a Diagnostic normally covers.',
  lead: 'A typical Diagnostic includes:',
  items: [
    'One primary product, service, or business line',
    'Three to five priority competitors',
    'Defined customer groups and markets',
    'Approximately 100–300 commercially prioritized intent contexts',
    'Relevant Google and AI-mediated search environments',
    'Search, analytics, and CRM measurement review',
    'Current website and source analysis',
    'Executive and operating-team interviews',
  ],
  closing:
    'Final scope depends on the market, customer journey, geography, data access, and number of business lines.',
  timing:
    'Most Diagnostics are designed to take approximately three to four weeks, assuming required data access and stakeholder availability.',
} as const

export const phases = {
  eyebrow: 'Five Phases',
  title: 'Each phase ends in a named output.',
  items: [
    {
      number: 'Phase 1',
      name: 'Frame',
      description:
        'Define the business question, target customer, market, success criteria, constraints, and commercial outcome.',
      output: 'Decision Brief',
    },
    {
      number: 'Phase 2',
      name: 'Map demand',
      description: 'Build the Demand Map and Intent Context Library.',
      output: 'Commercial Demand Model',
    },
    {
      number: 'Phase 3',
      name: 'Establish the baseline',
      description:
        'Measure current visibility, understanding, consideration, recommendation, sources, competitors, and outcome stability.',
      output: 'Selection Baseline',
    },
    {
      number: 'Phase 4',
      name: 'Diagnose the gap',
      description:
        'Identify the technical, entity, content, evidence, authority, acquisition, conversion, and measurement gaps associated with lost consideration.',
      output: 'Commercial Selection Gap and Evidence Graph',
    },
    {
      number: 'Phase 5',
      name: 'Design the roadmap',
      description:
        'Prioritize interventions, experiments, owners, data requirements, sequencing, and measurement.',
      output: '90-Day Demand-to-Selection Roadmap',
    },
  ],
} as const

export const deliverables = {
  title: 'What you receive.',
  items: [
    'Executive Decision Brief',
    'Demand Map',
    'Intent Context Library',
    'Selection Map',
    'Competitor Selection Matrix',
    'Source and Evidence Graph',
    'Commercial Selection Gap',
    'Measurement-readiness assessment',
    'Prioritized intervention backlog',
    '90-day roadmap',
    'Implementation scope',
    'Executive readout',
  ],
} as const

export const investment = {
  eyebrow: 'Investment',
  title: 'A fixed fee, set by scope rather than by hours.',
  lead: 'The final fixed fee is based on:',
  items: [
    'Number of markets',
    'Number of customer groups',
    'Number of competitors',
    'Number of platforms',
    'Data environment',
    'Technical complexity',
    'Research depth',
    'Required executive workshops',
  ],
} as const

export const fit = {
  eyebrow: 'Fit',
  title: 'Who the Diagnostic is designed for.',
  goodFit: {
    heading: 'The Diagnostic is designed for organizations that:',
    items: [
      'Have valuable search-driven customer decisions',
      'Invest meaningfully in SEO, paid search, content, or AI visibility',
      'Need to understand why competitors are entering the shortlist',
      'Have enough authority to implement changes',
      'Can provide appropriate search, analytics, or CRM access',
      'Want evidence rather than guaranteed placement',
    ],
  },
  notFit: {
    heading: 'It is not designed for organizations seeking:',
    items: [
      'Guaranteed ChatGPT citations',
      'Hundreds of generic articles',
      'A one-week ranking fix',
      'A free custom strategy',
      'A dashboard with no implementation',
      'Attribution certainty the available data cannot support',
      'A low-cost replacement for an SEO freelancer',
      'Recommendations the organization has no authority to implement',
    ],
  },
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.howItWorks.path,
    label: 'How It Works',
    description: 'The full Demand-to-Selection System the Diagnostic runs against.',
  },
  {
    href: routes.solutions.path,
    label: 'Solutions',
    description: 'The four solution layers a Diagnostic can recommend.',
  },
  {
    href: routes.forBrands.path,
    label: 'For Brands',
    description: 'How direct engagements are structured after the Diagnostic.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'The research standards behind every Diagnostic conclusion.',
  },
]

export const closing = {
  eyebrow: 'Application',
  title: 'Leave with clarity about what should be built first.',
  body: [
    'Tell Hendricks what your organization needs to understand, improve, or build. We will determine whether a Diagnostic is the appropriate first step—and say directly when a simpler solution is sufficient.',
  ],
  primaryCta: {
    label: 'Apply for a Search Intelligence Diagnostic',
    href: routes.contact.path,
    analytics: { location: 'diagnostic_closing' },
  } satisfies Cta,
} as const
