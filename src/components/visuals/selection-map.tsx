import { cn } from '@/lib/utils/cn'

/**
 * The Selection Map (docs/04 §12, docs/13 §5).
 *
 * Shows a customer need moving through Demand → Context → Discovery → Evidence →
 * Consideration → Impact, with five candidate brands narrowing to a two-brand
 * shortlist.
 *
 * Accessibility model: the SVG and the mobile stack are both decorative
 * (aria-hidden) and a single structured summary carries the meaning for
 * assistive technology. Exposing every path and node would produce noise, and
 * docs/13 §5 explicitly warns against it.
 *
 * There is no entry animation. The diagram is the primary explanation of the
 * category, so it renders in its final state for every visitor — which also
 * makes the reduced-motion state and the default state identical.
 */

const STAGES = ['Demand', 'Context', 'Discovery', 'Evidence', 'Consideration', 'Impact'] as const

const STAGE_X = [72, 232, 392, 566, 738, 934] as const

type Candidate = {
  label: string
  y: number
  /** Stage index where the candidate stops, or null if it reaches the shortlist. */
  eliminatedAt: number | null
  highlighted?: boolean
}

const CANDIDATES: Candidate[] = [
  { label: 'Brand A', y: 168, eliminatedAt: 3 },
  { label: 'Brand B', y: 212, eliminatedAt: 3 },
  { label: 'Your Brand', y: 256, eliminatedAt: null, highlighted: true },
  { label: 'Brand C', y: 300, eliminatedAt: null },
  { label: 'Brand D', y: 344, eliminatedAt: 3 },
]

const NEED_Y = 104
const FAN_X = STAGE_X[2]
const SHORTLIST_X = STAGE_X[4]

export function SelectionMap({ className }: { className?: string }) {
  const survivors = CANDIDATES.filter((candidate) => candidate.eliminatedAt === null)

  return (
    <figure className={cn('flex flex-col gap-4', className)}>
      <div className="rounded-[var(--radius-panel)] border border-[color-mix(in_srgb,var(--color-field)_18%,transparent)] bg-[color-mix(in_srgb,var(--color-navy-2)_70%,transparent)] p-4 sm:p-6">
        {/* Desktop and tablet: horizontal flow */}
        <svg
          viewBox="0 0 1000 400"
          className="hidden h-auto w-full sm:block"
          aria-hidden="true"
          focusable="false"
        >
          {/* Stage guides */}
          {STAGES.map((stage, index) => (
            <g key={stage}>
              <line
                x1={STAGE_X[index]}
                y1={54}
                x2={STAGE_X[index]}
                y2={378}
                stroke="currentColor"
                className="text-[color-mix(in_srgb,var(--color-field)_12%,transparent)]"
                strokeWidth={1}
                strokeDasharray="3 6"
              />
              <text
                x={STAGE_X[index]}
                y={34}
                textAnchor="middle"
                className="fill-[color-mix(in_srgb,var(--color-field)_62%,transparent)] text-[19px] tracking-[0.06em] uppercase"
                style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
              >
                {stage}
              </text>
            </g>
          ))}

          {/* Customer need travelling through demand and context into discovery */}
          <line
            x1={30}
            y1={NEED_Y}
            x2={FAN_X}
            y2={NEED_Y}
            stroke="var(--color-cyan)"
            strokeWidth={2}
          />
          <circle cx={STAGE_X[0]} cy={NEED_Y} r={6} fill="var(--color-cyan)" />
          <circle cx={STAGE_X[1]} cy={NEED_Y} r={6} fill="var(--color-cyan)" />
          <text
            x={30}
            y={NEED_Y - 20}
            className="fill-[var(--color-cyan)] text-[22px]"
            style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
          >
            Customer need
          </text>

          {/* Fan-out from discovery into candidate set */}
          {CANDIDATES.map((candidate) => (
            <path
              key={`fan-${candidate.label}`}
              d={`M ${FAN_X} ${NEED_Y} C ${FAN_X + 40} ${NEED_Y}, ${FAN_X + 10} ${candidate.y}, ${FAN_X + 56} ${candidate.y}`}
              fill="none"
              stroke="currentColor"
              className="text-[color-mix(in_srgb,var(--color-field)_28%,transparent)]"
              strokeWidth={1.5}
            />
          ))}
          <circle cx={FAN_X} cy={NEED_Y} r={7} fill="var(--color-cyan)" />

          {/* Candidate tracks */}
          {CANDIDATES.map((candidate) => {
            const endX =
              candidate.eliminatedAt === null ? SHORTLIST_X - 44 : STAGE_X[candidate.eliminatedAt]
            const stroke = candidate.highlighted
              ? 'var(--color-blue)'
              : candidate.eliminatedAt === null
                ? 'color-mix(in srgb, var(--color-field) 55%, transparent)'
                : 'color-mix(in srgb, var(--color-field) 28%, transparent)'

            return (
              <g key={candidate.label}>
                <line
                  x1={FAN_X + 56}
                  y1={candidate.y}
                  x2={endX}
                  y2={candidate.y}
                  stroke={stroke}
                  strokeWidth={candidate.highlighted ? 3 : 1.5}
                />
                <text
                  x={FAN_X + 56}
                  y={candidate.y - 14}
                  className={cn(
                    'text-[20px]',
                    candidate.highlighted
                      ? 'fill-[var(--color-field)]'
                      : 'fill-[color-mix(in_srgb,var(--color-field)_52%,transparent)]',
                  )}
                  style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
                >
                  {candidate.label}
                </text>

                {candidate.eliminatedAt !== null ? (
                  <g>
                    <line
                      x1={endX - 7}
                      y1={candidate.y - 7}
                      x2={endX + 7}
                      y2={candidate.y + 7}
                      stroke="var(--color-amber)"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                    <line
                      x1={endX + 7}
                      y1={candidate.y - 7}
                      x2={endX - 7}
                      y2={candidate.y + 7}
                      stroke="var(--color-amber)"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </g>
                ) : null}
              </g>
            )
          })}

          {/* Evidence gate annotation */}
          <text
            x={STAGE_X[3]}
            y={372}
            textAnchor="middle"
            className="fill-[var(--color-amber)] text-[19px]"
            style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
          >
            Evidence gaps remove candidates
          </text>

          {/* Convergence into the shortlist */}
          {survivors.map((candidate) => (
            <path
              key={`converge-${candidate.label}`}
              d={`M ${SHORTLIST_X - 44} ${candidate.y} C ${SHORTLIST_X - 20} ${candidate.y}, ${SHORTLIST_X - 30} ${256}, ${SHORTLIST_X - 6} ${256}`}
              fill="none"
              stroke={
                candidate.highlighted
                  ? 'var(--color-blue)'
                  : 'color-mix(in srgb, var(--color-field) 55%, transparent)'
              }
              strokeWidth={candidate.highlighted ? 3 : 1.5}
            />
          ))}

          <rect
            x={SHORTLIST_X - 6}
            y={228}
            width={108}
            height={56}
            rx={12}
            fill="color-mix(in srgb, var(--color-blue) 18%, transparent)"
            stroke="var(--color-blue)"
            strokeWidth={1.5}
          />
          <text
            x={SHORTLIST_X + 48}
            y={252}
            textAnchor="middle"
            className="fill-[var(--color-field)] text-[20px] font-medium"
            style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
          >
            Shortlist
          </text>
          <circle cx={SHORTLIST_X + 34} cy={268} r={5} fill="var(--color-blue)" />
          <circle
            cx={SHORTLIST_X + 62}
            cy={268}
            r={5}
            fill="color-mix(in srgb, var(--color-field) 55%, transparent)"
          />

          {/* Shortlist to impact */}
          <line
            x1={SHORTLIST_X + 102}
            y1={256}
            x2={STAGE_X[5] - 14}
            y2={256}
            stroke="var(--color-blue)"
            strokeWidth={3}
          />
          <circle cx={STAGE_X[5]} cy={256} r={10} fill="var(--color-blue)" />
          <text
            x={STAGE_X[5]}
            y={298}
            textAnchor="middle"
            className="fill-[var(--color-field)] text-[20px]"
            style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
          >
            Pipeline
          </text>
        </svg>

        {/* Mobile: vertical stack of the same stages */}
        <ol className="flex flex-col gap-0 sm:hidden" aria-hidden="true">
          {[
            { stage: 'Demand', detail: 'A customer need enters the market.' },
            { stage: 'Context', detail: 'Cohort, journey, platform, and timing reshape the need.' },
            { stage: 'Discovery', detail: 'Five candidate brands become visible.' },
            { stage: 'Evidence', detail: 'Three are removed where evidence is missing.' },
            { stage: 'Consideration', detail: 'Two brands reach the shortlist.' },
            { stage: 'Impact', detail: 'The selected brand produces pipeline.' },
          ].map((item, index, array) => (
            <li key={item.stage} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'mt-1.5 size-2.5 shrink-0 rounded-full',
                    index === array.length - 1 ? 'bg-[var(--color-blue)]' : 'bg-[var(--color-cyan)]',
                  )}
                />
                {index < array.length - 1 ? (
                  <span className="my-1 w-px flex-1 bg-[color-mix(in_srgb,var(--color-field)_22%,transparent)]" />
                ) : null}
              </div>
              <div className="pb-5">
                <p className="text-eyebrow text-[color-mix(in_srgb,var(--color-field)_62%,transparent)]">
                  {item.stage}
                </p>
                <p className="mt-1 text-[0.9375rem] leading-snug text-[color-mix(in_srgb,var(--color-field)_86%,transparent)]">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* The single accessible equivalent for both renderings. */}
        <p className="sr-only">
          An illustrative diagram showing a customer need being interpreted through context and
          evidence, several brands being evaluated, a smaller shortlist emerging, and the outcome
          being connected to business impact. The need passes through six stages: Demand, Context,
          Discovery, Evidence, Consideration, and Impact. Five candidate brands enter at Discovery.
          Three are removed at the Evidence stage where supporting evidence is missing. Two brands,
          including Your Brand, reach the shortlist at Consideration, and the selected brand
          connects to measurable pipeline at Impact.
        </p>
      </div>

      <figcaption className="text-[0.8125rem] text-[color-mix(in_srgb,var(--color-field)_58%,transparent)]">
        Illustrative interface. Not a client result.
      </figcaption>
    </figure>
  )
}
