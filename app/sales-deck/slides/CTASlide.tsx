import { Calendar, Mail, ArrowRight, Clock, Star } from 'lucide-react'

export default function CTASlide() {
  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-purple-950 to-black">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-30 animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-8">
        {/* Urgency Banner */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-900/30 border border-red-800/50 rounded-full text-red-400 mb-8">
          <Clock className="w-5 h-5 animate-pulse" />
          <span className="font-medium">Limited Availability - Only 3 Slots Left This Quarter</span>
        </div>

        {/* Main CTA */}
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
          Ready to See the Future?
        </h2>
        
        <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          While your competitors react to yesterday's data, 
          you'll be capturing tomorrow's demand
        </p>

        {/* Primary CTA Button */}
        <div className="mb-12">
          <a
            href="https://calendar.app.google/DHopiSfnLiH5xwKo9"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
          >
            <span className="relative z-10">Book Your Strategy Call</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <p className="text-sm text-gray-400 mt-4">
            Free 30-minute consultation • No obligation • $10K value
          </p>
        </div>

        {/* What You'll Get */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 mb-12 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">In Your Free Strategy Call, You'll Get:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
              <span className="text-gray-300">Custom AI prediction for your market</span>
            </div>
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
              <span className="text-gray-300">Competitor blind spot analysis</span>
            </div>
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
              <span className="text-gray-300">90-day growth roadmap</span>
            </div>
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
              <span className="text-gray-300">ROI projection for your business</span>
            </div>
          </div>
        </div>

        {/* Alternative Contact Options */}
        <div className="space-y-4">
          <p className="text-gray-400">Prefer to reach out directly?</p>
          <div className="flex items-center justify-center">
            <a href="mailto:growth@hendricks.ai" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <Mail className="w-5 h-5" />
              <span>growth@hendricks.ai</span>
            </a>
          </div>
        </div>

        {/* Final Message */}
        <div className="mt-16 p-6 border border-gray-800 rounded-xl bg-gray-900/30">
          <p className="text-xl font-semibold mb-2">
            Every day you wait is another day your competitors could discover this advantage
          </p>
          <p className="text-gray-400">
            Join 127 companies already predicting (and capturing) future demand
          </p>
        </div>

        {/* Guarantee Badge */}
        <div className="mt-8 inline-flex items-center gap-2 text-sm text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>100% ROI Guarantee • No Setup Fees • Cancel Anytime</span>
        </div>
      </div>
    </div>
  )
}