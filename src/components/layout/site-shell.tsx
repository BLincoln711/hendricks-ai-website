import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { SkipLink } from '@/components/layout/skip-link'

/**
 * The page shell: skip link, header, main landmark, footer.
 *
 * Shared by the `(marketing)` and `(editorial)` route groups and by the 404 page.
 * The two route groups exist to separate commercial pages from editorial ones in
 * the file tree (docs/02 §4); they are not a styling boundary, so the shell must
 * not be reimplemented per group.
 *
 * `tabIndex={-1}` on `<main>` makes it a programmatic focus target for the skip
 * link without adding it to the tab order.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
