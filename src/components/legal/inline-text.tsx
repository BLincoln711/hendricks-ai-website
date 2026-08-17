import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Renders the three inline forms permitted in legal copy: `[label](/path)`
 * links, `**bold**` emphasis, and `` `code` `` spans.
 *
 * Deliberately not a markdown library and deliberately not
 * `dangerouslySetInnerHTML`. Legal text is the last place that should be able to
 * inject markup, and the grammar is small enough to match exactly.
 */
const INLINE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g

export function InlineText({ text }: { text: string }): ReactNode {
  const nodes: ReactNode[] = []
  let cursor = 0
  let key = 0

  for (const match of text.matchAll(INLINE)) {
    const index = match.index ?? 0

    if (index > cursor) {
      nodes.push(text.slice(cursor, index))
    }

    const [raw, linkLabel, href, bold, code] = match

    if (linkLabel && href) {
      nodes.push(
        <Link
          key={key++}
          href={href}
          className="text-[var(--color-blue)] underline decoration-[color-mix(in_srgb,var(--color-blue)_40%,transparent)] underline-offset-4 hover:decoration-[var(--color-blue)]"
        >
          {linkLabel}
        </Link>,
      )
    } else if (bold) {
      nodes.push(
        <strong key={key++} className="font-medium text-[var(--color-navy)]">
          {bold}
        </strong>,
      )
    } else if (code) {
      nodes.push(
        <code key={key++} className="font-mono text-[0.9em] text-[var(--color-graphite)]">
          {code}
        </code>,
      )
    }

    cursor = index + raw.length
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor))
  }

  return <>{nodes}</>
}
