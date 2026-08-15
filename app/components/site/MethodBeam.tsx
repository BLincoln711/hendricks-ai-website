"use client";

import { useEffect, useRef } from "react";
import { METHOD_STEPS } from "@/lib/site";

export function MethodBeam() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.style.setProperty("--beam", "100%");
      return;
    }

    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const view = window.innerHeight;
      const start = view * 0.72;
      const end = view * 0.28 - rect.height;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      node.style.setProperty("--beam", `${(progress * 100).toFixed(2)}%`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="method-beam" ref={ref}>
      <div className="method-beam-rail" aria-hidden="true">
        <div className="method-beam-light" />
      </div>
      <ol className="method-beam-phases">
        {METHOD_STEPS.map((step) => (
          <li key={step}>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}
