import type { ReactNode } from 'react'
import { CircleAlert, FlaskConical, Lightbulb, TriangleAlert } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

/**
 * Callout (docs/13 §3).
 *
 * Every variant carries a visible text label and an icon, so the meaning never
 * depends on colour alone (WCAG 1.4.1).
 */
const variants = {
  insight: {
    label: 'Insight',
    Icon: Lightbulb,
    container: 'border-[var(--color-blue)] bg-[color-mix(in_srgb,var(--color-blue)_5%,white)]',
    accent: 'text-[var(--color-blue)]',
  },
  limitation: {
    label: 'Limitation',
    Icon: CircleAlert,
    container: 'border-[var(--color-amber)] bg-[color-mix(in_srgb,var(--color-amber)_8%,white)]',
    accent: 'text-[#8A5A00]',
  },
  methodology: {
    label: 'Methodology',
    Icon: FlaskConical,
    container: 'border-[var(--color-border)] bg-[var(--color-soft)]',
    accent: 'text-[var(--color-navy)]',
  },
  warning: {
    label: 'Warning',
    Icon: TriangleAlert,
    container:
      'border-[var(--color-destructive)] bg-[color-mix(in_srgb,var(--color-destructive)_6%,white)]',
    accent: 'text-[var(--color-destructive)]',
  },
} as const

export function Callout({
  variant = 'insight',
  title,
  label,
  children,
  className,
}: {
  variant?: keyof typeof variants
  title?: string
  /** Overrides the default variant label when the copy needs a specific word. */
  label?: string
  children: ReactNode
  className?: string
}) {
  const { label: defaultLabel, Icon, container, accent } = variants[variant]

  return (
    <aside
      className={cn(
        'flex flex-col gap-3 rounded-[var(--radius-panel)] border-l-2 p-6 md:p-8',
        container,
        className,
      )}
    >
      <p className={cn('text-eyebrow flex items-center gap-2', accent)}>
        <Icon className="size-4" aria-hidden="true" />
        {label ?? defaultLabel}
      </p>

      {title ? (
        <h3 className="text-[1.25rem] leading-snug font-medium text-[var(--color-navy)]">
          {title}
        </h3>
      ) : null}

      <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]">
        {children}
      </div>
    </aside>
  )
}
