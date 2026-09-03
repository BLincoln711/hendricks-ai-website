import type { ReactNode } from 'react'

import { TableOfContents } from '@/components/canvas/table-of-contents'

/**
 * The body of an interior route: the sticky table of contents in the left rail
 * and the stations beside it (canvas `_canvas.css` section 4, `.railcol`).
 *
 * Below 1024 px the two columns become one and the contents list sits above the
 * body, which is where a reader on a phone expects an outline. This is the
 * interior page's answer to the homepage's asymmetric splits.
 */
export function RailColumn({
  sections,
  heading,
  children,
}: {
  sections: readonly { id: string; label: string }[]
  heading?: string
  children: ReactNode
}) {
  return (
    <div className="railcol">
      <TableOfContents items={sections} heading={heading} />
      <div>{children}</div>
    </div>
  )
}
