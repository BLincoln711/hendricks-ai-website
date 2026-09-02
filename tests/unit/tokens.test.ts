import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import {
  buildScope,
  colourPrimitives,
  colourTokens,
  contrastRatio,
  isBaseDeclaration,
  parseHex,
  parseTokenFile,
  resolveToken,
  resolveValue,
  TOKEN_FILE,
} from '../../scripts/lib/tokens'

/**
 * The token model behind `check:tokens` and `check:contrast` (redesign handoff
 * 5.5, 5.6). The fixtures pin the file shape the parser depends on: numbered
 * section banners, the `:root, .on-plate` component layer, the `.on-plate`
 * re-scope, and `var()` chains that must resolve on both surfaces. The last
 * block runs the model over the real file so a structural edit to
 * `src/styles/tokens.css` fails here before it fails the gates.
 */
const FIXTURE = `/*
 * Header comment with a hex that must be ignored: #ABCDEF.
 */

/* ========================================================================== */
/* 1. PRIMITIVE LAYER. */
/* ========================================================================== */
:root {
  --hx-navy-900: #071A2B; /* 16.71:1 on #F7F9FC */
  --hx-gray-50: #F7F9FC;
  --hx-blue-600: #2458E6;
  --hx-cyan-500: #00C2D8;
  --hx-radius-8: 8px;
  --hx-font-sans: var(--font-geist-sans, "Geist"), sans-serif;
}

/* ========================================================================== */
/* 2. SEMANTIC LAYER. */
/* ========================================================================== */
:root {
  --surface: var(--hx-gray-50);
  --ink: var(--hx-navy-900);
  --focus-ring: var(--hx-blue-600);
  --font-sans: var(--hx-font-sans);
  --loop-a: var(--loop-b);
  --loop-b: var(--loop-a);
}

/* ========================================================================== */
/* 3. COMPONENT LAYER. */
/* ========================================================================== */
:root,
.on-plate {
  --button-fg: var(--ink);
  --button-radius: var(--hx-radius-8);
}

:root {
  --stray-part: var(--ink);
}

/* ========================================================================== */
/* 4. SURFACE RE-SCOPING. */
/* ========================================================================== */
.on-plate {
  --surface: var(--hx-navy-900);
  --ink: var(--hx-gray-50);
  --focus-ring: var(--hx-cyan-500);
  --orphan: var(--hx-cyan-500);
  color: var(--ink);
}

/* ========================================================================== */
/* 5. RESPONSIVE TOKEN STEPS. */
/* ========================================================================== */
@media (min-width: 48rem) {
  :root {
    --button-radius: 10px;
  }
}

/* ========================================================================== */
/* 8. TAILWIND 4 THEME MAPPING. */
/* ========================================================================== */
@theme inline {
  --color-ink: var(--ink);
  --font-sans: var(--font-sans);
}
`

describe('parseTokenFile', () => {
  const parsed = parseTokenFile(FIXTURE)
  const byName = (name: string) => parsed.declarations.filter((d) => d.name === name)

  it('assigns every declaration to its banner section', () => {
    expect(byName('--hx-navy-900')[0]?.section).toBe(1)
    expect(byName('--surface')[0]?.section).toBe(2)
    expect(byName('--button-fg')[0]?.section).toBe(3)
    expect(byName('--orphan')[0]?.section).toBe(4)
    expect(byName('--color-ink')[0]?.section).toBe(8)
  })

  it('records selectors and at-rules', () => {
    expect(byName('--button-fg')[0]?.selectors).toEqual([':root', '.on-plate'])
    expect(byName('--surface').map((d) => d.selectors)).toEqual([[':root'], ['.on-plate']])
    const responsive = byName('--button-radius').find((d) => d.atRules.length > 0)
    expect(responsive?.atRules).toEqual(['@media (min-width: 48rem)'])
    expect(responsive?.value).toBe('10px')
    expect(byName('--color-ink')[0]?.atRules).toEqual(['@theme inline'])
  })

  it('ignores hex inside comments and keeps the section of the rest', () => {
    expect(parsed.hexes.map((h) => h.hex)).toEqual(['#071A2B', '#F7F9FC', '#2458E6', '#00C2D8'])
    expect(parsed.hexes.every((h) => h.section === 1)).toBe(true)
  })

  it('keeps a var() fallback on a reference', () => {
    const geist = parsed.references.find((r) => r.name === '--font-geist-sans')
    expect(geist?.fallback).toBe('"Geist"')
  })

  it('skips plain properties and reports base declarations', () => {
    expect(parsed.declarations.some((d) => d.name === 'color')).toBe(false)
    expect(byName('--surface').map(isBaseDeclaration)).toEqual([true, false])
    expect(byName('--button-radius').map(isBaseDeclaration)).toEqual([true, false])
  })
})

describe('resolution', () => {
  const parsed = parseTokenFile(FIXTURE)
  const light = buildScope(parsed, 'light')
  const plate = buildScope(parsed, 'on-plate')

  it('follows a chain to its primitive on each surface', () => {
    expect(resolveToken('--button-fg', light)).toEqual({ ok: true, value: '#071A2B' })
    expect(resolveToken('--button-fg', plate)).toEqual({ ok: true, value: '#F7F9FC' })
    expect(resolveToken('--focus-ring', plate)).toEqual({ ok: true, value: '#00C2D8' })
  })

  it('substitutes a fallback for an undeclared external variable', () => {
    expect(resolveToken('--font-sans', light)).toEqual({ ok: true, value: '"Geist", sans-serif' })
  })

  it('reports a missing token and a cycle', () => {
    expect(resolveValue('var(--nope)', light)).toEqual({ ok: false, reason: 'missing', token: '--nope' })
    expect(resolveToken('--loop-a', light)).toEqual({ ok: false, reason: 'cycle', token: '--loop-a' })
  })

  it('names the colour primitives and the tokens that resolve to a colour', () => {
    expect([...colourPrimitives(parsed)]).toEqual(['--hx-navy-900', '--hx-gray-50', '--hx-blue-600', '--hx-cyan-500'])
    expect(colourTokens(parsed).sort()).toEqual(['--button-fg', '--focus-ring', '--ink', '--orphan', '--stray-part', '--surface'])
  })
})

describe('contrast', () => {
  const rgb = (hex: string) => {
    const parsed = parseHex(hex)
    if (!parsed) throw new Error(`not a colour: ${hex}`)
    return parsed
  }

  it('parses three and six digit hex and rejects alpha forms', () => {
    expect(parseHex('#fff')).toEqual({ r: 255, g: 255, b: 255 })
    expect(parseHex('#071A2B')).toEqual({ r: 7, g: 26, b: 43 })
    expect(parseHex('#071A2B80')).toBeNull()
    expect(parseHex('transparent')).toBeNull()
  })

  it('matches the WCAG reference ratios', () => {
    expect(contrastRatio(rgb('#000'), rgb('#fff'))).toBeCloseTo(21, 5)
    expect(contrastRatio(rgb('#fff'), rgb('#fff'))).toBeCloseTo(1, 5)
  })

  it('matches the ratios the token file documents', () => {
    expect(contrastRatio(rgb('#071A2B'), rgb('#F7F9FC'))).toBeCloseTo(16.71, 2)
    expect(contrastRatio(rgb('#FFFFFF'), rgb('#2458E6'))).toBeCloseTo(5.81, 2)
    expect(contrastRatio(rgb('#00C2D8'), rgb('#071A2B'))).toBeCloseTo(8.15, 2)
    expect(contrastRatio(rgb('#8A5A06'), rgb('#F7F9FC'))).toBeCloseTo(5.62, 2)
  })
})

describe(TOKEN_FILE, () => {
  const parsed = parseTokenFile(readFileSync(path.join(process.cwd(), TOKEN_FILE), 'utf8'))

  it('keeps every hex in the primitive layer', () => {
    expect(parsed.hexes.length).toBeGreaterThan(20)
    expect(parsed.hexes.filter((h) => h.section !== 1)).toEqual([])
  })

  it('declares the component layer on :root and .on-plate together', () => {
    const component = parsed.declarations.filter((d) => d.section === 3)
    expect(component.length).toBeGreaterThan(100)
    expect(component.every((d) => d.selectors.includes(':root') && d.selectors.includes('.on-plate'))).toBe(true)
  })

  it('resolves every token on both surfaces', () => {
    for (const scope of ['light', 'on-plate'] as const) {
      const values = buildScope(parsed, scope)
      const failures = [...values.keys()].filter((name) => !resolveToken(name, values).ok)
      expect(failures).toEqual([])
    }
  })

  it('re-scopes the focus ring to cyan on a plate and keeps it blue on the page', () => {
    expect(resolveToken('--focus-ring', buildScope(parsed, 'light'))).toEqual({ ok: true, value: '#2458E6' })
    expect(resolveToken('--focus-ring', buildScope(parsed, 'on-plate'))).toEqual({ ok: true, value: '#00C2D8' })
  })
})
