import type { ReactNode } from 'react'

import { ConsentManager } from '@/components/consent/consent-manager'
import { AnnouncerProvider, LiveRegion } from '@/components/layout/live-region'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { SkipLink } from '@/components/layout/skip-link'
import { JsonLd } from '@/components/seo/json-ld'
import { jsonLdGraph, organizationSchema, websiteSchema } from '@/lib/seo/json-ld'

/**
 * The page shell: skip link, header, main landmark, live region, footer, and
 * the consent sheet, in that document order (16 KF-02).
 *
 * Shared by the `(marketing)`, `(editorial)` and `(legal)` route groups and by
 * the 404 page. The route groups exist to separate commercial pages from
 * editorial and legal ones in the file tree (docs/02 section 4); they are not a
 * styling boundary, so the shell must not be reimplemented per group.
 *
 * The shell provides the shared announcer (09 5.60) and mounts its one region
 * directly after `main`; the consent sheet lives here rather than in the root
 * layout because it announces through that context and must follow the footer.
 *
 * `tabIndex={-1}` on `<main>` makes it a programmatic focus target for the skip
 * link and for the consent decision without adding it to the tab order.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <AnnouncerProvider>
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
      <LiveRegion />
      <SiteFooter />
      <ConsentManager />
    </AnnouncerProvider>
  )
}
