/**
 * The content gate (redesign handoff 4.7 rule 9).
 *
 * A line the redesign marks new or variant may not be published until Brandon
 * Lincoln Hendricks records its row in `CONTENT_VERIFICATION.md` as `approved`.
 * Until then the page renders the approved line the new one replaces, so a
 * visitor and a crawler always read published copy and never a proposal.
 *
 * This file is the register, and the only file in the tree allowed to hold a
 * proposal. A page object asks it for a line by name and receives whichever of
 * the two is publishable today, which is why `src/content/pages/home.ts` reads
 * as approved copy from top to bottom.
 *
 * The pairs below are transcribed from the decisions table of
 * `04-homepage-narrative-and-copy.md`: `proposed` is the new or variant line,
 * `approved` is the exact sentence that table names as the one it replaces.
 * An addition has no approved predecessor, so its fallback is to render
 * nothing.
 *
 * `scripts/validate-content.ts` closes the loop three ways: it parses
 * `CONTENT_VERIFICATION.md` and fails when a status here disagrees with the
 * register, it fails when a proposal appears in any file but this one while
 * its row is pending, and it fails when a row named here has no row there.
 *
 * Publishing a line is therefore a two-line change: the register row, then the
 * status below.
 */

export type GateStatus = 'pending' | 'approved' | 'blocked'

/** F2, the founder proof line, plus H1 to H17, the 04 decisions table. */
export type GateRow =
  | 'F2'
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  | 'H5'
  | 'H6'
  | 'H7'
  | 'H8'
  | 'H9'
  | 'H10'
  | 'H11'
  | 'H12'
  | 'H13'
  | 'H14'
  | 'H15'
  | 'H16'
  | 'H17'

/**
 * Row statuses, transcribed from `CONTENT_VERIFICATION.md`.
 *
 * F2's row reads "wording approved, start year pending". It is not `approved`,
 * so the numberless proof line ships (CANON R5). The type is written out
 * rather than inferred, so a status can be compared against every legend word
 * instead of only against the one value it holds today.
 */
export const gateStatus: Record<GateRow, GateStatus> = {
  F2: 'pending',
  H1: 'pending',
  H2: 'pending',
  H3: 'pending',
  H4: 'pending',
  H5: 'pending',
  H6: 'pending',
  H7: 'pending',
  H8: 'pending',
  H9: 'pending',
  H10: 'pending',
  H11: 'pending',
  H12: 'pending',
  H13: 'pending',
  H14: 'pending',
  H15: 'pending',
  H16: 'pending',
  H17: 'pending',
}


export function isApproved(row: GateRow): boolean {
  return gateStatus[row] === 'approved'
}

/**
 * The proposed value while its row is approved, the approved value it replaces
 * while it is not.
 *
 * Generic, because a decision can gate a shape rather than a sentence: H10 is
 * the ladder's Trust rung and its third column together, and its fallback is
 * the approved seven-rung ladder without that column.
 */
export function gated<T>(row: GateRow, proposed: T, approvedFallback: T): T {
  return isApproved(row) ? proposed : approvedFallback
}

type Replacement = {
  row: GateRow
  proposed: string
  /** The approved sentence 04's decisions table names as the one replaced. */
  approved: string
  /**
   * Files where this exact sentence is already published for a different page.
   * A row gates a line in a place, not a sequence of words: the /for-brands H1
   * is published there and proposed here, and the check has to tell them apart.
   */
  approvedOn?: readonly string[]
}

/** A line that adds to the page rather than replacing one. */
type Addition = {
  row: GateRow
  proposed: string
}

/**
 * Homepage lines that replace an approved line. Keyed by the slot that renders
 * them, so a reader of `home.ts` can find the decision behind any sentence.
 */
const replacements = {
  heroEyebrow: {
    row: 'H1',
    proposed: 'Search Intelligence Engineering for the AI Era.',
    approved: 'Search Intelligence Engineering',
    // The category line is a locked string published site-wide (CANON section
    // 2); H1 gates its use as the hero eyebrow, not the sentence itself. It is
    // also the H1 this row's fallback keeps, so the copy mirror carries it.
    approvedOn: ['src/config/site.ts', 'content/pages/01-home.md'],
  },
  heroTitle: {
    row: 'H1',
    proposed: 'Engineer the path from customer demand to brand selection.',
    approved: 'Search Intelligence Engineering for the AI Era.',
  },
  heroLead: {
    row: 'H2',
    proposed:
      'Hendricks finds the customer decisions worth winning, measures whether your brand is considered across Google and AI search, engineers the conditions your brand controls, and connects the work to pipeline and revenue.',
    approved:
      'Hendricks maps the questions and decisions that drive your market, measures whether your brand enters the consideration set, improves the conditions that shape visibility and trust, and connects the work to pipeline and revenue.',
  },
  heroBoundary: {
    row: 'H3',
    proposed:
      'Hendricks is a Search Intelligence Engineering firm: a specialist consultancy and engineering partner, not software and not an SEO agency. It works with brands where search shapes a valuable purchase, shortlist, or account, and with agencies that need this capability without building it in-house.',
    approved:
      'For organizations where search materially affects a valuable purchase, shortlist, appointment, demo, or customer relationship.',
  },
  heroSecondaryCta: {
    row: 'H5',
    proposed: 'See the Demand-to-Selection System',
    approved: 'See What Hendricks Actually Does',
  },
  heroProofLine: {
    row: 'F2',
    proposed:
      'Built from more than fifteen years of enterprise search, paid and organic acquisition, analytics, and search operating systems.',
    approved:
      'Built from enterprise search, paid and organic acquisition, analytics, and search operating systems.',
    approvedOn: ['src/content/pages/about.ts', 'content/pages/11-about.md'],
  },
  problemTitle: {
    row: 'H6',
    proposed: 'The most important search loss may happen before a customer visits your website.',
    approved: 'Brands are losing control over the path between being discovered and being chosen.',
  },
  problemContrast: {
    row: 'H7',
    proposed:
      'Traditional search measured whether a brand ranked. Hendricks measures and engineers whether a brand becomes a legitimate choice.',
    approved: 'Most organizations have major blind spots across that path.',
  },
  systemTitle: {
    row: 'H8',
    proposed: 'Find the gap. Change the conditions. Measure what happens.',
    approved: 'We find where you are being excluded, change the conditions, and measure what happens.',
  },
  systemLead: {
    row: 'H8',
    proposed:
      'It runs the Demand-to-Selection System: four phases that map demand, observe selection, engineer the presence, and measure impact.',
    approved: 'We build an evidence-based system that answers four business questions.',
  },
  phaseDemand: {
    row: 'H9',
    proposed: 'Which questions and decisions carry commercial value.',
    approved:
      'Determine what customers are trying to accomplish, what they search and ask, how those needs differ by context, and which decisions have commercial value.',
  },
  phaseSelection: {
    row: 'H9',
    proposed: 'Absent, referenced, considered, or recommended.',
    approved:
      'Measure whether the brand is absent, referenced, considered, or recommended across controlled customer contexts, platforms, competitors, and time periods.',
  },
  phasePresence: {
    row: 'H9',
    proposed: 'Improve the conditions a brand controls, and only those.',
    approved:
      'Identify and implement the technical, entity, content, evidence, authority, acquisition, and conversion improvements most likely to close valuable gaps.',
  },
  phaseImpact: {
    row: 'H9',
    proposed: 'Re-run the baseline and connect it to revenue.',
    approved:
      'Connect changes in search and AI visibility with customer behavior, branded demand, qualified leads, opportunities, pipeline, and revenue.',
  },
  outputsEyebrow: {
    row: 'H11',
    proposed: 'Evidence and Outputs',
    approved: 'Decisions, Not More Reports',
  },
  outputsTitle: {
    row: 'H11',
    proposed: 'Decisions, not another dashboard.',
    approved:
      'Every output should tell the organization what happened, why it matters, and what to do next.',
  },
  brandsTitle: {
    row: 'H13',
    proposed: 'Turn fragmented search investment into a system for winning consideration.',
    approved: 'Turn fragmented search investment into a path to selection.',
    approvedOn: ['src/content/pages/for-brands.ts', 'content/pages/09-for-brands.md'],
  },
  brandsBody: {
    row: 'H13',
    proposed:
      'Your organization manages it through separate channels, teams, and agencies. Hendricks connects those fragments around customer demand and measurable selection.',
    approved:
      'Connect demand, traditional search, AI visibility, paid media, organic performance, evidence, analytics, and revenue.',
  },
  brandsCta: {
    row: 'H13',
    proposed: 'Explore Hendricks for Brands',
    approved: 'Hendricks for Brands',
  },
  agenciesTitle: {
    row: 'H14',
    proposed: 'Add Search Intelligence to your agency without building the entire capability in-house.',
    approved: 'Add specialized Search Intelligence without building the complete capability in-house.',
    approvedOn: ['src/content/pages/for-agencies.ts', 'content/pages/10-for-agencies.md'],
  },
  evidenceTitle: {
    row: 'H15',
    proposed: 'We separate what is observed, inferred, measured, and tested.',
    approved: 'We separate what is observed, inferred, measured, and proven.',
  },
  diagnosticTitle: {
    row: 'H16',
    proposed: 'Begin with evidence, not an open-ended retainer.',
    approved:
      'Direct engagements begin with a fixed-scope diagnostic, not an open-ended retainer.',
  },
  founderDeliveryModel: {
    row: 'H17',
    proposed:
      'Every engagement runs on the Demand-to-Selection System, a published method with one question and one named output at each stage.',
    approved: 'Each stage has one question and one named output.',
  },
} as const satisfies Record<string, Replacement>

/** Homepage lines that add to the page. Nothing renders in their slot while pending. */
const additions = {
  heroDefiner: {
    row: 'H4',
    proposed:
      'A fixed-scope engagement of approximately three to four weeks that establishes where your brand is losing consideration and what to change first.',
  },
  ladderCitationNote: {
    row: 'H10',
    proposed:
      'A citation is an observed input to consideration, not a stage the customer passes through.',
  },
  outputsClosing: {
    row: 'H11',
    proposed:
      'Each preview here carries its evidence class, so a reader can tell an observation from an inference without asking.',
  },
  decisionDemandMap: {
    row: 'H12',
    proposed: 'Which customer decisions are worth winning, and what each is worth.',
  },
  decisionIntentContext: {
    row: 'H12',
    proposed: 'Which customer situations to measure, plan, and write for.',
  },
  decisionSelectionMap: {
    row: 'H12',
    proposed: 'Where the brand enters or leaves consideration, against which competitors.',
  },
  decisionCompetitorMatrix: {
    row: 'H12',
    proposed: 'Which competitors win which decisions, and on what evidence.',
  },
  decisionEvidenceGraph: {
    row: 'H12',
    proposed: 'Which sources shape the answers, and which claims carry no evidence.',
  },
  decisionSelectionGap: {
    row: 'H12',
    proposed:
      'How much valuable consideration the brand is losing, and what closing it is worth.',
  },
  decisionRoadmap: {
    row: 'H12',
    proposed: 'What to change first, who owns it, and how it is measured.',
  },
  decisionImpactLedger: {
    row: 'H12',
    proposed: 'Whether behavior, pipeline, or revenue changed, and with what confidence.',
  },
} as const satisfies Record<string, Addition>

/** The publishable form of a line that replaces an approved one. */
export function line(key: keyof typeof replacements): string {
  const entry = replacements[key]
  return isApproved(entry.row) ? entry.proposed : entry.approved
}

/** The publishable form of a line that adds to the page, or `null` while pending. */
export function addition(key: keyof typeof additions): string | null {
  const entry = additions[key]
  return isApproved(entry.row) ? entry.proposed : null
}

/**
 * Every sentence that is already approved copy.
 *
 * A row gates a line in a slot, not a sequence of words, so one row's proposal
 * can be another slot's approved fallback: H1 proposes the category line as the
 * hero eyebrow, and that same sentence is the approved H1 the row's own
 * fallback keeps. Presence of such a string in the page proves nothing about
 * whether the proposal published, which is why the early-publishing check
 * discounts it. This is the in-memory counterpart of the `approvedOn` list
 * `check:content` uses to allow the same collision on disk.
 */
export const APPROVED_LINES: ReadonlySet<string> = new Set(
  Object.values(replacements).map((entry) => entry.approved),
)

/** Every proposal, for `check:content`. */
export const GATED_STRINGS: readonly {
  row: GateRow
  text: string
  approvedOn: readonly string[]
}[] = [
  ...Object.values(replacements).map((entry) => ({
    row: entry.row,
    text: entry.proposed,
    approvedOn: 'approvedOn' in entry ? entry.approvedOn : ([] as readonly string[]),
  })),
  ...Object.values(additions).map((entry) => ({
    row: entry.row,
    text: entry.proposed,
    approvedOn: [] as readonly string[],
  })),
]
