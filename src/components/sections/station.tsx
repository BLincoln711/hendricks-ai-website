import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

/**
 * A station: the homepage's one sectioning unit (canvas `_canvas.css`
 * section 4).
 *
 * It provides the vertical rhythm and the empty left rail the whole page is
 * set against, and nothing else. There is no ground, no border and no
 * container: a station is separated from its neighbours by space, and the
 * hairlines inside it belong to the rows and figures that draw them.
 *
 * `.station-in` exists so a reveal animation would have one target. The canvas
 * declares that reveal in `@keyframes`, which the token lint forbids outside
 * the copy tree, and its rest state is its final state, so the element is kept
 * as the seam and no animation is attached to it. Nothing a visitor reads
 * depends on the animation.
 *
 * Every station names itself: `ariaLabelledBy` points at its own heading, and
 * a station whose heading is visually silent passes `ariaLabel` instead.
 */
export function Station({
  children,
  id,
  ariaLabelledBy,
  ariaLabel,
  className,
}: {
  children: ReactNode
  id: string
  ariaLabelledBy?: string
  ariaLabel?: string
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      className={cn('station', className)}
    >
      <div className="station-in">{children}</div>
    </section>
  )
}
