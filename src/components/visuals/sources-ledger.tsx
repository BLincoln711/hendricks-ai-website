import { KeyMark } from '@/components/visuals/evidence-key'
import { plateChrome } from '@/content/shared/chrome'
import { ledgerRowsOf, type ResolvedScenario } from '@/lib/selection-map/resolve'
import type { SelectionMapData, SourceId } from '@/lib/selection-map/schema'

/**
 * The sources ledger: one row per source type, in the CANON R12 order, naming
 * the brands the lane supports and the brands it is missing for. Source types
 * only. Nothing here names a publication, a domain or an AI system, because
 * the instrument reports what kind of evidence carried a brand, never who
 * published it.
 *
 * A row that lists a brand is a 44 px button, so the ledger and the drawing
 * can be cross-read from the keyboard. A lane no brand cites is static text,
 * because there is nothing on the drawing for it to point at.
 *
 * The missing-evidence line always renders, empty when the lane is complete.
 * It is a reserved slot in the same sense as the question line and the
 * intervention note: without it a row loses a line when the question changes,
 * every row beneath it moves, and the figure shifts the page while it plays.
 */
export function SourcesLedger({
  data,
  resolved,
  activeLane,
  onPressLane,
}: {
  data: SelectionMapData
  resolved: ResolvedScenario
  activeLane: SourceId | null
  onPressLane?: (lane: SourceId) => void
}) {
  return (
    <>
      <p className="sources-h">{plateChrome.sourcesHeading}</p>
      <ul className="sources">
        {ledgerRowsOf(data, resolved).map((row) => {
          const body = (
            <>
              <KeyMark kind="observed" />
              <span className="type">{row.source.label}</span>
              <span className="who">{row.cited.map((brand) => brand.label).join(', ')}</span>
              <span className="miss">
                {row.missing.length > 0
                  ? `${plateChrome.missingFor} ${row.missing.map((brand) => brand.label).join(', ')}`
                  : null}
              </span>
            </>
          )

          return (
            <li key={row.source.id}>
              {row.cited.length > 0 ? (
                <button
                  type="button"
                  className="src"
                  data-lane={row.source.id}
                  aria-pressed={activeLane === row.source.id}
                  {...(onPressLane ? { onClick: () => onPressLane(row.source.id) } : null)}
                >
                  {body}
                </button>
              ) : (
                <span className="src-static">
                  <span className="type">{row.source.label}</span>
                  <span>{plateChrome.notCited}</span>
                  <span className="miss" />
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}
