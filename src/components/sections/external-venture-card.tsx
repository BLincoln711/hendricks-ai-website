import { Eyebrow } from '@/components/layout/eyebrow'
import { PrimaryCta } from '@/components/ui/cta'
import type { Cta } from '@/components/ui/cta'

/**
 * The Search Economy aside (09 5.55). About page only.
 *
 * Constraints from CANON section 5: it is an independent publication Brandon
 * also founded, never a Hendricks solution, research arm, or product. Styled
 * as a secondary editorial aside on the raised surface, never a solution
 * card and never navigation, and it links out rather than to any Hendricks
 * route.
 */
export function ExternalVentureCard({
  label,
  name,
  description,
  cta,
}: {
  label: string
  name: string
  description: string
  cta: Cta
}) {
  return (
    <aside
      aria-labelledby="external-venture-name"
      className="flex flex-col gap-4 border border-rule p-6"
    >
      <Eyebrow>{label}</Eyebrow>

      <h3 id="external-venture-name" className="text-h4 text-ink">
        {name}
      </h3>

      <p className="text-small measure text-ink">{description}</p>

      <div>
        <PrimaryCta cta={cta} variant="secondary" size="small" />
      </div>
    </aside>
  )
}
