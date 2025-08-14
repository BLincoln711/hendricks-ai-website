'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function IntelligenceReport({ params }: { params: { id: string } }) {
  const [reportData, setReportData] = useState<any>(null)
  
  // In production, this would fetch from your database
  useEffect(() => {
    // Simulate loading report data
    const mockData = {
      company: "Example Corp",
      generatedDate: new Date().toISOString(),
      industryTrends: {
        trending: [
          { keyword: 'AI automation', growth: '+127%', timeline: '2-3 weeks' },
          { keyword: 'example corp alternatives', growth: '+89%', timeline: '3-4 weeks' },
          { keyword: 'enterprise solutions', growth: '+76%', timeline: '2 weeks' }
        ],
        declining: [
          { keyword: 'traditional marketing', decline: '-34%', timeline: '4 weeks' },
          { keyword: 'manual processes', decline: '-42%', timeline: '3 weeks' }
        ]
      },
      demandPredictions: {
        next30Days: {
          searchVolume: 25000,
          growthRate: '23%',
          peakDates: ['Week of Jan 27', 'Week of Feb 10'],
          confidence: '74%'
        },
        keywordOpportunities: [
          { term: 'example corp pricing', volume: 7500, difficulty: 'Low' },
          { term: 'example corp reviews', volume: 10000, difficulty: 'Medium' },
          { term: 'best example corp alternative', volume: 5000, difficulty: 'Low' }
        ]
      }
    }
    setReportData(mockData)
  }, [])
  
  if (!reportData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Generating Intelligence Report...</p>
        </div>
      </div>
    )
  }
  
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 py-2 text-center text-sm">
        <p>🔒 Confidential Intelligence Report - Prepared exclusively for {reportData.company}</p>
      </div>
      
      {/* Report Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img src="/hendricks_logo.png" alt="Hendricks.AI" className="h-12 mx-auto mb-6 brightness-0 invert" />
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Predictive Intelligence Report
              </span>
            </h1>
            <p className="text-2xl text-gray-300 mb-2">Prepared for: {reportData.company}</p>
            <p className="text-gray-400">Generated: {new Date(reportData.generatedDate).toLocaleDateString()}</p>
          </div>
        </div>
      </section>
      
      {/* Executive Summary */}
      <section className="py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Executive Summary
          </h2>
          <div className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 p-8 rounded-2xl border border-blue-500/20">
            <p className="text-lg text-gray-300 mb-4">
              Our AI models have identified <span className="text-blue-400 font-semibold">significant untapped demand</span> in your market 
              that will materialize within the next 2-4 weeks. Based on analysis of 2.8M+ data points, we predict a 
              <span className="text-green-400 font-semibold"> 23% surge in search volume</span> for your key terms, 
              with competitors currently unaware of these emerging opportunities.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">74%</div>
                <div className="text-gray-400">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400">2-4 weeks</div>
                <div className="text-gray-400">Advance Warning</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">312%</div>
                <div className="text-gray-400">Avg Client ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Demand Predictions */}
      <section className="py-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            30-Day Demand Forecast
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Search Volume Prediction */}
            <div className="bg-black/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold mb-6 text-blue-400">Search Volume Trajectory</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Volume:</span>
                  <span className="text-2xl font-bold">{reportData.demandPredictions.next30Days.searchVolume.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Predicted Growth:</span>
                  <span className="text-2xl font-bold text-green-400">{reportData.demandPredictions.next30Days.growthRate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Confidence Level:</span>
                  <span className="text-2xl font-bold text-blue-400">{reportData.demandPredictions.next30Days.confidence}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-300">
                  <span className="font-semibold">Peak Demand Windows:</span><br/>
                  {reportData.demandPredictions.next30Days.peakDates.join(' & ')}
                </p>
              </div>
            </div>
            
            {/* Keyword Opportunities */}
            <div className="bg-black/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold mb-6 text-purple-400">Emerging Keywords</h3>
              <div className="space-y-4">
                {reportData.demandPredictions.keywordOpportunities.map((kw: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <div>
                      <div className="font-semibold">{kw.term}</div>
                      <div className="text-sm text-gray-400">Volume: {kw.volume.toLocaleString()}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      kw.difficulty === 'Low' ? 'bg-green-900/50 text-green-400' : 
                      kw.difficulty === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' : 
                      'bg-red-900/50 text-red-400'
                    }`}>
                      {kw.difficulty}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Industry Trends */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Industry Trend Analysis
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Trending Up */}
            <div className="bg-gradient-to-br from-green-900/20 to-black p-8 rounded-2xl border border-green-500/20">
              <h3 className="text-xl font-bold mb-6 text-green-400">📈 Accelerating Trends</h3>
              <div className="space-y-4">
                {reportData.industryTrends.trending.map((trend: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-300">{trend.keyword}</span>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">{trend.growth}</div>
                      <div className="text-xs text-gray-500">{trend.timeline}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Trending Down */}
            <div className="bg-gradient-to-br from-red-900/20 to-black p-8 rounded-2xl border border-red-500/20">
              <h3 className="text-xl font-bold mb-6 text-red-400">📉 Declining Searches</h3>
              <div className="space-y-4">
                {reportData.industryTrends.declining.map((trend: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-300">{trend.keyword}</span>
                    <div className="text-right">
                      <div className="text-red-400 font-bold">{trend.decline}</div>
                      <div className="text-xs text-gray-500">{trend.timeline}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Strategic Recommendations */}
      <section className="py-16 bg-gradient-to-b from-gray-900/30 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Strategic Recommendations
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-500/20">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎯</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-blue-400">Immediate Action: Capture Pre-Intent Demand</h3>
                  <p className="text-gray-300 mb-4">
                    Deploy Google Demand Gen campaigns targeting users before they enter active search mode. 
                    Our models show a 3x ROAS opportunity in the next 14 days.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-400">Expected Impact: +127% reach</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-blue-400">Timeline: 48 hours</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-8 rounded-2xl border border-purple-500/20">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🚀</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-purple-400">Strategic Priority: Dual Performance Max</h3>
                  <p className="text-gray-300 mb-4">
                    You're missing 28% of potential conversions by not running Bing Performance Max alongside Google. 
                    Microsoft ecosystem integration delivers 2.6x higher B2B engagement.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-400">Expected Impact: +10% ROAS</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-purple-400">Timeline: 1 week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ROI Projections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ROI Projections
          </h2>
          
          <div className="bg-black/50 p-8 rounded-2xl border border-gray-800">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-gray-400 mb-2">Month 1</div>
                <div className="text-4xl font-bold text-blue-400">80%</div>
                <div className="text-sm text-gray-500">ROI</div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Month 3</div>
                <div className="text-4xl font-bold text-purple-400">140%</div>
                <div className="text-sm text-gray-500">ROI</div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Month 6</div>
                <div className="text-4xl font-bold text-green-400">212%</div>
                <div className="text-sm text-gray-500">ROI</div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl text-center">
              <p className="text-lg text-gray-300">
                Based on your budget range and market conditions, we project a 
                <span className="text-2xl font-bold text-blue-400 mx-2">312%</span>
                average ROI within 12 months
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Next Steps CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Your Competitors See Yesterday's Data.
            <span className="block text-5xl mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              You Can See Tomorrow's.
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            This report identified <span className="font-bold text-blue-400">$2.3M in untapped demand</span> heading your way. 
            Let's capture it before your competitors even know it exists.
          </p>
          
          <div className="space-y-4">
            <Link href="/contact" className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Schedule Strategy Session
            </Link>
            
            <p className="text-gray-400 text-sm">
              Average client onboarding: 48 hours • First results: 7 days
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>© 2025 Hendricks.AI - This report contains proprietary predictive intelligence.</p>
        <p>Methodology: AI analysis of 2.8M+ data points across search, social, and competitor signals.</p>
      </footer>
    </main>
  )
}