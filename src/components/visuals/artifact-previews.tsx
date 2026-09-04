import type { ReactNode } from 'react'

/**
 * The eight artifact previews (canvas `home-v3.html` station 6, plates 04 to
 * 11).
 *
 * Each is a miniature of the instrument the artifact actually is, drawn on one
 * 160 by 88 grid so the row reads as one family and the captions share a
 * baseline. Every mark reads the evidence-class vocabulary of station 8: a
 * filled dot is observed, a dashed stroke and hollow ring are inferred, a tick
 * track and filled square are measured, a hollow square is tested, and the
 * amber cross is an evidence gap.
 *
 * Sample data only, and only ever relative: no dollar figure, no percentage,
 * no client, and no brand but Brand A to Brand D and Your Brand. The page
 * legend carries the locked caption "Illustrative interface. Not a client
 * result." once; this row does not repeat it.
 *
 * Each preview is an image with an accessible name that says what it draws, so
 * a reader who cannot see it learns the same thing the drawing shows rather
 * than the name of a file.
 */

export type ArtifactPreview =
  | 'demand-map'
  | 'intent-context'
  | 'selection-map'
  | 'competitor-matrix'
  | 'evidence-graph'
  | 'selection-gap'
  | 'roadmap'
  | 'impact-ledger'

const drawings: Record<ArtifactPreview, ReactNode> = {
  /* Customer decisions as rows, relative value as bar length. */
  'demand-map': (
    <>
      <path d="M6 10V80" stroke="var(--guide)" strokeWidth={1} strokeDasharray="2 6" fill="none" />
      <circle cx={14} cy={20} r={3.5} fill="var(--ev-observed)" />
      <path d="M20 20H132" stroke="var(--ev-muted)" strokeWidth={2} fill="none" />
      <circle cx={14} cy={40} r={3.5} fill="var(--ev-observed)" />
      <path d="M20 40H98" stroke="var(--ev-muted)" strokeWidth={2} fill="none" />
      <circle cx={14} cy={60} r={3.5} fill="var(--ev-observed)" />
      <path d="M20 60H70" stroke="var(--ev-muted)" strokeWidth={2} fill="none" />
      <circle
        cx={14}
        cy={78}
        r={3.5}
        fill="none"
        stroke="var(--ev-inferred)"
        strokeWidth={1.5}
        strokeDasharray="2 2"
      />
      <path
        d="M20 78H46"
        stroke="var(--ev-inferred)"
        strokeWidth={1.5}
        strokeDasharray="4 4"
        fill="none"
      />
    </>
  ),

  /* Three situation cards for one decision, four fields each. */
  'intent-context': (
    <>
      <path d="M6 8H154" stroke="var(--rule-strong)" strokeWidth={1} fill="none" />
      <path
        d="M6 8V14M55 8V14M104 8V14M153 8V14"
        stroke="var(--rule-strong)"
        strokeWidth={1}
        fill="none"
      />
      {[6, 55, 104].map((x) => (
        <rect
          key={x}
          x={x}
          y={24}
          width={42}
          height={54}
          stroke="var(--ev-muted)"
          strokeWidth={1}
          fill="none"
        />
      ))}
      {[12, 61, 110].map((x) => (
        <path
          key={x}
          d={`M${x} 36H${x + 28}M${x} 48H${x + 24}M${x} 60H${x + 30}M${x} 70H${x + 18}`}
          stroke="var(--ev-inferred)"
          strokeWidth={1.5}
          fill="none"
        />
      ))}
    </>
  ),

  /* The hero instrument at thumbnail scale: five brands, one context. */
  'selection-map': (
    <>
      <path d="M6 10H154" stroke="var(--rule-strong)" strokeWidth={1} fill="none" />
      <path
        d="M22 10V14M54 10V14M86 10V14M118 10V14M150 10V14"
        stroke="var(--rule-strong)"
        strokeWidth={1}
        fill="none"
      />
      <path d="M22 28H150" stroke="var(--ev-muted)" strokeWidth={1.25} fill="none" />
      <path d="M22 44H118" stroke="var(--path)" strokeWidth={2} fill="none" />
      <path d="M22 60H86" stroke="var(--ev-muted)" strokeWidth={1.25} fill="none" />
      <path d="M22 76H54" stroke="var(--ev-muted)" strokeWidth={1.25} fill="none" />
      {[22, 54, 86].map((x) => (
        <circle key={`r1-${x}`} cx={x} cy={28} r={3} fill="var(--ev-observed)" />
      ))}
      <rect x={112} y={20} width={12} height={16} rx={2} fill="none" stroke="var(--ink)" strokeWidth={1} />
      <circle cx={118} cy={28} r={3} fill="var(--ev-observed)" />
      <circle cx={150} cy={28} r={5} fill="var(--signal-dot)" />
      <circle cx={150} cy={28} r={7.5} fill="none" stroke="var(--ink)" strokeWidth={1.25} />
      {[22, 54, 86].map((x) => (
        <circle key={`r2-${x}`} cx={x} cy={44} r={3} fill="var(--ev-observed)" />
      ))}
      <path
        d="M92 41L98 47M98 41L92 47"
        stroke="var(--ev-gap)"
        strokeWidth={1.75}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={118} cy={44} r={3.5} fill="var(--bg)" stroke="var(--ev-observed)" strokeWidth={1.25} />
      <path d="M115 47L121 41" stroke="var(--ev-muted)" strokeWidth={1.25} fill="none" />
      <circle cx={22} cy={60} r={3} fill="var(--ev-observed)" />
      <circle cx={54} cy={60} r={3.5} fill="var(--bg)" stroke="var(--ev-observed)" strokeWidth={1.5} />
      <circle cx={86} cy={60} r={3.5} fill="var(--bg)" stroke="var(--ev-observed)" strokeWidth={1.25} />
      <path d="M83 63L89 57" stroke="var(--ev-muted)" strokeWidth={1.25} fill="none" />
      <circle cx={22} cy={76} r={3} fill="var(--ev-observed)" />
      <circle cx={54} cy={76} r={3.5} fill="var(--bg)" stroke="var(--ev-observed)" strokeWidth={1.25} />
      <path d="M51 79L57 73" stroke="var(--ev-muted)" strokeWidth={1.25} fill="none" />
    </>
  ),

  /* Decisions as rows, sample brands as columns, one mark per cell. */
  'competitor-matrix': (
    <>
      <path
        d="M10 10H150M10 30H150M10 50H150M10 70H150M10 88H150"
        stroke="var(--rule-strong)"
        strokeWidth={1}
        opacity={0.7}
        fill="none"
      />
      <path
        d="M10 10V88M38 10V88M66 10V88M94 10V88M122 10V88M150 10V88"
        stroke="var(--rule-strong)"
        strokeWidth={1}
        opacity={0.7}
        fill="none"
      />
      <circle cx={24} cy={20} r={4} fill="var(--ev-observed)" />
      <circle cx={52} cy={20} r={4} fill="none" stroke="var(--ev-observed)" strokeWidth={1.25} />
      <path d="M52 16a4 4 0 0 0 0 8z" fill="var(--ev-observed)" />
      <rect x={102} y={12} width={12} height={16} rx={2} fill="none" stroke="var(--ink)" strokeWidth={1} />
      <circle cx={108} cy={20} r={4} fill="var(--ev-observed)" />
      <circle cx={136} cy={40} r={4} fill="var(--ev-observed)" />
      <circle cx={24} cy={40} r={4} fill="none" stroke="var(--ev-observed)" strokeWidth={1.25} />
      <path d="M24 36a4 4 0 0 0 0 8z" fill="var(--ev-observed)" />
      <circle cx={80} cy={40} r={4} fill="var(--ev-observed)" />
      <circle cx={52} cy={60} r={4} fill="var(--ev-observed)" />
      <rect x={130} y={52} width={12} height={16} rx={2} fill="none" stroke="var(--ink)" strokeWidth={1} />
      <circle cx={136} cy={60} r={4} fill="var(--ev-observed)" />
      <circle cx={80} cy={79} r={4} fill="var(--ev-observed)" />
      <circle cx={108} cy={79} r={4} fill="none" stroke="var(--ev-observed)" strokeWidth={1.25} />
      <path d="M108 75a4 4 0 0 0 0 8z" fill="var(--ev-observed)" />
    </>
  ),

  /* Source-type nodes linked to claim nodes; unsupported claims run inferred. */
  'evidence-graph': (
    <>
      <circle cx={16} cy={18} r={4} fill="var(--ev-observed)" />
      <circle cx={16} cy={44} r={4} fill="var(--ev-observed)" />
      <circle
        cx={16}
        cy={70}
        r={4}
        fill="none"
        stroke="var(--ev-inferred)"
        strokeWidth={1.5}
        strokeDasharray="2 2"
      />
      <path d="M22 18H130" stroke="var(--ev-muted)" strokeWidth={1.5} fill="none" />
      <path d="M22 44C70 44 90 18 130 18" stroke="var(--ev-muted)" strokeWidth={1.5} fill="none" />
      <path d="M22 44C70 44 90 48 130 48" stroke="var(--ev-muted)" strokeWidth={1.5} fill="none" />
      <path
        d="M22 70C70 70 90 48 128 48"
        stroke="var(--ev-inferred)"
        strokeWidth={1.5}
        strokeDasharray="4 4"
        fill="none"
      />
      <circle cx={134} cy={18} r={4} fill="var(--ev-observed)" />
      <circle cx={134} cy={48} r={4} fill="var(--ev-observed)" />
      <circle
        cx={134}
        cy={76}
        r={4}
        fill="none"
        stroke="var(--ev-inferred)"
        strokeWidth={1.5}
        strokeDasharray="2 2"
      />
      <path
        d="M139 71L149 81M149 71L139 81"
        stroke="var(--ev-gap)"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),

  /* Your Brand's observed position against a benchmark band, relative scale. */
  'selection-gap': (
    <>
      <path d="M6 68H154" stroke="var(--rule-strong)" strokeWidth={1} fill="none" />
      <path
        d="M6 68V74M43 68V72M80 68V74M117 68V72M154 68V74"
        stroke="var(--rule-strong)"
        strokeWidth={1}
        fill="none"
      />
      <rect
        x={104}
        y={20}
        width={46}
        height={40}
        rx={2}
        fill="none"
        stroke="var(--rule-strong)"
        strokeWidth={1.25}
      />
      <circle cx={46} cy={40} r={5} fill="var(--ev-observed)" />
      <path
        d="M52 40H102"
        stroke="var(--ev-inferred)"
        strokeWidth={1.5}
        strokeDasharray="4 4"
        fill="none"
      />
      <path
        d="M46 46V60M127 20V60"
        stroke="var(--guide)"
        strokeWidth={1}
        strokeDasharray="2 4"
        fill="none"
      />
    </>
  ),

  /* Ordered rows with condition, owner and measurement fields. */
  roadmap: (
    <>
      <path d="M8 10V82" stroke="var(--rule-strong)" strokeWidth={1} fill="none" />
      <path
        d="M8 16H14M8 40H14M8 56H14M8 72H14"
        stroke="var(--rule-strong)"
        strokeWidth={1}
        fill="none"
      />
      <path d="M22 16H140" stroke="var(--ev-observed)" strokeWidth={2} fill="none" />
      <path d="M30 26H96M30 34H74" stroke="var(--ev-inferred)" strokeWidth={1.5} fill="none" />
      <path d="M116 30H150" stroke="var(--ev-measured)" strokeWidth={2} fill="none" />
      <path
        d="M120 31V35M128 31V35M136 31V35M144 31V35"
        stroke="var(--ev-measured)"
        strokeWidth={1.5}
        fill="none"
      />
      <path d="M22 40H110" stroke="var(--ev-muted)" strokeWidth={1.5} fill="none" />
      <rect
        x={118}
        y={34}
        width={32}
        height={12}
        rx={2}
        fill="none"
        stroke="var(--ev-tested)"
        strokeWidth={1.25}
      />
      <path d="M122 40H146" stroke="var(--ev-tested)" strokeWidth={1.5} fill="none" />
      <path d="M22 56H88M22 72H124" stroke="var(--ev-muted)" strokeWidth={1.5} fill="none" />
    </>
  ),

  /* Ledger rows: a change, a period, a source and an evidence-class label. */
  'impact-ledger': (
    <>
      <path
        d="M6 12H154M6 34H154M6 56H154M6 78H154"
        stroke="var(--rule-strong)"
        strokeWidth={1}
        fill="none"
      />
      <path d="M14 24H86" stroke="var(--ev-measured)" strokeWidth={2} fill="none" />
      <path
        d="M18 25V29M26 25V29M34 25V29M42 25V29M50 25V29M58 25V29M66 25V29M74 25V29M82 25V29"
        stroke="var(--ev-measured)"
        strokeWidth={1.5}
        fill="none"
      />
      <rect x={98} y={18} width={14} height={14} rx={1} fill="var(--ev-measured)" />
      <rect
        x={12}
        y={40}
        width={80}
        height={14}
        rx={2}
        fill="none"
        stroke="var(--ev-tested)"
        strokeWidth={1.25}
      />
      <path d="M18 47H86" stroke="var(--ev-tested)" strokeWidth={2} fill="none" />
      <rect
        x={98}
        y={40}
        width={14}
        height={14}
        rx={1}
        fill="none"
        stroke="var(--ev-tested)"
        strokeWidth={1.5}
      />
      <path
        d="M14 68H86"
        stroke="var(--ev-inferred)"
        strokeWidth={1.5}
        strokeDasharray="4 4"
        fill="none"
      />
      <circle
        cx={105}
        cy={68}
        r={5}
        fill="none"
        stroke="var(--ev-inferred)"
        strokeWidth={1.5}
        strokeDasharray="2 2"
      />
      <path
        d="M128 24H150M128 46H150M128 68H150"
        stroke="var(--ev-muted)"
        strokeWidth={1.5}
        fill="none"
      />
    </>
  ),
}

export function ArtifactPreviewDrawing({ preview, alt }: { preview: ArtifactPreview; alt: string }) {
  return (
    <svg className="mini" viewBox="0 0 160 88" role="img" aria-label={alt} focusable="false">
      {drawings[preview]}
    </svg>
  )
}
