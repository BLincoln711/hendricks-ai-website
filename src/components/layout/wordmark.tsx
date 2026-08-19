import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils/cn'

/**
 * The wordmark ships as artwork, not live text — it is a heavy geometric sans
 * that is not Geist, and the signal-dot period is part of the mark (docs/04 §3).
 *
 * The accessible name is "Hendricks" without the period: the period belongs to
 * the visual wordmark only and must not leak into prose, metadata, or
 * accessibility labels (docs/01 §4).
 */
const INTRINSIC_WIDTH = 2346
const INTRINSIC_HEIGHT = 507

export function Wordmark({
  tone = 'light',
  width = 148,
  className,
  priority = false,
}: {
  /** `light` for light surfaces, `dark` for navy surfaces. */
  tone?: 'light' | 'dark'
  width?: number
  className?: string
  priority?: boolean
}) {
  const height = Math.round((width / INTRINSIC_WIDTH) * INTRINSIC_HEIGHT)

  return (
    <Image
      src={`/brand/hendricks-wordmark-${tone}.png`}
      alt="Hendricks"
      width={width}
      height={height}
      priority={priority}
      className={cn('h-auto w-auto', className)}
      style={{ width, height }}
      sizes={`${width}px`}
    />
  )
}

export function WordmarkLink({
  tone = 'light',
  width,
  className,
  priority,
}: {
  tone?: 'light' | 'dark'
  width?: number
  className?: string
  priority?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center rounded-sm', className)}
      aria-label="Hendricks, home"
    >
      <Wordmark tone={tone} width={width} priority={priority} />
    </Link>
  )
}
