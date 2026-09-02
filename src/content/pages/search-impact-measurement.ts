import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import type { MeasurementLevel } from '@/components/visuals/impact-measurement-stack'
import { routes } from '@/config/routes'
import { evidenceGradeRows } from '@/content/shared/evidence-grades'
import {
  observedSystemsContext,
  observedSystemsExclusion,
  observedSystemsSentence,
} from '@/content/shared/observed-systems'

/**
 * Approved copy, transcribed from content/pages/06-search-impact-measurement.md.
 *
 * The markdown's six FAQ questions carry answers as of 2026-08-17 and are
 * rendered. Both files hold the same text: the questions and answers below are
 * transcribed beneath their headings in the markdown, so the source of record
 * and the rendered copy cannot drift. CONTENT_VERIFICATION.md Q3 tracked this as
 * pending and needs its row moved.
 */

export const meta = {
  title: 'AI Search, SEO, and Revenue Impact Measurement | Hendricks',
  description:
    'Connect search and AI visibility with branded demand, referrals, customer behavior, CRM opportunities, pipeline, revenue, and controlled evidence.',
} as const

export const hero = {
  eyebrow: 'Search Impact Measurement',
  title: 'Prove what changed, and how much confidence the business should place in it.',
  lead: [
    'A higher AI mention rate is not automatically a business result.',
    'A citation is not revenue.',
    'A branded search increase is not always caused by one campaign.',
    'Hendricks builds an evidence system that connects market exposure, customer behavior, commercial outcomes, and controlled tests without pretending attribution is perfect.',
  ],
  primaryCta: {
    label: 'Review Your Measurement System',
    href: routes.diagnostic.path,
    analytics: { location: 'sim_hero', solutionName: 'Search Impact Measurement' },
  } satisfies Cta,
} as const

export const levels = {
  eyebrow: 'Four Levels of Measurement',
  title: 'Each level answers a different question and carries different weight.',
  items: [
    {
      number: '01',
      name: 'Exposure',
      question: 'What changed in the information environment?',
      signals: [
        'Search impressions',
        'Generative-AI visibility where measurable',
        'Citations',
        'Cited URLs',
        'Consideration',
        'Recommendation',
        'Rankings',
        'SERP coverage',
        'Brand mentions',
      ],
    },
    {
      number: '02',
      name: 'Behavior',
      question: 'What changed in customer behavior?',
      signals: [
        'AI-assistant referrals',
        'Organic visits',
        'Branded search',
        'Direct visits',
        'Returning users',
        'Decision-content engagement',
        'Comparison-page use',
        'Form starts',
        'Appointment activity',
      ],
    },
    {
      number: '03',
      name: 'Commercial outcomes',
      question: 'What changed in the business?',
      signals: [
        'Qualified leads',
        'Appointments',
        'Sales-accepted opportunities',
        'Pipeline',
        'Win rate',
        'Closed revenue',
        'Customer quality',
        'Partner-sourced revenue',
      ],
    },
    {
      number: '04',
      name: 'Causal evidence',
      question: 'What evidence suggests the intervention contributed to the change?',
      signals: [
        'Baseline comparisons',
        'Staggered rollouts',
        'Matched demand clusters',
        'Geographic comparisons',
        'Segment holdouts',
        'Landing-page experiments',
        'Paid-search validation',
        'Interrupted time-series analysis',
      ],
    },
  ] satisfies readonly MeasurementLevel[],
} as const

/**
 * `/methodology` owns the four-grade standard (docs/17 §3.8). This page held a
 * second copy of it whose four cells each differed from the table by a word or a
 * clause order, Grade A most consequentially: "revenue evidence" against the
 * table's "revenue data". Two published standards out of one standard.
 *
 * The rows now read off `evidenceGradeRows`, renamed to the `standard` column
 * key this page's table renders, so no wording is written twice and neither page
 * can drift from the other.
 *
 * Still owed, and blocked outside this file: docs/17 §3.8 reduces this section to
 * the title above, the Grade A clause alone, and a link to `/methodology`. The
 * page component renders `rows` through `DataTable` and offers no link surface,
 * and `tests/unit/page-content.test.ts` asserts at least three rows here. Both
 * belong to other owners, so the table stays four rows for now.
 */
export const evidenceGrades = {
  eyebrow: 'Evidence Grades',
  title: 'Every executive conclusion states its evidence grade.',
  caption: 'Hendricks evidence grades and the standard each one requires.',
  rows: evidenceGradeRows.map((row) => ({ grade: row.grade, standard: row.evidence })),
} as const

export const deliverables = {
  title: 'What Search Impact Measurement produces.',
  items: [
    'Measurement-readiness audit',
    'Event and conversion taxonomy',
    'Search and AI channel rules',
    'Search Console and analytics integration',
    'CRM and pipeline mapping',
    'BigQuery or equivalent data model',
    'Branded-demand tracking',
    'AI-referral analysis',
    'Impact dashboard',
    'Experiment plan',
    'Evidence-graded executive brief',
    'Impact Ledger',
  ],
} as const

export const impactContract = {
  eyebrow: 'Impact Contract',
  title: 'What gets agreed before any work begins.',
  lead: 'At the start of an engagement, Hendricks and the client agree on:',
  items: [
    'Primary commercial outcome',
    'Leading indicators',
    'Baseline period',
    'Target customer or segment',
    'Data sources',
    'Known limitations',
    'Planned interventions',
    'Available controls or comparisons',
  ],
} as const

export const limitation = {
  title: 'What Hendricks does not promise.',
  body: [
    'We do not promise that every AI interaction can be traced to an individual buyer.',
    'We do not classify every direct visit as AI influenced.',
    'We do not claim causation from a simple before-and-after chart.',
  ],
  closing:
    'We combine direct measurement, leading indicators, customer-source information, commercial data, and controlled tests to create a more defensible body of evidence.',
} as const

/**
 * No `FAQPage` JSON-LD is emitted for these. docs/06 §10 forbids adding the
 * markup automatically, and AGENTS.md rules it out outright, so the questions
 * ship as visible, question-shaped content and nothing else.
 *
 * The first answer is the one that carries risk. "No" is the honest reply, and
 * the answer states the limit before it states what Hendricks does about it.
 * Deliberately absent from it: a referrer hostname list, a channel-grouping
 * recipe, and any share-of-traffic figure. Each of those would need a property
 * that was actually measured and a data-through date to stand behind it, and no
 * such measurement is recorded here. Bounding a gap is a publishable claim.
 * Filling it with a plausible number is not.
 *
 * Every answer opens on a declarative sentence with Hendricks or the named
 * measure as its subject, because these are the blocks most likely to be lifted
 * away from the page, and a lifted chunk that opens on "we" loses attribution.
 */
export const faq = {
  eyebrow: 'Measurement Questions',
  title: 'Six questions about what impact measurement can and cannot see.',
  items: [
    {
      question: 'Can GA4 identify all AI traffic?',
      answer: [
        'No. Google Analytics 4 cannot identify all AI traffic, and Hendricks does not report it as though it can. An analytics tool can only classify a visit from what arrives with it, so a referral from an AI assistant is countable in GA4 only when a referrer arrives and is recognized as one.',
        'Three limits stack on top of each other. Assistant referrals are attributed inconsistently across tools and across time. Some visits arrive with no referrer at all and are recorded as direct. And some AI influence never produces a click, because the buyer reads an answer, forms a preference, and arrives later through a branded search or a direct visit that carries no trace of the original exposure.',
        `Hendricks bounds that gap rather than filling it with a guess. Exposure is measured where the answer itself can be observed. ${observedSystemsSentence} AI-assistant referrals are then reported as a floor rather than a total. Branded search, direct visits, decision-content engagement, and self-reported source data are tracked as leading indicators, and every conclusion carries the evidence grade that states how much weight it can hold.`,
        // docs/17 3.5. The scope sentence above and both sentences below are
        // read from src/content/shared/observed-systems.ts. The paragraph above
        // carried its own three-system literal, and the literal did not move
        // when A1 added Gemini on 2026-09-01.
        `${observedSystemsContext} ${observedSystemsExclusion} No Hendricks deliverable should be read as covering any of them.`,
      ],
    },
    {
      question: 'How should self-reported attribution be used?',
      answer: [
        'Self-reported attribution is the answer a buyer gives when asked directly how they found the company, usually in a form field or in the first sales conversation. Hendricks treats it as a leading indicator and a tie-breaker. It is the only signal that can name an influence no analytics tool was able to see, and it is also the weakest signal in the model.',
        'It fails in predictable ways. People misremember. They name the last thing they touched rather than the thing that changed their mind. They pick whichever option sits first in a list. They skip the field entirely. One self-reported answer proves nothing on its own.',
        'Hendricks therefore reads it as a distribution rather than as a record. The question is asked as an open field rather than a fixed pick list, because a pick list teaches the answer. The response is stored on the CRM record rather than on the analytics session, so it survives a buying cycle longer than a session. And a shift in that distribution across a defined period is what gets reported, corroborating exposure and commercial evidence rather than standing in for either. On its own, self-reported attribution is directional evidence and grades accordingly.',
      ],
    },
    {
      question: 'How do branded search and direct traffic fit the model?',
      answer: [
        'Branded search and direct traffic sit at the behavior level of the measurement model. Both record that a person already knew the brand before arriving, which is what exposure is supposed to produce. Hendricks reads them as evidence that demand moved, never as proof of which exposure moved it.',
        'The honest counterpoint is that both are easy to over-read. A branded search increase is not always caused by one campaign. Public relations, paid media, an offline conversation, seasonality, a competitor going quiet, and an AI-mediated answer can all lift the same line on the same chart. Hendricks does not classify every direct visit as AI influenced.',
        'Both measures become useful when they are read against three things: a defined baseline period, the exposure record for the same weeks, and a comparison group that did not receive the intervention. The causal evidence level supplies the comparison shapes, including baseline comparisons, staggered rollouts, matched demand clusters, geographic comparisons, and segment holdouts. A branded-search rise that begins when a specific intervention lands, in the segments that intervention targeted and not in the segments it skipped, is a far stronger claim than the same rise reported alone.',
      ],
    },
    {
      question: 'What if the sales cycle is long?',
      answer: [
        'A long sales cycle changes what can be measured now. It does not change whether the work can be measured. When closed revenue lands well after the intervention that contributed to it, Hendricks measures the leading indicators in the current period and holds the revenue conclusion until the cycle actually closes.',
        'The four measurement levels mature at different speeds. Exposure moves first and can be observed inside the current period. Behavior follows, in branded search, decision-content engagement, form starts, and appointment activity. Sales-accepted opportunities and pipeline come after that. Closed revenue, win rate, and customer quality arrive last, on the buyer’s schedule rather than the reporting schedule.',
        'The Impact Contract exists to settle this before anyone is disappointed by it. The primary commercial outcome, the leading indicators, the baseline period, and the known limitations are agreed at the start of the engagement, so nobody is asked mid-engagement to accept a proxy that was never part of the plan. Each level is reported with its own evidence grade as that evidence becomes available, and a revenue conclusion is not published on the strength of a pipeline movement.',
      ],
    },
    {
      question: 'Can paid search validate demand or messaging?',
      answer: [
        'Yes, within a defined scope. Paid search buys a fast, controlled read on demand and on message that organic and AI-mediated exposure cannot return on the same timeline. Hendricks uses it here as a validation instrument rather than as an acquisition channel, which is why paid-search validation sits in the causal evidence level rather than in the exposure level.',
        'Paid search answers three questions quickly. Does demand exist at the volume the demand model estimated? Does the message earn a click against the alternatives a buyer is shown? Does the landing page convert the traffic that message brings? Each is a controlled test with a known cost and a short read time, and each either supports or contradicts an assumption the wider program depends on.',
        'Paid search does not answer whether an AI assistant will place the brand in a consideration set. Consideration is settled by observation, which is the work of Selection Intelligence, not by media spend. A paid-search validation carries the scope it was run at and no more.',
      ],
    },
    {
      question: 'What is the difference between correlation and causation here?',
      answer: [
        'Correlation is two measures moving together. Causation is evidence that one of them produced the other. On a Hendricks engagement the distinction is not academic. It decides which evidence grade a conclusion carries, and therefore what the business is entitled to do with that conclusion.',
        'A before-and-after chart is correlation. A visibility increase and a pipeline increase in the same quarter is correlation. Hendricks does not claim causation from a simple before-and-after chart, because the same movement can be produced by seasonality, a pricing change, a new sales hire, a competitor leaving the market, or a campaign running in another channel at the same time.',
        'Causal evidence requires a comparison that isolates the intervention. The forms Hendricks uses are stated openly: baseline comparisons, staggered rollouts, matched demand clusters, geographic comparisons, segment holdouts, landing-page experiments, paid-search validation, and interrupted time-series analysis. None of them removes doubt. Each of them narrows the set of explanations that survive.',
        'The evidence grades carry the rest. Grade A is the only grade that requires a controlled experiment, and the Hendricks methodology publishes the full scale and what each grade permits. Correlation does not prove causation, and a graded conclusion states plainly which of the two is on offer.',
      ],
    },
  ],
} as const

/**
 * The page component titles this block "Related solutions and research." Until
 * now it listed no research, because the site had none.
 *
 * `/research/hendricks-selection-baseline` belongs here for one reason and it is
 * the reason the first FAQ answer already gives: a large share of AI influence
 * leaves no trace an analytics tool can classify. That answer bounds the gap
 * from the analytics side. The study bounds it from the answer side, by counting
 * how many answers named a source at all, and a reader who has just been told
 * that exposure is measured "where the answer itself can be observed" is the
 * exact reader who should see what that observation returned.
 *
 * The description states one run's counts and stops. It does not read them as a
 * rate, a trend, or an attribution finding: the study ran twice on two query
 * sets with no intervention and no control, and docs/12 §4 plus that page's own
 * decision 4 both forbid stretching it further. The FAQ answers above are
 * `readonly string[]` rendered as bare paragraphs with no link affordance, so
 * this card is where the link lands without editing the page component.
 *
 * The 2026-08-19 counts here were replaced on 2026-08-19 when the study
 * repointed at run 2026-08-19-110930. The earlier ones came from a run whose
 * result file a scheduled job overwrote in place. Quote whatever that study
 * publishes; never carry a figure forward from this file's history.
 */
export const related: readonly RelatedLink[] = [
  {
    href: routes.researchHendricksSelectionBaseline.path,
    label: 'Hendricks Selection Baseline',
    description:
      'How often the answers in one dated run named a source at all: on 2026-08-19, 20 of the 47 measured cells cited at least one source and the other 27 carried no source at all.',
  },
  {
    href: routes.searchPresenceEngineering.path,
    label: 'Search Presence Engineering',
    description: 'The interventions this measurement system is designed to evaluate.',
  },
  {
    href: routes.selectionIntelligence.path,
    label: 'Selection Intelligence',
    description: 'The exposure baseline that impact measurement builds on.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'How evidence grades are assigned and what each one permits.',
  },
  {
    href: routes.howItWorks.path,
    label: 'How It Works',
    description: 'Where measurement closes the Demand-to-Selection loop.',
  },
  {
    href: routes.whatIsSelectionIntelligence.path,
    label: 'What Is Selection Intelligence?',
    description: 'Definitions for the observed rates this solution reports against revenue.',
  },
]

export const closing = {
  title: 'Make the work accountable to a business outcome.',
  primaryCta: {
    label: 'Build Your Search Impact Baseline',
    href: routes.diagnostic.path,
    analytics: { location: 'sim_closing', solutionName: 'Search Impact Measurement' },
  } satisfies Cta,
} as const
