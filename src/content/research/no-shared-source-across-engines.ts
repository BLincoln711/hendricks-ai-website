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
 * The cross-engine agreement study. Mirrored in
 * content/pages/29-no-shared-source-across-engines.md.
 *
 * The third study to read a citation set, and the first to make the engines
 * themselves the subject. The self-baseline study asked whether one brand
 * appeared. The citation-set study asked what the set looked like. This one asks
 * whether the three observed systems are answering the same question with the
 * same sources, and the measured answer is that they are not, to a degree the
 * category's blended scores cannot survive.
 *
 * Seven decisions are recorded before anyone edits a string.
 *
 * 1. EVERY FIGURE COMES FROM ONE RUN AND THE RUN IS NAMED. Run
 *    2026-08-20-110653, archived at
 *    `history/runs/hendricks-2026-08-20-110653.json` with its manifest at
 *    `history/runs/manifest-2026-08-20-110653.json`, both under
 *    `~/claudecode/total-search-dashboard/checker/` on the M3 Ultra. The one
 *    exception is the six-run ChatGPT stability count in key finding 02, which
 *    names all six run ids in the sample section rather than resting on this one.
 *    Do not remove a run id from a sentence to make the sentence read better.
 *
 * 2. THIS RUN MEASURED EVERY CELL IT SENT. Fifty-one cells sent, 51 measured,
 *    none errored. The two prior studies both carried an errored-cell caveat and
 *    this one does not, which is the only reason a clean run is worth saying out
 *    loud. State it once in the sample and once in the data note. It is not a
 *    finding and must not be dressed as one.
 *
 * 3. THE CHATGPT FINDING IS ABOUT RETRIEVAL, NOT ABOUT FAILURE. ChatGPT answered
 *    all 17 questions. It cited a source on 2 of them. The 15 uncited answers ran
 *    2,136 to 3,361 characters, so the engine was not silent and was not broken;
 *    it answered from the model instead of from the web. Every sentence that
 *    reports the 2 of 17 must also report that the other 15 were answered at
 *    length, because a reader who thinks ChatGPT failed will draw the opposite
 *    conclusion from the correct one.
 *
 * 4. THE SAME TWO QUESTIONS, IN ALL SIX RUNS. The two cells ChatGPT cited on are
 *    the same two in every run from 2026-08-19-110930 through 2026-08-20-110653.
 *    That is what lifts the finding above single-run noise, and it is the one
 *    claim on this page that spans runs. It is stated with the number of runs
 *    attached wherever it appears.
 *
 * 5. NO OVERLAP FIGURE IS PUBLISHED WITHOUT THE SIZE OF THE SMALLER SET. ChatGPT
 *    contributed 9 citation slots. An engine that filled 9 slots had few chances
 *    to overlap with anything, and the prior study was corrected into this rule
 *    the hard way. The caveat travels inside the finding, in the data note, in
 *    the methodology, and in the limitations. Do not consolidate it.
 *
 * 6. THE PAIRWISE OVERLAPS ARE PUBLISHED AS SHARED-OVER-UNION, WITH BOTH COUNTS
 *    VISIBLE. A ratio a reader cannot rebuild from two published integers is an
 *    index, and this section does not publish indices. Every overlap row carries
 *    the shared count and the union count beside it.
 *
 * 7. DOMAINS ARE FACTS ABOUT THE ANSWERS, NEVER VERDICTS ABOUT FIRMS. Inherited
 *    from the citation-set study and restated because this page names domains
 *    again. The tables record what these answers cited. They rank no vendor and
 *    judge no company, and no page on this site will.
 *
 * WHAT THIS PAGE MAY NOT CLAIM. It is not an experiment. No intervention, no
 * control, no holdout. It describes one run of one query set on one date in one
 * geography and one language, plus one cross-run count that is explicitly scoped
 * to six runs inside a 26-hour window. It says nothing about whether a tactic
 * works. Nobody outside the platforms can observe why an engine retrieved or did
 * not retrieve, and this page offers no account of it.
 *
 * SCOPE. A fourth engine, Gemini, was probed in this run outside the
 * observed-systems boundary that applied on the run date, and nothing from it
 * is reported here. CONTENT_VERIFICATION A1 added Gemini to the observed set
 * on 2026-09-01, in A1 and in `src/content/shared/observed-systems.ts` first,
 * which is the order this comment always required. Limitation 09
 * renders the shared sentence as it stands today, and the dated update under
 * `corrections` records that the sentence moved and that no figure did. Every
 * figure on this page still counts the three engines the run compared and 51
 * cells. Nothing from Gemini is added retroactively.
 *
 * SOURCES. No external citation. docs/18-SOURCE-LEDGER.md approves external
 * sources per page and this page reports first-party measurement only, so
 * `sources` carries no `citations` array.
 *
 * THE FIFTEEN ELEMENTS. docs/06 §12 requires all of them. Their homes here, in
 * render order:
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
 *   12 updated date             byline.updated
 *   13 data-through date        byline.dataThrough
 *   14 corrections link         corrections
 *   15 related solution         relatedSolution
 * `errorsFound` is used on this page, unlike the two studies before it. Two
 * instrument defects were found and fixed while this run was being produced, and
 * both had already produced a wrong reading. A research page that hides the
 * defects its own instrument had is not reporting, it is marketing.
 *
 * NAVIGATION. content/pages/12-research.md line 88 gates primary navigation on
 * three category foundation pages. This is a research asset. It is linked
 * contextually and from the footer research column, and src/config/navigation.ts
 * is not touched.
 */

export const meta = {
  title: 'No Source Was Cited by All Three AI Engines | Hendricks',
  description:
    'A research experiment. In one archived run, 17 questions across three AI engines filled 449 citation slots with 319 distinct domains, no domain was cited by all three engines, and ChatGPT cited no source at all on 15 of the 17 questions it answered.',
} as const

export const hero = {
  eyebrow: 'Research Experiment',
  title:
    'Three Engines, 17 Questions, 449 Citations, and Not One Source Cited by All Three. ChatGPT Cited Nothing on 15 of 17.',
  lead: [
    'Hendricks sent the same 17 questions to Google AI Overviews, ChatGPT, and Perplexity in a single archived run, 2026-08-20-110653, and compared the source sets the three engines returned. Every cell was measured. The three engines filled 449 citation slots with 319 distinct domains, and the number of domains cited by all three was zero.',
    'The second reading is sharper than the first. ChatGPT answered all 17 questions, at 2,136 to 3,361 characters on the ones it did not cite, and produced a citation on only 2 of them. Those two are the same two questions in each of the last six runs.',
  ],
  primaryCta: {
    label: 'See how Hendricks produces a number',
    href: routes.methodology.path,
    analytics: { location: 'nss_hero' },
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
    'There is no client here, no intervention, and no control. Hendricks sent a fixed question set to three engines once, read the sources each returned, and compared the sets. Nothing was changed and nothing was held back for comparison, so no result on this page can be attributed to any action by anyone.',
    'It is published under the standard Hendricks applies to client work, including the part that is uncomfortable. The run id, the denominators, two instrument defects found and fixed during production, the limits, and the questions this design cannot answer are all on the page.',
  ],
} as const

/**
 * Element 1, first half. One self-contained passage that survives being lifted
 * out of the page, because being lifted is what this page is for.
 */
export const directAnswer = {
  term: 'The finding',
  answer:
    'In one archived run on 2026-08-20, Google AI Overviews, ChatGPT, and Perplexity were sent the same 17 questions. All 51 cells returned a measurement. The three engines filled 449 citation slots with 319 distinct domains, and no domain was cited by all three engines. Perplexity and Google AI Overviews shared 47 domains out of a combined 311. ChatGPT and Perplexity shared one, subscribepr.com, out of 256. ChatGPT and Google AI Overviews shared none out of 119. ChatGPT answered all 17 questions but cited a source on only 2, writing 2,136 to 3,361 characters on the 15 it did not cite, and those same 2 questions are the only ones it cited on in each of the last six runs. Every single-run figure here is read from run 2026-08-20-110653, archived at history/runs/hendricks-2026-08-20-110653.json. One run of one query set in one geography and one language shows what appeared. It shows nothing about why any engine retrieved or did not.',
} as const

/** Element 1, second half. */
export const executiveSummary = {
  eyebrow: 'Executive Summary',
  title: 'What one run of three engines found',
  body: [
    'A blended AI visibility score assumes the systems it averages are doing comparable things. Run 2026-08-20-110653 tested that assumption directly by sending one question set to three engines at one time and comparing the sources each returned. The three engines filled 449 citation slots with 319 distinct domains. The count of domains cited by all three was zero. Perplexity and Google AI Overviews had the most in common at 47 shared domains out of a combined 311. ChatGPT shared one domain with Perplexity out of 256, and none with Google AI Overviews out of 119.',
    'The caveat belongs in the same breath as that finding, because a reader who works it out unaided will discount everything else here. ChatGPT filled 9 citation slots in this run against 304 for Perplexity and 136 for Google AI Overviews, so it had few chances to overlap with anything. The direction still holds, and the reason it holds is the second finding rather than the first.',
    'ChatGPT filled 9 slots because it cited a source on 2 of the 17 questions. It answered the other 15. The uncited answers ran 2,136 to 3,361 characters, which is not an engine failing to respond, it is an engine responding from the model instead of from the web, with web search enabled. On this question set, the two questions that produced a citation were the same two in each of the last six runs: why is my brand not showing up in ChatGPT, and how much does GEO cost per month. That stability is what lifts the reading above one run of noise.',
    'The commercial consequence is direct and unflattering to the category. On 15 of these 17 buyer questions there was no citation to win inside ChatGPT, because no citation was issued. A blended score that averages ChatGPT presence across a question set of this shape is averaging mostly empty space, and a brand told to work on its ChatGPT citations for those questions is being sold work against a surface that did not exist at the moment it was measured.',
    'What this run does not show is most of what a buyer wants to know. It cannot say why any engine retrieved or did not. It cannot say the same holds for a different question set, and the ChatGPT reading is plainly sensitive to question type, since the two questions that did trigger retrieval both ask for a current external fact. It cannot say what a person in a browser with an account and a history would have seen. And it is not an experiment: nothing was changed, nothing was withheld, and no outcome here can be attributed to anything.',
  ],
} as const

/** Element 2. Ordered so the commercial conclusion arrives after its evidence. */
export const keyFindings = {
  eyebrow: 'Key Findings',
  title: 'Five findings from one archived run',
  lead: 'Every figure below is read from run 2026-08-20-110653, archived at history/runs/hendricks-2026-08-20-110653.json, except the six-run count in finding 02, which names its six runs in the sample section.',
  items: [
    {
      number: '01',
      name: 'No domain was cited by all three engines.',
      description:
        'The three engines filled 449 citation slots with 319 distinct domains in this run. The number of domains appearing in all three cited sets was zero. Perplexity and Google AI Overviews had the largest shared set at 47 domains out of a combined 311. ChatGPT and Perplexity shared one, subscribepr.com, out of a combined 256. ChatGPT and Google AI Overviews shared none out of a combined 119. The caveat is stated here rather than below: ChatGPT contributed 9 of the 449 slots, so its two overlap figures rest on a small set and are reported as observations on one run rather than as rates. The Perplexity and Google AI Overviews figure does not carry that limitation, and it is still 47 domains out of 311.',
    },
    {
      number: '02',
      name: 'ChatGPT cited a source on 2 of 17 questions, and the same 2 in each of six runs.',
      description:
        'ChatGPT returned a measured answer to all 17 questions and cited at least one source on 2 of them. Across the six runs from 2026-08-19-110930 to 2026-08-20-110653, the count was 2 of 17 every time, and it was the same two questions every time: why is my brand not showing up in ChatGPT, and how much does GEO cost per month. Perplexity cited on 17 of 17 in all six runs. A single run of this would be noise. Six consecutive runs returning the same two cells is a description of how this engine behaved on this question set inside that window.',
    },
    {
      number: '03',
      name: 'The 15 uncited answers were not empty. They were long.',
      description:
        'The questions ChatGPT cited nothing on returned answers of 2,136 to 3,361 characters. It answered how do I measure ROI of AI search visibility, how do I track AI referral traffic in GA4, and SEO vs AEO vs GEO which one do I actually need, at length, with web search enabled, citing nothing. This matters because the obvious misreading is that the engine failed. It did not fail. It answered from the model rather than from retrieved pages, and a brand cannot be cited in an answer that cites nobody.',
    },
    {
      number: '04',
      name: 'Every engine cited a nearly flat set, which reproduces the earlier finding on a new run.',
      description:
        'Across the three engines, 252 of the 319 distinct domains, 79 percent, filled exactly one citation slot, and the ten most-cited domains held 74 of the 449 slots between them, 16 percent. Within each engine the singleton share was 88 percent for Perplexity, 90 percent for Google AI Overviews, and 100 percent for ChatGPT on its 9 slots. The citation-set study reported 86 percent singletons on a different run, and this run reproduces the shape. Two readings on two dates is not a stable property, but it is more than one.',
    },
    {
      number: '05',
      name: 'A blended cross-engine visibility score cannot describe a system a buyer can act on.',
      description:
        'The four findings above are what make this a conclusion rather than an opinion. The three engines shared no common source, one of them issued citations on 2 of 17 questions while another issued them on 17 of 17, and their per-engine sets were 248, 110, and 9 distinct domains. A single number averaged across those three describes no surface that exists. This does not mean cross-engine measurement is worthless, and Hendricks measures all three. It means the per-engine figure, the populated-cell count behind it, and the question set it was taken on have to travel with any score claiming to summarise them. A score shown without those three things cannot be checked, and on this evidence it cannot be right either.',
    },
  ],
} as const

/**
 * Element 3. docs/12 §6 forbids publishing a metric without a definition. This
 * study turns on three distinctions the category routinely collapses: a measured
 * cell against a populated one, a citation slot against a distinct domain, and
 * an overlap against the size of the smaller set it was drawn from.
 */
export const definitions = {
  eyebrow: 'Definitions',
  title: 'The eight terms every number here depends on',
  lead: 'Read these before the tables. The difference between a cell that returned no answer, a cell that answered and cited nothing, and a cell that cited a source is the difference between three findings on this page, and the category collapses all three into "visibility".',
  items: [
    {
      name: 'Engine',
      definition:
        'One AI answer system a run sends questions to. Three are covered here: Google AI Overviews, ChatGPT, and Perplexity. The scope statement under Limitations records what that set does and does not include.',
    },
    {
      name: 'Cell',
      definition:
        'One question sent to one engine on one date. Seventeen questions across three engines produce 51 cells. All 51 returned a measurement in this run.',
    },
    {
      name: 'Measured cell',
      definition:
        'A cell where the engine returned a usable response. A measured cell that cites nothing and an errored cell look similar in a result file and mean opposite things, so they are counted separately everywhere on this page.',
    },
    {
      name: 'Populated cell',
      definition:
        'A measured cell in which the engine cited at least one source. Only populated cells contribute citation slots. The gap between measured and populated is the whole of finding 02: ChatGPT measured 17 and populated 2.',
    },
    {
      name: 'Citation slot',
      definition:
        'One distinct domain cited in one cell. A domain cited in six cells fills six slots. The slot count is the size of the citation set and is always at least the distinct-domain count.',
    },
    {
      name: 'Distinct domain',
      definition:
        'The number of different hosts appearing across all citation slots. Counting is done at the host level, so every page on one site collapses into one domain.',
    },
    {
      name: 'Cross-engine shared set',
      definition:
        'The number of domains appearing in the cited sets of two engines within the same run, published beside the combined distinct count of the two engines so a reader can rebuild the ratio. It is read against the size of the smaller set, because an engine that filled few slots had few chances to overlap.',
    },
    {
      name: 'Answer length',
      definition:
        'The character count of the answer text an engine returned for one cell, recorded whether or not the answer cited anything. It is the measure that separates an engine that did not respond from an engine that responded without sources.',
    },
  ] satisfies readonly MetricDefinition[],
} as const

const runColumns = [
  { key: 'measure', header: 'Measure', rowHeader: true },
  { key: 'value', header: 'Run 2026-08-20-110653' },
] as const satisfies readonly DataTableColumn[]

const runRows = [
  { measure: 'Questions', value: '17' },
  { measure: 'Engines', value: '3' },
  { measure: 'Cells sent', value: '51' },
  { measure: 'Cells measured', value: '51' },
  { measure: 'Cells that errored', value: '0' },
  { measure: 'Populated cells, carrying at least one source', value: '36' },
  { measure: 'Citation slots filled', value: '449' },
  { measure: 'Distinct domains cited', value: '319' },
  { measure: 'Domains filling exactly one slot', value: '252, or 79 percent' },
  { measure: 'Slots held by the ten most-cited domains', value: '74 of 449, or 16 percent' },
  { measure: 'Domains cited by all three engines', value: '0' },
] as const satisfies readonly DataTableRow[]

const engineColumns = [
  { key: 'engine', header: 'Engine', rowHeader: true },
  { key: 'measured', header: 'Cells measured' },
  { key: 'populated', header: 'Cells citing a source' },
  { key: 'slots', header: 'Citation slots' },
  { key: 'domains', header: 'Distinct domains' },
] as const satisfies readonly DataTableColumn[]

const engineRows = [
  { engine: 'Perplexity', measured: '17', populated: '17', slots: '304', domains: '248' },
  { engine: 'Google AI Overviews', measured: '17', populated: '17', slots: '136', domains: '110' },
  { engine: 'ChatGPT', measured: '17', populated: '2', slots: '9', domains: '9' },
] as const satisfies readonly DataTableRow[]

const overlapColumns = [
  { key: 'pair', header: 'Engine pair', rowHeader: true },
  { key: 'shared', header: 'Domains cited by both' },
  { key: 'combined', header: 'Distinct domains across the pair' },
] as const satisfies readonly DataTableColumn[]

const overlapRows = [
  { pair: 'Perplexity and Google AI Overviews', shared: '47', combined: '311' },
  { pair: 'ChatGPT and Perplexity', shared: '1, subscribepr.com', combined: '256' },
  { pair: 'ChatGPT and Google AI Overviews', shared: '0', combined: '119' },
  { pair: 'All three engines', shared: '0', combined: '319' },
] as const satisfies readonly DataTableRow[]

const chatgptColumns = [
  { key: 'run', header: 'Run id', rowHeader: true },
  { key: 'chatgpt', header: 'ChatGPT cells citing a source' },
  { key: 'perplexity', header: 'Perplexity cells citing a source' },
] as const satisfies readonly DataTableColumn[]

const chatgptRows = [
  { run: '2026-08-19-110930', chatgpt: '2 of 17', perplexity: '17 of 17' },
  { run: '2026-08-19-181155', chatgpt: '2 of 17', perplexity: '17 of 17' },
  { run: '2026-08-20-060002', chatgpt: '2 of 17', perplexity: '17 of 17' },
  { run: '2026-08-20-104059', chatgpt: '2 of 17', perplexity: '17 of 17' },
  { run: '2026-08-20-105338', chatgpt: '2 of 17', perplexity: '17 of 17' },
  { run: '2026-08-20-110653', chatgpt: '2 of 17', perplexity: '17 of 17' },
] as const satisfies readonly DataTableRow[]

const lengthColumns = [
  { key: 'measure', header: 'Measure', rowHeader: true },
  { key: 'value', header: 'ChatGPT, run 2026-08-20-110653' },
] as const satisfies readonly DataTableColumn[]

const lengthRows = [
  { measure: 'Questions answered', value: '17' },
  { measure: 'Answers citing at least one source', value: '2' },
  { measure: 'Answers citing nothing', value: '15' },
  { measure: 'Shortest uncited answer', value: '2,136 characters' },
  { measure: 'Longest uncited answer', value: '3,361 characters' },
  { measure: 'Longest answer in the run, which did cite', value: '5,047 characters' },
] as const satisfies readonly DataTableRow[]

/**
 * Element 4, the counted half. Five tables, every single-run figure read from run
 * 2026-08-20-110653. The six-run table is the one cross-run object on the page
 * and names every run it counts. Nothing is averaged across engines. See
 * decisions 5 and 6 in the header comment before editing a row.
 */
export const data = {
  eyebrow: 'The Data',
  title: 'Three engines, one question set, side by side',
  lead: 'One run, read five ways: the shape of the whole set, what each engine contributed, what each pair had in common, how ChatGPT behaved across six consecutive runs, and how long its uncited answers were.',
  tables: [
    {
      id: 'run-shape',
      caption: 'The shape of the citation set in run 2026-08-20-110653, three engines combined.',
      columns: runColumns,
      rows: runRows,
    },
    {
      id: 'by-engine',
      caption: 'What each engine contributed in run 2026-08-20-110653.',
      columns: engineColumns,
      rows: engineRows,
    },
    {
      id: 'pairwise-overlap',
      caption: 'Domains cited by both engines in each pair, run 2026-08-20-110653.',
      columns: overlapColumns,
      rows: overlapRows,
      summary:
        'The shared count and the combined distinct count are both published so the ratio can be rebuilt from the table rather than taken on trust.',
    },
    {
      id: 'chatgpt-six-runs',
      caption: 'Cells citing at least one source, ChatGPT against Perplexity, six consecutive runs.',
      columns: chatgptColumns,
      rows: chatgptRows,
      summary:
        'The two ChatGPT cells were the same two questions in all six runs: why is my brand not showing up in ChatGPT, and how much does GEO cost per month.',
    },
    {
      id: 'chatgpt-lengths',
      caption: 'ChatGPT answer lengths in run 2026-08-20-110653, cited and uncited.',
      columns: lengthColumns,
      rows: lengthRows,
    },
  ],
  note: [
    'These tables record which sources these answers cited. They are facts about the answers and nothing else. They are not a ranking of firms, they carry no judgment about any company behind a domain, and no page on this site publishes one.',
    'Every overlap figure involving ChatGPT rests on 9 citation slots. An engine that filled 9 slots had few chances to overlap with anything, so those two rows are observations on one run and not rates. The Perplexity and Google AI Overviews row rests on 304 and 136 slots and does not carry that limitation.',
    'All 51 cells in this run returned a measurement and none errored. The two studies published before this one both carried an errored-cell caveat, so the absence of one here is stated rather than assumed. It is a fact about this run and not an improvement being claimed.',
    'The six-run table is the only object on this page that spans runs. Its six run ids are named in the sample section. A parser change to how one engine’s citations are read landed inside that window and is described under Errors Found; it does not affect the populated-cell counts in that table, which depend only on whether any source was present.',
    'Every single-run figure on this page is read from run 2026-08-20-110653, archived at history/runs/hendricks-2026-08-20-110653.json with its manifest at history/runs/manifest-2026-08-20-110653.json. A reader checking a figure can name that run id and ask for the file it came from.',
  ],
} as const

/**
 * Element 4, the checked half, and the section this study exists to be honest in.
 * Two instrument defects were found while producing this run and both had already
 * produced a wrong reading that a person had written down as a finding. Every
 * entry states the verification method and the date.
 */
export const errorsFound = {
  eyebrow: 'Errors Found',
  title: 'Two instrument defects, both caught after they had produced a wrong reading',
  lead: 'Both were found on 2026-08-20 while producing the run this page reports, and both had already generated a plausible finding that a person had written down before the defect surfaced. They are published because a firm selling measurement discipline does not get to show only the runs that worked.',
  items: [
    {
      number: '01',
      name: 'A fourth engine failed every cell on an unsupported request field, and the failure looked like an answer.',
      description:
        'A probe of a fourth engine outside the observed set rejected all 17 cells with an invalid-field error on a request parameter the other two assistant engines accept. Verified on 2026-08-20 by sending the same prompt three ways against the live API and comparing status codes: the field returns an error, and the request without it returns a normal response. Because the run-health gate reports failed cells rather than silently dropping them, this surfaced as 23 failed cells rather than as a quiet zero. The parameter is now omitted for that engine, and a comment in the probe records why the three engine configurations are deliberately not symmetrical.',
    },
    {
      number: '02',
      name: 'One engine returned every citation behind a redirect, and the parser recorded the redirect as the source.',
      description:
        'The same fourth engine returns each citation as a grounding redirect on a single platform host, with the real source domain carried in a separate title field. The domain extractor read only the URL, so 17 questions collapsed to one distinct domain and the comparison showed that engine sharing no sources with any other. That reading was wrong, and it was wrong in the direction that would have made the most attractive finding. Verified on 2026-08-20 by dumping the raw annotation objects from a live response and reading both fields. The parser now resolves the redirect through the title field and returns nothing when it cannot, because counting an unresolvable redirect would credit the platform as the source of somebody else’s page.',
    },
    {
      number: '03',
      name: 'A finding drafted earlier the same day did not survive its own next run.',
      description:
        'On a smaller sample, ChatGPT had cited a particular high-volume community domain zero times across 34 citation slots while another engine cited it near 4 percent, which read as an engine-specific shift and was drafted as one. The next run gave ChatGPT more slots and produced a citation of that domain, at a rate above the comparison engine in the same run. The draft was discarded before publication. It is recorded here because the denominator that made it look real, 34 slots, is the same order as the 9 slots this page reports, and a reader is entitled to know the authors have already been wrong once this week in exactly that way.',
    },
  ],
  closing: [
    'None of the three changed a figure published on this page. The first two concern an engine whose results are not reported here at all, and the third was caught before publication. They are on the page because the alternative is a research section that only ever describes instruments that worked, which would tell a reader nothing about how carefully the working ones were checked.',
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
      name: 'Send one fixed question set to every engine in the same run, and name the run.',
      description:
        'The comparison only means something if the three engines received the same 17 questions inside the same run, so a difference between them cannot be a difference in timing or in wording. Every single-run figure comes from run 2026-08-20-110653, archived at history/runs/hendricks-2026-08-20-110653.json with its manifest at history/runs/manifest-2026-08-20-110653.json. The manifest records which engines were queried, which were carried forward from an earlier run, and which were not run at all, because those are three different states and a bare result file cannot tell them apart afterwards.',
    },
    {
      number: '02',
      name: 'Count measured cells and populated cells separately, and publish both.',
      description:
        'A cell that errored, a cell that answered and cited nothing, and a cell that cited a source are three different outcomes. Collapsing the second into the first turns an engine that chose not to retrieve into an engine that broke. Collapsing it into the third invents citations that were never issued. The central finding of this page lives entirely in the gap between 17 measured and 2 populated, so the two counts are published side by side in every table where either appears.',
    },
    {
      number: '03',
      name: 'Record answer length whether or not the answer cited anything.',
      description:
        'Without the character count there is no way to distinguish an engine that returned nothing from an engine that returned three thousand characters citing nobody. Those two look identical in a citation count and mean opposite things to a buyer. The uncited ChatGPT answers in this run ran 2,136 to 3,361 characters, and that range is what makes finding 03 a statement about retrieval rather than about failure.',
    },
    {
      number: '04',
      name: 'Count cited URLs at host level, not brand mentions.',
      description:
        'The counted field is the list of URLs an engine cited, matched on host. A brand named in answer text without a cited URL is a different and weaker signal, and counting it here would make every figure larger and easier to move. Host-level counting also means every page on one site collapses into one domain.',
    },
    {
      number: '05',
      name: 'Compare engines on raw domain sets, and publish the shared count with the combined count.',
      description:
        'Each pairwise figure is the count of domains appearing in both cited sets, published beside the combined distinct count for the pair. Publishing both integers lets a reader rebuild the ratio from the table. A single ratio would be an index, and an index cannot be checked against anything without the underlying data.',
    },
    {
      number: '06',
      name: 'Never publish an overlap without the size of the smaller set.',
      description:
        'ChatGPT filled 9 citation slots in this run. An engine that filled 9 slots had few chances to overlap with anything, so both ChatGPT overlap figures are reported as observations on one run rather than as rates, and the slot count appears wherever they do. The prior study in this section was written into this rule after publishing a cross-engine overlap that rested on 11 slots.',
    },
    {
      number: '07',
      name: 'Take the cross-run count from archived runs, never from a live re-query.',
      description:
        'The six-run ChatGPT count is read from six immutable run archives, each named on this page. Result files are written per run and never overwritten in place, which is what makes a cross-run count possible at all. That discipline exists because the first study in this section published figures whose result file a scheduled job had already overwritten, and had to correct them on its publication day.',
    },
    {
      number: '08',
      name: 'Report the run health next to the number.',
      description:
        'Run 2026-08-20-110653 sent 51 cells and measured 51, with none errored. A run that fails and a run that finds nothing produce similar-looking output files and mean opposite things, so the error count travels with every figure taken from a run, including when it is zero.',
    },
  ],
  closing: [
    'The design is deliberately cheap to repeat. A fixed question set, one pass per engine inside one run, cited URLs recorded at host level, answer lengths recorded alongside, and counts published against their denominators. Anyone with an API key and a list of questions can run it against their own category and does not have to take this page at its word.',
    'The instrument is named for the same reason, and so is every run. Naming the instrument is disclosure, not endorsement. Naming the run is what lets a reader ask for the exact file a figure came from, which is the difference between a measurement and an assertion.',
  ],
  cta: {
    label: 'Read the full Hendricks methodology',
    href: routes.methodology.path,
    analytics: { location: 'nss_methodology' },
  } satisfies Cta,
} as const

/** Element 6. */
export const sample = {
  eyebrow: 'Sample and Date Range',
  title: 'What was sampled, and when',
  items: [
    'Subject: three AI answer engines compared against each other. No brand is the subject of this study, and no client brand or client data appears in it.',
    'Date: one run, 2026-08-20. One pass per cell, one cell per question per engine.',
    'Run of record: 2026-08-20-110653, archived at history/runs/hendricks-2026-08-20-110653.json with its manifest at history/runs/manifest-2026-08-20-110653.json.',
    'Engines: Google AI Overviews, ChatGPT, and Perplexity.',
    'Questions: 17, fixed before the run.',
    'Cells: 51 sent, 51 measured, 0 errored.',
    'Populated cells: 36 of the 51. Only these contributed citation slots.',
    'Citation slots: 449. Distinct domains: 319.',
    'Cross-run count: six runs, 2026-08-19-110930, 2026-08-19-181155, 2026-08-20-060002, 2026-08-20-104059, 2026-08-20-105338, and 2026-08-20-110653, spanning roughly 26 hours.',
    'Geography and language: one setting, held constant across every run named here.',
    'Instrument: a first-party probe.',
  ],
  note: [
    'The 17-question set and how it was built are published on the self-baseline study, which reports a different run for a different question. This study does not restate the query-set construction and links to it instead.',
    'The six runs behind the cross-run count sit inside a 26-hour window, which is a narrow one. The count says how this engine behaved on this question set inside that window and is not offered as a property of the engine.',
    'A fourth engine was probed in the run of record and nothing from it is reported on this page. Every figure here counts the three engines the run compared, Google AI Overviews, ChatGPT, and Perplexity. The observed-systems boundary that applies today is stated under Limitations, and the date it widened is recorded under Corrections.',
  ],
} as const

/** Element 7. */
export const assumptions = {
  eyebrow: 'Assumptions',
  title: 'Five things this study assumes',
  items: [
    {
      number: '01',
      name: 'That a shared run makes three engines comparable.',
      description:
        'The three engines received the same 17 questions inside one run, which removes timing and wording as explanations for the differences reported. It does not remove everything. The engines were reached through different endpoints with different request shapes, and this study assumes those differences do not themselves manufacture the gap it reports. That assumption is not tested here.',
    },
    {
      number: '02',
      name: 'That the host is the right unit to count a source by.',
      description:
        'Every cited URL is reduced to its host, and a host cited more than once inside one answer fills a single slot in that cell. That reduction means this study says nothing about which page on a domain was cited, and it makes the distinct-domain count smaller than a page-level count would be.',
    },
    {
      number: '03',
      name: 'That the query set represents what a buyer in this category actually types.',
      description:
        'The 17 questions were fixed before the run and structured by buyer stage. If the set is wrong, the run measures the wrong questions accurately, and every figure here inherits that. The ChatGPT finding is plainly sensitive to this: the two questions that produced a citation both ask for a current external fact, which is a property of the questions and not only of the engine.',
    },
    {
      number: '04',
      name: 'That an API response resembles what a person sees.',
      description:
        'These answers were retrieved through an API, not by a person in a browser with an account, a location, and a history. Hendricks assumes the API surface is close enough to be informative. It does not assume the two are identical, and the retrieval finding in particular may not carry to a consumer product whose defaults differ from the ones this probe requested.',
    },
    {
      number: '05',
      name: 'That six runs in 26 hours describe a window and not a permanent behaviour.',
      description:
        'The cross-run count is stable across every run taken, which is what makes it worth publishing. It is still six readings inside roughly a day. This study assumes it describes that window, and assumes nothing about the following week.',
    },
  ],
} as const

/**
 * Element 8, and the section that decides whether the rest of the page is
 * trustworthy. The small-set caveat on the ChatGPT overlaps appears here as well
 * as inside the findings, by design. See decision 5 in the header comment. Item
 * 09 renders the shared observed-systems constants rather than a fresh wording of
 * the A1 boundary (docs/17 §3.5).
 */
export const limitations = {
  eyebrow: 'Limitations',
  title: 'What this run does not show',
  lead: 'This is a description of three citation sets taken at one time. It is not an experiment in the sense that would let anyone claim a cause, and the difference is not a technicality. One run, one query set, one date, no intervention, no control, no holdout. Nothing here tests whether any tactic produces a citation.',
  items: [
    {
      number: '01',
      name: 'One run, one query set, one date, one geography, one language.',
      description:
        'Run 2026-08-20-110653 describes the conditions it was taken in and nothing beyond them. A different question set on the same day would return different domains and, on the evidence of finding 02, might well return a different retrieval pattern. Another category, another date, or another language setting is outside what this page measured.',
    },
    {
      number: '02',
      name: 'Both ChatGPT overlap figures rest on 9 citation slots.',
      description:
        'ChatGPT filled 9 of the 449 citation slots in this run. Its overlap of one domain with Perplexity and zero with Google AI Overviews had limited opportunity to be larger, and single observations on one run are not rates. They are published because the direction is consistent with the retrieval finding that explains them, not because the numbers are precise. The Perplexity and Google AI Overviews figure, 47 shared of 311, does not carry this limitation.',
    },
    {
      number: '03',
      name: 'The zero shared across all three is partly a consequence of that same small set.',
      description:
        'No domain was cited by all three engines. Because ChatGPT cited only 9 domains, the all-three count could not have exceeded 9 whatever the other engines did. The figure is reported as what the run returned and should be read alongside the pairwise row that does not depend on ChatGPT: Perplexity and Google AI Overviews, the two engines that cited at scale, still shared only 47 domains out of 311.',
    },
    {
      number: '04',
      name: 'Why an engine retrieved or did not is not observable from outside.',
      description:
        'This page reports that ChatGPT cited sources on 2 of 17 questions and answered the other 15 without them. It offers no account of why, because no such account is available to anyone outside the company operating the system. A firm that offers one is guessing. The pattern in which questions triggered retrieval is noted as a pattern and is not presented as a mechanism.',
    },
    {
      number: '05',
      name: 'Google AI Overviews populated-cell counts varied widely across the six runs.',
      description:
        'Google AI Overviews contributed 17 populated cells in the run of record and materially fewer in earlier runs in the window, and part of that variation coincides with changes to how its responses were read. For that reason no cross-run claim is made about Google AI Overviews anywhere on this page. The only cross-run object here is the ChatGPT and Perplexity table, whose counts depend solely on whether any source was present.',
    },
    {
      number: '06',
      name: 'A flat set is not evidence that the set is easy to enter.',
      description:
        'Seventy-nine percent of the distinct domains filled exactly one citation slot. That is a statement about concentration and nothing else. It does not follow that a new domain would be cited, that citation is cheap to earn, or that the sources present were chosen for any reason a brand could reproduce.',
    },
    {
      number: '07',
      name: 'A domain absent from these 319 is not a domain absent from AI answers.',
      description:
        'The set contains what 36 populated cells cited on one date. Absence from it is absence from this run, on these questions, in this geography. It is not a finding about any brand, and it may not be reported as one. That applies to hendricks.ai, which was cited in none of the 51 cells.',
    },
    {
      number: '08',
      name: 'This is not a Selection Intelligence baseline.',
      description:
        'It counts which domains were cited and how often engines retrieved at all. It does not report Observed Consideration Rate, Observed Recommendation Rate, Selection Stability, or Commercial Selection Gap. Citation is a narrower and weaker unit than consideration, and a brand can be discussed in an answer without a cited URL.',
    },
    {
      number: '09',
      name: 'The measurement covers one slice of AI-mediated search.',
      description: `${observedSystemsSentence} ${observedSystemsExclusion} A citation set drawn from the observed systems says nothing about the surfaces outside it, and nothing on this page should be read as a statement about them.`,
    },
  ],
} as const

/** Elements 10 to 13. */
export const byline = {
  author: 'Brandon Lincoln Hendricks',
  authorRole: 'Search Intelligence Engineer, Hendricks',
  authorHref: routes.about.path,
  published: '2026-08-21',
  updated: '2026-09-01',
  dataThrough: '2026-08-20',
  note: 'The published date is the day this page went live. The data-through date is the day of the run it reports, run 2026-08-20-110653, which is the day before. The two differ on purpose and neither is rounded to match the other. The updated date moves when a figure, a method, or a limitation changes, and is not refreshed to signal activity.',
} as const

/** Element 14. */
export const corrections = {
  eyebrow: 'Corrections',
  title: 'No corrections to this page, three dated updates, and one finding that was killed before it reached it',
  body: [
    'This page has been corrected zero times. That is a statement about its age rather than about its accuracy, and it is published as a starting count so a later reader can see whether it moved. Three dated updates below add later evidence without changing any figure.',
    'Update, 2026-09-01. A later Hendricks corpus of 480 questions across eight industries, run run-2026-09-01T022903Z, finds 78 domains cited by all three of the engines compared on this page, and 60 cited by all four once Gemini is included. That does not contradict the zero published here, it explains it. ChatGPT filled 9 citation slots in this run, which caps the all-three count at 9 before any engine disagreement is measured, and in 17-question draws from the larger corpus under that condition a zero occurs in roughly one draw in four, with a single shared domain the most likely outcome. The figure on this page is a reading of what a 9-domain set can overlap with, exactly as Limitation 03 states, and it should not be quoted as a property of the three engines.',
    'Update, 2026-09-01. The pairwise ChatGPT counts on this page, one domain shared with Perplexity and none with Google AI Overviews, are likewise functions of that 9-domain set. The durable form of the same comparison in the larger corpus is a mean per-question overlap of 0.020 with Perplexity over 480 questions and 0.011 with Google AI Overviews over 430, the lowest of any engine pair measured. The direction this page reported holds. The counts themselves should not travel without their denominator.',
    'Update, 2026-09-01. The scope sentence this page renders from the shared observed-systems module changed when Gemini became the fourth observed system, a boundary decision recorded in CONTENT_VERIFICATION A1 on 2026-09-01. The sentence on this page changed with it. No figure on this page changed, and nothing from Gemini is reported here.',
    'One finding was discarded during production rather than corrected after it. A draft reading about one engine dropping a high-volume community source did not survive the next run, which gave that engine more citation slots and produced the citation the draft said was absent. It is recorded under Errors Found rather than quietly dropped, because the denominator that made it look real is the same order as one this page still relies on.',
    'If a figure here is wrong, or a third party runs this design and gets a materially different result, the correction is published with its date, the original figure, the contradicting result, and what changed. Nothing on this page is quietly edited, and the updated date above moves with the correction.',
    'A firm selling measurement discipline has to be correctable in public. The corrections log carries every entry for every page in this section.',
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
    'What this study counts, whether an engine retrieved at all and which domains it cited, is an input to Selection Intelligence, which reports whether a brand entered consideration rather than which URLs appeared beside it. A question an engine answers without retrieving is a question where citation work has no surface to act on, and knowing which of a buyer’s questions behave that way is part of what a baseline is for.',
    'The run design behind a client baseline, the context panels, the classification rule, and the evidence grade every conclusion carries are on the Methodology page.',
  ],
  ctas: [
    {
      label: 'See what a Selection Intelligence baseline covers',
      href: routes.selectionIntelligence.path,
      analytics: { location: 'nss_related_solution', solutionName: 'Selection Intelligence' },
    },
    {
      label: 'Read the Methodology',
      href: routes.methodology.path,
      analytics: { location: 'nss_related_methodology' },
    },
  ] satisfies readonly Cta[],
} as const

/** Element 9. No `citations` array. First-party measurement only. */
export const sources = {
  reviewed: '2026-08-21',
  basis:
    'This page reports first-party measurement produced by Hendricks. Every single-run figure on it is read from run 2026-08-20-110653, archived at history/runs/hendricks-2026-08-20-110653.json with its manifest at history/runs/manifest-2026-08-20-110653.json. The one cross-run figure is read from six archived runs, each named in the sample section. Every run is recorded with its denominators, its error count, and the engines it queried. No figure on this page is derived, averaged, rounded, or recomputed into a new statistic. The page reports no third-party research, no vendor study, and no statistic from anyone else, and therefore cites none.',
  appliedIn: [
    { label: 'the Selection Intelligence solution', href: routes.selectionIntelligence.path },
    { label: 'the Methodology', href: routes.methodology.path },
    { label: 'the Search Intelligence Diagnostic', href: routes.diagnostic.path },
  ],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.researchWhoGetsCitedInAiAnswers.path,
    label: 'Who Gets Cited in AI Answers',
    description: 'The structure of a citation set on an earlier run, and why there was no incumbent in it.',
  },
  {
    href: routes.researchAnswerStabilityTwoRuns.path,
    label: 'Two Runs, Same Questions',
    description: 'How much a single reading of an AI answer can be trusted when the question is asked twice.',
  },
  {
    href: routes.researchHendricksSelectionBaseline.path,
    label: 'The Hendricks Selection Baseline',
    description: 'The same instrument, read for whether one brand appeared in the answers at all.',
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
    'Three engines answered the same 17 questions and cited no source in common, and one of them issued no citation at all on 15 of them. Before you accept a single AI visibility score, ask which engines it averages, how many of their cells actually cited anything, and what it would mean to improve a number on a question the engine answers without retrieving.',
  primaryCta: {
    label: 'Establish a baseline through the Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'nss_closing' },
  } satisfies Cta,
} as const
