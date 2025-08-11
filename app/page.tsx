'use client'

import { useState, useEffect } from 'react'

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
                className="h-8 w-auto object-contain"
              />
            </div>

            {/* Center Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Home', 'Services', 'How It Works', 'Results', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  {item}
                </a>
              ))}
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
              AI-Powered Marketing
            </span>
            <span className="block text-white mt-2">Intelligence Platform</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Predict demand 2-4 weeks early. Transform insights into revenue with 
            <span className="text-blue-400 font-semibold"> 95% accuracy</span> and 
            <span className="text-purple-400 font-semibold"> 3-4x ROI</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden">
              <span className="relative z-10">Start Free Analysis</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              Watch Demo
            </button>
          </div>

          {/* Animated Stats Bar */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { value: '500+', label: 'Companies Trust Us' },
              { value: '$2.5M', label: 'Revenue Generated' },
              { value: '24/7', label: 'AI Monitoring' }
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
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three simple steps to transform your marketing with AI intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Connect Your Data',
                description: 'Integrate your marketing channels and historical data in minutes',
                icon: '🔗'
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our AI analyzes patterns and predicts demand 2-4 weeks ahead',
                icon: '🤖'
              },
              {
                step: '03',
                title: 'Capture Revenue',
                description: 'Act on insights before competitors to maximize ROI',
                icon: '💰'
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <div className="text-blue-400 font-bold text-sm mb-2">STEP {item.step}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
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

      {/* Services Grid Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive AI solutions for every marketing challenge
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Demand Prediction',
                description: 'Forecast market demand with 95% accuracy using advanced AI algorithms',
                icon: '📊',
                gradient: 'from-blue-500 to-purple-500'
              },
              {
                title: 'Campaign Optimization',
                description: 'Automatically optimize ad spend and targeting for maximum ROI',
                icon: '🎯',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Competitive Intelligence',
                description: 'Track competitor moves and market shifts in real-time',
                icon: '🔍',
                gradient: 'from-green-500 to-blue-500'
              },
              {
                title: 'Content Strategy',
                description: 'AI-powered content recommendations based on demand signals',
                icon: '✍️',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                title: 'Revenue Attribution',
                description: 'Track and attribute revenue to specific marketing activities',
                icon: '💵',
                gradient: 'from-pink-500 to-purple-500'
              },
              {
                title: 'Custom Dashboards',
                description: 'Real-time analytics dashboards tailored to your needs',
                icon: '📈',
                gradient: 'from-cyan-500 to-blue-500'
              }
            ].map((service, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-transparent transition-all duration-300">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative p-8">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${service.gradient} group-hover:bg-clip-text transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
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
              See how companies like yours achieved breakthrough growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: 'TechCorp Inc.',
                result: '3.5x ROI',
                testimonial: 'Hendricks.AI helped us predict demand spikes and optimize our campaigns, resulting in 350% ROI increase.',
                author: 'Sarah Chen, CMO'
              },
              {
                company: 'E-Commerce Plus',
                result: '45% Cost Reduction',
                testimonial: 'We reduced our ad spend by 45% while increasing conversions by 60% using their AI predictions.',
                author: 'Michael Rodriguez, Director'
              },
              {
                company: 'Global Retail Co.',
                result: '$2M Revenue',
                testimonial: 'The demand intelligence platform helped us capture $2M in additional revenue in just 6 months.',
                author: 'Jennifer Park, VP Marketing'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  {item.result}
                </div>
                <p className="text-gray-300 mb-6 italic">"{item.testimonial}"</p>
                <div className="border-t border-gray-700 pt-4">
                  <p className="font-semibold">{item.author}</p>
                  <p className="text-sm text-gray-400">{item.company}</p>
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
            Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Transform Your Marketing?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 500+ companies using AI to predict demand and capture revenue before the competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Get Your Free Intelligence Report
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              Schedule Demo
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
                  className="h-6 w-auto object-contain"
                />
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                AI-powered marketing intelligence platform that predicts demand 2-4 weeks early with 95% accuracy.
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
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hendricks.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}