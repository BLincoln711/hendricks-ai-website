import type { SolutionFeatureData } from '@/components/sections/solution-feature'
import type { Cta } from '@/components/ui/cta'
import type { SystemFlowStage } from '@/components/visuals/system-flow'
import { routes } from '@/config/routes'

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
} as const

export const solutionsList = {
  eyebrow: 'The Four Solutions',
  title: 'What each solution answers, and what it produces.',
  items: [
    {
      number: '01',
      name: 'Search Demand Intelligence',
      title: 'Determine what is worth measuring and winning.',
      description:
        'Map customer needs, commercial questions, comparisons, market changes, and decision contexts before building a monitoring or content program.',
      outputs: [
        'Demand Map',
        'Intent Context Library',
        'Commercial opportunity model',
        'Competitor demand capture',
        'Priority measurement set',
      ],
      motif: 'demand',
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
      motif: 'selection',
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
      motif: 'presence',
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
      motif: 'impact',
      cta: {
        label: 'Explore Search Impact Measurement',
        href: routes.searchImpactMeasurement.path,
        analytics: {
          location: 'solutions_list',
          solutionName: 'Search Impact Measurement',
        },
      },
    },
  ] satisfies readonly SolutionFeatureData[],
} as const

export const solutionsBridge = {
  eyebrow: 'Engagement Bridge',
  title: 'The solution mix follows the evidence.',
  body: [
    'Direct clients typically begin with a Search Intelligence Diagnostic. The Diagnostic determines which solution layers matter, what can be changed, what data is available, and what should be implemented first.',
  ],
  primaryCta: {
    label: 'Start with the Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'solutions_bridge' },
  } satisfies Cta,
} as const
