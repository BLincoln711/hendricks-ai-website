import { Cpu, Network, Shield, Gauge } from 'lucide-react'

export default function TechnologySlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-black">
      {/* Tech Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-transparent to-purple-950/50"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Proprietary AI Technology</h2>
          <p className="text-xl text-gray-400">Years ahead of the competition</p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Neural Engine */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl p-8 border border-blue-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Neural Prediction Engine™</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Transformer-based architecture processing 2.8M+ signals daily</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Self-learning algorithms improve accuracy by 2% monthly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Multi-modal fusion of search, social, and market data</span>
              </li>
            </ul>
          </div>

          {/* Data Pipeline */}
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-sm rounded-xl p-8 border border-purple-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Network className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Real-time Data Pipeline</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>100+ integrated data sources updated every 15 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Processes 50TB of market signals monthly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>Sub-second latency from signal to insight</span>
              </li>
            </ul>
          </div>

          {/* Security */}
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 backdrop-blur-sm rounded-xl p-8 border border-green-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Enterprise Security</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>SOC 2 Type II certified infrastructure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>End-to-end encryption for all data flows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span>GDPR & CCPA compliant data handling</span>
              </li>
            </ul>
          </div>

          {/* Performance */}
          <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 backdrop-blur-sm rounded-xl p-8 border border-orange-700/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                <Gauge className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Performance at Scale</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>99.99% uptime SLA guarantee</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Handles 10M+ predictions per day</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>Auto-scaling infrastructure across 15 regions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Key Innovation */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6">
          <p className="text-2xl font-semibold mb-2">
            Our AI sees patterns humans can't, 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> 3 years</span> before they become obvious
          </p>
          <p className="text-gray-400">Protected by 7 patents with 12 more pending</p>
        </div>
      </div>
    </div>
  )
}