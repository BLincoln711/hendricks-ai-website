import { ILLUSTRATIVE_CAPTION } from '@/content/shared/chrome'
import type { problem } from '@/content/pages/home'

/**
 * Plate 02, the two paths (canvas `home-v3.html` station 2).
 *
 * One coordinate grid carrying two lanes. The ranking lane is drawn in the
 * muted stroke and ends at Conversion, with a short spur marking where the
 * website session began: step three of four. The selection lane is drawn in
 * the customer-path stroke, ends in the signal dot at Choice, and continues
 * into an inferred dashed spur, because whether a website session happens at
 * all after the choice is an inference and not an observation.
 *
 * The drawing is a coordinate system and the words are HTML over it, which is
 * the plate system's rule: labels stay at token size while the drawing scales,
 * and no label is baked into the SVG where a translation or a zoom could not
 * reach it. The label layer is `aria-hidden`, and the text alternative below
 * carries the same content as one sentence pair, because a screen reader
 * reading twenty-two floating labels in grid order learns nothing.
 *
 * Illustrative interface. Not a client result. The locked line is the page
 * legend; this plate keeps it in the text alternative, not as a second visible
 * caption.
 */

/** The grid the label layer is laid out on: seven step columns, eleven rows. */
const LABEL_GRID = {
  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
  gridTemplateRows:
    'minmax(0,26fr) minmax(0,18fr) minmax(0,18fr) minmax(0,18fr) minmax(0,18fr) minmax(0,26fr) minmax(0,18fr) minmax(0,18fr) minmax(0,20fr) minmax(0,16fr) minmax(0,20fr)',
} as const

/** Column of each step label, in the order the lane names them. */
const TRADITIONAL_COLUMNS = [1, 3, 5, 7] as const
const AI_COLUMNS = [1, 2, 3, 4, 5, 6, 7] as const

export function TwoPathsPlate({ plate }: { plate: typeof problem.plate }) {
  return (
    <figure className="plate">
      <div className="plate-head">
        <span className="plate-no">{plate.number}</span>
        <span className="plate-title">{plate.title}</span>
      </div>
      <p className="plate-gloss">{plate.gloss}</p>

      <div className="drawing">
        <svg
          className="dts"
          viewBox="0 0 664 216"
          preserveAspectRatio="xMinYMin meet"
          role="img"
          aria-labelledby="two-paths-title"
          aria-describedby="two-paths-alt"
          focusable="false"
        >
          <title id="two-paths-title">Two search paths compared</title>

          {/* The ranking lane. Muted, because it is the path being left behind. */}
          <path d="M47 52H617" stroke="var(--ev-muted)" strokeWidth={1.25} fill="none" />
          {[47, 237, 427, 617].map((x) => (
            <circle
              key={`t-${x}`}
              cx={x}
              cy={52}
              r={3.5}
              fill="var(--bg)"
              stroke="var(--ink)"
              strokeWidth={1.25}
            />
          ))}
          <path d="M427 58V72" stroke="var(--path)" strokeWidth={1.5} fill="none" />
          <circle cx={427} cy={75} r={3} fill="none" stroke="var(--path)" strokeWidth={1.5} />

          {/* The selection lane, ending in the signal dot at Choice. */}
          <path d="M47 170H617" stroke="var(--path)" strokeWidth={2} fill="none" />
          {[47, 142, 237, 332, 427, 522].map((x) => (
            <circle
              key={`a-${x}`}
              cx={x}
              cy={170}
              r={3.5}
              fill="var(--bg)"
              stroke="var(--ink)"
              strokeWidth={1.25}
            />
          ))}
          <circle cx={617} cy={170} r={7} fill="var(--signal-dot)" />

          {/* Inferred, not observed: the session after the choice, if there is one. */}
          <path
            d="M626 170H646"
            stroke="var(--ev-inferred)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="none"
          />
          <path
            d="M646 176V190"
            stroke="var(--ev-inferred)"
            strokeWidth={1.5}
            strokeDasharray="2 2"
            fill="none"
          />
          <circle
            cx={646}
            cy={193}
            r={3}
            fill="none"
            stroke="var(--ev-inferred)"
            strokeWidth={1.5}
            strokeDasharray="2 2"
          />

          {/* The span the loss happens inside, marked on the baseline. */}
          <path d="M47 184V190H522V184" stroke="var(--rule-strong)" strokeWidth={1} fill="none" />
        </svg>

        <div className="dts-labels" aria-hidden="true" style={LABEL_GRID}>
          <span
            className="lb lb-state text-ink"
            style={{ gridColumn: '1 / span 5', gridRow: 1, justifySelf: 'start', alignSelf: 'center' }}
          >
            {plate.traditional.label}
          </span>
          {plate.traditional.steps.map((step, index) => (
            <span
              key={step}
              className="lb lb-stage"
              style={{ gridColumn: TRADITIONAL_COLUMNS[index], gridRow: 2 }}
            >
              {step}
            </span>
          ))}
          <span
            className="lb lb-state"
            style={{ gridColumn: '5 / span 3', gridRow: 5, justifySelf: 'center', alignSelf: 'center' }}
          >
            {plate.traditional.marker}
          </span>

          <span
            className="lb lb-state text-ink"
            style={{ gridColumn: '1 / span 5', gridRow: 6, justifySelf: 'start', alignSelf: 'center' }}
          >
            {plate.aiMediated.label}
          </span>
          {plate.aiMediated.steps.map((step, index) => (
            <span
              key={step}
              className="lb lb-stage"
              style={{ gridColumn: AI_COLUMNS[index], gridRow: index % 2 === 0 ? 7 : 8 }}
            >
              {step}
            </span>
          ))}
          <span
            className="lb lb-state"
            style={{ gridColumn: '1 / span 4', gridRow: 11, justifySelf: 'start', alignSelf: 'center' }}
          >
            {plate.aiMediated.note}
          </span>
          <span
            className="lb lb-state text-ev-inferred"
            style={{ gridColumn: '5 / span 3', gridRow: 11, justifySelf: 'end', alignSelf: 'center' }}
          >
            {plate.aiMediated.marker}
          </span>
        </div>
      </div>

      <figcaption className="sr-only" id="two-paths-alt">
        {ILLUSTRATIVE_CAPTION} {plate.alt}
      </figcaption>
    </figure>
  )
}
