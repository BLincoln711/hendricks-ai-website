import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

/** Container widths from docs/04 §7. */
const widths = {
  site: 'max-w-[1440px]',
  standard: 'max-w-[1280px]',
  wide: 'max-w-[1200px]',
  narrow: 'max-w-[760px]',
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
    <div className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', widths[width], className)}>
      {children}
    </div>
  )
}
