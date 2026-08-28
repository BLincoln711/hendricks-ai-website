import type { Metadata } from 'next'
import Image from 'next/image'

import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { ExternalVentureCard } from '@/components/sections/external-venture-card'
import { RelatedLinks } from '@/components/sections/related-links'
import { RoleTimeline } from '@/components/sections/role-timeline'
import { JsonLd } from '@/components/seo/json-ld'
import { CtaGroup, PrimaryCta } from '@/components/ui/cta'
import { SignalList } from '@/components/ui/signal-list'
import { SignalDot } from '@/components/visuals/signal-dot'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import {
  closing,
  experience,
  externalVenture,
  hero,
  meta,
  pointOfView,
  principles,
  related,
} from '@/content/pages/about'
import { jsonLdGraph, personSchema, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.about.path,
})

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.about.path,
            title: meta.title,
            description: meta.description,
            // docs/06 §8 names AboutPage for this route. `mainEntity` points at
            // the Person node below, which is what declares that this page is
            // about Brandon Lincoln Hendricks rather than merely mentioning him.
            type: 'AboutPage',
            mainEntity: { '@id': `${siteConfig.url}/about#person` },
            hasBreadcrumb: true,
          }),
          personSchema({
            jobTitle: siteConfig.founderRole,
            imagePath: hero.portrait.src,
            // Must match the employers rendered in the visible role timeline.
            // "Dentsu" was asserted here while `about.ts` records the opposite
            // decision: the employer is Merkle alone, because that is what the
            // public record shows (CONTENT_VERIFICATION.md F4).
            alumniOf: ['Merkle', 'SolarWinds'],
          }),
        )}
      />

      {/*
        About uses its own hero rather than PageHero: the portrait is a real
        photograph in the primary column, not a diagram in a side panel.
      */}
      <Section variant="navy" size="major" ariaLabelledBy="page-title">
        <Container>
          <div className="flex flex-col gap-8">
            <Breadcrumbs
              items={[
                { label: routes.home.label, href: routes.home.path },
                { label: routes.about.label },
              ]}
              onNavy
              path={routes.about.path}
            />

            <div className="grid items-start gap-10 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-14">
              <Image
                src={hero.portrait.src}
                alt={hero.portrait.alt}
                width={hero.portrait.width}
                height={hero.portrait.height}
                priority
                sizes="(min-width: 768px) 320px, 100vw"
                className="w-full max-w-[320px] rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-field)_20%,transparent)]"
              />

              <div className="flex flex-col gap-6">
                <p className="text-eyebrow flex items-center gap-2 text-[var(--color-cyan)]">
                  <SignalDot size={6} tone="cyan" />
                  {hero.eyebrow}
                </p>

                <h1 id="page-title" className="text-h1 max-w-[22ch] text-[var(--color-field)]">
                  {hero.title}
                </h1>

                <div className="flex flex-col gap-4">
                  {hero.lead.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-lead measure text-[color-mix(in_srgb,var(--color-field)_76%,transparent)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <CtaGroup className="mt-2">
                  <PrimaryCta cta={hero.primaryCta} />
                </CtaGroup>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="field" size="major" ariaLabelledBy="point-of-view-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow={pointOfView.eyebrow}
                title={pointOfView.title}
                id="point-of-view-title"
              />

              <blockquote className="border-l-2 border-[var(--color-blue)] pl-6">
                <p className="text-h3 text-[var(--color-navy)]">{pointOfView.quote}</p>
              </blockquote>
            </div>

            <div className="flex flex-col gap-5">
              {pointOfView.body.map((paragraph) => (
                <p key={paragraph} className="text-lead text-[var(--color-graphite)]">
                  {paragraph}
                </p>
              ))}

              <ul className="flex flex-col gap-1">
                {pointOfView.notList.map((line) => (
                  <li key={line} className="text-[1.0625rem] font-medium text-[var(--color-navy)]">
                    {line}
                  </li>
                ))}
              </ul>

              <p className="text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]">
                {pointOfView.closing}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="principles-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={principles.eyebrow}
              title={principles.title}
              id="principles-title"
              maxWidth="wide"
            />

            <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {principles.items.map((principle) => (
                <div
                  key={principle.name}
                  className="flex flex-col gap-2 border-t-2 border-[var(--color-blue)] pt-5"
                >
                  <dt className="text-[1.0625rem] font-medium text-[var(--color-navy)]">
                    {principle.name}
                  </dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                    {principle.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section variant="field" size="major" ariaLabelledBy="experience-title">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
              <SectionHeading
                eyebrow={experience.eyebrow}
                title={experience.title}
                description={experience.lead}
                id="experience-title"
              />
              <RoleTimeline roles={experience.roles} />
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
              <h3 className="text-xl font-semibold text-[var(--color-navy)]">
                {experience.capabilitiesTitle}
              </h3>
              <SignalList items={experience.items} columns={2} />
            </div>

            <ExternalVentureCard
              label={externalVenture.label}
              name={externalVenture.name}
              description={externalVenture.description}
              cta={externalVenture.cta}
            />
          </div>
        </Container>
      </Section>

      <RelatedLinks title="Where to go next." links={related} />

      <ClosingCta title={closing.title} primaryCta={closing.primaryCta} />
    </>
  )
}
