export function pointScan(clientX: number, clientY: number) {
  const shell = document.querySelector(".site-shell") as HTMLElement | null;
  if (!shell) return;
  shell.style.setProperty("--scan-x", `${((clientX / window.innerWidth) * 100).toFixed(2)}%`);
  shell.style.setProperty("--scan-y", `${((clientY / window.innerHeight) * 100).toFixed(2)}%`);
}

export function clearScan() {
  const shell = document.querySelector(".site-shell") as HTMLElement | null;
  if (!shell) return;
  shell.style.removeProperty("--scan-x");
  shell.style.removeProperty("--scan-y");
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
