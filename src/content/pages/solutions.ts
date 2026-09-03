import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'
import { metricDefinitions } from '@/content/shared/metrics'

/**
 * One stage of the system diagram: the name and the sentence beneath it.
 *
 * The type moved here from `visuals/system-flow.tsx` when the canvas conversion
 * deleted that component; nothing else read it.
 */
export type SystemFlowStage = {
  name: string
  caption: string
}

/**
 * One solution as the Solutions hub renders it.
 *
 * The type replaces `SolutionFeatureData`, which lived in the feature card the
 * canvas conversion deletes. Two fields are new and two are unchanged: a row
 * now states the business question it answers and the decision it enables
 * alongside what Hendricks examines and the complete list of what it produces.
 */
export type SolutionRow = {
  number: string
  name: string
  title: string
  question: string
  description: string
  outputs: readonly string[]
  decision: string
  cta: Cta
}

/**
 * Approved copy, transcribed from content/pages/02-solutions.md.
 *
 * Do not edit these strings without a corresponding change to the approved
 * markdown (docs/02 §6).
 *
 * No `related` export, by omission rather than by decision. Every internal link
 * this page carries points at a solution or at the Diagnostic, so /solutions is
 * the only top-level commercial page that reaches no research page at all. The
 * four solution pages each satisfy the docs/03 §6 two-research-links rule and a
 * unit test enforces it; the hub above them is not covered by that test and does
 * not satisfy it.
 *
 * Adding one is a two-part change and both parts must land together: a `related`
 * array here, and a `<RelatedLinks />` block in
 * `src/app/(marketing)/solutions/page.tsx`, which currently imports no such
 * component. /what-is-ai-mediated-search is the strongest first entry, because
 * the hero copy above already contrasts SEO, paid media, and AI-visibility tools
 * without ever defining the environment those tools point at.
 */

export const solutionsMeta = {
  title:
    'Search Intelligence Solutions: Demand, Selection, Engineering, and Impact | Hendricks',
  description:
    'Explore Hendricks solutions for search demand intelligence, AI-mediated selection analysis, search presence engineering, and business-impact measurement.',
} as const

export const solutionsHero = {
  eyebrow: 'Hendricks Solutions',
  title: 'Four solutions. One path from customer demand to business impact.',
  lead: [
    'Most organizations manage search in fragments.',
    'SEO measures rankings. Paid media measures auctions. Content teams measure production. AI-visibility tools measure mentions and citations. Analytics measures website behavior. CRM systems measure sales activity.',
    'Hendricks connects those fragments around the decision the customer is trying to make.',
  ],
  /*
    The answer-first block. The three approved lead sentences are unchanged and
    all three still render: the first is the hero's lead, the second and third
    are the answer, and the third takes the two-tone treatment because it is the
    claim the rest of the page explains.
  */
  answerLabel: 'The short answer',
  answerTwoTone: {
    claim: 'Hendricks connects those fragments',
    continuation: 'around the decision the customer is trying to make.',
  },
  onThisPage:
    'On this page: the one system, the four solutions and what each produces, the related research, and how the mix is chosen.',
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'solutions_hero' },
  } satisfies Cta,
} as const

export const solutionsSystem = {
  eyebrow: 'One System',
  title: 'Demand, selection, presence, and impact are one sequence.',
  stages: [
    {
      name: 'Demand',
      caption: 'Determine which customer decisions carry commercial value.',
    },
    {
      name: 'Selection',
      caption: 'Measure whether the brand enters the consideration set.',
    },
    {
      name: 'Presence',
      caption: 'Change the conditions that shape discovery and trust.',
    },
    {
      name: 'Impact',
      caption: 'Connect the work to customer behavior and business outcomes.',
    },
  ] satisfies readonly SystemFlowStage[],
  note: 'Each solution can be sold as part of an engagement, but clients should not be asked to diagnose the technical service mix alone.',
  /** The drawing's text equivalent, read where the drawing is not. */
  alt: 'Four solutions in one loop. Search Demand Intelligence produces the Demand Map and Intent Context Library and passes them to Selection Intelligence, which produces the Selection Map and Commercial Selection Gap and passes them to Search Presence Engineering, which produces the Intervention Roadmap and passes it to Search Impact Measurement, which produces the Impact Ledger and returns what was learned to the start.',
  caption: 'Demand, Selection, Presence, Impact: one path, and what each solution hands to the next.',
  plate: { number: 'Plate 01', title: 'One System' },
} as const

/**
 * The four fields each solution row answers, in the order they are read.
 *
 * The canvas conversion renders a solution as a run of hairline rows rather
 * than as a feature card, so each row states the business question it answers
 * and the decision it enables alongside what Hendricks examines and what it
 * produces. `outputs` is the complete list the approved markdown carries: D-E
 * keeps every named output on the page rather than the first one or two.
 */
export const solutionFieldLabels = {
  question: 'Business question',
  examines: 'Hendricks examines',
  outputs: 'Named outputs',
  decision: 'Decision enabled',
} as const

/** The Commercial Selection Gap is defined where it is first used (CANON section 6). */
export const commercialSelectionGap = metricDefinitions.find(
  (metric) => metric.name === 'Commercial Selection Gap',
)

export const solutionsList = {
  eyebrow: 'The Four Solutions',
  title: 'What each solution answers, and what it produces.',
  items: [
    {
      number: '01',
      name: 'Search Demand Intelligence',
      title: 'Determine what is worth measuring and winning.',
      question: 'Which customer decisions are worth winning?',
      decision:
        'Which decisions to measure, plan, and write for, and what each is potentially worth.',
      description:
        'Map customer needs, commercial questions, comparisons, market changes, and decision contexts before building a monitoring or content program.',
      outputs: [
        'Demand Map',
        'Intent Context Library',
        'Commercial opportunity model',
        'Competitor demand capture',
        'Priority measurement set',
      ],
      cta: {
        label: 'Explore Search Demand Intelligence',
        href: routes.searchDemandIntelligence.path,
        analytics: {
          location: 'solutions_list',
          solutionName: 'Search Demand Intelligence',
        },
      },
    },
    {
      number: '02',
      name: 'Selection Intelligence',
      title:
        'Understand whether, where, and under what conditions your brand enters consideration.',
      question: 'When does the brand enter the shortlist, and when does it disappear?',
      decision:
        'How much valuable consideration the brand is losing, to which competitors, and what closing it is worth.',
      description:
        'Measure brand presence, understanding, relevance, consideration, recommendation, cited evidence, competitor performance, and outcome stability.',
      outputs: [
        'Selection Map',
        'Consideration baseline',
        'Recommendation baseline',
        'Selection Stability analysis',
        'Evidence Graph',
        'Commercial Selection Gap',
      ],
      cta: {
        label: 'Explore Selection Intelligence',
        href: routes.selectionIntelligence.path,
        analytics: { location: 'solutions_list', solutionName: 'Selection Intelligence' },
      },
    },
    {
      number: '03',
      name: 'Search Presence Engineering',
      title:
        'Improve the digital conditions that shape discovery, understanding, trust, and recommendation.',
      question: 'What should change, and in what order?',
      decision: 'What to change first, who owns it, and how each change will be measured.',
      description:
        'Implement technical, entity, content, evidence, authority, paid and organic, and conversion improvements.',
      outputs: [
        'Technical and entity roadmap',
        'Decision-content architecture',
        'Evidence and authority plan',
        'Priority implementation',
        'Experiment backlog',
        'Change and Intervention Ledger',
      ],
      cta: {
        label: 'Explore Search Presence Engineering',
        href: routes.searchPresenceEngineering.path,
        analytics: {
          location: 'solutions_list',
          solutionName: 'Search Presence Engineering',
        },
      },
    },
    {
      number: '04',
      name: 'Search Impact Measurement',
      title:
        'Determine whether changes are influencing customer behavior and business outcomes.',
      question: 'Did the work change outcomes the business can defend?',
      decision:
        'Whether to continue, scale, or stop each intervention, with the confidence the evidence supports.',
      description:
        'Connect exposure, branded demand, referrals, site behavior, leads, CRM outcomes, pipeline, and experiments.',
      outputs: [
        'Measurement architecture',
        'Search and AI channel classification',
        'BigQuery or warehouse model',
        'Impact dashboard',
        'Evidence grades',
        'Executive Impact Ledger',
      ],
      cta: {
        label: 'Explore Search Impact Measurement',
        href: routes.searchImpactMeasurement.path,
        analytics: {
          location: 'solutions_list',
          solutionName: 'Search Impact Measurement',
        },
      },
    },
  ] satisfies readonly SolutionRow[],
} as const

export const solutionsBridge = {
  eyebrow: 'Engagement Bridge',
  title: 'The solution mix follows the evidence.',
  /* The approved closing paragraph, in the two-tone form: claim, then the
     continuation of the same sentence at the quiet ink tier. */
  lead: {
    claim: 'Direct clients typically begin with a Search Intelligence Diagnostic.',
    continuation:
      'The Diagnostic determines which solution layers matter, what can be changed, what data is available, and what should be implemented first.',
  },
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'solutions_bridge' },
  } satisfies Cta,
} as const

/**
 * The related-research block the canvas conversion adds (handoff L-04).
 *
 * /solutions was the one top-level commercial page that reached no research
 * page at all, which the file header recorded as an omission rather than a
 * decision. The destination is resolved from the research registry at render
 * time, so adding a study never requires editing this file.
 */
export const solutionsResearch = {
  eyebrow: 'Related Research',
  title: 'Research for the AI Search Era.',
  lead: {
    claim:
      'Practical, source-supported research on how people search, how brands enter consideration,',
    continuation:
      'how AI-mediated discovery changes the buying journey, and how organizations can measure the commercial result.',
  },
  hubLabel: 'Research Hub',
  hubDescription:
    'Every published study, with its capture window, its method, and its limitations.',
  latestKind: 'Captured',
} as const
