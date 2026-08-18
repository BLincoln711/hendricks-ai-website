import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'
import {
  observedSystemRows,
  observedSystemsExclusion,
  observedSystemsSentence,
} from '@/content/shared/observed-systems'

/**
 * Approved copy, transcribed from content/pages/22-what-is-ai-mediated-search.md.
 *
 * "AI-mediated search" is load-bearing vocabulary across /about, /contact,
 * /diagnostic, /solutions and /ai-selection-problem, and until this page shipped
 * the site used the term without ever defining it. This is the definition those
 * pages point at, and the one place the site names the surfaces a buyer actually
 * types: AI Overviews, AI Mode, ChatGPT, Perplexity, Gemini, Microsoft Copilot.
 *
 * Naming a public product as part of the environment is a factual statement. It
 * is not a capability claim, and the two must never be allowed to blur, so the
 * surfaces section carries a table with an explicit "Observed by Hendricks"
 * column and a block that states the observed systems in one sentence: Google AI
 * Overviews, ChatGPT, and Perplexity. Nothing here may be reworded to imply a
 * fourth.
 *
 * Render order the page is built against:
 *   hero, directAnswer, surfaces, upstream, comparison, vocabulary, limitation,
 *   related, sources, closing.
 *
 * `sources.citations` is new on this page and has no precedent elsewhere in
 * src/content. Every other definition page states a Hendricks position and
 * therefore cites nothing. This one describes publicly documented behavior of
 * systems Hendricks does not control, so those claims carry the platform's own
 * documentation. SourcesNote does not accept citations, so the page renders them
 * as a visible list of its own. Dropping that list would leave external claims
 * uncited, which is worse than making no claim at all.
 */

export const meta = {
  title: 'What Is AI-Mediated Search? | Hendricks',
  description:
    'AI-mediated search is search in which an AI system interprets the request and composes an answer before the click, in Google AI Overviews and AI Mode and in ChatGPT, Perplexity, and Gemini.',
} as const

export const hero = {
  eyebrow: 'Definition',
  title: 'What Is AI-Mediated Search?',
  lead: [
    'Traditional search returned a page of links and left the comparison to the customer.',
    'AI-mediated search performs more of the interpretation, research, and comparison first, then presents a shorter set of options.',
  ],
  primaryCta: {
    label: 'Establish a baseline through the Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'wiams_hero' },
  } satisfies Cta,
} as const

export const directAnswer = {
  term: 'AI-mediated search',
  answer:
    'AI-mediated search is search in which an AI system interprets the request, gathers sources, and composes an answer before the person reaches a website. Instead of working through a page of ranked links, the person is presented with a composed answer, a limited set of named options, and the sources behind them.',
} as const

/**
 * The lexical core of the page. Both groups are named because both are the
 * environment. Only the table's third column says what Hendricks does about it.
 */
export const surfaces = {
  eyebrow: 'The Surfaces',
  title: 'Where does AI-mediated search happen?',
  lead: 'AI-mediated search happens in two places: inside Google Search, and inside assistant products people use as a search entry point.',
  groups: [
    {
      name: 'Inside Google Search',
      description:
        'AI Overviews and AI Mode sit inside Google Search itself rather than in a separate product. Google Search Central documents AI Overviews as helping people get to the gist of a complicated topic or question more quickly while providing a jumping off point to explore links, and AI Mode as particularly helpful for queries where further exploration, reasoning, or complex comparisons are needed.',
      items: ['AI Overviews', 'AI Mode'],
    },
    {
      name: 'Assistant products used as a search entry point',
      description:
        'The same interpretation happens inside assistant products rather than a results page. ChatGPT, Perplexity, Gemini, and Microsoft Copilot are separate products from separate companies. OpenAI and Perplexity each publish documentation describing the crawler that surfaces websites in their search results and how a site controls its access.',
      items: ['ChatGPT', 'Perplexity', 'Gemini', 'Microsoft Copilot'],
    },
  ],
  caption: 'Named AI-mediated search surfaces and whether Hendricks observes each one.',
  columns: [
    { key: 'surface', header: 'Surface', rowHeader: true, width: '30%' },
    { key: 'environment', header: 'Where it sits' },
    { key: 'observed', header: 'Observed by Hendricks' },
  ],
  // The rows and both scope sentences come from src/content/shared/observed-systems.ts,
  // which transcribed them from this page. This page stays the canonical
  // explanation (docs/17 3.5) because it is the only rendering with an
  // "Observed by Hendricks" column, but it reads the strings back out of the
  // shared module rather than holding a second copy. Otherwise the canonical
  // page is the one place the constant can silently fork from.
  rows: observedSystemRows,
  observed: {
    title: 'Which surfaces does Hendricks observe?',
    body: [
      observedSystemsSentence,
      `Google AI Mode, Gemini, and Microsoft Copilot are named on this page because they exist in the same information environment. ${observedSystemsExclusion}`,
    ],
  },
} as const

export const upstream = {
  eyebrow: 'What Changes',
  title: 'What changes for a brand when interpretation moves upstream of the click?',
  lead: 'The comparison a brand used to win on its own website now happens before the customer arrives. Rankings can hold while the brand is left out of the set of options presented.',
  items: [
    'The brand is absent from the options presented, so it is never evaluated.',
    'The brand appears, but is described from outdated, thin, or contradictory evidence.',
    'The brand is mentioned without being recommended, and the shortlist forms around competitors.',
    'The decision narrows before any website visit, so no analytics event records the loss.',
    'Rank and traffic reporting stays flat while consideration falls, because the two measure different things.',
    'Nobody in the business can say whether the brand was considered, because nothing in the stack observes the surfaces where the comparison happened.',
  ],
  closing: [
    'Hendricks calls this the AI Selection Problem.',
    'Being discovered and being chosen are now separate outcomes, and most reporting still measures only the first.',
  ],
  cta: {
    label: 'Read The AI Selection Problem',
    href: routes.aiSelectionProblem.path,
    analytics: { location: 'wiams_upstream' },
  } satisfies Cta,
} as const

/**
 * A real comparison rather than prose pretending to be one, so a single row
 * survives being lifted on its own.
 */
export const comparison = {
  eyebrow: 'Traditional Versus AI-Mediated',
  title: 'How is AI-mediated search different from traditional search results?',
  lead: 'Traditional search results return a page of links and leave the comparison to the customer. AI-mediated search returns a composed answer, and much of the comparison is finished before the customer clicks anything.',
  caption: 'Traditional search results compared with AI-mediated search, by dimension.',
  columns: [
    { key: 'dimension', header: 'Dimension', rowHeader: true, width: '24%' },
    { key: 'traditional', header: 'Traditional search results' },
    { key: 'aiMediated', header: 'AI-mediated search' },
  ],
  rows: [
    {
      dimension: 'What the customer receives',
      traditional: 'A page of ranked links',
      aiMediated: 'A composed answer with a limited set of named options and cited sources',
    },
    {
      dimension: 'Where comparison happens',
      traditional: 'Across several websites, after the click',
      aiMediated: 'Largely before the click, inside the answer',
    },
    {
      dimension: 'What a brand competes for',
      traditional: 'A position on the results page',
      aiMediated: 'Inclusion in the set of options presented',
    },
    {
      dimension: 'What the brand supplies',
      traditional: 'The page the customer lands on',
      aiMediated: 'The evidence a system can find and corroborate about it',
    },
    {
      dimension: 'Stability of the result',
      traditional: 'Comparatively stable for the same query',
      aiMediated: 'Can vary with context, wording, location, platform, and time',
    },
    {
      dimension: 'What measurement reports',
      traditional: 'Rank, impressions, clicks, and sessions',
      aiMediated:
        'Observed consideration rate and observed recommendation rate under stated conditions',
    },
  ],
  closing:
    'Neither replaces the other. A brand can rank well and still lose the shortlist, which is why the two are measured separately.',
} as const

/**
 * The vocabulary slot on this page. It carries one owned definition and one
 * pointer, and the split is deliberate.
 *
 * "AI search visibility" is the highest-demand buyer term the corpus used
 * without ever defining, so this page defines it once and every other page that
 * uses the phrase links here (docs/17 §3.2). It belongs on this page rather than
 * a solution page because it is Term register: the reader is asking what a word
 * means, not what a client receives.
 *
 * GEO and AEO were previously restated here in full. They are defined on
 * /what-is-generative-engine-optimization and docs/17 §3.10 cuts the second
 * rendering to a pointer, which is the last body line plus the CTA. What stays
 * is the distinction this page owns and that page does not: the difference
 * between the environment and the work aimed at it.
 *
 * The scope line is a reference to the table above rather than a fourth wording
 * of the observed-systems statement. Restating it here would add the paraphrase
 * that docs/17 §3.5 exists to remove.
 *
 * Hendricks does not sell GEO or AEO services and no line here may suggest it.
 */
export const vocabulary = {
  eyebrow: 'Vocabulary',
  title: 'What is AI search visibility?',
  body: [
    'AI search visibility is the presence of a brand in the answers AI systems compose and in the sources those answers cite. It is a presence measure: it records that the brand appeared, on a named surface, for a named question, on a given date.',
    'Visibility is not selection. A brand can be present in an answer that goes on to recommend a competitor, and it can be present for questions no buyer with budget ever asks. Entering a consideration set that carries commercial value is a separate outcome, earned separately, which is why Hendricks reports observed consideration rate and observed recommendation rate rather than a count of appearances.',
    'Any visibility Hendricks reports is bounded by the surfaces marked as observed in the table above.',
    'Generative engine optimization (GEO) and answer engine optimization (AEO) are names for the work aimed at earning that visibility. AI-mediated search is the environment that work is aimed at, not the work itself.',
  ],
  cta: {
    label: 'Read What Is Generative Engine Optimization?',
    href: routes.whatIsGenerativeEngineOptimization.path,
    analytics: { location: 'wiams_vocabulary' },
  } satisfies Cta,
} as const

export const limitation = {
  title:
    'Everything Hendricks reports about these surfaces is an observation under stated conditions.',
  body: [
    'These surfaces change without notice, so a result observed on one date may not reproduce on the next.',
    'Output varies with user context, which means a single observation is not a ranking.',
    'Hendricks cannot see inside these systems. Hendricks reports what was observed, when, on which surface, and under which conditions, and makes no claim about how any system decides.',
  ],
} as const

/**
 * The only content object on the site that carries external citations. Every
 * claim this page makes about a platform is traceable to that platform's own
 * documentation, and no blog, vendor study, or statistic is cited.
 *
 * The list carries a citation only where the page makes a claim that needs one.
 * Naming a public product as part of the environment is not such a claim, which
 * is why Gemini and Microsoft Copilot are both named on the page without a
 * citation of their own: nothing here describes what either one does. A source
 * for a surface Hendricks does not observe would also read, in a reference list,
 * as evidence of an engagement that does not exist.
 *
 * Every URL below was fetched and confirmed to resolve to the first-party
 * document it names on the review date, and each is the address the document
 * settles at rather than one that redirects.
 */
export const sources = {
  reviewed: '2026-08-17',
  basis:
    'This definition is maintained by Hendricks. Where the page describes systems Hendricks does not control, it states publicly observable behavior and cites the platform’s own documentation. No third-party research, vendor study, or statistic is reported.',
  citations: [
    {
      title: 'AI features and your website',
      publisher: 'Google Search Central',
      url: 'https://developers.google.com/search/docs/appearance/ai-features',
    },
    {
      title: 'Overview of OpenAI Crawlers',
      publisher: 'OpenAI',
      url: 'https://developers.openai.com/api/docs/bots',
    },
    {
      title: 'Perplexity Crawlers',
      publisher: 'Perplexity',
      url: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers',
    },
  ],
  appliedIn: [
    { label: 'the Selection Intelligence solution', href: routes.selectionIntelligence.path },
    { label: 'the measurement methodology', href: routes.methodology.path },
  ],
} as const

/**
 * The GEO page leads because it is the reciprocal of this one. Both are entry
 * vocabulary, the section above argues the two terms against each other, and
 * that section had no route to the page that defines them until this entry
 * existed. The GEO page already links back here first.
 */
export const related: readonly RelatedLink[] = [
  {
    href: routes.whatIsGenerativeEngineOptimization.path,
    label: 'What Is Generative Engine Optimization?',
    description:
      'What generative engine optimization and answer engine optimization cover, and where the framing runs out.',
  },
  {
    href: routes.whatIsSelectionIntelligence.path,
    label: 'What Is Selection Intelligence?',
    description: 'The measurement discipline applied to these surfaces.',
  },
  {
    href: routes.aiSelectionProblem.path,
    label: 'The AI Selection Problem',
    description: 'What it costs a brand when the shortlist forms before the click.',
  },
  {
    href: routes.whatIsSearchIntelligenceEngineering.path,
    label: 'What Is Search Intelligence Engineering?',
    description: 'The wider discipline this environment is measured inside.',
  },
]

export const closing = {
  title: 'Measure the surfaces before deciding what to change.',
  primaryCta: {
    label: 'Establish a baseline through the Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'wiams_closing' },
  } satisfies Cta,
} as const
