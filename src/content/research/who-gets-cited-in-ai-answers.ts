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
 * The citation-set structure study. Mirrored in
 * content/pages/28-who-gets-cited-in-ai-answers.md.
 *
 * This is E1 in docs/17 §8.1, the category source and evidence study, and the
 * second research asset in docs/19 §6. It answers one buyer question that the
 * category answers with an assertion: who owns AI answers here, and what would
 * it take to displace them. The measured answer is that on this query set, on
 * this date, nobody owned anything.
 *
 * Six decisions are recorded before anyone edits a string.
 *
 * 1. EVERY FIGURE ON THIS PAGE COMES FROM ONE RUN AND THE RUN IS NAMED.
 *    Run 2026-08-19-110930, archived at
 *    `history/runs/hendricks-2026-08-19-110930.json` with its manifest at
 *    `history/runs/manifest-2026-08-19-110930.json`, both under
 *    `~/claudecode/total-search-dashboard/checker/` on the M3 Ultra. That is the
 *    same run of record the self-baseline study reports, read here for a
 *    different question. The run id is named in nine places on the page on
 *    purpose, so that a passage lifted out of it carries its own provenance.
 *
 *    This discipline is not decoration and it is not new here. The self-baseline
 *    study published a set of 2026-08-19 figures whose result file a scheduled
 *    job had already overwritten in place, and it had to correct them on its
 *    publication day. Naming the run id inside the copy is what that correction
 *    bought. Do not remove a run id from a sentence to make the sentence read
 *    more cleanly.
 *
 * 2. NOTHING IS DERIVED, AVERAGED, OR RECOMPUTED. The counts published here are
 *    the counts the run reported: 247 distinct domains, 308 citation slots, 20
 *    populated cells, 212 domains at one slot, 29 at two, 2 at three, and 46 of
 *    the 308 slots held by the ten most-cited domains. Percentages appear only
 *    where the run reported one, and they appear beside their count. If an edit
 *    wants a figure that is not in that list, the sentence is cut rather than
 *    the figure computed.
 *
 * 3. THERE IS NO RANKED TOP TEN ON THIS PAGE, AND THAT IS DELIBERATE. The
 *    concentration figure counts the ten most-cited domains, and 29 domains in
 *    this run each filled exactly two slots. Publishing a ranked list of ten
 *    would require breaking a 29-way tie that the run record does not break.
 *    The two-slot table publishes nine of those 29 and its caption says so.
 *    The tables therefore publish domains by slot count, in bands, and the
 *    concentration figure is stated as the run reported it. Do not assemble a
 *    top ten from the two tables.
 *
 * 4. THE CROSS-ENGINE OVERLAP FINDING CARRIES ITS CAVEAT IN THE SAME SENTENCE,
 *    NEVER IN A FOOTNOTE. Perplexity and ChatGPT cited one domain in common,
 *    subscribepr.com, out of 243 distinct domains across the two engines.
 *    ChatGPT contributed 11 citation slots in this run, so the overlap had
 *    limited opportunity to be large. A reader who spots that unaided will
 *    discount the rest of the page, so it is stated wherever the finding is
 *    stated: in the executive summary, in key finding 02, in the data note, in
 *    the methodology, and in the limitations. Do not consolidate it into one
 *    place.
 *
 * 5. DOMAINS ARE FACTS ABOUT THE ANSWERS, NEVER VERDICTS ABOUT FIRMS. This is
 *    the discipline docs/17 §8.1 sets for this class of study, and the
 *    self-baseline study already publishes it. The tables record which sources
 *    these answers cited. They rank no vendor, they judge no company behind a
 *    domain, and no page on this site will.
 *
 * 6. THE COMMERCIAL CONCLUSION IS EARNED, NOT ASSERTED. The page concludes that
 *    a single AI visibility score averaged across engines measures incompatible
 *    things. That conclusion arrives only after the per-engine contributions and
 *    the one shared domain are on the page with their denominators. Do not move
 *    it up into the hero, and do not restate it as a claim anywhere it is not
 *    standing on a published figure.
 *
 * WHAT THIS PAGE MAY NOT CLAIM. It is not an experiment. No intervention, no
 * control, no holdout. It describes one run of one query set on one date in one
 * geography and one language. It says nothing about whether a tactic works, and
 * nothing about another category, another query set, or another date. Nobody
 * outside the platforms can observe why a source was chosen, and this page
 * offers no account of it.
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
 * `errorsFound` is the one optional home among the fifteen and is absent here on
 * purpose: this study ran no verification outside the probe, so it has nothing
 * to put in that section. `data` satisfies item 4 on its own. Add to the list,
 * never subtract from it.
 *
 * NAVIGATION. content/pages/12-research.md line 88 gates primary navigation on
 * three category foundation pages. This is a research asset, not a foundation
 * page. It is linked contextually and from the footer research column, and
 * src/config/navigation.ts is not touched.
 */

export const meta = {
  title: 'Who Gets Cited in AI Answers: 247 Domains, No Incumbent | Hendricks',
  description:
    'A research experiment. In one archived run, 247 distinct domains filled 308 citation slots across 20 AI answers, 86 percent of those domains were cited exactly once, and Perplexity and ChatGPT shared a single source.',
} as const

export const hero = {
  eyebrow: 'Research Experiment',
  title:
    'One Run Cited 247 Domains Across 308 Citation Slots, 86 Percent of Them Once. There Was No Incumbent to Displace.',
  lead: [
    'Hendricks read the full citation set of one archived run, 2026-08-19-110930, and counted every domain that Google AI Overviews, ChatGPT, and Perplexity cited. Twenty answers carried a source. Those 20 answers cited 247 distinct domains across 308 citation slots, and the ten most-cited domains between them held 46 of those slots.',
    'The buyer question underneath this study is who owns AI answers in a category and what it would take to displace them. On this query set, on this date, there was no incumbent in the citation set to displace.',
  ],
  primaryCta: {
    label: 'See how Hendricks produces a number',
    href: routes.methodology.path,
    analytics: { location: 'wgc_hero' },
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
    'There is no client here, no intervention, and no control. Hendricks ran a fixed question set once, read the citation set the answers returned, and counted it. Nothing was changed and nothing was held back for comparison, so no result on this page can be attributed to any action by anyone.',
    'It is published under the standard Hendricks applies to client work. The run id, the archive filename, the denominators, the failed cells, the limits, and the questions this design cannot answer are all on the page. A firm that reports a category number without naming the run it came from is asking to be believed rather than checked.',
  ],
} as const

/**
 * Element 1, first half. One self-contained passage that survives being lifted
 * out of the page, because being lifted is what this page is for. It states the
 * finding, names the run, and states the limit in the same block.
 */
export const directAnswer = {
  term: 'The finding',
  answer:
    'In one archived run on 2026-08-19, Google AI Overviews, ChatGPT, and Perplexity cited 247 distinct domains across 308 citation slots inside the 20 answers that carried a source. Of those 247 domains, 212, or 86 percent, were cited exactly once, and the ten most-cited domains together filled 46 of the 308 slots, 15 percent. On this query set, on this date, there was no incumbent in the citation set to displace. Every figure on this page is read from run 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json. One run of one query set in one geography and one language shows what appeared. It shows nothing about why any source was chosen, and nothing about whether any tactic would change it.',
} as const

/** Element 1, second half. States the finding, then what it means and what it does not. */
export const executiveSummary = {
  eyebrow: 'Executive Summary',
  title: 'What one run of the citation set found',
  body: [
    'The category sells displacement. A buyer is told that an established competitor has built authority inside AI answers and that the work is to out-authority it. Run 2026-08-19-110930 does not describe a set with that shape. Twenty answers carried a citation. Those answers cited 247 distinct domains across 308 citation slots, 212 of those domains were cited exactly once, 29 were cited twice, and 2 were cited three times. The ten most-cited domains held 46 of the 308 slots between them, 15 percent. There is no authority moat in this set because there is nothing sitting on top of it.',
    'The second finding is about the engines rather than the domains. Perplexity supplied 233 distinct domains across 291 citation slots. ChatGPT supplied 11 domains across 11 slots. Google AI Overviews supplied 6 domains across 6 slots. Across the 243 distinct domains Perplexity and ChatGPT cited between them, exactly one appears on both lists: subscribepr.com. The caveat belongs in the same breath as the finding, because a reader who works it out unaided will discount everything else here: ChatGPT contributed 11 slots in this run, so the overlap had limited opportunity to be large. Even with that stated, the direction is stark, and the reading follows from it. Being cited by one of these engines tells a brand almost nothing about the other.',
    'One observation is worth reporting plainly and leaving there. The two most-cited domains in this run were reddit.com at 12 citation slots and linkedin.com at 9. Both sat ahead of every SEO vendor domain and every trade publication in the set. Community and professional-network content is where a large share of these repeated citations came from. Hendricks reports that and draws no tactic from it, because one run of one query set is not a basis for telling anyone where to publish.',
    'What this run does not show is most of what a buyer wants to know. It cannot say why any engine chose any source. It cannot say whether the same questions would return the same domains tomorrow, because it was read once. It cannot say that a domain absent from these 247 is absent from AI answers generally. And it is not an experiment: nothing was changed, nothing was withheld, and no outcome here can be attributed to anything.',
  ],
} as const

/** Element 2. Ordered so the commercial conclusion arrives after its evidence. */
export const keyFindings = {
  eyebrow: 'Key Findings',
  title: 'Five findings from one archived run',
  lead: 'Every figure below is read from run 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json.',
  items: [
    {
      number: '01',
      name: 'The citation set is nearly flat, so there is no incumbent to displace.',
      description:
        'Run 2026-08-19-110930 returned 20 answers carrying at least one source. Those answers cited 247 distinct domains across 308 citation slots. Of the 247, 212 domains, 86 percent, filled exactly one slot. Twenty-nine domains, 12 percent, filled two. Two domains filled three. The ten most-cited domains together held 46 of the 308 slots, 15 percent. A set in which the leading ten sources account for 15 percent of the citations is not a set with an authority moat in it. For a buyer who has been told the work is to out-authority an established competitor, that is directly useful and directly contrary to what the category sells.',
    },
    {
      number: '02',
      name: 'Perplexity and ChatGPT cited one domain in common, and the caveat matters.',
      description:
        'Perplexity cited 233 distinct domains in this run. ChatGPT cited 11. Across the 243 distinct domains the two engines cited between them, one appears on both lists: subscribepr.com. The caveat is stated here rather than below it. ChatGPT contributed only 11 citation slots in this run, so there was limited opportunity for the two sets to overlap, and one run of one query set cannot establish a rate of anything. Even holding both of those, the direction is stark: on this set, being cited by one of these two engines told a brand almost nothing about the other.',
    },
    {
      number: '03',
      name: 'The three engines contributed the set at completely different scales.',
      description:
        'Perplexity supplied 233 distinct domains across 291 citation slots. ChatGPT supplied 11 domains across 11 slots. Google AI Overviews supplied 6 domains across 6 slots, on a run where 4 of its cells errored and returned no measurement. Those counts are a correct record of what the instrument read, and a correction dated 2026-09-01 narrows what may be concluded from them: the probe was discarding asynchronously rendered overview panels, so the Google AI Overviews contribution describes a parser defect rather than the engine, and the corpus run run-2026-09-01T022903Z, taken after the fix, reads that engine citing on 430 of 462 rendered panels. What survives is the narrower reading: a figure drawn from this run and presented as what AI answers cite is describing Perplexity unless it says otherwise, and a reader handed any cross-engine figure should still ask which engine produced it and how many slots the others contributed.',
    },
    {
      number: '04',
      name: 'A community site and a professional network led the repeated citations.',
      description:
        'In this run reddit.com filled 12 citation slots and linkedin.com filled 9. Both sat ahead of semrush.com at 6, maxaeo.ai at 5, surferseo.com at 3, and amicited.com at 3, and ahead of every trade publication in the set. Community and professional-network content is where a large share of the repeated sources in these answers came from. Hendricks publishes that observation and stops there. One run of one query set on one date is not a basis for telling a brand where to publish, and a page that turned this count into a posting strategy would be doing exactly what the rest of this study exists to argue against.',
    },
    {
      number: '05',
      name: 'A single AI visibility score averaged across engines measures incompatible things.',
      description:
        'The three preceding findings are what makes this one a conclusion rather than an opinion. In run 2026-08-19-110930 the three engines cited 233, 11, and 6 distinct domains, and of the two the run compares directly, one domain out of 243 appears on both lists. A score that averages presence across engines therefore combines measurements whose underlying sets barely intersect, and the resulting number describes no system a buyer can act on. This does not mean cross-engine measurement is worthless. It means the per-engine figures, and the count of cells behind each one, have to travel with any score that claims to summarise them.',
    },
  ],
} as const

/**
 * Element 3. docs/12 §6 forbids publishing a metric without a definition. Every
 * number on this page rests on the difference between a domain, a slot, and a
 * cell, and collapsing any two of them is how a flat distribution gets published
 * as a concentrated one.
 *
 * The self-baseline study defines the run-level units for the same run. These
 * are written for this study's own question, which is the structure of the
 * citation set rather than whether one brand appeared in it. A shared module for
 * the units both studies count is the right destination and does not exist yet;
 * it is recorded as a finding rather than pre-empted here.
 */
export const definitions = {
  eyebrow: 'Definitions',
  title: 'The eight terms every number here depends on',
  lead: 'Read these before the tables. A domain, a citation slot, and an answer are three different units, and a concentration figure that quietly moves between them can make a flat set look like a contested one.',
  items: [
    {
      name: 'Engine',
      definition:
        'One AI answer system a run sends questions to. Three are covered here: Google AI Overviews, ChatGPT, and Perplexity. The scope statement under Limitations records what that set does and does not include.',
    },
    {
      name: 'Cell',
      definition:
        'One question sent to one engine on one date. Seventeen questions across three engines produce 51 cells. A cell that errored returned no measurement and is counted separately from a cell that returned an answer citing nothing.',
    },
    {
      name: 'Populated cell',
      definition:
        'A measured cell in which the engine cited at least one source. Only populated cells contribute citation slots, so the populated count is the denominator for every figure about the structure of the citation set. This run had 20.',
    },
    {
      name: 'Citation slot',
      definition:
        'One distinct domain cited in one cell. A domain cited in six cells fills six slots. The slot count is the size of the citation set, and it is always at least the distinct-domain count.',
    },
    {
      name: 'Distinct domain',
      definition:
        'The number of different hosts appearing across all citation slots in a run. Counting is done at the host level, so every page on one site collapses into one domain.',
    },
    {
      name: 'Singleton domain',
      definition:
        'A domain that filled exactly one citation slot in the run. Read against the distinct-domain count it is the flatness measure: the higher the singleton share, the less any source recurs across answers.',
    },
    {
      name: 'Concentration',
      definition:
        'The share of citation slots held by the most-cited domains, published here as a count of slots against the total rather than as an index. A count can be checked against the tables on this page. An index cannot be checked against anything without the underlying data.',
    },
    {
      name: 'Cross-engine overlap',
      definition:
        'The number of domains appearing in the cited sets of two engines within the same run. It is read against the size of the smaller set, because an engine that filled few slots had few chances to overlap with anything.',
    },
  ] satisfies readonly MetricDefinition[],
} as const

const shapeColumns = [
  { key: 'measure', header: 'Measure', rowHeader: true },
  { key: 'value', header: 'Run 2026-08-19-110930' },
] as const satisfies readonly DataTableColumn[]

const shapeRows = [
  { measure: 'Cells sent', value: '51' },
  { measure: 'Cells measured', value: '47' },
  { measure: 'Cells that errored', value: '4, all Google AI Overviews' },
  { measure: 'Populated cells, carrying at least one source', value: '20' },
  { measure: 'Citation slots filled', value: '308' },
  { measure: 'Distinct domains cited', value: '247' },
  { measure: 'Domains filling exactly one slot', value: '212, or 86 percent' },
  { measure: 'Domains filling exactly two slots', value: '29, or 12 percent' },
  { measure: 'Domains filling three slots', value: '2' },
  { measure: 'Slots held by the ten most-cited domains', value: '46 of 308, or 15 percent' },
] as const satisfies readonly DataTableRow[]

const engineColumns = [
  { key: 'engine', header: 'Engine', rowHeader: true },
  { key: 'domains', header: 'Distinct domains cited' },
  { key: 'slots', header: 'Citation slots filled' },
] as const satisfies readonly DataTableColumn[]

const engineRows = [
  { engine: 'Perplexity', domains: '233', slots: '291' },
  { engine: 'ChatGPT', domains: '11', slots: '11' },
  { engine: 'Google AI Overviews', domains: '6', slots: '6' },
] as const satisfies readonly DataTableRow[]

const domainColumns = [
  { key: 'domain', header: 'Domain', rowHeader: true },
  { key: 'slots', header: 'Citation slots filled' },
] as const satisfies readonly DataTableColumn[]

const repeatDomainRows = [
  { domain: 'reddit.com', slots: '12' },
  { domain: 'linkedin.com', slots: '9' },
  { domain: 'semrush.com', slots: '6' },
  { domain: 'maxaeo.ai', slots: '5' },
  { domain: 'surferseo.com', slots: '3' },
  { domain: 'amicited.com', slots: '3' },
] as const satisfies readonly DataTableRow[]

const tailDomainRows = [
  { domain: 'pixis.ai', slots: '2' },
  { domain: 'medium.com', slots: '2' },
  { domain: 'webfx.com', slots: '2' },
  { domain: 'developers.google.com', slots: '2' },
  { domain: 'probablygenius.com', slots: '2' },
  { domain: 'growtika.com', slots: '2' },
  { domain: 'airanklab.com', slots: '2' },
  { domain: 'yotpo.com', slots: '2' },
  { domain: 'searchengineland.com', slots: '2' },
] as const satisfies readonly DataTableRow[]

const overlapColumns = [
  { key: 'measure', header: 'Measure', rowHeader: true },
  { key: 'value', header: 'Run 2026-08-19-110930' },
] as const satisfies readonly DataTableColumn[]

const overlapRows = [
  { measure: 'Distinct domains cited by Perplexity', value: '233' },
  { measure: 'Distinct domains cited by ChatGPT', value: '11' },
  { measure: 'Distinct domains across the two engines', value: '243' },
  { measure: 'Domains cited by both engines', value: '1, subscribepr.com' },
] as const satisfies readonly DataTableRow[]

/**
 * Element 4. Five tables, every figure read from run 2026-08-19-110930. Nothing
 * is derived across engines, nothing is averaged, and no ranked top ten is
 * assembled from the two domain tables. See decisions 2 and 3 in the header
 * comment before editing a row.
 */
export const data = {
  eyebrow: 'The Data',
  title: 'The citation set, in full',
  lead: 'One run, read five ways: the shape of the whole set, what each engine contributed, which domains recurred, which sat in the two-slot band, and what the two comparable engines had in common.',
  tables: [
    {
      id: 'set-shape',
      caption: 'The shape of the citation set in run 2026-08-19-110930.',
      columns: shapeColumns,
      rows: shapeRows,
    },
    {
      id: 'by-engine',
      caption: 'Distinct domains and citation slots contributed by each engine, run 2026-08-19-110930.',
      columns: engineColumns,
      rows: engineRows,
    },
    {
      id: 'repeat-domains',
      caption: 'Domains that filled three or more citation slots in run 2026-08-19-110930.',
      columns: domainColumns,
      rows: repeatDomainRows,
    },
    {
      id: 'tail-domains',
      caption: 'Nine of the 29 domains that filled exactly two citation slots in run 2026-08-19-110930.',
      columns: domainColumns,
      rows: tailDomainRows,
    },
    {
      id: 'cross-engine',
      caption: 'Source overlap between Perplexity and ChatGPT, run 2026-08-19-110930.',
      columns: overlapColumns,
      rows: overlapRows,
    },
  ],
  note: [
    'These tables record which sources these answers cited. They are facts about the answers and nothing else. They are not a ranking of firms, they carry no judgment about any company behind a domain, and no page on this site publishes one.',
    'The concentration figure counts the ten most-cited domains, and this page does not publish those ten as a ranked list. Twenty-nine domains in this run each filled exactly two slots, and the run record does not break a 29-way tie. The tables therefore publish domains in bands by slot count, and the concentration figure is published as the run reported it, 46 of 308 slots.',
    'The overlap table compares Perplexity and ChatGPT and stops there. ChatGPT filled 11 citation slots in this run and Google AI Overviews filled 6, so the smaller sets had few chances to overlap with anything, and a single shared domain out of 243 is reported as an observation on one run rather than as a rate.',
    'Four of the 51 cells returned no measurement, all four of them Google AI Overviews cells. An errored cell is a broken instrument rather than an answer that cited nothing, so the 6 domains attributed to Google AI Overviews are what 13 successful probes returned and nothing on this page estimates what the other 4 would have returned.',
    'Every figure in these tables is read from run 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json with its manifest at history/runs/manifest-2026-08-19-110930.json. A reader checking a figure on this page can name that run id and ask for the file it came from.',
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
      name: 'Read the citation set from one archived run, and name the run.',
      description:
        'Every figure on this page comes from run 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json with its manifest at history/runs/manifest-2026-08-19-110930.json. The manifest records which engines were queried, which were carried forward from an earlier run, and which were not run at all, because those are three different states and a bare result file cannot tell them apart after the fact. A figure whose record cannot be produced on request is not a published measurement.',
    },
    {
      number: '02',
      name: 'Count cited URLs, not brand mentions.',
      description:
        'The counted field is the list of URLs an engine cited, matched on host. A brand named in answer text without a cited URL is a different and weaker signal, and counting it here would make every figure larger and easier to move. Host-level counting also means every page on one site collapses into one domain, which makes the distinct-domain count smaller than a page-level count would be.',
    },
    {
      number: '03',
      name: 'Count slots first, then domains, and publish both.',
      description:
        'A citation slot is one distinct domain cited in one cell. A distinct domain is one host across the whole run. Publishing only the domain count hides how often anything recurred, and publishing only the slot count hides how many different sources filled them. The two together are the structure of the set, and every claim on this page about flatness is a statement about the relationship between 247 and 308.',
    },
    {
      number: '04',
      name: 'Report concentration as counts against the total, never as an index.',
      description:
        'The ten most-cited domains filled 46 of 308 slots in this run. That figure is published as the run reported it, next to the slot total, so a reader can check it against the domain tables above. A concentration index would compress the same information into a number nobody outside this page could verify, which is the opposite of what a research page is for.',
    },
    {
      number: '05',
      name: 'Compare engines by what each contributed, never by an average across them.',
      description:
        'Each engine is reported with its own distinct-domain count and its own slot count. Nothing on this page averages the three. In this run one engine supplied 291 of the 308 slots, so an average across the three would be a description of that engine wearing a label that says it describes all of them.',
    },
    {
      number: '06',
      name: 'Test cross-engine overlap on the raw domain sets, and publish the smaller set beside it.',
      description:
        'The overlap between Perplexity and ChatGPT is the count of domains appearing in both cited sets, which is one. The figure is never published without the size of the smaller set beside it, because ChatGPT filled 11 slots in this run and an engine that filled 11 slots had few chances to overlap with anything. Reporting the overlap without the opportunity would overstate the finding, and the finding is stark enough without it.',
    },
    {
      number: '07',
      name: 'Publish domains, and never a verdict about the firm behind one.',
      description:
        'A domain appearing in an answer is a fact about the answer. It is not evidence that the company behind the domain is good, credible, or worth hiring, and this study makes no such statement about any of the 247. The tables are a record of what these answers cited on one date.',
    },
    {
      number: '08',
      name: 'Report the run health next to the number.',
      description:
        'Run 2026-08-19-110930 sent 51 cells and measured 47. Four returned no measurement, all of them Google AI Overviews cells. A run that fails and a run that finds nothing produce similar-looking output files and mean opposite things, so the error count travels with every figure taken from this run.',
    },
  ],
  closing: [
    'The design is deliberately cheap to repeat. A fixed question set, one pass per engine, cited URLs recorded at host level, and counts published against their denominators. Anyone with an API key and a list of questions can run it against their own category and does not have to take this page’s word for anything.',
    'The instrument is named for the same reason, and so is the run. Naming the instrument is disclosure, not endorsement. Naming the run is what lets a reader ask for the exact file a figure came from, which is the difference between a measurement and an assertion.',
  ],
  cta: {
    label: 'Read the full Hendricks methodology',
    href: routes.methodology.path,
    analytics: { location: 'wgc_methodology' },
  } satisfies Cta,
} as const

/** Element 6. */
export const sample = {
  eyebrow: 'Sample and Date Range',
  title: 'What was sampled, and when',
  items: [
    'Subject: the citation set of one run. No brand is the subject of this study, and no client brand or client data appears in it.',
    'Date: one run, 2026-08-19. One pass per cell, one cell per question per engine.',
    'Run of record: 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json with its manifest at history/runs/manifest-2026-08-19-110930.json.',
    'Engines: Google AI Overviews, ChatGPT, and Perplexity.',
    'Questions: 17, fixed before the run.',
    'Cells: 51 sent, of which 47 were measured and 4 errored. All four errored cells were Google AI Overviews cells.',
    'Populated cells: 20. Only these contributed citation slots, so 20 is the denominator for every figure about the structure of the set.',
    'Citation slots: 308. Distinct domains: 247.',
    'Geography and language: one setting, held constant across the run.',
    'Instrument: a first-party probe.',
  ],
  note: [
    'The 17-question set and how it was built are published on the self-baseline study, which reports the same run of record for a different question. This study does not restate the query-set construction and links to it instead.',
    'Run 2026-08-19-110930 is named on this page in nine places rather than once. That is deliberate. A passage lifted out of a research page should carry the record it rests on, and the discipline exists because the self-baseline study had to correct a set of figures whose result file a scheduled job had overwritten in place.',
  ],
} as const

/** Element 7. Assumptions stated as assumptions and not as facts. */
export const assumptions = {
  eyebrow: 'Assumptions',
  title: 'Four things this study assumes',
  items: [
    {
      number: '01',
      name: 'That the host is the right unit to count a source by.',
      description:
        'Every cited URL is reduced to its host, and a host cited more than once inside one answer fills a single slot in that cell rather than one slot per URL. That reduction means this study says nothing about which page on a domain was cited, or how many times a single answer pointed at the same site.',
    },
    {
      number: '02',
      name: 'That the query set represents what a buyer in this category actually types.',
      description:
        'The 17 questions were fixed before the run and structured by buyer stage. If the set is wrong, the run measures the wrong questions accurately, and every figure on this page inherits that. A different set of questions on the same day would return a different citation set, and this study offers no reason to expect otherwise.',
    },
    {
      number: '03',
      name: 'That an API response resembles what a person sees.',
      description:
        'These answers were retrieved through an API, not by a person in a browser with an account, a location, and a history. Hendricks assumes the API surface is close enough to be informative. It does not assume the two are identical, and no figure here should be read as the set of sources a specific buyer saw.',
    },
    {
      number: '04',
      name: 'That one reading describes one day and not a structure.',
      description:
        'The set was read once. Nothing here measures whether the same questions return the same domains on a second pass, so every figure on this page is a description of one run rather than a property of the category. Concentration measured once is concentration measured once.',
    },
  ],
} as const

/**
 * Element 8, and the section that decides whether the rest of the page is
 * trustworthy. The cross-engine caveat appears here as well as inside the
 * finding, by design. See decision 4 in the header comment. Item 09 renders the
 * shared observed-systems constants rather than a fresh wording of the A1
 * boundary (docs/17 §3.5).
 */
export const limitations = {
  eyebrow: 'Limitations',
  title: 'What this run does not show',
  lead: 'This is a description of one citation set. It is not an experiment in the sense that would let anyone claim a cause, and the difference is not a technicality. One run, one query set, one date, no intervention, no control, and no holdout. Nothing here tests whether any tactic produces a citation.',
  items: [
    {
      number: '01',
      name: 'One run, one query set, one date, one geography, one language.',
      description:
        'Run 2026-08-19-110930 describes the conditions it was taken in and nothing beyond them. A different question set on the same day would return different domains. Another category, another date, or another language setting is outside what this page measured, and no figure here should be carried into one.',
    },
    {
      number: '02',
      name: 'The cross-engine overlap rests on 11 ChatGPT slots.',
      description:
        'Perplexity and ChatGPT cited one domain in common out of 243 distinct domains across the two engines. ChatGPT filled only 11 citation slots in this run, so the overlap had limited opportunity to be large, and a single observation on one run is not a rate. The finding is published because the direction is stark and the caveat is checkable, not because the number is precise.',
    },
    {
      number: '03',
      name: 'Google AI Overviews contributed six slots, and four of its cells errored.',
      description:
        'Google AI Overviews supplied 6 distinct domains across 6 citation slots on 13 successful probes, because 4 of its 17 cells returned no measurement. Its contribution to this citation set is small, and part of what it would have contributed was never measured. Nothing on this page estimates it.',
    },
    {
      number: '04',
      name: 'A flat set is not evidence that the set is easy to enter.',
      description:
        'The finding is that no domain in this run held a large share of the citations. That is a statement about concentration and nothing else. It does not follow that a new domain would be cited, that citation is cheap to earn, or that the sources present were chosen for any reason a brand could reproduce. Reading a flat distribution as an opportunity is an inference this page does not support.',
    },
    {
      number: '05',
      name: 'A domain absent from these 247 is not a domain absent from AI answers.',
      description:
        'The set contains what 20 answers cited on one date. Absence from it is absence from this run, on these questions, in this geography. It is not a finding about any brand, and it may not be reported as one.',
    },
    {
      number: '06',
      name: 'Nobody outside the platforms can observe why a source was chosen.',
      description:
        'This page reports what appeared. It offers no account of why any engine cited reddit.com in 12 slots or subscribepr.com at all, because no such account is available to anyone outside the companies operating these systems. A firm that offers one is guessing, and this page will not.',
    },
    {
      number: '07',
      name: 'The set was read once, so nothing here measures stability.',
      description:
        'Concentration, flatness, and cross-engine overlap were each measured on a single pass. Whether the same questions return the same domains on a second pass within the same day is a separate question this run cannot answer, and every figure on this page should be read as one reading rather than as a stable property.',
    },
    {
      number: '08',
      name: 'This is not a Selection Intelligence baseline.',
      description:
        'It counts which domains were cited. It does not report Observed Consideration Rate, Observed Recommendation Rate, Selection Stability, or Commercial Selection Gap, and citation is a narrower and weaker unit than consideration. A brand can be discussed in an answer without a cited URL, and nothing in this study counts that.',
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
  published: '2026-08-19',
  updated: '2026-09-01',
  dataThrough: '2026-08-19',
  note: 'The updated date on this page moves when a figure, a method, or a limitation changes. It is not refreshed to signal activity. The data-through date is the run this page reports, run 2026-08-19-110930, and will not advance until a further run is published here.',
} as const

/**
 * Element 14. `/corrections` is built, so `ctaHref` resolves to it and the
 * fallback is never used. The fallback stays because the field is what makes
 * this element 14 and because an unbuilt destination must never render as a dead
 * link if the route is ever flagged off.
 */
export const corrections = {
  eyebrow: 'Corrections',
  title: 'One correction to this page, and how the next one gets made',
  body: [
    'Correction, 2026-09-01. What was published: finding 03 read the Google AI Overviews contribution of 6 domains across 6 slots as that engine contributing almost nothing, and the page concluded that almost the entire citation set came from one engine. What was wrong: the probe was bailing out of any overview panel the vendor flagged as asynchronously rendered, discarding usable panels, so the engine read as nearly absent when it was not. The counts stand as a record of the defective instrument; the conclusion built on them came off. Corroboration, not cause: the 480-question corpus run run-2026-09-01T022903Z, taken after the parser fix, reads Google AI Overviews citing on 430 of 462 rendered panels at 6.8 sources per rendered panel. The full entry is in the corrections log.',
    'Update, 2026-09-01. The scope sentence this page renders from the shared observed-systems module changed when Gemini became the fourth observed system, a boundary decision recorded in CONTENT_VERIFICATION A1 on 2026-09-01. The sentence on this page changed with it. No figure on this page changed, and nothing from Gemini is reported here.',
    'If a figure here is wrong, or a third party runs this design and gets a materially different result, the correction is published with its date, the original figure, the contradicting result, and what changed. Nothing on this page is quietly edited, and the updated date above moves with the correction.',
    'The run id and the archive filename appear on this page nine times because the companion self-baseline study needed two corrections on its publication day, one of them for a set of figures whose result file a scheduled job had overwritten in place. Those figures could not be reproduced from any surviving record, which is disqualifying on a research page whatever the figures were. Naming the run inside the copy is what that correction bought, and it is the single most useful structural feature of a Hendricks research page.',
    'A firm selling measurement discipline has to be correctable in public. The corrections log carries every entry for every page in this section, including the two that predate this one.',
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
    'The unit counted here, which domains an answer cited, is one input to Selection Intelligence, which reports whether a brand entered consideration rather than which URLs appeared beside it. This study answers only the narrower question, and it answers it for a category rather than for a brand.',
    'The run design behind a client baseline, the context panels, the classification rule, and the evidence grade every conclusion carries are on the Methodology page.',
  ],
  ctas: [
    {
      label: 'See what a Selection Intelligence baseline covers',
      href: routes.selectionIntelligence.path,
      analytics: { location: 'wgc_related_solution', solutionName: 'Selection Intelligence' },
    },
    {
      label: 'Read the Methodology',
      href: routes.methodology.path,
      analytics: { location: 'wgc_related_methodology' },
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
    'This page reports first-party measurement produced by Hendricks. Every figure on it is read from a single probe run on 2026-08-19, run 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json with its manifest at history/runs/manifest-2026-08-19-110930.json. The run is recorded with its denominators, its error count, and the engines it queried. No figure on this page is derived, averaged, rounded, or recomputed into a new statistic. The page reports no third-party research, no vendor study, and no statistic from anyone else, and therefore cites none.',
  appliedIn: [
    { label: 'the Selection Intelligence solution', href: routes.selectionIntelligence.path },
    { label: 'the Methodology', href: routes.methodology.path },
    { label: 'the Search Intelligence Diagnostic', href: routes.diagnostic.path },
  ],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.researchHendricksSelectionBaseline.path,
    label: 'Two Runs in AI Answers',
    description: 'The same run of record, read for whether one brand appeared in it at all.',
  },
  {
    href: routes.whatIsAiMediatedSearch.path,
    label: 'What Is AI-Mediated Search?',
    description: 'The surfaces this run sampled, and which of them Hendricks observes.',
  },
  {
    href: routes.aiSelectionProblem.path,
    label: 'The AI Selection Problem',
    description: 'What it means that an AI system recommended somebody else.',
  },
  {
    href: routes.selectionIntelligence.path,
    label: 'Selection Intelligence',
    description: 'What a consideration and recommendation baseline covers, produces, and reports.',
  },
  {
    href: routes.aiVisibilityToolOrPartner.path,
    label: 'Do You Need an AI Visibility Tool or a Partner?',
    description: 'What a monitoring subscription produces, and which jobs it leaves to a person.',
  },
]

export const closing = {
  title:
    'The category sells displacement of an incumbent. In this run there was no incumbent: 247 domains, 308 citation slots, and 86 percent of those domains cited exactly once. Ask any AI visibility score you are shown which run it came from, how many slots it counted, and what each engine contributed on its own.',
  primaryCta: {
    label: 'Establish a baseline through the Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'wgc_closing' },
  } satisfies Cta,
} as const
