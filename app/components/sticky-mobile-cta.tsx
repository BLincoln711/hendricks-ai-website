'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show after 3 seconds on mobile viewports
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Only show on mobile viewports (<768px) */}
      <div className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Link
          href="/briefing"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:scale-[1.03] transition-transform inline-flex items-center justify-center gap-2 animate-glow"
        >
          Book a briefing
        </Link>
      </div>
    </>
  )
}
