import Link from 'next/link'

import { PrivacyChoicesButton } from '@/components/consent/privacy-choices-button'
import { Container } from '@/components/layout/container'
import { Wordmark } from '@/components/layout/wordmark'
import { footerNavigation, legalNavigation } from '@/config/navigation'
import { siteConfig } from '@/config/site'

/**
 * Site footer (docs/03 §8).
 *
 * Four columns plus a legal row. The Search Economy must never appear here —
 * it belongs only inside Brandon's biography on /about.
 */
export function SiteFooter() {
  // A column whose routes have not been built yet is dropped rather than
  // rendered as an empty heading. The Research column returns in Phase 6.
  const columns = [
    footerNavigation.solutions,
    footerNavigation.audiences,
    footerNavigation.company,
    footerNavigation.research,
  ].filter((column) => column.items.length > 0)

  return (
    <footer className="on-navy bg-[var(--color-navy)] text-[var(--color-field)]">
      <Container>
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
          <div className="flex flex-col gap-4">
            <Wordmark tone="dark" width={148} />
            <p className="text-[0.9375rem] leading-relaxed text-[color-mix(in_srgb,var(--color-field)_72%,transparent)] max-w-xs">
              {siteConfig.categoryLine}
            </p>
            <p className="text-[0.8125rem] leading-relaxed text-[color-mix(in_srgb,var(--color-field)_58%,transparent)] max-w-xs">
              {siteConfig.operatingLine}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="text-eyebrow mb-4 text-[color-mix(in_srgb,var(--color-field)_60%,transparent)]">
                  {column.heading}
                </h2>
                <ul className="flex flex-col gap-3">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.875rem] leading-snug text-[color-mix(in_srgb,var(--color-field)_82%,transparent)] transition-colors hover:text-[var(--color-cyan)]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[color-mix(in_srgb,var(--color-field)_16%,transparent)] py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-[color-mix(in_srgb,var(--color-field)_58%,transparent)]">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.8125rem] text-[color-mix(in_srgb,var(--color-field)_70%,transparent)] transition-colors hover:text-[var(--color-cyan)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <PrivacyChoicesButton />
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
