import { describe, expect, it } from 'vitest'

import {
  APPROVED_LINES,
  GATED_STRINGS,
  addition,
  gateStatus,
  gated,
  isApproved,
  line,
} from '@/content/gate'
import * as home from '@/content/pages/home'

/**
 * The content gate (redesign handoff 4.7 rule 9).
 *
 * `check:content` enforces the two halves that need the filesystem: that the
 * statuses here match `CONTENT_VERIFICATION.md`, and that no file but the
 * register carries a pending proposal. These are the resolution rules, which
 * decide what a visitor actually reads.
 */
describe('Content gate', () => {
  it('renders the approved line, not the proposal, while a row is pending', () => {
    expect(isApproved('H1')).toBe(false)
    expect(line('heroTitle')).toBe('Search Intelligence Engineering for the AI Era.')
    expect(line('heroSecondaryCta')).toBe('See What Hendricks Actually Does')
  })

  it('renders nothing for an addition while its row is pending', () => {
    expect(addition('heroDefiner')).toBeNull()
    expect(addition('decisionDemandMap')).toBeNull()
  })

  it('passes a whole shape through, so a decision can gate a structure', () => {
    expect(gated('H10', 'proposed', 'approved')).toBe('approved')
    expect(gated('H10', [1, 2, 3], [1])).toEqual([1])
  })

  it('names a row for every proposal, and a proposal for every row it names', () => {
    const rowsWithCopy = new Set(GATED_STRINGS.map((entry) => entry.row))

    for (const entry of GATED_STRINGS) {
      expect(gateStatus[entry.row], `row ${entry.row} has no status`).toBeDefined()
      expect(entry.text.length).toBeGreaterThan(0)
    }

    // Every row in the status map is a row some line depends on. A status with
    // nothing behind it is a row nobody can ever close.
    for (const row of Object.keys(gateStatus)) {
      expect(rowsWithCopy, `row ${row} gates nothing`).toContain(row)
    }
  })

  it('keeps every proposal out of the page object while its row is pending', () => {
    const rendered = JSON.stringify(home)

    for (const entry of GATED_STRINGS) {
      if (isApproved(entry.row)) continue
      // A proposal that is also approved copy cannot be distinguished from its
      // own fallback by presence alone, so it is discounted here and covered by
      // the per-slot resolution assertions above instead.
      if (APPROVED_LINES.has(entry.text)) continue
      expect(rendered, `row ${entry.row} is publishing early`).not.toContain(entry.text)
    }
  })

  it('discounts a proposal only when it is genuinely approved copy elsewhere', () => {
    // Guards the exemption above: it must stay narrow. The category line earns
    // it because the H1 fallback is that exact sentence.
    const discounted = GATED_STRINGS.filter(
      (entry) => !isApproved(entry.row) && APPROVED_LINES.has(entry.text),
    )

    expect(discounted.map((entry) => entry.text)).toEqual([
      'Search Intelligence Engineering for the AI Era.',
    ])
    expect(home.hero.title).toBe('Search Intelligence Engineering for the AI Era.')
  })

  it('leaves the homepage a complete page with every row pending', () => {
    // The fallbacks are approved sentences, not blanks, so the page still
    // states the category, the problem, the method and the offer.
    expect(home.hero.title.length).toBeGreaterThan(0)
    expect(home.problem.title.length).toBeGreaterThan(0)
    expect(home.system.title.length).toBeGreaterThan(0)
    expect(home.diagnostic.title.length).toBeGreaterThan(0)
    expect(home.system.phases.every((phase) => phase.summary.length > 0)).toBe(true)
  })
})
