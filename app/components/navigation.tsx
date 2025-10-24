'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[rgba(0,5,20,0.6)] border-b border-[rgba(255,255,255,0.05)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with AI-Powered Badge */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex-shrink-0">
              <img
                src="/hendricks_logo.png"
                alt="Hendricks.AI"
                className="h-6 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <span className="text-gray-400 text-sm ml-1 flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              AI-Powered
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-[15px]">
            <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">
              Home
            </Link>
            <Link href="/solutions" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">
              Solutions
            </Link>
            <Link href="/insights" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">
              Insights
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">
              About
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full px-5 py-2 text-white font-semibold tracking-wide hover:scale-[1.03] transition-transform animate-glow"
            >
              Book Strategy Session →
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[rgba(0,5,20,0.95)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/solutions"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link
                href="/insights"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insights
              </Link>
              <Link
                href="/about"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white rounded-full text-base font-semibold mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Strategy Session →
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}