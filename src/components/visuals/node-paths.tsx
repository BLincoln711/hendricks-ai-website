/**
 * The two node paths on /how-it-works: the ten-stage journey and the seven-step
 * operating cycle.
 *
 * Both are drawn the same way and for the same reason. The SVG carries the
 * line, the nodes and the dashed return; the words sit above it in HTML, so
 * they take the page's own font and ink tokens and reflow rather than being
 * scaled with the drawing. Two viewports are drawn rather than one: horizontal
 * at reading widths and vertical below 900 px, where ten labels across a phone
 * are unreadable. The label layer is `aria-hidden` and the ordered list beside
 * it is what a screen reader reads.
 *
 * Geometry is verbatim from `07-hifi/how-it-works.html`.
 */

/** Desktop path: 720 wide, first and last node 36 from each edge. */
const PATH_INSET = 36
const PATH_WIDTH = 720
const PATH_BASELINE = 100

/** Desktop cycle: 714 wide, nodes every 102 units from x = 51. */
const CYCLE_STEP = 102
const CYCLE_FIRST = 51

/**
 * The vertical form of a node path. Nodes sit at the centre of `count` equal
 * bands so the HTML label grid, which is `repeat(count, 1fr)` over the same
 * box, lines up with them exactly at every width.
 */
function verticalNodeY(index: number, count: number, height: number) {
  return (height * (index + 0.5)) / count
}

function VerticalPath({ count, height }: { count: number; height: number }) {
  const first = verticalNodeY(0, count, height)
  const last = verticalNodeY(count - 1, count, height)

  return (
    <>
      <path d={`M20 ${first}V${last}`} stroke="var(--rule-strong)" strokeWidth="1.5" fill="none" />
      {Array.from({ length: count }, (_, index) => (
        <circle key={index} cx="20" cy={verticalNodeY(index, count, height)} r="5" fill="var(--ink)" />
      ))}
    </>
  )
}

function StackedLabels({ items }: { items: readonly string[] }) {
  return (
    <div
      className="dw-labels"
      aria-hidden="true"
      style={{
        gridTemplateColumns: 'minmax(0,1fr)',
        gridTemplateRows: `repeat(${items.length}, 1fr)`,
      }}
    >
      {items.map((item, index) => (
        <span key={item} className="inset" style={{ gridArea: `${index + 1} / 1` }}>
          {item}
        </span>
      ))}
    </div>
  )
}

/**
 * An ordered path: n nodes in order on one line.
 *
 * Labels alternate between two rows above the line, because ten labels on one
 * row collide at every width the desktop drawing is used at. The step is
 * computed from the node count so a seven-node chain and a ten-node journey
 * both fill the same box rather than one of them ending early.
 */
export function NodePathDrawing({ nodes }: { nodes: readonly string[] }) {
  const step = (PATH_WIDTH - PATH_INSET * 2) / (nodes.length - 1)
  const lastX = PATH_INSET + step * (nodes.length - 1)

  return (
    <>
      <div className="dw drawing-desktop">
        <svg
          viewBox="0 0 720 140"
          width="100%"
          preserveAspectRatio="xMinYMin meet"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d={`M${PATH_INSET} ${PATH_BASELINE}H${lastX}`}
            stroke="var(--rule-strong)"
            strokeWidth="1.5"
            fill="none"
          />
          {nodes.map((node, index) => {
            const x = PATH_INSET + step * index
            return (
              <g key={node}>
                <path
                  d={`M${x} ${index % 2 === 0 ? 26 : 52}V94`}
                  stroke="var(--guide)"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                  fill="none"
                />
                <circle cx={x} cy={PATH_BASELINE} r="5" fill="var(--ink)" />
              </g>
            )
          })}
        </svg>

        <div
          className="dw-labels"
          aria-hidden="true"
          style={{
            gridTemplateColumns: `repeat(${nodes.length}, 1fr)`,
            gridTemplateRows: '26fr 26fr 88fr',
          }}
        >
          {nodes.map((node, index) => (
            <span
              key={node}
              className="center"
              style={{ gridArea: `${(index % 2) + 1} / ${index + 1}` }}
            >
              {node}
            </span>
          ))}
        </div>
      </div>

      <div className="dw drawing-mobile">
        <svg
          viewBox="0 0 270 400"
          width="100%"
          preserveAspectRatio="xMinYMin meet"
          aria-hidden="true"
          focusable="false"
        >
          <VerticalPath count={nodes.length} height={400} />
        </svg>
        <StackedLabels items={nodes} />
      </div>
    </>
  )
}

/**
 * The operating cycle: seven steps on one line, with a dashed return from the
 * last step to the first. The return is what makes it a loop rather than an
 * audit, so it is drawn even though it carries no node of its own.
 */
export function OperatingCycleDrawing({ steps }: { steps: readonly string[] }) {
  const lastX = CYCLE_FIRST + CYCLE_STEP * (steps.length - 1)

  return (
    <>
      <div className="dw drawing-desktop">
        <svg
          viewBox="0 0 714 112"
          width="100%"
          preserveAspectRatio="xMinYMin meet"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d={`M${CYCLE_FIRST} 30H${lastX}`}
            stroke="var(--rule-strong)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d={`M${lastX + 6} 35V100H${CYCLE_FIRST}V35`}
            stroke="var(--guide)"
            strokeWidth="1"
            strokeDasharray="2 6"
            fill="none"
          />
          {steps.map((step, index) => (
            <circle
              key={step}
              cx={CYCLE_FIRST + CYCLE_STEP * index}
              cy="30"
              r="5"
              fill="var(--ink)"
            />
          ))}
        </svg>

        <div
          className="dw-labels"
          aria-hidden="true"
          style={{
            gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
            gridTemplateRows: '44fr 28fr 40fr',
          }}
        >
          {steps.map((step, index) => (
            <span key={step} className="center" style={{ gridArea: `2 / ${index + 1}` }}>
              {step}
            </span>
          ))}
        </div>
      </div>

      <div className="dw drawing-mobile">
        <svg
          viewBox="0 0 270 320"
          width="100%"
          preserveAspectRatio="xMinYMin meet"
          aria-hidden="true"
          focusable="false"
        >
          <VerticalPath count={steps.length} height={320} />
          <path
            d={`M20 ${verticalNodeY(steps.length - 1, steps.length, 320) + 8}V312H6V${verticalNodeY(0, steps.length, 320)}H14`}
            stroke="var(--guide)"
            strokeWidth="1"
            strokeDasharray="2 6"
            fill="none"
          />
        </svg>
        <StackedLabels items={steps} />
      </div>
    </>
  )
}
