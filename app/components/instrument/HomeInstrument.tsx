"use client";

import { useEffect, useRef, useState } from "react";
import { POSITIONING } from "@/lib/site";
import {
  DOGFOOD_QUERY,
  STATES,
  SURFACES,
  type StateId,
  type SurfaceId,
  surfacesLiftedBy,
} from "./model";
import { clearScan, pointScan, prefersReducedMotion } from "./scan";

const TOKEN = /(retrieved|cited|chosen)/g;

function LeadTokens({
  active,
  onActive,
}: {
  active: StateId | null;
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
              className={`lead-token${active === part ? " is-on" : ""}`}
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
  const [surface, setSurface] = useState<SurfaceId | null>(null);
  const [query, setQuery] = useState(DOGFOOD_QUERY);
  const ticked = useRef(false);
  const idle = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion() || ticked.current) return;

    const arm = () => {
      window.clearTimeout(idle.current);
      idle.current = window.setTimeout(() => {
        if (ticked.current) return;
        ticked.current = true;
        setQuery("Hendricks");
      }, 5000);
    };

    arm();
    return () => window.clearTimeout(idle.current);
  }, []);

  useEffect(() => () => clearScan(), []);

  function bumpIdle() {
    if (ticked.current || prefersReducedMotion()) return;
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => {
      if (ticked.current) return;
      ticked.current = true;
      setQuery("Hendricks");
    }, 5000);
  }

  function walk(next: number) {
    const current = surface ? SURFACES.findIndex((row) => row.id === surface) : -1;
    const index = (current + next + SURFACES.length) % SURFACES.length;
    setSurface(SURFACES[index].id);
    bumpIdle();
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    pointScan(event.clientX, event.clientY);
    bumpIdle();
    const root = rootRef.current;
    if (!root) return;
    const box = root.getBoundingClientRect();
    const t = (event.clientX - box.left) / Math.max(box.width, 1);
    const index = Math.min(SURFACES.length - 1, Math.max(0, Math.floor(t * SURFACES.length)));
    setSurface(SURFACES[index].id);
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

  const lifted = lead ? surfacesLiftedBy(lead) : [];

  return (
    <div className="home-instrument">
      <LeadTokens active={lead} onActive={setLead} />
      <div
        ref={rootRef}
        className="io-board"
        tabIndex={0}
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          setSurface(null);
          clearScan();
        }}
        onKeyDown={onKeyDown}
      >
        <div className="query-node">{query}</div>
        <div className="surface-row">
          {SURFACES.map((row) => (
            <div
              key={row.id}
              className={[
                "io-cell",
                "is-empty",
                surface === row.id ? "is-beam" : "",
                lifted.includes(row.id) ? "is-lift" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {row.label}
            </div>
          ))}
        </div>
        <div className="state-row">
          {STATES.map((state) => (
            <div
              key={state}
              className={[
                "io-cell",
                "is-empty",
                "is-state",
                lead === state ? "is-lift" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-label={`${state}, unmeasured`}
            >
              {state}
            </div>
          ))}
          <div className="query-lab">query lab</div>
        </div>
      </div>
    </div>
  );
}
