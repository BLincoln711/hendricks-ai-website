import type { Metadata } from 'next'
import Link from 'next/link'

import { Answer } from '@/components/canvas/answer'
import { ClosingStation } from '@/components/canvas/closing-station'
import { Limitations } from '@/components/canvas/limitations'
import { CanvasPageHero } from '@/components/canvas/page-hero'
import { RailColumn } from '@/components/canvas/rail-column'
import { RelatedRules } from '@/components/canvas/related-list'
import { RuleList } from '@/components/canvas/rule-list'
import { SourcesStation } from '@/components/canvas/sources-station'
import { TableRegion } from '@/components/canvas/table-region'
import { Station } from '@/components/sections/station'
import { JsonLd } from '@/components/seo/json-ld'
import { RuleLink } from '@/components/ui/cta'
import { routes } from '@/config/routes'
import {
  closing,
  contents,
  directAnswer,
  hero,
  limitation,
  log,
  meta,
  recording,
  related,
  relatedSection,
  reporting,
  scope,
  sources,
} from '@/content/pages/corrections'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'
import { formatLongDate } from '@/lib/utils/format-date'

/**
 * /corrections, rebuilt on the approved canvas (`07-hifi/definition-page.html`,
 * the template this route shares with the editorial pages) station for station.
 *
 * The log is an ordered list of entries rather than a table, and each entry
 * keeps its three labelled fields as a description list, so the label travels
 * with its text when one entry is extracted on its own. The card boundary the
 * light version drew around each entry becomes one hairline: this page's
 * subject is what the firm got wrong, and every word of every entry stays.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.corrections.path,
})

export default function CorrectionsPage() {
  return (
    <div className="wrap">
      {/*
        WebPage with a breadcrumb and a modified date, and nothing else.

        No `DefinedTerm`: "Corrections policy" is a section label rather than a
        term this page defines. No `FAQPage` under any framing (docs/06 §10).

        `dateModified` is emitted only because the sources station renders the
        same constant in a visible <time>. The log entries carry their own
        visible dates and are deliberately not promoted into the graph: a
        corrections log is not a `Dataset`, and there is no schema.org type for
        it that would say anything true.
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

      {/* 1. Page hero */}
      <CanvasPageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        path={routes.corrections.path}
        breadcrumbs={[
          { label: routes.home.label, href: routes.home.path },
          { label: routes.corrections.label },
        ]}
      >
        <Answer
          id="answer"
          className="answer-lead mt-[30px]"
          label={directAnswer.term}
          labelId="direct-answer-label"
          paragraphs={[directAnswer.answer]}
        />

        <div className="mt-[26px] max-w-[60ch]">
          {hero.lead.map((paragraph) => (
            <p key={paragraph} className="text-lead mt-3 text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      </CanvasPageHero>

      <div className="bodywrap">
        <RailColumn sections={contents}>
          {/* 01. What is corrected */}
          <Station id="scope" ariaLabelledBy="scope-title" stack>
            <p className="text-eyebrow text-ink-2">{scope.eyebrow}</p>
            <h2 id="scope-title" className="text-h2 text-ink">
              {scope.title}
            </h2>
            <p className="text-lead text-ink">{scope.lead}</p>

            <TableRegion caption={scope.caption} columns={scope.columns} rows={scope.rows} />
          </Station>

          {/* 02. Reporting an error */}
          <Station id="reporting" ariaLabelledBy="reporting-title" stack>
            <p className="text-eyebrow text-ink-2">{reporting.eyebrow}</p>
            <h2 id="reporting-title" className="text-h2 text-ink">
              {reporting.title}
            </h2>
            <p className="text-lead text-ink">{reporting.lead}</p>

            <RuleList items={reporting.items} ariaLabel={reporting.lead} />

            <div className="prose">
              {reporting.closing.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <RuleLink cta={reporting.cta} />
          </Station>

          {/* 03. How a correction is recorded */}
          <Station id="recording" ariaLabelledBy="recording-title" stack>
            <p className="text-eyebrow text-ink-2">{recording.eyebrow}</p>
            <h2 id="recording-title" className="text-h2 text-ink">
              {recording.title}
            </h2>

            <div className="prose">
              {recording.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Station>

          {/* 04. The log */}
          <Station id="log" ariaLabelledBy="log-title" stack>
            <p className="text-eyebrow text-ink-2">{log.eyebrow}</p>
            <h2 id="log-title" className="text-h2 text-ink">
              {log.title}
            </h2>
            <p className="text-lead text-ink">{log.lead}</p>

            <ol className="entry">
              {log.entries.map((entry) => (
                <li key={entry.id} id={entry.id}>
                  {/* One wrapper so the row is two grid cells: the counter the
                      CSS generates, and everything the entry says. */}
                  <div>
                    <h3 className="text-ink">{entry.title}</h3>

                    <p className="tag">
                      {log.fieldLabels.published}{' '}
                      <time dateTime={entry.published}>{formatLongDate(entry.published)}</time>.{' '}
                      {log.fieldLabels.corrected}{' '}
                      <time dateTime={entry.corrected}>{formatLongDate(entry.corrected)}</time>.{' '}
                      {log.fieldLabels.page} <Link href={entry.page.href}>{entry.page.label}</Link>.
                    </p>

                    <dl className="pubrec">
                      {(
                        [
                          [log.fieldLabels.claim, entry.claim],
                          [log.fieldLabels.fault, entry.fault],
                          [log.fieldLabels.change, entry.change],
                        ] as const
                      ).map(([label, text]) => (
                        <div key={label} className="pubrec-row">
                          <dt>{label}</dt>
                          <dd>{text}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
              ))}
            </ol>
          </Station>

          {/*
            05. The honest limitation. On a page whose subject is what the firm
            got wrong, the limits of the log itself are a section-level
            statement rather than an aside.
          */}
          <Station id="limitation" ariaLabelledBy="limitation-title" stack>
            <h2 id="limitation-title" className="text-h2 text-ink">
              {limitation.title}
            </h2>
            <Limitations label={limitation.label} items={limitation.body} />
          </Station>

          {/* 06. Sources */}
          <SourcesStation
            reviewed={sources.reviewed}
            basis={sources.basis}
            appliedIn={sources.appliedIn}
          />

          {/* 07. Where to go next */}
          <Station id="related" ariaLabelledBy="related-title" stack>
            <p className="text-eyebrow text-ink-2">{relatedSection.eyebrow}</p>
            <h2 id="related-title" className="text-h2 text-ink">
              {relatedSection.title}
            </h2>
            <RelatedRules entries={related} ariaLabel={relatedSection.title} />
          </Station>
        </RailColumn>
      </div>

      <ClosingStation id="close" title={closing.title} primaryCta={closing.primaryCta} />
    </div>
  )
}
