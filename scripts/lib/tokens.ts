/**
 * Token file model shared by `check:tokens`, `check:contrast` and their unit
 * test (redesign handoff 5.5 and 5.6; 09 sections 2 and 10.1; 16 CC-06).
 *
 * `src/styles/tokens.css` is plain CSS with a fixed shape: eight numbered
 * sections introduced by banner comments, custom properties declared on
 * `:root`, `:root, .on-plate` and `.on-plate`, a few responsive and media
 * blocks, and a Tailwind `@theme inline` mapping. Nothing here understands CSS
 * beyond that shape: a small block tokenizer records every custom property with
 * the selectors and at-rules it was declared under and the section it sits in,
 * and a resolver substitutes `var()` chains for one of the two surfaces.
 *
 * Pure functions over text so the unit test can feed fixtures.
 */

export const TOKEN_FILE = 'src/styles/tokens.css'

export type Scope = 'light' | 'on-plate'

export const SECTION_NAMES = {
  0: 'header',
  1: 'primitive',
  2: 'semantic',
  3: 'component',
  4: 'surface',
  5: 'responsive',
  6: 'reduced-motion',
  7: 'forced-colors',
  8: 'theme',
} as const

export type SectionNumber = keyof typeof SECTION_NAMES

export interface Declaration {
  /** Custom property name, including the leading dashes. */
  name: string
  value: string
  /** Selectors of the innermost rule, trimmed, in source order. */
  selectors: string[]
  /** Preludes of every enclosing at-rule, outermost first. */
  atRules: string[]
  section: SectionNumber
  line: number
}

export interface Reference {
  name: string
  fallback: string | null
  line: number
}

export interface HexOccurrence {
  hex: string
  line: number
  section: SectionNumber
}

export interface ParsedTokens {
  declarations: Declaration[]
  /** Every `var(--x)` read anywhere in the file, including non-token properties. */
  references: Reference[]
  /** Every hex literal outside comments. */
  hexes: HexOccurrence[]
}

const BANNER = /^\/\* (\d)\. [A-Z]/
const VAR_REFERENCE = /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\))?[^()]*))?\)/g
const HEX = /#[0-9a-fA-F]{3,8}\b/g

/** Replaces block comments with spaces so line numbers survive. */
export function stripBlockComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '))
}

function sectionOfLine(banners: Array<[line: number, section: SectionNumber]>, line: number): SectionNumber {
  let current: SectionNumber = 0
  for (const [bannerLine, section] of banners) {
    if (bannerLine > line) break
    current = section
  }
  return current
}

export function parseTokenFile(css: string): ParsedTokens {
  const banners: Array<[number, SectionNumber]> = []
  css.split('\n').forEach((text, index) => {
    const match = BANNER.exec(text)
    if (match) banners.push([index + 1, Number(match[1]) as SectionNumber])
  })

  const stripped = stripBlockComments(css)
  const declarations: Declaration[] = []
  const references: Reference[] = []
  const hexes: HexOccurrence[] = []

  stripped.split('\n').forEach((text, index) => {
    const line = index + 1
    for (const match of text.matchAll(HEX)) {
      hexes.push({ hex: match[0], line, section: sectionOfLine(banners, line) })
    }
    for (const match of text.matchAll(VAR_REFERENCE)) {
      references.push({ name: match[1], fallback: match[2]?.trim() ?? null, line })
    }
  })

  // Block tokenizer. A prelude is the text between the previous statement end
  // and a `{`; it is an at-rule when it starts with `@`, otherwise a selector list.
  const stack: Array<{ prelude: string; atRule: boolean }> = []
  let buffer = ''
  let bufferStartLine = 1
  let line = 1
  let depth = 0

  const flushDeclaration = () => {
    const statement = buffer.trim()
    buffer = ''
    if (!statement) return
    const colon = statement.indexOf(':')
    if (colon === -1) return
    const name = statement.slice(0, colon).trim()
    if (!name.startsWith('--')) return
    const innermost = [...stack].reverse().find((entry) => !entry.atRule)
    declarations.push({
      name,
      value: statement.slice(colon + 1).trim(),
      selectors: innermost ? innermost.prelude.split(',').map((s) => s.trim()) : [],
      atRules: stack.filter((entry) => entry.atRule).map((entry) => entry.prelude),
      section: sectionOfLine(banners, bufferStartLine),
      line: bufferStartLine,
    })
  }

  for (const char of stripped) {
    if (char === '\n') line += 1
    if (!buffer.trim()) bufferStartLine = line

    if (char === '{' && depth === 0) {
      const prelude = buffer.trim()
      stack.push({ prelude, atRule: prelude.startsWith('@') })
      buffer = ''
    } else if (char === '}' && depth === 0) {
      flushDeclaration()
      stack.pop()
    } else if (char === ';' && depth === 0) {
      flushDeclaration()
    } else {
      if (char === '(') depth += 1
      if (char === ')') depth -= 1
      buffer += char
    }
  }

  return { declarations, references, hexes }
}

/** Declarations that apply at rest on the page: `:root` with no at-rule. */
export function isBaseDeclaration(declaration: Declaration): boolean {
  return declaration.atRules.length === 0 && declaration.selectors.includes(':root')
}

/** Declarations the `.on-plate` class applies at rest. */
export function isPlateDeclaration(declaration: Declaration): boolean {
  return declaration.atRules.length === 0 && declaration.selectors.includes('.on-plate')
}

/** Raw values by name for one surface, later declarations winning. */
export function buildScope(parsed: ParsedTokens, scope: Scope): Map<string, string> {
  const values = new Map<string, string>()
  for (const declaration of parsed.declarations) {
    if (isBaseDeclaration(declaration)) values.set(declaration.name, declaration.value)
  }
  if (scope === 'on-plate') {
    for (const declaration of parsed.declarations) {
      if (isPlateDeclaration(declaration)) values.set(declaration.name, declaration.value)
    }
  }
  return values
}

export type Resolution =
  | { ok: true; value: string }
  | { ok: false; reason: 'missing' | 'cycle'; token: string }

/**
 * Substitutes every `var()` in `value` against `scope`. A `var()` with a
 * fallback resolves to the fallback when its token is not declared, which is
 * how the two `next/font` variables enter the file.
 */
export function resolveValue(value: string, scope: Map<string, string>, seen: string[] = []): Resolution {
  const state: { failure: Resolution | null } = { failure: null }
  const substituted = value.replace(VAR_REFERENCE, (_match, name: string, fallback?: string) => {
    if (state.failure) return ''
    if (seen.includes(name)) {
      state.failure = { ok: false, reason: 'cycle', token: name }
      return ''
    }
    const raw = scope.get(name)
    if (raw === undefined) {
      if (fallback !== undefined) return fallback.trim()
      state.failure = { ok: false, reason: 'missing', token: name }
      return ''
    }
    const inner = resolveValue(raw, scope, [...seen, name])
    if (!inner.ok) {
      state.failure = inner
      return ''
    }
    return inner.value
  })
  return state.failure ?? { ok: true, value: substituted.trim() }
}

export function resolveToken(name: string, scope: Map<string, string>): Resolution {
  const raw = scope.get(name)
  if (raw === undefined) return { ok: false, reason: 'missing', token: name }
  return resolveValue(raw, scope, [name])
}

export interface Rgb {
  r: number
  g: number
  b: number
}

/** Accepts `#rgb` and `#rrggbb`; anything else, including alpha forms, is not a token colour. */
export function parseHex(value: string): Rgb | null {
  const match = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec(value.trim())
  if (!match) return null
  const hex = match[1].length === 3 ? [...match[1]].map((c) => c + c).join('') : match[1]
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  }
}

function linearChannel(channel: number): number {
  const c = channel / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

/** WCAG 2.x relative luminance. */
export function relativeLuminance({ r, g, b }: Rgb): number {
  return 0.2126 * linearChannel(r) + 0.7152 * linearChannel(g) + 0.0722 * linearChannel(b)
}

/** WCAG 2.x contrast ratio, order independent, in the range 1 to 21. */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  const [light, dark] = la >= lb ? [la, lb] : [lb, la]
  return (light + 0.05) / (dark + 0.05)
}

/** Primitive-layer tokens whose value is a hex colour: the only hex the file may hold. */
export function colourPrimitives(parsed: ParsedTokens): Set<string> {
  const names = new Set<string>()
  for (const declaration of parsed.declarations) {
    if (declaration.section === 1 && parseHex(declaration.value)) names.add(declaration.name)
  }
  return names
}

/**
 * Non-primitive tokens that resolve to a colour on either surface. These are
 * the tokens the contrast manifest must cover.
 */
export function colourTokens(parsed: ParsedTokens): string[] {
  const light = buildScope(parsed, 'light')
  const plate = buildScope(parsed, 'on-plate')
  const names = new Set<string>()
  for (const declaration of parsed.declarations) {
    if (declaration.section === 1 || declaration.section === 8) continue
    if (declaration.name.startsWith('--hx-')) continue
    for (const scope of [light, plate]) {
      const resolved = resolveToken(declaration.name, scope)
      if (resolved.ok && parseHex(resolved.value)) names.add(declaration.name)
    }
  }
  return [...names]
}
