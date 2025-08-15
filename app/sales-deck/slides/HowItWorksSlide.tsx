import { Database, Brain, TrendingUp, Rocket } from 'lucide-react'

export default function HowItWorksSlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">How Hendricks.AI Works</h2>
          <p className="text-xl text-gray-400">From data to dollars in 4 simple steps</p>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 transform -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50 hover:border-blue-600 transition-all">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">1. Data Ingestion</h3>
                <p className="text-gray-400 text-sm text-center">
                  Continuously monitors 100+ data sources including search trends, social signals, 
                  and market indicators
                </p>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                Real-time
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-800/50 hover:border-purple-600 transition-all">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">2. AI Analysis</h3>
                <p className="text-gray-400 text-sm text-center">
                  Proprietary AI models identify emerging patterns and predict demand surges 
                  with 74% accuracy
                </p>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                2-4 weeks early
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-pink-900/30 backdrop-blur-sm rounded-xl p-6 border border-pink-800/50 hover:border-pink-600 transition-all">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">3. Strategy Creation</h3>
                <p className="text-gray-400 text-sm text-center">
                  Automatically generates campaigns, keywords, and creatives optimized for 
                  predicted demand
                </p>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white text-xs px-3 py-1 rounded-full">
                Fully automated
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="bg-green-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-800/50 hover:border-green-600 transition-all">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">4. Launch & Scale</h3>
                <p className="text-gray-400 text-sm text-center">
                  Deploy across Google & Bing Performance Max, capturing demand before 
                  competitors react
                </p>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                312% ROI
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Visual */}
        <div className="mt-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">The Competitive Timeline</h3>
          <div className="relative h-20">
            {/* Timeline Bar */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-800 rounded-full transform -translate-y-1/2"></div>
            
            {/* Hendricks Point */}
            <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium">
                Hendricks.AI Predicts
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                Week 0
              </div>
            </div>
            
            {/* Demand Point */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium">
                Demand Materializes
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                Week 2-4
              </div>
            </div>
            
            {/* Competitors Point */}
            <div className="absolute left-3/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium">
                Competitors React
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                Week 5-6
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}