import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * SM-04 (redesign 16 section 3): real buttons for actions, real links for
 * navigation. The 16 test column names a grep for `onClick` on non-interactive
 * elements, and it has to be a source grep because React never serialises the
 * handler into the DOM. Every `onClick` under `src/` must sit on a native
 * control, on `Link`, or on the `Button` primitive that renders one.
 */
const SOURCE_ROOT = path.resolve(__dirname, '../../src')

/** `NavLink` and `Button` are the two wrappers that render one of these. */
const INTERACTIVE_TAGS = new Set([
  'a',
  'button',
  'input',
  'select',
  'textarea',
  'summary',
  'Link',
  'NavLink',
  'Button',
])

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return sourceFiles(full)
    return /\.tsx$/.test(entry.name) ? [full] : []
  })
}

/**
 * The tag of the JSX element whose attribute list contains `offset`: the last
 * `<Tag` before it that no `>` has closed. Arrow bodies inside earlier
 * attributes are stripped first so their `>` cannot end the search early.
 */
function owningTag(source: string, offset: number): string | null {
  const before = source.slice(0, offset).replace(/=>/g, '  ')
  const match = /<([A-Za-z][\w.]*)(?:\s[^<>]*)?$/.exec(before)
  return match ? match[1] : null
}

function clickHandlers(file: string): { line: number; tag: string | null }[] {
  const source = readFileSync(file, 'utf8')
  const pattern = /\bonClick=/g
  const found: { line: number; tag: string | null }[] = []
  for (let match = pattern.exec(source); match; match = pattern.exec(source)) {
    found.push({
      line: source.slice(0, match.index).split('\n').length,
      tag: owningTag(source, match.index),
    })
  }
  return found
}

describe('SM-04 click handlers', () => {
  it('attaches onClick only to native controls, Link and Button', () => {
    const offenders = sourceFiles(SOURCE_ROOT).flatMap((file) =>
      clickHandlers(file)
        .filter((handler) => !handler.tag || !INTERACTIVE_TAGS.has(handler.tag))
        .map((handler) => `${path.relative(SOURCE_ROOT, file)}:${handler.line} <${handler.tag ?? '?'}>`),
    )

    expect(offenders, offenders.join('\n')).toEqual([])
  })

  it('resolves the owning tag past an earlier arrow attribute', () => {
    const source = '<div onKeyDown={(event) => go(event)} onClick={open}>'
    expect(owningTag(source, source.indexOf('onClick='))).toBe('div')
  })
})
