import { describe, expect, it } from 'vitest'

import { isBuilt } from '@/config/routes'
import * as about from '@/content/pages/about'
import * as contact from '@/content/pages/contact'
import * as diagnostic from '@/content/pages/diagnostic'
import * as forAgencies from '@/content/pages/for-agencies'
import * as forBrands from '@/content/pages/for-brands'
import * as howItWorks from '@/content/pages/how-it-works'
import * as sdi from '@/content/pages/search-demand-intelligence'
import * as sim from '@/content/pages/search-impact-measurement'
import * as spe from '@/content/pages/search-presence-engineering'
import * as si from '@/content/pages/selection-intelligence'
import * as solutions from '@/content/pages/solutions'

/**
 * Guards on the Phase 4 commercial pages. These assert the rules from docs/12
 * (language), docs/10 §2 (brand separation), and docs/03 §6 (internal linking)
 * against every content object at once, so a new page cannot quietly skip them.
 */

/** Serialises `value` with the named keys, at any depth, left out. */
function omitKeys(value: unknown, keys: readonly string[]): string {
  return JSON.stringify(value, (key, nested) => (keys.includes(key) ? undefined : nested))
}

const pages = [
  { route: '/solutions', meta: solutions.solutionsMeta, content: solutions },
  { route: '/solutions/search-demand-intelligence', meta: sdi.meta, content: sdi },
  { route: '/solutions/selection-intelligence', meta: si.meta, content: si },
  { route: '/solutions/search-presence-engineering', meta: spe.meta, content: spe },
  { route: '/solutions/search-impact-measurement', meta: sim.meta, content: sim },
  { route: '/how-it-works', meta: howItWorks.meta, content: howItWorks },
  { route: '/for-brands', meta: forBrands.meta, content: forBrands },
  { route: '/for-agencies', meta: forAgencies.meta, content: forAgencies },
  { route: '/about', meta: about.meta, content: about },
  { route: '/diagnostic', meta: diagnostic.meta, content: diagnostic },
  { route: '/contact', meta: contact.meta, content: contact },
] as const

describe.each(pages)('$route content', ({ route, meta, content }) => {
  const corpus = JSON.stringify(content)

  it('names the brand in the title and writes a usable description', () => {
    // The exact strings are approved copy, so this asserts the shape only.
    // Two approved titles exceed the SERP truncation width — CONTENT_VERIFICATION.md S1.
    expect(meta.title).toContain('Hendricks')
    expect(meta.description.length).toBeGreaterThanOrEqual(70)
    expect(meta.description.length).toBeLessThanOrEqual(200)
  })

  it('uses no banned hype language', () => {
    // docs/12 §3 — "Avoid" list.
    const banned = [
      'dominate ai search',
      'hack chatgpt',
      'own every answer',
      'future-proof',
      'revolutionary',
      'cutting-edge',
      'unlock exponential',
      'ai ranking',
    ]

    for (const phrase of banned) {
      expect(corpus.toLowerCase(), `banned phrase present: ${phrase}`).not.toContain(phrase)
    }
  })

  it('never promises a guaranteed outcome', () => {
    // docs/12 §3. Approved copy does name guarantees, but only ever to rule
    // them out, in two shapes. Whole sections whose heading carries the
    // negation — the poor-fit list on /diagnostic, the partner commitments on
    // /for-agencies — are dropped, because no single list item inside them
    // reads as negated on its own. What survives must negate in place.
    const negatedInPlace = /\bno\b|\bnot\b|\bnever\b|without|rather than|instead of/
    const clauses = omitKeys(content, ['notFit', 'commitments'])
      .toLowerCase()
      .split(/[.!?,;]|","|":"/)

    for (const clause of clauses.filter((clause) => clause.includes('guarantee'))) {
      expect(clause, `unnegated guarantee: ${clause}`).toMatch(negatedInPlace)
    }
  })

  it('uses no ambiguous call to action', () => {
    // docs/01 §12 — CTAs must name the next action.
    expect(corpus.toLowerCase()).not.toContain('learn more')
    expect(corpus.toLowerCase()).not.toContain('get started')
  })

  it('calls the implementation solution Search Presence Engineering', () => {
    // docs/12 §2 — "Selection Engineering" is a retired name.
    expect(corpus).not.toContain('Selection Engineering')
  })

  it('mentions The Search Economy only on /about', () => {
    // docs/10 §2 — the publication belongs in the founder biography alone.
    if (route === '/about') return
    expect(corpus).not.toContain('Search Economy')
  })

  it('links only to routes that exist', () => {
    // docs/03 §6 — every internal link must resolve. Related-content lists are
    // exempt: they intentionally record the Phase 6 destinations the approved
    // copy names, and RelatedLinks filters out the ones not built yet.
    const hrefs = [
      ...omitKeys(content, ['related']).matchAll(/"href":"(\/[^"]*)"/g),
    ].map((match) => match[1])

    for (const href of hrefs) {
      expect(isBuilt(href), `${route} links to unbuilt route: ${href}`).toBe(true)
    }
  })
})

describe('Solution page structure', () => {
  const solutionPages = [
    { name: 'Search Demand Intelligence', content: sdi },
    { name: 'Selection Intelligence', content: si },
    { name: 'Search Presence Engineering', content: spe },
    { name: 'Search Impact Measurement', content: sim },
  ] as const

  it.each(solutionPages)('$name names itself in the hero eyebrow', ({ name, content }) => {
    expect(content.hero.eyebrow).toBe(name)
  })

  it.each(solutionPages)('$name opens on the Diagnostic', ({ content }) => {
    expect(content.hero.primaryCta.href).toBe('/diagnostic')
  })

  it.each(solutionPages)('$name keeps the Diagnostic available at the close', ({ content }) => {
    // Two pages close on a program conversation instead, with the Diagnostic
    // demoted to the secondary action rather than dropped.
    const closingHrefs = [
      content.closing.primaryCta.href,
      'secondaryCta' in content.closing ? content.closing.secondaryCta.href : undefined,
    ]
    expect(closingHrefs).toContain('/diagnostic')
  })

  it.each(solutionPages)('$name cross-links at least two sibling solutions', ({ content }) => {
    const built = content.related.filter((link) => isBuilt(link.href))
    expect(built.length).toBeGreaterThanOrEqual(2)
  })

  it.each(solutionPages)('$name states deliverables', ({ content }) => {
    expect(content.deliverables.items.length).toBeGreaterThan(0)
  })
})

describe('Solutions overview', () => {
  it('lists the four solutions in the approved order', () => {
    expect(solutions.solutionsList.items.map((item) => item.name)).toEqual([
      'Search Demand Intelligence',
      'Selection Intelligence',
      'Search Presence Engineering',
      'Search Impact Measurement',
    ])
  })

  it('points each solution at its own route', () => {
    expect(solutions.solutionsList.items.map((item) => item.cta.href)).toEqual([
      '/solutions/search-demand-intelligence',
      '/solutions/selection-intelligence',
      '/solutions/search-presence-engineering',
      '/solutions/search-impact-measurement',
    ])
  })

  it('describes the sequence as demand, selection, presence, impact', () => {
    expect(solutions.solutionsSystem.stages.map((stage) => stage.name)).toEqual([
      'Demand',
      'Selection',
      'Presence',
      'Impact',
    ])
  })
})

describe('Measurement honesty', () => {
  it('reports observed rates rather than universal rankings', () => {
    // docs/12 §2 — measurement must be scoped to what was observed.
    const names = si.metrics.items.map((item) => item.name)
    expect(names).toContain('Observed Consideration Rate')
    expect(names).toContain('Observed Recommendation Rate')
  })

  it('states the limits of what Selection Intelligence can see', () => {
    expect(si.limitation.title).toContain('does not claim')
  })

  it('separates correlation from causation on the impact page', () => {
    expect(JSON.stringify(sim).toLowerCase()).toContain('causation')
  })

  it('grades evidence rather than asserting certainty', () => {
    expect(sim.evidenceGrades.rows.length).toBeGreaterThanOrEqual(3)
    expect(sim.evidenceGrades.caption.length).toBeGreaterThan(0)
  })

  it('climbs from exposure to causal evidence rather than starting at causation', () => {
    expect(sim.levels.items.map((item) => item.name)).toEqual([
      'Exposure',
      'Behavior',
      'Commercial outcomes',
      'Causal evidence',
    ])
  })
})

describe('About page', () => {
  it('frames The Search Economy as an independent publication', () => {
    // docs/10 §2 — never a Hendricks research arm or solution.
    expect(about.externalVenture.name).toBe('The Search Economy')
    expect(JSON.stringify(about.externalVenture)).toContain('independent')
    expect(JSON.stringify(about.externalVenture)).not.toContain('research arm')
  })

  it('sends the publication link off-site rather than to a Hendricks route', () => {
    expect(about.externalVenture.cta.href).toBe('https://thesearcheconomy.com')
    expect(about.externalVenture.cta.external).toBe(true)
  })

  it('keeps the publication out of the solutions narrative', () => {
    expect(JSON.stringify(about.experience)).not.toContain('Search Economy')
    expect(JSON.stringify(about.related)).not.toContain('Search Economy')
  })
})

describe('Diagnostic page', () => {
  it('describes a fixed scope rather than an hourly engagement', () => {
    expect(JSON.stringify(diagnostic.investment).toLowerCase()).toContain('fixed')
  })

  it('names an output for every phase', () => {
    for (const phase of diagnostic.phases.items) {
      expect(phase.output.length, phase.name).toBeGreaterThan(0)
    }
  })

  it('states who the Diagnostic does not fit', () => {
    expect(diagnostic.fit.notFit.items.length).toBeGreaterThan(0)
  })

  it('publishes no price until it is approved', () => {
    // CONTENT_VERIFICATION.md P1 — the fee is not cleared for publication.
    expect(JSON.stringify(diagnostic)).not.toMatch(/\$\s?\d/)
  })
})
