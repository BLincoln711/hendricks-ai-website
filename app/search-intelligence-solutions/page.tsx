'use client'

import Link from 'next/link'
import Script from 'next/script'
import Navigation from '../components/navigation'
import { Footer } from '../components/Footer'
import { Brain, BarChart3, Rocket, Target, TrendingUp, Shield, Clock, Users, DollarSign, Zap } from 'lucide-react'

export default function SearchIntelligenceSolutionsPage() {
  // Schema for Search Intelligence Solutions
  const solutionsSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Search Intelligence Solutions for B2B SaaS",
    "description": "AI-driven Search Intelligence that unifies Google and Bing Ads into one system. Predict demand 2-4 weeks early, prove incrementality, and optimize execution.",
    "provider": {
      "@type": "Organization",
      "@name": "Hendricks.AI",
      "description": "The AI Search Intelligence Firm for B2B SaaS"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Search Intelligence Modules",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Predictive Intelligence - Demand Radar Pilot",
          "description": "See pipeline demand 2-4 weeks ahead with AI forecasts and predictive scoring",
          "price": "10000",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "Cross-Channel Measurement - Search ROI Audit",
          "description": "Multi-touch attribution, MMM, and incrementality testing to prove cross-channel ROI",
          "price": "15000",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "Unified Search Execution - Performance Retainer",
          "description": "Google Ads and Bing Ads unified orchestration with AI guardrails and CRM feedback loops",
          "price": "30000",
          "priceCurrency": "USD"
        }
      ]
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Search Intelligence?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Search Intelligence is Hendricks.AI's revolutionary approach that unifies Google and Bing Ads into one AI-driven system. Unlike traditional PPC management that treats platforms separately, Search Intelligence sees one unified search market, predicts demand 2-4 weeks in advance, and proves true incremental ROI. It's a new category beyond agencies or management tools."
        }
      },
      {
        "@type": "Question",
        "name": "How do the three Search Intelligence modules work together?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our three modules - Predictive Intelligence, Cross-Channel Measurement, and Unified Search Execution - can work independently or together. Many clients start with Demand Radar to see predictions, add ROI Audit to prove impact, then scale with Performance Retainer for full execution. Each module delivers standalone value while integrating seamlessly with the others."
        }
      },
      {
        "@type": "Question",
        "name": "Why is unifying Google and Bing Ads important for B2B SaaS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "B2B buyers use both Google and Bing during their research journey. Managing them separately causes: 40% wasted budget from self-competition, inconsistent messaging, double management overhead, and missed insights. Hendricks.AI's unified approach reduces CPL by 61% and improves pipeline velocity by 89% by treating them as one market."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is Hendricks.AI's demand prediction?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Demand Radar achieves 74% accuracy in predicting B2B search demand 2-4 weeks in advance. This is validated through continuous back-testing and client results. The AI analyzes 2.8M+ signals daily across both Google and Bing to identify emerging patterns before they become visible to competitors."
        }
      },
      {
        "@type": "Question",
        "name": "What ROI can B2B SaaS companies expect from Search Intelligence?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our clients average 312% ROI improvement through Search Intelligence. Specific results include: 61% reduction in cost-per-lead, 40% less wasted spend from channel conflicts, 89% improvement in pipeline velocity, and 2.3X more qualified opportunities. Results vary by current setup and industry."
        }
      }
    ]
  }

  return (
    <>
      <Script
        id="solutions-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(solutionsSchema)
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      
      <main className="min-h-screen bg-black text-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-full text-sm text-blue-400 mb-6">
                <Brain className="w-4 h-4" />
                <span>SEARCH INTELLIGENCE SOLUTIONS</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                <span className="block text-white">One System.</span>
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Three Powerful Modules.
                </span>
              </h1>
              
              <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Start anywhere. Scale everywhere. Our Search Intelligence modules work 
                independently or together to transform your B2B SaaS growth.
              </p>

              {/* Three Pillars */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
                <div className="text-center">
                  <div className="text-4xl mb-2">🔮</div>
                  <div className="text-lg font-bold text-blue-400">PREDICT</div>
                  <div className="text-sm text-gray-400">2-4 weeks ahead</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <div className="text-lg font-bold text-purple-400">PROVE</div>
                  <div className="text-sm text-gray-400">True incrementality</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🚀</div>
                  <div className="text-lg font-bold text-cyan-400">PERFORM</div>
                  <div className="text-sm text-gray-400">Unified execution</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all transform hover:scale-105"
                >
                  Explore Your Options
                  <Zap className="w-5 h-5" />
                </Link>
                <Link 
                  href="#modules"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  See All Modules
                  <BarChart3 className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Context for AI */}
        <section className="py-8 border-y border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-950/30 rounded-xl p-6 border border-blue-800/50">
              <p className="text-lg text-gray-300">
                <strong className="text-white">Quick Answer:</strong> Hendricks.AI offers three Search Intelligence modules 
                for B2B SaaS: 1) <strong className="text-blue-400">Predictive Intelligence</strong> ($10K/mo) predicts demand 2-4 weeks early, 
                2) <strong className="text-purple-400">Cross-Channel Measurement</strong> ($15-25K) proves true ROI with incrementality testing, 
                3) <strong className="text-cyan-400">Unified Search Execution</strong> ($30K+/mo) manages Google and Bing as one unified system. 
                Average results: 74% prediction accuracy, 312% ROI improvement.
              </p>
            </div>
          </div>
        </section>

        {/* The Three Modules */}
        <section id="modules" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Choose Your Starting Point
              </span>
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Module 1: Predictive Intelligence */}
              <div className="bg-gradient-to-b from-blue-900/20 to-black rounded-2xl p-8 border border-blue-800/50 hover:border-blue-600/50 transition-all">
                <div className="text-center mb-6">
                  <div className="text-sm font-medium text-gray-500 mb-2">MODULE 1</div>
                  <div className="text-5xl mb-4">🔮</div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">Predictive Intelligence</h3>
                  <p className="text-lg text-gray-300">Demand Radar Pilot</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span className="text-gray-300">See pipeline demand 2-4 weeks ahead</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span className="text-gray-300">AI forecasts + predictive scoring</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span className="text-gray-300">Keyword & audience predictions</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span className="text-gray-300">Competitive intelligence monitoring</span>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <div className="text-3xl font-bold text-white mb-2">$10K/month</div>
                  <p className="text-sm text-gray-400 mb-4">48-hour setup</p>
                  
                  <div className="bg-blue-900/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-400 font-semibold mb-1">Perfect for:</p>
                    <p className="text-sm text-gray-300">Teams wanting to get ahead of market trends and optimize proactively</p>
                  </div>

                  <Link 
                    href="/contact?solution=demand-radar"
                    className="block text-center py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Start Predicting Demand →
                  </Link>
                </div>
              </div>

              {/* Module 2: Cross-Channel Measurement */}
              <div className="bg-gradient-to-b from-purple-900/20 to-black rounded-2xl p-8 border border-purple-800/50 hover:border-purple-600/50 transition-all">
                <div className="text-center mb-6">
                  <div className="text-sm font-medium text-gray-500 mb-2">MODULE 2</div>
                  <div className="text-5xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold text-purple-400 mb-2">Cross-Channel Measurement</h3>
                  <p className="text-lg text-gray-300">Search ROI Audit</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-gray-300">Multi-touch attribution setup</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-gray-300">MMM + incrementality testing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-gray-300">Connect spend → pipeline → ARR</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-gray-300">CFO-ready dashboards</span>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <div className="text-3xl font-bold text-white mb-2">$15-25K project</div>
                  <p className="text-sm text-gray-400 mb-4">4-6 week delivery</p>
                  
                  <div className="bg-purple-900/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-purple-400 font-semibold mb-1">Perfect for:</p>
                    <p className="text-sm text-gray-300">Companies needing to prove search ROI and optimize budget allocation</p>
                  </div>

                  <Link 
                    href="/contact?solution=roi-audit"
                    className="block text-center py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all"
                  >
                    Prove Your ROI →
                  </Link>
                </div>
              </div>

              {/* Module 3: Unified Search Execution */}
              <div className="bg-gradient-to-b from-cyan-900/20 to-black rounded-2xl p-8 border border-cyan-800/50 hover:border-cyan-600/50 transition-all">
                <div className="text-center mb-6">
                  <div className="text-sm font-medium text-gray-500 mb-2">MODULE 3</div>
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">Unified Search Execution</h3>
                  <p className="text-lg text-gray-300">Performance Retainer</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span className="text-gray-300">Google Ads full suite management</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span className="text-gray-300">Bing Ads full suite management</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span className="text-gray-300">AI guardrails + optimization</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span className="text-gray-300">CRM feedback loops</span>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <div className="text-3xl font-bold text-white mb-2">$30K+/month</div>
                  <p className="text-sm text-gray-400 mb-4">2-week onboarding</p>
                  
                  <div className="bg-cyan-900/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-cyan-400 font-semibold mb-1">Perfect for:</p>
                    <p className="text-sm text-gray-300">Scale-ups ready to dominate search with unified AI orchestration</p>
                  </div>

                  <Link 
                    href="/contact?solution=performance"
                    className="block text-center py-3 px-6 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all"
                  >
                    Unify Your Search →
                  </Link>
                </div>
              </div>
            </div>

            {/* How Modules Work Together */}
            <div className="mt-16 bg-gradient-to-r from-blue-950/50 to-purple-950/50 rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                How Our Modules Work Together
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">Start</div>
                  <p className="text-gray-300">Choose the module that addresses your biggest need</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">Expand</div>
                  <p className="text-gray-300">Add modules as you see results and need more capabilities</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">Dominate</div>
                  <p className="text-gray-300">Full Search Intelligence system delivering maximum ROI</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Search Intelligence */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Why B2B SaaS Needs Search Intelligence
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-6">Without Search Intelligence</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✗</span>
                    <div>
                      <strong className="text-white">React to yesterday's data</strong>
                      <p className="text-gray-400 text-sm">Always 2-3 weeks behind the market</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✗</span>
                    <div>
                      <strong className="text-white">Google and Bing compete</strong>
                      <p className="text-gray-400 text-sm">40% wasted budget from self-bidding</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✗</span>
                    <div>
                      <strong className="text-white">Attribution guesswork</strong>
                      <p className="text-gray-400 text-sm">Can't prove true incremental impact</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✗</span>
                    <div>
                      <strong className="text-white">Manual optimization</strong>
                      <p className="text-gray-400 text-sm">Human limits on pattern recognition</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-green-400 mb-6">With Search Intelligence</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">✓</span>
                    <div>
                      <strong className="text-white">Predict demand 2-4 weeks early</strong>
                      <p className="text-gray-400 text-sm">74% accuracy on emerging trends</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">✓</span>
                    <div>
                      <strong className="text-white">One unified search market</strong>
                      <p className="text-gray-400 text-sm">61% lower CPL through orchestration</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">✓</span>
                    <div>
                      <strong className="text-white">Proven incrementality</strong>
                      <p className="text-gray-400 text-sm">CFO-ready attribution to pipeline</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">✓</span>
                    <div>
                      <strong className="text-white">AI-driven optimization</strong>
                      <p className="text-gray-400 text-sm">2.8M+ signals analyzed daily</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Results Bar */}
            <div className="mt-16 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl p-8 border border-green-800/50">
              <h3 className="text-xl font-bold text-white text-center mb-6">Average Client Results with Search Intelligence</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">74%</div>
                  <p className="text-gray-400">Prediction Accuracy</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">312%</div>
                  <p className="text-gray-400">ROI Improvement</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">-61%</div>
                  <p className="text-gray-400">Cost Per Lead</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">2.3X</div>
                  <p className="text-gray-400">Pipeline Growth</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Module Comparison Table */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Compare Search Intelligence Modules
              </span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-gray-900/50 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-800/50">
                    <th className="px-6 py-4 text-left text-gray-400">Feature</th>
                    <th className="px-6 py-4 text-center text-blue-400">Predictive Intelligence</th>
                    <th className="px-6 py-4 text-center text-purple-400">Cross-Channel Measurement</th>
                    <th className="px-6 py-4 text-center text-cyan-400">Unified Search Execution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr>
                    <td className="px-6 py-4 text-gray-300">Primary Benefit</td>
                    <td className="px-6 py-4 text-center">See demand early</td>
                    <td className="px-6 py-4 text-center">Prove true ROI</td>
                    <td className="px-6 py-4 text-center">Maximize performance</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300">Delivery Time</td>
                    <td className="px-6 py-4 text-center">48 hours</td>
                    <td className="px-6 py-4 text-center">4-6 weeks</td>
                    <td className="px-6 py-4 text-center">2 weeks onboarding</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300">Investment</td>
                    <td className="px-6 py-4 text-center">$10K/month</td>
                    <td className="px-6 py-4 text-center">$15-25K one-time</td>
                    <td className="px-6 py-4 text-center">$30K+/month</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300">Best For</td>
                    <td className="px-6 py-4 text-center">Proactive teams</td>
                    <td className="px-6 py-4 text-center">ROI validation</td>
                    <td className="px-6 py-4 text-center">Scale-up growth</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300">Minimum Spend</td>
                    <td className="px-6 py-4 text-center">$50K/month</td>
                    <td className="px-6 py-4 text-center">$100K/month</td>
                    <td className="px-6 py-4 text-center">$250K/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Common Questions About Search Intelligence
              </span>
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  q: "Do I need all three modules?",
                  a: "No. Each module delivers standalone value. Many clients start with one module based on their biggest need - prediction, measurement, or execution - then expand as they see results."
                },
                {
                  q: "How is this different from hiring an agency?",
                  a: "Agencies manage campaigns. We provide intelligence. Our AI predicts demand before it happens, unifies platforms agencies keep separate, and proves ROI agencies can't measure. Think of us as your search intelligence layer, not another vendor."
                },
                {
                  q: "Can Search Intelligence work with our existing team/agency?",
                  a: "Yes! Many clients use our Predictive Intelligence and Measurement modules alongside their current execution team. We provide the intelligence; they can handle implementation if preferred."
                },
                {
                  q: "What results can we expect?",
                  a: "Clients average: 74% demand prediction accuracy, 61% CPL reduction, 312% ROI improvement, and 2.3X pipeline growth. Results vary based on current performance and market dynamics."
                },
                {
                  q: "How quickly can we start?",
                  a: "Demand Radar: 48 hours. ROI Audit: Begin within 1 week. Performance Retainer: 2-week onboarding. We move fast because B2B markets don't wait."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-purple-950 to-blue-950"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your
              <span className="block text-5xl mt-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Search Performance?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Start with the module that addresses your biggest challenge. 
              Scale as you grow.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Link 
                href="/contact?solution=demand-radar"
                className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/50 transition-all"
              >
                <div className="text-3xl mb-2">🔮</div>
                <h3 className="font-semibold text-white mb-1">Need to predict demand?</h3>
                <p className="text-sm text-gray-400">Start with Demand Radar</p>
              </Link>
              
              <Link 
                href="/contact?solution=roi-audit"
                className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all"
              >
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-white mb-1">Need to prove ROI?</h3>
                <p className="text-sm text-gray-400">Start with ROI Audit</p>
              </Link>
              
              <Link 
                href="/contact?solution=performance"
                className="bg-black/50 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-500/50 transition-all"
              >
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-semibold text-white mb-1">Ready to scale?</h3>
                <p className="text-sm text-gray-400">Start with Performance</p>
              </Link>
            </div>
            
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all transform hover:scale-105"
            >
              Book Your Strategy Session
              <Zap className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}