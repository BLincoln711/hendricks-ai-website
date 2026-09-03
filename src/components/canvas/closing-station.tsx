import { Station } from '@/components/sections/station'
import { PrimaryCta, RuleLink } from '@/components/ui/cta'
import type { Cta } from '@/components/ui/cta'
import { TwoTone, type TwoToneSentence } from '@/components/ui/two-tone'

/**
 * The closing station (canvas `.station.closing`).
 *
 * The last station of an interior route: an optional eyebrow, one H2, an
 * optional two-tone sentence and the CTA row. It replaces
 * `sections/closing-cta.tsx` and `sections/closing-band.tsx`, both of which
 * drew a bordered band the canvas has no room for.
 */
export function ClosingStation({
  eyebrow,
  title,
  lead,
  body,
  primaryCta,
  secondaryCta,
  secondaryLink,
  id = 'closing',
  headingId = 'closing-title',
}: {
  eyebrow?: string
  title: string
  lead?: TwoToneSentence
  body?: readonly string[]
  primaryCta: Cta
  secondaryCta?: Cta
  /**
   * The page's own approved CTA label, beside the locked button as a tertiary
   * link rather than as a second button (register R4).
   */
  secondaryLink?: Cta
  id?: string
  headingId?: string
}) {
  return (
    <Station id={id} ariaLabelledBy={headingId} className="closing">
      {eyebrow ? <p className="text-eyebrow mb-[22px] text-ink-2">{eyebrow}</p> : null}

      <h2 id={headingId} className="text-h2 text-ink">
        {title}
      </h2>

      {lead ? <TwoTone sentence={lead} className="text-lead mt-6 max-w-[58ch]" /> : null}

      {body?.map((paragraph) => (
        <p key={paragraph} className="measure-wide mt-6 text-ink-2">
          {paragraph}
        </p>
      ))}

      <div className="cta-row mt-8">
        <PrimaryCta cta={primaryCta} />
        {secondaryCta ? <PrimaryCta cta={secondaryCta} variant="secondary" /> : null}
        {secondaryLink ? <RuleLink cta={secondaryLink} /> : null}
      </div>
    </Station>
  )
}
