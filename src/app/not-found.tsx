import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { SkipLink } from '@/components/layout/skip-link'
import { SignalDot } from '@/components/visuals/signal-dot'
import { buttonVariants } from '@/components/ui/button'
import { isBuilt, routes } from '@/config/routes'
import { cn } from '@/lib/utils/cn'

/** Diagnostic-style 404 (docs/14 §10). */
export default function NotFound() {
  const usefulLinks = [
    { label: 'Search Demand Intelligence', href: routes.searchDemandIntelligence.path },
    { label: 'Selection Intelligence', href: routes.selectionIntelligence.path },
    { label: 'How It Works', href: routes.howItWorks.path },
    { label: 'Search Intelligence Diagnostic', href: routes.diagnostic.path },
    { label: 'Research', href: routes.research.path },
  ].filter((link) => isBuilt(link.href))

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Container>
          <div className="flex flex-col gap-8 py-24 md:py-36">
            <p className="text-eyebrow flex items-center gap-2 text-[var(--color-amber)]">
              <SignalDot size={6} tone="amber" />
              Status 404 — unresolved path
            </p>

            <h1 className="text-h1 measure-tight">This path did not resolve.</h1>

            <p className="text-lead measure">
              The page you requested does not exist, or it moved during the Hendricks site rebuild.
              Nothing is wrong with your connection.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link href="/" className={buttonVariants()}>
                Return home
              </Link>
              <Link href="/solutions" className={cn(buttonVariants({ variant: 'secondary' }))}>
                Explore solutions
              </Link>
            </div>

            <div className="mt-4 border-t border-[var(--color-border)] pt-8">
              <h2 className="text-eyebrow mb-4 text-[var(--color-slate)]">Useful destinations</h2>
              <ul className="grid gap-3 sm:grid-cols-2 md:max-w-2xl">
                {usefulLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9375rem] font-medium text-[var(--color-blue)] underline decoration-1 underline-offset-4 hover:text-[var(--color-blue-hover)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
