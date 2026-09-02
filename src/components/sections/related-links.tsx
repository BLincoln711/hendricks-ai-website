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
 * Internal links block (09 5.55; docs/03 §6) in the ledger grammar: ruled rows
 * rather than card boxes, each link a 44 px standalone link (KF-09).
 *
 * Unbuilt routes are filtered out rather than rendered as dead links, so a
 * route can be added to a page's `related` array before it exists and will
 * appear automatically once it does.
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

          <ul className="grid gap-x-[var(--ledger-gap)] border-b border-rule md:grid-cols-2 lg:grid-cols-3">
            {available.map((link) => (
              <li key={link.href} className="flex flex-col gap-1 border-t border-rule py-4">
                <Link href={link.href} className="link link-standalone self-start">
                  {link.label}
                  <ArrowRight aria-hidden="true" focusable="false" className="link-arrow size-4 motion-reduce:transition-none" />
                </Link>
                <span className="text-small text-ink-2">{link.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
