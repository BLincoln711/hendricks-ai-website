import { describe, expect, it } from 'vitest'

import { classifyProbeOutcome } from '@/lib/observation/classify'
import { applyCostCeiling, cellsFromUltraRun, planProbeCells, ultraWriteBody } from '@/lib/observation/ultra-run'

const contexts = [
  'Which platform should a mid-market operations team use in this category?',
  'Who should a buyer shortlist for this category this quarter?',
  'What should a first-time buyer compare before choosing a vendor in this category?',
]

describe('ultra worker planner', () => {
  it('plans only the three probe engines and never Gemini', () => {
    const plan = planProbeCells(contexts)
    expect(plan).toHaveLength(9)
    expect(plan.map((item) => item.engine)).not.toContain('gemini')
    expect(new Set(plan.map((item) => item.engine))).toEqual(
      new Set(['google_aio', 'chat_gpt', 'perplexity']),
    )
  })

  it('simulates unmeasured worker_unavailable without inventing cited or invisible', () => {
    const write = ultraWriteBody({
      mode: 'simulate',
      contexts,
      brandHost: 'northwind.example',
      costCeilingUsd: 2,
    })

    expect(write.cells.every((cell) => cell.state === 'unmeasured')).toBe(true)
    expect(write.cells.every((cell) => cell.error === 'worker_unavailable')).toBe(true)
    expect(write.cells.map((cell) => cell.engine)).not.toContain('gemini')
    expect(write.method).toBe('public_mini_v1')
    expect(write.status).toBe('partial')
  })

  it('loads the filled fixture only when that mode is requested', () => {
    const write = ultraWriteBody({
      mode: 'fixture',
      contexts,
      brandHost: 'northwind.example',
      costCeilingUsd: 2,
    })

    expect(write.method).toBe('fixture_public_mini_v1')
    expect(write.cells.some((cell) => cell.state === 'cited')).toBe(true)
    expect(write.cells.some((cell) => cell.state === 'invisible')).toBe(true)
    expect(write.cells.map((cell) => cell.engine)).not.toContain('gemini')
  })

  it('honours the cost ceiling by leaving remaining cells unmeasured', () => {
    const planned = applyCostCeiling(planProbeCells(contexts), 0.003)
    expect(planned.filter((item) => item.allowed).length).toBeGreaterThan(0)
    expect(planned.some((item) => !item.allowed)).toBe(true)

    const built = cellsFromUltraRun({
      mode: 'simulate',
      contexts,
      costCeilingUsd: 0.003,
    })
    expect(built.cells.some((cell) => cell.error === 'cost_ceiling')).toBe(true)
    expect(built.cells.every((cell) => cell.state === 'unmeasured')).toBe(true)
  })

  it('classifies a live miss and a live hit with the shared helper', () => {
    const miss = classifyProbeOutcome({
      engine: 'chat_gpt',
      ok: true,
      sourceUrls: ['https://example.com/guide'],
      brandHost: 'northwind.example',
    })
    const hit = classifyProbeOutcome({
      engine: 'perplexity',
      ok: true,
      sourceUrls: ['https://northwind.example/page'],
      brandHost: 'northwind.example',
    })
    expect(miss.state).toBe('invisible')
    expect(hit.state).toBe('cited')
  })
})
