import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { RelatedLinks } from '@/components/sections/related-links'
import { JsonLd } from '@/components/seo/json-ld'
import { routes } from '@/config/routes'
import { expectations, hero, meta, related, routing } from '@/content/pages/contact'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.contact.path,
})

/**
 * The consent language and the privacy notice are approved
 * (CONTENT_VERIFICATION.md L1, L3), so the inquiry form is no longer blocked on
 * copy. It lands with the redesign's forms work (handoff PR 10), and email
 * delivery is unconfirmed until then. This page carries the approved routing
 * and expectation copy only: no form is rendered and no submission endpoint is
 * advertised.
 */
export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.contact.path,
            title: meta.title,
            description: meta.description,
            type: 'ContactPage',
            hasBreadcrumb: true,
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        path={routes.contact.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.contact.label },
        ]}
      />

      <Section variant="field" size="major" ariaLabelledBy="routing-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={routing.eyebrow}
              title={routing.title}
              id="routing-title"
              maxWidth="wide"
            />

            <blockquote className="border-l-2 border-path pl-6">
              <p className="text-h3 measure text-ink">{routing.prompt}</p>
            </blockquote>

            <ul className="grid gap-5 md:grid-cols-2">
              {routing.choices.map((choice) => (
                <li
                  key={choice.name}
                  className="flex flex-col gap-3 border border-rule p-6"
                >
                  <h3 className="text-[1.125rem] font-medium text-ink">
                    {choice.name}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                    {choice.description}
                  </p>
                  {choice.href && choice.linkLabel ? (
                    <Link
                      href={choice.href}
                      className="group mt-auto inline-flex items-center gap-1.5 pt-1 text-[0.9375rem] font-medium text-link underline decoration-1 underline-offset-4 transition-colors hover:text-link"
                    >
                      {choice.linkLabel}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      />
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="standard" ariaLabelledBy="expectations-title">
        <Container width="narrow">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow={expectations.eyebrow}
              title={expectations.title}
              id="expectations-title"
            />
            {expectations.body.map((paragraph) => (
              <p key={paragraph} className="text-lead text-ink-2">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <RelatedLinks title="Where to go next." links={related} />
    </>
  )
}
