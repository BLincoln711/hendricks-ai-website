import type { ReactNode } from 'react'
import { CircleAlert, FlaskConical, Lightbulb, TriangleAlert } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

/**
 * Callout (09 5.36): a labelled aside that never relies on colour. A 2 px left
 * rule, an icon and the visible variant word carry the meaning together. The
 * Limitation rule reads `--ev-gap`, which always travels with its word (D5);
 * blue never appears here, since blue marks a measured value.
 */
const variants = {
  insight: { label: 'Insight', Icon: Lightbulb, rule: 'border-ink', accent: 'text-ink' },
  limitation: { label: 'Limitation', Icon: CircleAlert, rule: 'border-ev-gap', accent: 'text-ev-gap' },
  methodology: {
    label: 'Methodology',
    Icon: FlaskConical,
    rule: 'border-rule-strong',
    accent: 'text-ink-2',
  },
  warning: {
    label: 'Warning',
    Icon: TriangleAlert,
    rule: 'border-destructive',
    accent: 'text-destructive',
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
  const { label: defaultLabel, Icon, rule, accent } = variants[variant]
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
        'flex flex-col gap-3 rounded-r-[var(--radius-small)] border-l-2 bg-surface-tint p-6 md:p-8',
        rule,
        className,
      )}
    >
      <p className={cn('text-coordinate flex items-center gap-2', accent)}>
        <Icon className="size-4" aria-hidden="true" focusable="false" />
        {label ?? defaultLabel}
      </p>

      {title ? (
        // The class is identical at both heading levels: the H4 role belongs to
        // the callout surface, not to the document outline, so a promoted h2
        // must not grow to the page h2 scale.
        <Heading id={titleId} className="text-h4 text-ink">
          {title}
        </Heading>
      ) : null}

      <div className="flex flex-col gap-3 text-ink-body">{children}</div>
    </div>
  )
}
