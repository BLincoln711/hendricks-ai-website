import {
  BRAND_IDS,
  BRAND_STAGES,
  type Brand,
  type BrandId,
  type BrandStage,
  type BrandStates,
  type Evidence,
  type Scenario,
  type SelectionMapData,
  type SourceId,
} from './schema'

/**
 * The one piece of state logic behind Plate 01 (08 section 3.4 `resolve`,
 * ported): applies the intervention delta to Your Brand when on and derives
 * the fields the drawing, ledger, key and list view read. Pure, so the server
 * frame and any client re-render come from the same function.
 */

export type ResolvedBrand = BrandStates & {
  id: BrandId
  label: Brand['label']
  yourBrand: boolean
  /** Top-to-bottom drawing row for this scenario. */
  row: number
  chosen: boolean
  /** Index into `BRAND_STAGES` of the last stage the track reaches; -1 if none. */
  reach: number
}

export type ResolvedScenario = {
  scenario: Scenario
  intervention: boolean
  /** In drawing order, top to bottom. */
  rows: readonly ResolvedBrand[]
  byId: Record<BrandId, ResolvedBrand>
}

function drawingOrder(data: SelectionMapData, scenario: Scenario): readonly BrandId[] {
  if (scenario.drawingOrder) return scenario.drawingOrder
  return [...data.brands].sort((a, b) => a.drawingRow - b.drawingRow).map((brand) => brand.id)
}

/** Your Brand's states with the intervention applied, or the states unchanged. */
function applyDelta(scenario: Scenario, id: BrandId, base: BrandStates, intervention: boolean): BrandStates {
  if (!intervention || id !== 'yourBrand') return base

  const change = scenario.intervention.delta.yourBrand
  return {
    ...base,
    ...(change.understanding ? { understanding: change.understanding } : null),
    ...(change.evidence ? { evidence: change.evidence } : null),
    ...(change.consideration ? { consideration: change.consideration } : null),
    ...(change.recommendation ? { recommendation: change.recommendation } : null),
    ...('exitsAt' in change ? { exitsAt: change.exitsAt ?? null } : null),
  }
}

function reachOf(states: BrandStates, chosen: boolean): number {
  let reach = -1
  for (let index = 0; index < BRAND_STAGES.length; index += 1) {
    const stage = BRAND_STAGES[index]
    if (states[stage] === '(exited)') break
    reach = index
    if (states.exitsAt === stage) break
    // Shortlisted and not chosen: the track ends inside the bracket.
    if (stage === 'recommendation' && !chosen) break
  }
  return reach
}

export function resolveScenario(
  data: SelectionMapData,
  scenario: Scenario,
  intervention = false,
): ResolvedScenario {
  const order = drawingOrder(data, scenario)
  const byId = {} as Record<BrandId, ResolvedBrand>

  for (const id of BRAND_IDS) {
    const brand = data.brands.find((candidate) => candidate.id === id)!
    const states = applyDelta(scenario, id, scenario.states[id], intervention)
    const chosen = scenario.chosen === id
    byId[id] = {
      ...states,
      id,
      label: brand.label,
      yourBrand: brand.yourBrand,
      row: order.indexOf(id),
      chosen,
      reach: reachOf(states, chosen),
    }
  }

  return { scenario, intervention, rows: order.map((id) => byId[id]), byId }
}

function stageIndex(stage: BrandStage): number {
  return BRAND_STAGES.indexOf(stage)
}

export function reaches(brand: ResolvedBrand, stage: BrandStage): boolean {
  return brand.reach >= stageIndex(stage)
}

export function evidenceOf(brand: ResolvedBrand): Evidence | null {
  return brand.evidence === '(exited)' ? null : brand.evidence
}

export function hasGap(brand: ResolvedBrand): boolean {
  return (evidenceOf(brand)?.missing.length ?? 0) > 0
}

/**
 * The word the drawing writes for a brand at a stage, or null where the
 * observed node itself is the word ("accurate", "considered") or the bracket is
 * ("shortlisted"), which appear in the list view only (10 section 5).
 */
export function drawnWord(brand: ResolvedBrand, stage: BrandStage): string | null {
  if (!reaches(brand, stage)) return null
  switch (stage) {
    case 'discovery':
      return brand.discovery
    case 'understanding':
      return brand.understanding === 'misunderstood' ? 'misunderstood' : null
    case 'evidence':
      return hasGap(brand) ? 'evidence missing' : null
    case 'consideration':
      return brand.consideration === 'not considered; exits' ? brand.consideration : null
    case 'recommendation':
      return brand.recommendation === 'not shortlisted; exits' ? brand.recommendation : null
    case 'selection':
    case 'impact':
      return brand.chosen ? 'outcome connected' : null
  }
}

/** The classes, then the state marks, in the canvas's key order. */
export const KEY_ITEMS = ['observed', 'measured', 'gap', 'misunderstood', 'exits'] as const
export type KeyItem = (typeof KEY_ITEMS)[number]

/** The marks the frame actually draws, in the canvas order. */
export function keyItemsOf(resolved: ResolvedScenario): KeyItem[] {
  const has = { observed: true, measured: false, gap: false, misunderstood: false, exits: false }
  for (const brand of resolved.rows) {
    if (brand.chosen) has.measured = true
    if (reaches(brand, 'evidence') && hasGap(brand)) has.gap = true
    if (reaches(brand, 'understanding') && brand.understanding === 'misunderstood') has.misunderstood = true
    if (brand.exitsAt) has.exits = true
  }
  return KEY_ITEMS.filter((item) => has[item])
}

export type LedgerRow = {
  source: { id: SourceId; label: string }
  /**
   * Brands that cite the lane, in drawing order, which is the order the
   * approved canvas renders them in. A reader cross-reading a row against the
   * figure then reads the names top to bottom as the tracks are stacked. The
   * 04 appendix lists them alphabetically with Your Brand last; the canvas
   * wins, and this is where that conflict is recorded.
   */
  cited: readonly ResolvedBrand[]
  missing: readonly ResolvedBrand[]
}

/** One row per source type in the R12 order, with the brands it supports and the brands it is missing for. */
export function ledgerRowsOf(data: SelectionMapData, resolved: ResolvedScenario): LedgerRow[] {
  const listed = resolved.rows.filter((brand) => reaches(brand, 'evidence'))
  return data.sources.map((source) => ({
    source,
    cited: listed.filter((brand) => evidenceOf(brand)?.lanes.includes(source.id)),
    missing: listed.filter((brand) => evidenceOf(brand)?.missing.includes(source.id)),
  }))
}
