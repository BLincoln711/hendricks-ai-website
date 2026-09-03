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
 * a resolver substitutes `var()` chains for one of the two grounds, and a
 * colour model composites the canvas's alpha ink tiers over the ground they
 * are painted on so a ratio is computed against the painted colour.
 *
 * Pure functions over text so the unit test can feed fixtures.
 */

export const TOKEN_FILE = 'src/styles/tokens.css'

/**
 * The two grounds a token can resolve against. `page` is the document ground
 * `--bg`; `plate` is an instrument surface, the `.on-plate` re-scope. The pair
 * was named light and dark before the canvas; the whole document is one dark
 * ground now, so the distinction that remains is page against instrument.
 */
export type Scope = 'page' | 'plate'

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
  if (scope === 'plate') {
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

/** A colour that may be partly transparent. `a` is 0 to 1; 1 is opaque. */
export interface Rgba extends Rgb {
  a: number
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

const RGB_FUNCTION = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/i

/**
 * Every colour form the canvas token file uses: opaque hex, `#rrggbbaa`, and
 * the `rgba(r, g, b, a)` ink tiers. The canvas states its ink, hairline and
 * control-boundary tiers as Field White at an alpha, so a gate that only read
 * hex would silently skip the five values that carry most of the page's text.
 */
export function parseColor(value: string): Rgba | null {
  const trimmed = value.trim()
  const opaque = parseHex(trimmed)
  if (opaque) return { ...opaque, a: 1 }

  const withAlpha = /^#([0-9a-fA-F]{8})$/.exec(trimmed)
  if (withAlpha) {
    const hex = withAlpha[1]
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: parseInt(hex.slice(6, 8), 16) / 255,
    }
  }

  const fn = RGB_FUNCTION.exec(trimmed)
  if (!fn) return null
  const [r, g, b] = [fn[1], fn[2], fn[3]].map(Number)
  const rawAlpha = fn[4]
  const a = rawAlpha === undefined ? 1 : rawAlpha.endsWith('%') ? Number(rawAlpha.slice(0, -1)) / 100 : Number(rawAlpha)
  if ([r, g, b, a].some((channel) => !Number.isFinite(channel))) return null
  return { r, g, b, a: Math.min(Math.max(a, 0), 1) }
}

/**
 * Source-over composite of `fg` onto an opaque `bg`, which is what the browser
 * paints and therefore what the ratio must be computed against. Channels are
 * kept unrounded so the ratio matches the painted colour rather than an 8-bit
 * approximation of it.
 */
export function composite(fg: Rgba, bg: Rgb): Rgb {
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
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

/** Primitive-layer tokens whose value is a colour: the only literal colours the file may hold. */
export function colourPrimitives(parsed: ParsedTokens): Set<string> {
  const names = new Set<string>()
  for (const declaration of parsed.declarations) {
    if (declaration.section === 1 && parseColor(declaration.value)) names.add(declaration.name)
  }
  return names
}

/**
 * Non-primitive tokens that resolve to a colour on either surface. These are
 * the tokens the contrast manifest must cover.
 */
export function colourTokens(parsed: ParsedTokens): string[] {
  const page = buildScope(parsed, 'page')
  const plate = buildScope(parsed, 'plate')
  const names = new Set<string>()
  for (const declaration of parsed.declarations) {
    if (declaration.section === 1 || declaration.section === 8) continue
    if (declaration.name.startsWith('--hx-')) continue
    for (const scope of [page, plate]) {
      const resolved = resolveToken(declaration.name, scope)
      if (resolved.ok && parseColor(resolved.value)) names.add(declaration.name)
    }
  }
  return [...names]
}
