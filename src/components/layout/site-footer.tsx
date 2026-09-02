import { PrivacyChoicesButton } from '@/components/consent/privacy-choices-button'
import { Container } from '@/components/layout/container'
import { NavLink } from '@/components/layout/nav-link'
import { Wordmark } from '@/components/layout/wordmark'
import { footerNavigation, legalNavigation } from '@/config/navigation'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'

/**
 * Site footer (09 5.4; redesign 03 section 3). Light, on the tint ground.
 *
 * Brand block, four labelled `nav` columns and the legal row, rendered on
 * every route so the definition pages and the hub have a sitewide inbound
 * link. Contact keeps its position and Privacy Choices sits between Privacy
 * Request and Corrections on every route (16 SM-07). The Search Economy must
 * never appear here; it belongs only inside Brandon's biography on /about.
 */

const LINK_CLASS =
  'target-variance inline-flex min-h-[var(--link-min-height)] min-w-target items-center pr-1 text-small text-link underline decoration-[length:var(--link-underline-width)] underline-offset-[var(--link-underline-offset)] transition-[text-decoration-thickness] duration-[var(--duration-micro)] ease-standard hover:decoration-[length:var(--link-underline-hover-width)] aria-[current=page]:decoration-[length:var(--link-underline-hover-width)]'

/** The Privacy Choices button renders immediately before this legal link. */
const PRIVACY_CHOICES_BEFORE = routes.corrections.path

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
    <footer className="mt-section border-t border-rule bg-surface-tint pt-10 pb-8 min-[45rem]:pt-14">
      <Container width="site">
        <div className="grid gap-x-[var(--grid-gap)] gap-y-10 md:grid-cols-2 lg:grid-cols-[minmax(0,3fr)_repeat(4,minmax(0,2fr))]">
          <div className="grid content-start gap-3 md:col-span-2 lg:col-span-1">
            <Wordmark />
            <p className="text-small max-w-[30ch] text-ink-2">{siteConfig.categoryLine}</p>
            <p className="text-small max-w-[30ch] text-ink-2">{siteConfig.operatingLine}</p>
          </div>

          {columns.map((column) => {
            const headingId = `footer-${column.heading.toLowerCase().replace(/\W+/g, '-')}`

            return (
              <nav key={column.heading} aria-labelledby={headingId} className="min-w-0">
                {/* A coordinate paragraph, not a heading, so the footer adds nothing to the outline. */}
                <p id={headingId} className="text-coordinate mb-3 text-ink-2">
                  {column.heading}
                </p>
                <ul className="grid">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <NavLink href={item.href} className={LINK_CLASS}>
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )
          })}
        </div>

        <div className="mt-10 grid border-t border-rule pt-4 text-small text-ink-2 min-[45rem]:flex min-[45rem]:flex-wrap min-[45rem]:items-center min-[45rem]:gap-x-6">
          {legalNavigation.map((item) => (
            <span key={item.href} className="contents">
              {item.href === PRIVACY_CHOICES_BEFORE ? <PrivacyChoicesButton /> : null}
              <NavLink href={item.href} className={LINK_CLASS}>
                {item.label}
              </NavLink>
            </span>
          ))}
          <span className="inline-flex min-h-[var(--link-min-height)] items-center">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
        </div>
      </Container>
    </footer>
  )
}
