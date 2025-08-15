import { TrendingDown, AlertCircle, Clock, DollarSign } from 'lucide-react'

export default function ProblemSlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">The $2.3 Trillion Problem</h2>
          <p className="text-xl text-gray-400">Marketing teams are flying blind</p>
        </div>

        {/* Problem Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-900/20 backdrop-blur-sm rounded-xl p-8 border border-red-800/50">
            <div className="flex items-start gap-4">
              <TrendingDown className="w-12 h-12 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">67% Wasted Ad Spend</h3>
                <p className="text-gray-300 leading-relaxed">
                  Companies waste billions targeting customers who aren't ready to buy, 
                  while missing those who are actively searching.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-900/20 backdrop-blur-sm rounded-xl p-8 border border-orange-800/50">
            <div className="flex items-start gap-4">
              <Clock className="w-12 h-12 text-orange-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">Always Too Late</h3>
                <p className="text-gray-300 leading-relaxed">
                  By the time traditional analytics show demand, competitors have 
                  already captured the market opportunity.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/20 backdrop-blur-sm rounded-xl p-8 border border-yellow-800/50">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-12 h-12 text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">Reactive, Not Predictive</h3>
                <p className="text-gray-300 leading-relaxed">
                  Current tools only show what happened yesterday. Zero visibility 
                  into what's coming tomorrow.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-8 border border-purple-800/50">
            <div className="flex items-start gap-4">
              <DollarSign className="w-12 h-12 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">CAC Through the Roof</h3>
                <p className="text-gray-300 leading-relaxed">
                  Customer acquisition costs have increased 222% in the last 5 years 
                  as competition intensifies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stat */}
        <div className="text-center mt-12">
          <p className="text-3xl font-bold text-red-400">
            89% of CMOs say they lack predictive insights
          </p>
          <p className="text-gray-500 mt-2">Source: Gartner Marketing Survey 2024</p>
        </div>
      </div>
    </div>
  )
}