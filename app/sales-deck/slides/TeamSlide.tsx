import { Brain, Award, Users, Building } from 'lucide-react'

export default function TeamSlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">The Mind Behind the Machine</h2>
          <p className="text-xl text-gray-400">Where AI expertise meets marketing mastery</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Credentials */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Brain className="w-8 h-8 text-blue-400" />
                Our Expertise
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">Former Global Lead of Total Search at SolarWinds</p>
                    <p className="text-sm text-gray-400">Managed enterprise-scale campaigns and strategy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">Early OpenAI Beta Access Since GPT-3</p>
                    <p className="text-sm text-gray-400">Built production AI systems before the hype</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">10,000+ B2B Buying Journeys Analyzed</p>
                    <p className="text-sm text-gray-400">Deep understanding of buyer behavior patterns</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">74% Prediction Accuracy Achieved</p>
                    <p className="text-sm text-gray-400">Proven system for forecasting market demand</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-orange-400" />
                Recognition
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">312%</div>
                  <div className="text-sm text-gray-400">Average Client ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">2-4 Weeks</div>
                  <div className="text-sm text-gray-400">Demand Prediction Lead</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Leadership & Values */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Leadership</h3>
              <div>
                <h4 className="text-xl font-semibold mb-1">Brandon Lincoln Hendricks</h4>
                <p className="text-blue-400 mb-2">Founder & CEO</p>
                <p className="text-sm text-gray-400 mb-4">
                  Former Global Lead of Total Search at SolarWinds. Pioneered the use of 
                  predictive AI in B2B marketing, achieving breakthrough results by identifying 
                  demand signals 2-4 weeks before competitors.
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Early adopter of OpenAI technology, with beta access since GPT-3. Built 
                  production AI systems that process 2.8M signals daily to predict market movements.
                </p>
                <p className="text-sm text-gray-400">
                  Analyzed over 10,000 B2B buying journeys to understand the chaos of modern 
                  purchasing behavior, leading to the development of Hendricks.AI's predictive engine.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Users className="w-8 h-8 text-green-400" />
                Our Promise
              </h3>
              <p className="text-lg leading-relaxed text-gray-300">
                "We're not just another agency. We're your competitive advantage. 
                Our AI sees what others can't, and our team ensures you capitalize 
                on every opportunity before your competition even knows it exists."
              </p>
              <p className="text-sm text-gray-400 mt-4">- Brandon Hendricks, Founder</p>
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <Building className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">2.8M</div>
            <div className="text-sm text-gray-400">Daily Signals Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">74%</div>
            <div className="text-sm text-gray-400">Prediction Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">312%</div>
            <div className="text-sm text-gray-400">Average ROI</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">2-4 Weeks</div>
            <div className="text-sm text-gray-400">Ahead of Market</div>
          </div>
        </div>
      </div>
    </div>
  )
}