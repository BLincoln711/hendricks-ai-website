import { Brain, Award, Users, Building } from 'lucide-react'

export default function TeamSlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">The Minds Behind the Machine</h2>
          <p className="text-xl text-gray-400">World-class AI researchers and marketing veterans</p>
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
                    <p className="font-semibold">7 PhDs in AI/ML</p>
                    <p className="text-sm text-gray-400">From Stanford, MIT, and Carnegie Mellon</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">Former Google & Meta Engineers</p>
                    <p className="text-sm text-gray-400">Built ad platforms serving billions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">$2.3B in managed ad spend</p>
                    <p className="text-sm text-gray-400">Across 500+ enterprise accounts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold">17 marketing industry awards</p>
                    <p className="text-sm text-gray-400">Including AdWeek's Innovation Award</p>
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
                  <div className="text-3xl font-bold text-orange-400">Inc 500</div>
                  <div className="text-sm text-gray-400">Fastest Growing</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">#1</div>
                  <div className="text-sm text-gray-400">AI Marketing Platform</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Leadership & Values */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Leadership</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-1">Brandon Hendricks</h4>
                  <p className="text-blue-400 mb-2">Founder & CEO</p>
                  <p className="text-sm text-gray-400">
                    Former Google Performance Max product lead. Built predictive systems 
                    processing $100M+ in daily ad spend.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">Dr. Sarah Chen</h4>
                  <p className="text-purple-400 mb-2">Chief AI Officer</p>
                  <p className="text-sm text-gray-400">
                    MIT PhD, published 40+ papers on predictive modeling. Led AI research 
                    at DeepMind.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">Marcus Rodriguez</h4>
                  <p className="text-green-400 mb-2">Chief Revenue Officer</p>
                  <p className="text-sm text-gray-400">
                    20+ years in digital marketing. Scaled 3 agencies to $50M+ ARR.
                  </p>
                </div>
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
            <div className="text-2xl font-bold">87</div>
            <div className="text-sm text-gray-400">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-gray-400">Global Offices</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm text-gray-400">Support Coverage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">99.99%</div>
            <div className="text-sm text-gray-400">Platform Uptime</div>
          </div>
        </div>
      </div>
    </div>
  )
}