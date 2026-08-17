import { PrimaryCta } from '@/components/ui/cta'
import type { Cta } from '@/components/ui/cta'

/**
 * The Search Economy card (docs/13 §9). **About page only.**
 *
 * Constraints from docs/12 §8 and docs/10 §2: it is an independent publication
 * Brandon also founded, never a Hendricks solution, research arm, or product.
 * Styled as a secondary editorial aside — explicitly not the solution-card
 * treatment — and it links out rather than to any Hendricks route.
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
      className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-8"
    >
      <p className="text-eyebrow text-[var(--color-slate)]">{label}</p>

      <h3
        id="external-venture-name"
        className="text-[1.375rem] leading-snug font-medium text-[var(--color-navy)]"
      >
        {name}
      </h3>

      <p className="measure text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
        {description}
      </p>

      <div>
        <PrimaryCta cta={cta} variant="secondary" size="small" />
      </div>
    </aside>
  )
}
