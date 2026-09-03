import type { SystemFlowStage } from '@/content/pages/solutions'

/**
 * Plate 01 on /solutions: the four solutions drawn as one path.
 *
 * Four nodes on one handoff line, each passing a named output to the next, with
 * a dashed return path from Impact back to Demand. The drawing carries no
 * words: the labels sit above it in HTML, so they take the page's own font and
 * ink tokens and scale with the reader's text size, and the whole label layer
 * is `aria-hidden` because the figure's text equivalent is read instead.
 *
 * Geometry is verbatim from `07-hifi/solutions.html`. Two viewports are drawn
 * rather than one scaled: a horizontal path at reading widths and a vertical
 * one below 900 px, where four labels across a phone are unreadable.
 */
const HANDOFFS = [
  'Demand Map, Intent Context Library',
  'Selection Map, Commercial Selection Gap',
  'Intervention Roadmap',
] as const

const RETURN_LABEL = 'Learn and repeat: Impact Ledger'

/** Node positions on the 1320-wide desktop path, as percentages of its width. */
const DESKTOP_NODES = [5.303, 35.101, 64.899, 94.697] as const
const DESKTOP_HANDOFFS = [20.202, 50, 79.798] as const

export function OneSystemDrawing({ stages }: { stages: readonly SystemFlowStage[] }) {
  return (
    <>
      <div className="dw drawing-desktop">
        <svg
          viewBox="0 0 1320 240"
          width="100%"
          preserveAspectRatio="xMinYMin meet"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M70 96H1250" stroke="var(--path)" strokeWidth="2" fill="none" />
          <path
            d="M1250 104V166A10 10 0 0 1 1240 176H80A10 10 0 0 1 70 166V104"
            stroke="var(--guide)"
            strokeWidth="1"
            strokeDasharray="2 6"
            fill="none"
          />
          {[70, 463.33, 856.67, 1250].map((cx) => (
            <circle key={cx} cx={cx} cy="96" r="6" fill="var(--ink)" />
          ))}
        </svg>

        <div className="dw-pins" aria-hidden="true">
          {stages.map((stage, index) => (
            <span
              key={stage.name}
              className="big"
              style={{ left: `${DESKTOP_NODES[index]}%`, top: '15%', width: '10.5%' }}
            >
              {stage.name}
            </span>
          ))}
          {HANDOFFS.map((handoff, index) => (
            <span
              key={handoff}
              className="sm"
              style={{ left: `${DESKTOP_HANDOFFS[index]}%`, top: '51%', width: '28%' }}
            >
              {handoff}
            </span>
          ))}
          <span className="sm" style={{ left: '50%', top: '84%', width: '60%' }}>
            {RETURN_LABEL}
          </span>
        </div>
      </div>

      <div className="dw drawing-mobile">
        <svg
          viewBox="0 0 280 480"
          width="100%"
          preserveAspectRatio="xMinYMin meet"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M26 30V390" stroke="var(--path)" strokeWidth="2" fill="none" />
          <path
            d="M26 396V456H10V30H20"
            stroke="var(--guide)"
            strokeWidth="1"
            strokeDasharray="2 6"
            fill="none"
          />
          {[30, 150, 270, 390].map((cy) => (
            <circle key={cy} cx="26" cy={cy} r="5" fill="var(--ink)" />
          ))}
        </svg>

        <div
          className="dw-labels"
          aria-hidden="true"
          style={{ gridTemplateColumns: 'minmax(0,1fr)', gridTemplateRows: 'repeat(8, 1fr)' }}
        >
          {stages.map((stage, index) => (
            <span key={stage.name} className="inset" style={{ gridArea: `${index * 2 + 1} / 1` }}>
              {stage.name}
            </span>
          ))}
          {[...HANDOFFS, RETURN_LABEL].map((label, index) => (
            <span key={label} className="inset q" style={{ gridArea: `${index * 2 + 2} / 1` }}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
