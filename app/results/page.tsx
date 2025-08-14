'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ResultsPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Results', icon: '🎯' },
    { id: 'ecommerce', label: 'E-Commerce', icon: '🛒' },
    { id: 'b2b', label: 'B2B/SaaS', icon: '💼' },
    { id: 'retail', label: 'Retail', icon: '🏪' },
    { id: 'services', label: 'Services', icon: '🔧' }
  ]

  const caseStudies = [
    {
      id: 1,
      category: 'ecommerce',
      company: 'Fashion E-Commerce Brand',
      industry: 'Fashion & Apparel',
      logo: '👗',
      challenge: 'Struggling to predict seasonal demand and losing market share to fast-fashion competitors.',
      solution: 'Implemented Hendricks.AI to predict fashion trends 3 weeks early and position inventory accordingly.',
      results: {
        headline: '312% ROI in 6 Months',
        metrics: [
          { label: 'Revenue Increase', value: '+$2.3M', change: '+156%' },
          { label: 'Prediction Accuracy', value: '76%', change: '+52%' },
          { label: 'Cost Per Acquisition', value: '$12.50', change: '-68%' },
          { label: 'Inventory Turnover', value: '8.2x', change: '+3.4x' }
        ],
        quote: 'Hendricks.AI predicted the oversized blazer trend 3 weeks before it exploded. We captured 73% market share while competitors scrambled.',
        author: 'Sarah Chen, CMO'
      },
      timeline: '6 months',
      services: ['Demand Intelligence', 'Google Performance Max', 'Conversion Capture']
    },
    {
      id: 2,
      category: 'b2b',
      company: 'Enterprise SaaS Platform',
      industry: 'Software/Technology',
      logo: '💻',
      challenge: 'High customer acquisition costs and inability to identify when enterprises are in-market for their solution.',
      solution: 'Used Bing Performance Max integration to reach decision-makers at the exact moment of need.',
      results: {
        headline: '2.6x Pipeline Growth',
        metrics: [
          { label: 'Pipeline Generated', value: '$4.8M', change: '+260%' },
          { label: 'Lead Quality Score', value: '8.7/10', change: '+4.2' },
          { label: 'Sales Cycle', value: '42 days', change: '-35%' },
          { label: 'Customer LTV', value: '$127K', change: '+89%' }
        ],
        quote: 'The Bing Performance Max integration reached C-suite executives we could never access before. Game-changing for enterprise sales.',
        author: 'Michael Rodriguez, VP Sales'
      },
      timeline: '4 months',
      services: ['Bing Performance Max', 'Intelligence Command', 'Demand Intelligence']
    },
    {
      id: 3,
      category: 'retail',
      company: 'Multi-Location Retail Chain',
      industry: 'Home Improvement',
      logo: '🏠',
      challenge: 'Seasonal demand fluctuations and competition from big-box stores made planning impossible.',
      solution: 'Predictive analytics for local market demand, coordinated with inventory and staffing.',
      results: {
        headline: '45% Profit Increase',
        metrics: [
          { label: 'Same-Store Sales', value: '+28%', change: 'YoY' },
          { label: 'Inventory Efficiency', value: '94%', change: '+31%' },
          { label: 'Marketing ROI', value: '5.2x', change: '+2.8x' },
          { label: 'Foot Traffic', value: '+42%', change: 'vs prior' }
        ],
        quote: 'We knew about the DIY deck-building trend 3 weeks early. Stocked up on materials and dominated the spring season.',
        author: 'Jennifer Park, Regional Manager'
      },
      timeline: '3 months',
      services: ['Demand Intelligence', 'Amplification Engine', 'Google Performance Max']
    },
    {
      id: 4,
      category: 'services',
      company: 'Legal Services Firm',
      industry: 'Professional Services',
      logo: '⚖️',
      challenge: 'Unpredictable client acquisition and high competition for specific case types.',
      solution: 'AI-powered demand prediction for legal services searches and intent signals.',
      results: {
        headline: '4x Lead Generation',
        metrics: [
          { label: 'Qualified Leads', value: '847/mo', change: '+412%' },
          { label: 'Cost Per Lead', value: '$47', change: '-73%' },
          { label: 'Case Win Rate', value: '78%', change: '+23%' },
          { label: 'Revenue/Partner', value: '$2.1M', change: '+167%' }
        ],
        quote: 'Hendricks.AI predicted the surge in employment law cases after tech layoffs. We were ready while others were reactive.',
        author: 'David Thompson, Managing Partner'
      },
      timeline: '5 months',
      services: ['Demand Intelligence', 'Conversion Capture', 'Intelligence Command']
    },
    {
      id: 5,
      category: 'ecommerce',
      company: 'Subscription Box Service',
      industry: 'Consumer Goods',
      logo: '📦',
      challenge: 'High churn rates and difficulty predicting which products would resonate with subscribers.',
      solution: 'Predictive analytics for product selection and personalized marketing campaigns.',
      results: {
        headline: '67% Churn Reduction',
        metrics: [
          { label: 'Monthly Churn', value: '2.8%', change: '-67%' },
          { label: 'LTV:CAC Ratio', value: '4.2:1', change: '+2.8x' },
          { label: 'Subscriber NPS', value: '72', change: '+31' },
          { label: 'Monthly Revenue', value: '$3.4M', change: '+234%' }
        ],
        quote: 'We now know what customers want before they do. Hendricks.AI transformed our entire business model.',
        author: 'Amanda Foster, CEO'
      },
      timeline: '8 months',
      services: ['Demand Intelligence', 'Conversion Capture', 'Amplification Engine']
    }
  ]

  const aggregateStats = {
    totalRevenue: '$47.3M',
    avgROI: '312%',
    companiesServed: '500+',
    predictionsDelivered: '2.8M+'
  }

  const filteredCaseStudies = activeCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeCategory)

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
              <Link href="/solutions" className="text-gray-300 hover:text-white transition-colors">Solutions</Link>
              <Link href="/results" className="text-white font-semibold">Results</Link>
              <Link href="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
            <a href="https://calendar.app.google/DHopiSfnLiH5xwKo9" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105">
              Book Strategy Call
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black animate-gradient-xy"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Proven Results
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
              Real companies. Real outcomes. See how businesses like yours achieved 
              breakthrough growth with predictive AI marketing.
            </p>
          </div>

          {/* Aggregate Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Total Revenue Generated', value: aggregateStats.totalRevenue },
              { label: 'Average ROI', value: aggregateStats.avgROI },
              { label: 'Companies Served', value: aggregateStats.companiesServed },
              { label: 'Predictions Delivered', value: aggregateStats.predictionsDelivered }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {filteredCaseStudies.map((study, index) => (
              <div
                key={study.id}
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  {/* Left Column - Company Info & Challenge */}
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-5xl mb-4">{study.logo}</div>
                        <h3 className="text-2xl font-bold mb-2">{study.company}</h3>
                        <p className="text-gray-400">{study.industry}</p>
                      </div>
                      <div className="text-sm text-purple-400 bg-purple-900/20 px-3 py-1 rounded-full">
                        {study.timeline}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-2">The Challenge</h4>
                      <p className="text-gray-300">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-2">The Solution</h4>
                      <p className="text-gray-300">{study.solution}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {study.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 bg-gray-800 rounded-full text-gray-300"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Results */}
                  <div className="space-y-6">
                    <div className="text-center lg:text-left">
                      <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {study.results.headline}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {study.results.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-gray-900/50 p-4 rounded-xl">
                          <div className="text-2xl font-bold text-white">{metric.value}</div>
                          <div className="text-xs text-gray-400">{metric.label}</div>
                          <div className="text-xs text-green-400">{metric.change}</div>
                        </div>
                      ))}
                    </div>

                    <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                      <p className="text-gray-300 mb-2">"{study.results.quote}"</p>
                      <cite className="text-sm text-gray-400 not-italic">— {study.results.author}</cite>
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                By The Numbers
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Consistent results across industries and company sizes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                metric: 'Average Prediction Accuracy',
                value: '74%',
                comparison: 'vs 23% industry standard',
                icon: '🎯'
              },
              {
                metric: 'Time to First Results',
                value: '30 days',
                comparison: 'vs 6+ months traditional',
                icon: '⚡'
              },
              {
                metric: 'Client Retention Rate',
                value: '94%',
                comparison: 'vs 67% agency average',
                icon: '🤝'
              }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-300 mb-1">{stat.metric}</div>
                <div className="text-sm text-gray-500">{stat.comparison}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                What Our Clients Say
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "Hendricks.AI isn't just an agency, they're a competitive advantage. The predictions are scary accurate.",
                author: "Marcus Johnson",
                title: "CEO, TechStart Inc.",
                rating: 5
              },
              {
                quote: "We've tried every marketing platform. Nothing comes close to the ROI we get with Hendricks.AI.",
                author: "Lisa Wang",
                title: "CMO, Global Retail Co.",
                rating: 5
              },
              {
                quote: "The Bing Performance Max integration alone paid for the entire year. Absolute game-changer for B2B.",
                author: "Robert Chen",
                title: "VP Sales, Enterprise SaaS",
                rating: 5
              },
              {
                quote: "3 weeks advance notice on trends. It's like having a crystal ball for your marketing.",
                author: "Sarah Martinez",
                title: "Director of Marketing",
                rating: 5
              },
              {
                quote: "Cut our CAC by 73% while tripling lead quality. The math doesn't lie.",
                author: "James Thompson",
                title: "Growth Lead, Startup",
                rating: 5
              },
              {
                quote: "Finally, an AI solution that actually delivers on its promises. Highly recommended.",
                author: "Emily Foster",
                title: "Founder, D2C Brand",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.title}</p>
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
            Ready to Write Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Success Story?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 500+ companies achieving breakthrough results with Hendricks.AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Get Your Free Intelligence Report
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