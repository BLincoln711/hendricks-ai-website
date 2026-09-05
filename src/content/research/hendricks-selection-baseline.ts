import type { ChangeEntry } from '@/content/shared/publication-record'
import type { RelatedEntry } from '@/components/canvas/related-list'
import type { DataTableColumn, DataTableRow } from '@/components/ui/data-table'
import type { Cta } from '@/components/ui/cta'
import type { MetricDefinition } from '@/components/visuals/metric-definitions'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import {
  observedSystemsExclusion,
  observedSystemsSentence,
} from '@/content/shared/observed-systems'

/**
 * The self-baseline study. Mirrored in content/pages/25-hendricks-selection-baseline.md.
 *
 * This is E3 in docs/17 §8.3 and the first research asset in docs/19 §6. It is
 * the first page on this site that reports a measurement rather than a position.
 * Seven decisions are recorded here before anyone edits a string, and the first
 * two of them are corrections to this file. Both were made on publication day.
 *
 * 0A. THE 2026-08-19 FIGURES WERE REPLACED BY A REPRODUCIBLE RUN. READ THIS
 *    BEFORE EDITING ANY RUN 2 FIGURE.
 *
 *    The first published run 2 figures were 51 cells with all 51 measured, 19
 *    populated, 248 distinct domains across 305 citation slots, 218 domains
 *    cited once, reddit.com in 14 cells, linkedin.com in 10, and Google AI
 *    Overviews returning no sourced overview on any of the 17. They came from a
 *    genuine three-engine run at 22:54 on 2026-08-18 that was stamped with the
 *    2026-08-19 date. Its run log survives and confirms 17 OK lines for each of
 *    the three engines. Its result file does not survive.
 *
 *    HOW IT WAS DESTROYED, because the mechanism is the reusable lesson.
 *    `out_path()` in the probe keys a result file on client and date, so the
 *    scheduled job at 06:16 on 2026-08-19 wrote over the 22:54 file in place.
 *    The scheduled job runs the default single engine and carries the
 *    alternating engine forward, so the surviving file held 32 records: 17
 *    genuine Perplexity cells, 15 ChatGPT cells flagged as carried forward from
 *    2026-08-18, and no Google AI Overviews cells at all. The published figures
 *    could not be reproduced from any surviving record, which is disqualifying
 *    on a page whose entire value is that a reader can check it, and it is
 *    disqualifying whether or not the figures were right when they were taken.
 *
 *    RUN 2 IS NOW THE RUN OF RECORD 2026-08-19-110930, archived at
 *    `history/runs/hendricks-2026-08-19-110930.json` with its manifest at
 *    `history/runs/manifest-2026-08-19-110930.json`, both under
 *    `~/claudecode/total-search-dashboard/checker/` on the M3 Ultra. The
 *    manifest records engines_requested chat_gpt, perplexity, google_aio,
 *    engines_carried_forward NONE, carried 0, cells 51, measured 47, cost
 *    $0.3769. Requested, carried forward, and not run are three different
 *    states, and a bare result file cannot tell them apart after the fact.
 *
 *    ONE FIGURE WAS ALSO WRONG ON ITS MERITS. The first version said Google AI
 *    Overviews returned no sourced overview on any of the 17. It returned one.
 *    Do not restore the zero anywhere on the site, and do not overstate the one
 *    either. All four of run 2's errored cells are Google AI Overviews cells,
 *    so its figure reads against 13 successful probes, on the same rule run 1
 *    already used. The reading the page draws from it is unchanged: 1 of 13
 *    against 17 of 17 is not a spread any single averaged score describes.
 *
 *    ONE QUALITATIVE FINDING CAME OFF THE PAGE IN THE SAME EDIT. `errorsFound`
 *    carried a second item reporting a run 2 Perplexity answer that cited
 *    consumer software help pages. That item rested on the destroyed file and
 *    cannot be checked against the archive, so it is not published. Do not
 *    restore it from memory. If a later run reproduces it, it comes back with
 *    that run's id on it.
 *
 *    RUN 1 IS UNTOUCHED. Every 2026-08-18 figure on this page still reproduces
 *    from its own file and none of them changed.
 *
 * 0B. THIS PAGE WAS ALSO CORRECTED ON ITS PUBLICATION DAY OVER THE RETIRED
 *    SITE. READ THIS BEFORE EDITING ANY CLAIM ABOUT IT.
 *
 *    The first published version said the single hendricks.ai citation in the
 *    2026-08-18 run pointed at `/insights/ai-search-visibility-revenue-impact`,
 *    a URL that had never existed, and it counted both runs as zero on that
 *    basis. That was false.
 *
 *    The page was real. It was published 2025-11-25 as commit ab7705c on the
 *    `archive/legacy-site` branch, at
 *    `app/insights/ai-search-visibility-revenue-impact/page.tsx`, under the H1
 *    "How Do I Connect AI Search Visibility With Measurable Pipeline and Revenue
 *    Impact?". It was retired 2026-08-17 by commit 3a1eaa8, "Replace the legacy
 *    site with the Search Intelligence Engineering build". Confirm all of it
 *    from this repo, in four commands:
 *
 *      git log --all --oneline -- "*ai-search-visibility-revenue-impact*"
 *      git ls-tree -r --name-only archive/legacy-site | grep ai-search-visibility-revenue-impact
 *      git log --format="%h %ci %s" -1 ab7705c
 *      git log --format="%h %ci %s" -1 3a1eaa8
 *
 *    HOW THE ERROR HAPPENED, because the shape of it is the reusable lesson.
 *    The check was run against `~/claudecode/hendricks`, a DIFFERENT retired
 *    Hendricks site, laid out as `src/app/(marketing)/insights/` with a
 *    `src/lib/insights.ts` registry of 74 slugs. This repository's legacy site
 *    is the `archive/legacy-site` branch, laid out as `app/insights/` with no
 *    such registry. Two retired sites exist. The slug is absent from the one
 *    that was searched and present in the one that mattered, so the stated
 *    verification method returned the opposite answer in one command. The same
 *    published sentence also claimed the address appeared in no enumerated list
 *    of retired addresses, and it was sitting in `src/proxy.ts` at the time.
 *
 *    Two claims on this page rest on that history: key finding 01 and the
 *    corrections section. Before touching either, run the commands above against
 *    THIS repository. Do not verify a claim about the legacy site anywhere else.
 *
 *    Decisions 0A and 0B are separate corrections with separate causes. 0A is
 *    about a destroyed record. 0B is about a check run in the wrong place.
 *    Both are published in `corrections`, and both are in the log at
 *    /corrections. Neither may be collapsed into the other.
 *
 * 1. RUN 2'S ZERO LEADS, AND RUN 1'S ONE IS REPORTED AS REAL. `hero`,
 *    `directAnswer`, and `keyFindings` all carry the 2026-08-19 zero before the
 *    method appears, and none of them softens it. What they no longer do is
 *    erase the 2026-08-18 citation, which was earned by an article that answered
 *    the question asked. docs/19 §6.3 is explicit that what makes this a
 *    research asset rather than a claim is the published method, query set,
 *    denominators, date, limitations, failure count, and run health. It is not
 *    made into an asset by being softened and it is not made into one by being
 *    overstated in the pessimistic direction either. Do not move the method above
 *    the finding, do not add an opportunity frame to the executive summary, and
 *    do not let a later edit reframe run 2's null result as a starting position.
 *
 * 2. THE RESEARCH-EXPERIMENT LABEL IS LOAD-BEARING, NOT DECORATIVE.
 *    CONTENT_VERIFICATION.md holds `showResults` at false until two verified
 *    case studies exist, or one verified case study plus one clearly labeled
 *    research experiment. `experimentLabel` is that label, it renders in visible
 *    copy immediately under the hero, and it says in its own words that this is
 *    not a case study. docs/19 §6.3 closes the shortcut of relabelling one
 *    artifact to clear both halves of a two-part gate. This page satisfies the
 *    research half and nothing else. `showResults` stays false and /results
 *    stays dark.
 *
 * 3. EVERY FIGURE COMES FROM A DATED RUN, AND THE RUN IS NAMED. Two runs,
 *    2026-08-18 and 2026-08-19, produced by the first-party probe. No number
 *    on this page is derived,
 *    averaged, rounded, or recomputed from those runs into a new statistic,
 *    because docs/19 rule one requires every number to carry its denominator,
 *    its run date, and its run-health line. Percentages appear only where the
 *    run itself reported one, and they appear next to their count, which is why
 *    the run 2 fragmentation figures are counts with no percentage beside them
 *    and the run 1 figures still carry the percentages that were published with
 *    them. If a sentence wants a figure that is not in the run record, the
 *    sentence is cut rather than the figure invented. Since decision 0A the run
 *    record itself is named on the page, because a figure whose record cannot
 *    be produced on request is not a published measurement. The three dates that
 *    are not run dates, 2025-11-25, 2026-08-17, and the HTTP 410 observed on
 *    2026-08-18, are repository and resolution facts and each is checkable by
 *    the commands in decision 0B.
 *
 * 4. NO CAUSE, ANYWHERE. docs/19 §6.4 forbids any causal statement about why
 *    hendricks.ai was or was not cited, and the two runs used different query
 *    sets, so they are not a before-and-after of anything. `limitations` states
 *    both in plain words. A sentence that reads the move from one citation to
 *    zero as a decline is wrong and must not be written. The page may say that
 *    the article was deleted and that the citation pointed at it, because both
 *    are records. It may not say the deletion caused the zero.
 *
 * 5. DOMAINS ARE FACTS ABOUT THE ANSWER, NEVER VERDICTS ABOUT FIRMS. The
 *    most-cited domain tables publish which sources the answers cited, which is
 *    what docs/17 §8.1 sets as the discipline for this class of study, and
 *    `data.note` says so on the page. viaudit.com is named because a domain with
 *    no DNS record is a checkable observation any reader can reproduce in one
 *    command, which is the publishable form docs/19 §6.4 specifies. Nothing here
 *    ranks a vendor, and no page on this site will.
 *
 * SOURCES. No external citation. docs/18-SOURCE-LEDGER.md approves external
 * sources per page and this page reports first-party measurement only, so
 * `sources` carries no `citations` array.
 *
 * THE FIFTEEN ELEMENTS. docs/06 §12 requires all of them on a substantial
 * research article. Their homes here, in render order:
 *   1  executive summary        directAnswer + executiveSummary
 *   2  key findings             keyFindings
 *   3  definitions              definitions
 *   4  data or evidence         data + errorsFound
 *   5  methodology              methodology
 *   6  sample and date range    sample
 *   7  assumptions              assumptions
 *   8  limitations              limitations
 *   9  sources                  sources
 *   10 author                   byline.author
 *   11 published date           byline.published
 *   12 meaningful updated date  byline.updated
 *   13 data-through date        byline.dataThrough
 *   14 corrections link         corrections
 *   15 related solution         relatedSolution
 * Removing any one of them makes the page unpublishable under the site's own
 * contract. Add to the list, never subtract from it. Element 14 now carries both
 * dated corrections described in decisions 0A and 0B as well as the policy, and
 * the `href`, `fallbackHref`, and `label` that make it element 14 are untouched.
 *
 * Render order the page is built against:
 *   hero, experimentLabel, directAnswer, executiveSummary, keyFindings,
 *   definitions, data, errorsFound, methodology, sample, assumptions,
 *   limitations, byline, corrections, relatedSolution, related, sources,
 *   closing.
 *
 * NAVIGATION. content/pages/12-research.md line 88 gates primary navigation on
 * three category foundation pages. This is one asset. It is linked
 * contextually and from the footer research column, and src/config/navigation.ts
 * is not touched.
 */

export const meta = {
  title: 'Two Runs in AI Answers: a Citation to a Deleted Page, Then Zero | Hendricks',
  description:
    'A research experiment. Hendricks measured its own citation presence twice. Run 1 returned one citation, to an article the firm had deleted. Run 2 returned none across 51 cells.',
} as const

export const hero = {
  eyebrow: 'Research Experiment',
  title: 'An AI Engine Cited a Hendricks Article the Firm Had Deleted. The Next Run Returned Zero Citations.',
  lead: [
    'On 2026-08-18 and 2026-08-19 Hendricks pointed its own measurement instrument at its own brand. The second run sent 17 buyer questions to Google AI Overviews, ChatGPT, and Perplexity, produced 51 answer cells, and cited hendricks.ai in none of them.',
    'The first run produced one citation, and it was real. Perplexity answered the longest and most specific question in that set with a hendricks.ai article published on 2025-11-25 and retired on 2026-08-17, the day before the run. On the day it was cited, the address returned HTTP 410 Gone.',
  ],
  primaryCta: {
    label: 'See how Hendricks produces a number',
    href: routes.methodology.path,
    analytics: { location: 'hsb_hero' },
  } satisfies Cta,
} as const

/**
 * The results gate, in visible copy. See decision 2 in the header comment. This
 * block renders immediately under the hero and above the direct answer, and it
 * may not be moved below the fold, shortened into a footnote, or replaced with a
 * badge.
 */
export const experimentLabel = {
  label: 'Research experiment',
  title: 'This is a research experiment, not a case study.',
  body: [
    'Hendricks is both the firm running the measurement and the brand being measured. There is no client here, no intervention, and no outcome anyone can attribute to anything. What follows is a dated baseline of what three AI systems cited when they were asked the questions a buyer in this category types.',
    'It is published under the standard Hendricks applies to client work. The query set, the instrument, the denominators, the failed cells, the cost, the limits, the archived run every figure is read from, and three corrections to this page are all on the page. A firm that will not publish its own zero, or its own mistakes, has no standing to report anybody else’s number.',
  ],
} as const

/**
 * Element 1, first half. One self-contained paragraph that survives being lifted
 * out of the page, because being lifted is what this page is for. Run 2's zero
 * is stated first. Run 1's one is stated as real, because it was.
 */
export const directAnswer = {
  term: 'The finding',
  answer:
    'Hendricks measured its own citation presence twice. On 2026-08-19, across 17 buyer questions and 51 answer cells, hendricks.ai was cited zero times. That run is archived as run 2026-08-19-110930, and every 2026-08-19 figure on this page is read from that archive. On 2026-08-18, across 15 questions and 45 cells, hendricks.ai was cited once: Perplexity answered the longest and most specific question in that set with a hendricks.ai article published on 2025-11-25 and retired on 2026-08-17, the day before the run. The citation was real, the page was gone, and the address returned HTTP 410 Gone to anyone who followed it.',
} as const

/** Element 1, second half. States the finding, then what it means and what it does not. */
export const executiveSummary = {
  eyebrow: 'Executive Summary',
  title: 'What the two runs found',
  body: [
    'Hendricks sells the measurement of whether a brand is present in AI-mediated answers. Run against its own brand on 2026-08-19, that measurement returns zero. The run sent 51 cells and measured 47. Twenty of those 47 contained a citation of any kind, 247 distinct domains filled the 308 citation slots inside them, and hendricks.ai was not among those domains. The run is archived as 2026-08-19-110930 and every figure in this paragraph is read from that file.',
    'The run a day earlier found one citation, and it is the more instructive result. Perplexity answered "Consultant to connect AI search visibility to pipeline" with a hendricks.ai article titled "How Do I Connect AI Search Visibility With Measurable Pipeline and Revenue Impact?". The article was real and it answered the question asked. Hendricks published it on 2025-11-25 and deleted it on 2026-08-17 while replacing the site, and the engine cited it on 2026-08-18, the day after it came down. The address returned HTTP 410 Gone. The citation outlived the article, and the firm that earned it had already thrown the asset away.',
    'What both runs mean is narrow and worth stating precisely. On two dates, on one query set each, the systems Hendricks observes cited hendricks.ai once and then not at all. That is not a trend, because the two runs asked different questions. It does not mean the firm is invisible, because most of these answers cited nobody at all. And it does not mean anything is working or failing, because nothing was changed between the runs and nothing was held back for comparison.',
    'Three of the findings here are not about Hendricks at all. Most of these answers carry no sources. The three engines behave so differently that a single AI visibility score averaged across them describes nothing that exists. And where citation does happen it is spread across hundreds of domains, most of them cited exactly once.',
  ],
} as const

/** Element 2. Ordered by what is most useful to a reader, not by what flatters. */
export const keyFindings = {
  eyebrow: 'Key Findings',
  title: 'Five findings from two runs',
  items: [
    {
      number: '01',
      name: 'An engine cited a Hendricks article after the firm had deleted it.',
      description:
        'Run 1, on 2026-08-18, produced one citation of hendricks.ai. Perplexity answered "Consultant to connect AI search visibility to pipeline", the longest and most specific question in that set, with a hendricks.ai article titled "How Do I Connect AI Search Visibility With Measurable Pipeline and Revenue Impact?". Hendricks published that article on 2025-11-25 and deleted it on 2026-08-17 while replacing the site. The citation arrived on 2026-08-18, the day after the deletion, and the address returned HTTP 410 Gone. Run 2, a day later on a different set of questions, cited hendricks.ai in none of its 51 cells. The engine kept the citation. The firm had not kept the page. Any buyer that citation could have sent arrived at a tombstone.',
    },
    {
      number: '02',
      name: 'Most answers cited nothing at all.',
      description:
        'Twenty of the 47 measured cells in the 2026-08-19 run contained a citation. The other 27 carried no source at all. A correction dated 2026-09-01 narrows this finding: 12 of those 27 were Google AI Overviews reads produced by a parser defect that discarded asynchronously rendered panels, so the headline no longer holds as a property of all three engines. It holds for ChatGPT, where it is real and repeated: 15 of its 17 answers cited nothing while running thousands of characters. The number that matters for whether a brand could have been cited is still the populated count, not the cell count.',
    },
    {
      number: '03',
      name: 'The three engines behaved so differently that averaging them describes nothing.',
      description:
        'On 2026-08-19, all three engines were sent the same 17 questions. Perplexity cited sources on 17 of them. ChatGPT cited sources on 2. Google AI Overviews returned a measurement on 13, because 4 of its cells errored, and cited sources on 1 of those 13. A correction dated 2026-09-01 reclassifies that 1 of 13 as an instrument artifact rather than an engine behavior: the probe was discarding asynchronously rendered panels, and the corpus run run-2026-09-01T022903Z, taken after the fix, reads the same engine citing on 93.1 percent of rendered panels. The argument survives on the two engines that were read correctly. A single score averaged across 17 of 17 and 2 of 17 already describes no system that exists, and a reader handed one number should still ask which engine produced it, what the others did, and how many cells it averages.',
    },
    {
      number: '04',
      name: 'Where citation happened, it was extremely fragmented.',
      description:
        'The 2026-08-19 run cited 247 distinct domains across 308 citation slots, and 212 of those domains were cited exactly once. The run a day earlier cited 254 distinct domains across 324 slots, 221 of them once, 87 percent. Community and professional-network domains supplied the most repeated sources in both runs: reddit.com and linkedin.com sat ahead of every other domain cited, on both dates.',
    },
    {
      number: '05',
      name: 'One answer recommended a vendor domain that does not resolve.',
      description:
        'ChatGPT, answering "Who can audit our brand visibility in AI assistants" on 2026-08-18, listed viaudit.com among its sources. Twelve vendor domains from that run were checked with dig and curl the same day. Eleven resolved and returned HTTP 200. viaudit.com returned no DNS record and no response. An answer that names a source is not the same as an answer that is right, and the method used to verify this one is reported below.',
    },
  ],
} as const

/**
 * Element 3. docs/12 §6 forbids publishing a metric without a definition, and
 * every number on this page rests on the distinction between a cell, a measured
 * cell, and a populated cell. Getting that distinction wrong is how a broken run
 * gets published as a finding.
 */
export const definitions = {
  eyebrow: 'Definitions',
  title: 'The nine terms every number here depends on',
  lead: 'Read these before the tables. The difference between a cell that failed, a cell that cited nothing, and a cell that cited somebody else is the difference between three unrelated states that a single visibility percentage would flatten into one.',
  items: [
    {
      name: 'Engine',
      definition:
        'One AI answer system a run sends questions to. Three are covered here: Google AI Overviews, ChatGPT, and Perplexity. The scope statement under Limitations records what that set does and does not include.',
    },
    {
      name: 'Query set',
      definition:
        'The fixed list of buyer questions a run sends to every engine. Run 1 used 15 questions. Run 2 used 17, supplied by Brandon Lincoln Hendricks from his own knowledge of the market and structured by buyer stage. The second set replaced the first rather than extending it.',
    },
    {
      name: 'Cell',
      definition:
        'One question sent to one engine on one date. Seventeen questions across three engines produce 51 cells.',
    },
    {
      name: 'Measured cell',
      definition:
        'A cell where the engine returned an answer the probe could read. A cell that errored is not a measurement of anything and is counted separately.',
    },
    {
      name: 'Populated cell',
      definition:
        'A measured cell in which the engine cited at least one source. A cell that cited nothing cannot cite anybody, so the populated count, not the cell count, is the denominator for whether a brand could have been cited.',
    },
    {
      name: 'Owned citation',
      definition:
        'A cell in which the engine cited a URL whose host is hendricks.ai. A brand name appearing in answer text without a cited URL is a weaker signal and is not counted here. Whether the URL still resolves is a separate question from whether it was cited, and this page reports both.',
    },
    {
      name: 'Citation slot',
      definition:
        'One cited URL in one cell. A domain cited in six cells fills six slots, so the slot count is always at least the distinct-domain count.',
    },
    {
      name: 'Distinct domain',
      definition:
        'The number of different hosts appearing across all citation slots in a run. Read against the slot count it is the fragmentation measure: the closer the two numbers sit, the less any domain repeats.',
    },
    {
      name: 'Run of record',
      definition:
        'The archived result file a published figure is read from, named by a run id. Every run writes an immutable archive under its own id and a manifest beside it recording which engines were queried, which were carried forward from an earlier run, and which were not run at all. Those are three different states and a bare result file cannot tell them apart after the fact, which is what makes a figure on this page checkable rather than merely stated.',
    },
  ] satisfies readonly MetricDefinition[],
} as const

const runSummaryColumns = [
  { key: 'measure', header: 'Measure', rowHeader: true },
  { key: 'run1', header: 'Run 1, 2026-08-18' },
  { key: 'run2', header: 'Run 2, 2026-08-19' },
] as const satisfies readonly DataTableColumn[]

const runSummaryRows = [
  { measure: 'Questions in the set', run1: '15', run2: '17' },
  { measure: 'Cells run', run1: '45', run2: '51' },
  { measure: 'Cells measured', run1: '39', run2: '47' },
  { measure: 'Cells that errored', run1: '6', run2: '4' },
  { measure: 'Cells citing at least one source', run1: '21', run2: '20' },
  { measure: 'Measured cells citing nothing', run1: '18', run2: '27' },
  { measure: 'Cells citing hendricks.ai', run1: '1', run2: '0' },
  { measure: 'Distinct domains cited', run1: '254', run2: '247' },
  { measure: 'Citation slots filled', run1: '324', run2: '308' },
  { measure: 'Domains cited exactly once', run1: '221, or 87 percent', run2: '212' },
  { measure: 'API spend for the run', run1: '$0.47', run2: '$0.3769' },
  {
    measure: 'Run of record',
    run1: 'hendricks-2026-08-18.json, unchanged',
    run2: 'Run 2026-08-19-110930',
  },
] as const satisfies readonly DataTableRow[]

const perEngineColumns = [
  { key: 'engine', header: 'Engine', rowHeader: true },
  { key: 'run1', header: 'Cells citing a source, run 1' },
  { key: 'run2', header: 'Cells citing a source, run 2' },
] as const satisfies readonly DataTableColumn[]

const perEngineRows = [
  { engine: 'Perplexity', run1: '15 of 15', run2: '17 of 17' },
  { engine: 'ChatGPT', run1: '4 of 15', run2: '2 of 17' },
  { engine: 'Google AI Overviews', run1: '2 of 9 successful probes', run2: '1 of 13 successful probes' },
] as const satisfies readonly DataTableRow[]

const domainColumns = [
  { key: 'domain', header: 'Domain', rowHeader: true },
  { key: 'cells', header: 'Cells citing it' },
] as const satisfies readonly DataTableColumn[]

const run1DomainRows = [
  { domain: 'reddit.com', cells: '11' },
  { domain: 'linkedin.com', cells: '11' },
  { domain: 'semrush.com', cells: '6' },
  { domain: 'medium.com', cells: '4' },
  { domain: 'searchengineland.com', cells: '4' },
  { domain: 'ahrefs.com', cells: '4' },
] as const satisfies readonly DataTableRow[]

const run2DomainRows = [
  { domain: 'reddit.com', cells: '12' },
  { domain: 'linkedin.com', cells: '9' },
  { domain: 'semrush.com', cells: '6' },
  { domain: 'maxaeo.ai', cells: '5' },
  { domain: 'surferseo.com', cells: '3' },
] as const satisfies readonly DataTableRow[]

/**
 * Element 4, first half. Every figure in these four tables is read from one of
 * the two run records. Nothing is derived across runs, because the query set
 * changed between them and a cross-run figure would be a comparison of two
 * different questions.
 *
 * The run 1 value of the `Cells citing hendricks.ai` row has always been 1. It
 * was the prose above it, not this table, that was wrong in the first published
 * version. See decision 0B.
 *
 * Every run 2 value in these tables was replaced on publication day and is read
 * from run 2026-08-19-110930. See decision 0A before editing one. The `Domains
 * cited exactly once` row carries a percentage for run 1 and a bare count for
 * run 2 on purpose: run 1's percentage was published with the run, and the run 2
 * record reports counts. Do not compute the missing one to make the row look
 * symmetrical.
 */
export const data = {
  eyebrow: 'The Data',
  title: 'Both runs, in full',
  lead: 'Two runs, reported side by side rather than combined. The query set changed between them, so the columns sit next to each other as two separate measurements and never as a series.',
  tables: [
    {
      id: 'run-summary',
      caption: 'Run totals for 2026-08-18 and 2026-08-19, by measure.',
      columns: runSummaryColumns,
      rows: runSummaryRows,
    },
    {
      id: 'per-engine',
      caption: 'Cells in which each engine cited at least one source, by run.',
      columns: perEngineColumns,
      rows: perEngineRows,
    },
    {
      id: 'run-1-domains',
      caption: 'Most frequently cited domains in the 2026-08-18 run.',
      columns: domainColumns,
      rows: run1DomainRows,
    },
    {
      id: 'run-2-domains',
      caption: 'Most frequently cited domains in the 2026-08-19 run.',
      columns: domainColumns,
      rows: run2DomainRows,
    },
  ],
  note: [
    'The domain tables record which sources these answers cited. They are facts about the answers and nothing else. They are not a ranking of firms, they carry no judgment about any company behind a domain, and no page on this site publishes one.',
    'Run 1 errored on 6 of its 45 cells, all of them Google AI Overviews. That is why the Google AI Overviews figure for run 1 reads against 9 successful probes rather than 15. Run 2 errored on 4 of its 51 cells, which is an upstream server error rather than a finding about any engine. All four were Google AI Overviews cells, exactly as in run 1, so the Google AI Overviews figure for run 2 reads against 13 successful probes rather than 17. ChatGPT and Perplexity each returned a measurement on all 17 questions they were sent, so their columns read against 17.',
    'The single cell citing hendricks.ai in run 1 cites a page Hendricks published on 2025-11-25 and retired on 2026-08-17. The citation is counted here because it happened. The page it points at is gone, which is a separate fact and is reported next to it rather than folded into the count. Key finding 01 and the corrections section carry the detail.',
    'Every run 2 figure above is read from run 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json with its manifest at history/runs/manifest-2026-08-19-110930.json. The manifest records all three engines as requested, none carried forward from an earlier run, 51 cells, 47 measured, and $0.3769 spent. A reader checking a figure on this page can name that run id and ask for the file it came from. The public path is /history/runs/hendricks-2026-08-19-110930.json.',
  ],
  archiveLinks: [
    {
      filename: 'hendricks-2026-08-19-110930.json',
      label: 'Run 2026-08-19-110930 result file',
      note: 'Primary citation-presence archive for every 2026-08-19 figure on this page.',
    },
    {
      filename: 'manifest-2026-08-19-110930.json',
      label: 'Run 2026-08-19-110930 manifest',
      note: 'Companion manifest for the primary run.',
    },
    {
      filename: 'hendricks-2026-08-18.json',
      label: '2026-08-18 result file',
      note: 'Stable public name for the earlier self-run, previously described as the 2026-08-18 result file, unchanged.',
    },
  ],
} as const

export const citationRuns = [
  {
    runId: '2026-08-19-110930',
    name: 'Hendricks citation-presence archive 2026-08-19-110930',
    description:
      'First-party citation-presence archive for Hendricks self-run 2026-08-19-110930. Records whether each answer cell cited a URL host.',
    temporalCoverage: '2026-08-19',
    filename: 'hendricks-2026-08-19-110930.json',
    role: 'primary',
  },
  {
    runId: '2026-08-18',
    name: 'Hendricks citation-presence archive 2026-08-18',
    description:
      'First-party citation-presence archive for the 2026-08-18 Hendricks self-run. Records whether each answer cell cited a URL host.',
    temporalCoverage: '2026-08-18',
    filename: 'hendricks-2026-08-18.json',
    role: 'secondary',
  },
] as const

/**
 * Element 4, second half. One answer defect, verified outside the probe by a
 * method a reader can repeat. The verification method is part of the finding,
 * not a footnote to it. See decision 5 in the header comment on why viaudit.com
 * is named.
 *
 * TWO ITEMS STOOD HERE IN THE FIRST PUBLISHED VERSION AND BOTH CAME OFF. One
 * reported the run 1 hendricks.ai citation as a fabricated URL; that was not an
 * error in the answer, it was an error in this file, and the true finding now
 * sits in `keyFindings` item 01 where a finding about the site belongs (decision
 * 0B). One reported a run 2 Perplexity answer citing consumer software help
 * pages; that item rested on the run 2 result file a scheduled job overwrote,
 * cannot be checked against the archive, and is not published (decision 0A).
 * Restore neither from memory.
 */
export const errorsFound = {
  eyebrow: 'Answer Reliability',
  title: 'One checkable error in these answers',
  lead: 'It was found in the run output and then verified independently of the probe, by hand, on the date stated.',
  items: [
    {
      number: '01',
      name: 'A recommended vendor domain with no DNS record.',
      description:
        'Run 1, ChatGPT, answering "Who can audit our brand visibility in AI assistants", listed viaudit.com among its sources. Twelve vendor domains were checked with dig and curl on 2026-08-18. Eleven resolved and returned HTTP 200. viaudit.com returned no DNS record and no response. A domain with no DNS record is not a company, so this is a checkable statement about an answer rather than a judgment about a business, and any reader can reproduce it in one command.',
    },
  ],
  closing: [
    'One error in two runs is not a rate and is not published as one. Two runs cannot establish how often these systems get something wrong, and this page makes no claim about that.',
    'What the one does establish is narrower and still useful. An answer that names a source is not the same as an answer that is right, and a brand cannot assume that being absent from an answer is worse than being present in it incorrectly.',
    'Two further defects were reported in this section when the page was first published. One of them was Hendricks making an error rather than an engine. The other rested on a run record that no longer exists, so it cannot be checked and is no longer published. Both corrections are below.',
  ],
} as const

/** Element 5. */
export const methodology = {
  eyebrow: 'Methodology',
  title: 'How these numbers were produced',
  lead: 'The instrument is a first-party probe that records the URLs each engine cited, one question at a time, per engine. It is the same instrument Hendricks points at a client engagement.',
  items: [
    {
      number: '01',
      name: 'Fix the query set before the run.',
      description:
        'Run 1 used 15 questions inferred from a buyer prompt inventory. Run 2 replaced them with 17 supplied by Brandon Lincoln Hendricks from his own knowledge of the market, structured by buyer stage. The set is fixed before the run and is not edited after the answers are read.',
    },
    {
      number: '02',
      name: 'Send every question to every engine once.',
      description:
        'Each question goes to Google AI Overviews, ChatGPT, and Perplexity on the run date. One question on one engine is one cell. No cell was run twice on the same date.',
    },
    {
      number: '03',
      name: 'Record cited URLs, not brand mentions.',
      description:
        'The counted field is the list of URLs an engine cited, matched on host. A brand named in answer text without a cited URL is a different and weaker signal, and counting it here would make the number larger and easier to move.',
    },
    {
      number: '04',
      name: 'Keep the three answer states apart.',
      description:
        'Every cell is measured and populated, measured and empty, or errored. Folding an errored cell into an empty one turns a broken instrument into a finding, which is the failure this separation exists to prevent.',
    },
    {
      number: '05',
      name: 'Report the run health next to the number.',
      description:
        'Run 1 errored on 6 of 45 cells, all of them Google AI Overviews. Run 2 errored on 4 of 51, all of them Google AI Overviews again. Both runs failed the same way, which is an upstream server error. A run that fails and a run that finds nothing produce similar-looking output files and mean opposite things, so the error count travels with every figure taken from either run.',
    },
    {
      number: '06',
      name: 'Resolve every cited URL, and verify anything unexpected outside the probe.',
      description:
        'A citation count says a URL was named. It does not say the URL still works. Resolving the one hendricks.ai address cited in run 1 is what turned a citation into the most useful finding on this page, because the address returned HTTP 410 Gone. The one answer error reported below was then checked by hand, with dig and curl, on the date stated on it.',
    },
    {
      number: '07',
      name: 'Verify a claim about a Hendricks page against the Hendricks page.',
      description:
        'This step exists because the first published version of this page failed it. Hendricks ran the history check for the cited article against the wrong repository, found nothing, and published the conclusion that the engine had invented the URL. The article was in the other retired site. A verification that names no specific repository, branch, and command is not a verification, and the corrections section below records what was published, what was wrong, and what changed.',
    },
    {
      number: '08',
      name: 'Archive the run under an id, and record what was queried.',
      description:
        'Every run writes an immutable archive keyed to a run id, and a manifest beside it recording which engines were queried, which were carried forward from an earlier run, and which were not run at all. Those are three different states and a bare result file cannot tell them apart after the fact. Run 2 is run 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json with its manifest at history/runs/manifest-2026-08-19-110930.json. This step exists because the first published version of this page reported a run whose result file a scheduled job had already overwritten in place, and the corrections section below records what was published and what changed.',
    },
  ],
  closing: [
    'Run 1 cost $0.47 in API spend. Run 2 cost $0.3769, which the manifest records to the fraction of a cent. Those figures are published deliberately, because they are the strongest evidence available that this design is reproducible. Anyone with an API key and a list of questions can run this design against their own brand and does not have to take this page’s word for anything.',
    'The instrument is named for the same reason, and so is the run. Naming the instrument is disclosure, not endorsement. Naming the run is what lets a reader ask for the exact file a figure came from, which is the difference between a measurement and an assertion.',
  ],
  cta: {
    label: 'Read the full Hendricks methodology',
    href: routes.methodology.path,
    analytics: { location: 'hsb_methodology' },
  } satisfies Cta,
} as const

/** Element 6. */
export const sample = {
  eyebrow: 'Sample and Date Range',
  title: 'What was sampled, and when',
  items: [
    'Subject: hendricks.ai, the firm publishing this page. No client brand and no client data appears in either run.',
    'Dates: two runs, 2026-08-18 and 2026-08-19. One run per cell, one cell per question per engine.',
    'Engines: Google AI Overviews, ChatGPT, and Perplexity.',
    'Questions: 15 in run 1, 17 in run 2. The second set replaced the first and does not extend it.',
    'Cells: 45 in run 1, of which 39 were measured and 6 errored. 51 in run 2, of which 47 were measured and 4 errored.',
    'Geography and language: one setting, held constant across both runs.',
    'Instrument: a first-party probe.',
    'Run of record: run 2 is 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json with its manifest at history/runs/manifest-2026-08-19-110930.json. Run 1 reproduces from hendricks-2026-08-18.json, unchanged.',
    'Resolution check: the one cited hendricks.ai address was fetched by hand on 2026-08-18 and returned HTTP 410 Gone.',
  ],
  note: [
    'The manifest for run 2026-08-19-110930 records all three engines as requested, none carried forward from an earlier run, 51 cells, 47 measured, and $0.3769 in API spend. Requested, carried forward, and not run are three different states, and a result file on its own cannot tell them apart after the fact.',
    'That manifest exists because of a failure on this page. The 2026-08-19 figures published in the first version came from a run whose result file a scheduled job overwrote in place, and they could not be reproduced from any surviving record. The corrections section states what was published, what was wrong, and what changed.',
  ],
} as const

/** Element 7. Assumptions the run makes, stated as assumptions and not as facts. */
export const assumptions = {
  eyebrow: 'Assumptions',
  title: 'Four things this run assumes',
  items: [
    {
      number: '01',
      name: 'That the query set represents what a buyer actually types.',
      description:
        'Run 2 was built from market knowledge rather than from a keyword tool or a positioning document, which is the strongest basis available and is still a judgment. If the set is wrong, the run measures the wrong questions accurately, and every figure on this page inherits that.',
    },
    {
      number: '02',
      name: 'That an API response resembles what a person sees.',
      description:
        'These answers were retrieved through an API, not by a person in a browser with an account, a location, and a history. Hendricks assumes the API surface is close enough to be informative. It does not assume the two are identical, and no figure here should be read as what a specific buyer saw.',
    },
    {
      number: '03',
      name: 'That a cited URL is the right unit to count.',
      description:
        'The count is cited URLs whose host is hendricks.ai. A brand named in answer text without a link is not counted. That choice makes the number smaller and harder to move, and it is the reason run 2 reports zero rather than something more forgiving.',
    },
    {
      number: '04',
      name: 'That one run per cell describes a day and not a position.',
      description:
        'No cell was repeated within a date, so nothing here measures how much these answers churn between identical runs. Two days is what was sampled and two days is what is claimed.',
    },
  ],
} as const

/**
 * Element 8, and the section that decides whether the rest of the page is
 * trustworthy. See decision 4 in the header comment. Item 07 renders the shared
 * observed-systems constants rather than a fresh wording of the A1 boundary
 * (docs/17 §3.5).
 */
export const limitations = {
  eyebrow: 'Limitations',
  title: 'What these two runs do not show',
  lead: 'This is a baseline. It is not an experiment in the sense that would let anyone claim a cause, and the difference is not a technicality. Two runs a day apart, one variable changed between them, no control group, and no intervention. Nothing here tests whether any tactic produces a citation.',
  items: [
    {
      number: '01',
      name: 'The two runs are not a before and after.',
      description:
        'The query set changed between them. Run 1 asked 15 questions and run 2 asked a different 17. Any sentence that compares the two as a trend is wrong, including one that reads the move from one citation to zero as a decline. The two runs asked different questions, so there is no comparable pair on this page.',
    },
    {
      number: '02',
      name: 'Deleting the article is not shown to have caused anything.',
      description:
        'Hendricks published the cited article on 2025-11-25 and deleted it on 2026-08-17, and an engine cited it on 2026-08-18. Those are three records and they are all this page claims. Nothing here shows that the deletion changed what any engine cited afterwards, because the second run asked different questions and no comparison was designed. A reader who wants the causal version of this question needs a repeated set across the change, and no such series exists.',
    },
    {
      number: '03',
      name: 'There is no control and no intervention.',
      description:
        'Hendricks changed nothing about the site between the two runs and held nothing back for comparison. The design cannot attribute any outcome to any action, and no later result may be attributed backwards to this baseline either.',
    },
    {
      number: '04',
      name: 'The result does not generalise past these conditions.',
      description:
        'These questions, these engines, these two dates, one geography, one language setting. A different set of questions on the same day would return different domains, and the change of set between the two runs is a direct demonstration of exactly that.',
    },
    {
      number: '05',
      name: 'Nobody outside the platforms can observe why a source was chosen.',
      description:
        'This page reports what appeared. It offers no account of why any engine chose any source, because no such account is available to anyone outside the companies operating these systems. A firm that offers one is guessing, and this page will not.',
    },
    {
      number: '06',
      name: 'A cell that cited nothing is not a cell Hendricks lost.',
      description:
        'Twenty-seven of the 47 measured cells in run 2 carried no source at all. The denominator for whether Hendricks could have been cited is 20, not 51. Counting all 51 as losses would overstate the competitive problem and hide the more interesting fact underneath it, which is that most of this map is unclaimed rather than taken.',
    },
    {
      number: '07',
      name: 'Four cells in run 2 produced no measurement.',
      description:
        'Run 2 sent 51 cells and measured 47. Four returned an upstream server error, and an errored cell is a broken instrument rather than a finding of absence. All four were Google AI Overviews cells, so that engine returned a measurement on 13 of the 17 questions it was sent and its figure on this page reads against 13. The counts themselves are exact. What no figure here can say is what those four cells would have returned, and nothing on this page estimates it.',
    },
    {
      number: '08',
      name: 'This is not yet a full Selection Intelligence baseline.',
      description:
        'It measures citation presence. It does not report Observed Consideration Rate, Observed Recommendation Rate, Selection Stability, or Commercial Selection Gap. Selection Stability in particular is a measure across repeated runs of an unchanged set, and no such series exists yet, because these two runs used two different sets.',
    },
    {
      number: '09',
      name: 'The measurement covers one slice of AI-mediated search.',
      description: `${observedSystemsSentence} ${observedSystemsExclusion} A baseline on the observed set says nothing about the surfaces outside it, and nothing on this page should be read as a statement about them.`,
    },
  ],
} as const

/** Elements 10 to 13. */
export const byline = {
  author: 'Brandon Lincoln Hendricks',
  authorRole: 'Search Intelligence Engineer, Hendricks',
  authorHref: siteConfig.founderPersonId,
  published: '2026-08-19',
  dataThrough: '2026-08-19',
  note: 'The updated date on this page moves when a figure, a method, or a limitation changes. It is not refreshed to signal activity. It moved twice on the day of publication, for the first two corrections recorded below, and again on 2026-09-01 for the third. The data-through date is the last run this page reports, run 2026-08-19-110930, and will not advance until a further run is published here.',
} as const

/**
 * Element 14. `/corrections` is the canonical destination and ships with or
 * before this page (docs/19 §6.2). The fallback exists so the link is never dead
 * if the sequencing slips: render it through `ctaHref(corrections.href,
 * corrections.fallbackHref)`.
 *
 * The first two paragraphs are the 2026-09-01 correction and the same-day scope
 * update. The six after them are the two corrections described in decisions 0A
 * and 0B. Corrections lead, because a policy stated above the corrections it failed to
 * prevent reads as decoration. 0A leads 0B because it governs every 2026-08-19
 * figure on the page. The `href`, `fallbackHref`, and `label` are unchanged and
 * are what make this element 14.
 */
/**
 * Item 11. The dated record, transcribed row for row from the corrections prose
 * below. Three corrections and one scope update, in the order they were made.
 */
export const changes: readonly [ChangeEntry, ...ChangeEntry[]] = [
  {
    date: '2026-08-19',
    kind: 'publication',
    summary: 'First publication of the two-run self-baseline.',
  },
  {
    date: '2026-08-19',
    kind: 'correction',
    summary:
      'The single hendricks.ai citation in run 1 was published as pointing at a page that had never existed. The page was real, published 2025-11-25 and retired 2026-08-17, and the check had been run against the wrong retired site. Run 1 records one real citation of a retired page.',
  },
  {
    date: '2026-08-19',
    kind: 'correction',
    summary:
      'Every 2026-08-19 figure was re-read from the archived run 2026-08-19-110930 after a scheduled job overwrote the original result file in place. The Google AI Overviews reading was corrected from no sourced overview on any of 17 questions to 1 sourced overview of 13 measured cells.',
  },
  {
    date: '2026-09-01',
    kind: 'update',
    summary:
      'The shared observed-systems sentence changed when Gemini became the fourth observed system under CONTENT_VERIFICATION A1. No figure on this page changed and nothing from Gemini is reported here.',
  },
  {
    date: '2026-09-01',
    kind: 'correction',
    summary:
      'The probe was discarding overview panels the vendor flagged as asynchronously rendered, so Google AI Overviews read as nearly silent. Findings 02 and 03 carry the corrected conclusions inline and the earlier claim that the reading was unchanged is withdrawn.',
  },
]

export const corrections = {
  eyebrow: 'Corrections',
  title: 'Three corrections to this page, and how the next one gets made',
  body: [
    'Correction, 2026-09-01. What was published: the 2026-08-19 run read Google AI Overviews citing a source on 1 of its 13 measured cells, and findings 02 and 03 built on that reading, including the sentence in the first correction below that the reading the page draws from that number is unchanged. That sentence is withdrawn. What was wrong: the probe was bailing out of any overview panel the vendor flagged as asynchronously rendered, discarding usable panels, so this engine read as nearly silent when it was not. This is the second correction to this page involving the same engine and it is the deeper one: the first replaced a destroyed file with an archived run, and the archived run was itself read through the defective parser. The counts stand as a record of what the instrument read; findings 02 and 03 now carry the corrected conclusions inline. Corroboration, not cause: corpus run run-2026-09-01T022903Z, taken after the parser fix, reads Google AI Overviews citing on 430 of 462 rendered panels. The full entry is in the corrections log.',
    'Update, 2026-09-01. The scope sentence this page renders from the shared observed-systems module changed when Gemini became the fourth observed system, a boundary decision recorded in CONTENT_VERIFICATION A1 on 2026-09-01. The sentence on this page changed with it. No figure on this page changed, and nothing from Gemini is reported here.',
    'Correction, 2026-08-19. What was published: a 2026-08-19 run of 51 cells with all 51 measured, 19 of them citing a source, 248 distinct domains across 305 citation slots, 218 domains cited exactly once, reddit.com in 14 cells, linkedin.com in 10, and Google AI Overviews returning no sourced overview on any of the 17.',
    'What was wrong, in two parts. Those figures came from a real three-engine run at 22:54 on 2026-08-18 that carried the 2026-08-19 date, and its result file no longer exists. Hendricks destroyed it. The probe named each result file from the client and the date alone, so when the scheduled job ran at 06:16 on 2026-08-19 it wrote over the earlier file in place. That scheduled job queries one engine and carries the alternating engine forward from the day before, so the file that survived held 32 records: 17 Perplexity cells from that morning, 15 ChatGPT cells flagged as carried forward from 2026-08-18, and no Google AI Overviews cells at all. None of the published figures could be reproduced from any surviving record. On a page whose entire value is that a reader can check it, that is disqualifying whether or not the figures were right when they were taken.',
    'The second part is a figure that was also wrong on its merits. Google AI Overviews did not return an unsourced answer on all 17 questions. Four of its cells errored, 13 returned a measurement, and one of those 13 carried a sourced overview. The reading the page draws from that number is unchanged: 1 of 13 against 17 of 17 is not a spread any single averaged visibility score describes.',
    'What changed. Every 2026-08-19 figure on this page is now read from run 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json with its manifest at history/runs/manifest-2026-08-19-110930.json. That run measured 47 of its 51 cells, 20 of them citing a source, across 247 distinct domains and 308 citation slots, and cited hendricks.ai in none of them. One further item came off the page in the same edit: an answer reported as citing consumer software help pages rested on the destroyed file, cannot be checked against the archive, and is no longer published. Run 1 is untouched and still reproduces from its own file. The instrument changed too. Every run now writes an immutable archive keyed to a run id, and a manifest beside it recording which engines were queried, which were carried forward from an earlier run, and which were not run at all. Those are three different states, and a bare result file cannot tell them apart after the fact.',
    'Correction, 2026-08-19, the day this page was published. The first version said the single hendricks.ai citation in the 2026-08-18 run pointed at a page that had never existed, and it counted both runs as zero on that basis. That was wrong. The page was real. Hendricks published it on 2025-11-25, retired it on 2026-08-17 while replacing the site, and Perplexity cited it on 2026-08-18, the day after it came down. Run 1 records one real citation of a retired page. Run 2 records zero and is unchanged.',
    'Hendricks caused that error by running the check against the wrong repository. The firm has two retired sites. The check searched the one with 74 registered insight slugs and a different directory layout, did not find the address there, and stopped. The address was in the other one, which is the retired site belonging to this codebase. One command against the correct site returns the opposite answer. The same published sentence also claimed the address appeared in no list of retired addresses, and it was in that list in this site’s own source at the time.',
    'All three entries, with what was published and what changed, are in the corrections log rather than only here.',
    'If a figure here is wrong, or a third party runs this design and gets a materially different result, the correction is published with its date, the original figure, the contradicting result, and what changed. Nothing on this page is quietly edited.',
    'That path exists because a firm selling measurement discipline has to be correctable in public. Needing it twice on the first day is not the demonstration anyone would choose. Publishing both anyway is the whole argument for having it.',
  ],
  href: routes.corrections.path,
  fallbackHref: routes.contact.path,
  label: 'Read the corrections policy',
} as const

/** Element 15. */
export const relatedSolution = {
  eyebrow: 'Related Solution',
  title: 'Where this measurement sits in the work',
  body: [
    'The unit counted here, whether an engine cited a source and which one, is one input to Selection Intelligence, which reports whether a brand entered consideration rather than whether a URL appeared. The two are not the same question, and this page answers only the narrower one.',
    'The run design behind a client baseline, the context panels, the classification rule, and the evidence grade every conclusion carries are on the Methodology page.',
  ],
  ctas: [
    {
      label: 'See what a Selection Intelligence baseline covers',
      href: routes.selectionIntelligence.path,
      analytics: { location: 'hsb_related_solution', solutionName: 'Selection Intelligence' },
    },
    {
      label: 'Read the Methodology',
      href: routes.methodology.path,
      analytics: { location: 'hsb_related_methodology' },
    },
  ] satisfies readonly Cta[],
} as const

/**
 * Element 9. No `citations` array. This page reports first-party measurement and
 * cites no third-party research, so a reference list would be furniture. The
 * update note is part of `basis` because the section renders one paragraph and a
 * review date, and a correction that is not visible in the sources block is a
 * correction a reader has to already know about to find.
 */
export const sources = {
  reviewed: '2026-08-19',
  basis:
    'This page reports first-party measurement produced by Hendricks. Every figure on it comes from one of two probe runs, on 2026-08-18 and 2026-08-19, each recorded with its denominators, its error count, and its cost. The 2026-08-19 figures are read from run 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json with its manifest at history/runs/manifest-2026-08-19-110930.json. The page reports no third-party research, no vendor study, and no statistic from anyone else, and therefore cites none. It was updated twice on 2026-08-19, the day of publication. The first version reported the single hendricks.ai citation in the 2026-08-18 run as pointing at a page that had never existed; the page was real and had been retired on 2026-08-17. The 2026-08-19 figures in that same version came from a run whose result file a scheduled job overwrote in place, could not be reproduced from any surviving record, and included one figure that was also wrong; they are replaced by the archived run named above. Run 1 is unchanged. Both entries are in the corrections log.',
  appliedIn: [
    { label: 'the Selection Intelligence solution', href: routes.selectionIntelligence.path },
    { label: 'the Methodology', href: routes.methodology.path },
    { label: 'the Search Intelligence Diagnostic', href: routes.diagnostic.path },
  ],
} as const

export const related: readonly RelatedEntry[] = [
  {
    href: routes.selectionIntelligence.path,
    label: 'Selection Intelligence',
    description: 'What a consideration and recommendation baseline covers, produces, and reports.',
  },
  {
    href: routes.whatIsSelectionIntelligence.path,
    label: 'What Is Selection Intelligence?',
    description: 'The measures a baseline reports, defined before any of them is reported.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'Context panels, classification, weighting, evidence grades, and the stated limits.',
  },
  {
    href: routes.whatIsAiMediatedSearch.path,
    label: 'What Is AI-Mediated Search?',
    description: 'The surfaces this run sampled, and which of them Hendricks observes.',
  },
  {
    href: routes.aiVisibilityToolOrPartner.path,
    label: 'Do You Need an AI Visibility Tool or a Partner?',
    description: 'What a monitoring subscription produces, and which jobs it leaves to a person.',
  },
]

export const closing = {
  title:
    'The numbers are one and zero. They are dated, the method is on the page, the run behind them is archived under a name a reader can ask for, and both corrections to the first version of this page are published. Hold every other AI visibility number you are shown to the same four tests.',
  primaryCta: {
    label: 'Establish a baseline through the Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'hsb_closing' },
  } satisfies Cta,
} as const
