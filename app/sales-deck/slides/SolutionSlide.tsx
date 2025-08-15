import { Sparkles, TrendingUp, Target, Zap } from 'lucide-react'

export default function SolutionSlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-950 via-purple-950 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-full text-blue-400 mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Introducing Hendricks.AI</span>
          </div>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            See Demand 2-4 Weeks Before It Happens
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The world's first AI system that predicts market demand with 74% accuracy, 
            giving you an unfair advantage over competitors
          </p>
        </div>

        {/* Core Capabilities */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-8 border border-blue-800/50 transform hover:scale-105 transition-all">
            <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Predictive Intelligence</h3>
            <p className="text-gray-300">
              Analyzes 2.8M+ data points daily across 100+ sources to identify demand 
              patterns before they materialize
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl p-8 border border-purple-800/50 transform hover:scale-105 transition-all">
            <Target className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Precision Targeting</h3>
            <p className="text-gray-300">
              Automatically optimizes Google & Bing Performance Max campaigns to capture 
              predicted demand at the perfect moment
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl p-8 border border-green-800/50 transform hover:scale-105 transition-all">
            <Zap className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Instant Activation</h3>
            <p className="text-gray-300">
              Deploy campaigns in minutes, not weeks. Our AI handles everything from 
              creative to bidding strategies
            </p>
          </div>
        </div>

        {/* Key Differentiator */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-8 mt-12 text-center">
          <h3 className="text-3xl font-bold mb-4">The Hendricks Advantage</h3>
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-blue-400">14-21</div>
              <div className="text-gray-400">Days head start</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">74%</div>
              <div className="text-gray-400">Accuracy rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400">312%</div>
              <div className="text-gray-400">Average ROI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}