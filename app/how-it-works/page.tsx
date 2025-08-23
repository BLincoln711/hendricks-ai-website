'use client'

import Link from 'next/link'
import Script from 'next/script'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import LLMSEOBlock from '../components/llm-seo-block'
import { BreadcrumbSchema } from '../components/seo-improvements'

export default function HowItWorksPage() {
  // Schema markup for How It Works page
  const howItWorksSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How Search Intelligence Works - Hendricks.AI',
    description: 'Learn how Hendricks.AI unifies Google & Bing into one AI-driven Search Intelligence System for B2B SaaS pipeline growth.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Data Unification',
        text: 'Connect Google Ads and Bing Ads accounts to unify data into one system'
      },
      {
        '@type': 'HowToStep',
        name: 'AI Analysis',
        text: 'Our AI analyzes B2B search patterns to predict demand 2-4 weeks early'
      },
      {
        '@type': 'HowToStep',
        name: 'Unified Execution',
        text: 'System orchestrates both platforms as one to eliminate channel conflict'
      }
    ]
  }

  const llmSeoData = {
    title: 'How Search Intelligence Works - The Hendricks.AI System',
    description: 'Discover how Hendricks.AI unifies Google & Bing into one AI-driven Search Intelligence System. Learn about our three-module approach: Prediction, Proof, and Performance for B2B SaaS growth.',
    keywords: [
      'Search Intelligence system',
      'how Google Bing unification works',
      'B2B demand prediction process',
      'AI search marketing',
      'unified search management'
    ],
    faqs: [
      {
        question: 'How does Search Intelligence unify Google and Bing?',
        answer: 'Our AI treats Google and Bing as one search market, orchestrating campaigns across both platforms simultaneously to eliminate budget competition and improve efficiency by 67%.'
      },
      {
        question: 'How accurate are the B2B demand predictions?',
        answer: 'Our Search Intelligence System achieves 74% accuracy in predicting B2B search demand 2-4 weeks in advance, validated across thousands of campaigns.'
      },
      {
        question: 'What makes this different from traditional PPC management?',
        answer: 'Traditional management runs Google and Bing separately. Search Intelligence unifies them with AI, predicts demand before it happens, and connects search directly to pipeline.'
      }
    ],
    quickFacts: [
      'Unifies Google & Bing into one system',
      '74% prediction accuracy',
      '2-4 weeks advance demand visibility',
      '67% efficiency improvement',
      'Built specifically for B2B SaaS'
    ]
  }

  return (
    <>
      <Script
        id="how-it-works-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howItWorksSchema)
        }}
      />
      <BreadcrumbSchema 
        items={[
          { name: 'Home', url: 'https://hendricks.ai' },
          { name: 'How It Works', url: 'https://hendricks.ai/how-it-works' }
        ]} 
      />
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-full text-sm text-blue-400 mb-6">
              <span>THE HENDRICKS.AI SYSTEM</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="text-white">How </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Search Intelligence
              </span>
              <span className="text-white"> Works</span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-semibold">
              One System. Three Modules. Unified Results.
            </p>
            <p className="text-xl text-purple-400 mt-4 font-bold">
              Prediction. Proof. Performance.
            </p>
          </div>
        </div>
      </section>

      {/* LLM SEO Block */}
      <LLMSEOBlock {...llmSeoData} />

      {/* The Problem */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                The Problem: Search in Silos
              </span>
            </h2>
            
            <div className="bg-red-950/20 p-8 rounded-2xl border border-red-900/50 mb-12">
              <p className="text-lg text-gray-300 mb-6">
                Most B2B SaaS companies run Google Ads and Bing Ads as completely separate channels:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Different teams or agencies managing each</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Competing against yourself for keywords</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>No unified view of search performance</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Duplicate work and overhead costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Reactive to trends, not predictive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Can't prove true incremental ROI</span>
                  </li>
                </ul>
              </div>
              <p className="text-xl font-semibold text-red-400 mt-6 text-center">
                Result: You're leaving 67% efficiency gains on the table.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                The Solution: Search Intelligence
              </span>
            </h2>
            
            <div className="bg-green-950/20 p-8 rounded-2xl border border-green-900/50">
              <p className="text-lg text-gray-300 mb-6">
                Hendricks.AI treats Google and Bing as one unified search market:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Unified Data Layer</h3>
                    <p className="text-gray-300">Connect both platforms to our AI system for real-time data unification and cross-channel insights.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">AI Prediction Engine</h3>
                    <p className="text-gray-300">Our AI analyzes patterns to predict B2B demand 2-4 weeks before it materializes with 74% accuracy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Orchestrated Execution</h3>
                    <p className="text-gray-300">System automatically allocates budget and bids across both platforms to maximize pipeline impact.</p>
                  </div>
                </div>
              </div>
              <p className="text-xl font-semibold text-green-400 mt-6 text-center">
                Result: 312% average ROI improvement for B2B SaaS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Modules Deep Dive */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Three-Module System
            </span>
          </h2>

          <div className="space-y-16">
            {/* Module 1: Prediction */}
            <div className="bg-gradient-to-br from-blue-900/20 to-transparent p-8 rounded-2xl border border-blue-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">🔮</div>
                <div>
                  <div className="text-sm font-bold text-blue-400">MODULE 1: PREDICT</div>
                  <h3 className="text-2xl font-bold">Demand Radar Pilot</h3>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-white mb-3">How It Works:</h4>
                  <ol className="space-y-2 text-gray-300">
                    <li>1. Connect Google Ads & Bing Ads accounts</li>
                    <li>2. AI ingests historical data + market signals</li>
                    <li>3. Machine learning identifies demand patterns</li>
                    <li>4. Receive weekly predictions & recommendations</li>
                    <li>5. Act on opportunities before competition</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3">What You Get:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• 2-4 week demand forecasts</li>
                    <li>• Keyword opportunity alerts</li>
                    <li>• Competitive gap analysis</li>
                    <li>• Budget allocation recommendations</li>
                    <li>• Weekly strategy sessions</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-950/30 rounded-lg">
                <p className="text-sm text-gray-300">
                  <strong className="text-blue-400">Ideal for:</strong> B2B SaaS companies wanting to get ahead of demand and capture opportunities before competitors.
                </p>
              </div>
            </div>

            {/* Module 2: Proof */}
            <div className="bg-gradient-to-br from-purple-900/20 to-transparent p-8 rounded-2xl border border-purple-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">📊</div>
                <div>
                  <div className="text-sm font-bold text-purple-400">MODULE 2: PROVE</div>
                  <h3 className="text-2xl font-bold">Search ROI Audit</h3>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-white mb-3">How It Works:</h4>
                  <ol className="space-y-2 text-gray-300">
                    <li>1. Audit current Google & Bing performance</li>
                    <li>2. Implement unified attribution tracking</li>
                    <li>3. Run incrementality experiments</li>
                    <li>4. Connect search to pipeline & revenue</li>
                    <li>5. Deliver CFO-ready ROI report</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3">What You Get:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• True incremental ROI analysis</li>
                    <li>• Multi-touch attribution setup</li>
                    <li>• Channel conflict identification</li>
                    <li>• Pipeline impact measurement</li>
                    <li>• Executive presentation deck</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-purple-950/30 rounded-lg">
                <p className="text-sm text-gray-300">
                  <strong className="text-purple-400">Ideal for:</strong> Teams needing to prove search ROI to leadership and secure budget for growth.
                </p>
              </div>
            </div>

            {/* Module 3: Performance */}
            <div className="bg-gradient-to-br from-cyan-900/20 to-transparent p-8 rounded-2xl border border-cyan-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">🚀</div>
                <div>
                  <div className="text-sm font-bold text-cyan-400">MODULE 3: PERFORM</div>
                  <h3 className="text-2xl font-bold">Performance Retainer</h3>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-white mb-3">How It Works:</h4>
                  <ol className="space-y-2 text-gray-300">
                    <li>1. Onboard accounts to unified system</li>
                    <li>2. AI orchestrates cross-channel campaigns</li>
                    <li>3. Real-time budget optimization</li>
                    <li>4. Continuous prediction & adjustment</li>
                    <li>5. Weekly performance optimization</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3">What You Get:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Full Google Ads management</li>
                    <li>• Full Bing Ads management</li>
                    <li>• Unified budget optimization</li>
                    <li>• AI bid management</li>
                    <li>• Pipeline-focused reporting</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-cyan-950/30 rounded-lg">
                <p className="text-sm text-gray-300">
                  <strong className="text-cyan-400">Ideal for:</strong> B2B SaaS companies ready to unify their search channels and scale with intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Technology Behind Search Intelligence
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold mb-3">AI & Machine Learning</h3>
              <p className="text-gray-300">
                Advanced neural networks trained on millions of B2B search patterns to predict demand with 74% accuracy.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-bold mb-3">API Integrations</h3>
              <p className="text-gray-300">
                Direct connections to Google Ads, Bing Ads, Salesforce, HubSpot, and your tech stack for real-time data flow.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Predictive Analytics</h3>
              <p className="text-gray-300">
                Proprietary algorithms that identify micro-patterns in B2B search behavior before they become trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Getting Started is Simple
            </span>
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-400 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Book Your Strategy Session</h3>
                <p className="text-gray-300">30-minute call to understand your B2B SaaS goals and current search challenges.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Choose Your Starting Module</h3>
                <p className="text-gray-300">Start with Prediction, Proof, or Performance based on your biggest need.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-cyan-400 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Connect Your Accounts</h3>
                <p className="text-gray-300">Secure API connections to Google Ads, Bing Ads, and your CRM.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-400 font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Start Seeing Results</h3>
                <p className="text-gray-300">Begin receiving predictions and watch your pipeline grow with unified search intelligence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 opacity-50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Unify Your Search?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            Join the B2B SaaS leaders using Search Intelligence to predict demand and unify their search channels.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Book Your Strategy Session
            </Link>
            <Link 
              href="/demo" 
              className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              See Live Demo
            </Link>
          </div>
          
          <p className="text-2xl font-bold text-purple-400 mt-8">
            Prediction. Proof. Performance.
          </p>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}