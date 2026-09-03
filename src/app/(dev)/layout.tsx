import { SiteShell } from '@/components/layout/site-shell'

/**
 * The development route group: fixture pages that exercise components before
 * a page consumes them. Same shell as every other group, so a fixture renders
 * inside the real header, announcer and consent sheet.
 */
export default function DevLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
