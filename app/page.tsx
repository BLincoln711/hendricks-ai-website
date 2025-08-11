'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative z-10">
        <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mx-auto shadow-2xl shadow-blue-500/30 transform rotate-3 hover:rotate-6 transition-transform">
              <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                H
              </div>
            </div>
          </div>

          {/* Main content */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Hendricks.AI
          </h1>
          <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400 mb-6 font-light">
            Demand Intelligence to Demand Capture
          </p>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl leading-relaxed">
            Predict market demand <span className="text-blue-400 font-semibold">2-4 weeks early</span>. 
            Transform your marketing with AI-powered predictive analytics that capture opportunities before your competition.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-blue-400">95%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">3-4x</div>
              <div className="text-sm text-gray-400">ROI Increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">2-4</div>
              <div className="text-sm text-gray-400">Weeks Early</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Schedule Demo
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}