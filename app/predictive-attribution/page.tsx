'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, Zap, Target, Brain, ArrowRight } from 'lucide-react'

export default function PredictiveAttributionPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/hendricks_logo.png" 
                alt="Hendricks.AI" 
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/solutions" className="text-gray-300 hover:text-white transition-colors">Solutions</Link>
              <Link href="/predictive-attribution" className="text-white font-semibold">Attribution</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative"
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-full text-sm text-blue-400 mb-6">
              <BarChart3 className="w-4 h-4" />
              <span>Predictive Attribution & Modern Measurement</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                See Attribution Future,
              </span>
              <br />
              <span>Not Attribution History</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              While others measure what happened, we predict what will happen. 
              Combine Google's modern measurement principles with AI that forecasts 
              channel performance and incrementality 2-4 weeks in advance.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105"
              >
                Get Predictive Attribution Audit
              </Link>
              <Link 
                href="/news/modern-measurement-meets-predictive-ai"
                className="px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
              >
                Read Brandformance Insights
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              Traditional Attribution's Fatal Flaw
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-black/50 p-8 rounded-xl border border-red-900/50">
                <h3 className="text-2xl font-bold mb-4 text-red-400">
                  Even "Modern" Attribution
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Tells you which channels worked yesterday</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Measures incrementality after spending</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Optimizes based on historical performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>Reacts to market changes</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-black/50 p-8 rounded-xl border border-green-900/50">
                <h3 className="text-2xl font-bold mb-4 text-green-400">
                  Predictive Attribution
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Predicts which channels will work tomorrow</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Forecasts incrementality before spending</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Optimizes for future performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Anticipates market changes</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              The Predictive Attribution Advantage
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-xl border border-blue-500/20">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Demand Prediction</h3>
                <p className="text-gray-300">
                  AI analyzes 2.8M daily signals to identify emerging demand patterns 
                  2-4 weeks before they materialize in search and social data.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 rounded-xl border border-purple-500/20">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Channel Forecast</h3>
                <p className="text-gray-300">
                  Predicts which channels will be most effective at capturing 
                  specific demand patterns based on historical incrementality data.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 p-8 rounded-xl border border-green-500/20">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Incremental Impact</h3>
                <p className="text-gray-300">
                  Forecasts the incremental lift each channel will deliver, 
                  allowing optimal budget allocation before spending.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              Real Results: Predictive Attribution in Action
            </h2>
            
            <div className="bg-black/50 p-8 rounded-xl border border-gray-800">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-blue-400">
                    E-commerce Client Case Study
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Our AI predicted a surge in sustainable home products demand 
                    3 weeks before it appeared in search data. More importantly, 
                    we predicted which channels would capture it most effectively.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Google Shopping</span>
                      <span className="text-green-400">+41% incremental lift</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">YouTube</span>
                      <span className="text-green-400">+31% incremental lift</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Meta</span>
                      <span className="text-green-400">+14% incremental lift</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">TikTok</span>
                      <span className="text-green-400">+12% incremental lift</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-green-400 mb-4">287%</div>
                    <p className="text-xl text-gray-300 mb-2">More Demand Captured</p>
                    <p className="text-gray-400">vs. competitors using traditional attribution</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              Works With Your Existing Stack
            </h2>
            
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-12 rounded-2xl border border-blue-500/20">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Measurement Platforms</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <span className="text-blue-400">✓</span>
                      Google Analytics 4 & Attribution
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-blue-400">✓</span>
                      Google Ads Data-Driven Attribution
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-blue-400">✓</span>
                      Meta Attribution & Conversions API
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-blue-400">✓</span>
                      Third-party MMM platforms
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6">What We Add</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <span className="text-purple-400">+</span>
                      2-4 week demand predictions
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-purple-400">+</span>
                      Channel performance forecasts
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-purple-400">+</span>
                      Incremental lift predictions
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-purple-400">+</span>
                      Proactive optimization signals
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Predict Your Attribution Future?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Stop reacting to yesterday's data. Start preparing for tomorrow's opportunities.
              Get your free Predictive Attribution Audit and see what you're missing.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105"
              >
                Get Free Attribution Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/demo"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
              >
                See Live Demo
                <TrendingUp className="w-5 h-5" />
              </Link>
            </div>
            
            <p className="mt-8 text-sm text-gray-500">
              Average client sees 312% ROI improvement in 90 days
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}