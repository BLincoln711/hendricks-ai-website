import { PrivacyChoicesButton } from '@/components/consent/privacy-choices-button'
import { NavLink } from '@/components/layout/nav-link'
import { WordmarkLink } from '@/components/layout/wordmark'
import {
  footerNavigation,
  legalNavigation,
  PRIVACY_CHOICES_POSITION,
  type NavigationItem,
} from '@/config/navigation'
import { siteConfig } from '@/config/site'

/**
 * The footer (canvas `_canvas.html`; `_canvas.css` section 5; redesign 03
 * section 3).
 *
 * The brand row, the four-column sitemap and the legal row, on the one ground,
 * separated by hairlines and space. Rendered on every route, so the definition
 * pages and the research hub carry a sitewide inbound link. Contact keeps its
 * position and Privacy Choices sits fourth in the legal row on every route
 * (16 SM-07), placed by index rather than beside a named neighbour so no route
 * flag can remove the consent withdrawal path. Results is omitted while its
 * flag is off. The Search Economy must never appear here; it belongs only
 * inside Brandon Lincoln Hendricks's biography on /about.
 *
 * The canvas footer runs edge to edge while the masthead caps at 1440. Both are
 * chrome and have to line up, so the inner content takes the same cap; below
 * 1440, where the canvas was verified, the two render identically.
 *
 * The canvas brand row reads "Search Intelligence Engineering. Houston, Texas.
 * hello@hendricks.ai". The city and the address are not in CANON and are
 * published nowhere in the approved copy, and an unmonitored address is the
 * defect `content/pages` already records for corrections@, so the row carries
 * the locked category line alone until the contact facts are verified.
 */

const COLUMN_LINK =
  'inline-flex min-h-[var(--link-min-height)] min-w-target items-center text-small text-ink-2 transition-colors duration-[var(--duration-micro)] ease-standard hover:text-ink hover:underline aria-[current=page]:text-ink aria-[current=page]:underline'

const PRIVACY_CHOICES = Symbol('privacy-choices')

const legalRow: ReadonlyArray<NavigationItem | typeof PRIVACY_CHOICES> = [
  ...legalNavigation.slice(0, PRIVACY_CHOICES_POSITION),
  PRIVACY_CHOICES,
  ...legalNavigation.slice(PRIVACY_CHOICES_POSITION),
]

export function SiteFooter() {
  // A column whose routes have not been built yet is dropped rather than
  // rendered as an empty heading.
  const columns = [
    footerNavigation.solutions,
    footerNavigation.audiences,
    footerNavigation.company,
    footerNavigation.research,
  ].filter((column) => column.items.length > 0)

  return (
    <footer className="border-t border-rule pt-[30px] pr-pad pb-12 pl-rail">
      <div className="mx-auto max-w-site">
        <div className="flex flex-wrap items-baseline gap-x-10 gap-y-3.5">
          <WordmarkLink />
          {/* The canvas brand line is the mono label in sentence case, so it is
              composed here rather than taking `.text-coordinate`, which is the
              uppercase coordinate role. */}
          <p className="font-mono text-[length:var(--text-coordinate)] leading-[var(--leading-small)] font-[var(--weight-mono)] tracking-[0.02em] text-ink-2">
            {siteConfig.categoryLine}
          </p>
        </div>

        <div className="mt-[34px] grid grid-cols-1 gap-x-pad gap-y-8 min-[32.5rem]:grid-cols-2 min-[56.25rem]:grid-cols-4">
          {columns.map((column) => {
            const headingId = `footer-${column.heading.toLowerCase().replace(/\W+/g, '-')}`

            return (
              <nav key={column.heading} aria-labelledby={headingId} className="min-w-0">
                <h2 id={headingId} className="text-coordinate mb-3 text-ink-2">
                  {column.heading}
                </h2>
                <ul className="grid">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <NavLink href={item.href} className={COLUMN_LINK}>
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )
          })}
        </div>

        <div className="foot-legal mt-[30px] flex flex-wrap items-center gap-x-[22px] gap-y-1 border-t border-rule pt-[18px]">
          <ul className="flex flex-wrap items-center gap-x-[22px] gap-y-1">
            {legalRow.map((entry) =>
              entry === PRIVACY_CHOICES ? (
                <li key="privacy-choices" className="flex">
                  <PrivacyChoicesButton />
                </li>
              ) : (
                <li key={entry.href} className="flex">
                  <NavLink href={entry.href}>{entry.label}</NavLink>
                </li>
              ),
            )}
          </ul>
          <p className="inline-flex min-h-[var(--link-min-height)] items-center text-[length:var(--text-caption)] text-ink-2 min-[56.25rem]:ml-auto">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
