'use client'

import { useState } from 'react'
import { TrendingUp, Calendar, DollarSign, Target, Sparkles, AlertCircle, X } from 'lucide-react'

interface PredictionData {
  currentDemand: number
  predictedDemand: number
  demandIncrease: number
  peakDate: string
  confidenceScore: number
  opportunityWindow: number
  potentialRevenue: number
  competitorLag: number
}

export default function DemandPredictionDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    industry: '',
    adSpend: '',
    targetMarket: '',
    currentConversionRate: '2.5'
  })
  const [prediction, setPrediction] = useState<PredictionData | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const industries = [
    'B2B SaaS',
    'E-commerce',
    'Healthcare',
    'Financial Services',
    'Real Estate',
    'Education',
    'Manufacturing',
    'Retail',
    'Professional Services',
    'Technology'
  ]

  const targetMarkets = [
    'Enterprise (1000+ employees)',
    'Mid-Market (100-999 employees)',
    'Small Business (1-99 employees)',
    'Consumers (B2C)',
    'Government',
    'Non-Profit'
  ]

  const calculatePrediction = () => {
    setIsCalculating(true)
    
    // Simulate API call
    setTimeout(() => {
      const spend = parseFloat(formData.adSpend) || 10000
      const conversionRate = parseFloat(formData.currentConversionRate) || 2.5
      
      // Industry multipliers (simulated)
      const industryMultipliers: { [key: string]: number } = {
        'B2B SaaS': 1.4,
        'E-commerce': 1.6,
        'Healthcare': 1.3,
        'Financial Services': 1.5,
        'Real Estate': 1.7,
        'Education': 1.2,
        'Manufacturing': 1.1,
        'Retail': 1.5,
        'Professional Services': 1.3,
        'Technology': 1.6
      }
      
      const multiplier = industryMultipliers[formData.industry] || 1.3
      const randomVariance = 0.8 + Math.random() * 0.4 // 80-120% variance
      
      // Calculate prediction
      const currentDemand = Math.round(spend / 50) // Simplified: $50 per conversion
      const demandIncrease = Math.round(20 + Math.random() * 60) // 20-80% increase
      const predictedDemand = Math.round(currentDemand * (1 + demandIncrease / 100) * multiplier * randomVariance)
      
      // Calculate dates
      const today = new Date()
      const peakDate = new Date(today.getTime() + (14 + Math.random() * 14) * 24 * 60 * 60 * 1000) // 2-4 weeks
      
      setPrediction({
        currentDemand,
        predictedDemand,
        demandIncrease,
        peakDate: peakDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        confidenceScore: Math.round(70 + Math.random() * 8), // 70-78% confidence
        opportunityWindow: Math.round(14 + Math.random() * 7), // 14-21 days
        potentialRevenue: Math.round(predictedDemand * spend / currentDemand * conversionRate / 100),
        competitorLag: Math.round(7 + Math.random() * 7) // 7-14 days
      })
      
      setIsCalculating(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calculatePrediction()
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
      >
        <Sparkles className="w-5 h-5" />
        Try Demand Prediction Demo
        <div className="flex items-center gap-1 text-sm opacity-90">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </button>

      {/* Demo Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-800">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 rounded-t-2xl border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    AI Demand Prediction Demo
                  </h2>
                  <p className="text-gray-300">
                    See how we predict market demand 2-4 weeks before it happens
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {!prediction ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select your industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Monthly Ad Spend
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={formData.adSpend}
                        onChange={(e) => setFormData({ ...formData, adSpend: e.target.value })}
                        placeholder="10000"
                        required
                        min="1000"
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Target Market
                    </label>
                    <select
                      value={formData.targetMarket}
                      onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select target market</option>
                      {targetMarkets.map(market => (
                        <option key={market} value={market}>{market}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Conversion Rate (%)
                    </label>
                    <input
                      type="number"
                      value={formData.currentConversionRate}
                      onChange={(e) => setFormData({ ...formData, currentConversionRate: e.target.value })}
                      placeholder="2.5"
                      step="0.1"
                      min="0.1"
                      max="100"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Analyzing Market Signals...
                      </span>
                    ) : (
                      'Generate Prediction'
                    )}
                  </button>

                  <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-300">
                        This demo uses simplified modeling. Our actual predictions analyze 2.8M+ data points daily across 100+ sources for 74% accuracy.
                      </p>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Prediction Header */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-800/50 rounded-full text-green-400 text-sm font-medium mb-4">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Prediction Generated
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Demand Surge Detected in {prediction.opportunityWindow} Days
                    </h3>
                    <p className="text-gray-400">
                      for {formData.industry} targeting {formData.targetMarket}
                    </p>
                  </div>

                  {/* Main Metrics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-800/50">
                      <div className="flex items-center justify-between mb-4">
                        <TrendingUp className="w-8 h-8 text-purple-400" />
                        <span className="text-3xl font-bold text-green-400">
                          +{prediction.demandIncrease}%
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Predicted Demand Increase
                      </h4>
                      <p className="text-gray-400">
                        From {prediction.currentDemand} to {prediction.predictedDemand} conversions/month
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-800/50">
                      <div className="flex items-center justify-between mb-4">
                        <Calendar className="w-8 h-8 text-blue-400" />
                        <span className="text-xl font-bold text-white">
                          {prediction.peakDate}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Peak Demand Date
                      </h4>
                      <p className="text-gray-400">
                        {prediction.competitorLag} days before competitors react
                      </p>
                    </div>
                  </div>

                  {/* Additional Insights */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">
                        {prediction.confidenceScore}%
                      </div>
                      <p className="text-sm text-gray-400">Confidence Score</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        ${prediction.potentialRevenue.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-400">Potential Revenue</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        {prediction.opportunityWindow} days
                      </div>
                      <p className="text-sm text-gray-400">Action Window</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-800/50">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Ready to Capture This Opportunity?
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Get a complete Intelligence Report with specific keywords, ad copy, and campaign strategies for your predicted demand surge.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="https://calendar.app.google/DHopiSfnLiH5xwKo9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-center"
                      >
                        Book Strategy Call
                      </a>
                      <button
                        onClick={() => {
                          setPrediction(null)
                          setFormData({
                            industry: '',
                            adSpend: '',
                            targetMarket: '',
                            currentConversionRate: '2.5'
                          })
                        }}
                        className="flex-1 px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200"
                      >
                        Try Another Prediction
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}