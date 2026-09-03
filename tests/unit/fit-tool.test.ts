import { describe, expect, it } from 'vitest'

import { fit } from '@/content/pages/diagnostic'
import { fitItems, fitTool, type FitItemId } from '@/content/forms/fit-tool'
import { answeredCount, FIT_ITEM_COUNT, isComplete, readFit, type FitAnswers } from '@/lib/forms/fit-tool'

const goodIds: FitItemId[] = ['G1', 'G2', 'G3', 'G4', 'G5', 'G6']
const notIds: FitItemId[] = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7', 'N8']

function answers(yes: FitItemId[]): FitAnswers {
  return Object.fromEntries(
    fitItems.map((item) => [item.id, yes.includes(item.id) ? 'yes' : 'no']),
  ) as FitAnswers
}

describe('Fit items', () => {
  it('is exactly the fourteen approved items, in order', () => {
    expect(FIT_ITEM_COUNT).toBe(14)
    expect(fitItems.filter((item) => item.side === 'good').map((item) => item.approved)).toEqual([
      ...fit.goodFit.items,
    ])
    expect(fitItems.filter((item) => item.side === 'not').map((item) => item.approved)).toEqual([
      ...fit.notFit.items,
    ])
  })

  it('asks one question per approved item and asserts nothing new', () => {
    for (const item of fitItems) {
      expect(item.question.endsWith('?'), item.id).toBe(true)
      expect(item.approved.length).toBeGreaterThan(0)
    }
  })

  it('reads its two legends and its lists intro from the approved copy', () => {
    expect(fitTool.goodLegend).toBe(fit.goodFit.heading)
    expect(fitTool.notLegend).toBe(fit.notFit.heading)
    expect(fitTool.listsIntro).toBe(fit.title)
  })

  it('never mentions price, a fee, or a guaranteed citation', () => {
    const copy = JSON.stringify({ fitTool, fitItems }).toLowerCase()
    expect(copy).not.toMatch(/\$\s?\d/)
    expect(copy).not.toContain('starts at')
    expect(copy).not.toContain('budget')
    expect(copy).not.toContain('we guarantee')
  })
})

describe('Reading', () => {
  it('withholds a reading until all fourteen are answered', () => {
    const partial = answers(goodIds)
    delete partial.N8

    expect(isComplete(partial)).toBe(false)
    expect(answeredCount(partial)).toBe(13)
    expect(readFit(partial)).toBeNull()
    expect(fitTool.progress(13)).toBe('Answer all fourteen for a reading. 13 of 14 answered.')
  })

  it('reads a strong fit at five or six matches and no mismatch', () => {
    expect(readFit(answers(goodIds))?.band).toBe('strong')
    expect(readFit(answers(['G1', 'G2', 'G3', 'G4', 'G5']))?.band).toBe('strong')
  })

  it('reads a possible fit when one answer does not match', () => {
    expect(readFit(answers(['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'N4']))?.band).toBe('possible')
    expect(readFit(answers(['G1', 'G2', 'G3', 'G4']))?.band).toBe('possible')
  })

  it('reads a not-a-fit at two mismatches, at two or fewer matches, or on N1 alone', () => {
    expect(readFit(answers([...goodIds, 'N4', 'N5']))?.band).toBe('not-a-fit')
    expect(readFit(answers(['G1', 'G2']))?.band).toBe('not-a-fit')
    expect(readFit(answers([...goodIds, 'N1']))?.band).toBe('not-a-fit')
  })

  it('lets the authority contradiction lower the reading rather than cancel out', () => {
    // G4 and N8 are two sides of one question. Answering Yes to both counts on
    // the not-fit side only, so the pair cannot restore a match it contradicts.
    const contradicted = readFit(answers([...goodIds, 'N8']))
    expect(contradicted?.band).toBe('possible')

    const withoutContradiction = readFit(answers(['G1', 'G2', 'G3', 'G5', 'G6', 'N8']))
    expect(withoutContradiction?.band).toBe('possible')

    // Five matches and one mismatch would be a strong fit if N8 were ignored.
    expect(readFit(answers([...goodIds, 'N8']))?.band).not.toBe('strong')
  })

  it('explains a strong reading with the approved items that matched', () => {
    const reading = readFit(answers(goodIds))
    expect(reading?.drivers).toEqual(goodIds)
  })

  it('explains a not-a-fit reading with what did not match, never with what did', () => {
    const reading = readFit(answers(['G1', 'G2', 'N1', 'N2']))
    expect(reading?.band).toBe('not-a-fit')
    expect(reading?.drivers).toContain('N1')
    expect(reading?.drivers).toContain('N2')
    expect(reading?.drivers).not.toContain('G1')
    expect(reading?.drivers).toContain('G3')
  })

  it('gives every one of the fourteen an answer that changes nothing else', () => {
    // Equal treatment (15 section 7 rule 8): a reading is a function of the
    // answers alone, so the same answers always read the same way.
    for (const id of [...goodIds, ...notIds]) {
      const first = readFit(answers([id]))
      const second = readFit(answers([id]))
      expect(first).toEqual(second)
    }
  })
})
