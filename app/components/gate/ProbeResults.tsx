import Link from "next/link";
import { EXTRACT_FIELDS, type ProbeResult, type SurfaceState } from "@/lib/probe/types";

const FIELD_LABELS: Record<(typeof EXTRACT_FIELDS)[number], string> = {
  title: "Title",
  h1: "H1",
  entity: "Entity",
  schema: "Schema",
  evidence: "Evidence",
  date: "Date",
};

function Cell({ state }: { state: SurfaceState }) {
  if (state === "unmeasured") {
    return <span className="surface-cell is-empty" aria-label="unmeasured" />;
  }
  return <span className="surface-cell is-observed">{state}</span>;
}

export function ProbeResults({
  result,
  onEnter,
}: {
  result: ProbeResult;
  onEnter: () => void;
}) {
  return (
    <section className="probe" aria-live="polite">
      <div className="probe-block">
        <h2>Extractability</h2>
        <dl className="extract-list">
          {EXTRACT_FIELDS.map((field) => (
            <div key={field} className="extract-row">
              <dt>{FIELD_LABELS[field]}</dt>
              <dd className="is-observed">{result.extractability[field]}</dd>
            </div>
          ))}
        </dl>
      </div>

      {result.asks.length > 0 ? (
        <div className="probe-block">
          <h2>From your page, not from demand</h2>
          <ol className="ask-list">
            {result.asks.map((ask) => (
              <li key={ask}>{ask}</li>
            ))}
          </ol>
        </div>
      ) : null}

      <div className="probe-block">
        <h2>Surfaces</h2>
        <table className="surface-board">
          <tbody>
            {result.surfaces.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.label}</th>
                <td>
                  <Cell state={row.state} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="probe-quiet">Chosen is unmeasured. Paid is unmeasured.</p>
      </div>

      <div className="probe-copy">
        <p>What we could see from this host, on these probes, today.</p>
        <p>This is a public probe of one URL. It is not the retrieval graph.</p>
        <p>
          A public probe of one URL is not the retrieval graph. The Retrieval Graph
          Diagnostic is a three-week instrument of how the firm is retrieved, cited, and
          chosen across Google, ChatGPT, Perplexity, and AI Overviews. You own the graph.
          Then you decide whether we install the system.
        </p>
      </div>

      <div className="probe-ctas">
        <Link href="/briefing">Book a briefing</Link>
        <Link href="/diagnostic">Retrieval Graph Diagnostic</Link>
        <button type="button" onClick={onEnter}>
          Enter Hendricks
        </button>
      </div>
    </section>
  );
}
