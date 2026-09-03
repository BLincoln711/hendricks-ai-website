import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'

/**
 * The locked primary CTA (CANON section 2), as a button on every page that
 * carries one.
 *
 * Handoff 4.3 retires the per-page button variants: the header button is
 * "Start with a Diagnostic" and every in-page primary button is this label. A
 * page's own approved variant is not deleted with it, it becomes a tertiary
 * link beside this button (register R4), so the page keeps its own words and
 * the button keeps the locked ones.
 */
export const DIAGNOSTIC_CTA_LABEL = 'Start with a Search Intelligence Diagnostic'

export function diagnosticCta(location: string): Cta {
  return {
    label: DIAGNOSTIC_CTA_LABEL,
    href: routes.diagnostic.path,
    analytics: { location },
  }
}
