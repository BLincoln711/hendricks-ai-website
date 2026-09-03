/**
 * The Selection Map data contract (redesign 10 section 12): the shape of
 * `src/content/instruments/selection-map-data.ts`, the three-scenario data Plate 01
 * is drawn from. State strings are the 04 appendix words verbatim; the
 * drawing maps them to marks through 10 section 5, never to free text.
 *
 * Pure types and constants, importable from server and client code alike.
 */

export const STAGE_IDS = [
  'need',
  'context',
  'discovery',
  'understanding',
  'evidence',
  'consideration',
  'recommendation',
  'selection',
  'impact',
] as const
type StageId = (typeof STAGE_IDS)[number]

/** The seven stages a brand track can reach; Customer need and Context carry no brand state. */
export const BRAND_STAGES = [
  'discovery',
  'understanding',
  'evidence',
  'consideration',
  'recommendation',
  'selection',
  'impact',
] as const
export type BrandStage = (typeof BRAND_STAGES)[number]

export const BRAND_IDS = ['brandA', 'brandB', 'brandC', 'brandD', 'yourBrand'] as const
export type BrandId = (typeof BRAND_IDS)[number]

export const SOURCE_IDS = [
  'independent-review-site',
  'analyst-or-industry-report',
  'brands-own-site',
  'community-thread',
  'news-coverage',
  'documentation',
] as const
export type SourceId = (typeof SOURCE_IDS)[number]

type DiscoveryState = 'visible' | 'not visible; exits'
type UnderstandingState = 'accurate' | 'misunderstood' | '(exited)'
type ConsiderationState = 'considered' | 'not considered; exits' | '(exited)'
type RecommendationState = 'shortlisted' | 'not shortlisted; exits' | '(exited)'
type SelectionState = 'outcome connected' | 'shortlisted; not chosen' | '(exited)'
type ImpactState = 'outcome connected' | '(not chosen)' | '(exited)'
type ExitStage = 'discovery' | 'understanding' | 'evidence' | 'consideration' | 'recommendation'

export type Evidence = {
  lanes: readonly SourceId[]
  missing: readonly SourceId[]
  inferred?: readonly SourceId[]
}

export type BrandStates = {
  discovery: DiscoveryState
  understanding: UnderstandingState
  understandingGloss?: string
  evidence: Evidence | '(exited)'
  consideration: ConsiderationState
  recommendation: RecommendationState
  selection: SelectionState
  impact: ImpactState
  exitsAt: ExitStage | null
}

/** What the intervention changes for Your Brand; never Selection or Impact. */
type InterventionDelta = {
  understanding?: 'accurate'
  evidence?: Evidence
  consideration?: 'considered'
  recommendation?: 'shortlisted'
  exitsAt?: null
}

export type Scenario = {
  id: 'q1' | 'q2' | 'q3'
  default: boolean
  question: string
  context: string
  /** 04 appendix column; not rendered. */
  category?: string
  leansOn?: readonly SourceId[]
  /**
   * Top-to-bottom drawing rows for this scenario, overriding `brands[].drawingRow`.
   * Required whenever a brand is shortlisted and not chosen (Q3), so the
   * bracket spans adjacent rows at rest and with the intervention on.
   */
  drawingOrder?: readonly BrandId[]
  /** Data key only: the drawing announces the brand by name with "outcome connected". */
  chosen: 'brandA'
  states: Record<BrandId, BrandStates>
  intervention: {
    note: string
    delta: { yourBrand: InterventionDelta }
    selectionImpactNote: 'measured after the change, not drawn here'
  }
  textAlternative: string
  announce: { resting: string; interventionOn: string; interventionOff: string }
}

export type Stage = {
  id: StageId
  label: string
  definition: string
  class: 'observed' | 'measured'
}

export type Brand = {
  id: BrandId
  label: 'Brand A' | 'Brand B' | 'Brand C' | 'Brand D' | 'Your Brand'
  yourBrand: boolean
  drawingRow: 0 | 1 | 2 | 3 | 4
}

export type SelectionMapData = {
  version: string
  stages: readonly Stage[]
  brands: readonly Brand[]
  sources: readonly { id: SourceId; label: string }[]
  scenarios: readonly Scenario[]
}
