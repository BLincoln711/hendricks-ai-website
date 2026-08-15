"use client";

import { useEffect, useRef } from "react";

export function LeadParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      const shift = Math.min(window.scrollY * 0.1, 96);
      node.style.transform = `translate3d(0, ${shift}px, 0)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <span className="lead-parallax" ref={ref}>
      {children}
    </span>
  );
}
