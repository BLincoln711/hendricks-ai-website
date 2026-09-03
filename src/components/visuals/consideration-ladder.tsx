import type { ladder } from '@/content/pages/home'

/**
 * The ladder (canvas `home-v3.html` station 4): the rungs a brand climbs from
 * appearing in an answer to producing commercial value, each with the question
 * it answers and, once CONTENT_VERIFICATION H10 is approved, how Hendricks
 * knows the answer.
 *
 * Hairline rows, never a table and never a card. It is a `ul` and not an `ol`:
 * the rungs are a sequence a reader climbs, but a brand does not pass them in
 * order the way it passes the phases of an engagement, and the third column
 * says plainly that two of them are measured somewhere else entirely.
 *
 * The inline marks carry evidence class by shape first: a filled dot for
 * observed, a dashed hollow ring for inferred, a filled square for measured, a
 * hollow square for tested. A rung draws them only when it also carries the
 * third column, because the mark is decorative exactly and only while the
 * class is written beside it in words (canvas.md section 2). While H10 is
 * pending no rung carries either. Nothing on this ladder is conveyed by colour
 * alone, and no rung carries a score.
 */

type Mark = 'observed' | 'inferred' | 'measured' | 'tested'

/** One 16 by 16 cell of the rung's mark strip. */
function RungMark({ kind, x }: { kind: Mark; x: number }) {
  switch (kind) {
    case 'observed':
      return <circle cx={x + 8} cy={8} r={5} fill="var(--ev-observed)" />
    case 'inferred':
      return (
        <circle
          cx={x + 8}
          cy={8}
          r={5}
          fill="none"
          stroke="var(--ev-inferred)"
          strokeWidth={1.5}
          strokeDasharray="2 2"
        />
      )
    case 'measured':
      return <rect x={x + 2.5} y={2.5} width={11} height={11} rx={1} fill="var(--ev-measured)" />
    case 'tested':
      return (
        <rect
          x={x + 2.5}
          y={2.5}
          width={11}
          height={11}
          rx={1}
          fill="none"
          stroke="var(--ev-tested)"
          strokeWidth={1.5}
        />
      )
  }
}

/** The rung's marks, laid out on a 14 px pitch as the canvas draws them. */
function MarkStrip({ marks }: { marks: readonly Mark[] }) {
  const width = marks.length * 14 + 2

  return (
    <svg
      width={width}
      height={16}
      viewBox={`0 0 ${width} 16`}
      aria-hidden="true"
      focusable="false"
    >
      {marks.map((kind, index) => (
        <RungMark key={kind} kind={kind} x={index * 14} />
      ))}
    </svg>
  )
}

export function ConsiderationLadder({ rungs }: { rungs: typeof ladder.rungs }) {
  return (
    <ul className="ladder">
      {rungs.map((rung) => (
        <li key={rung.name}>
          <span className="rung">
            {rung.marks && rung.knows ? <MarkStrip marks={rung.marks} /> : null}
            {rung.name}
          </span>
          <span className="qn">{rung.question}</span>
          {rung.knows ? <span className="kn">{rung.knows}</span> : null}
        </li>
      ))}
    </ul>
  )
}
