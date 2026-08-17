/** Visible on focus only (docs/08 §2). */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:inline-flex focus:h-12 focus:items-center focus:rounded-[var(--radius-button)] focus:bg-[var(--color-blue)] focus:px-5 focus:font-medium focus:text-white"
    >
      Skip to main content
    </a>
  )
}
