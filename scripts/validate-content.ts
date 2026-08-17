/**
 * Content governance gate.
 *
 * Enforces the rules from `docs/12-CONTENT-GOVERNANCE.md`, `docs/10` §2, and
 * `AGENTS.md` that can be checked without rendering: brand separation, placeholder
 * text, retired terminology, hype language, and the illustrative-data label.
 *
 * This runs on source rather than rendered HTML so it can gate a commit without a
 * build. The rendered-output equivalents live in `tests/e2e/commercial-routes.spec.ts`.
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'src')

/**
 * The Search Economy may appear only in Brandon's founder biography on /about
 * (docs/10 §2). These are the only files permitted to name it.
 *
 * The two legal documents are a narrow, deliberate exception. Both name it to
 * disclaim it — the Privacy Notice to say its privacy practices are governed
 * elsewhere, the Terms to say its terms are governed elsewhere. That is the
 * opposite of presenting it as a Hendricks offering, and omitting the disclaimer
 * would leave the separation less clear rather than more.
 */
const SEARCH_ECONOMY_ALLOWLIST = [
  'src/content/pages/about.ts',
  'src/components/sections/external-venture-card.tsx',
  'src/app/(marketing)/about/page.tsx',
  'src/content/legal/privacy.ts',
  'src/content/legal/terms.ts',
]

/** docs/12 §3 — the "Avoid" list. */
const BANNED_PHRASES = [
  'dominate ai search',
  'hack chatgpt',
  'own every answer',
  'future-proof',
  'revolutionary',
  'cutting-edge',
  'unlock exponential',
  'game-changing',
  'best-in-class',
  'synergy',
]

/** docs/12 §2 — names that were retired before launch. */
const RETIRED_TERMS = ['Selection Engineering', 'GEO-only', 'AI rank tracking as a service']

const PLACEHOLDER_PATTERNS = [
  /lorem ipsum/i,
  /\bTKTK\b/,
  /\bTODO:/,
  /\bFIXME\b/,
  /\bXXX\b/,
  /**
   * Bracketed all-caps tokens, the form every unresolved value in the legal
   * source documents takes: `[EFFECTIVE DATE]`, `[COUNTY]`,
   * `[LEGAL ENTITY NAME]`. `docs/16` §14 forbids launching with any of them, and
   * a published Privacy Notice reading "[EFFECTIVE DATE]" is worse than no
   * notice at all. Markdown links are mixed case and do not match.
   */
  /\[[A-Z][A-Z ]{2,}\]/,
]

/**
 * Components that render sample data and therefore must carry the label from
 * `AGENTS.md`. Registering them explicitly, rather than inferring from the
 * presence of numbers, keeps the decision with a human.
 */
const SAMPLE_DATA_COMPONENTS = ['src/components/visuals/selection-map.tsx']
const ILLUSTRATIVE_LABEL = 'Illustrative interface. Not a client result.'

type Failure = { file: string; message: string }

async function sourceFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return sourceFiles(full)
      return /\.(ts|tsx)$/.test(entry.name) ? [full] : []
    }),
  )

  return nested.flat()
}

/** Strips comments so a note explaining why a term is banned is not itself a hit. */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
}

async function main() {
  const files = await sourceFiles(SRC)
  const failures: Failure[] = []

  for (const file of files) {
    const relative = path.relative(ROOT, file)
    const raw = await readFile(file, 'utf8')
    const source = stripComments(raw)
    const lower = source.toLowerCase()

    if (source.includes('Search Economy') && !SEARCH_ECONOMY_ALLOWLIST.includes(relative)) {
      failures.push({
        file: relative,
        message:
          'names The Search Economy outside the founder biography on /about (docs/10 §2)',
      })
    }

    for (const phrase of BANNED_PHRASES) {
      if (lower.includes(phrase)) {
        failures.push({ file: relative, message: `banned phrase "${phrase}" (docs/12 §3)` })
      }
    }

    for (const term of RETIRED_TERMS) {
      if (source.includes(term)) {
        failures.push({ file: relative, message: `retired term "${term}" (docs/12 §2)` })
      }
    }

    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (pattern.test(source)) {
        failures.push({ file: relative, message: `placeholder text matching ${pattern}` })
      }
    }

    if (SAMPLE_DATA_COMPONENTS.includes(relative) && !raw.includes(ILLUSTRATIVE_LABEL)) {
      failures.push({
        file: relative,
        message: `renders sample data without the label "${ILLUSTRATIVE_LABEL}"`,
      })
    }
  }

  for (const relative of SAMPLE_DATA_COMPONENTS) {
    if (!files.some((file) => path.relative(ROOT, file) === relative)) {
      failures.push({
        file: relative,
        message: 'registered as a sample-data component but the file no longer exists',
      })
    }
  }

  if (failures.length > 0) {
    console.error(`check:content found ${failures.length} problem(s):\n`)
    for (const failure of failures) {
      console.error(`  ${failure.file}\n    ${failure.message}`)
    }
    process.exit(1)
  }

  console.log(`check:content passed — ${files.length} files clean.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
