'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, TrendingUp, AlertCircle } from 'lucide-react'
import MarketDemandPredictor from '../components/market-demand-predictor'

export default function LiveDemoPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/hendricks_logo.png" 
                alt="Hendricks.AI" 
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <Link 
              href="https://calendar.app.google/DHopiSfnLiH5xwKo9"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
            >
              Book Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-blue-950/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-full text-blue-400 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">LIVE AI PREDICTIONS</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              See Tomorrow's Demand Today
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Our AI analyzes 2.8M+ data points daily to predict market demand 2-4 weeks before it materializes. 
            Watch it identify opportunities your competitors will miss.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400">74%</div>
              <p className="text-sm text-gray-400">Prediction Accuracy</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">2-4 Weeks</div>
              <p className="text-sm text-gray-400">Advance Notice</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">312%</div>
              <p className="text-sm text-gray-400">Average ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Demand Predictor */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MarketDemandPredictor />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Our AI Predictions Work
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Data Ingestion</h3>
              <p className="text-gray-400">
                Our AI continuously monitors search patterns, social signals, competitor movements, 
                and 100+ other data sources to identify emerging trends.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Pattern Recognition</h3>
              <p className="text-gray-400">
                Machine learning algorithms identify micro-patterns that indicate future demand, 
                often weeks before they become visible in traditional analytics.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Actionable Predictions</h3>
              <p className="text-gray-400">
                Get specific recommendations on keywords to target, bid adjustments to make, 
                and content to create—all before your competitors see the opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Stay Ahead of Your Market?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get personalized predictions for your specific industry and see exactly how much revenue 
            you're leaving on the table by reacting instead of predicting.
          </p>
          
          <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Free Prediction Analysis Includes:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400 mt-1" />
                <span className="text-gray-300">Your next 30-day demand forecast</span>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400 mt-1" />
                <span className="text-gray-300">Competitor blind spot analysis</span>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400 mt-1" />
                <span className="text-gray-300">Top 10 opportunity keywords</span>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400 mt-1" />
                <span className="text-gray-300">ROI projection for your business</span>
              </div>
            </div>
            
            <Link 
              href="https://calendar.app.google/DHopiSfnLiH5xwKo9"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
            >
              Get Your Free Prediction Analysis
              <Sparkles className="w-5 h-5" />
            </Link>
            
            <p className="text-sm text-gray-400 mt-4">
              No credit card required • 30-minute consultation • Limited to 10 companies per month
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}