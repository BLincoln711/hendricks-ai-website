import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

/**
 * The 12-column grid inside a `Container` (09 section 4, 5.58).
 *
 * Children place themselves with `grid-column` in the section 4 spans: the
 * margin column 1 to 2, reading text 3 to 9, ledgers and plates 3 to 12. Layout
 * only: no landmark, no heading and no CSS `order`, so DOM order stays reading
 * order at every width. The section heading with its margin index (09 5.8) is
 * the first consumer.
 */
export function Grid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(var(--grid-columns),minmax(0,1fr))] gap-x-[var(--grid-gap)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
