import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from
 * content/pages/23-what-is-generative-engine-optimization.md.
 *
 * This is an entry-vocabulary page, not a service page. Buyers search
 * "generative engine optimization" and "answer engine optimization" before they
 * have heard of Search Intelligence Engineering, and a page cannot be retrieved
 * for a term it never contains. So the terms are used plainly, defined fairly,
 * and then argued with.
 *
 * Two constraints govern every string below. The page may never describe a
 * Hendricks service as GEO or AEO work: the boundary is stated outright in
 * `sameAsSeo` rather than left to inference. And the critique is aimed at the
 * framing, never at the practitioners, which is why `limitation` concedes what
 * the framing gets right in the page's own voice rather than as a hedge.
 *
 * `sources.references` is new to this page. The other definition pages state the
 * firm's position and cite nothing, which is correct for them. This one makes
 * claims about platform behaviour, so each is carried by the platform's own
 * documentation and every reference below was fetched and verified on the review
 * date.
 */

export const meta = {
  title: 'What Is Generative Engine Optimization (GEO)? | Hendricks',
  description:
    'Hendricks defines generative engine optimization (GEO) and answer engine optimization (AEO), what the two terms cover in practice, and where the framing runs out.',
} as const

export const hero = {
  eyebrow: 'Definition',
  title: 'What Is Generative Engine Optimization?',
  lead: [
    'Generative engine optimization is a real practice, and the buyers searching for it are asking a real question.',
    'Hendricks answers it with a wider one: not whether a brand appears in an AI answer, but whether it enters consideration for the decisions that carry commercial value.',
  ],
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'wgeo_hero' },
  } satisfies Cta,
} as const

/**
 * The term is sentence case on purpose. It is a common-noun practice name, like
 * search engine optimization, not a locked Hendricks name, and the string is
 * reused verbatim as the `DefinedTerm` name and as the opening words of the
 * answer. The eyebrow that renders it is uppercased by `.text-eyebrow` anyway.
 */
export const directAnswer = {
  term: 'Generative engine optimization',
  answer:
    'Generative engine optimization, usually shortened to GEO, is the practice of improving how a brand is discovered, represented, and cited in AI-generated search answers rather than in a ranked list of links. Answer engine optimization, or AEO, is the adjacent term, usually applied to the same objective.',
} as const

export const inPractice = {
  eyebrow: 'What The Practice Covers',
  title: 'What does generative engine optimization actually involve?',
  lead: 'Generative engine optimization covers seven kinds of work in practice. Most of it is technical access, plain language, entity clarity, evidence, and monitoring, applied to AI answer surfaces rather than to a page of ranked links.',
  items: [
    'Making important pages crawlable, renderable, and retrievable by the crawlers that build AI answers',
    'Stating what the company does, who it serves, and what it costs in language a system can extract',
    'Structuring pages so a single passage answers one question completely',
    'Keeping entity information consistent across the website, third-party profiles, and industry directories',
    'Publishing the comparison, alternative, and pricing content that real buying questions require',
    'Earning mentions and reviews on the independent sources an answer is likely to draw from',
    'Tracking which prompts return the brand, which competitors appear, and which sources are cited',
  ],
  closing:
    'Google, OpenAI, and Perplexity each publish documentation on how a site controls the access those systems have to its pages, which makes the technical half of the practice verifiable rather than speculative.',
} as const

export const sameAsSeo = {
  eyebrow: 'GEO And SEO',
  title: 'Is generative engine optimization the same as SEO?',
  body: [
    'Partly, and the honest answer is more useful than the marketing one. Generative engine optimization is not a separate technology stack, and on Google surfaces it is not a separate lever either.',
    'Google Search Central states that there are no additional requirements to appear in AI Overviews or AI Mode, and no special markup, AI text file, or structured data to add for them. The documented path is the one search practice already describes: allow crawling, publish helpful content, and keep the page experience sound.',
    'What genuinely changed is the shape of the decision rather than the tooling. AI-mediated search can perform more of the interpretation, research, comparison, and evaluation before the customer reaches a website, so the commercial question moves from where a page appeared to whether the brand survived the comparison.',
    'That is a measurement problem before it is a content problem. Hendricks therefore does not sell generative engine optimization or answer engine optimization as a service. Hendricks sells Search Intelligence Engineering, where implementation is carried out through Search Presence Engineering and directed by a Selection Intelligence baseline rather than by a mention count.',
  ],
} as const

export const runsOut = {
  eyebrow: 'Where The Framing Runs Out',
  title: 'Where does the GEO framing run out?',
  lead: 'The framing runs out in five places. Each one is a structural limit of measuring a surface, not a criticism of the people doing the work.',
  items: [
    {
      number: '01',
      name: 'Optimizing a surface is not the same as knowing whether the brand enters consideration.',
      description:
        'A brand can be cited in an answer and still be described inaccurately, favored only for a low-value use case, or dropped the moment a customer adds a constraint. A mention count does not separate those outcomes. Observed consideration rate and observed recommendation rate do.',
    },
    {
      number: '02',
      name: 'Visibility work without a demand model optimizes for the wrong questions.',
      description:
        'Prompt sets are usually assembled from what is easy to track rather than from what carries commercial value. A brand can improve its position on prompts no buyer with budget ever types. Search Demand Intelligence establishes which decisions are worth winning before anything is measured.',
    },
    {
      number: '03',
      name: 'Presence is not selection.',
      description:
        'Being seen does not guarantee being understood. Being understood does not guarantee relevance. Being recommended does not guarantee human selection. Each stage is earned separately and fails for a different reason, so one visibility number cannot say which stage broke.',
    },
    {
      number: '04',
      name: 'A discipline named after a surface inherits the surface.',
      description:
        'Google AI Overviews, Google AI Mode, ChatGPT, Perplexity, Gemini, and Microsoft Copilot are separate products that change independently of each other. Work defined by the surface has to be redefined every time the surface moves. Work defined by the customer decision does not.',
    },
    {
      number: '05',
      name: 'The framing stops at the mention, and the business question does not.',
      description:
        'A citation is exposure. Hendricks treats exposure as the first level of evidence rather than the last, and connects it to branded demand, website behavior, CRM outcomes, pipeline, and controlled experiments through Search Impact Measurement.',
    },
  ],
} as const

/**
 * The observed-systems list is exact and closed. Naming a fourth system here, or
 * softening the list with "including", would claim coverage Hendricks does not
 * run. Gemini and Microsoft Copilot are named only as surfaces that exist in the
 * information environment, which is why they appear in the second paragraph and
 * never in the first.
 */
export const observed = {
  eyebrow: 'Scope',
  title: 'Which AI systems does Hendricks observe?',
  body: [
    'Hendricks observes three systems: Google AI Overviews, ChatGPT, and Perplexity. Those are the surfaces where Hendricks runs controlled tests, records the outcome of each run, and reports observed consideration and observed recommendation.',
    'Other AI surfaces exist in the same information environment, Gemini and Microsoft Copilot among them. Hendricks does not measure, test, monitor, or report on Gemini or Microsoft Copilot, and no Hendricks deliverable claims coverage that was not run.',
  ],
} as const

export const versusSie = {
  eyebrow: 'Comparison',
  title: 'GEO and AEO compared with Search Intelligence Engineering.',
  caption:
    'The GEO and AEO framing compared with Search Intelligence Engineering, by dimension.',
  columns: [
    { key: 'dimension', header: 'Dimension', rowHeader: true, width: '24%' },
    { key: 'geo', header: 'GEO and AEO framing' },
    { key: 'sie', header: 'Search Intelligence Engineering' },
  ],
  rows: [
    {
      dimension: 'Unit of measurement',
      geo: 'Mentions and citations in AI answers',
      sie: 'Observed consideration rate and observed recommendation rate across defined customer contexts',
    },
    {
      dimension: 'What counts as success',
      geo: 'The brand appears in the answer',
      sie: 'The brand enters the consideration set for a decision that carries commercial value',
    },
    {
      dimension: 'Where the work starts',
      geo: 'The surface, and the prompts that are easy to track',
      sie: 'The demand model, and the customer decisions worth winning',
    },
    {
      dimension: 'How stability is treated',
      geo: 'A point-in-time reading of the answer',
      sie: 'Selection Stability measured across repeated runs, contexts, platforms, locations, and time',
    },
    {
      dimension: 'What the work produces',
      geo: 'Content and markup changes aimed at being cited',
      sie: 'A demand map, a selection baseline, a prioritized implementation plan, and an impact model',
    },
    {
      dimension: 'What it connects to',
      geo: 'Visibility reporting',
      sie: 'Branded demand, website behavior, CRM outcomes, pipeline, and controlled experiments',
    },
  ],
  closing: [
    'Search Intelligence Engineering does not replace the work those terms describe.',
    'It changes what the work is accountable to.',
  ],
} as const

export const limitation = {
  title: 'The GEO framing gets the direction right.',
  body: [
    'The practitioners who named generative engine optimization identified a real change early. Answers now sit between the customer and the website, evidence published off-site travels further than the page it sits on, and plain, extractable language matters more than it used to. Hendricks agrees with all of that.',
    'The disagreement is about the unit of measurement. Naming a discipline after a surface makes the surface the goal, and the surface is not what a business is buying.',
  ],
} as const

export const sources = {
  reviewed: '2026-08-17',
  basis:
    'This definition is maintained by Hendricks and states the firm’s own position on the GEO and AEO framing. Every claim about platform behavior on this page is carried by the platform’s own documentation, listed below.',
  appliedIn: [
    { label: 'the Selection Intelligence solution', href: routes.selectionIntelligence.path },
    { label: 'the measurement methodology', href: routes.methodology.path },
  ],
  references: [
    {
      title: 'AI features and your website',
      publisher: 'Google Search Central',
      href: 'https://developers.google.com/search/docs/appearance/ai-features',
    },
    {
      title: 'Overview of OpenAI Crawlers',
      publisher: 'OpenAI',
      href: 'https://developers.openai.com/api/docs/bots',
    },
    {
      title: 'Perplexity Crawlers',
      publisher: 'Perplexity',
      href: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers',
    },
  ],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.whatIsAiMediatedSearch.path,
    label: 'What Is AI-Mediated Search?',
    description: 'The change in search behavior the GEO and AEO vocabulary is responding to.',
  },
  {
    href: routes.whatIsSearchIntelligenceEngineering.path,
    label: 'What Is Search Intelligence Engineering?',
    description: 'The discipline that measures consideration rather than mentions.',
  },
  {
    href: routes.selectionIntelligence.path,
    label: 'Selection Intelligence',
    description: 'How a consideration and recommendation baseline is designed, measured, and reported.',
  },
]

export const closing = {
  title: 'Measure whether the brand is chosen, not only whether it appears.',
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'wgeo_closing' },
  } satisfies Cta,
} as const
