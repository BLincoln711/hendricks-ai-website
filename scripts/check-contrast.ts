/**
 * Contrast gate for the canvas system.
 *
 * Reads `src/styles/tokens.css` and `scripts/contrast-pairs.json`, resolves
 * each row's foreground and background through the three token layers on the
 * ground the row names (`page` is the document ground, `plate` applies the
 * `.on-plate` re-scope), composites the foreground over that ground when it
 * carries alpha, computes the WCAG 2.x ratio, prints one table, and exits
 * non-zero when:
 *
 * - a row is under its threshold;
 * - a row names a token that does not resolve to a colour on its ground;
 * - a row's background is not opaque, since a ratio needs a painted ground;
 * - a row's threshold does not match its role (text 4.5, large-text, graphic
 *   and control-edge 3, decorative none), so a text pair cannot be relaxed by
 *   editing the number;
 * - a colour token in the file has no row, so a new colour ships with a ratio;
 * - a colour primitive is reachable from no row, so a dead primitive is noticed.
 *
 * Compositing is the reason this gate exists in the shape it does. The canvas
 * states its ink tiers, its hairlines and its control boundary as Field White
 * at an alpha over `#060E16`. Read as literals those five values are
 * meaningless; painted, they are the colours most of the site's text is set in.
 *
 * Decorative rows print without a threshold and never fail.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'

import {
  buildScope,
  colourPrimitives,
  colourTokens,
  composite,
  contrastRatio,
  parseColor,
  parseTokenFile,
  resolveToken,
  TOKEN_FILE,
  type Scope,
} from './lib/tokens'

const ROOT = process.cwd()
const MANIFEST = 'scripts/contrast-pairs.json'

const ROLES = {
  text: 4.5,
  'large-text': 3,
  graphic: 3,
  'control-edge': 3,
  decorative: null,
} as const

type Role = keyof typeof ROLES

interface Pair {
  fg: string
  bg: string
  scope: Scope
  role: Role
  threshold: number | null
  /** Optional reason, printed with the row; decorative rows should carry one. */
  note?: string
}

/**
 * Primitives that are declared but deliberately unreferenced. Each entry names
 * the decision that keeps it, so the gate is not silenced by a growing list.
 */
const UNREFERENCED_PRIMITIVES: Record<string, string> = {}

function isPair(value: unknown): value is Pair {
  if (typeof value !== 'object' || value === null) return false
  const row = value as Record<string, unknown>
  return (
    typeof row.fg === 'string' &&
    typeof row.bg === 'string' &&
    (row.scope === 'page' || row.scope === 'plate') &&
    typeof row.role === 'string' &&
    row.role in ROLES &&
    (row.threshold === null || typeof row.threshold === 'number')
  )
}

/** Every primitive a resolution passes through, so coverage can be traced. */
function primitivesBehind(name: string, scope: Map<string, string>, seen = new Set<string>()): Set<string> {
  const raw = scope.get(name)
  if (raw === undefined || seen.has(name)) return seen
  seen.add(name)
  for (const match of raw.matchAll(/var\((--[\w-]+)/g)) {
    primitivesBehind(match[1], scope, seen)
  }
  return seen
}

async function main() {
  const parsed = parseTokenFile(await readFile(path.join(ROOT, TOKEN_FILE), 'utf8'))
  const manifest: unknown = JSON.parse(await readFile(path.join(ROOT, MANIFEST), 'utf8'))

  if (!Array.isArray(manifest) || !manifest.every(isPair)) {
    console.error(`${MANIFEST} must be an array of { fg, bg, scope, role, threshold } rows`)
    process.exit(1)
  }

  const scopes: Record<Scope, Map<string, string>> = {
    page: buildScope(parsed, 'page'),
    plate: buildScope(parsed, 'plate'),
  }

  const failures: string[] = []
  const covered = new Set<string>()
  const reached = new Set<string>()
  const rows: string[][] = []

  for (const pair of manifest) {
    const scope = scopes[pair.scope]
    const expected = ROLES[pair.role]
    if (pair.threshold !== expected) {
      failures.push(`${pair.fg} on ${pair.bg} (${pair.scope}): role ${pair.role} requires threshold ${expected ?? 'null'}, row says ${pair.threshold}`)
    }

    const colours = [pair.fg, pair.bg].map((name) => {
      const resolved = resolveToken(name, scope)
      const rgba = resolved.ok ? parseColor(resolved.value) : null
      if (!rgba) {
        failures.push(`${name} does not resolve to a colour on the ${pair.scope} ground${resolved.ok ? ` (${resolved.value})` : ` (${resolved.reason} ${resolved.token})`}`)
      }
      return rgba
    })
    const [fg, bg] = colours
    if (!fg || !bg) continue
    if (bg.a !== 1) {
      failures.push(`${pair.bg} is not opaque on the ${pair.scope} ground; a ratio needs the colour actually painted behind the text`)
      continue
    }

    covered.add(pair.fg)
    covered.add(pair.bg)
    for (const name of [pair.fg, pair.bg]) {
      for (const primitive of primitivesBehind(name, scope)) reached.add(primitive)
    }

    const ratio = contrastRatio(composite(fg, bg), bg)
    const under = pair.threshold !== null && ratio < pair.threshold
    if (under) {
      failures.push(`${pair.fg} on ${pair.bg} (${pair.scope}, ${pair.role}): ${ratio.toFixed(2)}:1 is under ${pair.threshold}:1`)
    }
    rows.push([
      under ? 'FAIL' : pair.threshold === null ? 'dec ' : 'ok  ',
      pair.scope,
      pair.role,
      pair.fg,
      pair.bg,
      `${ratio.toFixed(2)}:1`,
      pair.threshold === null ? '' : `>= ${pair.threshold}`,
      fg.a === 1 ? '' : `alpha ${fg.a}`,
      pair.note ?? '',
    ])
  }

  const tokens = colourTokens(parsed)
  for (const name of tokens) {
    if (!covered.has(name)) failures.push(`${name} is a colour token with no row in ${MANIFEST}`)
  }
  const primitives = colourPrimitives(parsed)
  for (const primitive of primitives) {
    if (!reached.has(primitive) && !(primitive in UNREFERENCED_PRIMITIVES)) {
      failures.push(`${primitive} is a colour primitive no row reaches; add a pair for the role that reads it or record why it is held`)
    }
  }
  for (const [primitive, reason] of Object.entries(UNREFERENCED_PRIMITIVES)) {
    if (reached.has(primitive)) failures.push(`${primitive} is listed as unreferenced (${reason}) but a row reaches it; remove it from the list`)
  }

  const widths = rows[0]?.map((_, column) => Math.max(...rows.map((row) => row[column].length))) ?? []
  for (const row of rows) {
    console.log(row.map((cell, column) => cell.padEnd(widths[column])).join('  ').trimEnd())
  }
  const coveredTokens = tokens.filter((name) => covered.has(name)).length
  const reachedPrimitives = [...primitives].filter((name) => reached.has(name)).length
  console.log(`\n${rows.length} pairs; ${coveredTokens} of ${tokens.length} colour tokens covered; ${reachedPrimitives} of ${primitives.size} colour primitives reached.`)

  if (failures.length > 0) {
    for (const failure of failures) console.error(`  FAIL  ${failure}`)
    console.error(`\ncheck:contrast failed with ${failures.length} problem${failures.length === 1 ? '' : 's'}.`)
    process.exit(1)
  }
  console.log('check:contrast passed.')
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
