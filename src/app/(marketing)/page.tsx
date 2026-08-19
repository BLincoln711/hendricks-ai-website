import Image from 'next/image'
import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { JsonLd } from '@/components/seo/json-ld'
import { CtaGroup, PrimaryCta, TextCta } from '@/components/ui/cta'
import { DemandToSelectionPath } from '@/components/visuals/demand-to-selection-path'
import { SelectionMap } from '@/components/visuals/selection-map'
import { SignalDot } from '@/components/visuals/signal-dot'
import { SolutionMotif } from '@/components/visuals/solution-motif'
import { CompletePath, TraditionalVsAiFlow } from '@/components/visuals/traditional-vs-ai-flow'
import { features } from '@/config/feature-flags'
import {
  audiences,
  diagnostic,
  distinction,
  finalCta,
  founder,
  hero,
  homeMeta,
  measurement,
  methodology,
  outputs,
  problem,
  solutions,
  whatWeDo,
} from '@/content/pages/home'
import { buildMetadata } from '@/lib/seo/metadata'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'

export const metadata: Metadata = buildMetadata({
  title: homeMeta.title,
  description: homeMeta.description,
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <JsonLd
        // Organization and WebSite are emitted site-wide by SiteShell, so the
        // homepage carries only its own WebPage node. Emitting them here too
        // would duplicate both nodes on this one document.
        data={jsonLdGraph(
          webPageSchema({ path: '/', title: homeMeta.title, description: homeMeta.description }),
        )}
      />

      {/* 1 — Hero */}
      <Section variant="navy" size="major" ariaLabelledBy="hero-title">
        <Container>
          {/*
            The headline spans the full container rather than sitting in a
            column. At the design system's H1 size a narrow column breaks the
            category line across four lines and strands the Selection Map in
            dead space. Reading order is unchanged.
          */}
          <div className="flex flex-col gap-10 lg:gap-14">
            <div className="flex flex-col gap-5">
              <p className="text-eyebrow flex items-center gap-2 text-[var(--color-cyan)]">
                <SignalDot size={6} tone="cyan" />
                {hero.eyebrow}
              </p>

              <h1 id="hero-title" className="text-h1 max-w-[20ch] text-[var(--color-field)]">
                {hero.title}
              </h1>

              <p className="text-h3 max-w-[26ch] text-[color-mix(in_srgb,var(--color-field)_88%,transparent)]">
                {hero.subtitle}
              </p>
            </div>

            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-16">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  {hero.lead.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-lead text-[color-mix(in_srgb,var(--color-field)_74%,transparent)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <CtaGroup className="mt-1">
                  <PrimaryCta cta={hero.primaryCta} />
                  <PrimaryCta cta={hero.secondaryCta} variant="outlineOnNavy" />
                </CtaGroup>

                <div className="mt-2 flex flex-col gap-3 border-t border-[color-mix(in_srgb,var(--color-field)_16%,transparent)] pt-6">
                  <p className="text-[0.9375rem] font-medium text-[var(--color-cyan)]">
                    {hero.operatingLine}
                  </p>
                  <p className="text-[0.8125rem] leading-relaxed text-[color-mix(in_srgb,var(--color-field)_56%,transparent)]">
                    {hero.credibilityLine}
                  </p>
                </div>
              </div>

              <SelectionMap />
            </div>
          </div>
        </Container>
      </Section>

      {/* 2 — The AI Selection Problem */}
      <Section variant="field" size="major" ariaLabelledBy="problem-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={problem.eyebrow}
              title={problem.title}
              id="problem-title"
              maxWidth="wide"
            />

            <TraditionalVsAiFlow
              traditional={problem.traditional}
              aiMediated={problem.aiMediated}
            />

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
              <div className="flex flex-col gap-5">
                <p className="text-lead text-[var(--color-graphite)]">{problem.body}</p>
                <div className="flex flex-col gap-1">
                  {problem.emphasis.map((line) => (
                    <p key={line} className="text-[1.0625rem] font-medium text-[var(--color-navy)]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <blockquote className="border-l-2 border-[var(--color-blue)] pl-6">
                <p className="text-h3 text-[var(--color-navy)]">{problem.quote}</p>
              </blockquote>
            </div>

            <div className="flex flex-col gap-5 rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-white p-6 md:p-8">
              <h3 className="text-eyebrow text-[var(--color-slate)]">The complete path</h3>
              <CompletePath steps={problem.completePath} />
              <p className="text-[0.9375rem] text-[var(--color-slate)]">{problem.closing}</p>
            </div>

            <TextCta cta={problem.cta} />
          </div>
        </Container>
      </Section>

      {/* 3 — What Hendricks actually does */}
      <Section variant="white" size="major" ariaLabelledBy="what-we-do-title" id="what-hendricks-does">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow={whatWeDo.eyebrow}
                title={whatWeDo.title}
                id="what-we-do-title"
                maxWidth="wide"
              />
              <div className="flex flex-col gap-2">
                <p className="text-lead text-[var(--color-graphite)]">{whatWeDo.lead}</p>
                <p className="text-lead text-[var(--color-slate)]">{whatWeDo.supporting}</p>
              </div>
            </div>

            <ol className="grid gap-x-10 gap-y-10 md:grid-cols-2">
              {whatWeDo.questions.map((item) => (
                <li
                  key={item.number}
                  className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-6"
                >
                  <span className="font-mono text-[0.875rem] text-[var(--color-blue)]">
                    {item.number}
                  </span>
                  <h3 className="text-[1.375rem] leading-snug font-medium text-[var(--color-navy)]">
                    {item.question}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                    {item.description}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-[0.875rem] font-medium text-[var(--color-navy)]">
                    <SignalDot size={6} />
                    Output: {item.output}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* 4 — Four solutions */}
      <Section variant="field" size="major" ariaLabelledBy="solutions-title">
        <Container>
          <div className="flex flex-col gap-14">
            <SectionHeading
              eyebrow={solutions.eyebrow}
              title={solutions.title}
              id="solutions-title"
              maxWidth="wide"
            />

            <div className="grid gap-6 lg:grid-cols-2">
              {solutions.items.map((solution, index) => (
                <article
                  key={solution.name}
                  className={[
                    'flex flex-col gap-5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 md:p-8',
                    // Stagger so the grid does not read as four identical cards.
                    index % 2 === 1 ? 'lg:mt-10' : '',
                  ].join(' ')}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[0.875rem] text-[var(--color-blue)]">
                      {solution.number}
                    </span>
                    <span className="text-eyebrow text-[var(--color-slate)]">{solution.name}</span>
                  </div>

                  <SolutionMotif motif={solution.motif} />

                  <h3 className="text-[1.5rem] leading-snug font-medium text-[var(--color-navy)]">
                    {solution.title}
                  </h3>

                  <div className="flex flex-col gap-3">
                    {solution.description.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-auto pt-2">
                    <TextCta cta={solution.cta} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 5 — Selection Intelligence distinction */}
      <Section variant="white" size="major" ariaLabelledBy="distinction-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow={distinction.eyebrow}
                title={distinction.title}
                id="distinction-title"
              />
              <div className="flex flex-col gap-2">
                {distinction.statements.map((statement) => (
                  <p key={statement} className="text-[1.0625rem] text-[var(--color-graphite)]">
                    {statement}
                  </p>
                ))}
              </div>
              <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)] measure">
                {distinction.closing}
              </p>
              <div>
                <TextCta cta={distinction.cta} />
              </div>
            </div>

            <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)]">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">{distinction.tableCaption}</caption>
                <thead>
                  <tr className="bg-[var(--color-soft)]">
                    <th
                      scope="col"
                      className="px-4 py-3 text-[0.8125rem] font-medium tracking-wide text-[var(--color-navy)] uppercase md:px-6"
                    >
                      Stage
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-[0.8125rem] font-medium tracking-wide text-[var(--color-navy)] uppercase md:px-6"
                    >
                      Business question
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {distinction.stages.map((row, index) => (
                    <tr
                      key={row.stage}
                      className={index > 0 ? 'border-t border-[var(--color-border)]' : ''}
                    >
                      <th
                        scope="row"
                        className="px-4 py-3.5 align-top text-[0.9375rem] font-medium whitespace-nowrap text-[var(--color-navy)] md:px-6"
                      >
                        {row.stage}
                      </th>
                      <td className="px-4 py-3.5 align-top text-[0.9375rem] text-[var(--color-slate)] md:px-6">
                        {row.question}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6 — Demand-to-Selection methodology */}
      <Section variant="navy" size="major" ariaLabelledBy="methodology-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={methodology.eyebrow}
              title={methodology.title}
              id="methodology-title"
              onNavy
            />

            <DemandToSelectionPath steps={methodology.steps} onNavy />

            <div>
              <TextCta cta={methodology.cta} onNavy />
            </div>
          </div>
        </Container>
      </Section>

      {/* 7 — Tangible outputs */}
      <Section variant="field" size="major" ariaLabelledBy="outputs-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              <SectionHeading eyebrow={outputs.eyebrow} title={outputs.title} id="outputs-title" />
              <p className="text-lead text-[var(--color-slate)]">{outputs.lead}</p>
            </div>

            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {outputs.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <SignalDot size={6} className="mt-2" />
                  <span className="text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 8 — Honest measurement */}
      <Section variant="white" size="major" ariaLabelledBy="measurement-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={measurement.eyebrow}
              title={measurement.title}
              id="measurement-title"
              maxWidth="wide"
            />

            <dl className="grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
              {measurement.layers.map((layer) => (
                <div
                  key={layer.name}
                  className="flex flex-col gap-2 border-t-2 border-[var(--color-blue)] pt-5"
                >
                  <dt className="text-[1.0625rem] font-medium text-[var(--color-navy)]">
                    {layer.name}
                  </dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                    {layer.description}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-4 rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-soft)] p-6 md:p-8">
              {measurement.closing.map((paragraph) => (
                <p key={paragraph} className="text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]">
                  {paragraph}
                </p>
              ))}
              <div className="mt-1">
                <TextCta cta={measurement.cta} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 9 — Audience paths */}
      <Section variant="field" size="major" ariaLabelledBy="audiences-title">
        <Container>
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow={audiences.eyebrow}
              title={audiences.title}
              id="audiences-title"
            />

            <div className="grid gap-6 md:grid-cols-2">
              {audiences.paths.map((path) => (
                <article
                  key={path.audience}
                  className={[
                    'flex flex-col gap-5 rounded-[var(--radius-card)] p-6 md:p-8',
                    path.audienceType === 'brand'
                      ? 'border border-[var(--color-blue)] bg-white'
                      : 'border border-[var(--color-border)] bg-[var(--color-soft)]',
                  ].join(' ')}
                >
                  <p className="text-eyebrow text-[var(--color-blue)]">{path.audience}</p>
                  <h3 className="text-[1.5rem] leading-snug font-medium text-[var(--color-navy)]">
                    {path.title}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {path.description.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="mt-auto pt-2">
                    <PrimaryCta
                      cta={path.cta}
                      variant={path.audienceType === 'brand' ? 'primary' : 'secondary'}
                      size="small"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 10 — Diagnostic entry */}
      <Section variant="white" size="major" ariaLabelledBy="diagnostic-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow={diagnostic.eyebrow}
                title={diagnostic.title}
                id="diagnostic-title"
              />
              <p className="text-lead text-[var(--color-slate)]">{diagnostic.lead}</p>
              <div>
                <PrimaryCta cta={diagnostic.cta} />
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-[var(--radius-panel)] border border-[var(--color-border)] p-6 md:p-8">
              <h3 className="text-[1.0625rem] font-medium text-[var(--color-navy)]">
                {diagnostic.outcomeLead}
              </h3>
              <ul className="flex flex-col gap-3">
                {diagnostic.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2.5">
                    <SignalDot size={6} className="mt-2" />
                    <span className="text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 11 — Results. Renders only when verified proof exists. */}
      {features.showResults ? null : null}

      {/* 12 — Founder */}
      <Section variant="field" size="major" ariaLabelledBy="founder-title">
        <Container>
          <div className="grid items-start gap-10 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-14">
            <Image
              src={founder.portrait.src}
              alt={founder.portrait.alt}
              width={founder.portrait.width}
              height={founder.portrait.height}
              sizes="(min-width: 768px) 320px, 100vw"
              className="w-full max-w-[320px] rounded-[var(--radius-card)] border border-[var(--color-border)]"
            />

            <div className="flex flex-col gap-6">
              <SectionHeading eyebrow={founder.eyebrow} title={founder.title} id="founder-title" />
              <div className="flex flex-col gap-4 measure">
                {founder.body.map((paragraph) => (
                  <p key={paragraph} className="text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div>
                <TextCta cta={founder.cta} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 13 — Final CTA */}
      <Section variant="navy" size="major" ariaLabelledBy="final-cta-title">
        <Container>
          <div className="flex flex-col items-start gap-6">
            <SectionHeading
              eyebrow={finalCta.eyebrow}
              title={finalCta.title}
              id="final-cta-title"
              onNavy
            />
            <div className="flex flex-col gap-4 measure">
              {finalCta.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lead text-[color-mix(in_srgb,var(--color-field)_74%,transparent)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <CtaGroup className="mt-2">
              <PrimaryCta cta={finalCta.primaryCta} />
              <PrimaryCta cta={finalCta.secondaryCta} variant="outlineOnNavy" />
            </CtaGroup>
          </div>
        </Container>
      </Section>
    </>
  )
}
