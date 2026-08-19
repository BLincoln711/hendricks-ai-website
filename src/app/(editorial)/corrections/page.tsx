import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { ClosingCta } from '@/components/sections/closing-cta'
import { DirectAnswer } from '@/components/sections/direct-answer'
import { RelatedLinks } from '@/components/sections/related-links'
import { SourcesNote } from '@/components/sections/sources-note'
import { JsonLd } from '@/components/seo/json-ld'
import { Callout } from '@/components/ui/callout'
import { TextCta } from '@/components/ui/cta'
import { DataTable } from '@/components/ui/data-table'
import { SignalList } from '@/components/ui/signal-list'
import { routes } from '@/config/routes'
import {
  closing,
  directAnswer,
  hero,
  limitation,
  log,
  meta,
  recording,
  related,
  reporting,
  scope,
  sources,
} from '@/content/pages/corrections'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'
import { formatLongDate } from '@/lib/utils/format-date'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.corrections.path,
})

export default function CorrectionsPage() {
  return (
    <>
      {/*
        WebPage with a breadcrumb and a modified date, and nothing else.

        No `DefinedTerm`, for the same reason as /ai-visibility-tool-or-partner:
        `DirectAnswer` takes a `term` prop that renders as the eyebrow above the
        answer, and "Corrections policy" is a section label rather than a term
        this page defines. No `FAQPage` under any framing (docs/06 §10).

        `dateModified` is emitted only because SourcesNote renders the same
        constant in a visible <time>. The log entries carry their own visible
        dates and are deliberately not promoted into the graph: a corrections
        log is not a `Dataset`, and there is no schema.org type for it that
        would say anything true.
      */}
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.corrections.path,
            title: meta.title,
            description: meta.description,
            hasBreadcrumb: true,
            dateModified: sources.reviewed,
          }),
        )}
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        path={routes.corrections.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.corrections.label },
        ]}
      />

      <DirectAnswer term={directAnswer.term} answer={directAnswer.answer} />

      <Section variant="field" size="major" ariaLabelledBy="scope-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={scope.eyebrow}
              title={scope.title}
              description={scope.lead}
              id="scope-title"
              level={2}
            />

            <DataTable caption={scope.caption} columns={scope.columns} rows={scope.rows} />
          </div>
        </Container>
      </Section>

      <Section variant="white" size="major" ariaLabelledBy="reporting-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow={reporting.eyebrow}
                title={reporting.title}
                description={reporting.lead}
                id="reporting-title"
                level={2}
              />
              <SignalList items={reporting.items} />
            </div>

            <div className="flex flex-col gap-4">
              {reporting.closing.map((line) => (
                <p
                  key={line}
                  className="text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]"
                >
                  {line}
                </p>
              ))}

              <TextCta cta={reporting.cta} />
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="soft" size="major" ariaLabelledBy="recording-title">
        <Container width="narrow">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={recording.eyebrow}
              title={recording.title}
              id="recording-title"
              level={2}
            />

            <div className="flex flex-col gap-4">
              {recording.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/*
        The log is an ordered list rather than a table. Each entry is four
        prose fields, and a table cell wide enough to hold "what was wrong"
        stops being a table. The three fields render as a description list so
        the label travels with its text when the entry is extracted on its own.
      */}
      <Section variant="white" size="major" ariaLabelledBy="log-title">
        <Container>
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow={log.eyebrow}
              title={log.title}
              description={log.lead}
              id="log-title"
              level={2}
            />

            <ol className="flex flex-col gap-10">
              {log.entries.map((entry) => (
                <li
                  key={entry.id}
                  id={entry.id}
                  className="flex flex-col gap-4 rounded-[var(--radius-panel)] border border-[var(--color-border)] bg-[var(--color-field)] p-6 md:p-8"
                >
                  <h3 className="text-[1.25rem] leading-snug font-medium text-[var(--color-navy)]">
                    {entry.title}
                  </h3>

                  <p className="text-[0.875rem] text-[var(--color-slate)]">
                    Published{' '}
                    <time dateTime={entry.published}>{formatLongDate(entry.published)}</time>.
                    Corrected{' '}
                    <time dateTime={entry.corrected}>{formatLongDate(entry.corrected)}</time>. Page:{' '}
                    <Link
                      href={entry.page.href}
                      className="text-[var(--color-blue)] underline decoration-[color-mix(in_srgb,var(--color-blue)_40%,transparent)] underline-offset-4 hover:decoration-[var(--color-blue)]"
                    >
                      {entry.page.label}
                    </Link>
                    .
                  </p>

                  <dl className="flex flex-col gap-4">
                    {(
                      [
                        ['What was published', entry.claim],
                        ['What was wrong', entry.fault],
                        ['What changed', entry.change],
                      ] as const
                    ).map(([label, text]) => (
                      <div key={label} className="flex flex-col gap-1">
                        <dt className="text-eyebrow text-[var(--color-slate)]">{label}</dt>
                        <dd className="measure text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]">
                          {text}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/*
        Promoted to h2 and naming its own section, matching
        /ai-visibility-tool-or-partner. On a page whose subject is what the firm
        got wrong, the limits of the log itself are a section-level statement
        rather than an aside.
      */}
      <Section variant="field" size="standard" ariaLabelledBy="limitation-title">
        <Container>
          <Callout
            variant="limitation"
            label="Honest limitation"
            title={limitation.title}
            titleId="limitation-title"
            headingLevel={2}
          >
            {limitation.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Callout>
        </Container>
      </Section>

      <RelatedLinks title="Where to go next." links={related} />

      <SourcesNote
        reviewed={sources.reviewed}
        basis={sources.basis}
        appliedIn={sources.appliedIn}
      />

      <ClosingCta title={closing.title} primaryCta={closing.primaryCta} />
    </>
  )
}
