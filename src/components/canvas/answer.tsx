import type { ReactNode } from 'react'

import { TwoTone, type TwoToneSentence } from '@/components/ui/two-tone'
import { cn } from '@/lib/utils/cn'

/**
 * The answer-first block (canvas `_canvas.css` section 9, `.answer`).
 *
 * D-E: every interior route opens its body with the direct answer, in one
 * paragraph, before any explanation. One 1.5 px left rule in the path blue
 * marks it; there is no background and no box, because the system has no card.
 *
 * `label` renders as the mono line above the answer and, when `labelId` is
 * given, names the block for assistive technology, which is how the definition
 * pages bind the term to its definition.
 */
export function Answer({
  label,
  labelId,
  id,
  paragraphs,
  twoTone,
  headingId,
  headingText,
  className,
  children,
}: {
  label?: string
  labelId?: string
  id?: string
  /** The answer, one paragraph per entry, in the order it is read. */
  paragraphs?: readonly string[]
  /** A closing two-tone sentence inside the same block. */
  twoTone?: TwoToneSentence
  /** Id of a visually silent H2 that names the block in the outline. */
  headingId?: string
  headingText?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      id={id}
      className={cn('answer', className)}
      aria-labelledby={labelId ?? headingId}
    >
      {headingId && headingText ? (
        <h2 id={headingId} className="sr-only">
          {headingText}
        </h2>
      ) : null}

      {label ? (
        <p id={labelId} className="text-coordinate block text-ink-2">
          {label}
        </p>
      ) : null}

      {paragraphs?.map((paragraph) => (
        <p key={paragraph} className="text-ink-3">
          {paragraph}
        </p>
      ))}

      {twoTone ? <TwoTone sentence={twoTone} /> : null}

      {children}
    </div>
  )
}
