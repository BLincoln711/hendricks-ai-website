import type { evidence } from '@/content/pages/home'

/**
 * The four evidence classes (canvas `home-v3.html` station 8).
 *
 * The site's line language, stated once so every other drawing can be read
 * against it: observed is a solid stroke ending in a filled dot, inferred is a
 * dashed stroke ending in a hollow dashed ring, measured is a solid rule with a
 * tick track ending in a filled square, tested is a double rule ending in a
 * hollow square.
 *
 * Class is carried by stroke style and terminal shape before it is carried by
 * hue, and the name is written under every mark, so the row survives a forced
 * colour mode and a greyscale print. The specimens are decorative; the names
 * and descriptions beside them are the content.
 */

const specimens = {
  observed: (
    <>
      <path d="M0 8H50" stroke="var(--ev-observed)" strokeWidth={2} fill="none" />
      <circle cx={50} cy={8} r={5} fill="var(--ev-observed)" />
    </>
  ),
  inferred: (
    <>
      <path
        d="M0 8H44"
        stroke="var(--ev-inferred)"
        strokeWidth={2}
        strokeDasharray="4 4"
        fill="none"
      />
      <circle
        cx={50}
        cy={8}
        r={5}
        fill="none"
        stroke="var(--ev-inferred)"
        strokeWidth={1.5}
        strokeDasharray="2 2"
      />
    </>
  ),
  measured: (
    <>
      <path d="M0 6H44" stroke="var(--ev-measured)" strokeWidth={2} fill="none" />
      <path
        d="M4 7V11M12 7V11M20 7V11M28 7V11M36 7V11"
        stroke="var(--ev-measured)"
        strokeWidth={1.5}
        fill="none"
      />
      <rect x={44} y={0} width={12} height={12} rx={1} fill="var(--ev-measured)" />
    </>
  ),
  tested: (
    <>
      <rect
        x={0}
        y={2}
        width={42}
        height={12}
        rx={2}
        fill="none"
        stroke="var(--ev-tested)"
        strokeWidth={1.5}
      />
      <path d="M5 8H37" stroke="var(--ev-tested)" strokeWidth={2} fill="none" />
      <rect
        x={44}
        y={2}
        width={12}
        height={12}
        rx={1}
        fill="none"
        stroke="var(--ev-tested)"
        strokeWidth={1.5}
      />
    </>
  ),
} as const

export function EvidenceClasses({
  classes,
  ariaLabel,
}: {
  classes: typeof evidence.classes
  ariaLabel: string
}) {
  return (
    <div className="classrow" role="group" aria-label={ariaLabel}>
      {classes.map((item) => (
        <div key={item.kind}>
          <svg viewBox="0 0 56 16" aria-hidden="true" focusable="false">
            {specimens[item.kind]}
          </svg>
          <p className="fig-title">{item.name}</p>
          <p className="fig-note">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
