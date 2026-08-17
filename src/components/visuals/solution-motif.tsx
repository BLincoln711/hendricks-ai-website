/**
 * Per-solution visual motifs (docs/13 §7).
 *
 * Four distinct diagrams rather than four identical icons in circles — demand is
 * a query cluster, selection is shortlist nodes, presence is connected evidence
 * layers, impact is an exposure-to-revenue path.
 *
 * Purely decorative: every motif restates something already in the adjacent
 * heading and description.
 */
export type Motif = 'demand' | 'selection' | 'presence' | 'impact'

export function SolutionMotif({ motif }: { motif: Motif }) {
  const common = {
    viewBox: '0 0 200 96',
    className: 'h-24 w-full',
    'aria-hidden': true as const,
    focusable: 'false' as const,
  }

  if (motif === 'demand') {
    const nodes = [
      { cx: 34, cy: 48, r: 13 },
      { cx: 78, cy: 26, r: 8 },
      { cx: 86, cy: 66, r: 10 },
      { cx: 128, cy: 40, r: 6 },
      { cx: 136, cy: 74, r: 7 },
      { cx: 168, cy: 30, r: 5 },
    ]
    return (
      <svg {...common}>
        {nodes.slice(1).map((node, index) => (
          <line
            key={index}
            x1={nodes[0].cx}
            y1={nodes[0].cy}
            x2={node.cx}
            y2={node.cy}
            stroke="var(--color-border)"
            strokeWidth={1}
          />
        ))}
        {nodes.map((node, index) => (
          <circle
            key={index}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill={index === 0 ? 'var(--color-blue)' : 'color-mix(in srgb, var(--color-blue) 22%, white)'}
            stroke={index === 0 ? 'none' : 'var(--color-blue)'}
            strokeWidth={1}
          />
        ))}
      </svg>
    )
  }

  if (motif === 'selection') {
    const rows = [26, 48, 70]
    return (
      <svg {...common}>
        {rows.map((y, index) => (
          <g key={y}>
            <rect
              x={16}
              y={y - 9}
              width={104}
              height={18}
              rx={9}
              fill={index === 1 ? 'color-mix(in srgb, var(--color-blue) 14%, white)' : 'white'}
              stroke={index === 1 ? 'var(--color-blue)' : 'var(--color-border)'}
              strokeWidth={1}
            />
            <circle
              cx={30}
              cy={y}
              r={4}
              fill={index === 1 ? 'var(--color-blue)' : 'var(--color-border)'}
            />
            {index === 1 ? (
              <line x1={120} y1={y} x2={156} y2={y} stroke="var(--color-blue)" strokeWidth={2} />
            ) : null}
          </g>
        ))}
        <circle cx={168} cy={48} r={10} fill="var(--color-blue)" />
      </svg>
    )
  }

  if (motif === 'presence') {
    const layers = [22, 40, 58, 76]
    return (
      <svg {...common}>
        {layers.map((y, index) => (
          <g key={y}>
            <rect
              x={28 + index * 6}
              y={y - 7}
              width={144 - index * 12}
              height={14}
              rx={4}
              fill={index === 0 ? 'color-mix(in srgb, var(--color-cyan) 20%, white)' : 'white'}
              stroke={index === 0 ? 'var(--color-cyan)' : 'var(--color-border)'}
              strokeWidth={1}
            />
            {index < layers.length - 1 ? (
              <line
                x1={100}
                y1={y + 7}
                x2={100}
                y2={y + 11}
                stroke="var(--color-cyan)"
                strokeWidth={1.5}
              />
            ) : null}
          </g>
        ))}
      </svg>
    )
  }

  return (
    <svg {...common}>
      <polyline
        points="20,76 60,64 100,52 140,32 176,18"
        fill="none"
        stroke="var(--color-blue)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [20, 76],
        [60, 64],
        [100, 52],
        [140, 32],
      ].map(([cx, cy]) => (
        <circle key={`${cx}`} cx={cx} cy={cy} r={4} fill="white" stroke="var(--color-blue)" strokeWidth={2} />
      ))}
      <circle cx={176} cy={18} r={7} fill="var(--color-amber)" />
      <line
        x1={16}
        y1={86}
        x2={184}
        y2={86}
        stroke="var(--color-border)"
        strokeWidth={1}
      />
    </svg>
  )
}
