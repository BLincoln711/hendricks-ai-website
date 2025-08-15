import { Check, X } from 'lucide-react'

export default function ComparisonSlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold mb-4">The Clear Choice</h2>
          <p className="text-xl text-gray-400">Why forward-thinking companies choose Hendricks.AI</p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-xl border border-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-6 text-lg font-semibold bg-gray-900/50">Capability</th>
                <th className="p-6 text-lg font-semibold bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                  <div className="flex items-center justify-center gap-2">
                    <img src="/hendricks_logo.png" alt="Hendricks.AI" className="h-6 w-auto brightness-0 invert" />
                    <span>Hendricks.AI</span>
                  </div>
                </th>
                <th className="p-6 text-lg font-semibold bg-gray-900/50">Traditional Agencies</th>
                <th className="p-6 text-lg font-semibold bg-gray-900/50">In-House Teams</th>
              </tr>
            </thead>
            <tbody>
              {/* Predictive Capability */}
              <tr className="border-b border-gray-800/50">
                <td className="p-6 text-gray-300">Predict demand 2-4 weeks early</td>
                <td className="p-6 text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <Check className="w-6 h-6 text-green-400 mx-auto" />
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <X className="w-6 h-6 text-red-400 mx-auto" />
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <X className="w-6 h-6 text-red-400 mx-auto" />
                </td>
              </tr>

              {/* AI-Powered */}
              <tr className="border-b border-gray-800/50">
                <td className="p-6 text-gray-300">AI-powered optimization</td>
                <td className="p-6 text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <div className="text-sm text-gray-300">Proprietary AI</div>
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <div className="text-sm text-gray-500">Basic automation</div>
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <div className="text-sm text-gray-500">Manual</div>
                </td>
              </tr>

              {/* Speed */}
              <tr className="border-b border-gray-800/50">
                <td className="p-6 text-gray-300">Campaign launch time</td>
                <td className="p-6 text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <div className="text-green-400 font-semibold">&lt; 24 hours</div>
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <div className="text-gray-400">2-4 weeks</div>
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <div className="text-gray-400">1-2 weeks</div>
                </td>
              </tr>

              {/* Data Sources */}
              <tr className="border-b border-gray-800/50">
                <td className="p-6 text-gray-300">Data sources analyzed</td>
                <td className="p-6 text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <div className="text-blue-400 font-semibold">100+</div>
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <div className="text-gray-400">5-10</div>
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <div className="text-gray-400">3-5</div>
                </td>
              </tr>

              {/* ROI */}
              <tr className="border-b border-gray-800/50">
                <td className="p-6 text-gray-300">Average ROI</td>
                <td className="p-6 text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <div className="text-green-400 font-semibold">312%</div>
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <div className="text-gray-400">78%</div>
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <div className="text-gray-400">45%</div>
                </td>
              </tr>

              {/* Scalability */}
              <tr className="border-b border-gray-800/50">
                <td className="p-6 text-gray-300">Scalability</td>
                <td className="p-6 text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <div className="text-sm text-gray-300">Infinite</div>
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <div className="text-sm text-gray-500">Limited by team</div>
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <div className="text-sm text-gray-500">Limited by headcount</div>
                </td>
              </tr>

              {/* Cost */}
              <tr>
                <td className="p-6 text-gray-300">Cost structure</td>
                <td className="p-6 text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <div className="text-sm text-gray-300">Performance-based</div>
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <div className="text-sm text-gray-500">Retainer + %</div>
                </td>
                <td className="p-6 text-center bg-gray-900/30">
                  <div className="text-sm text-gray-500">Salaries + tools</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-10 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6">
          <p className="text-2xl font-semibold mb-2">
            Don't compete with yesterday's tools in tomorrow's market
          </p>
          <p className="text-gray-400">
            The future belongs to those who can see it coming
          </p>
        </div>
      </div>
    </div>
  )
}