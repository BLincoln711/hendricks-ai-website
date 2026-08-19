import type { RelatedLink } from '@/components/sections/related-links'
import type { DataTableColumn, DataTableRow } from '@/components/ui/data-table'
import type { Cta } from '@/components/ui/cta'
import type { MetricDefinition } from '@/components/visuals/metric-definitions'
import { routes } from '@/config/routes'
import {
  observedSystemsExclusion,
  observedSystemsSentence,
} from '@/content/shared/observed-systems'

/**
 * The answer-stability study. Mirrored in content/pages/27-answer-stability-two-runs.md.
 *
 * The second research asset on this site and the first that compares two runs
 * rather than reporting one. Six decisions are recorded here before anyone edits
 * a string.
 *
 * 1. THE FINDING HAS TWO HALVES AND BOTH LEAD. The convenient reading of this
 *    pair is "AI answers are unstable, so you need continuous measurement". That
 *    reading is half true and publishing it alone would be a sales argument
 *    wearing a measurement costume. Whether an engine cited anyone at all was
 *    perfectly stable, 51 of 51 cells, zero flips in either direction. Which
 *    sources it cited was not, mean overlap 0.68 across the 20 cells that
 *    carried citations, 2 of those 20 identical. `hero`, `directAnswer`,
 *    `executiveSummary`, and `keyFindings` all carry the stable half first,
 *    because a reader who has run the same query twice and seen the same shape
 *    has already observed it, and a page that contradicts what they saw loses
 *    them before the interesting half arrives. Do not reorder these so the
 *    instability leads, and do not soften the stable half into "broadly
 *    consistent". It was exact.
 *
 * 2. THE THIN FIGURES CARRY THEIR CELL COUNT IN THE SAME SENTENCE, EVERY TIME.
 *    The per-engine comparison covers 17 Perplexity cells, 2 ChatGPT cells, and
 *    1 Google AI Overviews cell. A mean of two numbers is not a rate and a
 *    single cell is not a mean. Both figures appear on the page four times
 *    between the findings, the table, the sample, and the limitations, and each
 *    appearance states the denominator beside the number rather than deferring
 *    it to a limitations section a reader may not reach. If an edit ever leaves
 *    0.22 or 1.00 standing without "2 cells" or "1 cell" next to it, the edit is
 *    wrong.
 *
 * 3. EVERY FIGURE COMES FROM ONE OF TWO ARCHIVED RUNS, AND BOTH ARE NAMED.
 *    Run A is 2026-08-19-110930 and run B is 2026-08-19-181155, both archived
 *    and immutable, both carrying a manifest beside the result file. The two run
 *    ids appear in the direct answer, the executive summary, the definitions,
 *    the data tables and their note, the methodology, the sample, the byline
 *    note, the corrections section, and the sources block, so a passage lifted
 *    out of this page carries its own provenance with it. That habit exists
 *    because the first study published under this format shipped figures from a
 *    run whose result file a scheduled job had already overwritten in place.
 *    Nothing on this page is derived, averaged, rounded, or recomputed into a
 *    new statistic. Where a sentence wanted a figure the run record does not
 *    report, the sentence was cut.
 *
 * 4. NO CAUSE, ANYWHERE. The design varies elapsed time and nothing else. There
 *    is no intervention, no control, and no holdout, so no sentence may explain
 *    why any source entered or left a citation set, and no sentence may treat
 *    the movement as churn, decay, volatility, or a trend. `limitations` states
 *    this and `keyFindings` item 05 states it again where a reader who only
 *    skims the findings will meet it.
 *
 * 5. THE ERRORED CELLS ARE DISCLOSED INSIDE THE STABLE HALF, NOT UNDERNEATH IT.
 *    Run A errored on 4 cells and run B on 2, all Google AI Overviews. An
 *    errored cell returns no answer and therefore no citations, so on the
 *    citation-state comparison it registers as a cell that cited nothing. None
 *    of the errored cells in either run is a cell where the other run found a
 *    citation, so no match among the 51 rests on an error standing in for an
 *    answer. That sentence sits in `data.note` and again in `limitations` item
 *    06, because a reader who spots the gap unaided will discount the rest of
 *    the page, and the gap is checkable from the two named archives.
 *
 * 6. THE PRACTICAL CONSEQUENCE IS DRAWN BY LINKING, NEVER BY PITCHING. The
 *    argument this pair supports is repeated observation of a fixed set under
 *    stated conditions, which is what Selection Intelligence is.
 *    `relatedSolution` makes that connection with two links and no claim about
 *    what a Hendricks engagement would produce. No fee, no promise, no client.
 *
 * SOURCES. No external citation. docs/18-SOURCE-LEDGER.md approves external
 * sources per page and this page reports first-party measurement only, so
 * `sources` carries no `citations` array. Naming the DataForSEO AI Optimization
 * API is instrument disclosure, not a citation and not an endorsement.
 *
 * NO `errorsFound`. The section is optional in ./types and this pair produced no
 * verified defect in any answer. An empty section, or one filled with a defect
 * carried over from another study, would be furniture.
 *
 * THE FIFTEEN ELEMENTS. docs/06 §12 requires all of them. Their homes here, in
 * render order:
 *   1  executive summary        directAnswer + executiveSummary
 *   2  key findings             keyFindings
 *   3  definitions              definitions
 *   4  data or evidence         data
 *   5  methodology              methodology
 *   6  sample and date range    sample
 *   7  assumptions              assumptions
 *   8  limitations              limitations
 *   9  sources                  sources
 *   10 author                   byline.author
 *   11 published date           byline.published
 *   12 updated date             byline.updated
 *   13 data-through date        byline.dataThrough
 *   14 corrections link         corrections
 *   15 related solution         relatedSolution
 * Removing any one of them makes the page unpublishable under the site's own
 * contract. Add to the list, never subtract from it.
 *
 * NAVIGATION. content/pages/12-research.md line 88 gates primary navigation on
 * three category foundation pages. This asset is one of the two that meet that
 * count, and moving the gate is a separate decision rather than a side effect of
 * publishing. src/config/navigation.ts is not touched.
 */

export const meta = {
  title: 'If a Competitor Appears in an AI Answer, Will It Appear Again? | Hendricks',
  description:
    'A research experiment. The same 17 questions, three AI systems, two runs seven hours apart. Whether an engine cited anyone matched on 51 of 51 cells. Which sources it cited had a mean overlap of 0.68.',
} as const

export const hero = {
  eyebrow: 'Research Experiment',
  title:
    'Two Runs, Seven Hours Apart, Agreed on Whether Each Answer Cited Anyone. They Disagreed on Which Sources.',
  lead: [
    'On 2026-08-19 Hendricks sent the same 17 buyer questions to Google AI Overviews, ChatGPT, and Perplexity twice, roughly seven hours apart, and changed nothing in between. Both runs are archived and immutable. The comparison covers 51 cells.',
    'Whether a cell carried a citation at all was identical in both runs, on all 51. Which sources those citations named was not. Across the 20 cells that carried citations in either run, the mean overlap of the cited domain sets was 0.68, and only 2 of the 20 returned an identical set.',
  ],
  primaryCta: {
    label: 'See how Hendricks produces a number',
    href: routes.methodology.path,
    analytics: { location: 'ast_hero' },
  } satisfies Cta,
} as const

/**
 * The results gate, in visible copy. CONTENT_VERIFICATION.md holds `showResults`
 * at false until two verified case studies exist, or one verified case study
 * plus one clearly labeled research experiment. This block renders immediately
 * under the hero and above the direct answer, and it may not be moved below the
 * fold, shortened into a footnote, or replaced with a badge.
 */
export const experimentLabel = {
  label: 'Research experiment',
  title: 'This is a research experiment, not a case study.',
  body: [
    'There is no client here, no intervention, and no control. Hendricks ran one fixed question set against three AI systems twice on the same day and changed nothing between the runs. The only variable that moved is elapsed time, and a design with one uncontrolled variable cannot attribute anything it finds to a cause.',
    'It is published under the standard Hendricks applies to client work. The question set, the instrument, the denominators, the failed cells, the two run ids, the archived files every figure is read from, and the two places where a figure rests on one or two cells are all on the page.',
  ],
} as const

/**
 * Element 1, first half. One self-contained passage that survives being lifted
 * out of the page, because being lifted is what this page is for. Both halves of
 * the finding and both run ids are inside it, in that order. See decisions 1 and
 * 3 in the header comment.
 */
export const directAnswer = {
  term: 'The finding',
  answer:
    'Hendricks ran the same 17 buyer questions across Google AI Overviews, ChatGPT, and Perplexity twice on 2026-08-19, roughly seven hours apart, with nothing changed in between. Whether an engine cited any source at all was perfectly stable: 51 of 51 cells matched between the two runs on that state, and none flipped in either direction. Which sources an engine cited was not stable. Across the 20 cells that carried citations in either run, the mean overlap of the cited domain sets was 0.68, only 2 of those 20 returned an identical set of domains, and no cell returned a completely different one. The two runs are archived as 2026-08-19-110930 and 2026-08-19-181155, and every figure on this page is read from those two files.',
} as const

/** Element 1, second half. States the finding, then what it means and what it does not. */
export const executiveSummary = {
  eyebrow: 'Executive Summary',
  title: 'What one observation of an AI answer is worth',
  body: [
    'A buyer who screenshots an AI answer and finds a competitor inside it wants to know what that screenshot is worth. This pair of runs answers the narrow version of that question. Hendricks sent 17 buyer questions to Google AI Overviews, ChatGPT, and Perplexity, then sent the same 17 again roughly seven hours later, changed nothing in between, and compared 51 cells. The two runs are archived as 2026-08-19-110930 and 2026-08-19-181155.',
    'One half of the answer held completely. Whether a cell carried a citation at all matched on 51 of 51. Nothing flipped from citing to not citing, and nothing flipped the other way. On this evidence, one observation of whether an answer carries sources is a reading a second observation reproduces.',
    'The other half did not hold. Across the 20 cells that carried citations in either run, the mean overlap of the cited domain sets was 0.68. Two of those 20 returned an identical set. None returned a completely different one, and the smallest overlap observed was above zero. A citation set on a given question is therefore neither fixed nor arbitrary: it keeps most of its members across seven hours and replaces the rest.',
    'The practical consequence is narrower than the convenient one. It is not that AI answers are chaotic. It is that the two readings have different reliability, and the reading that moved is the one a competitor appears in. A competitor seen once may or may not be there on the next run, and a brand absent once is not established as absent. Neither statement can be made stronger from two runs, and the asymmetry between the two readings is the whole finding.',
  ],
} as const

/** Element 2. Ordered by what a reader needs first, which is the half that held. */
export const keyFindings = {
  eyebrow: 'Key Findings',
  title: 'Five findings from one run pair',
  items: [
    {
      number: '01',
      name: 'Whether an engine cited anyone at all did not move.',
      description:
        'Across all 51 comparable cells, the two runs agreed on whether the cell carried a citation. Zero cells flipped from citing to not citing, and zero flipped the other way. This is the stable half of the result and it is stated before the unstable half deliberately, because a reader who has run the same question twice and seen the same shape has already observed it. On this evidence, one observation of whether an answer carries sources at all is reproduced by a second observation taken the same day.',
    },
    {
      number: '02',
      name: 'Which sources an engine cited moved on almost every cell that had sources.',
      description:
        'Twenty cells carried citations in one run or the other. Across those 20, the mean overlap of the cited domain sets was 0.68. Two of the 20 returned an identical set of domains. No cell returned a completely different set, and the minimum overlap observed was above zero. The citation set on a given question is neither fixed nor arbitrary. It holds a majority of its members across seven hours and replaces the rest.',
    },
    {
      number: '03',
      name: 'The two halves carry different practical weight, and the weaker one is the one buyers look at.',
      description:
        'A single observation reliably reports whether an answer cites sources at all, on this evidence. It does not reliably report the source list. A competitor seen in one screenshot may or may not be in the next run, and a brand absent from one screenshot is not established as absent. Two runs cannot make either statement stronger than that, and neither statement needs to be stronger: the gap between a reading that reproduced exactly and a reading that averaged 0.68 overlap is the finding.',
    },
    {
      number: '04',
      name: 'The per-engine figures split three ways, and two of them rest on a handful of cells.',
      description:
        'On the cells that carried citations, Perplexity was compared on 17 cells, returned 1 identical set, and had a mean overlap of 0.72. ChatGPT was compared on 2 cells, returned no identical set, and its two overlap values average 0.22. Google AI Overviews was compared on 1 cell, which returned an identical set, an overlap of 1.00. The ChatGPT and Google AI Overviews figures rest on 2 cells and 1 cell. A mean of two numbers is not a rate, a single cell is not a mean, and neither is published here as one.',
    },
    {
      number: '05',
      name: 'Nothing here explains why any source moved.',
      description:
        'The design varies elapsed time and nothing else, so it cannot attribute the change in any citation set to a cause. Nobody outside the platforms can observe why a source was chosen or dropped. These two runs record that the sets differed between two readings taken hours apart, on one question set, on one date. They record nothing about the mechanism, and this page offers none.',
    },
  ],
} as const

/**
 * Element 3. docs/12 §6 forbids publishing a metric without a definition, and
 * every number on this page rests on the distinction between the two things
 * being compared. Collapsing them into one stability score is the failure these
 * definitions exist to prevent.
 */
export const definitions = {
  eyebrow: 'Definitions',
  title: 'The eleven terms every number here depends on',
  lead: 'Read these before the tables. Two different comparisons run through this page, one coarse and one fine, and the whole result is that they behaved differently. A single stability score would flatten them into one number that describes neither.',
  items: [
    {
      name: 'Engine',
      definition:
        'One AI answer system a run sends questions to. Three are covered here: Google AI Overviews, ChatGPT, and Perplexity. The scope statement under Limitations records what that set does and does not include.',
    },
    {
      name: 'Query set',
      definition:
        'The fixed list of buyer questions a run sends to every engine. Both runs on this page used the same 17 questions, in the same order, with nothing edited between them. A pair of runs on two different question sets measures the questions and cannot measure stability.',
    },
    {
      name: 'Cell',
      definition:
        'One question sent to one engine in one run. Seventeen questions across three engines produce 51 cells.',
    },
    {
      name: 'Measured cell',
      definition:
        'A cell where the engine returned an answer the probe could read. Run A measured 47 of its 51 cells. Run B measured 49.',
    },
    {
      name: 'Errored cell',
      definition:
        'A cell where the probe got no readable answer back. An errored cell is a broken instrument rather than a finding of absence. Run A errored on 4 cells, all of them Google AI Overviews. Run B errored on 2.',
    },
    {
      name: 'Comparable cell',
      definition:
        'A cell present in both runs, matched on the same question and the same engine. All 51 cells are comparable here, because both runs sent the same set to the same three engines.',
    },
    {
      name: 'Citation state',
      definition:
        'Whether a cell carried at least one citation. It takes two values, cited at least one source or cited none. This is the coarser of the two comparisons on this page and it is the one that held.',
    },
    {
      name: 'Cited domain set',
      definition:
        'The set of distinct hosts a cell cited in one run. Comparing the set from run A against the set from run B, for the same cell, is the finer of the two comparisons and it is the one that moved.',
    },
    {
      name: 'Set overlap',
      definition:
        'The size of the intersection of two cited domain sets divided by the size of their union, which is the Jaccard index. It reads 1.00 when the two runs cited exactly the same domains and 0 when they shared none. Every overlap figure on this page is that measure, reported as the comparison produced it.',
    },
    {
      name: 'Identical set',
      definition:
        'A cell whose cited domain set was exactly the same in both runs, an overlap of 1.00. Two of the 20 compared cells were identical.',
    },
    {
      name: 'Run of record',
      definition:
        'The archived result file a published figure is read from, named by a run id. Both runs here are archived and immutable: run A is 2026-08-19-110930 at history/runs/hendricks-2026-08-19-110930.json, and run B is 2026-08-19-181155 at history/runs/hendricks-2026-08-19-181155.json, each with a manifest beside it named for the same run id. A figure whose record cannot be produced on request is not a published measurement.',
    },
  ] satisfies readonly MetricDefinition[],
} as const

const runHealthColumns = [
  { key: 'measure', header: 'Measure', rowHeader: true },
  { key: 'runA', header: 'Run A, 2026-08-19-110930' },
  { key: 'runB', header: 'Run B, 2026-08-19-181155' },
] as const satisfies readonly DataTableColumn[]

const runHealthRows = [
  { measure: 'Questions in the set', runA: '17', runB: '17' },
  { measure: 'Engines queried', runA: '3', runB: '3' },
  { measure: 'Cells run', runA: '51', runB: '51' },
  { measure: 'Cells measured', runA: '47', runB: '49' },
  { measure: 'Cells that errored', runA: '4, all Google AI Overviews', runB: '2' },
  { measure: 'Comparable cells', runA: '51', runB: '51' },
  {
    measure: 'Archive file',
    runA: 'hendricks-2026-08-19-110930.json',
    runB: 'hendricks-2026-08-19-181155.json',
  },
] as const satisfies readonly DataTableRow[]

const comparisonColumns = [
  { key: 'comparison', header: 'Comparison', rowHeader: true },
  { key: 'cells', header: 'Cells compared' },
  { key: 'result', header: 'Result' },
] as const satisfies readonly DataTableColumn[]

const comparisonRows = [
  {
    comparison: 'Whether the cell cited any source',
    cells: '51',
    result: '51 matched, 0 flipped in either direction',
  },
  { comparison: 'Which domains the cell cited', cells: '20', result: 'Mean overlap 0.68' },
  { comparison: 'Cells returning an identical domain set', cells: '20', result: '2' },
  { comparison: 'Cells returning no shared domain at all', cells: '20', result: '0' },
] as const satisfies readonly DataTableRow[]

const perEngineColumns = [
  { key: 'engine', header: 'Engine', rowHeader: true },
  { key: 'cells', header: 'Cells compared' },
  { key: 'identical', header: 'Identical sets' },
  { key: 'overlap', header: 'Mean overlap' },
] as const satisfies readonly DataTableColumn[]

const perEngineRows = [
  { engine: 'Perplexity', cells: '17', identical: '1', overlap: '0.72' },
  { engine: 'ChatGPT', cells: '2', identical: '0', overlap: '0.22' },
  { engine: 'Google AI Overviews', cells: '1', identical: '1', overlap: '1.00' },
] as const satisfies readonly DataTableRow[]

/**
 * Element 4. Every figure in these three tables is read from one of the two
 * archived runs named in the column headers. Nothing is derived across them
 * beyond the two comparisons the definitions state, and no figure here is
 * recomputed into a rate.
 *
 * The per-engine table carries a `summary` rather than leaving the cell counts
 * to the reader, because 0.22 and 1.00 are the two most quotable numbers on the
 * page and they are the two weakest. See decision 2 in the header comment.
 */
export const data = {
  eyebrow: 'The Data',
  title: 'Both runs, and both comparisons',
  lead: 'Two runs of the same 17 questions on the same three engines, roughly seven hours apart on 2026-08-19, with nothing changed in between. The first table is run health. The second and third are the comparison.',
  tables: [
    {
      id: 'run-health',
      caption: 'Run health for the two 2026-08-19 runs, by measure.',
      columns: runHealthColumns,
      rows: runHealthRows,
    },
    {
      id: 'comparison',
      caption: 'What matched between the two runs, and what did not.',
      columns: comparisonColumns,
      rows: comparisonRows,
      summary:
        'The first row is the coarse comparison and it is a complete match. The remaining rows are the fine comparison, taken across the 20 cells that carried citations in either run.',
    },
    {
      id: 'per-engine',
      caption: 'Cited domain set overlap between the two runs, by engine.',
      columns: perEngineColumns,
      rows: perEngineRows,
      summary:
        'The ChatGPT and Google AI Overviews rows rest on 2 cells and 1 cell. A mean of two numbers is not a rate, and one cell is a single observation rather than an average of anything. The Perplexity row is the only one with enough cells behind it to carry much weight, and it is 17 cells on one date.',
    },
  ],
  note: [
    'Both runs used the same 17 questions and the same three engines, with nothing changed between them. That is what makes the pair comparable, and it is also the whole of the design. Elapsed time is the only variable that moved.',
    'Run A errored on 4 of its 51 cells, all of them Google AI Overviews. Run B errored on 2. An errored cell returns no answer and therefore no citations, so on the citation-state comparison it registers as a cell that cited nothing. None of the errored cells in either run is a cell where the other run found a citation, so no match among the 51 rests on an error standing in for an answer. What no figure here can say is what those cells would have returned.',
    'Every figure above is read from one of two archived files: run A at history/runs/hendricks-2026-08-19-110930.json and run B at history/runs/hendricks-2026-08-19-181155.json, each with a manifest beside it named for the same run id. Both files are immutable. A reader checking a figure on this page can name the run id and ask for the file it came from.',
  ],
} as const

/** Element 5. */
export const methodology = {
  eyebrow: 'Methodology',
  title: 'How this comparison was produced',
  lead: 'The instrument is a first-party probe that calls the DataForSEO AI Optimization API, one question at a time, per engine, recording the URLs each engine cited. It is the same instrument Hendricks points at a client engagement. Nothing about either run was built for this page.',
  items: [
    {
      number: '01',
      name: 'Hold the query set fixed across both runs.',
      description:
        'Both runs sent the same 17 buyer questions to the same three engines. Nothing in the set was edited, added, or dropped between them. A pair of runs on two different question sets measures the questions rather than the stability, which is the failure this step exists to prevent, and it is the reason the two runs on the earlier Hendricks self-baseline study cannot be compared to each other at all.',
    },
    {
      number: '02',
      name: 'Change nothing else between the runs.',
      description:
        'No page was published, no copy was edited, and no setting on the instrument was changed between the two runs. Elapsed time is the only variable that moved. That is what makes this a stability observation, and it is also why the observation can attribute nothing to a cause.',
    },
    {
      number: '03',
      name: 'Run the pair on one date, hours apart.',
      description:
        'Both runs happened on 2026-08-19, roughly seven hours apart. A pair separated by days would confound elapsed time with everything else that changed in the world in between. A pair separated by hours narrows that window. It does not close it.',
    },
    {
      number: '04',
      name: 'Compare two things separately, and keep them separate.',
      description:
        'Whether a cell carried any citation is one comparison. Which domains it cited is another. Folding them into a single stability score would report this pair as broadly stable and would hide the result, which is that the first comparison matched on 51 of 51 cells while the second returned an identical set on only 2 of the 20 cells that carried citations.',
    },
    {
      number: '05',
      name: 'Compare the domain sets with one named measure.',
      description:
        'Overlap is the size of the intersection of two cited domain sets divided by the size of their union, the Jaccard index. The measure is named on the page rather than described as a similarity score, because a similarity score with no formula behind it cannot be checked and cannot be reproduced.',
    },
    {
      number: '06',
      name: 'Report the run health next to the number.',
      description:
        'Run A errored on 4 of its 51 cells, all of them Google AI Overviews. Run B errored on 2. A run that fails and a run that finds nothing produce similar-looking output files and mean opposite things, so the error count travels with every figure taken from either run.',
    },
    {
      number: '07',
      name: 'Report the cell count behind every per-engine figure.',
      description:
        'Two of the three per-engine figures rest on 2 cells and 1 cell. Both are published with their cell count attached in the table, in the findings, in the sample, and in the limitations, rather than deferred to one disclosure a reader may not reach. A mean of two numbers presented without its denominator reads as a rate, and it is not one.',
    },
    {
      number: '08',
      name: 'Archive both runs under their ids before publishing anything from them.',
      description:
        'Each run writes an immutable archive keyed to a run id, with a manifest beside it recording which engines were queried, which were carried forward from an earlier run, and which were not run at all. Those are three different states and a bare result file cannot tell them apart after the fact. Run A is 2026-08-19-110930 and run B is 2026-08-19-181155. This step exists because the first Hendricks study published under this format shipped figures from a run whose result file a scheduled job had already overwritten in place, and the correction is published on that study.',
    },
  ],
  closing: [
    'Naming the instrument is disclosure, not endorsement. Naming both runs is what lets a reader ask for the exact files these figures came from, which is the difference between a measurement and an assertion.',
    'Anyone with an API key and a list of questions can run this design twice against their own brand and does not have to take this page’s word for anything. That is the strongest evidence available that the design is reproducible, and it is a better argument than any adjective this page could use about itself.',
  ],
  cta: {
    label: 'Read the full Hendricks methodology',
    href: routes.methodology.path,
    analytics: { location: 'ast_methodology' },
  } satisfies Cta,
} as const

/** Element 6. */
export const sample = {
  eyebrow: 'Sample and Date Range',
  title: 'What was sampled, and when',
  items: [
    'Subject: the runs were pointed at hendricks.ai, the firm publishing this page. No client brand and no client data appears in either run, and the comparison here is about the answers rather than about any brand inside them.',
    'Dates: both runs on 2026-08-19, roughly seven hours apart, with nothing changed in between.',
    'Engines: Google AI Overviews, ChatGPT, and Perplexity.',
    'Questions: the same 17 in both runs.',
    'Cells: 51 per run. Run A measured 47 and errored on 4. Run B measured 49 and errored on 2.',
    'Comparable cells: 51.',
    'Cells carrying citations in either run: 20. Of those, 17 are Perplexity cells, 2 are ChatGPT cells, and 1 is a Google AI Overviews cell.',
    'Geography and language: one setting, held constant across both runs.',
    'Instrument: a first-party probe calling the DataForSEO AI Optimization API.',
    'Runs of record: run A is 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json. Run B is 2026-08-19-181155, archived at history/runs/hendricks-2026-08-19-181155.json. Both are immutable and each carries a manifest beside it named for the same run id.',
  ],
  note: [
    'Two runs on one date is the whole sample. It is enough to observe that one reading reproduced and another did not. It is not enough to state how often either happens, and no figure on this page is presented as a rate.',
    'The per-engine comparison covers 17 cells for Perplexity, 2 for ChatGPT, and 1 for Google AI Overviews. Those denominators are stated everywhere the per-engine figures appear.',
  ],
} as const

/** Element 7. Assumptions the design makes, stated as assumptions and not as facts. */
export const assumptions = {
  eyebrow: 'Assumptions',
  title: 'Four things this comparison assumes',
  items: [
    {
      number: '01',
      name: 'That the query set represents what a buyer actually types.',
      description:
        'Both runs used the same 17 questions, structured by buyer stage from market knowledge rather than from a keyword tool. That is the strongest basis available here and it is still a judgment. If the set is wrong, the pair measures the stability of the wrong questions accurately, and every figure on this page inherits that.',
    },
    {
      number: '02',
      name: 'That an API response resembles what a person sees.',
      description:
        'These answers were retrieved through an API, not by a person in a browser with an account, a location, and a history. Hendricks assumes the API surface is close enough to be informative. A person refreshing the same question twice in a browser is not the thing that was measured, and no figure here should be read as what a specific buyer saw.',
    },
    {
      number: '03',
      name: 'That the cited domain set is the right unit to compare.',
      description:
        'The comparison is over distinct hosts, so a run that cited three pages on one host and a run that cited one page on that same host count as agreeing. That choice makes the overlap figure larger and more forgiving than a comparison at the URL level would be. It is stated here rather than left in a method note, because it moves the headline number in the flattering direction.',
    },
    {
      number: '04',
      name: 'That seven hours is an interesting interval.',
      description:
        'The pair was separated by hours rather than by minutes or by days. Nothing here establishes that seven hours is where a citation set begins to move, and a pair taken ten minutes apart or ten days apart could return a different overlap. The interval is a design choice, not a finding.',
    },
  ],
} as const

/**
 * Element 8, and the section that decides whether the rest of the page is
 * trustworthy. See decisions 4 and 5 in the header comment. Item 09 renders the
 * shared observed-systems constants rather than a fresh wording of the A1
 * boundary (docs/17 §3.5).
 */
export const limitations = {
  eyebrow: 'Limitations',
  title: 'What this run pair does not show',
  lead: 'This is an observation of two archived runs. It is not an experiment. There is no intervention, no control, and no holdout, so nothing here attributes any change to any cause. The design varies elapsed time and nothing else.',
  items: [
    {
      number: '01',
      name: 'There is no intervention and no control.',
      description:
        'Nothing was changed between the two runs and nothing was held back for comparison. The pair cannot show that any tactic produces a citation, removes one, or holds one in place. No later result may be attributed backwards to this pair either.',
    },
    {
      number: '02',
      name: 'Two runs cannot establish a rate.',
      description:
        'A mean overlap of 0.68 across 20 cells on one date describes those 20 cells on that date. It is not a churn rate, it does not predict the next run, and it does not describe a different question set. Nothing on this page should be read as how often an AI answer changes its sources.',
    },
    {
      number: '03',
      name: 'The ChatGPT and Google AI Overviews figures rest on 2 cells and 1 cell.',
      description:
        'ChatGPT carried citations on 2 of the compared cells and Google AI Overviews on 1. The figures reported for them are observations of that handful of cells and nothing more. A mean of two numbers is not a rate, a single cell is not a mean, and the fact that the one Google AI Overviews cell returned an identical set says nothing about how that engine behaves generally.',
    },
    {
      number: '04',
      name: 'Nobody outside the platforms can observe why a source was chosen.',
      description:
        'This page reports which cited domain sets differed between two readings. It offers no account of why any source appeared or disappeared, because no such account is available to anyone outside the companies operating these systems. A firm that offers one is guessing, and this page will not.',
    },
    {
      number: '05',
      name: 'The result does not generalise past these conditions.',
      description:
        'These 17 questions, these three engines, this one date, one geography, one language setting, and one interval between the runs. A different question set on the same day could return a different overlap, and this pair tests none of that.',
    },
    {
      number: '06',
      name: 'Errored cells were compared as cells that cited nothing.',
      description:
        'Run A errored on 4 cells and run B on 2, all of them Google AI Overviews. An errored cell returns no answer and therefore no citations, so on the citation-state comparison it registers as a cell that cited nothing. None of the errored cells in either run is a cell where the other run found a citation, so no match among the 51 rests on an error standing in for an answer. What no figure here can say is what those cells would have returned.',
    },
    {
      number: '07',
      name: 'The stable half is stable on this evidence and on nothing else.',
      description:
        'Fifty-one of 51 cells matching on whether they cited anyone is a complete match on the sample taken. It is not a law, it is not a guarantee, and a third run could break it. The claim here is that one observation of that state reproduced across roughly seven hours on this question set, not that it always will.',
    },
    {
      number: '08',
      name: 'This is not a Selection Stability measurement.',
      description:
        'Selection Stability is a Selection Intelligence measure across repeated runs of an unchanged set, and it reports whether a brand stays in consideration rather than whether an answer keeps its sources. This page compares cited domain sets and reports none of the four Selection Intelligence measures.',
    },
    {
      number: '09',
      name: 'The measurement covers one slice of AI-mediated search.',
      description: `${observedSystemsSentence} ${observedSystemsExclusion} A stability observation on the observed set says nothing about the surfaces outside it, and nothing on this page should be read as a statement about them.`,
    },
  ],
} as const

/** Elements 10 to 13. */
export const byline = {
  author: 'Brandon Lincoln Hendricks',
  authorRole: 'Search Intelligence Engineer, Hendricks',
  authorHref: routes.about.path,
  published: '2026-08-19',
  updated: '2026-08-19',
  dataThrough: '2026-08-19',
  note: 'The updated date on this page moves when a figure, a method, or a limitation changes. It is not refreshed to signal activity. The data-through date is the later of the two runs this page reports, run 2026-08-19-181155, and will not advance until a further run pair is published here.',
} as const

/**
 * Element 14. `/corrections` is the canonical destination and is built, so
 * `ctaHref(corrections.href, corrections.fallbackHref)` resolves to it. The
 * fallback stays in place because the pair is what the template renders through.
 *
 * The section says there is nothing to correct yet and then says why that is not
 * a claim to virtue. A corrections block that reads as a clean record on
 * publication day is the least informative version of this element, so it names
 * the failure the archiving step was built to prevent instead.
 */
export const corrections = {
  eyebrow: 'Corrections',
  title: 'Nothing corrected yet, and how the first one gets made',
  body: [
    'Nothing on this page has been corrected. That is a statement about its age rather than about its quality. It was published on the date of the two runs it reports.',
    'If a figure here is wrong, or a third party runs this design and gets a materially different result, the correction is published with its date, the original figure, the contradicting result, and what changed. Nothing on this page is quietly edited.',
    'The first Hendricks study published under this format needed two corrections on its first day. One of them was necessary because the result file behind a published figure had been overwritten in place by a scheduled job before anyone tried to reproduce it. Both runs on this page were archived under their own run ids, with a manifest beside each, before a word of this page was written. That is the fix for the failure rather than a promise about it.',
    'A firm selling measurement discipline has to be correctable in public, and the record of the correction is the part that makes the discipline checkable.',
  ],
  href: routes.corrections.path,
  fallbackHref: routes.contact.path,
  label: 'Read the corrections policy',
} as const

/** Element 15. The connection is made by linking, not by selling. See decision 6. */
export const relatedSolution = {
  eyebrow: 'Related Solution',
  title: 'Why this argues for repeated observation',
  body: [
    'One observation reports whether an answer cites sources at all, and on this evidence a second observation reproduces that reading exactly. One observation does not report which sources the answer named with the same reliability, and the source list is the part a competitor appears in. A reading taken once is therefore a partial reading of the thing buyers screenshot.',
    'Repeated observation of a fixed question set under stated conditions is what Selection Intelligence is. The solution page states what a baseline covers, what it produces, and what it reports. The Methodology page states the run design, the context panels, the classification rule, and the evidence grade every conclusion carries.',
  ],
  ctas: [
    {
      label: 'See what a Selection Intelligence baseline covers',
      href: routes.selectionIntelligence.path,
      analytics: { location: 'ast_related_solution', solutionName: 'Selection Intelligence' },
    },
    {
      label: 'Read the Methodology',
      href: routes.methodology.path,
      analytics: { location: 'ast_related_methodology' },
    },
  ] satisfies readonly Cta[],
} as const

/**
 * Element 9. No `citations` array. This page reports first-party measurement and
 * cites no third-party research, so a reference list would be furniture.
 */
export const sources = {
  reviewed: '2026-08-19',
  basis:
    'This page reports first-party measurement produced by Hendricks. Every figure on it comes from one of two probe runs on 2026-08-19, archived as run 2026-08-19-110930 at history/runs/hendricks-2026-08-19-110930.json and run 2026-08-19-181155 at history/runs/hendricks-2026-08-19-181155.json, each with a manifest beside it named for the same run id. Both files are immutable, both runs sent the same 17 questions to the same three engines, and no figure here is derived from any other run. The page reports no third-party research, no vendor study, and no statistic from anyone else, and therefore cites none. Naming the DataForSEO AI Optimization API is instrument disclosure rather than a citation or an endorsement.',
  appliedIn: [
    { label: 'the Selection Intelligence solution', href: routes.selectionIntelligence.path },
    { label: 'the Methodology', href: routes.methodology.path },
    { label: 'the Search Intelligence Diagnostic', href: routes.diagnostic.path },
  ],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.researchHendricksSelectionBaseline.path,
    label: 'Two Runs in AI Answers: a Citation to a Deleted Page, Then Zero',
    description: 'The self-baseline study these two runs were taken alongside, with its own limits.',
  },
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
    description: 'The surfaces these runs sampled, and which of them Hendricks observes.',
  },
]

export const closing = {
  title:
    'The stable reading is whether the answer cited anyone. The unstable reading is who. Ask which of the two any AI visibility number you are shown is reporting, and how many observations sit behind it.',
  primaryCta: {
    label: 'Establish a baseline through the Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'ast_closing' },
  } satisfies Cta,
} as const
