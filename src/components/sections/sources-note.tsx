import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { isBuilt } from '@/config/routes'
import { formatLongDate } from '@/lib/utils/format-date'

/**
 * "Sources and update information" block required on definition pages
 * (09 5.55; docs/03 §"Definition pages").
 *
 * Definition pages state a position rather than reporting external findings, so
 * there is no citation list to render: claiming sources these pages do not draw
 * on would be worse than stating none. What the block does carry is the review
 * date and where the definition is operationalised, which is what a reader needs
 * in order to judge whether it is current.
 *
 * `dateTime` is a plain ISO date so the rendered `<time>` stays machine-readable.
 */
export function SourcesNote({
  reviewed,
  basis,
  appliedIn,
}: {
  /** ISO date, e.g. 2026-08-16. */
  reviewed: string
  basis: string
  appliedIn: readonly { label: string; href: string }[]
}) {
  const formatted = formatLongDate(reviewed)

  const available = appliedIn.filter((item) => isBuilt(item.href))

  return (
    <Section variant="soft" size="small" ariaLabelledBy="sources-heading">
      <Container width="narrow">
        <div className="text-small flex flex-col gap-4 border-t border-rule pt-4 text-ink-2">
          <h2 id="sources-heading" className="text-coordinate text-ink-2">
            Sources and updates
          </h2>

          <p>
            {basis} Last reviewed{' '}
            <time dateTime={reviewed} className="text-ink-body">
              {formatted}
            </time>
            .
          </p>

          {available.length > 0 ? (
            <p>
              This definition is applied in{' '}
              {available.map((item, index) => (
                <span key={item.href}>
                  {index > 0 ? (index === available.length - 1 ? ' and ' : ', ') : ''}
                  <Link href={item.href} className="link">
                    {item.label}
                  </Link>
                </span>
              ))}
              .
            </p>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
