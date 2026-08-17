import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { isBuilt } from '@/config/routes'
import { formatLongDate } from '@/lib/utils/format-date'

/**
 * "Sources and update information" block required on definition pages
 * (docs/03 §"Definition pages").
 *
 * Definition pages state a position rather than reporting external findings, so
 * there is no citation list to render — claiming sources these pages do not draw
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
        <div className="flex flex-col gap-4">
          <h2 id="sources-heading" className="text-eyebrow text-[var(--color-slate)]">
            Sources and updates
          </h2>

          <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
            {basis} Last reviewed{' '}
            <time dateTime={reviewed} className="text-[var(--color-graphite)]">
              {formatted}
            </time>
            .
          </p>

          {available.length > 0 ? (
            <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
              This definition is applied in{' '}
              {available.map((item, index) => (
                <span key={item.href}>
                  {index > 0 ? (index === available.length - 1 ? ' and ' : ', ') : ''}
                  <Link
                    href={item.href}
                    className="text-[var(--color-blue)] underline decoration-[color-mix(in_srgb,var(--color-blue)_40%,transparent)] underline-offset-4 hover:decoration-[var(--color-blue)]"
                  >
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
