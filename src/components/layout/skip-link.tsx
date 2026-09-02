/** First tab stop, to `main#main`; visible on focus only (09 5.5, 16 KF-01). */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[var(--z-skip)] focus:inline-flex focus:min-h-control focus:items-center focus:rounded-control focus:bg-action focus:px-[var(--button-pad-x)] focus:text-small focus:font-medium focus:text-action-fg"
    >
      Skip to main content
    </a>
  )
}
