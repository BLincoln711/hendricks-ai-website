'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Premium Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/hendricks_logo.png" 
                alt="Hendricks.AI" 
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>

            {/* Center Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">Home</a>
              <Link href="/services" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">Services</Link>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">How It Works</a>
              <a href="#results" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">Results</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">Contact</a>
            </nav>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                Get Intelligence Report
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black animate-gradient-xy"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Demand Intelligence to
            </span>
            <span className="block text-white mt-2">Demand Capture</span>
          </h1>

          {/* Updated Subtitle with Actual Metrics */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The only AI agency that masters both Google Performance Max & Microsoft Copilot. 
            Predict demand 2-4 weeks early with 
            <span className="text-blue-400 font-semibold"> 74% accuracy</span> and 
            <span className="text-purple-400 font-semibold"> 312% ROI</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden">
              <span className="relative z-10">Get Free Intelligence Report</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              Watch 2-Min Demo
            </button>
          </div>

          {/* Updated Stats Bar with Real Metrics */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { value: '2-4', label: 'Weeks Advance Notice' },
              { value: '312%', label: 'Average ROI' },
              { value: '74%', label: 'Prediction Accuracy' }
            ].map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
            <div className="w-1 h-3 bg-white/50 rounded-full mx-auto animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                The Hendricks Method
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three phases to dominate your market before competitors know what&apos;s happening
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'PREDICT',
                description: 'Our AI analyzes billions of signals to identify demand 2-4 weeks before it materializes',
                icon: '🔮',
                timeline: 'Weeks -4 to -2'
              },
              {
                step: '02',
                title: 'AMPLIFY',
                description: 'Position your brand exactly where demand will spike, before competitors react',
                icon: '🚀',
                timeline: 'Weeks -2 to 0'
              },
              {
                step: '03',
                title: 'DOMINATE',
                description: 'Capture 73% share of voice with 5x conversion rates when demand peaks',
                icon: '👑',
                timeline: 'Week 0+'
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <div className="text-blue-400 font-bold text-sm mb-2">PHASE {item.step}</div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-xs text-purple-400 mb-3">{item.timeline}</p>
                  <p className="text-gray-400">{item.description}</p>
                  
                  {/* Connecting Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPDATED Services Grid Section - Your Actual Services */}
      <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The only agency mastering both Google AI Max & Microsoft Copilot ecosystems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Demand Intelligence',
                description: 'Predict market demand 2-4 weeks early with 74% accuracy using proprietary AI models',
                icon: '🔮',
                gradient: 'from-blue-500 to-purple-500',
                features: ['2-4 week advance', '74% accuracy', 'Custom ML models']
              },
              {
                title: 'Google Performance Max',
                description: 'Master Google\'s AI Max ecosystem with 14% higher conversions guaranteed',
                icon: '🚀',
                gradient: 'from-purple-500 to-pink-500',
                features: ['AI Max for Search', 'Smart Bidding', '95% coverage']
              },
              {
                title: 'Microsoft Copilot Ads',
                description: 'Dominate Microsoft ecosystem with 2.6x engagement and 32% lower CPA',
                icon: '🎯',
                gradient: 'from-green-500 to-blue-500',
                features: ['Copilot optimization', 'LinkedIn B2B', 'Edge targeting']
              },
              {
                title: 'Amplification Engine',
                description: 'Multi-channel orchestration that puts you everywhere at the perfect moment',
                icon: '📢',
                gradient: 'from-orange-500 to-red-500',
                features: ['Cross-platform sync', 'Dynamic creative', 'Attribution']
              },
              {
                title: 'Conversion Capture',
                description: 'Turn predictions into profits with 3-4x conversion rate improvements',
                icon: '💰',
                gradient: 'from-pink-500 to-purple-500',
                features: ['Landing page AI', 'Cart recovery', '312% ROI']
              },
              {
                title: 'Intelligence Command',
                description: 'Real-time dashboards and alerts for your AI marketing war room',
                icon: '📊',
                gradient: 'from-cyan-500 to-blue-500',
                features: ['Custom KPIs', 'Predictive alerts', 'White-label']
              }
            ].map((service, index) => (
              <Link href="/services" key={index} className="group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-transparent transition-all duration-300 block cursor-pointer">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative p-8">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">
                    {service.description}
                  </p>
                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                        {feature}
                      </span>
                    ))}
                  </div>
                  {/* Learn More Link */}
                  <div className="mt-4 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                    Learn More →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Below Services */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-300 mb-6">
              Stop reacting to yesterday&apos;s data. Start predicting tomorrow&apos;s opportunities.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all">
              See Your Custom Intelligence Report
            </button>
          </div>
        </div>
      </section>

      {/* Results/Testimonials Section */}
      <section id="results" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Proven Results
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real companies. Real results. Real ROI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: 'E-Commerce Giant',
                result: '312% ROI',
                testimonial: 'Hendricks.AI predicted Black Friday demand patterns 3 weeks early. We dominated while competitors scrambled.',
                author: 'Sarah Chen, CMO',
                metric: '$2.3M additional revenue'
              },
              {
                company: 'SaaS Startup',
                result: '14% Conversion Lift',
                testimonial: 'Google Performance Max optimization drove 14% higher conversions at 32% lower CPA. Game-changing.',
                author: 'Michael Rodriguez, Growth Lead',
                metric: '5,400 new customers'
              },
              {
                company: 'B2B Enterprise',
                result: '2.6x Engagement',
                testimonial: 'Microsoft Copilot Ads integration reached decision-makers we never could before. LinkedIn targeting is incredible.',
                author: 'Jennifer Park, VP Marketing',
                metric: '73% pipeline increase'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {item.result}
                </div>
                <div className="text-sm text-green-400 mb-4">{item.metric}</div>
                <p className="text-gray-300 mb-6 italic">&quot;{item.testimonial}&quot;</p>
                <div className="border-t border-gray-700 pt-4">
                  <p className="font-semibold">{item.author}</p>
                  <p className="text-sm text-gray-400">{item.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Investment Levels
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transparent pricing. Guaranteed results. No surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Intelligence Starter',
                price: '$5-10K',
                period: '/month',
                features: [
                  'Demand prediction for 1 market',
                  'Google Ads management',
                  'Monthly intelligence reports',
                  'Email support',
                  'Basic dashboard access'
                ],
                cta: 'Start Predicting',
                gradient: 'from-gray-600 to-gray-700'
              },
              {
                name: 'Growth Accelerator',
                price: '$10-25K',
                period: '/month',
                features: [
                  'Multi-market demand prediction',
                  'Google + Microsoft management',
                  'Weekly intelligence briefings',
                  'Dedicated account manager',
                  'Custom dashboards',
                  'Conversion optimization'
                ],
                cta: 'Accelerate Growth',
                gradient: 'from-blue-600 to-purple-600',
                popular: true
              },
              {
                name: 'Market Dominator',
                price: '$25K+',
                period: '/month',
                features: [
                  'Unlimited market coverage',
                  'Full-stack management',
                  'Daily intelligence updates',
                  'Strategic consulting',
                  'White-glove service',
                  'Custom ML models',
                  'C-suite reporting'
                ],
                cta: 'Dominate Market',
                gradient: 'from-purple-600 to-pink-600'
              }
            ].map((tier, index) => (
              <div key={index} className={`relative rounded-2xl ${tier.popular ? 'scale-105' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className={`bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border ${tier.popular ? 'border-blue-500' : 'border-gray-800'} h-full`}>
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-gray-400">{tier.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-semibold bg-gradient-to-r ${tier.gradient} text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                    {tier.cta}
                  </button>
                </div>
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
            Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">See Tomorrow Today?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get your free Intelligence Report and discover demand opportunities your competitors won&apos;t see for weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Get Your Free Intelligence Report
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              Schedule Strategy Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="mb-4">
                <img 
                  src="/hendricks_logo.png" 
                  alt="Hendricks.AI" 
                  className="h-6 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The only AI-powered marketing intelligence platform that predicts demand 2-4 weeks early with 74% accuracy. Master both Google & Microsoft ecosystems.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'linkedin', 'facebook'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                    <span className="text-gray-400 text-sm">{social[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Demand Intelligence</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Google Performance Max</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Microsoft Copilot</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Intelligence Command</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hendricks.AI - Demand Intelligence to Demand Capture. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}