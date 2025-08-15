import { Calculator, TrendingUp, DollarSign } from 'lucide-react'
import { useState } from 'react'

export default function ROISlide() {
  const [monthlySpend, setMonthlySpend] = useState(50000)
  const [currentConversion, setCurrentConversion] = useState(2.5)

  // Calculate ROI metrics
  const currentLeads = Math.round((monthlySpend / 100) * (currentConversion / 100))
  const predictedLeads = Math.round(currentLeads * 3.84) // 384% increase average
  const costPerLead = monthlySpend / currentLeads
  const newCostPerLead = monthlySpend / predictedLeads
  const monthlySavings = Math.round((costPerLead - newCostPerLead) * currentLeads)
  const yearlyROI = Math.round((monthlySavings * 12) / (monthlySpend * 0.3) * 100) // Assuming 30% service fee

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-800/50 rounded-full text-green-400 mb-4">
            <Calculator className="w-4 h-4" />
            <span className="text-sm font-medium">INTERACTIVE ROI CALCULATOR</span>
          </div>
          <h2 className="text-5xl font-bold mb-4">Your Potential ROI</h2>
          <p className="text-xl text-gray-400">See what predictive intelligence could mean for your business</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-gray-900/50 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Your Current Performance</h3>
            
            <div className="space-y-6">
              {/* Monthly Ad Spend */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Monthly Ad Spend
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-lg"
                  />
                </div>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="10000"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>

              {/* Current Conversion Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Current Conversion Rate (%)
                </label>
                <input
                  type="number"
                  value={currentConversion}
                  onChange={(e) => setCurrentConversion(Number(e.target.value))}
                  step="0.1"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-lg"
                />
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={currentConversion}
                  onChange={(e) => setCurrentConversion(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>

              {/* Current Metrics */}
              <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Leads/Month</span>
                  <span className="font-semibold">{currentLeads.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cost per Lead</span>
                  <span className="font-semibold">${costPerLead.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Your Predicted Results</h3>
            
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-green-400">{predictedLeads.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Leads/Month</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-blue-400">${newCostPerLead.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">Cost per Lead</div>
                </div>
              </div>

              {/* ROI Breakdown */}
              <div className="bg-gray-900/50 rounded-lg p-6 space-y-4">
                <h4 className="text-lg font-semibold mb-3">12-Month Projection</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Additional Leads Generated</span>
                    <span className="text-green-400 font-semibold">
                      +{((predictedLeads - currentLeads) * 12).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Cost Savings</span>
                    <span className="text-green-400 font-semibold">
                      ${(monthlySavings * 12).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Investment (30% of spend)</span>
                    <span className="text-gray-400">
                      ${(monthlySpend * 0.3 * 12).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Projected ROI</span>
                    <span className="text-3xl font-bold text-green-400">
                      {yearlyROI}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Note */}
              <p className="text-sm text-gray-400 text-center">
                * Based on average client results. Individual results may vary.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <p className="text-xl text-gray-300">
            Ready to see these results for your business?
          </p>
        </div>
      </div>
    </div>
  )
}