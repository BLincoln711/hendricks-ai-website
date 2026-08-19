import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import type { DataTableColumn, DataTableRow } from '@/components/ui/data-table'
import type { MetricDefinition } from '@/components/visuals/metric-definitions'

/**
 * The research section's content contract.
 *
 * Two shapes live here and the split between them is the point.
 *
 * `ResearchArticleContent` is the article itself: the same flat set of named
 * exports every page in `src/content/pages/` uses, so a writer moving between an
 * insight page and a study is writing the same kind of file. A study's module
 * satisfies this type by being imported as a namespace, which means the compiler
 * checks the module against the contract rather than the contract being a
 * comment nobody reads.
 *
 * `ResearchArticleRecord` is the dated, machine-readable record of that study:
 * slug, category, title, summary, the three dates, how the claim is classified,
 * and the solution it belongs to. The hub renders it as a card, the article
 * renders it as a publication record, and the JSON-LD reads its dates. Every
 * field that also exists inside the article module is read from the module
 * rather than retyped in the registry, so a date on a card cannot disagree with
 * the date on the page or the date in the graph.
 *
 * WHY THE SECTIONS ARE FIXED RATHER THAN A BLOCK LIST. `docs/06` §12 does not
 * treat its fifteen items as a menu. An article missing its limitations or its
 * data-through date is not publishable under the site's own contract, so the
 * contract is expressed as required fields and a missing one fails `typecheck`
 * rather than review. The fifteen map on like this:
 *
 *   1  Direct answer or executive summary   directAnswer, executiveSummary
 *   2  Key findings                         keyFindings
 *   3  Definitions                          definitions
 *   4  Data or evidence                     data, errorsFound
 *   5  Methodology                          methodology
 *   6  Sample and date range                sample
 *   7  Assumptions                          assumptions
 *   8  Limitations                          limitations
 *   9  Sources                              sources
 *   10 Author                               byline.author
 *   11 Published date                       byline.published
 *   12 Meaningful updated date              byline.updated
 *   13 Data-through date                    byline.dataThrough
 *   14 Corrections link                     corrections
 *   15 Related solution                     relatedSolution
 *
 * `errorsFound` is the one optional section among the fifteen's homes, because a
 * study that only counts has nothing to put in it. `data` alone satisfies item 4
 * when it is absent.
 *
 * `experimentLabel` is required and has no equivalent in `docs/06` §12. It is
 * here because `CONTENT_VERIFICATION.md` unlocks the Results gate on two
 * verified case studies, or one verified case study plus one clearly labeled
 * research experiment, and "clearly labeled" is a rendering obligation rather
 * than a filing one. Making the section required is what stops a later article
 * from claiming the research-experiment half of that gate with a badge and a
 * footnote.
 */

/**
 * The subject areas the section covers, transcribed from
 * `content/pages/12-research.md` §Categories.
 *
 * Version-controlled rather than a CMS taxonomy, on the precedent `docs/17`
 * §7 wave 2.1 records for the whole hub and `src/config/routes.ts` records for
 * the definition pages: the category vocabulary is brand language, and brand
 * language does not belong on a critical path a credential can block.
 */
export const researchCategories = [
  'Search Intelligence Engineering',
  'The AI Selection Problem',
  'Selection Intelligence',
  'Search Demand',
  'AI-Mediated Search',
  'Search Presence Engineering',
  'Total Search',
  'Measurement and Attribution',
  'Data and Systems',
] as const

export type ResearchCategory = (typeof researchCategories)[number]

/**
 * How a study's central claim is classified under `docs/12` §4.
 *
 * The union is the whole framework rather than the subset currently in use, so
 * a future study cannot be filed under a class the governance document does not
 * define. `Result` carries the heaviest burden: `docs/12` §4 requires a
 * baseline, an intervention, a timeframe, a measurement source, and limitations
 * before anything may be called one, so a study with no intervention is an
 * Observation and has to be filed as one.
 */
export type ClaimClass = 'Fact' | 'Observation' | 'Inference' | 'Hypothesis' | 'Result'

/** A numbered finding, step, assumption, or limitation. */
export type ResearchNumberedItem = {
  number: string
  name: string
  description: string
}

/**
 * A rendered table and its caption.
 *
 * `caption` renders visibly above the table and is what the scroll region is
 * announced as, which is the text-summary requirement in `docs/06` §14 met at
 * table scale. `summary` is for a table whose caption cannot carry the reading
 * on its own; the section's own prose covers the rest.
 */
export type ResearchEvidenceTable = {
  /** Stable key for the rendered list. Not a URL fragment. */
  id: string
  caption: string
  columns: readonly DataTableColumn[]
  rows: readonly DataTableRow[]
  summary?: string
}

export type ResearchArticleContent = {
  meta: { title: string; description: string }
  hero: { eyebrow: string; title: string; lead: readonly string[]; primaryCta?: Cta }
  /**
   * The Results-gate label, rendered immediately below the hero and above the
   * finding. Required. See the note in the header comment.
   */
  experimentLabel: { label: string; title: string; body: readonly string[] }
  /** Item 1a. One self-contained passage that survives being quoted alone. */
  directAnswer: { term: string; answer: string }
  /** Item 1b. */
  executiveSummary: { eyebrow: string; title: string; body: readonly string[] }
  /** Item 2. */
  keyFindings: {
    eyebrow: string
    title: string
    lead?: string
    items: readonly ResearchNumberedItem[]
    closing?: readonly string[]
  }
  /** Item 3. Every unit the evidence counts, defined before it is counted. */
  definitions: {
    eyebrow: string
    title: string
    lead?: string
    items: readonly MetricDefinition[]
  }
  /** Item 4, the counted half. */
  data: {
    eyebrow: string
    title: string
    lead?: string
    tables: readonly ResearchEvidenceTable[]
    note?: readonly string[]
  }
  /**
   * Item 4, the checked half. Optional: a study that only counts has nothing to
   * put here. Where it is used, every entry states the verification method and
   * the date, because a defect reported without a method a reader can repeat is
   * an assertion.
   */
  errorsFound?: {
    eyebrow: string
    title: string
    lead?: string
    items: readonly ResearchNumberedItem[]
    closing?: readonly string[]
  }
  /** Item 5. */
  methodology: {
    eyebrow: string
    title: string
    lead?: string
    items?: readonly ResearchNumberedItem[]
    closing?: readonly string[]
    cta?: Cta
  }
  /** Item 6. */
  sample: {
    eyebrow: string
    title: string
    items: readonly string[]
    note?: readonly string[]
  }
  /** Item 7. */
  assumptions: {
    eyebrow: string
    title: string
    lead?: string
    items: readonly ResearchNumberedItem[]
  }
  /**
   * Item 8. Required, and rendered as a section rather than an aside.
   *
   * `lead` states what class of study this is. `items` state what the data does
   * not show. Neither may be trimmed to make a finding read better.
   */
  limitations: {
    eyebrow: string
    title: string
    lead?: string
    items: readonly ResearchNumberedItem[]
  }
  /** Items 10 to 13, and the note explaining what moves each date. */
  byline: {
    author: string
    authorRole: string
    authorHref: string
    /** ISO date. Never changes once published (`docs/06` §15). */
    published: string
    /** ISO date. Moves only on a material change (`docs/06` §15). */
    updated: string
    /** ISO date of the most recent measurement the article reports. */
    dataThrough: string
    note?: string
  }
  /**
   * Item 14.
   *
   * `href` is the canonical destination and `fallbackHref` is where the link
   * points while that route is unbuilt. The page resolves the pair through
   * `ctaHref`, so the link repoints itself when `/corrections` lands and the
   * article never needs an edit for it.
   */
  corrections: {
    eyebrow: string
    title: string
    body: readonly string[]
    href: string
    fallbackHref: string
    label: string
  }
  /** Item 15. */
  relatedSolution: {
    eyebrow: string
    title: string
    body: readonly string[]
    ctas?: readonly Cta[]
  }
  /** Item 9. */
  sources: {
    /** ISO date, rendered inside a visible `<time>`. */
    reviewed: string
    basis: string
    /** Where the measurement is put to work. Unbuilt routes are filtered out. */
    appliedIn: readonly { label: string; href: string }[]
  }
  related: readonly RelatedLink[]
  closing: { title: string; primaryCta: Cta }
}

export type ResearchArticleRecord = {
  /** URL segment under `/research/`. Matches the content module's filename. */
  slug: string
  /** Absolute route path, read from `src/config/routes.ts` rather than retyped. */
  path: string
  category: ResearchCategory
  /** The H1 and the hub card title. Read from `content.hero.title`. */
  title: string
  /** The hub card summary. One or two sentences, leading with the finding. */
  summary: string
  /** ISO. Read from `content.byline`. */
  publishedDate: string
  /** ISO. Read from `content.byline`. */
  updatedDate: string
  /** ISO. Read from `content.byline`. */
  dataThroughDate: string
  /** The visible study-type label. Read from `content.experimentLabel.label`. */
  designation: string
  /** `docs/12` §4 classification of the article's central claim. */
  claimClass: ClaimClass
  /** Item 15, as a link the hub and the record block can both render. */
  relatedSolution: { label: string; href: string }
}

/** A registry entry: the dated record, paired with the module that renders under it. */
export type ResearchArticle = ResearchArticleRecord & {
  content: ResearchArticleContent
}
