import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

/**
 * The coordinate above a heading (09 5.7): one uppercase mono line in ink-2,
 * which `.on-plate` re-scopes without a variant.
 *
 * Always a `p` that is a sibling of its heading, never nested inside it, so
 * the heading's accessible name is the headline alone (16 SM-02); the proper
 * noun a section is about belongs in the headline sentence, not here. No dot
 * prefix: the signal dot is never an eyebrow marker (09 5.46).
 *
 * `data-eyebrow` lets the semantics sweep find every eyebrow on a route and
 * assert it sits outside any heading.
 */
export function Eyebrow({
  children,
  id,
  className,
}: {
  children: ReactNode
  id?: string
  className?: string
}) {
  return (
    <p id={id} data-eyebrow="" className={cn('text-coordinate text-ink-2', className)}>
      {children}
    </p>
  )
}
