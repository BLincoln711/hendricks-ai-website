import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { SiteShell } from '@/components/layout/site-shell'
import { buttonVariants } from '@/components/ui/button'
import { isBuilt, routes } from '@/config/routes'

/*
  Without this, every 404 inherits the root layout's default title, so the
  retired URLs still being recrawled all report under the homepage title.
  No `robots` key: Next.js already serves not-found with `noindex`, and
  declaring it again emits a duplicate directive.
*/
export const metadata: Metadata = {
  title: { absolute: 'Page not found | Hendricks' },
}

/**
 * Not-found state (09 5.45): an honest failure page inside the shell, so
 * consistent help holds on 404 (16 SM-07). The status line is a mono
 * coordinate in ink-2, never amber, which means a gap in the evidence.
 */
export default function NotFound() {
  const usefulLinks = [
    { label: 'Search Demand Intelligence', href: routes.searchDemandIntelligence.path },
    { label: 'Selection Intelligence', href: routes.selectionIntelligence.path },
    { label: 'How It Works', href: routes.howItWorks.path },
    { label: 'Search Intelligence Diagnostic', href: routes.diagnostic.path },
    { label: 'Methodology', href: routes.methodology.path },
    { label: 'Research', href: routes.research.path },
  ].filter((link) => isBuilt(link.href))

  return (
    <SiteShell>
      <Container>
        <div className="flex flex-col gap-8 py-section">
          <p className="text-coordinate text-ink-2">Status 404, unresolved path</p>

          <h1 className="text-h1 max-w-[var(--measure-h1)] text-ink">This path did not resolve.</h1>

          <p className="text-lead measure-wide text-ink">
            The page you requested does not exist, or it moved during the Hendricks site rebuild.
            Nothing is wrong with your connection.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/" className={buttonVariants()}>
              Return home
            </Link>
            <Link href="/solutions" className={buttonVariants({ variant: 'secondary' })}>
              Explore solutions
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <h2 className="text-coordinate text-ink-2">Useful destinations</h2>
            <ul className="grid border-t border-rule sm:grid-cols-2 sm:gap-x-[var(--ledger-gap)] md:max-w-2xl">
              {usefulLinks.map((link) => (
                <li key={link.href} className="border-b border-rule">
                  <Link href={link.href} className="link link-standalone">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </SiteShell>
  )
}
