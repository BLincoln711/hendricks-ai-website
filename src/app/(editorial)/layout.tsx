import { SiteShell } from '@/components/layout/site-shell'

/**
 * Editorial route group (docs/02 §4): definition pages now, and the research hub
 * and article template in the remainder of Phase 6.
 *
 * Same shell as `(marketing)`. The group is a file-tree boundary, not a visual one.
 */
export default function EditorialLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
