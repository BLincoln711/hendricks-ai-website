import { SiteShell } from '@/components/layout/site-shell'

/**
 * Route group for `/privacy`, `/terms`, and `/privacy-request`.
 *
 * Separate from `(marketing)` and `(editorial)` because these routes are
 * obligations rather than propositions: they carry no commercial CTA, sit
 * outside primary navigation, and are reached from the footer.
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
