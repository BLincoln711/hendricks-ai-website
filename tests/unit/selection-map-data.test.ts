import { describe, expect, it } from 'vitest'

import { selectionMapData } from '@/content/instruments/selection-map-data'
import { resolveScenario } from '@/lib/selection-map/resolve'
import { BRAND_IDS, SOURCE_IDS, STAGE_IDS, type Scenario, type SelectionMapData } from '@/lib/selection-map/schema'
import { validateSelectionMapData } from '@/lib/selection-map/validate'

/**
 * The data contract (redesign 10 section 12). Two halves: the shipped data
 * satisfies every invariant, and the validator actually catches a violation.
 *
 * The second half is the one that earns its place. A validator that is never
 * shown a bad input is a validator nobody has tested, and the failure it is
 * there to prevent, a drawing that quietly says something the copy does not,
 * is exactly the kind that ships unnoticed.
 */

/** A deep, mutable copy, so a seeded violation cannot leak into another test. */
function clone(): SelectionMapData {
  return JSON.parse(JSON.stringify(selectionMapData)) as SelectionMapData
}

function seed(mutate: (scenario: Scenario, data: SelectionMapData) => void): string[] {
  const data = clone()
  mutate(data.scenarios[0] as Scenario, data)
  return validateSelectionMapData(data)
}

describe('the shipped Selection Map data', () => {
  it('satisfies every section 12 invariant', () => {
    expect(validateSelectionMapData(selectionMapData)).toEqual([])
  })

  it('carries the nine stages, five brands and six source types, once each', () => {
    expect(selectionMapData.stages.map((stage) => stage.id)).toEqual([...STAGE_IDS])
    expect([...selectionMapData.brands.map((brand) => brand.id)].sort()).toEqual([...BRAND_IDS].sort())
    expect(selectionMapData.sources.map((source) => source.id)).toEqual([...SOURCE_IDS])
  })

  it('names no brand outside Brand A to Brand D and Your Brand', () => {
    expect(selectionMapData.brands.map((brand) => brand.label)).toEqual([
      'Brand A',
      'Brand B',
      'Your Brand',
      'Brand C',
      'Brand D',
    ])
  })

  it('opens on Q1 and never draws a value at Selection or Impact', () => {
    expect(selectionMapData.scenarios[0].id).toBe('q1')
    expect(selectionMapData.scenarios[0].default).toBe(true)
    for (const scenario of selectionMapData.scenarios) {
      expect(scenario.intervention.selectionImpactNote).toBe('measured after the change, not drawn here')
      expect(Object.keys(scenario.intervention.delta.yourBrand)).not.toContain('selection')
      expect(Object.keys(scenario.intervention.delta.yourBrand)).not.toContain('impact')
    }
  })

  it('clears exactly Your Brand’s one gap under the intervention, in every question', () => {
    for (const scenario of selectionMapData.scenarios) {
      const before = resolveScenario(selectionMapData, scenario, false).byId.yourBrand
      const after = resolveScenario(selectionMapData, scenario, true).byId.yourBrand

      // Where the gap is, and so where the track ends, differs by question:
      // Q2's Your Brand is misunderstood and leaves before Consideration.
      expect(before.exitsAt).not.toBeNull()
      expect(after.recommendation).toBe('shortlisted')
      expect(after.exitsAt).toBeNull()
      // The change never reaches the two measured stages, which is the claim
      // the caption makes and the drawing has to keep.
      expect(after.selection).toBe('(exited)')
      expect(after.impact).toBe('(exited)')
    }
  })

  it('keeps the shortlist bracket on adjacent rows, at rest and under the intervention', () => {
    for (const scenario of selectionMapData.scenarios) {
      for (const intervention of [false, true]) {
        const rows = resolveScenario(selectionMapData, scenario, intervention)
          .rows.filter((brand) => brand.recommendation === 'shortlisted')
          .map((brand) => brand.row)
        expect(rows.length).toBeGreaterThan(0)
        expect(Math.max(...rows) - Math.min(...rows)).toBe(rows.length - 1)
      }
    }
  })
})

describe('the section 12 validator', () => {
  it('catches a brand that is not chosen but connected to an outcome', () => {
    expect(seed((scenario) => void (scenario.states.brandC.selection = 'outcome connected'))).not.toEqual([])
  })

  it('catches Brand D becoming visible', () => {
    const errors = seed((scenario) => void (scenario.states.brandD.discovery = 'visible'))
    expect(errors.join(' ')).toContain('Brand D')
  })

  it('catches Your Brand carrying a second clearable gap', () => {
    const errors = seed((scenario) => void (scenario.states.yourBrand.understanding = 'misunderstood'))
    expect(errors.join(' ')).toContain('exactly one clearable gap')
  })

  it('catches an intervention that reaches Selection', () => {
    const errors = seed((scenario) => {
      ;(scenario.intervention.delta.yourBrand as Record<string, unknown>).selection = 'outcome connected'
    })
    expect(errors.join(' ')).toContain('must not touch selection or impact')
  })

  it('catches a lane that names a source outside the six types', () => {
    const errors = seed((scenario) => {
      const evidence = scenario.states.brandA.evidence
      if (evidence !== '(exited)') (evidence.lanes as string[]).push('a named publication')
    })
    expect(errors.join(' ')).toContain('unknown source')
  })

  it('catches a state word that no brand shows', () => {
    const errors = seed((scenario) => void (scenario.states.brandB.understanding = 'accurate'))
    expect(errors.join(' ')).toContain('misunderstood')
  })

  it('catches two words competing for one band', () => {
    const errors = seed((scenario) => {
      const evidence = scenario.states.brandB.evidence
      if (evidence !== '(exited)') (evidence.missing as string[]).push('news-coverage')
    })
    expect(errors.join(' ')).toContain('share a band')
  })
})
