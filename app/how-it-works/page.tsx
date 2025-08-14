'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HowItWorksPage() {
  const [activePhase, setActivePhase] = useState(0)

  const phases = [
    {
      id: 0,
      step: '01',
      title: 'PREDICT',
      subtitle: 'See Tomorrow Today',
      timeline: 'Weeks -4 to -2',
      icon: '🔮',
      color: 'from-blue-500 to-purple-500',
      overview: 'Our AI analyzes billions of signals to identify demand 2-4 weeks before it materializes',
      details: [
        {
          title: 'Data Collection',
          description: 'We aggregate data from 100+ sources including search trends, social signals, competitor movements, and market indicators.'
        },
        {
          title: 'Pattern Recognition',
          description: 'Machine learning models identify subtle patterns that human analysts miss, with 74% accuracy in demand prediction.'
        },
        {
          title: 'Signal Processing',
          description: 'Real-time processing of emerging trends, viral content, and market shifts that indicate future demand.'
        },
        {
          title: 'Predictive Modeling',
          description: 'Custom AI models trained on your industry data to forecast specific demand for your products and services.'
        }
      ],
      outcomes: [
        '2-4 week advance notice on demand spikes',
        '74% prediction accuracy',
        'Daily intelligence updates',
        'Competitor blind spot identification'
      ]
    },
    {
      id: 1,
      step: '02',
      title: 'AMPLIFY',
      subtitle: 'Position for Impact',
      timeline: 'Weeks -2 to 0',
      icon: '🚀',
      color: 'from-purple-500 to-pink-500',
      overview: 'Position your brand exactly where demand will spike, before competitors react',
      details: [
        {
          title: 'Strategic Positioning',
          description: 'Place your ads, content, and inventory in the exact channels where demand will emerge.'
        },
        {
          title: 'Budget Optimization',
          description: 'Shift budget to high-opportunity areas before prices increase from competition.'
        },
        {
          title: 'Creative Alignment',
          description: 'Tailor messaging to match predicted demand patterns and customer intent.'
        },
        {
          title: 'Channel Orchestration',
          description: 'Coordinate across Google, Microsoft, social, and other channels for maximum impact.'
        }
      ],
      outcomes: [
        'First-mover advantage in emerging trends',
        '32% lower CPA than competitors',
        'Premium placement before demand peaks',
        'Optimized creative messaging'
      ]
    },
    {
      id: 2,
      step: '03',
      title: 'DOMINATE',
      subtitle: 'Capture the Market',
      timeline: 'Week 0+',
      icon: '👑',
      color: 'from-pink-500 to-orange-500',
      overview: 'Capture 73% share of voice with 5x conversion rates when demand peaks',
      details: [
        {
          title: 'Market Domination',
          description: 'When demand materializes, you\'re already positioned to capture the majority of traffic and conversions.'
        },
        {
          title: 'Conversion Optimization',
          description: 'Landing pages and funnels optimized based on predicted user behavior patterns.'
        },
        {
          title: 'Competitive Blocking',
          description: 'Strategic bidding to prevent competitors from gaining foothold in your predicted markets.'
        },
        {
          title: 'Scale Management',
          description: 'Infrastructure ready to handle 10x normal traffic when viral demand hits.'
        }
      ],
      outcomes: [
        '73% average share of voice',
        '5x conversion rates vs baseline',
        '312% ROI on captured demand',
        'Sustained market leadership'
      ]
    }
  ]

  const processSteps = [
    {
      week: 'Week 1',
      title: 'Onboarding & Integration',
      tasks: [
        'Connect your Google Ads, Microsoft Ads, and analytics platforms',
        'Install tracking pixels and configure conversion tracking',
        'Historical data analysis and baseline establishment',
        'Custom AI model training begins'
      ]
    },
    {
      week: 'Week 2-3',
      title: 'Intelligence Gathering',
      tasks: [
        'AI models analyze your market and competition',
        'Identify demand patterns and cycles',
        'Build predictive models specific to your business',
        'Create initial demand forecasts'
      ]
    },
    {
      week: 'Week 4+',
      title: 'Active Prediction & Optimization',
      tasks: [
        'Daily demand predictions delivered',
        'Automated campaign adjustments',
        'Real-time budget allocation',
        'Continuous model improvement'
      ]
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
              <Link href="/solutions" className="text-gray-300 hover:text-white transition-colors">Solutions</Link>
              <Link href="/how-it-works" className="text-white font-semibold">How It Works</Link>
              <Link href="/results" className="text-gray-300 hover:text-white transition-colors">Results</Link>
              <Link href="/insights" className="text-gray-300 hover:text-white transition-colors">Insights</Link>
              <Link href="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
            <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105">
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
              The Hendricks Method
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
            Three phases to dominate your market before competitors know what's happening. 
            See demand coming, position perfectly, capture everything.
          </p>
        </div>
      </section>

      {/* Phase Selector */}
      <section className="py-12 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            {phases.map((phase, index) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(index)}
                className={`relative px-8 py-4 rounded-xl transition-all duration-300 ${
                  activePhase === index
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg'
                    : 'hover:bg-gray-900/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{phase.icon}</span>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">PHASE {phase.step}</div>
                    <div className="font-bold">{phase.title}</div>
                    <div className="text-xs text-purple-400">{phase.timeline}</div>
                  </div>
                </div>
                {activePhase === index && (
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${phase.color} rounded-b-xl`}></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Phase Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Overview */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`text-6xl p-4 rounded-2xl bg-gradient-to-br ${phases[activePhase].color} bg-opacity-10`}>
                    {phases[activePhase].icon}
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold">{phases[activePhase].title}</h2>
                    <p className="text-xl text-gray-400">{phases[activePhase].subtitle}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {phases[activePhase].overview}
                </p>
              </div>

              <div className="space-y-6">
                {phases[activePhase].details.map((detail, index) => (
                  <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                    <h3 className="text-xl font-bold mb-2 text-blue-400">{detail.title}</h3>
                    <p className="text-gray-300">{detail.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Outcomes & Visual */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Expected Outcomes
                </h3>
                <ul className="space-y-4">
                  {phases[activePhase].outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-400 mr-3 text-xl">✓</span>
                      <span className="text-lg text-gray-300">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Timeline */}
              <div className="bg-gray-900/30 p-8 rounded-2xl border border-gray-800">
                <h3 className="text-xl font-bold mb-6">Timeline Visualization</h3>
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                  {phases.map((phase, index) => (
                    <div key={index} className={`relative flex items-center mb-8 ${index === activePhase ? 'opacity-100' : 'opacity-40'}`}>
                      <div className={`absolute left-8 w-4 h-4 rounded-full transform -translate-x-1/2 ${
                        index === activePhase ? 'bg-blue-500 ring-4 ring-blue-500/30' : 'bg-gray-600'
                      }`}></div>
                      <div className="ml-16">
                        <div className="text-sm text-gray-400">{phase.timeline}</div>
                        <div className="font-semibold">{phase.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Journey to Market Domination
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From onboarding to optimization in 30 days
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 h-full">
                  <div className="text-blue-400 font-bold text-sm mb-2">{step.week}</div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <ul className="space-y-3">
                    {step.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span className="text-gray-300 text-sm">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Powered by Advanced AI
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The technology stack that makes prediction possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Machine Learning',
                description: 'Custom neural networks trained on your industry data',
                icon: '🧠'
              },
              {
                title: 'Big Data Processing',
                description: 'Analyzing billions of signals in real-time',
                icon: '📊'
              },
              {
                title: 'API Integrations',
                description: 'Connected to 100+ data sources and platforms',
                icon: '🔗'
              },
              {
                title: 'Predictive Analytics',
                description: 'Statistical models with 74% accuracy',
                icon: '📈'
              }
            ].map((tech, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all">
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h3 className="text-lg font-bold mb-2">{tech.title}</h3>
                <p className="text-sm text-gray-400">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 opacity-50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Predict Your Future?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 500+ companies using the Hendricks Method to dominate their markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Your 30-Day Journey
            </button>
            <Link href="/solutions" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}