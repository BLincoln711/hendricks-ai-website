import { describe, expect, it } from 'vitest'

import { isBuilt } from '@/config/routes'
import * as about from '@/content/pages/about'
import * as aiSelectionProblem from '@/content/pages/ai-selection-problem'
import * as contact from '@/content/pages/contact'
import * as diagnostic from '@/content/pages/diagnostic'
import * as forAgencies from '@/content/pages/for-agencies'
import * as forBrands from '@/content/pages/for-brands'
import * as howItWorks from '@/content/pages/how-it-works'
import * as methodology from '@/content/pages/methodology'
import * as sdi from '@/content/pages/search-demand-intelligence'
import * as sim from '@/content/pages/search-impact-measurement'
import * as spe from '@/content/pages/search-presence-engineering'
import * as si from '@/content/pages/selection-intelligence'
import * as solutions from '@/content/pages/solutions'
import * as wisie from '@/content/pages/what-is-search-intelligence-engineering'
import * as wisi from '@/content/pages/what-is-selection-intelligence'

/**
 * Guards on every content object the site renders, commercial and editorial.
 * These assert the rules from docs/12 (language), docs/10 §2 (brand separation),
 * and docs/03 §6 (internal linking) against all pages at once, so a new page
 * cannot quietly skip them.
 */

/** Serialises `value` with the named keys, at any depth, left out. */
function omitKeys(value: unknown, keys: readonly string[]): string {
  return JSON.stringify(value, (key, nested) => (keys.includes(key) ? undefined : nested))
}

/** The routes that count as "research pages" for the linking rule in docs/03 §6. */
const EDITORIAL_ROUTES: readonly string[] = [
  '/what-is-search-intelligence-engineering',
  '/what-is-selection-intelligence',
  '/ai-selection-problem',
  '/methodology',
  '/research',
]

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
  {
    route: '/what-is-search-intelligence-engineering',
    meta: wisie.meta,
    content: wisie,
  },
  { route: '/what-is-selection-intelligence', meta: wisi.meta, content: wisi },
  { route: '/ai-selection-problem', meta: aiSelectionProblem.meta, content: aiSelectionProblem },
  { route: '/methodology', meta: methodology.meta, content: methodology },
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
    // /for-agencies, the "what it is not" list on the category definition — are
    // dropped, because no single list item inside them reads as negated on its
    // own. What survives must negate in place.
    const negatedInPlace = /\bno\b|\bnot\b|\bnever\b|without|rather than|instead of/
    const clauses = omitKeys(content, ['notFit', 'commitments', 'whatItIsNot'])
      .toLowerCase()
      .split(/[.!?,;]|","|":"/)

    for (const clause of clauses.filter((clause) => clause.includes('guarantee'))) {
      expect(clause, `unnegated guarantee: ${clause}`).toMatch(negatedInPlace)
    }
  })

  it('uses no ambiguous call to action', () => {
    // docs/01 §12 — CTAs must name the next action. `formLegal` is excluded:
    // it is approved legal wording from legal/01, where "Learn more in our
    // Privacy Notice" is the notice at collection rather than a call to action,
    // and it may not be reworded to satisfy a copy rule aimed at CTAs.
    const ctaCorpus = omitKeys(content, ['formLegal']).toLowerCase()
    expect(ctaCorpus).not.toContain('learn more')
    expect(ctaCorpus).not.toContain('get started')
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

  it.each(solutionPages)('$name links at least two editorial pages', ({ content }) => {
    // docs/03 §6 — "every solution page links to the Diagnostic and at least two
    // relevant research pages". Both /solutions/search-presence-engineering and
    // /solutions/search-impact-measurement shipped Phase 4 with only one, because
    // three of the four editorial routes did not exist yet.
    const editorial = content.related.filter(
      (link) => isBuilt(link.href) && EDITORIAL_ROUTES.includes(link.href),
    )
    expect(editorial.map((link) => link.href).length).toBeGreaterThanOrEqual(2)
  })

  it.each(solutionPages)('$name states deliverables', ({ content }) => {
    expect(content.deliverables.items.length).toBeGreaterThan(0)
  })
})

describe('Definition pages', () => {
  const definitionPages = [
    { route: '/what-is-search-intelligence-engineering', content: wisie },
    { route: '/what-is-selection-intelligence', content: wisi },
    { route: '/ai-selection-problem', content: aiSelectionProblem },
    { route: '/methodology', content: methodology },
  ] as const

  it.each(definitionPages)('$route links a solution and the methodology', ({ route, content }) => {
    // docs/03 §6 — "every research page links to one relevant solution and one
    // methodology page". The link may sit anywhere on the page, not only in the
    // related list: the category definition carries its four solution links on
    // the outcomes section instead. /methodology is itself the methodology page.
    const hrefs = [...JSON.stringify(content).matchAll(/"href":"(\/[^"]*)"/g)].map(
      (match) => match[1],
    )

    expect(hrefs.some((href) => href.startsWith('/solutions/'))).toBe(true)

    if (route !== '/methodology') {
      expect(hrefs).toContain('/methodology')
    }
  })

  it.each(definitionPages)('$route resolves every related link', ({ content }) => {
    // Unlike the commercial pages, nothing in these related lists is allowed to
    // point at an unbuilt route: the editorial routes they reference now exist.
    for (const link of content.related) {
      expect(isBuilt(link.href), `unbuilt: ${link.href}`).toBe(true)
    }
  })

  it.each(definitionPages)('$route dates its review', ({ content }) => {
    // The "sources and update information" requirement in docs/03. A reader
    // cannot judge whether a definition is current without this.
    expect(content.sources.reviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(Number.isNaN(Date.parse(content.sources.reviewed))).toBe(false)
    expect(content.sources.appliedIn.length).toBeGreaterThan(0)
  })

  it.each(definitionPages)('$route claims no external source it does not cite', ({ content }) => {
    // These pages state the Hendricks position. Saying "according to research"
    // without a citation is the failure mode docs/12 §4 exists to prevent.
    expect(content.sources.basis.toLowerCase()).toMatch(/hendricks/)
  })

  it('gives the two "what is" pages a quotable direct answer', () => {
    // docs/06 §7 — the answer must stand alone, and it is reused verbatim as the
    // DefinedTerm description, so it has to be a complete sentence.
    for (const page of [wisie, wisi]) {
      expect(page.directAnswer.answer.startsWith(page.directAnswer.term)).toBe(true)
      expect(page.directAnswer.answer.endsWith('.')).toBe(true)
      expect(page.directAnswer.answer.length).toBeGreaterThan(120)
    }
  })

  it('links all four solutions from the category definition', () => {
    // docs/03 §6 — "category definitions link to all four solutions where
    // relevant". The four outcomes map onto the four solutions, so they carry it.
    expect(wisie.outcomes.items.map((item) => item.solution.href)).toEqual([
      '/solutions/search-demand-intelligence',
      '/solutions/selection-intelligence',
      '/solutions/search-presence-engineering',
      '/solutions/search-impact-measurement',
    ])
  })

  it('sends the AI Selection Problem page to Selection Intelligence and the Diagnostic', () => {
    // docs/03 §6, stated for this page specifically.
    expect(aiSelectionProblem.related.map((link) => link.href)).toContain(
      '/solutions/selection-intelligence',
    )
    expect(aiSelectionProblem.hero.primaryCta.href).toBe('/diagnostic')
  })

  it('keeps the methodology honest about influence and causation', () => {
    // docs/12 §4 — the two claims the whole measurement story rests on.
    const limits = methodology.limitations.items.join(' ')
    expect(limits).toContain('Citation does not prove influence.')
    expect(limits).toContain('Correlation does not prove causation.')
  })

  it('refuses to claim the methodology reverse-engineers model logic', () => {
    expect(methodology.statement.quote).toContain('does not claim to reverse-engineer')
  })

  it('presents no weighting model as universal', () => {
    expect(methodology.weighting.limitation).toContain('should be presented as universal')
  })

  it('describes selection as observed distribution rather than a universal ranking', () => {
    // docs/12 §2 — the single most important framing rule on the site.
    expect(wisi.whyContext.closing).toContain('not one universal ranking')
    expect(wisi.limitation.title).toContain('does not reveal')
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
