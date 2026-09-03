'use client'

import { useId, useState } from 'react'

import { fitItems, fitTool, type FitAnswer, type FitItemId } from '@/content/forms/fit-tool'
import { answeredCount, readFit, type FitAnswers } from '@/lib/forms/fit-tool'
import { useHydrated } from '@/lib/utils/use-hydrated'

/**
 * The "Is Hendricks a fit?" tool (15 section 3, CANON R8, 16 FM-10).
 *
 * Advisory by construction. It never gates: the application below is not
 * disabled, hidden or reordered by any reading. It never asks about price. It
 * stores nothing: no cookie, no local storage, no session storage, state lives
 * in component memory and is gone on reload. It makes no network request of any
 * kind, and no control or link inside it fires an analytics event, because a
 * band is a function of nothing but the answers and is therefore answer data in
 * aggregate.
 *
 * Before hydration, and forever without JavaScript, the section is the two
 * approved lists rendered by the server above this island plus one instruction.
 * That is also why the lists are not replaced by the questions once the island
 * mounts: D-E keeps the approved text on the page for a reader who is not going
 * to answer fourteen radio pairs.
 */
export function FitTool({ applyHref }: { applyHref: string }) {
  const [answers, setAnswers] = useState<FitAnswers>({})
  const ids = useId()

  // The server and the first client pass render the same markup, so the no-JS
  // form of this section is the real one rather than a fallback nobody sees.
  const hydrated = useHydrated()

  if (!hydrated) {
    return <p className="text-lead measure-wide text-ink-2">{fitTool.staticInstruction}</p>
  }

  const answered = answeredCount(answers)
  const reading = readFit(answers)

  const answer = (id: FitItemId, value: FitAnswer) =>
    setAnswers((current) => ({ ...current, [id]: value }))

  const sides = [
    { side: 'good' as const, legend: fitTool.goodLegend },
    { side: 'not' as const, legend: fitTool.notLegend },
  ]

  return (
    <div className="fittool">
      <p className="text-lead measure-wide text-ink-2">{fitTool.intro}</p>

      {sides.map(({ side, legend }) => (
        <fieldset key={side} className="fset">
          <legend>{legend}</legend>

          {fitItems
            .filter((item) => item.side === side)
            .map((item) => (
              <fieldset key={item.id} className="fitq">
                <legend>{item.question}</legend>

                {(['yes', 'no'] as const).map((value) => (
                  <label
                    key={value}
                    htmlFor={`${ids}-${item.id}-${value}`}
                    className="check"
                  >
                    <input
                      id={`${ids}-${item.id}-${value}`}
                      type="radio"
                      name={`${ids}-${item.id}`}
                      value={value}
                      checked={answers[item.id] === value}
                      onChange={() => answer(item.id, value)}
                    />
                    <span>{fitTool.answerLabels[value]}</span>
                  </label>
                ))}
              </fieldset>
            ))}
        </fieldset>
      ))}

      <div role="status" aria-live="polite" className="fitresult">
        {reading === null ? (
          <p className="text-lead text-ink-2">{fitTool.progress(answered)}</p>
        ) : (
          <FitReadingBlock band={reading.band} drivers={reading.drivers} applyHref={applyHref} />
        )}
      </div>

      <p className="measure-wide text-caption mt-8 text-ink-2">{fitTool.storageNote}</p>
    </div>
  )
}

function FitReadingBlock({
  band,
  drivers,
  applyHref,
}: {
  band: 'strong' | 'possible' | 'not-a-fit'
  drivers: readonly FitItemId[]
  applyHref: string
}) {
  const copy =
    band === 'strong'
      ? fitTool.results.strong
      : band === 'possible'
        ? fitTool.results.possible
        : fitTool.results.notAFit

  const driverItems = fitItems.filter((item) => drivers.includes(item.id))

  return (
    <div className="answer">
      <h3 className="text-h3 text-ink">{copy.heading}</h3>
      <p>{copy.body}</p>

      {driverItems.length > 0 ? (
        <>
          <p className="text-coordinate mt-6 text-ink-2">{fitTool.driversHeading}</p>
          <ul className="plainlist mt-2">
            {driverItems.map((item) => (
              <li key={item.id}>{item.approved}</li>
            ))}
          </ul>
        </>
      ) : null}

      {band === 'not-a-fit' ? (
        <>
          <ul className="plainlist mt-6">
            {fitTool.results.notAFit.links.map((link) => (
              <li key={link.href}>
                <a className="link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6">{fitTool.results.notAFit.closing}</p>
        </>
      ) : (
        <p className="mt-6">
          <a className="link" href={applyHref}>
            {fitTool.continueLabel}
          </a>
        </p>
      )}
    </div>
  )
}
