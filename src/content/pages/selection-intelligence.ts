import type { FaqItem } from '@/components/sections/faq-section'
import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import type { ContextPanel } from '@/components/visuals/context-panel-diagram'
import { routes } from '@/config/routes'
import { baselineMetricDefinitions } from '@/content/shared/metrics'
import {
  observedSystemsContext,
  observedSystemsExclusion,
  observedSystemsSentence,
} from '@/content/shared/observed-systems'

/**
 * Approved copy, transcribed from content/pages/04-selection-intelligence.md.
 */

export const meta = {
  title: 'Selection Intelligence for AI and Search Visibility | Hendricks',
  description:
    'Measure when your brand is absent, referenced, considered, or recommended across AI-mediated and traditional search, and understand the evidence associated with competitor wins.',
} as const

export const hero = {
  eyebrow: 'Selection Intelligence',
  title: 'Know when your brand enters the shortlist, and when it disappears.',
  lead: [
    'Selection Intelligence is the evidence-based analysis of whether, where, and under what customer contexts a brand is discovered, understood, considered, and recommended across search and AI-mediated buying journeys.',
  ],
  movesBeyond: 'Were we mentioned?',
  andAnswers: 'Did we become a legitimate option for a commercially valuable need?',
  primaryCta: {
    label: 'Establish Your Selection Baseline',
    href: routes.diagnostic.path,
    analytics: { location: 'si_hero', solutionName: 'Selection Intelligence' },
  } satisfies Cta,
} as const

export const firstStage = {
  eyebrow: 'Beyond Visibility',
  title: 'Visibility is only the first stage.',
  lead: 'A brand can be:',
  states: [
    'Mentioned but represented inaccurately',
    'Cited but not recommended',
    'Recommended only for a low-value use case',
    'Strong for one customer cohort and absent for another',
    'Visible on one platform and unstable everywhere else',
    'Favored in a neutral test but removed after the customer adds important constraints',
  ],
  closing: 'Selection Intelligence measures those differences.',
} as const

export const contextPanel = {
  eyebrow: 'Context Panel',
  title: 'Four controlled conditions, each answering a different question.',
  panels: [
    {
      name: 'Neutral baseline',
      description:
        'Controlled tests without meaningful customer history or supplied personalization.',
      question: 'What happens under standardized conditions?',
    },
    {
      name: 'Cohort context',
      description:
        'Tests that explicitly include relevant characteristics such as company size, use case, geography, budget, priorities, and constraints.',
      question: 'Which customer profiles cause the brand to enter or leave consideration?',
    },
    {
      name: 'Journey context',
      description: 'Multi-step research and comparison journeys that become more specific over time.',
      question: 'Does the brand survive as the customer moves from exploration to a shortlist?',
    },
    {
      name: 'Time and platform panel',
      description:
        'Repeated tests across relevant search and AI experiences, dates, models, and locations.',
      question: 'How stable is the observed outcome?',
    },
  ] satisfies readonly ContextPanel[],
} as const

export const measures = {
  eyebrow: 'What Hendricks Measures',
  title: 'Eight observations, not one unexplained score.',
  items: [
    { name: 'Observed visibility', description: 'Did the brand appear?' },
    {
      name: 'Brand understanding',
      description:
        'Was the company, product, service, location, or expertise represented accurately?',
    },
    {
      name: 'Relevance',
      description: 'Was the brand connected to the customer’s specific need?',
    },
    { name: 'Consideration', description: 'Was the brand treated as a legitimate candidate?' },
    {
      name: 'Recommendation',
      description:
        'Was the brand explicitly favored, shortlisted, or presented as a preferred option?',
    },
    {
      name: 'Citation and source patterns',
      description:
        'Which domains, pages, reviews, databases, publications, and owned properties appeared with the result?',
    },
    {
      name: 'Competitor performance',
      description: 'Which competitors won, under which contexts, and with what recurring evidence?',
    },
    {
      name: 'Selection Stability',
      description:
        'How consistently did the outcome survive reasonable changes in wording, context, platform, location, and time?',
    },
  ],
} as const

export const deliverables = {
  title: 'What a Selection Intelligence baseline produces.',
  items: [
    'Selection Map',
    'Observed Consideration Rate',
    'Observed Recommendation Rate',
    'Selection Stability analysis',
    'Competitor Selection Matrix',
    'Source and Evidence Graph',
    'Brand accuracy report',
    'Topic and service association map',
    'Commercial Selection Gap',
    'Prioritized hypotheses for intervention',
    'Baseline dataset for future experiments',
  ],
} as const

/**
 * The four measures a baseline reports, rendered from the shared definitions in
 * src/content/shared/metrics.ts (docs/17 §3.7). /what-is-selection-intelligence
 * is the canonical page for the definitions themselves; this page states them
 * because a buyer reading what a baseline produces should not have to leave to
 * find out what the numbers mean. Both pages now render one wording, which is
 * what docs/12 §6 requires. Evidence Coverage is not part of the baseline subset
 * and is defined on the definition page alone.
 */
export const metrics = {
  eyebrow: 'Metric Definitions',
  title: 'Every Hendricks measure is defined before it is reported.',
  items: baselineMetricDefinitions,
} as const

export const limitation = {
  title: 'Hendricks does not claim to inspect hidden model reasoning.',
  body: [
    'We do not assign invented weights to backlinks, schema, reviews, or individual sources.',
  ],
  observeLead: 'We observe:',
  chain: [
    'Inputs',
    'Outputs',
    'Citations',
    'Sources',
    'Interventions',
    'Changes',
    'Business Outcomes',
  ],
  closing:
    'Then we identify patterns, test hypotheses, and state the evidence level behind each conclusion.',
} as const

/**
 * The six questions are the approved list from
 * content/pages/04-selection-intelligence.md, previously carried as topics
 * without answers and tracked in CONTENT_VERIFICATION.md as Q2. The answers are
 * approved copy, mirrored back into the markdown beneath each question.
 *
 * Two of the six are load-bearing and were written to a fixed scope rather than
 * to a word count.
 *
 * "Which AI and search systems do you test?" states the reported scope by
 * rendering the shared observed-systems sentence: Google AI Overviews, ChatGPT,
 * Perplexity, and Gemini (CONTENT_VERIFICATION A1, amended 2026-09-01). Google
 * AI Mode and Microsoft Copilot are named only to place them outside that
 * scope. A prospect who reads the answer and comes away believing Hendricks
 * measures Copilot has been misled by omission, so the exclusion is repeated in
 * plain words on both names rather than softened with "currently" or "not
 * yet", both of which read as a promise of future coverage.
 *
 * "Is this the same as AI rank tracking?" is one sentence and a pointer, per
 * docs/17 §3.9. /what-is-selection-intelligence owns the contrast in its
 * versusRankTracking block, so this answer no longer restates the question each
 * discipline asks. What it keeps is the difference in Deliverable register: what
 * a client receives from each. The generative engine optimization and answer
 * engine optimization material is dropped rather than relocated, because
 * /what-is-generative-engine-optimization already defines both and already
 * states that Hendricks does not sell either as a service (docs/17 §3.10).
 * The answer names the definition page in prose and the related list below
 * carries the link, rather than the answer object carrying an href the FaqItem
 * type has no field for.
 *
 * No FAQPage markup is emitted for this section. docs/06 §10 forbids adding it
 * automatically, and these answers earn their place with a reader whether or not
 * a search engine renders them.
 */
export const faq = {
  eyebrow: 'Common Questions',
  title: 'Six questions to settle before commissioning a baseline.',
  items: [
    {
      question: 'How do you account for personalization?',
      answer: [
        'Hendricks treats personalization as a variable to be tested, not as noise to be removed. Every Selection Intelligence baseline runs the same commercial need through four context panels: a neutral baseline, cohort contexts that supply real customer characteristics, multi-step journey contexts, and a repeated time and platform panel.',
        'Running one need through all four panels produces a distribution rather than a single answer. Hendricks reports an observed consideration rate and an observed recommendation rate across the defined contexts, alongside Selection Stability, which records how consistently an outcome survives reasonable changes in wording, context, platform, location, and time.',
        'Hendricks does not claim to reproduce any individual person’s account history or prior conversations. Personal memory cannot be reproduced universally, so a baseline measures the conditions Hendricks can define, vary, and repeat, and every conclusion carries the grade of evidence behind it.',
      ],
    },
    {
      question: 'Is this the same as AI rank tracking?',
      answer: [
        'No. AI rank tracking reports where a brand appeared for a prompt, and a Selection Intelligence baseline reports observed consideration and recommendation rates by context and by cohort, with the competitor and evidence patterns behind them.',
        'Hendricks publishes the full definition, including what Selection Intelligence does not mean, on the What Is Selection Intelligence page.',
      ],
    },
    {
      question: 'Which AI and search systems do you test?',
      answer: [
        `${observedSystemsSentence} No other system contributes to a Hendricks observed consideration rate, observed recommendation rate, or Selection Stability figure, and no result from one system is extrapolated to another.`,
        // docs/17 3.5. All three sentences are read from
        // src/content/shared/observed-systems.ts. The scope sentence was a page
        // literal that still listed three after A1 added Gemini on 2026-09-01,
        // which is the drift the shared module exists to prevent.
        `${observedSystemsContext} ${observedSystemsExclusion} A Selection Intelligence baseline says nothing about how a brand performs on a surface Hendricks does not observe.`,
        'Reported scope is limited to the parts of AI-mediated search Hendricks can observe under controlled conditions and store for re-inspection. Each run is recorded with its exact question, supplied context, platform, date, location, response, and cited sources, so a client can audit an observation rather than accept a number.',
      ],
    },
    {
      question: 'How many prompts or contexts are required?',
      answer: [
        'There is no fixed number, and a prompt is not the unit of measurement. Hendricks counts commercial intent contexts, each one a defined combination of customer need, customer profile, use case, constraints, geography, decision stage, and commercial value. A typical Search Intelligence Diagnostic covers approximately 100–300 commercially prioritized intent contexts.',
        'One intent context is observed more than once. Each context is run across the four panels, across Google AI Overviews, ChatGPT, and Perplexity, and across dates, so the number of individual observations in a baseline is considerably larger than the number of contexts.',
        'Final scope depends on the market, the customer journey, geography, data access, and the number of business lines. Hendricks sets the count per engagement, and the Intent Context Library that fixes it is built before any baseline measurement runs.',
      ],
    },
    {
      question: 'Can one brand be strong for one cohort and weak for another?',
      answer: [
        'Yes, and cohort divergence is one of the most common findings in a Selection Intelligence baseline. A brand can be recommended for one customer cohort, treated as a marginal option for a second, and absent for a third, all within the same commercial need.',
        'Cohort contexts supply the characteristics a real buyer brings to a decision: company size, use case, geography, budget, priorities, and constraints. Adding those characteristics changes which brands are treated as legitimate candidates. A brand favored in a neutral test can leave the consideration set once the customer states a constraint the brand does not visibly satisfy.',
        'A single blended score hides the divergence. One averaged number can look stable while the highest-value segment is being lost, can credit a position earned in a low-value use case, and can conceal a competitor that wins every context in a priority market. Hendricks therefore reports the observed consideration rate and the observed recommendation rate by context and by cohort rather than as one brand-level figure.',
      ],
    },
    {
      question: 'How frequently should the baseline be repeated?',
      answer: [
        'Hendricks publishes no fixed interval. A Selection Intelligence baseline is a dated observation of a moving environment, so re-measurement should be triggered by a change in one of the inputs the baseline depends on rather than by a date on a calendar.',
        'Four changes are worth re-measuring for. The brand publishes, removes, or materially changes evidence a priority decision depends on. The competitive set changes. The commercial priorities or customer cohorts under measurement change. An intervention from Search Presence Engineering ships and needs a before-and-after read.',
        'Low Selection Stability is its own trigger. An outcome that already varied across wording, context, platform, location, and time was fragile before anything changed, and one repeat run will not settle it. Model and search behavior also changes over time, which is why Hendricks records the date of every observation and reports a baseline as the state of a defined set of contexts on the dates it was measured.',
      ],
    },
  ] satisfies readonly FaqItem[],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.searchPresenceEngineering.path,
    label: 'Search Presence Engineering',
    description: 'Turn the gaps a baseline reveals into prioritized implementation.',
  },
  {
    href: routes.searchDemandIntelligence.path,
    label: 'Search Demand Intelligence',
    description: 'Define which customer decisions the baseline should measure.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'Read how contexts are designed, classified, and graded.',
  },
  {
    href: routes.whatIsSelectionIntelligence.path,
    label: 'What Is Selection Intelligence?',
    description: 'The full definition, including what the term does not mean.',
  },
  {
    href: routes.aiSelectionProblem.path,
    label: 'The AI Selection Problem',
    description: 'Why being seen no longer means being chosen.',
  },
  /*
    Inbound link required by docs/17 §5.3 for /ai-visibility-tool-or-partner.
    The anchor is descriptive rather than an exact-match commercial keyword
    (docs/06 §13), and the card is the route a reader takes when the question is
    how this work gets bought rather than what it measures.
  */
  {
    href: routes.aiVisibilityToolOrPartner.path,
    label: 'Do You Need an AI Visibility Tool or a Partner?',
    description:
      'Whether to buy a monitoring feed, staff the capability, or contract it, and what a feed leaves undone either way.',
  },
]

export const closing = {
  title: 'Find the part of the consideration set your current reporting cannot see.',
  primaryCta: {
    label: 'Request a Selection Intelligence Baseline',
    href: routes.diagnostic.path,
    analytics: { location: 'si_closing', solutionName: 'Selection Intelligence' },
  } satisfies Cta,
} as const
