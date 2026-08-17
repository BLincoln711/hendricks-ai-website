import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { isBuilt } from '@/config/routes'

export type RelatedLink = {
  href: string
  label: string
  description: string
}

/**
 * "Related" block that satisfies the internal-linking rules in docs/03 §6.
 *
 * Unbuilt routes are filtered out rather than rendered as dead links, so the
 * editorial pages listed for Phase 6 can be added to a page's `related` array
 * now and will appear automatically once those routes exist.
 */
export function RelatedLinks({
  eyebrow = 'Keep Reading',
  title,
  links,
}: {
  eyebrow?: string
  title: string
  links: readonly RelatedLink[]
}) {
  const available = links.filter((link) => isBuilt(link.href))
  if (available.length === 0) return null

  return (
    <Section variant="soft" size="standard" ariaLabelledBy="related-title">
      <Container>
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow={eyebrow} title={title} id="related-title" level={2} />

          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {available.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex h-full flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5 transition-colors hover:border-[var(--color-blue)]"
                >
                  <span className="flex items-center gap-1.5 text-[1.0625rem] font-medium text-[var(--color-navy)]">
                    {link.label}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 text-[var(--color-blue)] transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    />
                  </span>
                  <span className="text-[0.875rem] leading-relaxed text-[var(--color-slate)]">
                    {link.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
