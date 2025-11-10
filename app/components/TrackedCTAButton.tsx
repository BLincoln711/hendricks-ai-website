'use client'

import Link from 'next/link'
import { trackCTA } from '@/lib/analytics'

interface TrackedCTAButtonProps {
  href: string
  children: React.ReactNode
  ctaName: string
  ctaLocation: string
  className?: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export default function TrackedCTAButton({
  href,
  children,
  ctaName,
  ctaLocation,
  className,
  variant = 'primary',
  onClick
}: TrackedCTAButtonProps) {

  const handleClick = () => {
    // Track the CTA click
    trackCTA(ctaName, ctaLocation)

    // Call any additional onClick handler
    if (onClick) {
      onClick()
    }
  }

  const baseClasses = variant === 'primary'
    ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white'
    : 'border border-cyan-400/30 text-gray-300 hover:border-cyan-400 hover:text-white'

  const defaultClasses = `px-8 py-4 rounded-full font-semibold hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-2 ${baseClasses}`

  return (
    <Link
      href={href}
      className={className || defaultClasses}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}
