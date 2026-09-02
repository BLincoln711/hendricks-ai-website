import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

/** Surface variants from docs/13 §3. */
const variants = {
  field: 'bg-[var(--color-field)] text-[var(--color-graphite)]',
  white: 'bg-white text-[var(--color-graphite)]',
  soft: 'bg-[var(--color-soft)] text-[var(--color-graphite)]',
  navy: 'on-plate bg-[var(--color-navy)] text-[var(--color-field)]',
} as const

/** Vertical rhythm from docs/04 §7. */
const sizes = {
  small: 'py-12 md:py-16',
  standard: 'py-16 md:py-24',
  major: 'py-20 md:py-32',
} as const

export function Section({
  children,
  variant = 'field',
  size = 'standard',
  id,
  ariaLabelledBy,
  className,
}: {
  children: ReactNode
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  id?: string
  ariaLabelledBy?: string
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(variants[variant], sizes[size], className)}
    >
      {children}
    </section>
  )
}
