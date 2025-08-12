'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SolutionsPage() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      id: 0,
      title: 'Demand Intelligence',
      subtitle: 'Predict Market Demand 2-4 Weeks Early',
      icon: '🔮',
      gradient: 'from-blue-500 to-purple-500',
      description: 'Our proprietary AI models analyze billions of signals to predict market demand with 74% accuracy, giving you a 2-4 week advantage over competitors.',
      features: [
        'Custom ML models trained on your industry data',
        '2-4 week advance demand predictions',
        '74% prediction accuracy',
        'Real-time signal monitoring',
        'Competitor movement tracking',
        'Market shift alerts'
      ],
      benefits: [
        'Position inventory before demand spikes',
        'Optimize ad spend timing',
        'Capture market share before competitors react',
        'Reduce waste from overproduction'
      ],
      pricing: 'Starting at $5,000/month',
      caseStudy: {
        client: 'E-Commerce Giant',
        result: '312% ROI in 6 months',
        story: 'Predicted Black Friday trends 3 weeks early, allowing strategic inventory and ad positioning.'
      }
    },
    {
      id: 1,
      title: 'Google Performance Max',
      subtitle: 'Master Google\'s AI Ecosystem',
      icon: '🚀',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Leverage Google\'s Performance Max campaigns with our advanced optimization strategies, delivering 14% higher conversions at scale.',
      features: [
        'Performance Max campaign setup & management',
        'AI-powered bid optimization',
        'Dynamic creative testing',
        'Cross-channel attribution',
        'Smart Shopping integration',
        'YouTube & Display expansion'
      ],
      benefits: [
        '14% average conversion lift',
        '95% impression share coverage',
        'Automated budget allocation',
        'Simplified campaign management'
      ],
      pricing: 'Starting at $7,500/month + ad spend',
      caseStudy: {
        client: 'D2C Fashion Brand',
        result: '14% conversion lift, 32% lower CPA',
        story: 'Transformed scattered campaigns into unified Performance Max strategy.'
      }
    },
    {
      id: 2,
      title: 'Microsoft Copilot Ads',
      subtitle: 'Dominate the Microsoft Ecosystem',
      icon: '🎯',
      gradient: 'from-green-500 to-blue-500',
      description: 'Be first to master Microsoft\'s Copilot advertising ecosystem, reaching high-value B2B audiences with 2.6x higher engagement rates.',
      features: [
        'Copilot ad placement optimization',
        'LinkedIn B2B integration',
        'Microsoft Edge targeting',
        'Bing Chat advertising',
        'Teams & Office integration',
        'Azure audience matching'
      ],
      benefits: [
        '2.6x higher engagement rates',
        '32% lower CPA for B2B',
        'Access to exclusive placements',
        'First-mover advantage'
      ],
      pricing: 'Starting at $10,000/month + ad spend',
      caseStudy: {
        client: 'B2B SaaS Company',
        result: '2.6x engagement, 73% pipeline increase',
        story: 'Reached decision-makers directly through Copilot ecosystem.'
      }
    },
    {
      id: 3,
      title: 'Amplification Engine',
      subtitle: 'Multi-Channel Orchestration',
      icon: '📢',
      gradient: 'from-orange-500 to-red-500',
      description: 'Synchronize your presence across all channels at the perfect moment, ensuring you\'re everywhere your customers are when demand peaks.',
      features: [
        'Cross-platform campaign sync',
        'Dynamic budget allocation',
        'Real-time performance optimization',
        'Unified reporting dashboard',
        'API integrations',
        'Custom automation workflows'
      ],
      benefits: [
        'Unified campaign management',
        'Consistent messaging across channels',
        'Maximized reach at critical moments',
        'Reduced management overhead'
      ],
      pricing: 'Starting at $15,000/month',
      caseStudy: {
        client: 'Multi-location Retailer',
        result: '5x efficiency, 45% cost reduction',
        story: 'Unified 50+ local campaigns into single intelligent system.'
      }
    },
    {
      id: 4,
      title: 'Conversion Capture',
      subtitle: 'Turn Predictions into Profits',
      icon: '💰',
      gradient: 'from-pink-500 to-purple-500',
      description: 'Convert demand predictions into revenue with AI-optimized landing pages, cart recovery, and conversion rate optimization.',
      features: [
        'AI-powered landing page optimization',
        'Dynamic content personalization',
        'Cart abandonment recovery',
        'A/B testing automation',
        'Heatmap & user flow analysis',
        'Conversion funnel optimization'
      ],
      benefits: [
        '3-4x conversion rate improvement',
        '312% average ROI',
        'Reduced cart abandonment',
        'Higher customer lifetime value'
      ],
      pricing: 'Starting at $8,000/month',
      caseStudy: {
        client: 'Subscription Service',
        result: '4x conversion rate, 312% ROI',
        story: 'Transformed landing pages based on predicted demand patterns.'
      }
    },
    {
      id: 5,
      title: 'Intelligence Command',
      subtitle: 'Your AI Marketing War Room',
      icon: '📊',
      gradient: 'from-cyan-500 to-blue-500',
      description: 'Real-time command center with custom dashboards, predictive alerts, and white-label reporting for complete marketing intelligence.',
      features: [
        'Custom KPI dashboards',
        'Predictive alert system',
        'White-label reporting',
        'API access',
        'Team collaboration tools',
        'Executive briefing automation'
      ],
      benefits: [
        'Real-time decision making',
        'Proactive issue resolution',
        'Stakeholder transparency',
        'Data-driven strategy'
      ],
      pricing: 'Included with all plans',
      caseStudy: {
        client: 'Fortune 500 Company',
        result: '65% faster decision making',
        story: 'C-suite gained real-time visibility into marketing performance.'
      }
    }
  ]

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
              <Link href="/solutions" className="text-white font-semibold">Solutions</Link>
              <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
              <Link href="/results" className="text-gray-300 hover:text-white transition-colors">Results</Link>
              <Link href="/#contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
            <Link href="/#contact" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105">
              Get Intelligence Report
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black animate-gradient-xy"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Solutions
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
            The only agency mastering both Google Performance Max & Microsoft Copilot ecosystems 
            with predictive AI that sees demand 2-4 weeks early.
          </p>
        </div>
      </section>

      {/* Service Selector */}
      <section className="py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeService === index
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <div className="text-sm font-semibold">{service.title}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Details */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{services[activeService].icon}</div>
                  <div>
                    <h2 className="text-3xl font-bold">{services[activeService].title}</h2>
                    <p className="text-lg text-gray-400">{services[activeService].subtitle}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {services[activeService].description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">Key Features</h3>
                <ul className="space-y-3">
                  {services[activeService].features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-purple-400">Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services[activeService].benefits.map((benefit, index) => (
                    <div key={index} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                      <p className="text-gray-300">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Case Study & CTA */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Success Story
                </h3>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-white">
                    {services[activeService].caseStudy.result}
                  </div>
                  <p className="text-gray-300 italic">
                    "{services[activeService].caseStudy.story}"
                  </p>
                  <p className="text-sm text-gray-400">
                    — {services[activeService].caseStudy.client}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-500/20">
                <h3 className="text-2xl font-bold mb-2">Investment</h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                  {services[activeService].pricing}
                </p>
                <div className="space-y-4">
                  <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all">
                    Get Started with {services[activeService].title}
                  </button>
                  <button className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all">
                    Schedule Strategy Call
                  </button>
                </div>
              </div>

              {/* Additional CTAs */}
              <div className="text-center space-y-4">
                <p className="text-gray-400">
                  Want to combine multiple services?
                </p>
                <Link href="/#contact" className="text-blue-400 hover:text-blue-300 font-semibold">
                  Let's create a custom package →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Stop Reacting. <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Start Predicting.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 500+ companies using Hendricks.AI to see tomorrow today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Get Your Free Intelligence Report
            </button>
            <Link href="/" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}