import {
  BRAND_IDS,
  BRAND_STAGES,
  SOURCE_IDS,
  type BrandId,
  type BrandStates,
  type Scenario,
  type SelectionMapData,
} from './schema'

/**
 * The 10 section 12 invariants, asserted on every scenario at load and in
 * `tests/unit/selection-map-data.test.ts` against a seeded bad fixture.
 * Returns one message per violation; an empty array means the data is valid.
 */

/** Every word the enums admit; each must appear at least once per scenario. */
const STATE_WORDS = [
  'visible',
  'not visible; exits',
  'accurate',
  'misunderstood',
  'considered',
  'not considered; exits',
  'shortlisted',
  'not shortlisted; exits',
  'outcome connected',
  '(exited)',
  'evidence missing',
] as const

/** The two Q3-only words; required there, permitted absent elsewhere. */
const Q3_WORDS = ['shortlisted; not chosen', '(not chosen)'] as const

const sourceIds = new Set<string>(SOURCE_IDS)

function missingLanes(states: BrandStates): readonly string[] {
  return states.evidence === '(exited)' ? [] : states.evidence.missing
}

function wordsOf(states: BrandStates): Set<string> {
  const words = new Set<string>()
  for (const stage of BRAND_STAGES) {
    if (stage === 'evidence') {
      words.add(states.evidence === '(exited)' ? '(exited)' : missingLanes(states).length ? 'evidence missing' : 'evidence present')
      continue
    }
    words.add(states[stage])
  }
  return words
}

/** The first stage carrying an exit word, so `exitsAt` can be checked against the row. */
function exitStageOf(states: BrandStates): string | null {
  if (states.discovery === 'not visible; exits') return 'discovery'
  if (states.consideration === 'not considered; exits') return 'consideration'
  if (states.recommendation === 'not shortlisted; exits') return 'recommendation'
  return null
}

function validateScenario(scenario: Scenario, errors: string[]) {
  const { states } = scenario
  const at = (message: string) => errors.push(`${scenario.id}: ${message}`)

  if (scenario.chosen !== 'brandA') at('chosen must be brandA')
  if (states.brandA.selection !== 'outcome connected' || states.brandA.impact !== 'outcome connected') {
    at('Brand A selection and impact must be "outcome connected"')
  }
  if (states.brandD.discovery !== 'not visible; exits') at('Brand D must be "not visible; exits"')

  // Only the chosen brand connects to an outcome. A second brand claiming one
  // would draw a second chosen ring, and the figure would say two brands were
  // selected for one customer need.
  for (const id of BRAND_IDS) {
    if (id === scenario.chosen) continue
    if (states[id].selection === 'outcome connected' || states[id].impact === 'outcome connected') {
      at(`${id} is not the chosen brand, so it may not be "outcome connected"`)
    }
  }

  const yourBrand = states.yourBrand
  const gaps = missingLanes(yourBrand).length + (yourBrand.understanding === 'misunderstood' ? 1 : 0)
  if (gaps !== 1) at(`Your Brand must carry exactly one clearable gap, has ${gaps}`)

  const delta = scenario.intervention.delta.yourBrand as Record<string, unknown>
  if ('selection' in delta || 'impact' in delta) at('the intervention delta must not touch selection or impact')
  if (yourBrand.understanding === 'misunderstood' && delta.understanding !== 'accurate') {
    at('the delta must clear the misunderstanding')
  }
  if (missingLanes(yourBrand).length > 0) {
    const cleared = scenario.intervention.delta.yourBrand.evidence?.missing.length === 0
    if (!cleared) at('the delta must clear the missing lane')
  }

  const seen = new Set<string>()
  for (const id of BRAND_IDS) {
    const brand = states[id]
    for (const word of wordsOf(brand)) seen.add(word)

    if (brand.evidence !== '(exited)') {
      for (const lane of [...brand.evidence.lanes, ...brand.evidence.missing, ...(brand.evidence.inferred ?? [])]) {
        if (!sourceIds.has(lane)) at(`${id} names an unknown source "${lane}"`)
      }
    }

    // Two geometry invariants from the 10 section 4 band assignment: a second
    // word in the same upper band would collide with the first.
    if (brand.understanding === 'misunderstood' && missingLanes(brand).length > 0) {
      at(`${id} is both misunderstood and gapped; the two words share an upper band`)
    }
    if (brand.consideration === 'not considered; exits' && missingLanes(brand).length > 0) {
      at(`${id} exits at Consideration and carries a gap; the exit word and the cross share a band`)
    }

    if (exitStageOf(brand) !== brand.exitsAt) {
      at(`${id} exitsAt "${brand.exitsAt}" does not match its exit word`)
    }

    if (brand.selection === 'shortlisted; not chosen') {
      if (brand.recommendation !== 'shortlisted' || brand.impact !== '(not chosen)' || brand.exitsAt !== null) {
        at(`${id} is shortlisted and not chosen, so it must be shortlisted, "(not chosen)" at Impact and carry no exit`)
      }
      const order = scenario.drawingOrder
      const chosenIndex = order?.indexOf(scenario.chosen) ?? -1
      const yourIndex = order?.indexOf('yourBrand') ?? -1
      const ownIndex = order?.indexOf(id) ?? -1
      if (!order || ownIndex !== chosenIndex + 1 || yourIndex !== ownIndex + 1) {
        at(`${id} is shortlisted and not chosen, so drawingOrder must place it directly after the chosen brand and before Your Brand`)
      }
    }
  }

  for (const word of STATE_WORDS) {
    if (!seen.has(word)) at(`state word never appears: "${word}"`)
  }
  if (scenario.id === 'q3') {
    for (const word of Q3_WORDS) {
      if (!seen.has(word)) at(`state word never appears: "${word}"`)
    }
  }

  if (scenario.drawingOrder) {
    const unique = new Set<BrandId>(scenario.drawingOrder)
    if (scenario.drawingOrder.length !== 5 || unique.size !== 5) at('drawingOrder must list each of the five brands once')
  }
}

export function validateSelectionMapData(data: SelectionMapData): string[] {
  const errors: string[] = []

  const rows = new Set(data.brands.map((brand) => brand.drawingRow))
  if (data.brands.length !== 5 || rows.size !== 5) errors.push('brands must carry the drawing rows 0 to 4 once each')
  if (data.stages.length !== 9) errors.push('stages must be the nine 04 nodes')
  if (data.sources.length !== 6) errors.push('sources must be the six R12 types')

  const defaults = data.scenarios.filter((scenario) => scenario.default)
  if (defaults.length !== 1 || data.scenarios[0]?.default !== true) {
    errors.push('exactly one scenario is the default, and it is the first')
  }

  for (const scenario of data.scenarios) validateScenario(scenario, errors)
  return errors
}
