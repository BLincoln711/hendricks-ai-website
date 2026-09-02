import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { observedSystemsSentence } from '@/content/shared/observed-systems'

import {
  ALLOWLISTED_SENTENCES,
  OBSERVED_SYSTEMS_MODULE,
  observedSystemsOffencesInMarkdown,
  observedSystemsOffencesInSource,
} from '../../scripts/lib/observed-systems-guard'

/**
 * The observed-systems boundary is a published capability claim
 * (CONTENT_VERIFICATION A1, amended 2026-09-01): Hendricks observes Google AI
 * Overviews, ChatGPT, Perplexity, and Gemini, and nothing else. The list is
 * closed and it has already changed once, which is why no page may state it
 * as a literal. Every visitor string that names the boundary renders
 * `observedSystemsSentence`; the guard in `scripts/lib/observed-systems-guard.ts`
 * enforces that over `src/content/` and the approved markdown mirrors, with the
 * two exceptions its header records. The fixtures under
 * `tests/fixtures/content/` pin what the guard catches and what it lets through.
 */
const ROOT = process.cwd()
const CONTENT_DIR = path.join(ROOT, 'src/content')
const MIRROR_DIR = path.join(ROOT, 'content/pages')
const FIXTURE_DIR = path.join(ROOT, 'tests/fixtures/content')

const CANONICAL_SENTENCE =
  'Hendricks observes four systems: Google AI Overviews, ChatGPT, Perplexity, and Gemini.'
const NAMES_RULE =
  'names the systems Hendricks observes in a page literal instead of rendering the shared sentence'

function walk(dir: string, match: RegExp): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) return walk(full, match)
    return match.test(name) ? [full] : []
  })
}

function relative(file: string): string {
  return path.relative(ROOT, file)
}

function fixture(name: string): string {
  return readFileSync(path.join(FIXTURE_DIR, name), 'utf8')
}

describe('Observed-systems boundary', () => {
  it('keeps the shared sentence verbatim from CANON section 4', () => {
    expect(observedSystemsSentence).toBe(CANONICAL_SENTENCE)
  })

  it('renders the boundary from the shared module everywhere under src/content', () => {
    const offenders = walk(CONTENT_DIR, /\.tsx?$/)
      .filter((file) => relative(file) !== OBSERVED_SYSTEMS_MODULE)
      .flatMap((file) =>
        observedSystemsOffencesInSource(readFileSync(file, 'utf8')).map(
          (o) => `${relative(file)}:${o.line} ${o.rule}: ${o.excerpt}`,
        ),
      )
    expect(offenders).toEqual([])
  })

  it('keeps every approved markdown mirror on the canonical sentence', () => {
    const offenders = walk(MIRROR_DIR, /\.md$/).flatMap((file) =>
      observedSystemsOffencesInMarkdown(readFileSync(file, 'utf8'), CANONICAL_SENTENCE).map(
        (o) => `${relative(file)}:${o.line} ${o.rule}: ${o.excerpt}`,
      ),
    )
    expect(offenders).toEqual([])
  })

  it('still finds every allowlisted sentence where it was allowlisted', () => {
    const page = readFileSync(
      path.join(CONTENT_DIR, 'pages/what-is-ai-mediated-search.ts'),
      'utf8',
    )
    const mirror = readFileSync(path.join(MIRROR_DIR, '22-what-is-ai-mediated-search.md'), 'utf8')
    for (const sentence of ALLOWLISTED_SENTENCES) {
      expect(page).toContain(sentence)
      expect(mirror).toContain(sentence)
    }
  })

  it('lets the passing fixtures through', () => {
    expect(observedSystemsOffencesInSource(fixture('observed-systems-passing.ts'))).toEqual([])
    expect(
      observedSystemsOffencesInMarkdown(fixture('observed-systems-passing.md'), CANONICAL_SENTENCE),
    ).toEqual([])
  })

  it('catches every breach in the failing source fixture', () => {
    const offences = observedSystemsOffencesInSource(fixture('observed-systems-failing.ts'))
    expect(offences.map((o) => [o.excerpt.slice(0, 24), o.rule])).toEqual([
      ['Hendricks observes three', 'counts the observed systems outside the shared module'],
      ['Hendricks observes four ', 'counts the observed systems outside the shared module'],
      ['Hendricks measures Googl', NAMES_RULE],
      ['Hendricks observes Gemin', NAMES_RULE],
      ['Google AI Mode, Gemini, ', 'retypes the observed-systems framing instead of rendering observedSystemsContext'],
      ['The boundary on this pag', 'counts the observed systems outside the shared module'],
      ['The boundary on this pag', 'counts the observed systems outside the shared module'],
    ])
  })

  it('catches every breach in the failing markdown fixture', () => {
    const offences = observedSystemsOffencesInMarkdown(
      fixture('observed-systems-failing.md'),
      CANONICAL_SENTENCE,
    )
    expect(offences.map((o) => o.line)).toEqual([3, 5, 9])
  })
})
