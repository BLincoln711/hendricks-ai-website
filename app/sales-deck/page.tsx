'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Download, Maximize2, Play, Pause, Share2 } from 'lucide-react'
import Link from 'next/link'

// Import slide components
import CoverSlide from './slides/CoverSlide'
import ProblemSlide from './slides/ProblemSlide'
import SolutionSlide from './slides/SolutionSlide'
import HowItWorksSlide from './slides/HowItWorksSlide'
import TechnologySlide from './slides/TechnologySlide'
import ResultsSlide from './slides/ResultsSlide'
import CaseStudySlide from './slides/CaseStudySlide'
import ComparisonSlide from './slides/ComparisonSlide'
import ROISlide from './slides/ROISlide'
import PricingSlide from './slides/PricingSlide'
import TimelineSlide from './slides/TimelineSlide'
import TeamSlide from './slides/TeamSlide'
import CTASlide from './slides/CTASlide'

const slides = [
  { id: 1, component: CoverSlide, title: 'Cover' },
  { id: 2, component: ProblemSlide, title: 'The Problem' },
  { id: 3, component: SolutionSlide, title: 'Our Solution' },
  { id: 4, component: HowItWorksSlide, title: 'How It Works' },
  { id: 5, component: TechnologySlide, title: 'Technology' },
  { id: 6, component: ResultsSlide, title: 'Results' },
  { id: 7, component: CaseStudySlide, title: 'Case Study' },
  { id: 8, component: ComparisonSlide, title: 'Comparison' },
  { id: 9, component: ROISlide, title: 'ROI Calculator' },
  { id: 10, component: PricingSlide, title: 'Pricing' },
  { id: 11, component: TimelineSlide, title: 'Timeline' },
  { id: 12, component: TeamSlide, title: 'Our Team' },
  { id: 13, component: CTASlide, title: 'Next Steps' }
]

export default function SalesDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const deckRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      deckRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1)
        } else {
          setIsPlaying(false)
        }
      }, 8000) // 8 seconds per slide

      return () => clearInterval(interval)
    }
  }, [isPlaying, currentSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'f') toggleFullscreen()
      if (e.key === ' ') {
        e.preventDefault()
        toggleAutoPlay()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide])

  const shareLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    alert('Presentation link copied to clipboard!')
  }

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="min-h-screen bg-black text-white" ref={deckRef}>
      {/* Header Controls */}
      {!isFullscreen && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <img src="/hendricks_logo.png" alt="Hendricks.AI" className="h-8 w-auto brightness-0 invert" />
                <span className="text-sm text-gray-400">Sales Deck</span>
              </Link>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleAutoPlay}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button
                  onClick={shareLink}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`${isFullscreen ? 'h-screen' : 'pt-16 pb-20'} flex items-center justify-center`}>
        <div className="w-full max-w-7xl mx-auto px-4">
          {/* Slide Container */}
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl aspect-[16/9]">
            {/* Current Slide */}
            <CurrentSlideComponent />

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all ${
                currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all ${
                currentSlide === slides.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Number */}
            <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-lg text-sm">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      {!isFullscreen && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-center space-x-2 overflow-x-auto">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all ${
                    index === currentSlide
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {slide.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      {!isFullscreen && (
        <div className="fixed bottom-20 right-4 bg-gray-900 rounded-lg p-3 text-xs text-gray-400">
          <div className="space-y-1">
            <div>← → Navigate</div>
            <div>Space: Play/Pause</div>
            <div>F: Fullscreen</div>
          </div>
        </div>
      )}
    </div>
  )
}