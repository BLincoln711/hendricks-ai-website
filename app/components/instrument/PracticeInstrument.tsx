"use client";

import { useEffect, useRef, useState } from "react";
import { PRACTICE_MODULES } from "@/lib/site";
import { DOGFOOD_QUERY, STATES, SURFACES, type SurfaceId } from "./model";
import { clearScan, pointScan } from "./scan";

type Seat = { kind: "demand" } | { kind: "surface"; id: SurfaceId };

const LEVERS = PRACTICE_MODULES.map((module, index) => ({
  id: index,
  name: module.name,
  body: module.body,
}));

export function PracticeInstrument() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [lever, setLever] = useState<number | null>(null);
  const [seat, setSeat] = useState<Seat>({ kind: "demand" });
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [refuse, setRefuse] = useState(false);
  const origin = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => () => clearScan(), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLever(null);
        return;
      }
      if (event.key === "1" || event.key === "2" || event.key === "3") {
        setLever(Number(event.key) - 1);
        return;
      }
      if (event.key === "ArrowRight" || event.key === "j") {
        event.preventDefault();
        step(1);
      }
      if (event.key === "ArrowLeft" || event.key === "k") {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [seat]);

  function step(dir: number) {
    if (seat.kind === "demand") {
      if (dir > 0) setSeat({ kind: "surface", id: SURFACES[0].id });
      return;
    }
    const index = SURFACES.findIndex((row) => row.id === seat.id);
    const next = index + dir;
    if (next < 0) {
      setSeat({ kind: "demand" });
      return;
    }
    if (next >= SURFACES.length) {
      refuseState();
      return;
    }
    setSeat({ kind: "surface", id: SURFACES[next].id });
  }

  function refuseState() {
    setRefuse(true);
    window.setTimeout(() => setRefuse(false), 160);
  }

  function hitTest(clientX: number, clientY: number): Seat | "state" | null {
    const board = boardRef.current;
    if (!board) return null;
    const inside = (el: Element) => {
      const box = el.getBoundingClientRect();
      return (
        clientX >= box.left &&
        clientX <= box.right &&
        clientY >= box.top &&
        clientY <= box.bottom
      );
    };
    const demand = board.querySelector("[data-seat=demand]");
    if (demand && inside(demand)) return { kind: "demand" };
    const states = Array.from(board.querySelectorAll("[data-seat=state]"));
    if (states.some((node) => inside(node))) return "state";
    const surfaces = Array.from(board.querySelectorAll("[data-surface]"));
    const hit = surfaces.find((node) => inside(node));
    if (hit) {
      return {
        kind: "surface",
        id: (hit as HTMLElement).dataset.surface as SurfaceId,
      };
    }
    return null;
  }

  function onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    origin.current = { x: event.clientX, y: event.clientY };
    setDrag({ x: 0, y: 0 });
  }

  function onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!origin.current || !event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
    pointScan(event.clientX, event.clientY);
    setDrag({
      x: event.clientX - origin.current.x,
      y: event.clientY - origin.current.y,
    });
  }

  function onPointerUp(event: React.PointerEvent<HTMLButtonElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    const hit = hitTest(event.clientX, event.clientY);
    origin.current = null;
    setDrag(null);
    if (hit === "state") {
      refuseState();
      return;
    }
    if (hit) setSeat(hit);
  }

  const selected = lever === null ? null : LEVERS[lever];
  const token = (
    <button
      type="button"
      className={`query-token${refuse ? " is-refuse" : ""}`}
      style={drag ? { transform: `translate(${drag.x}px, ${drag.y}px)` } : undefined}
      aria-label={DOGFOOD_QUERY}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {DOGFOOD_QUERY}
    </button>
  );

  return (
    <div className="practice-instrument">
      <div className="lever-row">
        {LEVERS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`lever${lever === item.id ? " is-on" : ""}`}
            onClick={() => setLever(lever === item.id ? null : item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
      {selected ? <p className="lever-breath measure">{selected.body}</p> : null}

      <div
        ref={boardRef}
        className="io-board is-practice"
        onPointerMove={(event) => pointScan(event.clientX, event.clientY)}
        onPointerLeave={clearScan}
      >
        <div
          data-seat="demand"
          className={[
            "io-cell",
            "is-demand",
            lever === 0 ? "is-beam" : "",
            lever === 1 || lever === 2 ? "is-dim" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          Demand
          {seat.kind === "demand" ? token : null}
        </div>
        <div className={`io-edge${lever === 0 ? " is-beam" : ""}`} />
        <div className={`surface-row${lever === 0 ? " is-dim" : ""}`}>
          {SURFACES.map((row) => {
            const here = seat.kind === "surface" && seat.id === row.id;
            return (
              <div
                key={row.id}
                data-surface={row.id}
                className={[
                  "io-cell",
                  "is-empty",
                  lever === 1 || here ? "is-beam" : "",
                  lever === 2 ? "is-dim" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {row.label}
                {here ? token : null}
              </div>
            );
          })}
        </div>
        <div className="io-edge" />
        <div
          className={`state-row${lever === 0 || lever === 1 ? " is-dim" : ""}`}
        >
          {STATES.map((state) => (
            <div
              key={state}
              data-seat="state"
              className={`io-cell is-empty is-state${lever === 2 ? " is-frame" : ""}`}
              aria-label={`${state}, unmeasured`}
            >
              {state}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
