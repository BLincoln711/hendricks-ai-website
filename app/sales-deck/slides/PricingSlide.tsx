import { Check, Sparkles, Zap, Crown } from 'lucide-react'

export default function PricingSlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold mb-4">Investment Options</h2>
          <p className="text-xl text-gray-400">Choose the plan that fits your growth trajectory</p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Growth Tier */}
          <div className="relative bg-gray-900/50 rounded-xl p-8 border border-gray-800 hover:border-blue-800/50 transition-all">
            <div className="absolute -top-3 left-8 px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
              Most Popular
            </div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold">Growth</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">For ambitious teams ready to scale</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$10K</span>
                <span className="text-gray-400">/month</span>
              </div>
              <div className="text-sm text-gray-400 mb-6">+ 20% of ad spend</div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">AI demand prediction (2-3 weeks)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Google Performance Max optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Weekly strategy calls</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Real-time performance dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Dedicated success manager</span>
              </li>
            </ul>

            <div className="text-center">
              <div className="text-sm text-gray-400">Typical client achieves</div>
              <div className="text-2xl font-bold text-blue-400">287% ROI</div>
            </div>
          </div>

          {/* Scale Tier */}
          <div className="relative bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-purple-700/50 transform scale-105 shadow-2xl">
            <div className="absolute -top-3 left-8 px-4 py-1 bg-purple-600 text-white text-sm font-medium rounded-full">
              Best Value
            </div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold">Scale</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">For market leaders and disruptors</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$25K</span>
                <span className="text-gray-400">/month</span>
              </div>
              <div className="text-sm text-gray-400 mb-6">+ 18% of ad spend</div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Everything in Growth, plus:</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Advanced AI prediction (3-4 weeks)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Bing Performance Max included</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Custom AI model training</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Competitor intelligence reports</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Priority 24/7 support</span>
              </li>
            </ul>

            <div className="text-center">
              <div className="text-sm text-gray-400">Typical client achieves</div>
              <div className="text-2xl font-bold text-purple-400">348% ROI</div>
            </div>
          </div>

          {/* Enterprise Tier */}
          <div className="relative bg-gray-900/50 rounded-xl p-8 border border-gray-800 hover:border-orange-800/50 transition-all">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-orange-400" />
                <h3 className="text-2xl font-bold">Enterprise</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">For category dominators</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <div className="text-sm text-gray-400 mb-6">Performance-based pricing</div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Everything in Scale, plus:</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">White-glove implementation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Custom integrations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Dedicated AI research team</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Board-ready reporting</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">SLA guarantees</span>
              </li>
            </ul>

            <div className="text-center">
              <div className="text-sm text-gray-400">Typical client achieves</div>
              <div className="text-2xl font-bold text-orange-400">427% ROI</div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-10">
          <p className="text-lg text-gray-400 mb-2">All plans include:</p>
          <p className="text-xl">
            No setup fees • Month-to-month • Cancel anytime • ROI guarantee
          </p>
        </div>
      </div>
    </div>
  )
}