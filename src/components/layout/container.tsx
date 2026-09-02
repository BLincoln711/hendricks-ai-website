import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

/**
 * Container widths (09 5.58). The four names resolve through the theme's
 * `--container-*` keys to the layout tokens; the outer padding is `--gutter`.
 */
const widths = {
  /** 1440, header and footer. */
  site: 'max-w-site',
  /** 1280, content. */
  standard: 'max-w-standard',
  /** 1200, data tables. */
  wide: 'max-w-wide',
  /** 760, legal and editorial reading column. */
  narrow: 'max-w-narrow',
} as const

export function Container({
  children,
  width = 'standard',
  className,
}: {
  children: ReactNode
  width?: keyof typeof widths
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full px-gutter', widths[width], className)}>{children}</div>
  )
}
