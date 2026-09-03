import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import {
  buildScope,
  colourPrimitives,
  colourTokens,
  composite,
  contrastRatio,
  isBaseDeclaration,
  parseColor,
  parseHex,
  parseTokenFile,
  resolveToken,
  resolveValue,
  TOKEN_FILE,
} from '../../scripts/lib/tokens'

/**
 * The token model behind `check:tokens` and `check:contrast`. The fixtures pin
 * the file shape the parser depends on: numbered section banners, the
 * `:root, .on-plate` component layer, the `.on-plate` re-scope, and `var()`
 * chains that must resolve on both grounds. The colour block pins the part the
 * canvas added, compositing an alpha ink over the ground it is painted on,
 * because the canvas states most of its text colours that way and a gate that
 * read them as literals would skip them. The last block runs the model over the
 * real file so a structural edit to `src/styles/tokens.css` fails here before it
 * fails the gates.
 */
const FIXTURE = `/*
 * Header comment with a hex that must be ignored: #ABCDEF.
 */

/* ========================================================================== */
/* 1. PRIMITIVE LAYER. */
/* ========================================================================== */
:root {
  --hx-canvas-950: #060E16; /* 18.40:1 under #F7F9FC */
  --hx-white: #F7F9FC;
  --hx-white-62: rgba(247, 249, 252, 0.62);
  --hx-blue-400: #6E92F0;
  --hx-cyan-500: #00C2D8;
  --hx-radius-8: 8px;
  --hx-font-sans: var(--font-geist-sans, "Geist"), sans-serif;
}

/* ========================================================================== */
/* 2. SEMANTIC LAYER. */
/* ========================================================================== */
:root {
  --bg: var(--hx-canvas-950);
  --plate: var(--hx-canvas-950);
  --surface: var(--bg);
  --ink: var(--hx-white);
  --ink-2: var(--hx-white-62);
  --focus: var(--hx-cyan-500);
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
  --surface: var(--plate);
  --ink: var(--hx-blue-400);
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
    expect(byName('--hx-canvas-950')[0]?.section).toBe(1)
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
    expect(parsed.hexes.map((h) => h.hex)).toEqual(['#060E16', '#F7F9FC', '#6E92F0', '#00C2D8'])
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
  const page = buildScope(parsed, 'page')
  const plate = buildScope(parsed, 'plate')

  it('follows a chain to its primitive on each ground', () => {
    expect(resolveToken('--button-fg', page)).toEqual({ ok: true, value: '#F7F9FC' })
    expect(resolveToken('--button-fg', plate)).toEqual({ ok: true, value: '#6E92F0' })
    expect(resolveToken('--focus', plate)).toEqual({ ok: true, value: '#00C2D8' })
  })

  it('resolves an alpha ink tier without flattening it', () => {
    expect(resolveToken('--ink-2', page)).toEqual({ ok: true, value: 'rgba(247, 249, 252, 0.62)' })
  })

  it('substitutes a fallback for an undeclared external variable', () => {
    expect(resolveToken('--font-sans', page)).toEqual({ ok: true, value: '"Geist", sans-serif' })
  })

  it('reports a missing token and a cycle', () => {
    expect(resolveValue('var(--nope)', page)).toEqual({ ok: false, reason: 'missing', token: '--nope' })
    expect(resolveToken('--loop-a', page)).toEqual({ ok: false, reason: 'cycle', token: '--loop-a' })
  })

  it('names the colour primitives, alpha tiers included, and the tokens that resolve to a colour', () => {
    expect([...colourPrimitives(parsed)]).toEqual([
      '--hx-canvas-950',
      '--hx-white',
      '--hx-white-62',
      '--hx-blue-400',
      '--hx-cyan-500',
    ])
    expect(colourTokens(parsed).sort()).toEqual([
      '--bg',
      '--button-fg',
      '--focus',
      '--ink',
      '--ink-2',
      '--orphan',
      '--plate',
      '--stray-part',
      '--surface',
    ])
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

  it('parses every colour form the canvas uses and rejects the rest', () => {
    expect(parseColor('#F7F9FC')).toEqual({ r: 247, g: 249, b: 252, a: 1 })
    expect(parseColor('#060E1680')).toEqual({ r: 6, g: 14, b: 22, a: 128 / 255 })
    expect(parseColor('rgba(247, 249, 252, 0.62)')).toEqual({ r: 247, g: 249, b: 252, a: 0.62 })
    expect(parseColor('rgb(6 14 22)')).toEqual({ r: 6, g: 14, b: 22, a: 1 })
    expect(parseColor('rgb(6 14 22 / 50%)')).toEqual({ r: 6, g: 14, b: 22, a: 0.5 })
    expect(parseColor('transparent')).toBeNull()
    expect(parseColor('CanvasText')).toBeNull()
  })

  it('matches the WCAG reference ratios', () => {
    expect(contrastRatio(rgb('#000'), rgb('#fff'))).toBeCloseTo(21, 5)
    expect(contrastRatio(rgb('#fff'), rgb('#fff'))).toBeCloseTo(1, 5)
  })

  it('matches the ratios the canvas documents for its opaque values', () => {
    expect(contrastRatio(rgb('#F7F9FC'), rgb('#060E16'))).toBeCloseTo(18.4, 2)
    expect(contrastRatio(rgb('#F7F9FC'), rgb('#2458E6'))).toBeCloseTo(5.51, 2)
    expect(contrastRatio(rgb('#00C2D8'), rgb('#060E16'))).toBeCloseTo(8.97, 2)
    expect(contrastRatio(rgb('#8FB0F5'), rgb('#060E16'))).toBeCloseTo(8.96, 2)
  })

  it('composites an alpha ink over the ground before measuring it', () => {
    const ground = rgb('#060E16')
    const alpha = (a: number) => ({ r: 247, g: 249, b: 252, a })

    // Fully transparent leaves the ground; fully opaque leaves the ink.
    expect(composite(alpha(0), ground)).toEqual(ground)
    expect(composite(alpha(1), ground)).toEqual({ r: 247, g: 249, b: 252 })

    // The three tiers the canvas measures. Read as literals these would all
    // report 18.40:1, which is the failure the compositing step exists to stop.
    expect(contrastRatio(composite(alpha(0.74), ground), ground)).toBeCloseTo(10.16, 2)
    expect(contrastRatio(composite(alpha(0.62), ground), ground)).toBeCloseTo(7.35, 2)
    expect(contrastRatio(composite(alpha(0.38), ground), ground)).toBeCloseTo(3.41, 2)
  })
})

describe(TOKEN_FILE, () => {
  const parsed = parseTokenFile(readFileSync(path.join(process.cwd(), TOKEN_FILE), 'utf8'))

  it('keeps every literal colour in the primitive layer', () => {
    // The canvas states five of its colours as Field White at an alpha, so the
    // hex count alone no longer measures the palette; the primitive set does.
    expect(parsed.hexes.filter((h) => h.section !== 1)).toEqual([])
    expect(colourPrimitives(parsed).size).toBeGreaterThan(15)
    expect([...colourPrimitives(parsed)].filter((name) => name.includes('white-')).length).toBe(5)
  })

  it('declares the component layer on :root and .on-plate together', () => {
    const component = parsed.declarations.filter((d) => d.section === 3)
    expect(component.length).toBeGreaterThan(100)
    expect(component.every((d) => d.selectors.includes(':root') && d.selectors.includes('.on-plate'))).toBe(true)
  })

  it('resolves every token on both grounds', () => {
    for (const scope of ['page', 'plate'] as const) {
      const values = buildScope(parsed, scope)
      const failures = [...values.keys()].filter((name) => !resolveToken(name, values).ok)
      expect(failures).toEqual([])
    }
  })

  it('keeps one ground, so a plate reads the same colour the page does', () => {
    const page = buildScope(parsed, 'page')
    const plate = buildScope(parsed, 'plate')
    expect(resolveToken('--bg', page)).toEqual({ ok: true, value: '#060E16' })
    expect(resolveToken('--surface', page)).toEqual({ ok: true, value: '#060E16' })
    // The re-scope is a real swap: on a plate --surface reads --plate, which is
    // the one other value the canvas allows an instrument surface to take.
    expect(resolveToken('--surface', plate)).toEqual(resolveToken('--plate', page))
  })

  it('carries the canvas ink tiers as alpha over the ground, not as flattened hex', () => {
    const page = buildScope(parsed, 'page')
    expect(resolveToken('--ink', page)).toEqual({ ok: true, value: '#F7F9FC' })
    expect(resolveToken('--ink-2', page)).toEqual({ ok: true, value: 'rgba(247, 249, 252, 0.62)' })
    expect(resolveToken('--ink-3', page)).toEqual({ ok: true, value: 'rgba(247, 249, 252, 0.74)' })
    expect(resolveToken('--edge', page)).toEqual({ ok: true, value: 'rgba(247, 249, 252, 0.38)' })
  })
})
