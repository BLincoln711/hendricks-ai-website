import { cn } from '@/lib/utils/cn'

const CONNECTIVE = ' does not guarantee '

/**
 * The "being seen does not guarantee being chosen" ladder (docs/13 §6).
 *
 * Each rung is stored and rendered as the complete approved sentence, so the copy
 * has one source. The connective is de-emphasised at render time by splitting on
 * it rather than by storing the two halves separately, which would let the
 * rendered sentence drift from the approved wording. A sentence that does not
 * contain the connective simply renders whole.
 */
export function NegationLadder({
  steps,
  className,
}: {
  steps: readonly string[]
  className?: string
}) {
  return (
    <ol className={cn('flex flex-col', className)}>
      {steps.map((step, index) => {
        const at = step.indexOf(CONNECTIVE)
        const before = at === -1 ? step : step.slice(0, at)
        const after = at === -1 ? null : step.slice(at + CONNECTIVE.length)

        return (
          <li
            key={step}
            className={cn(
              'border-l-2 py-3 pl-6 text-[1.0625rem] leading-snug md:pl-8',
              // Amber marks the final rung, matching how CompletePath marks the
              // commercial outcome at the end of a sequence.
              index === steps.length - 1
                ? 'border-ev-gap'
                : 'border-rule',
            )}
          >
            <span className="text-ink">{before}</span>
            {after ? (
              <>
                <span className="text-ink-2">{CONNECTIVE}</span>
                <span className="text-ink">{after}</span>
              </>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
