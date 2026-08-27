import { routes } from '@/config/routes'
import { trackEvent } from '@/lib/analytics/events'

/**
 * Same-origin /diagnostic destinations, including query and hash variants.
 * Used by the consented click listener so header, footer, and body CTAs share
 * one attachment point without changing any button copy.
 */
export function isDiagnosticDestination(href: string, origin: string): boolean {
  try {
    const url = new URL(href, origin)
    return url.origin === origin && url.pathname === routes.diagnostic.path
  } catch {
    return false
  }
}

export function trackDiagnosticCtaClick(pagePath: string): void {
  trackEvent('diagnostic_cta_click', { page_path: pagePath })
}

export const DIAGNOSTIC_CTA_ATTR = 'data-hendricks-cta'

export function diagnosticCtaFromClickTarget(
  target: EventTarget | null,
  origin: string,
): string | null {
  if (!(target instanceof Element)) return null
  const anchor = target.closest('a[href]')
  if (!anchor) return null
  // PrimaryCta / TextCta already emit diagnostic_cta_click. Skip them here so
  // header, footer, and other /diagnostic links stay on this listener only.
  if (anchor.hasAttribute(DIAGNOSTIC_CTA_ATTR)) return null
  const href = anchor.getAttribute('href')
  if (!href) return null
  return isDiagnosticDestination(href, origin) ? href : null
}
