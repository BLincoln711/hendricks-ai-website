'use client'

import Link from 'next/link'
import Script from 'next/script'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import { BarChart3, Brain, Calculator, LineChart, PieChart, TrendingUp, Zap, DollarSign, Users } from 'lucide-react'

export default function MarketingMixModelingPage() {
  // Schema for Marketing Mix Modeling
  const mmmSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Marketing Mix Modeling (MMM) for B2B SaaS: The Complete Guide",
    "description": "Learn how Marketing Mix Modeling helps B2B SaaS companies measure true ROI across channels. Hendricks.AI combines MMM with AI-driven incrementality testing for CFO-ready attribution.",
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
      "@id": "https://hendricks.ai/marketing-mix-modeling"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Marketing Mix Modeling (MMM)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Marketing Mix Modeling (MMM) is a statistical analysis technique that measures the impact of various marketing channels on sales and revenue. For B2B SaaS, MMM helps prove which channels drive pipeline and ARR by analyzing historical data, isolating incremental impact, and providing predictive insights. Hendricks.AI enhances traditional MMM with AI-driven analysis and real-time optimization."
        }
      },
      {
        "@type": "Question",
        "name": "How does MMM differ from attribution?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While attribution tracks individual customer touchpoints, MMM analyzes aggregate channel performance to measure true incremental impact. Attribution tells you the customer journey; MMM tells you which channels actually caused revenue growth. For B2B SaaS with long sales cycles and multiple stakeholders, MMM provides more accurate ROI measurement by accounting for external factors, seasonality, and channel interactions."
        }
      },
      {
        "@type": "Question",
        "name": "Why do B2B SaaS companies need Marketing Mix Modeling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "B2B SaaS companies need MMM because: 1) Long sales cycles make last-click attribution unreliable, 2) Multiple stakeholders interact with different channels, 3) High CAC requires precise budget allocation, 4) Board and CFO demand proof of marketing ROI, 5) Privacy changes limit individual tracking. MMM provides the macro-level insights needed for strategic decisions."
        }
      },
      {
        "@type": "Question",
        "name": "How does Hendricks.AI approach Marketing Mix Modeling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hendricks.AI combines traditional MMM with AI-powered enhancements: 1) Real-time model updates instead of quarterly, 2) Integration with CRM data for pipeline-to-ARR tracking, 3) Predictive capabilities to forecast channel performance, 4) Unified analysis across Google and Bing Ads, 5) Incrementality testing to validate model predictions. This delivers 3X more accurate ROI measurement than traditional MMM."
        }
      },
      {
        "@type": "Question",
        "name": "What data is needed for Marketing Mix Modeling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For effective B2B SaaS MMM, you need: 1) 2+ years of historical marketing spend by channel, 2) Pipeline and revenue data from your CRM, 3) Website traffic and conversion metrics, 4) External factors (seasonality, events, competition), 5) Product pricing and sales cycle data. Hendricks.AI can work with partial data and supplements with AI predictions where needed."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is Marketing Mix Modeling for B2B?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional MMM achieves 60-70% accuracy for B2B due to complex sales cycles. Hendricks.AI's AI-enhanced MMM achieves 85-92% accuracy by: 1) Incorporating intent signals and predictive data, 2) Continuous model refinement with machine learning, 3) Validation through incrementality testing, 4) Integration of firmographic and technographic data. This higher accuracy enables confident budget decisions."
        }
      }
    ]
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Implement Marketing Mix Modeling for B2B SaaS",
    "description": "Step-by-step guide to implementing MMM for accurate marketing ROI measurement",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Data Collection and Integration",
        "text": "Gather 2+ years of marketing spend, pipeline data, and external factors"
      },
      {
        "@type": "HowToStep",
        "name": "Model Development",
        "text": "Build statistical models that isolate each channel's incremental contribution"
      },
      {
        "@type": "HowToStep",
        "name": "Validation Testing",
        "text": "Run incrementality tests to validate model predictions"
      },
      {
        "@type": "HowToStep",
        "name": "Insight Generation",
        "text": "Generate actionable insights for budget allocation and optimization"
      },
      {
        "@type": "HowToStep",
        "name": "Continuous Optimization",
        "text": "Update models with new data and refine predictions monthly"
      }
    ],
    "supply": {
      "@type": "HowToSupply",
      "name": "Marketing data, CRM access, Analytics platforms"
    },
    "tool": {
      "@type": "HowToTool",
      "name": "Hendricks.AI MMM Platform"
    },
    "totalTime": "PT720H",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "15000"
    }
  }

  return (
    <>
      <Script
        id="mmm-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mmmSchema)
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema)
        }}
      />
      
      <main className="min-h-screen bg-black text-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-blue-950/20 to-black"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-800/50 rounded-full text-sm text-purple-400 mb-6">
                <BarChart3 className="w-4 h-4" />
                <span>MARKETING MIX MODELING FOR B2B SAAS</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                <span className="block text-white">Prove Your</span>
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  True Marketing ROI
                </span>
              </h1>
              
              <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Marketing Mix Modeling that connects spend to pipeline to ARR 
                with CFO-ready attribution
              </p>

              {/* Quick Answer Box */}
              <div className="bg-purple-950/30 border-l-4 border-purple-500 p-6 rounded-r-lg max-w-4xl mx-auto text-left mb-8">
                <p className="text-lg text-gray-300">
                  <strong className="text-white text-xl">Quick Answer:</strong> Marketing Mix Modeling (MMM) 
                  measures the true incremental impact of each marketing channel on revenue. Hendricks.AI's 
                  AI-enhanced MMM achieves 85-92% accuracy for B2B SaaS by combining statistical modeling, 
                  incrementality testing, and predictive analytics to prove ROI across Google Ads, Bing Ads, 
                  and all marketing channels.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-3xl font-bold text-purple-400">85-92%</div>
                  <div className="text-sm text-gray-400">Model Accuracy</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-3xl font-bold text-pink-400">3X</div>
                  <div className="text-sm text-gray-400">Better Than Traditional</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-3xl font-bold text-blue-400">-47%</div>
                  <div className="text-sm text-gray-400">Wasted Spend Found</div>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="text-3xl font-bold text-green-400">2.4X</div>
                  <div className="text-sm text-gray-400">ROAS Improvement</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105"
                >
                  Get Your MMM Analysis
                  <Calculator className="w-5 h-5" />
                </Link>
                <Link 
                  href="#mmm-vs-attribution"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  MMM vs Attribution
                  <BarChart3 className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What is MMM Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                What is Marketing Mix Modeling?
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-300 mb-6">
                  Marketing Mix Modeling (MMM) is a statistical analysis technique that measures 
                  the incremental impact of marketing activities on business outcomes.
                </p>
                
                <h3 className="text-xl font-bold text-white mb-4">MMM Answers Critical Questions:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Which channels actually drive incremental pipeline?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>What's the optimal budget allocation across channels?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>How do channels interact and influence each other?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>What's the true ROI when accounting for external factors?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>Where will the next dollar generate the most revenue?</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/20 to-transparent rounded-2xl p-8 border border-purple-800/50">
                <h3 className="text-xl font-bold text-white mb-6">The MMM Process</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-bold">1</span>
                    </div>
                    <div>
                      <strong className="text-white">Data Integration</strong>
                      <p className="text-sm text-gray-400">Combine spend, revenue, and external data</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-bold">2</span>
                    </div>
                    <div>
                      <strong className="text-white">Statistical Modeling</strong>
                      <p className="text-sm text-gray-400">Build models to isolate channel impact</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-bold">3</span>
                    </div>
                    <div>
                      <strong className="text-white">Validation</strong>
                      <p className="text-sm text-gray-400">Test predictions with experiments</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-bold">4</span>
                    </div>
                    <div>
                      <strong className="text-white">Optimization</strong>
                      <p className="text-sm text-gray-400">Reallocate budget for maximum ROI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MMM vs Attribution */}
        <section id="mmm-vs-attribution" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                MMM vs Attribution: What B2B SaaS Needs
              </span>
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-900/50 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-800/50">
                    <th className="px-6 py-4 text-left text-gray-400">Aspect</th>
                    <th className="px-6 py-4 text-center text-blue-400">Multi-Touch Attribution</th>
                    <th className="px-6 py-4 text-center text-purple-400">Marketing Mix Modeling</th>
                    <th className="px-6 py-4 text-center text-green-400">Hendricks.AI Unified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr>
                    <td className="px-6 py-4 text-gray-300">Level of Analysis</td>
                    <td className="px-6 py-4 text-center">Individual user</td>
                    <td className="px-6 py-4 text-center">Aggregate channel</td>
                    <td className="px-6 py-4 text-center text-green-400">Both + AI predictions</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300">Time to Insights</td>
                    <td className="px-6 py-4 text-center">Real-time</td>
                    <td className="px-6 py-4 text-center">Quarterly</td>
                    <td className="px-6 py-4 text-center text-green-400">Real-time + predictive</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300">Incrementality</td>
                    <td className="px-6 py-4 text-center">No</td>
                    <td className="px-6 py-4 text-center">Yes</td>
                    <td className="px-6 py-4 text-center text-green-400">Yes + validated</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300">B2B Accuracy</td>
                    <td className="px-6 py-4 text-center">40-50%</td>
                    <td className="px-6 py-4 text-center">60-70%</td>
                    <td className="px-6 py-4 text-center text-green-400">85-92%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300">Privacy-Proof</td>
                    <td className="px-6 py-4 text-center">No</td>
                    <td className="px-6 py-4 text-center">Yes</td>
                    <td className="px-6 py-4 text-center text-green-400">Yes</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300">External Factors</td>
                    <td className="px-6 py-4 text-center">No</td>
                    <td className="px-6 py-4 text-center">Yes</td>
                    <td className="px-6 py-4 text-center text-green-400">Yes + AI enhanced</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-blue-950/50 to-purple-950/50 rounded-2xl p-6 border border-blue-500/20">
              <p className="text-lg text-center text-gray-300">
                <strong className="text-white">The Hendricks.AI Advantage:</strong> We combine MMM's statistical rigor 
                with attribution's granularity, enhanced by AI that predicts future performance. 
                This unified approach delivers the accuracy B2B SaaS CFOs demand.
              </p>
            </div>
          </div>
        </section>

        {/* B2B SaaS Specific Challenges */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Why B2B SaaS MMM is Different
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-red-900/20 to-transparent rounded-2xl p-8 border border-red-800/50">
                <h3 className="text-xl font-bold text-red-400 mb-6">Traditional MMM Limitations for B2B</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✗</span>
                    <span>Built for B2C with instant conversions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✗</span>
                    <span>Can't handle 6-18 month sales cycles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✗</span>
                    <span>Ignores account-based dynamics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✗</span>
                    <span>Quarterly updates too slow for SaaS</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✗</span>
                    <span>No pipeline stage modeling</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-900/20 to-transparent rounded-2xl p-8 border border-green-800/50">
                <h3 className="text-xl font-bold text-green-400 mb-6">Hendricks.AI B2B SaaS MMM</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">✓</span>
                    <span>Built specifically for B2B dynamics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">✓</span>
                    <span>Models full sales cycle impact</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">✓</span>
                    <span>Account-level incrementality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">✓</span>
                    <span>Real-time model updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400">✓</span>
                    <span>Pipeline velocity optimization</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Key B2B Factors */}
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Critical B2B SaaS Factors We Model
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">Buying Committees</h4>
                  <p className="text-sm text-gray-400">5-7 stakeholders across different channels</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">Sales Velocity</h4>
                  <p className="text-sm text-gray-400">Impact on time from MQL to closed-won</p>
                </div>
                <div className="text-center">
                  <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">LTV:CAC Ratio</h4>
                  <p className="text-sm text-gray-400">True unit economics by channel</p>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">Pipeline Stages</h4>
                  <p className="text-sm text-gray-400">Channel impact at each stage</p>
                </div>
                <div className="text-center">
                  <Brain className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">Intent Signals</h4>
                  <p className="text-sm text-gray-400">Predictive indicators of demand</p>
                </div>
                <div className="text-center">
                  <LineChart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">Seasonality</h4>
                  <p className="text-sm text-gray-400">Budget cycles and buying patterns</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Hendricks.AI Does MMM */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-6">
              <span className="text-white">The Hendricks.AI </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MMM Approach
              </span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Traditional MMM + AI Enhancement + Real-Time Optimization = True ROI
            </p>

            {/* Three Pillars of MMM */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-900/20 to-transparent p-8 rounded-2xl border border-blue-800/50">
                <PieChart className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-blue-400 mb-4">1. Comprehensive Data Integration</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Google + Bing unified spend data</li>
                  <li>• CRM pipeline and revenue</li>
                  <li>• Website and conversion metrics</li>
                  <li>• Competitive intelligence</li>
                  <li>• Economic indicators</li>
                  <li>• Product usage data</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/20 to-transparent p-8 rounded-2xl border border-purple-800/50">
                <Brain className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. AI-Enhanced Modeling</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Machine learning algorithms</li>
                  <li>• Predictive demand signals</li>
                  <li>• Real-time model updates</li>
                  <li>• Cross-channel interactions</li>
                  <li>• Saturation curve modeling</li>
                  <li>• Decay rate optimization</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-pink-900/20 to-transparent p-8 rounded-2xl border border-pink-800/50">
                <Zap className="w-12 h-12 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold text-pink-400 mb-4">3. Continuous Validation</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Incrementality experiments</li>
                  <li>• Holdout testing</li>
                  <li>• Geo-based validation</li>
                  <li>• Prediction accuracy tracking</li>
                  <li>• Budget reallocation tests</li>
                  <li>• ROI lift measurement</li>
                </ul>
              </div>
            </div>

            {/* Process Timeline */}
            <div className="bg-gradient-to-r from-purple-950/50 to-pink-950/50 rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Your MMM Implementation Timeline
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm text-purple-400 font-semibold">Week 1-2</span>
                  </div>
                  <div className="flex-grow">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <strong className="text-white">Data Integration & Audit</strong>
                      <p className="text-sm text-gray-400 mt-1">Connect all data sources and validate quality</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm text-purple-400 font-semibold">Week 3-4</span>
                  </div>
                  <div className="flex-grow">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <strong className="text-white">Initial Model Development</strong>
                      <p className="text-sm text-gray-400 mt-1">Build base MMM with your historical data</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm text-purple-400 font-semibold">Week 5-6</span>
                  </div>
                  <div className="flex-grow">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <strong className="text-white">Validation & Testing</strong>
                      <p className="text-sm text-gray-400 mt-1">Run incrementality tests to validate predictions</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-sm text-purple-400 font-semibold">Ongoing</span>
                  </div>
                  <div className="flex-grow">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <strong className="text-white">Optimization & Insights</strong>
                      <p className="text-sm text-gray-400 mt-1">Monthly updates with actionable recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results & Case Studies */}
        <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Real MMM Results for B2B SaaS
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  client: 'Enterprise Security SaaS',
                  spend: '$450K/month',
                  findings: {
                    waste: '47% budget in low-ROI channels',
                    opportunity: 'Bing underinvested by 73%',
                    interaction: 'Google+LinkedIn synergy untapped'
                  },
                  results: {
                    roi: '+2.4X ROAS',
                    pipeline: '+$8.3M ARR',
                    efficiency: '-52% CAC'
                  },
                  quote: 'MMM revealed we were burning cash on brand terms while missing bottom-funnel opportunities.'
                },
                {
                  client: 'MarTech Platform',
                  spend: '$280K/month',
                  findings: {
                    waste: '38% self-cannibalization',
                    opportunity: 'Seasonal patterns ignored',
                    interaction: 'Content+Search alignment gap'
                  },
                  results: {
                    roi: '+189% ROI',
                    pipeline: '+$5.1M ARR',
                    efficiency: '-41% CPL'
                  },
                  quote: 'Finally proved to our board which channels actually drive revenue, not just leads.'
                },
                {
                  client: 'FinTech Solution',
                  spend: '$620K/month',
                  findings: {
                    waste: '56% attribution overlap',
                    opportunity: 'Industry events undervalued',
                    interaction: 'PR amplifies paid search 3.2X'
                  },
                  results: {
                    roi: '+3.1X ROAS',
                    pipeline: '+$12.7M ARR',
                    efficiency: '-63% CAC'
                  },
                  quote: 'Hendricks MMM connected dots we couldn\'t see - PR wasn\'t just brand, it drove conversions.'
                }
              ].map((study, index) => (
                <div key={index} className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
                    <h3 className="text-lg font-bold text-white">{study.client}</h3>
                    <p className="text-sm text-white/80">{study.spend}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Key Findings</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• {study.findings.waste}</li>
                        <li>• {study.findings.opportunity}</li>
                        <li>• {study.findings.interaction}</li>
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Results</h4>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-lg font-bold text-green-400">{study.results.roi}</div>
                          <div className="text-xs text-gray-500">ROAS</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-400">{study.results.pipeline}</div>
                          <div className="text-xs text-gray-500">Pipeline</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-purple-400">{study.results.efficiency}</div>
                          <div className="text-xs text-gray-500">Efficiency</div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 italic">"{study.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 border border-purple-500/20 text-center">
              <p className="text-xl text-white font-semibold mb-2">
                Average Across All MMM Clients
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                <div>
                  <div className="text-3xl font-bold text-green-400">-47%</div>
                  <p className="text-gray-400">Wasted Spend Eliminated</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">2.4X</div>
                  <p className="text-gray-400">ROAS Improvement</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">85-92%</div>
                  <p className="text-gray-400">Model Accuracy</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-400">6 weeks</div>
                  <p className="text-gray-400">To First Insights</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Common MMM Questions
              </span>
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  q: "How long does it take to see MMM results?",
                  a: "Initial insights in 4-6 weeks, full model deployment in 8-12 weeks. However, we provide actionable quick wins within the first 2 weeks based on preliminary analysis."
                },
                {
                  q: "What if we don't have 2 years of data?",
                  a: "We can work with as little as 12 months of data by supplementing with AI predictions and external benchmarks. The model improves as more data accumulates."
                },
                {
                  q: "How often is the model updated?",
                  a: "Unlike traditional quarterly MMM, Hendricks.AI updates models monthly with weekly prediction refreshes. Major recalibrations happen quarterly."
                },
                {
                  q: "Can MMM work with our existing attribution?",
                  a: "Yes! MMM complements attribution by adding the incrementality layer. We integrate with your existing tools and provide unified dashboards."
                },
                {
                  q: "What's the typical ROI from MMM?",
                  a: "B2B SaaS clients see 20-50% improvement in marketing efficiency, translating to 2-3X ROAS improvement and millions in pipeline growth."
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
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950 via-pink-950 to-purple-950"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Prove Your
              <span className="block text-5xl mt-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                True Marketing ROI?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Stop guessing. Start knowing. Get CFO-ready attribution with MMM.
            </p>
            
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 mb-8">
              <p className="text-lg text-purple-400 font-semibold mb-4">
                Limited Time: Free MMM Readiness Assessment
              </p>
              <p className="text-gray-300 mb-6">
                See if your B2B SaaS is ready for Marketing Mix Modeling 
                and get a custom implementation roadmap
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105"
              >
                Get Your MMM Assessment
                <Calculator className="w-5 h-5" />
              </Link>
            </div>
            
            <p className="text-sm text-gray-400">
              Trusted by B2B SaaS companies spending $50K-$5M/month
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}