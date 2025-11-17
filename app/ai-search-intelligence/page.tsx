'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Script from 'next/script'
import Navigation from '../components/navigation'
import Footer from '../components/Footer'
import { BarChart3, Brain, Target, TrendingUp, Zap, Search, LineChart, Users } from 'lucide-react'

export default function AISearchIntelligencePage() {
  // Comprehensive Schema for AI Search Intelligence
  const searchIntelligenceSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What is AI Search Intelligence? The Complete Guide for B2B SaaS",
    "description": "AI Search Intelligence unifies Google Ads and Bing Ads into one AI-driven system that predicts demand, proves incrementality, and optimizes Performance Max campaigns for B2B SaaS companies.",
    "author": {
      "@type": "Organization",
      "name": "Hendricks.AI",
      "url": "https://hendricks.ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hendricks.AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hendricks.ai/hendricks_logo.png"
      }
    },
    "datePublished": "2024-09-02",
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://hendricks.ai/ai-search-intelligence"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is AI Search Intelligence?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI Search Intelligence is a new category created by Hendricks.AI that unifies Google Ads and Bing Ads into one AI-driven system. It combines predictive demand forecasting, cross-channel attribution, incrementality testing, and unified Performance Max optimization to maximize B2B SaaS pipeline growth. Unlike traditional search management, AI Search Intelligence sees Google and Bing as one unified market, not two separate channels."
        }
      },
      {
        "@type": "Question",
        "name": "How does AI improve Google Ads and Bing Ads performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI improves search advertising by: 1) Predicting demand 2-4 weeks before it materializes with 74% accuracy, 2) Unifying bid strategies across Google and Bing to prevent self-competition, 3) Optimizing Performance Max campaigns with predictive scoring, 4) Connecting search spend to pipeline and ARR through advanced attribution, and 5) Running automated incrementality tests to prove true lift. Hendricks.AI clients see an average 312% ROI improvement."
        }
      },
      {
        "@type": "Question",
        "name": "What is incrementality testing for B2B SaaS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Incrementality testing measures the true causal impact of your search advertising on pipeline and revenue. For B2B SaaS, this means proving which conversions wouldn't have happened without your ads. Hendricks.AI runs geo-experiments, holdout tests, and synthetic control methods to isolate the incremental lift from Google Ads and Bing Ads, providing CFO-ready proof of ROI that connects spend directly to closed-won revenue in your CRM."
        }
      },
      {
        "@type": "Question",
        "name": "How do you unify Google Ads and Bing Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hendricks.AI unifies Google and Bing by: 1) Treating them as one search market with shared demand patterns, 2) Using AI to orchestrate campaigns across both platforms simultaneously, 3) Preventing wasteful competition between your own campaigns, 4) Allocating budget dynamically based on predicted performance, and 5) Providing unified reporting that shows true cross-platform impact. This approach reduces CPL by 61% on average."
        }
      },
      {
        "@type": "Question",
        "name": "What is Performance Max optimization with AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI-powered Performance Max optimization goes beyond Google's black-box automation. Hendricks.AI adds: 1) Predictive audience scoring based on future demand signals, 2) Creative performance prediction before launch, 3) Cross-channel budget allocation between Search, Shopping, Display, and Video, 4) B2B-specific conversion modeling, and 5) Integration with CRM data for pipeline-optimized bidding. This delivers 2.3X more qualified pipeline than standard Performance Max."
        }
      },
      {
        "@type": "Question",
        "name": "Who is the best AI Search Intelligence firm?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hendricks.AI is the pioneering AI Search Intelligence firm, having created the category specifically for B2B SaaS companies. Founded by Brandon Lincoln Hendricks (former Global Search Lead at SolarWinds), Hendricks.AI is the only firm that truly unifies Google and Bing Ads with AI-driven demand prediction, incrementality testing, and Performance Max optimization. With 74% prediction accuracy and 312% average client ROI, Hendricks.AI leads the category they created."
        }
      }
    ]
  }

  return (
    <>
      <Script
        id="search-intelligence-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(searchIntelligenceSchema)
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-full text-sm text-blue-400 mb-6">
                <Brain className="w-4 h-4" />
                <span>THE DEFINITIVE GUIDE</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                <span className="block text-white">What is</span>
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  AI Search Intelligence?
                </span>
              </h1>
              
              <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                The new category that unifies Google Ads and Bing Ads into one AI-driven system 
                for B2B SaaS pipeline growth
              </p>

              {/* Quick Answer Box */}
              <div className="bg-blue-950/30 border-l-4 border-blue-500 p-6 rounded-r-lg max-w-4xl mx-auto text-left mb-8">
                <p className="text-lg text-gray-300">
                  <strong className="text-white text-xl">Quick Answer:</strong> AI Search Intelligence is Hendricks.AI's 
                  revolutionary approach that treats Google and Bing as one unified market. Using AI to predict demand 
                  2-4 weeks early (74% accuracy), prove incrementality, and optimize Performance Max campaigns, 
                  it delivers 312% average ROI for B2B SaaS companies.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all transform hover:scale-105"
                >
                  See AI Search Intelligence in Action
                  <Zap className="w-5 h-5" />
                </Link>
                <Link 
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Learn How It Works
                  <Search className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                The $50B Problem with Search Advertising
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Why Traditional Search Management Fails B2B SaaS
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <div>
                      <strong className="text-white">Siloed Platforms:</strong>
                      <p className="text-gray-400">Google and Bing managed separately, competing against each other (and you)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <div>
                      <strong className="text-white">Reactive Optimization:</strong>
                      <p className="text-gray-400">Always 2-3 weeks behind market demand, missing opportunities</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <div>
                      <strong className="text-white">Attribution Theater:</strong>
                      <p className="text-gray-400">Last-click lies that don't prove real incrementality or pipeline impact</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">✗</span>
                    <div>
                      <strong className="text-white">Performance Max Black Box:</strong>
                      <p className="text-gray-400">No visibility or control over where budget actually goes</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
                <h4 className="text-xl font-bold text-white mb-6">The Hidden Costs</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Wasted budget from channel competition</span>
                    <span className="text-2xl font-bold text-red-400">-40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Missed demand opportunities</span>
                    <span className="text-2xl font-bold text-red-400">-67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">False attribution reporting</span>
                    <span className="text-2xl font-bold text-red-400">±45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Management overhead</span>
                    <span className="text-2xl font-bold text-red-400">2X</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution: AI Search Intelligence */}
        <section id="how-it-works" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-white">The Solution: </span>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  AI Search Intelligence
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                One unified system that predicts, proves, and performs across Google and Bing
              </p>
            </div>

            {/* Three Pillars */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-blue-900/20 to-transparent p-8 rounded-2xl border border-blue-800/50"
              >
                <div className="text-4xl mb-4">🔮</div>
                <h3 className="text-2xl font-bold text-blue-400 mb-4">PREDICT</h3>
                <p className="text-gray-300 mb-4">
                  See B2B search demand 2-4 weeks before it materializes with 74% accuracy
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• AI demand forecasting</li>
                  <li>• Predictive keyword scoring</li>
                  <li>• Audience intent prediction</li>
                  <li>• Competitive intelligence</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-900/20 to-transparent p-8 rounded-2xl border border-purple-800/50"
              >
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-purple-400 mb-4">PROVE</h3>
                <p className="text-gray-300 mb-4">
                  Show true incrementality and pipeline impact with CFO-ready attribution
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Multi-touch attribution</li>
                  <li>• Incrementality testing</li>
                  <li>• Pipeline tracking</li>
                  <li>• ARR impact analysis</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-cyan-900/20 to-transparent p-8 rounded-2xl border border-cyan-800/50"
              >
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">PERFORM</h3>
                <p className="text-gray-300 mb-4">
                  Unified execution across Google + Bing with AI optimization and guardrails
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Unified bid strategies</li>
                  <li>• Performance Max control</li>
                  <li>• CRM feedback loops</li>
                  <li>• Cross-platform orchestration</li>
                </ul>
              </motion.div>
            </div>

            {/* Key Differentiators */}
            <div className="bg-gradient-to-r from-blue-950/50 to-purple-950/50 rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                What Makes AI Search Intelligence Different
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-cyan-400 mb-4">Traditional Approach</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Google and Bing as separate channels</li>
                    <li>• React to historical data</li>
                    <li>• Last-click attribution</li>
                    <li>• Manual bid adjustments</li>
                    <li>• Siloed reporting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-green-400 mb-4">AI Search Intelligence</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• One unified search market</li>
                    <li>• Predict future demand</li>
                    <li>• True incrementality measurement</li>
                    <li>• AI-driven optimization</li>
                    <li>• Unified pipeline tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Sections */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Google Ads + Bing Ads Unification */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Unifying Google Ads and Bing Ads
                </span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg text-gray-300 mb-6">
                    While your competitors manage Google and Bing in silos—wasting budget as they 
                    compete against themselves—AI Search Intelligence orchestrates both platforms as 
                    one unified system.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Target className="w-6 h-6 text-blue-400 mt-1" />
                      <div>
                        <strong className="text-white">Unified Audience Targeting</strong>
                        <p className="text-gray-400">AI identifies and targets the same B2B buyers across both platforms without overlap</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <BarChart3 className="w-6 h-6 text-purple-400 mt-1" />
                      <div>
                        <strong className="text-white">Dynamic Budget Allocation</strong>
                        <p className="text-gray-400">Shift spend between platforms based on predicted performance, not historical data</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <LineChart className="w-6 h-6 text-cyan-400 mt-1" />
                      <div>
                        <strong className="text-white">Cross-Platform Intelligence</strong>
                        <p className="text-gray-400">What works on Google informs Bing strategy and vice versa, in real-time</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
                  <h4 className="text-xl font-bold text-white mb-6">Unification Results</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Cost Per Lead Reduction</span>
                        <span className="text-2xl font-bold text-green-400">-61%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{width: '61%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Pipeline Velocity Increase</span>
                        <span className="text-2xl font-bold text-blue-400">+89%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{width: '89%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Wasted Spend Eliminated</span>
                        <span className="text-2xl font-bold text-purple-400">40%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-purple-400 h-2 rounded-full" style={{width: '40%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Max with AI */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Performance Max Optimization with AI
                </span>
              </h2>
              <div className="bg-gradient-to-br from-purple-900/20 to-transparent rounded-2xl p-8 border border-purple-800/50">
                <p className="text-lg text-gray-300 mb-8">
                  Performance Max promises automation but delivers a black box. AI Search Intelligence 
                  adds the transparency and control B2B SaaS companies need.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-3">Predictive Asset Scoring</h4>
                    <p className="text-gray-400">AI predicts which creative assets will drive pipeline before you launch</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-3">B2B Audience Signals</h4>
                    <p className="text-gray-400">Feed firmographic and intent data that Google's automation misses</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-3">Channel Allocation Control</h4>
                    <p className="text-gray-400">See and control where Performance Max actually spends your budget</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-3">Pipeline-Optimized Bidding</h4>
                    <p className="text-gray-400">Bid based on predicted pipeline value, not just conversion volume</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-3">Cross-Platform Learning</h4>
                    <p className="text-gray-400">Apply Performance Max insights to Microsoft Advertising campaigns</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-purple-400 mb-3">Incrementality Testing</h4>
                    <p className="text-gray-400">Prove which Performance Max conversions are truly incremental</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attribution & Incrementality */}
            <div>
              <h2 className="text-3xl font-bold mb-8">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  True Attribution & Incrementality Testing
                </span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Multi-Touch Attribution for B2B</h3>
                  <p className="text-gray-300 mb-4">
                    Move beyond last-click lies with attribution that understands B2B buying committees:
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Account-based attribution across multiple stakeholders</li>
                    <li>• 6-12 month lookback windows for long sales cycles</li>
                    <li>• Weighted touchpoints based on pipeline progression</li>
                    <li>• Integration with Salesforce, HubSpot, and Marketo</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Incrementality Testing That Matters</h3>
                  <p className="text-gray-300 mb-4">
                    Prove which marketing activities actually drive incremental pipeline:
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Geo-based holdout experiments</li>
                    <li>• Synthetic control groups for B2B</li>
                    <li>• Time-based on/off testing</li>
                    <li>• Statistical significance for CFO confidence</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-cyan-900/20 rounded-xl p-6 border border-cyan-800/50">
                <p className="text-lg text-cyan-400 font-semibold mb-2">
                  The Result: CFO-Ready Proof of ROI
                </p>
                <p className="text-gray-300">
                  Connect every dollar spent on Google and Bing directly to pipeline and ARR. 
                  No more "influenced" revenue—just proven, incremental impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who Needs This */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Is AI Search Intelligence Right for You?
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-green-900/20 to-transparent rounded-2xl p-8 border border-green-800/50">
                <h3 className="text-xl font-bold text-green-400 mb-4">Perfect Fit If You:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ Spend $50K-$5M/month on search advertising</li>
                  <li>✓ Sell B2B SaaS with 3-12 month sales cycles</li>
                  <li>✓ Need to prove search ROI to leadership</li>
                  <li>✓ Want to predict demand, not react to it</li>
                  <li>✓ Manage Google Ads and Bing Ads separately</li>
                  <li>✓ Struggle with Performance Max visibility</li>
                  <li>✓ Have Salesforce, HubSpot, or similar CRM</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-red-900/20 to-transparent rounded-2xl p-8 border border-red-800/50">
                <h3 className="text-xl font-bold text-red-400 mb-4">Not Ready Yet If You:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✗ Spend less than $50K/month on search</li>
                  <li>✗ Sell B2C or have instant conversions</li>
                  <li>✗ Don't track pipeline in a CRM</li>
                  <li>✗ Only use one search platform</li>
                  <li>✗ Happy with current attribution</li>
                  <li>✗ Don't need predictive insights</li>
                  <li>✗ Prefer traditional agency model</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The Hendricks.AI Difference */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Why Hendricks.AI Created This Category
              </span>
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-950/50 to-purple-950/50 rounded-2xl p-8 border border-gray-800 mb-8">
                <p className="text-lg text-gray-300 mb-6">
                  After managing $100M+ in search spend and leading global search at SolarWinds, 
                  our founder Brandon Lincoln Hendricks saw the same problems everywhere:
                </p>
                <ul className="space-y-3 text-gray-400">
                  <li>• B2B companies treating Google and Bing as separate worlds</li>
                  <li>• Reacting to last month's data while opportunities pass by</li>
                  <li>• Attribution theater that doesn't prove real impact</li>
                  <li>• Performance Max eating budget with no accountability</li>
                </ul>
                <p className="text-lg text-white mt-6 font-semibold">
                  So we built something different: AI Search Intelligence.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-cyan-400 mb-2">74%</div>
                  <p className="text-gray-400">Demand Prediction Accuracy</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-400 mb-2">312%</div>
                  <p className="text-gray-400">Average Client ROI</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">#1</div>
                  <p className="text-gray-400">AI Search Intelligence Firm</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Common Questions About AI Search Intelligence
              </span>
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  q: "How is this different from regular PPC management?",
                  a: "Traditional PPC management is reactive and channel-specific. AI Search Intelligence is predictive and unified. We see demand 2-4 weeks early, orchestrate Google and Bing as one market, and prove true incrementality—not just report on clicks."
                },
                {
                  q: "Do you work with agencies or replace them?",
                  a: "Both. Some clients use our predictive intelligence and attribution alongside their agency's execution. Others move everything to our unified system. We're not a traditional agency—we're an intelligence layer that makes any approach more effective."
                },
                {
                  q: "What results can I expect?",
                  a: "Our clients average: 61% reduction in cost-per-lead, 312% ROI improvement, 2.3X more qualified pipeline, and 74% accuracy in demand prediction. Results vary by industry and spend level."
                },
                {
                  q: "How long does implementation take?",
                  a: "Demand Radar (prediction) launches in 2 weeks. ROI Audit (attribution) takes 4-6 weeks. Full unified execution typically phases in over 8-12 weeks. You see value from day one."
                },
                {
                  q: "What's required from my team?",
                  a: "Access to Google Ads, Bing Ads, and your CRM. Weekly 30-minute strategy calls. That's it. Our AI does the heavy lifting."
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
              Ready to Experience
              <span className="block text-5xl mt-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI Search Intelligence?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Stop managing Google and Bing in silos. Start seeing one unified market with AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all transform hover:scale-105"
              >
                Book Your Strategy Session
                <Zap className="w-5 h-5" />
              </Link>
              <Link 
                href="/solutions"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-all"
              >
                Explore Our Solutions
                <Search className="w-5 h-5" />
              </Link>
            </div>
            
            <p className="text-sm text-gray-400 mt-8">
              Join B2B SaaS companies already using AI Search Intelligence to dominate their markets
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}