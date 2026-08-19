import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { observedSystemsSentence } from '@/content/shared/observed-systems'

/**
 * The observed-systems scope is a published capability claim, approved by
 * Brandon on 2026-08-17: Hendricks observes Google AI Overviews, ChatGPT and
 * Perplexity, and nothing else.
 *
 * The failure mode this guards is drift, not absence. A sentence that says
 * "three systems" without naming them reads as a coverage claim to anyone who
 * lifts it, and it silently becomes wrong the day the scope changes. Banning the
 * phrase outright would be the wrong rule, because naming the count alongside
 * the three products is exactly how the claim should be written. So the rule is:
 * if a visitor-facing string claims a number of observed systems, it must name
 * them in the same string, or it must be describing a run's scope rather than
 * the firm's coverage.
 */
const CONTENT_DIR = path.join(process.cwd(), 'src/content/pages')
const SYSTEMS = ['Google AI Overviews', 'ChatGPT', 'Perplexity']

/** Strips comments so a note explaining the rule is not itself a hit. */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
}

function visitorStrings(source: string): string[] {
  return Array.from(stripComments(source).matchAll(/'((?:[^'\\]|\\.){30,})'/g)).map((m) => m[1])
}

describe('Observed-systems boundary', () => {
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.ts'))

  it('never claims Hendricks observes a count of systems without naming them', () => {
    const offenders: string[] = []
    for (const file of files) {
      const source = readFileSync(path.join(CONTENT_DIR, file), 'utf8')
      for (const s of visitorStrings(source)) {
        // Only a claim about what Hendricks observes is in scope. A sentence
        // describing the scope of a measurement run is not a coverage claim.
        const claimsCoverage = /Hendricks\s+(observes|measures|tests|monitors)\b[^.]*\bthree systems\b/.test(s)
        if (!claimsCoverage) continue
        if (!SYSTEMS.every((sys) => s.includes(sys))) {
          offenders.push(`${file}: ${s.slice(0, 90)}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })

  it('never names a system outside the approved three as one Hendricks observes', () => {
    const forbidden = ['Gemini', 'Microsoft Copilot', 'Copilot', 'Google AI Mode']
    const offenders: string[] = []
    for (const file of files) {
      const source = readFileSync(path.join(CONTENT_DIR, file), 'utf8')
      for (const s of visitorStrings(source)) {
        const claims = /Hendricks\s+(observes|measures|tests|monitors|reports on)\b/.test(s)
        const negated = /does not|never|no Hendricks|not among|excluded/i.test(s)
        if (claims && !negated && forbidden.some((f) => s.includes(f))) {
          offenders.push(`${file}: ${s.slice(0, 90)}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })

  it('keeps the shared constant naming all three', () => {
    for (const sys of SYSTEMS) expect(observedSystemsSentence).toContain(sys)
  })
})
