/**
 * First tab stop, to `main#main` (canvas `.skip`; 09 5.5, 16 KF-01).
 *
 * Off screen above the masthead until it takes focus, then it drops to the top
 * left corner in inverted ink, which is the one place on the site where the
 * ground and the ink swap. It is a control, so the radius is legal.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="absolute -top-[60px] left-2 z-[var(--z-skip)] inline-flex min-h-control items-center rounded-[var(--radius-skip)] bg-ink px-4 text-small font-medium text-bg transition-[top] duration-[var(--duration-micro)] ease-standard focus:top-2"
    >
      Skip to main content
    </a>
  )
}
