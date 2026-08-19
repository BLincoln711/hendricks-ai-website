import { describe, expect, it } from 'vitest'

import type { DataTableRow } from '@/components/ui/data-table'
import type { MetricDefinition } from '@/components/visuals/metric-definitions'
import * as evidenceGrades from '@/content/shared/evidence-grades'
import * as metrics from '@/content/shared/metrics'
import * as observedSystems from '@/content/shared/observed-systems'

/**
 * Guards on `src/content/shared/` (docs/17 §3.5, §3.7, §3.8).
 *
 * The shared modules exist because five pages stated the observed-systems
 * boundary in five wordings and two pages defined the same metrics in different
 * words. The refactor removes today's duplication. These tests are what stop it
 * coming back, because the duplication did not arrive by accident. Each page
 * needed to state a boundary and nothing stopped it writing the boundary fresh.
 */

/** Every string reachable from a module's exports. Comments are excluded by construction. */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(strings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings)
  return []
}

const modules = {
  'observed-systems.ts': observedSystems,
  'metrics.ts': metrics,
  'evidence-grades.ts': evidenceGrades,
} as const

describe('Shared metric definitions', () => {
  it('defines every metric it names', () => {
    // docs/12 §6 forbids publishing a metric without a definition.
    for (const metric of metrics.metricDefinitions) {
      expect(metric.name.trim().length).toBeGreaterThan(0)
      expect(metric.definition.trim().length).toBeGreaterThan(0)
    }
  })

  it('carries the five measures once each, in the definition page order', () => {
    expect(metrics.metricDefinitions.map((metric) => metric.name)).toEqual([
      'Observed Consideration Rate',
      'Observed Recommendation Rate',
      'Selection Stability',
      'Evidence Coverage',
      'Commercial Selection Gap',
    ])
  })

  it('states the unit for the three definitions the two pages disagreed on', () => {
    // docs/17 §3.7. The solutions-page wording won because it states a unit
    // rather than a frequency adverb. "How frequently" is the losing wording.
    for (const name of ['Observed Consideration Rate', 'Observed Recommendation Rate']) {
      const metric = metrics.metricDefinitions.find((item) => item.name === name)
      expect(metric?.definition).toContain('percentage of defined test contexts')
    }

    const stability = metrics.metricDefinitions.find(
      (metric) => metric.name === 'Selection Stability',
    )
    expect(stability?.definition).toContain('reasonable variations in context')

    for (const metric of metrics.metricDefinitions) {
      expect(metric.definition.toLowerCase()).not.toContain('how frequently')
    }
  })

  it('offers the baseline subset without Evidence Coverage', () => {
    expect(metrics.baselineMetricDefinitions.map((metric) => metric.name)).toEqual([
      'Observed Consideration Rate',
      'Observed Recommendation Rate',
      'Selection Stability',
      'Commercial Selection Gap',
    ])
  })

  it('stays renderable by MetricDefinitions', () => {
    const renderable: readonly MetricDefinition[] = metrics.metricDefinitions
    expect(renderable).toHaveLength(5)
  })
})

describe('Shared observed-systems boundary', () => {
  it('marks exactly three surfaces as observed', () => {
    // CONTENT_VERIFICATION A1 is a closed list. Three, and never a fourth.
    const observed = observedSystems.observedSystemRows.filter((row) => row.observed === 'Yes')
    expect(observed.map((row) => row.surface)).toEqual(['AI Overviews', 'ChatGPT', 'Perplexity'])
  })

  it('marks AI Mode, Gemini, and Microsoft Copilot as not observed', () => {
    for (const surface of ['AI Mode', 'Gemini', 'Microsoft Copilot']) {
      const row = observedSystems.observedSystemRows.find((item) => item.surface === surface)
      expect(row, `${surface} is missing from the surfaces table`).toBeDefined()
      expect(row?.observed).toBe('No')
    }
  })

  it('names the three observed systems in the canonical sentence', () => {
    for (const system of ['Google AI Overviews', 'ChatGPT', 'Perplexity']) {
      expect(observedSystems.observedSystemsSentence).toContain(system)
    }
  })

  it('names all three unobserved surfaces in the exclusion sentence', () => {
    for (const surface of ['Google AI Mode', 'Gemini', 'Microsoft Copilot']) {
      expect(observedSystems.observedSystemsExclusion).toContain(surface)
    }
    expect(observedSystems.observedSystemsExclusion).toContain(
      'does not measure, test, monitor, or report on',
    )
  })

  it('claims no capability for a surface it marks unobserved', () => {
    const unobserved = observedSystems.observedSystemRows.filter((row) => row.observed === 'No')
    for (const row of unobserved) {
      expect(observedSystems.observedSystemsSentence).not.toContain(row.surface)
    }
  })

  it('stays renderable by DataTable', () => {
    const renderable: readonly DataTableRow[] = observedSystems.observedSystemRows
    expect(renderable).toHaveLength(6)
  })
})

describe('Shared evidence grades', () => {
  it('publishes four grades, strongest first', () => {
    expect(evidenceGrades.evidenceGradeRows.map((row) => row.grade)).toEqual(['A', 'B', 'C', 'D'])
  })

  it('states a standard for every grade', () => {
    for (const row of evidenceGrades.evidenceGradeRows) {
      expect(row.evidence.trim().length).toBeGreaterThan(0)
    }
  })

  it('reads the Grade A clause off the table rather than restating it', () => {
    // docs/17 §3.8. The one-word drift between the table and the solutions page
    // is the defect this export exists to prevent.
    expect(evidenceGrades.gradeAEvidence).toBe(evidenceGrades.evidenceGradeRows[0].evidence)
    expect(evidenceGrades.gradeAEvidence).toContain('first-party CRM or revenue data')
  })

  it('stays renderable by DataTable', () => {
    const renderable: readonly DataTableRow[] = evidenceGrades.evidenceGradeRows
    expect(renderable).toHaveLength(4)
  })
})

describe('Shared content punctuation', () => {
  it('uses no em-dash in any shared string', () => {
    // docs/12 §3. scripts/validate-content.ts fails the build on U+2014, and
    // these strings render on five pages at once.
    const emDash = String.fromCharCode(0x2014)
    for (const [name, module] of Object.entries(modules)) {
      for (const value of strings(module)) {
        expect(value, `${name} contains an em-dash`).not.toContain(emDash)
      }
    }
  })

  it('exports only non-empty strings', () => {
    for (const [name, module] of Object.entries(modules)) {
      const values = strings(module)
      expect(values.length, `${name} exports no strings`).toBeGreaterThan(0)
      for (const value of values) {
        expect(value.trim().length, `${name} exports an empty string`).toBeGreaterThan(0)
      }
    }
  })
})
