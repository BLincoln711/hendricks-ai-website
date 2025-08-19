'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, Calendar, CheckCircle, XCircle, Clock, BarChart3, Target } from 'lucide-react'

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState([
    {
      id: 1,
      date: '2025-01-15',
      prediction: 'AI Marketing Tools search volume will spike 45% as companies plan Q1 budgets',
      targetDate: '2025-02-01',
      category: 'Search Trends',
      confidence: 82,
      status: 'pending',
      evidence: 'Early signals from enterprise search queries, budget planning keywords up 23%'
    },
    {
      id: 2,
      date: '2025-01-10',
      prediction: 'Performance Max campaigns in retail will see 30% higher CPCs due to post-holiday competition',
      targetDate: '2025-01-28',
      category: 'Platform Costs',
      confidence: 78,
      status: 'pending',
      evidence: 'Historical pattern analysis, inventory clearance signals'
    },
    {
      id: 3,
      date: '2025-01-05',
      prediction: 'B2B SaaS demand for "predictive analytics" will increase 65% from financial services',
      targetDate: '2025-01-25',
      category: 'Industry Demand',
      confidence: 71,
      status: 'correct',
      evidence: 'Regulatory filing keywords, earnings call transcripts showing focus',
      result: 'Actual increase: 68% - Validated through search volume and demo requests'
    }
  ])

  const stats = {
    total: predictions.length,
    correct: predictions.filter(p => p.status === 'correct').length,
    incorrect: predictions.filter(p => p.status === 'incorrect').length,
    pending: predictions.filter(p => p.status === 'pending').length,
    accuracy: predictions.filter(p => p.status !== 'pending').length > 0 
      ? (predictions.filter(p => p.status === 'correct').length / predictions.filter(p => p.status !== 'pending').length * 100).toFixed(1)
      : 0
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/hendricks_logo.png" 
                alt="Hendricks.AI" 
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/predictions" className="text-white font-semibold">Live Predictions</Link>
              <Link href="/brandon-lincoln-hendricks" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Live Prediction Tracker
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Track our AI's market predictions in real-time. Every prediction is timestamped, 
              evidence-based, and validated against actual outcomes.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800">
              <div className="text-3xl font-bold text-white mb-2">{stats.total}</div>
              <div className="text-sm text-gray-400">Total Predictions</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-green-500/20">
              <div className="text-3xl font-bold text-green-400 mb-2">{stats.correct}</div>
              <div className="text-sm text-gray-400">Correct</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-yellow-500/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.pending}</div>
              <div className="text-sm text-gray-400">Pending</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stats.accuracy}%</div>
              <div className="text-sm text-gray-400">Accuracy Rate</div>
            </div>
          </div>

          {/* Predictions List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Recent Predictions</h2>
            
            {predictions.map((prediction) => (
              <div 
                key={prediction.id}
                className={`bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border ${
                  prediction.status === 'correct' ? 'border-green-500/30' :
                  prediction.status === 'incorrect' ? 'border-red-500/30' :
                  'border-gray-800'
                } hover:border-blue-500/50 transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Predicted on {new Date(prediction.date).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-blue-400 flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        Target: {new Date(prediction.targetDate).toLocaleDateString()}
                      </span>
                      <span className="text-xs bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full">
                        {prediction.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {prediction.prediction}
                    </h3>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Confidence Level</span>
                        <span className="text-sm text-white">{prediction.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${prediction.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-2">
                      <span className="font-semibold">Evidence:</span> {prediction.evidence}
                    </p>
                    
                    {prediction.result && (
                      <p className="text-sm text-green-400 mt-3 p-3 bg-green-900/20 rounded-lg">
                        <span className="font-semibold">Result:</span> {prediction.result}
                      </p>
                    )}
                  </div>
                  
                  <div className="ml-4">
                    {prediction.status === 'correct' && (
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    )}
                    {prediction.status === 'incorrect' && (
                      <XCircle className="w-8 h-8 text-red-400" />
                    )}
                    {prediction.status === 'pending' && (
                      <Clock className="w-8 h-8 text-yellow-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Methodology Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-4">Our Methodology</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <BarChart3 className="w-8 h-8 text-blue-400 mb-3" />
                <h4 className="font-semibold mb-2">2.8M Daily Signals</h4>
                <p className="text-sm text-gray-300">
                  We analyze search patterns, social sentiment, economic indicators, and competitive intelligence.
                </p>
              </div>
              <div>
                <TrendingUp className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="font-semibold mb-2">Pattern Recognition</h4>
                <p className="text-sm text-gray-300">
                  Our AI identifies recurring patterns that precede market movements by 2-4 weeks.
                </p>
              </div>
              <div>
                <Target className="w-8 h-8 text-green-400 mb-3" />
                <h4 className="font-semibold mb-2">Transparent Tracking</h4>
                <p className="text-sm text-gray-300">
                  Every prediction is publicly tracked and validated against real-world outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want Predictions for Your Industry?
          </h2>
          <p className="text-gray-300 mb-8">
            Get custom predictions for your market, competitors, and opportunities.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105"
          >
            Get Your Predictive Intelligence Report
          </Link>
        </div>
      </section>
    </main>
  )
}