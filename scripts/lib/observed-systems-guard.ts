/**
 * The observed-systems guard (CONTENT_VERIFICATION A1; audit CM-03; redesign
 * handoff 4.2 and 4.7 rule 2).
 *
 * A1 is a closed list, and the only string allowed to state it is
 * `observedSystemsSentence` in `src/content/shared/observed-systems.ts`. Every
 * page renders that constant; none retypes it. The failure this guards is
 * drift: a page literal that names a count or a list keeps saying it after the
 * list changes, which is exactly what happened when Gemini joined on
 * 2026-09-01. So the rule is not "name the systems when you count them", it is
 * "never count or list them outside the shared module".
 *
 * Two exceptions, both narrow. A dated `changes` row of kind `scope` may state
 * the boundary that applied on a study's run date, because that is a record of
 * a past observation rather than a coverage claim. And one sentence on
 * `/what-is-ai-mediated-search` describes the 2026-08-19 run by exact text.
 *
 * Pure functions over source text, so the unit test and `check:content` share
 * one rule and the fixtures under `tests/fixtures/content/` exercise it.
 */

export const OBSERVED_SYSTEMS_MODULE = 'src/content/shared/observed-systems.ts'

/**
 * Sentences allowed to carry a count by exact text. Each describes a dated run,
 * not the firm's coverage, and each is listed with its page so the next reader
 * can check that it is still true.
 */
export const ALLOWLISTED_SENTENCES: readonly string[] = [
  // what-is-ai-mediated-search.ts and 22-what-is-ai-mediated-search.md: the
  // 2026-08-19 self-baseline run, which sent 17 questions to three engines.
  'Those figures describe 17 questions, three systems, one geography, and one date.',
]

/** Every surface the shared table names, observed or not. */
const SURFACES = [
  'Google AI Overviews',
  'AI Overviews',
  'Google AI Mode',
  'AI Mode',
  'ChatGPT',
  'Perplexity',
  'Gemini',
  'Microsoft Copilot',
  'Copilot',
]

const COUNT_CLAIM = /\b(?:one|two|three|four|five|six|\d+) systems\b/i
const COVERAGE_CLAIM = /\bHendricks\s+(?:observes|measures|tests|monitors|reports on)\b/
const NEGATED = /\b(?:does not|never|not among|excluded|outside)\b/i
const SCOPE_ROW_KIND = /\bkind:\s*(['"])scope\1/
const MARKDOWN_SCOPE_ROW = /^\|\s*\d{4}-\d{2}-\d{2}\s*\|\s*scope\s*\|/

export type GuardOffence = { line: number; rule: string; excerpt: string }

type SourceString = { text: string; index: number }

function withoutAllowlisted(text: string): string {
  return ALLOWLISTED_SENTENCES.reduce((rest, sentence) => rest.split(sentence).join(''), text)
}

function lineOf(source: string, index: number): number {
  return source.slice(0, index).split('\n').length
}

function excerpt(text: string): string {
  return text.length > 90 ? `${text.slice(0, 90)}...` : text
}

/**
 * Blanks comment bodies and string contents in place, preserving every offset,
 * so brace matching and line numbers stay valid on the result.
 */
function blank(match: string): string {
  return match.replace(/[^\n]/g, ' ')
}

function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/(^|[^:\\])\/\/[^\n]*/g, (m, lead: string) => lead + blank(m.slice(lead.length)))
}

const STRING_LITERAL = /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g

/** Every string and template literal in the source, with its start offset. */
function sourceStrings(source: string): SourceString[] {
  return Array.from(stripComments(source).matchAll(STRING_LITERAL)).map((m) => ({
    text: m[1] ?? m[2] ?? m[3] ?? '',
    index: m.index,
  }))
}

/**
 * True when the string at `index` sits directly inside an object literal that
 * carries `kind: 'scope'`, which is the shape of a dated scope change row.
 */
function insideScopeRow(source: string, index: number): boolean {
  const flat = stripComments(source).replace(STRING_LITERAL, blank)

  let depth = 0
  let open = -1
  for (let i = index; i >= 0; i -= 1) {
    const ch = flat[i]
    if (ch === '}') depth += 1
    else if (ch === '{') {
      if (depth === 0) {
        open = i
        break
      }
      depth -= 1
    }
  }
  if (open < 0) return false

  depth = 0
  for (let i = open; i < flat.length; i += 1) {
    const ch = flat[i]
    if (ch === '{') depth += 1
    else if (ch === '}') {
      depth -= 1
      if (depth === 0) return SCOPE_ROW_KIND.test(stripComments(source).slice(open, i + 1))
    }
  }
  return false
}

/**
 * Offences in a TypeScript content module. The shared module itself is exempt
 * and must not be passed here.
 */
export function observedSystemsOffencesInSource(source: string): GuardOffence[] {
  const offences: GuardOffence[] = []

  for (const { text, index } of sourceStrings(source)) {
    const rest = withoutAllowlisted(text)
    const line = lineOf(source, index)

    if (COUNT_CLAIM.test(rest) && !insideScopeRow(source, index)) {
      offences.push({
        line,
        rule: 'counts the observed systems outside the shared module',
        excerpt: excerpt(text),
      })
      continue
    }

    if (COVERAGE_CLAIM.test(rest) && !NEGATED.test(rest) && SURFACES.some((s) => rest.includes(s))) {
      offences.push({
        line,
        rule: 'names the systems Hendricks observes in a page literal instead of rendering the shared sentence',
        excerpt: excerpt(text),
      })
    }
  }

  return offences
}

/**
 * Offences in an approved-copy markdown mirror. The mirror may carry the
 * canonical sentence verbatim, the allowlisted sentences, and a change-history
 * row of kind `scope`; any other count is drift.
 */
export function observedSystemsOffencesInMarkdown(
  markdown: string,
  canonicalSentence: string,
): GuardOffence[] {
  const offences: GuardOffence[] = []

  markdown.split('\n').forEach((raw, i) => {
    if (MARKDOWN_SCOPE_ROW.test(raw)) return
    const rest = withoutAllowlisted(raw)
    if (!COUNT_CLAIM.test(rest)) return
    if (rest.includes(canonicalSentence) && !COUNT_CLAIM.test(rest.split(canonicalSentence).join(''))) {
      return
    }
    offences.push({
      line: i + 1,
      rule: 'counts the observed systems outside the canonical sentence or a scope row',
      excerpt: excerpt(raw.trim()),
    })
  })

  return offences
}
