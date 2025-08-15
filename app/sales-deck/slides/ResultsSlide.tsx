import { ArrowUpRight, Award, Users, DollarSign } from 'lucide-react'

export default function ResultsSlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Proven Results That Matter</h2>
          <p className="text-xl text-gray-400">Real clients. Real revenue. Real ROI.</p>
        </div>

        {/* Main Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-6 text-center border border-green-700/50">
            <ArrowUpRight className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-green-400 mb-2">312%</div>
            <div className="text-gray-400">Average ROI</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-6 text-center border border-blue-700/50">
            <Award className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-blue-400 mb-2">74%</div>
            <div className="text-gray-400">Prediction Accuracy</div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-xl p-6 text-center border border-purple-700/50">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-purple-400 mb-2">47%</div>
            <div className="text-gray-400">Lower CAC</div>
          </div>
          <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 rounded-xl p-6 text-center border border-orange-700/50">
            <DollarSign className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-400 mb-2">$4.2M</div>
            <div className="text-gray-400">Avg. Annual Value</div>
          </div>
        </div>

        {/* Client Results */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-center mb-6">Client Success Stories</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* B2B SaaS */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">B2B SaaS</div>
              <div className="text-xl font-semibold mb-4">Enterprise Software Co.</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Lead Volume</span>
                  <span className="text-green-400 font-semibold">+384%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Cost per Lead</span>
                  <span className="text-green-400 font-semibold">-62%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Pipeline Value</span>
                  <span className="text-green-400 font-semibold">+$12.4M</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-2xl font-bold text-green-400">427% ROI</div>
                <div className="text-sm text-gray-400">in 6 months</div>
              </div>
            </div>

            {/* E-commerce */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">E-commerce</div>
              <div className="text-xl font-semibold mb-4">Fashion Retailer</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Revenue</span>
                  <span className="text-green-400 font-semibold">+156%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">ROAS</span>
                  <span className="text-green-400 font-semibold">8.3x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Conv. Rate</span>
                  <span className="text-green-400 font-semibold">+89%</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-2xl font-bold text-green-400">298% ROI</div>
                <div className="text-sm text-gray-400">in 4 months</div>
              </div>
            </div>

            {/* Healthcare */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">Healthcare</div>
              <div className="text-xl font-semibold mb-4">Medical Device Mfg.</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Qualified Leads</span>
                  <span className="text-green-400 font-semibold">+234%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sales Cycle</span>
                  <span className="text-green-400 font-semibold">-38%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Deal Size</span>
                  <span className="text-green-400 font-semibold">+67%</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-2xl font-bold text-green-400">512% ROI</div>
                <div className="text-sm text-gray-400">in 8 months</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="text-lg text-gray-400">
            Join <span className="text-white font-semibold">127 companies</span> already using predictive demand intelligence
          </p>
        </div>
      </div>
    </div>
  )
}