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
    accent: 'text-[var(--color-amber)]',
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
  titleId,
  headingLevel = 3,
  label,
  children,
  className,
}: {
  variant?: keyof typeof variants
  title?: string
  /**
   * Sets an id on the title heading so a parent Section can point its
   * ariaLabelledBy at it, rather than the section going unnamed.
   */
  titleId?: string
  /**
   * Promotes the title to an h2 where the Callout carries the section-level
   * answer instead of a subsection point. Defaults to 3, so every existing
   * caller renders exactly as before.
   */
  headingLevel?: 2 | 3
  /** Overrides the default variant label when the copy needs a specific word. */
  label?: string
  children: ReactNode
  className?: string
}) {
  const { label: defaultLabel, Icon, container, accent } = variants[variant]
  const Heading = `h${headingLevel}` as 'h2' | 'h3'

  return (
    // role="note" on a div, not <aside>.
    // Main-content extractors routinely discard <aside> as tangential, which on
    // /methodology drops an honesty statement the unit tests guard. role="note"
    // keeps the callout announced to assistive technology and keeps its text
    // inside extracted main content, while dropping a complementary landmark
    // that a few sentences never warranted.
    <div
      role="note"
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
        // The className is deliberately identical at both heading levels. The
        // 1.25rem callout scale belongs to the callout surface, not to the
        // document outline, so a promoted h2 must not grow to the page h2
        // scale. This is not a visual inconsistency to fix.
        <Heading
          id={titleId}
          className="text-[1.25rem] leading-snug font-medium text-[var(--color-navy)]"
        >
          {title}
        </Heading>
      ) : null}

      <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]">
        {children}
      </div>
    </div>
  )
}
