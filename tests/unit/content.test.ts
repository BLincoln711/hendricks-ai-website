import { describe, expect, it } from 'vitest'

import { footerNavigation, primaryNavigation } from '@/config/navigation'
import { features } from '@/config/feature-flags'
import * as home from '@/content/pages/home'

/**
 * Guards on the approved positioning. These fail loudly if homepage copy drifts
 * from content/pages/01-home.md or docs/01 §4.
 */
describe('Homepage content', () => {
  it('uses the approved category line as the H1', () => {
    expect(home.hero.title).toBe('Search Intelligence Engineering for the AI Era.')
  })

  it('uses the approved operating line verbatim', () => {
    expect(home.hero.operatingLine).toBe(
      'Measure demand. Understand AI visibility. Engineer selection. Prove business impact.',
    )
  })

  it('names all four solutions in the approved order', () => {
    expect(home.solutions.items.map((item) => item.name)).toEqual([
      'Search Demand Intelligence',
      'Selection Intelligence',
      'Search Presence Engineering',
      'Search Impact Measurement',
    ])
  })

  it('gives each solution a distinct motif rather than a repeated icon', () => {
    const motifs = home.solutions.items.map((item) => item.motif)
    expect(new Set(motifs).size).toBe(motifs.length)
  })

  it('points the primary conversion at the Diagnostic', () => {
    expect(home.hero.primaryCta.href).toBe('/diagnostic')
    expect(home.finalCta.primaryCta.href).toBe('/diagnostic')
  })

  it('uses no banned guarantee or hype language', () => {
    // docs/12 §3 — "Avoid" list.
    const banned = [
      'dominate ai search',
      'hack chatgpt',
      'guaranteed citation',
      'own every answer',
      'future-proof',
      'revolutionary',
      'unlock exponential',
    ]
    const corpus = JSON.stringify(home).toLowerCase()

    for (const phrase of banned) {
      expect(corpus, `banned phrase present: ${phrase}`).not.toContain(phrase)
    }
  })

  it('uses no ambiguous "Learn More" call to action', () => {
    // docs/01 §12 — CTAs must be specific.
    const corpus = JSON.stringify(home).toLowerCase()
    expect(corpus).not.toContain('learn more')
  })

  it('never references The Search Economy', () => {
    // docs/10 §2 — it belongs only in the founder biography on /about.
    expect(JSON.stringify(home)).not.toContain('Search Economy')
  })

  it('labels the founder module without the external venture', () => {
    expect(JSON.stringify(home.founder)).not.toContain('Search Economy')
    expect(home.founder.cta.href).toBe('/about')
  })
})

describe('Navigation', () => {
  it('excludes The Search Economy, Platform, and Pricing from primary navigation', () => {
    const labels = primaryNavigation.map((item) => item.label)
    expect(labels).not.toContain('The Search Economy')
    expect(labels).not.toContain('Platform')
    expect(labels).not.toContain('Pricing')
  })

  it('exposes the four solutions under Solutions', () => {
    const solutions = primaryNavigation.find((item) => item.label === 'Solutions')
    expect(solutions?.children).toHaveLength(4)
  })

  it('omits Results from the footer while the flag is off', () => {
    expect(features.showResults).toBe(false)

    const companyLabels = footerNavigation.company.items.map((item) => item.label)
    expect(companyLabels).not.toContain('Results')
  })

  it('never places The Search Economy in the footer', () => {
    expect(JSON.stringify(footerNavigation)).not.toContain('Search Economy')
  })
})
