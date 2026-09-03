'use client'

import { useEffect, useState, type ReactNode } from 'react'

/** Below this width the rail collapses into the body, so the list gets a control. */
const NARROW = '(max-width: 1023px)'

/**
 * The table of contents disclosure (`toc-toggle` in the converted pages' own
 * style block, `definition-page.html` and `research-article.html`).
 *
 * The list ships expanded and every entry is in the document at first paint, so
 * a reader without JavaScript, and any crawler, sees the whole outline. D-E is
 * satisfied by the markup, not by the control. What the control buys is the
 * phone viewport: a sixteen entry outline is 748 px of link list between the
 * answer and the first section at 390 px wide, which pushes the page's answer
 * off the first screen. Collapsing it is a disclosure over content that is
 * already present, which `canvas.md` section 2 lists as a control rather than a
 * container: transparent fill, one hairline edge, the control radius.
 */
export function TocDisclosure({
  label,
  listId,
  children,
}: {
  /** The control's own label, the same words as the visible heading. */
  label: string
  listId: string
  children: ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const narrow = window.matchMedia(NARROW)
    const apply = () => setCollapsed(narrow.matches)

    apply()
    narrow.addEventListener('change', apply)
    return () => narrow.removeEventListener('change', apply)
  }, [])

  return (
    <>
      <button
        type="button"
        className="toc-toggle"
        aria-expanded={!collapsed}
        aria-controls={listId}
        onClick={() => setCollapsed((value) => !value)}
      >
        {label}
      </button>

      <ol id={listId} hidden={collapsed}>
        {children}
      </ol>
    </>
  )
}
