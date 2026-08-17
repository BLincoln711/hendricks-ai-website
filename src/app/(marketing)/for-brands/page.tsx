import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { RelatedLinks } from '@/components/sections/related-links'
import { JsonLd } from '@/components/seo/json-ld'
import { SignalList } from '@/components/ui/signal-list'
import { OperatingLayer } from '@/components/visuals/operating-layer'
import { routes } from '@/config/routes'
import {
  changes,
  closing,
  engagements,
  hero,
  meta,
  notReplaced,
  related,
  signals,
} from '@/content/pages/for-brands'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.forBrands.path,
})

export default function ForBrandsPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.forBrands.path,
            title: meta.title,
            description: meta.description,
            hasBreadcrumb: true,
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        primaryCta={hero.primaryCta}
        path={routes.forBrands.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.forBrands.label },
        ]}
      />

      <Section variant="field" size="major" ariaLabelledBy="signals-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHeading eyebrow={signals.eyebrow} title={signals.title} id="signals-title" />
            <SignalList items={signals.items} />
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="changes-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={changes.eyebrow}
              title={changes.title}
              id="changes-title"
              maxWidth="wide"
            />

            <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
              {changes.items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-2 border-t-2 border-[var(--color-blue)] pt-5"
                >
                  <dt className="text-[1.0625rem] font-medium text-[var(--color-navy)]">
                    {item.name}
                  </dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section variant="soft" size="major" ariaLabelledBy="engagements-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={engagements.eyebrow}
              title={engagements.title}
              id="engagements-title"
              maxWidth="wide"
            />

            <ol className="grid gap-5 md:grid-cols-2">
              {engagements.items.map((engagement, index) => (
                <li
                  key={engagement.name}
                  className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 md:p-8"
                >
                  <span className="font-mono text-[0.8125rem] text-[var(--color-blue)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-[1.25rem] leading-snug font-medium text-[var(--color-navy)]">
                    {engagement.name}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                    {engagement.description}
                  </p>
                  <Link
                    href={engagement.href}
                    className="group mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.9375rem] font-medium text-[var(--color-blue)] underline decoration-1 underline-offset-4 transition-colors hover:text-[var(--color-blue-hover)]"
                  >
                    {engagement.linkLabel}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="not-replaced-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={notReplaced.eyebrow}
              title={notReplaced.title}
              description={notReplaced.lead}
              id="not-replaced-title"
              maxWidth="wide"
            />

            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
              <div className="flex flex-col gap-6">
                <SignalList items={notReplaced.items} />
                <p className="text-[1rem] leading-relaxed text-[var(--color-graphite)]">
                  {notReplaced.closing}
                </p>
              </div>

              <OperatingLayer
                participants={notReplaced.participants}
                layerName={notReplaced.layerName}
                layerDescription={notReplaced.layerDescription}
              />
            </div>
          </div>
        </Container>
      </Section>

      <RelatedLinks title="Where to go next." links={related} />

      <ClosingCta title={closing.title} primaryCta={closing.primaryCta} />
    </>
  )
}
