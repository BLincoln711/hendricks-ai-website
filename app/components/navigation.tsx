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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Category Badge */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/hendricks_logo.png" 
                alt="Hendricks.AI" 
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <div className="hidden lg:flex items-center space-x-2 text-xs">
              <span className="text-green-400">●</span>
              <span className="text-gray-400">Search Intelligence</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/solutions" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              Solutions
            </Link>
            <Link href="/demo" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-1">
              Demo
              <span className="text-xs text-green-400">●</span>
            </Link>
            <Link href="/results" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              Results
            </Link>
            <Link href="/insights" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              Insights
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              About
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/contact" 
              className="hidden sm:inline-flex group relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 overflow-hidden"
            >
              <span className="relative z-10">Book Strategy Session</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10">
            <div className="px-4 py-6 space-y-4">
              <Link 
                href="/solutions" 
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                href="/demo" 
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demo
              </Link>
              <Link 
                href="/results" 
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Results
              </Link>
              <Link 
                href="/insights" 
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insights
              </Link>
              <Link 
                href="/about" 
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-base font-semibold mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Strategy Session
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}