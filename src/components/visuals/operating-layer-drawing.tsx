import type { OperatingLayerParticipant } from '@/content/pages/for-brands'

/**
 * Figure 01 on /for-brands: three contributors, one operating layer.
 *
 * The brief for this figure is explicit that it must not imply Hendricks owns
 * every execution channel, so the three contributors sit side by side as peers
 * on one rail and Hendricks joins the shared layer rather than sitting above
 * the others. The four artifacts on the lower rail are what every contributor
 * works from.
 *
 * Geometry is verbatim from `07-hifi/for-brands.html`. The drawing is
 * `aria-hidden`: the same three participants are read from the ledger beneath
 * it, and the layer's name and sentence are read from the note under that.
 */
const ARTIFACTS = [
  'DEMAND MODEL',
  'SELECTION BASELINE',
  'INTERVENTION ROADMAP',
  'MEASUREMENT PLAN',
] as const

const ARTIFACT_X = [225, 475, 725, 975] as const
const PARTICIPANT_X = [200, 600, 1000] as const

export function OperatingLayerDrawing({
  participants,
  layerName,
}: {
  participants: readonly OperatingLayerParticipant[]
  layerName: string
}) {
  return (
    <svg
      viewBox="0 0 1200 280"
      width="100%"
      preserveAspectRatio="xMinYMin meet"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="var(--rule-strong)" strokeWidth="1.5">
        <path d="M200 62 L200 132 L600 132" />
        <path d="M600 62 L600 132" />
        <path d="M1000 62 L1000 132 L600 132" />
      </g>

      <g fill="var(--bg)" stroke="var(--ink)" strokeWidth="1.5">
        {PARTICIPANT_X.map((cx) => (
          <circle key={cx} cx={cx} cy="52" r="9" />
        ))}
      </g>

      <g fontSize="15" fill="var(--ink)" textAnchor="middle" style={{ fontFamily: 'var(--font-sans)' }}>
        {participants.map((participant, index) => (
          <text key={participant.name} x={PARTICIPANT_X[index]} y="32">
            {participant.name}
          </text>
        ))}
      </g>

      <circle cx="600" cy="132" r="6" fill="var(--signal-dot)" />
      <path d="M600 138 L600 168" stroke="var(--path)" strokeWidth="1.5" />
      <line x1="100" y1="182" x2="1100" y2="182" stroke="var(--path)" strokeWidth="1.5" />
      <line x1="100" y1="236" x2="1100" y2="236" stroke="var(--rule-strong)" strokeWidth="1" />

      <g stroke="var(--ev-measured)" strokeWidth="1">
        {ARTIFACT_X.map((x) => (
          <path key={x} d={`M${x} 182 L${x} 200`} />
        ))}
      </g>

      <g
        fontSize="12"
        letterSpacing="1"
        fill="var(--ev-measured)"
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {ARTIFACTS.map((artifact, index) => (
          <text key={artifact} x={ARTIFACT_X[index]} y="220">
            {artifact}
          </text>
        ))}
      </g>

      <text
        x="100"
        y="264"
        fontSize="12"
        letterSpacing="1"
        fill="var(--ink-2)"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {layerName.toUpperCase()}
      </text>
    </svg>
  )
}
