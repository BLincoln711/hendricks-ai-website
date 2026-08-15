"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  EXTRACT_FIELDS,
  type ProbeResult,
  type SurfaceId,
  type SurfaceState,
} from "@/lib/probe/types";

const FIELD_LABELS: Record<(typeof EXTRACT_FIELDS)[number], string> = {
  title: "Title",
  h1: "H1",
  entity: "Entity",
  schema: "Schema",
  evidence: "Evidence",
  date: "Date",
};

const LIVE_ORDER: SurfaceId[] = ["classic_google", "ai_overviews", "chatgpt"];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Cell({
  state,
  live,
  delay,
}: {
  state: SurfaceState;
  live: boolean;
  delay: number;
}) {
  if (state === "unmeasured") {
    return <span className="surface-cell is-empty" aria-label="unmeasured" />;
  }

  const classes = [
    "surface-cell",
    "is-observed",
    state === "cited" ? "is-cited" : "",
    live ? "is-live" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} style={live ? { animationDelay: `${delay}ms` } : undefined}>
      {state}
    </span>
  );
}

export function ProbeResults({
  result,
  onEnter,
}: {
  result: ProbeResult;
  onEnter: () => void;
}) {
  const [ctaReady, setCtaReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCtaReady(true);
      return;
    }

    const liveCount = result.surfaces.filter(
      (row) => LIVE_ORDER.includes(row.id) && row.state !== "unmeasured",
    ).length;
    const boardMs = 620;
    const settleMs = liveCount > 0 ? liveCount * 70 + 180 : 0;
    const stillMs = 240;
    const timer = window.setTimeout(() => setCtaReady(true), boardMs + settleMs + stillMs);
    return () => window.clearTimeout(timer);
  }, [result]);

  let liveIndex = 0;

  return (
    <section className="probe" aria-live="polite">
      <div className="probe-stage">
        <dl className="extract-strip extract-strip-fold">
          {EXTRACT_FIELDS.map((field) => (
            <div key={field} className="extract-chip">
              <dt>{FIELD_LABELS[field]}</dt>
              <dd>{result.extractability[field]}</dd>
            </div>
          ))}
        </dl>

        <div className="instrument">
          <table className="surface-board">
            <tbody>
              {result.surfaces.map((row) => {
                const live =
                  LIVE_ORDER.includes(row.id) && row.state !== "unmeasured";
                const delay = live ? 620 + liveIndex * 70 : 0;
                if (live) liveIndex += 1;
                return (
                  <tr key={row.id}>
                    <th scope="row">{row.label}</th>
                    <td>
                      <Cell state={row.state} live={live} delay={delay} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="probe-wall">
          This is a public probe of one URL. It is not the retrieval graph.
        </p>

        <div className={`probe-cta-stack${ctaReady ? " is-arrived" : ""}`}>
          <p className="probe-pull">The site is on the other side of this reading.</p>
          <button type="button" className="probe-enter" onClick={onEnter}>
            Enter Hendricks Website
          </button>
          <p className="probe-secondary">
            <Link href="/briefing">Book a briefing</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/diagnostic">Retrieval Graph Diagnostic</Link>
          </p>
        </div>
      </div>

      <div className="probe-after">
        <p>What we could see from this host, on these probes, today.</p>

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

        <p className="probe-passage">
          A public probe of one URL is not the retrieval graph. The Retrieval Graph
          Diagnostic is a three-week instrument of how the firm is retrieved, cited, and
          chosen across Google, ChatGPT, Perplexity, and AI Overviews. You own the graph.
          Then you decide whether we install the system.
        </p>
      </div>
    </section>
  );
}
