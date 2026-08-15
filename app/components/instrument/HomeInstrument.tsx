"use client";

import { useEffect, useRef, useState } from "react";
import { POSITIONING } from "@/lib/site";
import { type StateId } from "./model";
import { clearScan, pointScan, prefersReducedMotion } from "./scan";

const TOKEN = /(retrieved|cited|chosen)/g;
const CHOOSER_QUERY = "what should we hire for mid-market tax?";
const CHOOSERS = ["GOOGLE", "CHATGPT", "PERPLEXITY", "CLAUDE"] as const;

function LeadTokens({
  active,
  ready,
  onActive,
}: {
  active: StateId | null;
  ready: boolean;
  onActive: (state: StateId | null) => void;
}) {
  const parts = POSITIONING.split(TOKEN);

  return (
    <h1 className="lead-spec">
      {parts.map((part, index) => {
        if (part === "retrieved" || part === "cited" || part === "chosen") {
          return (
            <button
              key={`${part}-${index}`}
              type="button"
              className={`lead-token${active === part ? " is-on" : ""}${ready ? " is-ready" : ""}`}
              onPointerEnter={() => onActive(part)}
              onPointerLeave={() => onActive(null)}
              onFocus={() => onActive(part)}
              onBlur={() => onActive(null)}
            >
              {part}
            </button>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </h1>
  );
}

export function HomeInstrument() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [lead, setLead] = useState<StateId | null>(null);
  const [written, setWritten] = useState(0);
  const [fan, setFan] = useState(false);
  const [slabs, setSlabs] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const walked = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setWritten(CHOOSER_QUERY.length);
      setFan(true);
      setSlabs(true);
      setReady(true);
      return;
    }

    let raf = 0;
    const startWrite = window.setTimeout(() => {
      const began = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - began) / 800);
        setWritten(Math.round(p * CHOOSER_QUERY.length));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 400);

    const tFan = window.setTimeout(() => setFan(true), 1200);
    const tSlabs = window.setTimeout(() => setSlabs(true), 1800);
    const tReady = window.setTimeout(() => setReady(true), 2200);

    return () => {
      window.clearTimeout(startWrite);
      window.clearTimeout(tFan);
      window.clearTimeout(tSlabs);
      window.clearTimeout(tReady);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => () => clearScan(), []);

  function walk(dir: number) {
    if (!ready) return;
    walked.current = true;
    setActive((current) => {
      const from = current ?? -1;
      return (from + dir + CHOOSERS.length) % CHOOSERS.length;
    });
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!ready) return;
    pointScan(event.clientX, event.clientY);
    const root = rootRef.current;
    if (!root) return;
    const box = root.getBoundingClientRect();
    const t = (event.clientX - box.left) / Math.max(box.width, 1);
    const index = Math.min(CHOOSERS.length - 1, Math.max(0, Math.floor(t * CHOOSERS.length)));
    walked.current = true;
    setActive(index);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "j") {
      event.preventDefault();
      walk(1);
    }
    if (event.key === "ArrowLeft" || event.key === "k") {
      event.preventDefault();
      walk(-1);
    }
  }

  const liftSources = lead !== null;

  return (
    <div className="home-instrument">
      <LeadTokens active={lead} ready={ready} onActive={setLead} />
      <div
        ref={rootRef}
        className="chooser-board"
        tabIndex={0}
        onPointerMove={onPointerMove}
        onPointerLeave={clearScan}
        onKeyDown={onKeyDown}
      >
        <p className="chooser-query" aria-label={CHOOSER_QUERY}>
          {CHOOSER_QUERY.slice(0, written)}
        </p>
        <div className="chooser-row">
          {CHOOSERS.map((name, index) => {
            const beamed =
              fan &&
              (walked.current ? active === index : true);
            return (
              <div
                key={name}
                className={`chooser${beamed ? " is-beam" : ""}`}
                style={
                  fan && !walked.current
                    ? { transitionDelay: `${index * 70}ms` }
                    : undefined
                }
              >
                <p className="chooser-name">{name}</p>
                <div
                  className={`chooser-slab${slabs ? " is-settled" : ""}`}
                  aria-hidden="true"
                >
                  <span />
                  <span />
                  <span />
                </div>
                <p
                  className={`chooser-source${liftSources ? " is-lift" : ""}`}
                >
                  source&nbsp;&nbsp;____
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
