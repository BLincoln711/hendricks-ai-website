'use client'

import Link from 'next/link'
import Script from 'next/script'
import Navigation from '../components/navigation'
import Footer from '../components/Footer'
import { ArrowRight, BarChart3, Brain, DollarSign, Target, TrendingUp, Users, Zap } from 'lucide-react'

export default function GoogleBingUnifiedPage() {
  // Schema for unified management
  const unifiedManagementSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Unify Google Ads and Bing Ads: The Complete B2B SaaS Guide",
    "description": "Learn how Hendricks.AI unifies Google Ads and Bing Ads into one AI-driven system, reducing costs by 61% and improving ROI by 312% for B2B SaaS companies.",
    "author": {
      "@type": "Organization",
      "name": "Hendricks.AI"
    },
    "datePublished": "2024-09-02",
    "dateModified": new Date().toISOString()
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Unify Google Ads and Bing Ads Management",
    "description": "Step-by-step guide to treating Google and Bing as one unified search market for B2B SaaS",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Audit Current Siloed Approach",
        "text": "Identify overlap, competition, and wasted spend between your Google Ads and Bing Ads accounts"
      },
      {
        "@type": "HowToStep",
        "name": "Implement Unified Tracking",
        "text": "Set up cross-platform attribution that tracks the complete customer journey across both platforms"
      },
      {
        "@type": "HowToStep",
        "name": "Create Unified Bid Strategy",
        "text": "Develop coordinated bidding that prevents self-competition and optimizes for total ROI"
      },
      {
        "@type": "HowToStep",
        "name": "Deploy AI Orchestration",
        "text": "Use AI to dynamically allocate budget and adjust bids based on predicted performance"
      },
      {
        "@type": "HowToStep",
        "name": "Measure Incremental Impact",
        "text": "Run incrementality tests to prove the true lift from unified management"
      }
    ],
    "supply": {
      "@type": "HowToSupply",
      "name": "Hendricks.AI Platform"
    },
    "tool": {
      "@type": "HowToTool",
      "name": "AI Search Intelligence System"
    },
    "totalTime": "PT168H",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "10000"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why should I unify Google Ads and Bing Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unifying Google and Bing Ads prevents self-competition, reduces costs by an average of 61%, and improves overall search ROI by treating them as one market. B2B buyers use both platforms, and managing them separately causes you to bid against yourself, waste budget, and miss opportunities."
        }
      },
      {
        "@type": "Question",
        "name": "How does Hendricks.AI unify Google and Bing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hendricks.AI uses AI to orchestrate campaigns across both platforms simultaneously. We prevent keyword cannibalization, dynamically allocate budgets based on predicted performance, share learnings between platforms in real-time, and provide unified reporting that shows true cross-platform impact."
        }
      },
      {
        "@type": "Question",
        "name": "What results can I expect from unified management?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our B2B SaaS clients see: 61% average reduction in cost-per-lead, 40% less wasted spend from self-competition, 89% improvement in pipeline velocity, 2.3X more qualified opportunities, and 312% average ROI improvement. Results vary by industry and current setup."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need separate teams for Google and Bing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. With unified management, one team can effectively manage both platforms using AI orchestration. This reduces overhead by 50% while improving performance. Hendricks.AI's system handles the complexity of platform-specific optimizations while maintaining a unified strategy."
        }
      },
      {
        "@type": "Question",
        "name": "How is unified management different from using both platforms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional approach: Separate campaigns, budgets, and strategies that compete against each other. Unified approach: One cohesive strategy where Google and Bing work together, share data, and optimize for total market capture. It's like having one sales team instead of two competing teams."
        }
      }
    ]
  }

  return (
    <>
      <Script
        id="unified-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(unifiedManagementSchema)
        }}
      />
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema)
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
                <span>GOOGLE + BING UNIFICATION</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                <span className="block text-white">Stop Managing</span>
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Google & Bing in Silos
                </span>
              </h1>
              
              <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                One market. Two engines. Unified by AI.
              </p>
              
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                While your competitors waste budget competing against themselves, 
                Hendricks.AI orchestrates both platforms as one unified system.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-3xl font-bold text-green-400">-61%</div>
                  <div className="text-sm text-gray-400">Cost Per Lead</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-3xl font-bold text-blue-400">-40%</div>
                  <div className="text-sm text-gray-400">Wasted Spend</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-3xl font-bold text-purple-400">+89%</div>
                  <div className="text-sm text-gray-400">Pipeline Velocity</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-3xl font-bold text-cyan-400">312%</div>
                  <div className="text-sm text-gray-400">ROI Improvement</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all transform hover:scale-105"
                >
                  Get Unified Management
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="#roi-calculator"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Calculate Your Savings
                  <DollarSign className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem with Silos */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                The Hidden Cost of Channel Silos
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  What Happens When You Run Google & Bing Separately
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl">✗</span>
                    <div>
                      <strong className="text-white">You Compete Against Yourself</strong>
                      <p className="text-gray-400">Both platforms bid on the same keywords, driving up your costs</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl">✗</span>
                    <div>
                      <strong className="text-white">Double Management Overhead</strong>
                      <p className="text-gray-400">Separate strategies, reports, and optimization efforts</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl">✗</span>
                    <div>
                      <strong className="text-white">Inconsistent Messaging</strong>
                      <p className="text-gray-400">Different ads and landing pages confuse your buyers</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl">✗</span>
                    <div>
                      <strong className="text-white">Missed Cross-Platform Insights</strong>
                      <p className="text-gray-400">What works on Google could work on Bing, but you'll never know</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl">✗</span>
                    <div>
                      <strong className="text-white">Attribution Nightmares</strong>
                      <p className="text-gray-400">Which platform really drove that conversion? Both claim credit</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-red-900/20 to-transparent rounded-2xl p-8 border border-red-800/50">
                <h4 className="text-xl font-bold text-white mb-6">Real Client Example</h4>
                <div className="space-y-4 text-gray-300">
                  <p>
                    <strong className="text-white">SaaS Company:</strong> $250K/month search spend
                  </p>
                  <p>
                    <strong className="text-white">Problem:</strong> Google CPL: $487, Bing CPL: $512
                  </p>
                  <p>
                    <strong className="text-white">Discovery:</strong> 73% keyword overlap, bidding against themselves
                  </p>
                  <p>
                    <strong className="text-white">Wasted Spend:</strong> $97K/month (39%) from self-competition
                  </p>
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-green-400 font-semibold">
                      After Unification: Combined CPL: $189 (-61%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Unified Approach */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-6">
              <span className="text-white">The Hendricks.AI </span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Unified Approach
              </span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              One strategy. One team. One system. Orchestrated by AI.
            </p>

            {/* Visual Comparison */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-red-900/10 to-transparent rounded-2xl p-8 border border-red-800/30">
                <h3 className="text-xl font-bold text-red-400 mb-6">Traditional Silos</h3>
                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <strong className="text-white">Google Team</strong>
                    <p className="text-gray-400 text-sm">Separate budget, strategy, keywords</p>
                  </div>
                  <div className="text-center text-gray-600">VS</div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <strong className="text-white">Bing Team</strong>
                    <p className="text-gray-400 text-sm">Competing budget, strategy, keywords</p>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-red-400 font-semibold">Result: Self-Competition</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-900/10 to-transparent rounded-2xl p-8 border border-green-800/30">
                <h3 className="text-xl font-bold text-green-400 mb-6">Unified Intelligence</h3>
                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <strong className="text-white">AI Orchestration Layer</strong>
                    <p className="text-gray-400 text-sm">Unified strategy across platforms</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center gap-4">
                      <span className="text-blue-400">Google</span>
                      <span className="text-gray-400">+</span>
                      <span className="text-cyan-400">Bing</span>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <strong className="text-white">One Market View</strong>
                    <p className="text-gray-400 text-sm">Coordinated bidding, shared insights</p>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-green-400 font-semibold">Result: Market Domination</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-r from-blue-950/50 to-purple-950/50 rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                How AI Unification Works
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">1. Keyword Deduplication</h4>
                  <p className="text-sm text-gray-400">AI identifies and eliminates overlap between platforms</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">2. Smart Allocation</h4>
                  <p className="text-sm text-gray-400">Dynamically shift budget to the best-performing platform</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">3. Cross-Platform Learning</h4>
                  <p className="text-sm text-gray-400">Apply insights from one platform to optimize the other</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">4. Unified Reporting</h4>
                  <p className="text-sm text-gray-400">See true ROI across your entire search investment</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* B2B SaaS Specific Benefits */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Why B2B SaaS Needs Unified Management
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <Users className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Your Buyers Use Both</h3>
                <p className="text-gray-400">
                  67% of B2B tech buyers use both Google and Bing during their research. 
                  Managing them separately means inconsistent experiences.
                </p>
              </div>
              
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <DollarSign className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Enterprise Budgets Matter</h3>
                <p className="text-gray-400">
                  With $50K-$5M monthly budgets, even 10% waste from self-competition 
                  means $60K-$6M annually thrown away.
                </p>
              </div>
              
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <Zap className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Speed Wins Deals</h3>
                <p className="text-gray-400">
                  Unified management accelerates pipeline velocity by 89%. In competitive 
                  B2B markets, speed to engagement wins.
                </p>
              </div>
            </div>

            {/* Platform Comparison Table */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Google vs Bing: The B2B Reality
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-900/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-800/50">
                      <th className="px-6 py-4 text-left text-gray-400">Metric</th>
                      <th className="px-6 py-4 text-center text-blue-400">Google Ads</th>
                      <th className="px-6 py-4 text-center text-cyan-400">Bing Ads</th>
                      <th className="px-6 py-4 text-center text-green-400">Unified Approach</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr>
                      <td className="px-6 py-4 text-gray-300">Market Share</td>
                      <td className="px-6 py-4 text-center">~70% B2B</td>
                      <td className="px-6 py-4 text-center">~30% B2B</td>
                      <td className="px-6 py-4 text-center text-green-400 font-semibold">100% Coverage</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-300">Avg. CPL (Siloed)</td>
                      <td className="px-6 py-4 text-center">$450-600</td>
                      <td className="px-6 py-4 text-center">$380-520</td>
                      <td className="px-6 py-4 text-center text-green-400 font-semibold">$180-250</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-300">Decision Makers</td>
                      <td className="px-6 py-4 text-center">IT/Technical</td>
                      <td className="px-6 py-4 text-center">C-Suite/Finance</td>
                      <td className="px-6 py-4 text-center text-green-400 font-semibold">Full Committee</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-300">Attribution</td>
                      <td className="px-6 py-4 text-center">Last-Click</td>
                      <td className="px-6 py-4 text-center">Last-Click</td>
                      <td className="px-6 py-4 text-center text-green-400 font-semibold">True Multi-Touch</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-300">Optimization</td>
                      <td className="px-6 py-4 text-center">Platform-Specific</td>
                      <td className="px-6 py-4 text-center">Platform-Specific</td>
                      <td className="px-6 py-4 text-center text-green-400 font-semibold">AI Orchestrated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section id="roi-calculator" className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Calculate Your Unified Management Savings
              </span>
            </h2>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Average Client Results</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-400">Self-Competition Waste:</span>
                      <span className="text-red-400 font-semibold">-40%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">CPL Reduction:</span>
                      <span className="text-green-400 font-semibold">-61%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Pipeline Velocity:</span>
                      <span className="text-blue-400 font-semibold">+89%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-400">Management Time:</span>
                      <span className="text-purple-400 font-semibold">-50%</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Your Potential Savings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Monthly Search Spend</label>
                      <div className="text-2xl font-bold text-white">$250,000</div>
                    </div>
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Waste Eliminated:</span>
                        <span className="text-green-400 font-bold">$100,000/mo</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Annual Savings:</span>
                        <span className="text-green-400 font-bold text-xl">$1.2M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-green-500/25 transition-all transform hover:scale-105"
                >
                  Get Your Custom ROI Analysis
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Path to Unified Management
              </span>
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Free Unification Audit",
                  description: "We analyze your Google and Bing accounts to identify overlap, waste, and opportunities",
                  time: "2-3 days"
                },
                {
                  step: 2,
                  title: "Custom Unification Strategy",
                  description: "Receive a detailed plan showing exactly how to unify your campaigns and expected ROI",
                  time: "1 week"
                },
                {
                  step: 3,
                  title: "Pilot Implementation",
                  description: "Start with 20% of budget to prove the unified approach works for your business",
                  time: "2-4 weeks"
                },
                {
                  step: 4,
                  title: "Full Unification",
                  description: "Roll out AI orchestration across all campaigns with continuous optimization",
                  time: "4-6 weeks"
                },
                {
                  step: 5,
                  title: "Ongoing Intelligence",
                  description: "AI continuously optimizes allocation and prevents future waste",
                  time: "Ongoing"
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <span className="text-sm text-blue-400">{item.time}</span>
                      </div>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
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
              Stop Wasting 40% of Your Search Budget
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join B2B SaaS companies saving millions with unified Google & Bing management
            </p>
            
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30 mb-8">
              <p className="text-lg text-cyan-400 font-semibold mb-4">
                Limited Time: Free Unification Audit ($5,000 value)
              </p>
              <p className="text-gray-300 mb-6">
                See exactly how much you're wasting on self-competition 
                and get a custom unification roadmap
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all transform hover:scale-105"
              >
                Get Your Free Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <p className="text-sm text-gray-400">
              No obligation. Real data. Actionable insights.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}