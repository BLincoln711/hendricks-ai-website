import { TrendingUp, Calendar, Target, Zap } from 'lucide-react'

export default function CaseStudySlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-950 via-purple-950 to-black">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-full text-blue-400 mb-4">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">CASE STUDY</span>
          </div>
          <h2 className="text-4xl font-bold mb-2">TechFlow Solutions</h2>
          <p className="text-xl text-gray-400">From struggling startup to market leader in 6 months</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Challenge & Solution */}
          <div className="space-y-6">
            {/* The Challenge */}
            <div className="bg-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-red-800/50">
              <h3 className="text-2xl font-semibold mb-4 text-red-400">The Challenge</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Burning $180K/month on ads with 0.8% conversion rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Competitors dominating 78% of target keywords</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>6 months runway left before shutdown</span>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="bg-green-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-800/50">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">The Solution</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>AI predicted surge in "workflow automation" searches</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Pivoted campaigns 3 weeks before competitors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Captured 64% market share in emerging category</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Results Timeline */}
          <div className="bg-gray-900/50 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-6">Results Timeline</h3>
            
            <div className="space-y-6">
              {/* Month 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                </div>
                <div className="flex-grow">
                  <div className="text-lg font-semibold mb-1">Month 1</div>
                  <div className="text-gray-400">AI identifies emerging demand pattern</div>
                  <div className="text-green-400 font-semibold mt-1">+47% click-through rate</div>
                </div>
              </div>

              {/* Month 2-3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">2-3</div>
                </div>
                <div className="flex-grow">
                  <div className="text-lg font-semibold mb-1">Month 2-3</div>
                  <div className="text-gray-400">Campaigns optimized for predicted keywords</div>
                  <div className="text-green-400 font-semibold mt-1">3.2% conversion rate • $42 CAC</div>
                </div>
              </div>

              {/* Month 4-6 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">4-6</div>
                </div>
                <div className="flex-grow">
                  <div className="text-lg font-semibold mb-1">Month 4-6</div>
                  <div className="text-gray-400">Market leadership achieved</div>
                  <div className="text-green-400 font-semibold mt-1">$8.4M ARR • Series A raised</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">467%</div>
            <div className="text-sm text-gray-400">Revenue Growth</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">$142</div>
            <div className="text-sm text-gray-400">CAC → $42</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">21 days</div>
            <div className="text-sm text-gray-400">First-mover advantage</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">64%</div>
            <div className="text-sm text-gray-400">Market share captured</div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 text-center">
          <p className="text-lg italic text-gray-300 mb-3">
            "Hendricks.AI didn't just save our company - they made us the market leader. 
            Their AI saw what we couldn't, and we moved before anyone else knew what hit them."
          </p>
          <p className="text-sm text-gray-400">- Sarah Chen, CEO of TechFlow Solutions</p>
        </div>
      </div>
    </div>
  )
}