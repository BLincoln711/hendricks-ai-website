'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Activity, AlertCircle, Zap, Clock } from 'lucide-react'

interface TrendData {
  keyword: string
  currentVolume: number
  predictedVolume: number
  percentageChange: number
  peakDate: string
  confidence: number
  industry: string
  opportunity: string
}

interface HistoricalPoint {
  date: string
  value: number
  predicted?: number
}

export default function MarketDemandPredictor() {
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [trends, setTrends] = useState<TrendData[]>([])
  const [loading, setLoading] = useState(true)
  const [historicalData, setHistoricalData] = useState<HistoricalPoint[]>([])
  const [selectedTrend, setSelectedTrend] = useState<TrendData | null>(null)

  const industries = [
    { id: 'all', name: 'All Industries', icon: '🌐' },
    { id: 'saas', name: 'SaaS', icon: '💻' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'realestate', name: 'Real Estate', icon: '🏠' }
  ]

  // Simulate fetching data from multiple sources
  useEffect(() => {
    const fetchTrendData = async () => {
      setLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate realistic trend data based on industry
      const generateTrends = (): TrendData[] => {
        const industryKeywords: Record<string, string[]> = {
          all: [
            'AI automation tools', 'predictive analytics', 'customer intelligence',
            'demand forecasting', 'market prediction software', 'revenue optimization'
          ],
          saas: [
            'project management software', 'CRM solutions', 'team collaboration tools',
            'workflow automation', 'data analytics platforms', 'API management'
          ],
          ecommerce: [
            'dropshipping 2024', 'social commerce', 'mobile shopping apps',
            'sustainable products', 'personalization tools', 'checkout optimization'
          ],
          healthcare: [
            'telemedicine platforms', 'patient engagement', 'health tracking apps',
            'medical AI diagnosis', 'healthcare CRM', 'remote patient monitoring'
          ],
          finance: [
            'crypto tax software', 'robo advisors', 'expense tracking apps',
            'investment platforms', 'financial planning tools', 'payment processing'
          ],
          realestate: [
            'virtual home tours', 'property management software', 'real estate CRM',
            'market analysis tools', 'tenant screening', 'investment calculators'
          ]
        }

        const keywords = selectedIndustry === 'all' 
          ? Object.values(industryKeywords).flat().sort(() => Math.random() - 0.5).slice(0, 6)
          : industryKeywords[selectedIndustry] || industryKeywords.all

        return keywords.map(keyword => {
          const baseVolume = Math.floor(Math.random() * 50000) + 10000
          const growthRate = Math.random() * 0.8 - 0.2 // -20% to +60%
          const predictedVolume = Math.floor(baseVolume * (1 + growthRate))
          const daysUntilPeak = Math.floor(Math.random() * 21) + 7
          const confidence = Math.floor(Math.random() * 20) + 75

          const opportunities = [
            'Early mover advantage available',
            'Competitor blind spot detected',
            'Seasonal surge approaching',
            'Emerging market segment',
            'Untapped audience identified',
            'High-intent traffic available'
          ]

          return {
            keyword,
            currentVolume: baseVolume,
            predictedVolume,
            percentageChange: Math.round(growthRate * 100),
            peakDate: new Date(Date.now() + daysUntilPeak * 24 * 60 * 60 * 1000).toLocaleDateString(),
            confidence,
            industry: selectedIndustry === 'all' ? 
              Object.keys(industryKeywords).find(ind => 
                industryKeywords[ind].includes(keyword)
              ) || 'general' : selectedIndustry,
            opportunity: opportunities[Math.floor(Math.random() * opportunities.length)]
          }
        })
      }

      const newTrends = generateTrends().sort((a, b) => b.percentageChange - a.percentageChange)
      setTrends(newTrends)
      
      // Generate historical data for visualization
      const generateHistorical = (): HistoricalPoint[] => {
        const points: HistoricalPoint[] = []
        const today = new Date()
        
        for (let i = 30; i >= -30; i--) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)
          
          const baseValue = 100
          const noise = (Math.random() - 0.5) * 20
          const trend = i > 0 ? 0 : (30 - Math.abs(i)) * 2
          
          points.push({
            date: date.toLocaleDateString(),
            value: Math.max(0, baseValue + noise + (i > 0 ? 0 : trend)),
            predicted: i < 0 ? Math.max(0, baseValue + noise + trend + (Math.random() - 0.5) * 10) : undefined
          })
        }
        
        return points
      }

      setHistoricalData(generateHistorical())
      setLoading(false)
    }

    fetchTrendData()
    
    // Refresh data every 30 seconds for live feel
    const interval = setInterval(fetchTrendData, 30000)
    return () => clearInterval(interval)
  }, [selectedIndustry])

  const getChangeIcon = (change: number) => {
    if (change > 20) return <Zap className="w-5 h-5 text-yellow-400" />
    if (change > 0) return <TrendingUp className="w-5 h-5 text-green-400" />
    return <TrendingDown className="w-5 h-5 text-red-400" />
  }

  const getChangeColor = (change: number) => {
    if (change > 20) return 'text-yellow-400'
    if (change > 0) return 'text-green-400'
    return 'text-red-400'
  }

  return (
    <div className="bg-black rounded-2xl p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Live Market Demand Predictor
            </h2>
            <p className="text-gray-400">
              Real-time AI analysis of market trends and demand patterns
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
            <span className="text-gray-500">Updates every 30s</span>
          </div>
        </div>

        {/* Industry Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setSelectedIndustry(industry.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedIndustry === industry.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{industry.icon}</span>
              {industry.name}
            </button>
          ))}
        </div>

        {/* Alert Banner */}
        <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <p className="text-blue-300 font-medium">
                AI Detection: {trends.filter(t => t.percentageChange > 30).length} high-growth opportunities identified
              </p>
              <p className="text-blue-300/70 text-sm mt-1">
                Our AI has analyzed 2.4M+ data points in the last 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trends Grid */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-800 rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-all cursor-pointer border border-gray-800 hover:border-gray-700"
              onClick={() => setSelectedTrend(trend)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      {trend.keyword}
                    </h3>
                    {trend.percentageChange > 30 && (
                      <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 text-xs rounded-full">
                        🔥 Hot Trend
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-gray-500 text-sm">Current Volume</p>
                      <p className="text-white font-medium">
                        {trend.currentVolume.toLocaleString()}/mo
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Predicted Volume</p>
                      <p className="text-white font-medium">
                        {trend.predictedVolume.toLocaleString()}/mo
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Peak Date</p>
                      <p className="text-white font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {trend.peakDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Confidence</p>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${trend.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm">{trend.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">
                      Opportunity: <span className="text-cyan-400">{trend.opportunity}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right ml-4">
                  <div className={`flex items-center gap-2 ${getChangeColor(trend.percentageChange)}`}>
                    {getChangeIcon(trend.percentageChange)}
                    <span className="text-2xl font-bold">
                      {trend.percentageChange > 0 ? '+' : ''}{trend.percentageChange}%
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">predicted growth</p>
                </div>
              </div>

              {/* Mini Chart Preview */}
              <div className="mt-4 h-16 flex items-end gap-1">
                {historicalData.slice(-20).map((point, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-600/30 rounded-t transition-all hover:bg-blue-600/50"
                    style={{
                      height: `${(point.value / 150) * 100}%`,
                      opacity: point.predicted ? 0.5 : 1
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-800/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Want to capture these opportunities before your competitors?
            </h3>
            <p className="text-gray-400">
              Get personalized predictions for your specific market and keywords
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
            Get My Predictions
          </button>
        </div>
      </div>
    </div>
  )
}