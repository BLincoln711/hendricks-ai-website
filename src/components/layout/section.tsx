import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

/**
 * Surface grounds (09 section 4; 5.8). Each reads a semantic surface role so a
 * subtree keeps the same token names on either ground.
 *
 * `navy` is deprecated: a navy section is a plate, and plates are drawn by
 * `visuals/plate.tsx` (09 5.12). It still renders `.on-plate` so the routes
 * that carry it keep their contrast until each page PR rebuilds them; the
 * variant is deleted with its last call site (handoff 5.3; PR 13).
 */
const variants = {
  field: 'bg-surface text-ink-body',
  white: 'bg-surface-raised text-ink-body',
  soft: 'bg-surface-tint text-ink-body',
  /** @deprecated Plates are drawn by `visuals/plate.tsx`; retired with the last consumer. */
  navy: 'on-plate bg-plate text-ink-body',
} as const

/**
 * Vertical rhythm. `--space-section` is the distance between two sections (72
 * px; 112 from 1024), so `standard` takes half on each side. `major` keeps a
 * full step for heroes and closing bands.
 */
const sizes = {
  small: 'py-8 md:py-10',
  standard: 'py-[calc(var(--space-section)/2)]',
  major: 'py-section',
} as const

export function Section({
  children,
  variant = 'field',
  size = 'standard',
  id,
  tabIndex,
  ariaLabelledBy,
  className,
}: {
  children: ReactNode
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  id?: string
  /** `-1` on an in-page anchor target, so a fragment jump moves focus to it (16 KF-07). */
  tabIndex?: -1
  ariaLabelledBy?: string
  className?: string
}) {
  return (
    <section
      id={id}
      tabIndex={tabIndex}
      aria-labelledby={ariaLabelledBy}
      className={cn(variants[variant], sizes[size], className)}
    >
      {children}
    </section>
  )
}
