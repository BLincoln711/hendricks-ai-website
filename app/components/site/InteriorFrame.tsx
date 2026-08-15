"use client";

import { useEffect, useState } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function InteriorFrame({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [wiping, setWiping] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setWiping(false);
      setEntered(true);
      return;
    }

    const wipe = window.setTimeout(() => setWiping(false), 500);
    const reveal = window.setTimeout(() => setEntered(true), 500);
    return () => {
      window.clearTimeout(wipe);
      window.clearTimeout(reveal);
    };
  }, []);

  return (
    <div className={`interior-frame${entered ? " is-entered" : ""}`}>
      {wiping ? <div className="page-wipe" aria-hidden="true" /> : null}
      <SiteHeader />
      <main className="site-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
