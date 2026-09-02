/**
 * Token lint (redesign handoff 5.6 and section 8; 09 sections 1 and 10.1;
 * reconciliation register RX-11; 11 section 8 item 6).
 *
 * Over `src/styles/tokens.css`:
 *
 * 1. A hex literal outside the primitive layer fails. The primitive layer is
 *    the only place a raw colour may live; everything above it reads a role.
 * 2. Every `var()` read in the file resolves, on both surfaces, to a terminal
 *    value without a cycle. The two `next/font` variables enter through their
 *    fallbacks and are the only names allowed to be undeclared.
 * 3. A component-layer token declared on `:root` alone fails. A component token
 *    written as `var(--role)` is substituted where it is declared, so on
 *    `:root` alone it would keep its light value inside `.on-plate`.
 * 4. Every token the `.on-plate` block, a media query or a variance switch
 *    re-scopes has a base declaration on `:root`, so the re-scope is a swap and
 *    never the only definition.
 *
 * Over `src/`:
 *
 * 5. A colour primitive (`--hx-` name whose value is a hex) referenced from any
 *    file fails. Geometry primitives (radius, stroke, space, size, time) may be
 *    read, since they have no semantic equivalent.
 * 6. A hex literal in a component, page or stylesheet fails, with a short
 *    allowlist for the surfaces that cannot read a stylesheet at all.
 * 7. Legacy alias names warn with the replacement named. They resolve for one
 *    release through the token file's theme mapping and are retired call site
 *    by call site (handoff 5.3, 5.4).
 * 8. The motion grep gates: `@keyframes`, `requestAnimationFrame`,
 *    `animation-timeline`, `infinite` and `autoplay` return zero outside
 *    `node_modules` and outside the copy under `src/content`; `src/lib/motion.ts`,
 *    once it exists, stays under 3 KB compressed. The `@starting-style`
 *    presence check joins when the four mount-time entries land (PR 3, PR 6).
 *
 * Warnings print and do not fail. Any failure exits non-zero.
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

import {
  buildScope,
  colourPrimitives,
  isBaseDeclaration,
  parseTokenFile,
  resolveToken,
  resolveValue,
  SECTION_NAMES,
  TOKEN_FILE,
  type Declaration,
  type ParsedTokens,
} from './lib/tokens'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'src')
const SCANNED_EXTENSIONS = new Set(['.ts', '.tsx', '.css', '.mdx'])

/** Names the token file reads without declaring. Each must carry a fallback. */
const EXTERNAL_VARIABLES = new Set(['--font-geist-sans', '--font-geist-mono'])

/**
 * Files that cannot read `globals.css` and therefore carry literal colours:
 * `ImageResponse` renders to a bitmap with no stylesheet, `global-error.tsx`
 * replaces the root layout that imports the stylesheet, and the manifest and
 * `themeColor` metadata are JSON the browser reads before any CSS.
 */
const HEX_ALLOWLIST = new Set([
  'src/app/global-error.tsx',
  'src/app/layout.tsx',
  'src/app/manifest.ts',
  'src/lib/seo/og-image.tsx',
])

/** Legacy names the theme mapping keeps for one release, with their replacement. */
const LEGACY_ALIASES: Record<string, string> = {
  '--color-navy': '--surface-plate (a plate ground) or bg-plate',
  '--color-navy-2': '--surface-plate-2',
  '--color-blue': '--ev-measured, --path or --action, by meaning',
  '--color-blue-hover': '--ev-measured-hover or --action-hover',
  '--color-field': '--page-bg or --surface',
  '--color-graphite': '--ink-body',
  '--color-slate': '--ink-2',
  '--color-border': '--rule (decorative) or --rule-strong (control edge)',
  '--color-soft': '--surface-tint',
  '--color-cyan': '--focus-ring',
  '--color-amber': '--ev-gap',
  '--color-positive': '--signal-positive',
  '--color-destructive': '--signal-destructive',
  '--color-white': '--surface-raised',
  '--radius-button': '--radius-control',
  '--radius-card': '--radius-tile',
  '--radius-panel': '--radius-plate',
  '--font-geist-sans': '--font-sans',
  '--font-geist-mono': '--font-mono',
}

/** 11 section 8 item 6. Each pattern must return zero matches in shipped code. */
const MOTION_GATES: Array<{ label: string; pattern: RegExp }> = [
  { label: '@keyframes', pattern: /@keyframes\b/ },
  { label: 'requestAnimationFrame', pattern: /\brequestAnimationFrame\b/ },
  { label: 'animation-timeline', pattern: /\banimation-timeline\b/ },
  { label: 'infinite', pattern: /\binfinite\b/ },
  { label: 'autoplay', pattern: /\bautoplay\b/i },
]
const MOTION_MODULE = 'src/lib/motion.ts'
const MOTION_MODULE_BUDGET_BYTES = 3 * 1024
const CONTENT_DIR = 'src/content'

const HEX = /#[0-9a-fA-F]{3,8}\b/g
const HX_REFERENCE = /--hx-[\w-]+/g
const LEGACY_REFERENCE = /--(?:color-[\w-]+|radius-(?:button|card|panel)|font-geist-(?:sans|mono))\b/g

type Failure = { where: string; message: string }
type Warning = Failure

const failures: Failure[] = []
const warnings: Warning[] = []

function fail(where: string, message: string) {
  failures.push({ where, message })
}

function warn(where: string, message: string) {
  warnings.push({ where, message })
}

async function sourceFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return sourceFiles(full)
      return SCANNED_EXTENSIONS.has(path.extname(entry.name)) ? [full] : []
    }),
  )
  return nested.flat()
}

/** Drops block comments and line comments so a mention in prose is not a hit. */
function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:'"`])\/\/[^\n]*/g, (_match, before: string) => before)
}

function lineOf(source: string, index: number): number {
  return source.slice(0, index).split('\n').length
}

function describe(declaration: Declaration): string {
  return `${TOKEN_FILE}:${declaration.line} ${declaration.name}`
}

function checkTokenFile(parsed: ParsedTokens) {
  const where = TOKEN_FILE

  // 1. Hex outside the primitive layer.
  for (const hex of parsed.hexes) {
    if (hex.section !== 1) {
      fail(`${where}:${hex.line}`, `${hex.hex} is a literal colour in the ${SECTION_NAMES[hex.section]} section; only the primitive layer may hold a hex`)
    }
  }

  // 2. Every reference resolves on both surfaces, without a cycle.
  const declared = new Set(parsed.declarations.map((declaration) => declaration.name))
  for (const reference of parsed.references) {
    if (declared.has(reference.name)) continue
    if (EXTERNAL_VARIABLES.has(reference.name) && reference.fallback) continue
    fail(`${where}:${reference.line}`, `var(${reference.name}) is not declared in the token file${EXTERNAL_VARIABLES.has(reference.name) ? ' and carries no fallback' : ''}`)
  }
  for (const scope of ['light', 'on-plate'] as const) {
    const values = buildScope(parsed, scope)
    for (const name of values.keys()) {
      const resolved = resolveToken(name, values)
      if (!resolved.ok) {
        fail(`${where} ${name}`, `${resolved.reason === 'cycle' ? 'cycles through' : 'reads undeclared'} ${resolved.token} on the ${scope} surface`)
      }
    }
    // Theme keys are not tokens but their values must resolve on the page.
    for (const declaration of parsed.declarations) {
      if (declaration.section !== 8) continue
      const resolved = resolveValue(declaration.value, values)
      if (!resolved.ok) {
        fail(describe(declaration), `theme mapping ${resolved.reason === 'cycle' ? 'cycles through' : 'reads undeclared'} ${resolved.token}`)
      }
    }
  }

  // 3. Component-layer tokens are declared on `:root, .on-plate`.
  for (const declaration of parsed.declarations) {
    if (declaration.section !== 3 || declaration.atRules.length > 0) continue
    if (!declaration.selectors.includes('.on-plate')) {
      fail(describe(declaration), `component-layer token declared on ${declaration.selectors.join(', ')} without .on-plate; it would keep its light value inside a plate`)
    }
  }

  // 4. Every re-scoped token has a base.
  const bases = new Set(parsed.declarations.filter(isBaseDeclaration).map((declaration) => declaration.name))
  for (const declaration of parsed.declarations) {
    if (declaration.section === 8 || isBaseDeclaration(declaration)) continue
    if (!bases.has(declaration.name)) {
      fail(describe(declaration), `re-scoped under ${[...declaration.atRules, declaration.selectors.join(', ')].filter(Boolean).join(' ')} with no base declaration on :root`)
    }
  }
}

async function checkSourceTree(parsed: ParsedTokens) {
  const primitives = colourPrimitives(parsed)
  const tokenFilePath = path.join(ROOT, TOKEN_FILE)
  const files = (await sourceFiles(SRC)).filter((file) => file !== tokenFilePath)
  const legacyHits = new Map<string, Map<string, number>>()

  for (const file of files) {
    const relative = path.relative(ROOT, file)
    const source = stripComments(await readFile(file, 'utf8'))
    const inContent = relative.startsWith(CONTENT_DIR + path.sep)

    // 5. Colour primitives never leave the token file.
    for (const match of source.matchAll(HX_REFERENCE)) {
      if (primitives.has(match[0])) {
        fail(`${relative}:${lineOf(source, match.index)}`, `${match[0]} is a colour primitive; read the semantic role instead`)
      }
    }

    // 6. No literal colours outside the allowlist.
    if (!HEX_ALLOWLIST.has(relative)) {
      for (const match of source.matchAll(HEX)) {
        fail(`${relative}:${lineOf(source, match.index)}`, `${match[0]} is a literal colour; read a token`)
      }
    }

    // 7. Legacy alias names.
    for (const match of source.matchAll(LEGACY_REFERENCE)) {
      if (!(match[0] in LEGACY_ALIASES)) continue
      const perFile = legacyHits.get(match[0]) ?? new Map<string, number>()
      perFile.set(relative, (perFile.get(relative) ?? 0) + 1)
      legacyHits.set(match[0], perFile)
    }

    // 8. Motion grep gates, outside the copy.
    if (!inContent) {
      for (const gate of MOTION_GATES) {
        const match = gate.pattern.exec(source)
        if (match) {
          fail(`${relative}:${lineOf(source, match.index)}`, `${gate.label} is banned by the motion rules (11 section 8)`)
        }
      }
    }
  }

  for (const [alias, perFile] of [...legacyHits].sort()) {
    const total = [...perFile.values()].reduce((sum, count) => sum + count, 0)
    warn(alias, `${total} reference${total === 1 ? '' : 's'} across ${perFile.size} file${perFile.size === 1 ? '' : 's'}; migrate to ${LEGACY_ALIASES[alias]}`)
  }

  const motionModule = files.find((file) => path.relative(ROOT, file) === MOTION_MODULE)
  if (motionModule) {
    const compressed = gzipSync(await readFile(motionModule)).byteLength
    if (compressed > MOTION_MODULE_BUDGET_BYTES) {
      fail(MOTION_MODULE, `${compressed} bytes compressed exceeds the ${MOTION_MODULE_BUDGET_BYTES} byte budget`)
    }
  }
}

async function main() {
  const parsed = parseTokenFile(await readFile(path.join(ROOT, TOKEN_FILE), 'utf8'))
  if (parsed.declarations.length === 0) {
    fail(TOKEN_FILE, 'no custom properties parsed; the section banners or block shape changed')
  }

  checkTokenFile(parsed)
  await checkSourceTree(parsed)

  const counts = parsed.declarations.reduce<Record<string, number>>((acc, declaration) => {
    const name = SECTION_NAMES[declaration.section]
    acc[name] = (acc[name] ?? 0) + 1
    return acc
  }, {})
  console.log(`check:tokens over ${TOKEN_FILE}: ${Object.entries(counts).map(([name, count]) => `${count} ${name}`).join(', ')}`)

  for (const warning of warnings) {
    console.log(`  warn  ${warning.where}: ${warning.message}`)
  }
  for (const failure of failures) {
    console.error(`  FAIL  ${failure.where}: ${failure.message}`)
  }

  if (failures.length > 0) {
    console.error(`\ncheck:tokens failed with ${failures.length} problem${failures.length === 1 ? '' : 's'}.`)
    process.exit(1)
  }
  console.log(`check:tokens passed${warnings.length ? ` with ${warnings.length} legacy alias warning${warnings.length === 1 ? '' : 's'}` : ''}.`)
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
