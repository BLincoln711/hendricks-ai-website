import { cn } from '@/lib/utils/cn'

export type PartnershipModel = {
  name: string
  description: string
  bestFor: string
}

/**
 * The four agency partnership models (docs/13 §8).
 *
 * docs/13 requires the four models to be visually distinct, so each panel gets
 * its own surface and rule weight rather than four identical cards. The visible
 * name and "Best for" line carry the distinction without relying on styling.
 */
export function PartnershipModels({
  models,
  className,
}: {
  models: readonly PartnershipModel[]
  className?: string
}) {
  const treatments = [
    'border-path',
    'border-rule',
    'border-path',
    'border-rule border-dashed',
  ]

  return (
    <ul className={cn('grid gap-5 md:grid-cols-2', className)}>
      {models.map((model, index) => (
        <li
          key={model.name}
          className={cn(
            'flex flex-col gap-4 border p-6 md:p-8',
            treatments[index] ?? treatments[0],
          )}
        >
          <h3 className="text-[1.375rem] leading-snug font-medium text-ink">
            {model.name}
          </h3>

          <p className="text-[0.9375rem] leading-relaxed text-ink-2">
            {model.description}
          </p>

          {/*
            A real description list rather than a styled paragraph: "Best for" is
            a term and the line beneath it is that term's definition, and a `<dl>`
            is the markup that states the pairing. Valid inside the `<li>`. The
            classes are unchanged from the paragraph they replace, and preflight
            zeroes the default `dd` indent, so nothing moves on screen.
          */}
          <dl className="mt-auto flex flex-col gap-1 border-t border-rule pt-4 text-[0.9375rem] text-ink-3">
            <dt className="text-eyebrow text-ink-2">Best for</dt>
            <dd>{model.bestFor}</dd>
          </dl>
        </li>
      ))}
    </ul>
  )
}
