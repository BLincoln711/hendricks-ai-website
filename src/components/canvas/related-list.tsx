import Link from 'next/link'

import { isBuilt } from '@/config/routes'
import { cn } from '@/lib/utils/cn'

export type RelatedEntry = {
  href: string
  label: string
  description: string
  /** A mono coordinate beside the link: a kind, a route or a date. */
  kind?: string
}

/**
 * The where-to-go-next list (`.rel`).
 *
 * A link at reading size with an optional mono coordinate beside it, and one
 * quiet sentence under both, separated by hairlines. Unbuilt routes are
 * filtered out rather than rendered as dead links, so a route can be listed
 * before it exists and appears on its own once it does.
 */
export function RelatedList({
  entries,
  ariaLabel,
  className,
}: {
  entries: readonly RelatedEntry[]
  ariaLabel?: string
  className?: string
}) {
  const available = entries.filter((entry) => isBuilt(entry.href))
  if (available.length === 0) return null

  return (
    <ul className={cn('rel', className)} aria-label={ariaLabel}>
      {available.map((entry) => (
        <li key={entry.href}>
          <Link href={entry.href}>
            {entry.label}
            {entry.kind ? <span className="kind">{entry.kind}</span> : null}
          </Link>
          <p>{entry.description}</p>
        </li>
      ))}
    </ul>
  )
}

/**
 * The related-work list (`.rlist` in its link form).
 *
 * A destination and its kind on the first line, one sentence under it, one
 * hairline between rows. It is the tail block of an editorial route, where
 * `RelatedList` is the aside beside a heading; the two differ in weight rather
 * than in content, and both filter out routes that do not exist yet.
 */
export function RelatedRules({
  entries,
  ariaLabel,
  className,
}: {
  entries: readonly RelatedEntry[]
  ariaLabel?: string
  className?: string
}) {
  const available = entries.filter((entry) => isBuilt(entry.href))
  if (available.length === 0) return null

  return (
    <ul className={cn('rlist rlist-links', className)} aria-label={ariaLabel}>
      {available.map((entry) => (
        <li key={entry.href}>
          <span className="top">
            <Link href={entry.href}>{entry.label}</Link>
            {entry.kind ? <span className="kind">{entry.kind}</span> : null}
          </span>
          <p>{entry.description}</p>
        </li>
      ))}
    </ul>
  )
}
