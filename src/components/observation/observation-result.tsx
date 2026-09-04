import Link from 'next/link'

import { WordmarkLink } from '@/components/layout/wordmark'
import { ObservationBoard } from '@/components/observation/observation-board'
import { ObservationJobPoll } from '@/components/observation/observation-poll'
import { PrimaryCta, RuleLink } from '@/components/ui/cta'
import { observationEngines } from '@/content/instruments/observation-data'
import {
  diagnosticDoor,
  disclosure,
  engines as engineCopy,
  queued,
} from '@/content/pages/observe'
import { routes } from '@/config/routes'
import type { ObservationJob } from '@/lib/observation/contract'
import { categoryLabel, displayBrand } from '@/lib/observation/parse'

/**
 * Queued observation chrome. Wordmark, Observation label, pending board,
 * sample intent chips, disclosure, Diagnostic door.
 *
 * No Selection Map drawing. No shortlisted cells. No invented peers. Gemini
 * is unmeasured from first paint.
 */

export function ObservationResult({ job }: { job: ObservationJob }) {
  const brand = displayBrand(job.brand_name)

  return (
    <figure className="plate" id="observation">
      <div className="plate-head">
        <WordmarkLink />
        <span className="plate-title">{queued.instrumentLabel}</span>
      </div>
      <p className="plate-gloss">{queued.gloss}</p>

      <p className="observation-brand">
        <span className="text-coordinate text-ink-2">{categoryLabel(job.category)}</span>
        <span title={brand.full} aria-label={brand.full}>
          {brand.display}
        </span>
      </p>

      <p className="observation-job text-coordinate text-ink-2">
        <span>{queued.jobLabel}</span>{' '}
        <code title={job.job_id} data-observe-job={job.job_id}>
          {job.job_id.length > 28 ? `${job.job_id.slice(0, 25)}...` : job.job_id}
        </code>
      </p>

      <ObservationJobPoll jobId={job.job_id} status={job.status} />
      <ObservationBoard job={job} />

      <div className="observation-intents">
        <p className="text-coordinate text-ink-2">{queued.intentsLegend}</p>
        <ul>
          {job.contexts.map((intent) => (
            <li key={intent}>
              <span className="observation-chip">{intent}</span>
            </li>
          ))}
        </ul>
        <p className="text-caption text-ink-2">{queued.intentsNote}</p>
      </div>

      <ul className="observation-engines" aria-label={engineCopy.legend}>
        {observationEngines.map((engine) => (
          <li key={engine.id}>
            <span>{engine.label}</span>
            <span>
              {engine.status === 'unmeasured'
                ? `${engineCopy.notProbed} (${engineCopy.notProbedNote})`
                : engineCopy.queued}
            </span>
          </li>
        ))}
      </ul>

      <figcaption className="plate-cap">
        <span>{disclosure.sample}</span>
        <span>{disclosure.limits}</span>
        <span>{disclosure.diagnostic}</span>
      </figcaption>

      <div className="observation-door">
        <p className="text-caption text-ink-2">{diagnosticDoor.note}</p>
        <PrimaryCta cta={diagnosticDoor.cta} />
        <RuleLink cta={{ label: queued.anotherLabel, href: routes.observe.path }} />
      </div>
    </figure>
  )
}

export function ObservationDisclosure() {
  return (
    <div className="measure flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
      <p>{disclosure.sample}</p>
      <p>{disclosure.limits}</p>
      <p>{disclosure.diagnostic}</p>
      <p>
        {diagnosticDoor.note}{' '}
        <Link href={routes.diagnostic.path} className="link">
          {diagnosticDoor.cta.label}
        </Link>
      </p>
    </div>
  )
}
