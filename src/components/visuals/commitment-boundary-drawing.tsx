/**
 * Figure 01 on /for-agencies: the commitment boundary.
 *
 * Two nodes on the left, joined into one reading; a dashed amber line; three
 * crossed marks on the right. It is structure, not evidence: it restates the
 * boundary the direct answer and the partner commitments both state, and shows
 * no result of any kind.
 *
 * The drawing is `aria-hidden` and carries no words of its own beyond the two
 * column labels: the two lists beneath it are the readable form, and they carry
 * every item the drawing marks.
 *
 * Geometry is verbatim from `07-hifi/for-agencies.html`.
 */
const CROSS_Y = [110, 190, 266] as const

export function CommitmentBoundaryDrawing({
  canLabel,
  cannotLabel,
  readingLabel,
}: {
  canLabel: string
  cannotLabel: string
  readingLabel: string
}) {
  return (
    <svg
      viewBox="0 0 1200 330"
      width="100%"
      preserveAspectRatio="xMinYMin meet"
      aria-hidden="true"
      focusable="false"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <text x="60" y="26" fontSize="12" letterSpacing="1" fill="var(--ink-2)">
        {canLabel.toUpperCase()}
      </text>
      <text x="736" y="26" fontSize="12" letterSpacing="1" fill="var(--ev-gap)">
        {cannotLabel.toUpperCase()}
      </text>

      <line x1="60" y1="40" x2="1140" y2="40" stroke="var(--rule-2)" strokeWidth="1" />
      <line
        x1="700"
        y1="52"
        x2="700"
        y2="316"
        stroke="var(--ev-gap)"
        strokeWidth="1.5"
        strokeDasharray="6 7"
      />

      <g fill="none" stroke="var(--path)" strokeWidth="1.5">
        <path d="M108 120 L470 120" />
        <path d="M108 200 L470 200" />
        <path d="M470 120 L548 160" />
        <path d="M470 200 L548 160" />
        <path d="M564 160 L688 160" />
      </g>

      <g fill="var(--bg)" stroke="var(--ink)" strokeWidth="1.5">
        <circle cx="100" cy="120" r="8" />
        <circle cx="100" cy="200" r="8" />
      </g>

      <circle cx="556" cy="160" r="8" fill="var(--signal-dot)" />
      <text x="580" y="146" fontSize="12" letterSpacing="1" fill="var(--ev-measured)">
        {readingLabel.toUpperCase()}
      </text>

      <g stroke="var(--ev-gap)" strokeWidth="1.5">
        {CROSS_Y.map((y) => (
          <g key={y}>
            <path d={`M736 ${y} L756 ${y + 20}`} />
            <path d={`M756 ${y} L736 ${y + 20}`} />
          </g>
        ))}
      </g>
    </svg>
  )
}
