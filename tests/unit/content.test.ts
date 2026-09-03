import { describe, expect, it } from 'vitest'

import {
  footerNavigation,
  headerCtaHref,
  isCurrentRoute,
  primaryNavigation,
  solutionsNavigation,
} from '@/config/navigation'
import { features } from '@/config/feature-flags'
import * as home from '@/content/pages/home'
import {
  observedSystemsExclusion,
  observedSystemsSentence,
} from '@/content/shared/observed-systems'

/**
 * Guards on the approved positioning. These fail loudly if homepage copy drifts
 * from content/pages/01-home.md or docs/01 §4.
 */
/**
 * Approved negations, allowlisted by exact sentence (handoff 4.7 rule 4).
 *
 * A page that refuses to promise a citation has to be able to say so. These
 * sentences are approved copy whose whole point is the refusal, so they are
 * removed before the corpus is searched for the promise they deny.
 */
const APPROVED_NEGATIONS = [
  'No fabricated results or guaranteed citation claims.',
  'Hendricks does not claim access to a model\u2019s hidden reasoning.',
  'Hendricks does not sell screenshots of chatbot mentions.',
]

/** The homepage's claims, with the approved negations removed. */
function claimCorpus(): string {
  return APPROVED_NEGATIONS.reduce(
    (corpus, sentence) => corpus.split(sentence.toLowerCase()).join(' '),
    JSON.stringify(home).toLowerCase(),
  )
}

describe('Homepage content', () => {
  it('carries the locked category line, in the hero, whichever way H1 resolves', () => {
    // R1 moves the line from the H1 to the eyebrow. Until CONTENT_VERIFICATION
    // H1 is approved it stays the H1, so the assertion is that the sentence is
    // in the hero, not which slot holds it.
    expect([home.hero.eyebrow, home.hero.title]).toContain(
      'Search Intelligence Engineering for the AI Era.',
    )
  })

  it('uses the approved operating line verbatim', () => {
    expect(home.hero.operatingLine).toBe(
      'Measure demand. Understand AI visibility. Engineer selection. Prove business impact.',
    )
  })

  it('answers all five hero questions in visible hero copy', () => {
    // 04 section 1's five-second check. The lead carries what Hendricks does
    // and the problem it solves, the boundary paragraph carries who it is for
    // and why it is neither software nor an SEO agency, and the primary CTA
    // carries how an engagement begins.
    const heroCopy = [
      home.hero.title,
      home.hero.lead.claim,
      home.hero.lead.continuation,
      home.hero.boundary,
      home.hero.operatingLine,
      home.hero.primaryCta.label,
    ].join(' ')

    expect(heroCopy).toContain('Know where your brand is missing from the shortlist.')
    expect(heroCopy).toContain('pipeline and revenue')
    expect(heroCopy).toMatch(/search (materially affects|shapes) a valuable purchase/)
    expect(heroCopy).toContain('Start with a Search Intelligence Diagnostic')
  })

  it('names the four phases in the approved order, each linked to its solution', () => {
    expect(home.system.phases.map((phase) => phase.name)).toEqual([
      'Map demand',
      'Observe selection',
      'Engineer the presence',
      'Measure impact',
    ])
    expect(home.system.phases.map((phase) => phase.output)).toEqual([
      'Demand Map',
      'Selection Map',
      'Intervention Roadmap',
      'Impact Ledger',
    ])
    expect(home.system.phases.map((phase) => phase.href)).toEqual([
      '/solutions/search-demand-intelligence',
      '/solutions/selection-intelligence',
      '/solutions/search-presence-engineering',
      '/solutions/search-impact-measurement',
    ])
  })

  it('renders the observed-systems boundary from the shared module, once', () => {
    expect(home.system.scope).toEqual([observedSystemsSentence, observedSystemsExclusion])
    expect(JSON.stringify(home).match(/Hendricks observes four systems/g)).toHaveLength(1)
  })

  it('keeps the evidence rule verbatim, including the load-bearing "yet"', () => {
    expect(home.evidenceRule.claim).toBe('Absence is not yet a diagnosis.')
    expect(home.evidenceRule.continuation).toBe(
      'A single answer screen is one observation under one set of conditions.',
    )
  })

  it('publishes no fee and no invented figure', () => {
    // The only numbers this page may carry are CANON section 5's published set.
    // Word bounded, because "feeds the next cycle" is not a price.
    const corpus = JSON.stringify(home)
    expect(corpus).not.toMatch(/\$\d/)
    expect(corpus).not.toMatch(/\bfees?\b/i)
    expect(corpus).not.toMatch(/\bstarts at\b/i)
  })

  it('promises no citation', () => {
    for (const phrase of ['guarantee', 'get you cited', 'ensure citation', 'will be cited']) {
      expect(claimCorpus(), `citation promise present: ${phrase}`).not.toContain(phrase)
    }
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
    for (const phrase of banned) {
      expect(claimCorpus(), `banned phrase present: ${phrase}`).not.toContain(phrase)
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
    expect(home.founder.name).toBe('Brandon Lincoln Hendricks')
  })

  it('points the primary conversion at the Diagnostic from every station that offers it', () => {
    expect(home.hero.primaryCta.href).toBe('/diagnostic')
    expect(home.diagnostic.cta.href).toBe('/diagnostic')
    expect(home.finalCta.primaryCta.href).toBe('/diagnostic')
  })
})

describe('Navigation', () => {
  it('excludes The Search Economy, Platform, and Pricing from primary navigation', () => {
    const labels = primaryNavigation.map((item) => item.label)
    expect(labels).not.toContain('The Search Economy')
    expect(labels).not.toContain('Platform')
    expect(labels).not.toContain('Pricing')
  })

  it('links Solutions straight to the hub, with no dropdown', () => {
    // Decision D-G (2026-09-02). The four solution names do not appear in the
    // header at all; the hub and the footer are where they are reachable.
    const solutions = primaryNavigation.find((item) => item.label === 'Solutions')
    expect(solutions?.href).toBe('/solutions')
    expect(JSON.stringify(primaryNavigation)).not.toContain('Selection Intelligence')
    expect(solutionsNavigation.map((item) => item.label)).toEqual([
      'Search Demand Intelligence',
      'Selection Intelligence',
      'Search Presence Engineering',
      'Search Impact Measurement',
    ])
  })

  it('carries the six links in header order with Research restored', () => {
    // Redesign 03 section 2; CANON R6 default. Methodology, Contact and the
    // definition pages stay footer links.
    expect(primaryNavigation.map((item) => item.label)).toEqual([
      'Solutions',
      'How It Works',
      'For Brands',
      'For Agencies',
      'Research',
      'About',
    ])
  })

  it('marks a route current for itself and its descendants, never the homepage for all', () => {
    // 16 KF-10.
    expect(isCurrentRoute('/about', '/about')).toBe(true)
    expect(isCurrentRoute('/solutions/selection-intelligence', '/solutions')).toBe(true)
    expect(isCurrentRoute('/solutions', '/solutions/selection-intelligence')).toBe(false)
    expect(isCurrentRoute('/solutions-archive', '/solutions')).toBe(false)
    expect(isCurrentRoute('/about', '/')).toBe(false)
    expect(isCurrentRoute('/', '/')).toBe(true)
  })

  it('points the header button at the fit anchor on /diagnostic and nowhere else', () => {
    // Redesign 03 section 2; 14 DX-05; register B1.
    expect(headerCtaHref('/diagnostic')).toBe('#fit')
    expect(headerCtaHref('/')).toBe('/diagnostic')
    expect(headerCtaHref('/for-agencies')).toBe('/diagnostic')
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
