import { Calendar, CheckCircle, Rocket, TrendingUp } from 'lucide-react'

export default function TimelineSlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-950 via-purple-950 to-black">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Your Journey to Market Leadership</h2>
          <p className="text-xl text-gray-400">From onboarding to domination in 90 days</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-green-600"></div>

          {/* Week 1 */}
          <div className="relative flex items-center mb-12">
            <div className="flex-1 text-right pr-8">
              <h3 className="text-2xl font-semibold mb-2">Onboarding & Discovery</h3>
              <p className="text-gray-400">Deep dive into your business, market analysis, AI model calibration</p>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center z-10">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 pl-8">
              <div className="bg-blue-900/30 rounded-lg p-4 inline-block">
                <p className="font-semibold">Week 1</p>
              </div>
            </div>
          </div>

          {/* Week 2-3 */}
          <div className="relative flex items-center mb-12">
            <div className="flex-1 text-right pr-8">
              <div className="bg-purple-900/30 rounded-lg p-4 inline-block ml-auto">
                <p className="font-semibold">Week 2-3</p>
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center z-10">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 pl-8">
              <h3 className="text-2xl font-semibold mb-2">First Predictions Live</h3>
              <p className="text-gray-400">AI identifies first demand signals, initial campaigns launched</p>
            </div>
          </div>

          {/* Week 4-6 */}
          <div className="relative flex items-center mb-12">
            <div className="flex-1 text-right pr-8">
              <h3 className="text-2xl font-semibold mb-2">Optimization Phase</h3>
              <p className="text-gray-400">Campaign refinement, scale winning strategies, expand reach</p>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center z-10">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 pl-8">
              <div className="bg-pink-900/30 rounded-lg p-4 inline-block">
                <p className="font-semibold">Week 4-6</p>
              </div>
            </div>
          </div>

          {/* Week 8-12 */}
          <div className="relative flex items-center">
            <div className="flex-1 text-right pr-8">
              <div className="bg-green-900/30 rounded-lg p-4 inline-block ml-auto">
                <p className="font-semibold">Week 8-12</p>
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center z-10">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 pl-8">
              <h3 className="text-2xl font-semibold mb-2">Market Leadership</h3>
              <p className="text-gray-400">Dominating predicted demand, competitors playing catch-up</p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">24 hrs</div>
            <div className="text-sm text-gray-400">To first campaign</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">7 days</div>
            <div className="text-sm text-gray-400">To first prediction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">30 days</div>
            <div className="text-sm text-gray-400">To positive ROI</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">90 days</div>
            <div className="text-sm text-gray-400">To market leader</div>
          </div>
        </div>

        {/* Success Guarantee */}
        <div className="mt-12 text-center bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-6">
          <p className="text-2xl font-semibold mb-2">
            We're so confident, we guarantee results
          </p>
          <p className="text-gray-400">
            If you don't see positive ROI within 90 days, we work for free until you do
          </p>
        </div>
      </div>
    </div>
  )
}