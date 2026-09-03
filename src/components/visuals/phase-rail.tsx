import Link from 'next/link'

import type { system } from '@/content/pages/home'

/**
 * The phase rail (canvas `home-v3.html` station 3): the Demand-to-Selection
 * System drawn as four nodes on one axis, with the operating cycle's return
 * leg hooked back to the first.
 *
 * Not an SVG. The axis is a hairline, the nodes are knockout rings drawn in CSS
 * on the page ground, and the numerals inside them are text, so every label
 * scales with the reader's type size and a translation reaches all of it.
 *
 * `ol` rather than `ul`, because the order is the method: a phase cannot be run
 * before the one that hands it its input (16 SM-06). The index numeral is
 * `aria-hidden`, since the list already carries the order.
 *
 * Every phase name is the link to its solution page (CANON R10), so the four
 * routes are reachable from the homepage without a header dropdown (D-G).
 */
export function PhaseRail({
  phases,
  returnLabel,
  ariaLabelledBy,
  id,
}: {
  phases: typeof system.phases
  returnLabel: string
  ariaLabelledBy: string
  id?: string
}) {
  return (
    <div className="rail-fig" id={id}>
      <div className="rail">
        <ol className="phase-list" aria-labelledby={ariaLabelledBy}>
          {phases.map((phase) => (
            <li key={phase.name}>
              <span className="ix" aria-hidden="true">
                {phase.index}
              </span>
              <Link href={phase.href}>{phase.name}</Link>
              <p>
                {phase.question} {phase.summary}
              </p>
              <span className="out">{phase.output}</span>
            </li>
          ))}
        </ol>
        <p className="rail-return">
          <span>{returnLabel}</span>
        </p>
      </div>
    </div>
  )
}
