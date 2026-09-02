import { Eyebrow } from '@/components/layout/eyebrow'
import { cn } from '@/lib/utils/cn'

/**
 * Heading measures (09 section 3). `narrow` is the H2 role's own 24ch; the
 * wider two carry the live sentence-length titles until each page PR rewrites
 * its copy to 04's headlines.
 */
const measures = {
  narrow: 'max-w-[var(--measure-h2)]',
  standard: 'max-w-[var(--measure-tight)]',
  wide: 'max-w-[var(--measure-lead)]',
} as const

/**
 * Section heading with margin index (09 5.8).
 *
 * The eyebrow is a `p` sibling of the heading, outside its accessible name
 * (16 SM-02). When `index` is given the heading opens as a ledger entry: a
 * full-width hairline with a head tick, a margin column carrying the index
 * and coordinate (both `aria-hidden`; the outline carries the order), then the
 * heading group. Below 1024 px the margin column becomes a row above the
 * heading; from 1024 px it sits in columns 1 to 2 and the heading group in 3
 * to 9. Without `index` only the heading group renders.
 *
 * `onNavy` is a no-op kept for the call sites the page PRs close (handoff
 * 5.3): inside `.on-plate` every token here re-scopes on its own.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  level = 2,
  maxWidth = 'standard',
  id,
  index,
  coordinate,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  level?: 2 | 3
  maxWidth?: keyof typeof measures
  id?: string
  /** The section's position in its page, printed as the margin index ("02"). */
  index?: string
  /** The margin coordinate beside the index, for example a stage or artifact label. */
  coordinate?: string
  /** @deprecated No-op. `.on-plate` re-scopes every token this heading reads. */
  onNavy?: boolean
  className?: string
}) {
  const Heading = level === 2 ? 'h2' : 'h3'

  const headingGroup = (
    <div className="flex flex-col gap-4">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(level === 2 ? 'text-h2' : 'text-h3', 'text-ink', measures[maxWidth])}
      >
        {title}
      </Heading>
      {description ? <p className="text-lead measure-lead text-ink-body">{description}</p> : null}
    </div>
  )

  if (index === undefined) {
    return <div className={className}>{headingGroup}</div>
  }

  return (
    <div
      className={cn(
        'relative border-t border-rule pt-[var(--space-index-top)] before:absolute before:top-0 before:left-0 before:h-[var(--ledger-head-tick-height)] before:w-[var(--ledger-head-tick-width)] before:bg-ink lg:grid lg:grid-cols-[repeat(var(--grid-columns),minmax(0,1fr))] lg:gap-x-[var(--grid-gap)]',
        className,
      )}
    >
      <p
        aria-hidden="true"
        className="text-coordinate mb-section-to-heading flex gap-4 text-ink-2 lg:col-[1/3] lg:mb-0 lg:flex-col"
      >
        <span className="tabular-nums">{index}</span>
        {coordinate ? <span>{coordinate}</span> : null}
      </p>
      <div className="lg:col-[3/10]">{headingGroup}</div>
    </div>
  )
}
