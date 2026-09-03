import { validateSelectionMapData } from '@/lib/selection-map/validate'
import type { SelectionMapData } from '@/lib/selection-map/schema'

/**
 * Plate 01 data (redesign 10 section 12; 04 Instrument content appendix).
 *
 * The nine definitions, the three questions with their context lines, the
 * state words, the intervention note and the Q1 text alternative are the 04
 * appendix verbatim. Q2 and Q3 follow 10 section 5 and 08 section 6: Brand A
 * is chosen in every question, Brand D is never visible, Your Brand carries
 * exactly one clearable gap, and Q3 is the resting frame that separates
 * shortlisted from chosen (10 decision 10.11; 04 appendix amended 2026-09-02).
 *
 * Drawing rows are the fourth-pass order (10 section 5): the chosen brand, any
 * brand shortlisted and not chosen, Your Brand, then the rest, so the bracket
 * spans adjacent rows at rest and grows by one adjacent row under the
 * intervention. Q3 overrides the rows with `drawingOrder`.
 *
 * Everything here is illustrative. No real company, publication or AI system
 * is named, and no value is drawn at Selection or Impact (CANON section 5).
 *
 * Content gate: the Q2 and Q3 text alternatives, live-region sentences and
 * the Q3 gloss are new copy in the Q1 pattern (08 section 6; handoff 3.C
 * item 4) and render nowhere but the fixture route until their rows are
 * approved.
 */

const interventionNote =
  'Illustrative. An intervention changes conditions the brand controls. The outcome shown is not a guarantee and not a client result.'

const selectionImpactNote = 'measured after the change, not drawn here'
const interventionOff = 'Illustrative intervention off. The default state is shown.'

export const selectionMapData = {
  version: '10.1',
  stages: [
    { id: 'need', label: 'Customer need', definition: 'What the customer is trying to accomplish, in their own words.', class: 'observed' },
    { id: 'context', label: 'Context', definition: 'Who has the need, under what conditions, and how far along the decision they are.', class: 'observed' },
    { id: 'discovery', label: 'Discovery', definition: 'Whether search and AI systems can find the brand at all for this need.', class: 'observed' },
    { id: 'understanding', label: 'Understanding', definition: 'Whether those systems describe the brand accurately once they find it.', class: 'observed' },
    { id: 'evidence', label: 'Evidence', definition: 'The sources and claims that support or undercut the brand for this need. (Collapses Relevance and Trust.)', class: 'observed' },
    { id: 'consideration', label: 'Consideration', definition: 'Whether the brand is presented as a legitimate option.', class: 'observed' },
    { id: 'recommendation', label: 'Recommendation', definition: 'Whether the brand is favored or shortlisted over the others.', class: 'observed' },
    { id: 'selection', label: 'Selection', definition: 'Whether the customer chooses the brand. Measured, not observed.', class: 'measured' },
    { id: 'impact', label: 'Impact', definition: 'Whether the choice shows up in behavior, pipeline, or revenue. Measured, not observed.', class: 'measured' },
  ],
  brands: [
    { id: 'brandA', label: 'Brand A', yourBrand: false, drawingRow: 0 },
    { id: 'brandB', label: 'Brand B', yourBrand: false, drawingRow: 2 },
    { id: 'yourBrand', label: 'Your Brand', yourBrand: true, drawingRow: 1 },
    { id: 'brandC', label: 'Brand C', yourBrand: false, drawingRow: 3 },
    { id: 'brandD', label: 'Brand D', yourBrand: false, drawingRow: 4 },
  ],
  /* The six source types, lower case and word for word as CANON R12 lists them
   * and as the approved canvas renders them in the ledger. */
  sources: [
    { id: 'independent-review-site', label: 'independent review site' },
    { id: 'analyst-or-industry-report', label: 'analyst or industry report' },
    { id: 'brands-own-site', label: "brand's own site" },
    { id: 'community-thread', label: 'community thread' },
    { id: 'news-coverage', label: 'news coverage' },
    { id: 'documentation', label: 'documentation' },
  ],
  scenarios: [
    {
      id: 'q1',
      default: true,
      question: 'Which workforce scheduling platform fits a regional logistics company running several depots on shift work?',
      context: 'Operations director, replacing a spreadsheet-based process across several depots, shortlisting now.',
      category: 'B2B platform',
      leansOn: ['independent-review-site', 'analyst-or-industry-report'],
      chosen: 'brandA',
      states: {
        brandA: {
          discovery: 'visible',
          understanding: 'accurate',
          evidence: { lanes: ['independent-review-site', 'analyst-or-industry-report', 'brands-own-site'], missing: [] },
          consideration: 'considered',
          recommendation: 'shortlisted',
          selection: 'outcome connected',
          impact: 'outcome connected',
          exitsAt: null,
        },
        brandB: {
          discovery: 'visible',
          understanding: 'misunderstood',
          understandingGloss: 'described as a payroll product, not scheduling',
          evidence: { lanes: ['brands-own-site'], missing: [] },
          consideration: 'not considered; exits',
          recommendation: '(exited)',
          selection: '(exited)',
          impact: '(exited)',
          exitsAt: 'consideration',
        },
        brandC: {
          discovery: 'visible',
          understanding: 'accurate',
          evidence: { lanes: ['documentation', 'brands-own-site'], missing: ['independent-review-site', 'analyst-or-industry-report'] },
          consideration: 'considered',
          recommendation: 'not shortlisted; exits',
          selection: '(exited)',
          impact: '(exited)',
          exitsAt: 'recommendation',
        },
        brandD: {
          discovery: 'not visible; exits',
          understanding: '(exited)',
          evidence: '(exited)',
          consideration: '(exited)',
          recommendation: '(exited)',
          selection: '(exited)',
          impact: '(exited)',
          exitsAt: 'discovery',
        },
        yourBrand: {
          discovery: 'visible',
          understanding: 'accurate',
          evidence: { lanes: ['community-thread', 'documentation', 'brands-own-site'], missing: ['independent-review-site'] },
          consideration: 'considered',
          recommendation: 'not shortlisted; exits',
          selection: '(exited)',
          impact: '(exited)',
          exitsAt: 'recommendation',
        },
      },
      intervention: {
        note: interventionNote,
        delta: {
          yourBrand: {
            evidence: { lanes: ['independent-review-site', 'community-thread', 'documentation', 'brands-own-site'], missing: [] },
            recommendation: 'shortlisted',
            exitsAt: null,
          },
        },
        selectionImpactNote,
      },
      textAlternative:
        'An illustrative diagram, not a client result. For the question "Which workforce scheduling platform fits a regional logistics company running several depots on shift work?", five sample brands enter a nine-step path from Customer need through Context, Discovery, Understanding, Evidence, Consideration, Recommendation, Selection, and Impact. Brand D is never found. Brand B is found but misunderstood as a payroll product and drops out before Consideration. Brand C and Your Brand are found and understood but each lacks evidence on an independent review site, and neither is shortlisted. Brand A is supported by an independent review site and an analyst report, is considered, is shortlisted, and its selection is linked to a measured outcome in the Impact Ledger. Six source types feed the Evidence step: independent review site, analyst or industry report, brand\'s own site, community thread, news coverage, and documentation. The first seven steps are observed in the answer; Selection and Impact are measured in the client\'s own systems, and no value is shown. No real company, publication, or AI system is named.',
      announce: {
        resting:
          'Question 1 of 3. Brand A reaches the shortlist and is connected to a measured outcome. Your Brand is considered but not shortlisted; evidence is missing on an independent review site. Brand D is not visible.',
        interventionOn:
          "Illustrative intervention on. Your Brand's independent review site lane is filled and Your Brand reaches the shortlist. Selection and Impact are not drawn.",
        interventionOff,
      },
    },
    {
      id: 'q2',
      default: false,
      question: 'Who should a manufacturer hire to inspect and recertify pressure vessels across several plants without stopping production?',
      context: 'Plant maintenance manager, inspection due before the next scheduled outage, comparing bids.',
      category: 'Industrial service',
      leansOn: ['documentation', 'news-coverage'],
      chosen: 'brandA',
      states: {
        brandA: {
          discovery: 'visible',
          understanding: 'accurate',
          evidence: { lanes: ['documentation', 'news-coverage', 'brands-own-site'], missing: [] },
          consideration: 'considered',
          recommendation: 'shortlisted',
          selection: 'outcome connected',
          impact: 'outcome connected',
          exitsAt: null,
        },
        brandB: {
          discovery: 'visible',
          understanding: 'accurate',
          evidence: { lanes: ['community-thread'], missing: [] },
          consideration: 'not considered; exits',
          recommendation: '(exited)',
          selection: '(exited)',
          impact: '(exited)',
          exitsAt: 'consideration',
        },
        brandC: {
          discovery: 'visible',
          understanding: 'accurate',
          evidence: { lanes: ['documentation', 'brands-own-site'], missing: ['news-coverage'] },
          consideration: 'considered',
          recommendation: 'not shortlisted; exits',
          selection: '(exited)',
          impact: '(exited)',
          exitsAt: 'recommendation',
        },
        brandD: {
          discovery: 'not visible; exits',
          understanding: '(exited)',
          evidence: '(exited)',
          consideration: '(exited)',
          recommendation: '(exited)',
          selection: '(exited)',
          impact: '(exited)',
          exitsAt: 'discovery',
        },
        yourBrand: {
          discovery: 'visible',
          understanding: 'misunderstood',
          understandingGloss: 'described as a general inspection service, not pressure-vessel recertification',
          evidence: { lanes: ['brands-own-site', 'documentation'], missing: [] },
          consideration: 'not considered; exits',
          recommendation: '(exited)',
          selection: '(exited)',
          impact: '(exited)',
          exitsAt: 'consideration',
        },
      },
      intervention: {
        note: interventionNote,
        delta: {
          yourBrand: {
            understanding: 'accurate',
            evidence: { lanes: ['brands-own-site', 'documentation'], missing: [] },
            consideration: 'considered',
            recommendation: 'shortlisted',
            exitsAt: null,
          },
        },
        selectionImpactNote,
      },
      textAlternative:
        'An illustrative diagram, not a client result. For the question "Who should a manufacturer hire to inspect and recertify pressure vessels across several plants without stopping production?", five sample brands enter a nine-step path from Customer need through Context, Discovery, Understanding, Evidence, Consideration, Recommendation, Selection, and Impact. Brand D is never found. Your Brand is found but misunderstood as a general inspection service and drops out before Consideration. Brand B is found and understood, its only cited source is a community thread, and it is not considered. Brand C is found and understood but lacks evidence in news coverage, and is not shortlisted. Brand A is supported by documentation and news coverage, is considered, is shortlisted, and its selection is linked to a measured outcome in the Impact Ledger. Six source types feed the Evidence step: independent review site, analyst or industry report, brand\'s own site, community thread, news coverage, and documentation. The first seven steps are observed in the answer; Selection and Impact are measured in the client\'s own systems, and no value is shown. No real company, publication, or AI system is named.',
      announce: {
        resting:
          'Question 2 of 3. Brand A reaches the shortlist and is connected to a measured outcome. Your Brand is visible but misunderstood and is not considered; it is described as a general inspection service, not pressure-vessel recertification. Brand D is not visible.',
        interventionOn:
          "Illustrative intervention on. Your Brand's own site and documentation lanes are corrected, the misunderstanding clears, and Your Brand reaches the shortlist. Selection and Impact are not drawn.",
        interventionOff,
      },
    },
    {
      id: 'q3',
      default: false,
      question: 'Which executive search firm should a family-owned company use to replace a retiring chief financial officer?',
      context: 'Board member, first retained search the company has run, deciding this quarter.',
      category: 'Professional service, described generically',
      leansOn: ['independent-review-site', 'community-thread'],
      drawingOrder: ['brandA', 'brandC', 'yourBrand', 'brandB', 'brandD'],
      chosen: 'brandA',
      states: {
        brandA: {
          discovery: 'visible',
          understanding: 'accurate',
          evidence: { lanes: ['independent-review-site', 'community-thread', 'brands-own-site'], missing: [] },
          consideration: 'considered',
          recommendation: 'shortlisted',
          selection: 'outcome connected',
          impact: 'outcome connected',
          exitsAt: null,
        },
        brandB: {
          discovery: 'visible',
          understanding: 'misunderstood',
          understandingGloss: 'described as a contingency recruiter, not a retained search firm',
          evidence: { lanes: ['brands-own-site'], missing: [] },
          consideration: 'not considered; exits',
          recommendation: '(exited)',
          selection: '(exited)',
          impact: '(exited)',
          exitsAt: 'consideration',
        },
        brandC: {
          discovery: 'visible',
          understanding: 'accurate',
          evidence: { lanes: ['community-thread', 'brands-own-site'], missing: ['independent-review-site'] },
          consideration: 'considered',
          recommendation: 'shortlisted',
          selection: 'shortlisted; not chosen',
          impact: '(not chosen)',
          exitsAt: null,
        },
        brandD: {
          discovery: 'not visible; exits',
          understanding: '(exited)',
          evidence: '(exited)',
          consideration: '(exited)',
          recommendation: '(exited)',
          selection: '(exited)',
          impact: '(exited)',
          exitsAt: 'discovery',
        },
        yourBrand: {
          discovery: 'visible',
          understanding: 'accurate',
          evidence: { lanes: ['independent-review-site', 'brands-own-site', 'documentation'], missing: ['community-thread'] },
          consideration: 'considered',
          recommendation: 'not shortlisted; exits',
          selection: '(exited)',
          impact: '(exited)',
          exitsAt: 'recommendation',
        },
      },
      intervention: {
        note: interventionNote,
        delta: {
          yourBrand: {
            evidence: { lanes: ['independent-review-site', 'community-thread', 'brands-own-site', 'documentation'], missing: [] },
            recommendation: 'shortlisted',
            exitsAt: null,
          },
        },
        selectionImpactNote,
      },
      textAlternative:
        'An illustrative diagram, not a client result. For the question "Which executive search firm should a family-owned company use to replace a retiring chief financial officer?", five sample brands enter a nine-step path from Customer need through Context, Discovery, Understanding, Evidence, Consideration, Recommendation, Selection, and Impact. Brand D is never found. Brand B is found but misunderstood as a contingency recruiter and drops out before Consideration. Brand C and Your Brand are found and understood. Brand C lacks evidence on an independent review site, reaches the shortlist, and is not chosen. Your Brand lacks evidence in a community thread and is not shortlisted. Brand A is supported by an independent review site and a community thread, is considered, is shortlisted, and its selection is linked to a measured outcome in the Impact Ledger. Six source types feed the Evidence step: independent review site, analyst or industry report, brand\'s own site, community thread, news coverage, and documentation. The first seven steps are observed in the answer; Selection and Impact are measured in the client\'s own systems, and no value is shown. No real company, publication, or AI system is named.',
      announce: {
        resting:
          'Question 3 of 3. Brand A reaches the shortlist and is connected to a measured outcome. Brand C reaches the shortlist and is not chosen. Your Brand is considered but not shortlisted; evidence is missing in a community thread. Brand D is not visible.',
        interventionOn:
          "Illustrative intervention on. Your Brand's community thread lane is filled and Your Brand reaches the shortlist. Selection and Impact are not drawn.",
        interventionOff,
      },
    },
  ],
} as const satisfies SelectionMapData

const errors = validateSelectionMapData(selectionMapData)
if (errors.length > 0) {
  throw new Error(`selection-map-data violates the 10 section 12 invariants:\n${errors.join('\n')}`)
}
