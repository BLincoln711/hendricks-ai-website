import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { SkipLink } from '@/components/layout/skip-link'
import { JsonLd } from '@/components/seo/json-ld'
import { jsonLdGraph, organizationSchema, websiteSchema } from '@/lib/seo/json-ld'

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
      {/*
        Organization and WebSite are emitted here rather than on the homepage
        because every other page's `WebPage` node references them by `@id`
        (`isPartOf` and `about`). A crawler or answer engine fetches one URL at
        a time, so when those nodes lived on the homepage alone, a direct fetch
        of any deep link resolved to a graph naming no organization at all.
      */}
      <JsonLd data={jsonLdGraph(organizationSchema(), websiteSchema())} />
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
