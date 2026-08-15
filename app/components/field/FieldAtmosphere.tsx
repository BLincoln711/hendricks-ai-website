"use client";

import { useEffect, useRef } from "react";

export function FieldAtmosphere() {
  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const target = { x: 0.62, y: 0.2 };
    const current = { x: 0.62, y: 0.2 };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX / window.innerWidth;
      target.y = event.clientY / window.innerHeight;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const alpha = 1 - Math.exp(-dt / 0.12);
      current.x += (target.x - current.x) * alpha;
      current.y += (target.y - current.y) * alpha;
      if (pointerRef.current) {
        pointerRef.current.style.setProperty("--px", `${(current.x * 100).toFixed(2)}%`);
        pointerRef.current.style.setProperty("--py", `${(current.y * 100).toFixed(2)}%`);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="field-atmosphere" aria-hidden="true">
      <div className="field-beam" />
      <div className="field-pointer" ref={pointerRef} />
      <div className="field-deepen" />
      <div className="field-vignette" />
      <div className="field-grain" />
    </div>
  );
}
