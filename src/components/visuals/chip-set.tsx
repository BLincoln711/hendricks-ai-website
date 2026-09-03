import { cn } from '@/lib/utils/cn'

/** The four evidence classes, plus the gap that is always a word, never a class (09 5.20). */
export type EvidenceClass = 'observed' | 'inferred' | 'measured' | 'tested' | 'gap'

export type ChipItem = string | { label: string; evidence: EvidenceClass }

/**
 * The inline mark for an evidence class: shape first, hue second, so the
 * class survives forced colours (16 VZ-07). Filled circle, hollow dashed
 * circle, filled square, outlined square, and the cross for a gap.
 */
function EvidenceMark({ evidence }: { evidence: EvidenceClass }) {
  const common = {
    width: 'var(--chip-mark-size)',
    height: 'var(--chip-mark-size)',
    viewBox: '0 0 10 10',
    'aria-hidden': true as const,
    focusable: 'false' as const,
    className: 'shrink-0',
  }

  switch (evidence) {
    case 'observed':
      return (
        <svg {...common}>
          <circle cx="5" cy="5" r="4.5" className="fill-ev-observed" />
        </svg>
      )
    case 'inferred':
      return (
        <svg {...common}>
          <circle
            cx="5"
            cy="5"
            r="4"
            fill="none"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            className="stroke-ev-inferred"
          />
        </svg>
      )
    case 'measured':
      return (
        <svg {...common}>
          <rect x="0.5" y="0.5" width="9" height="9" rx="1" className="fill-ev-measured" />
        </svg>
      )
    case 'tested':
      return (
        <svg {...common}>
          <rect x="1" y="1" width="8" height="8" rx="1" fill="none" strokeWidth="1.5" className="stroke-ev-tested" />
        </svg>
      )
    case 'gap':
      return (
        <svg {...common}>
          <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" strokeWidth="1.5" strokeLinecap="round" className="stroke-ev-gap" />
        </svg>
      )
  }
}

/**
 * A static chip (09 5.20): the label is the text and the mark is decorative.
 * Square, because the canvas grants a radius to controls only and a static
 * label is not one. Not a target either: a chip that acts is a `button` with
 * `aria-pressed` and a 44 px height, reading `--chip-radius`, and it lands with
 * the filter that needs it.
 */
export function EvidenceChip({ label, evidence }: { label: string; evidence?: EvidenceClass }) {
  return (
    <span className="inline-flex min-h-[var(--chip-min-height-static)] items-center gap-[var(--chip-gap)] border border-[var(--chip-edge)] bg-[var(--chip-bg)] px-[var(--chip-pad-x)] py-[var(--chip-pad-y)] text-[length:var(--chip-font-size)] leading-[var(--leading-small)] [font-weight:var(--chip-font-weight)] text-[var(--chip-fg)]">
      {evidence ? <EvidenceMark evidence={evidence} /> : null}
      {label}
    </span>
  )
}

/**
 * A set of short labels rendered as chips.
 *
 * Distinct from an ordered path: an unordered taxonomy such as the ten outcome
 * classifications on /methodology is a set a single observation can carry
 * several of at once, not stages it passes through. An item may name its
 * evidence class, which draws the class mark before the label.
 *
 * `separator="plus"` is for the intent-context formula, where the labels really
 * do sum to something. The `+` is rendered as text rather than as a border or
 * icon so the relationship survives with styles or images unavailable.
 */
export function ChipSet({
  items,
  separator = 'none',
  className,
}: {
  items: readonly ChipItem[]
  separator?: 'none' | 'plus'
  className?: string
}) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-2 gap-y-2', className)}>
      {items.map((item, index) => {
        const chip = typeof item === 'string' ? { label: item, evidence: undefined } : item
        return (
          <li key={chip.label} className="flex items-center gap-2">
            <EvidenceChip label={chip.label} evidence={chip.evidence} />
            {separator === 'plus' && index < items.length - 1 ? (
              <span aria-hidden="true" className="text-small text-ink-2">
                +
              </span>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
