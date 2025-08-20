'use client'

import Link from 'next/link'
import { useState } from 'react'

const resources = [
  {
    category: 'Guides & Whitepapers',
    items: [
      {
        title: 'The Predictive Marketing Playbook 2025',
        description: 'Complete guide to implementing AI-driven demand prediction in your marketing strategy. Includes frameworks, case studies, and ROI calculations.',
        type: 'PDF Guide',
        pages: '42 pages',
        icon: '📘',
        downloadUrl: '#',
        gated: true
      },
      {
        title: 'Dual Performance Max Mastery',
        description: 'How to run synchronized Google and Bing Performance Max campaigns for 10% higher ROAS. Includes optimization checklists and budget allocation models.',
        type: 'Whitepaper',
        pages: '28 pages',
        icon: '📊',
        downloadUrl: '#',
        gated: true
      },
      {
        title: 'B2B Demand Intelligence Report',
        description: 'Industry analysis of how predictive AI is transforming B2B marketing. Features data from 500+ campaigns and exclusive insights.',
        type: 'Industry Report',
        pages: '35 pages',
        icon: '📈',
        downloadUrl: '#',
        gated: true
      },
      {
        title: 'The CMO\'s Guide to AI Marketing',
        description: 'Executive briefing on predictive intelligence, ROI expectations, and implementation roadmaps for enterprise marketing teams.',
        type: 'Executive Brief',
        pages: '16 pages',
        icon: '💼',
        downloadUrl: '#',
        gated: true
      }
    ]
  },
  {
    category: 'Templates & Tools',
    items: [
      {
        title: 'Predictive Marketing ROI Calculator',
        description: 'Excel template to calculate potential ROI from implementing predictive intelligence in your marketing stack.',
        type: 'Excel Template',
        pages: '5 worksheets',
        icon: '🧮',
        downloadUrl: '#',
        gated: false
      },
      {
        title: 'Performance Max Audit Checklist',
        description: 'Comprehensive checklist for auditing and optimizing your Google and Bing Performance Max campaigns.',
        type: 'PDF Checklist',
        pages: '8 pages',
        icon: '✅',
        downloadUrl: '#',
        gated: false
      },
      {
        title: 'Demand Forecasting Template',
        description: 'Framework for tracking and predicting demand signals in your industry. Includes KPI dashboard template.',
        type: 'Google Sheets',
        pages: 'Interactive',
        icon: '📋',
        downloadUrl: '#',
        gated: true
      },
      {
        title: 'Campaign Launch Planner',
        description: '30-day campaign planning template aligned with predictive intelligence windows.',
        type: 'PDF Template',
        pages: '12 pages',
        icon: '🚀',
        downloadUrl: '#',
        gated: false
      }
    ]
  },
  {
    category: 'Case Studies',
    items: [
      {
        title: 'SaaS Company: 312% ROI in 6 Months',
        description: 'How a B2B SaaS company used predictive intelligence to transform their marketing performance and reduce CAC by 43%.',
        type: 'Case Study',
        pages: '18 pages',
        icon: '💡',
        downloadUrl: '#',
        gated: true
      },
      {
        title: 'E-commerce: Predicting Seasonal Demand',
        description: 'Fashion retailer captures $2.3M in additional revenue by predicting trend shifts 3 weeks early.',
        type: 'Case Study',
        pages: '14 pages',
        icon: '🛍️',
        downloadUrl: '#',
        gated: true
      },
      {
        title: 'Enterprise: Dual Platform Success',
        description: 'Fortune 500 company achieves 10% ROAS lift by adding Bing Performance Max to their Google-only strategy.',
        type: 'Case Study',
        pages: '20 pages',
        icon: '🏢',
        downloadUrl: '#',
        gated: true
      }
    ]
  },
  {
    category: 'Quick Start Resources',
    items: [
      {
        title: '5-Minute Intelligence Report Sample',
        description: 'See exactly what insights our AI uncovers in a real market analysis.',
        type: 'PDF Sample',
        pages: '8 pages',
        icon: '⚡',
        downloadUrl: '#',
        gated: false
      },
      {
        title: 'Predictive Marketing Glossary',
        description: 'Essential terms and concepts for understanding AI-driven marketing.',
        type: 'PDF Guide',
        pages: '6 pages',
        icon: '📖',
        downloadUrl: '#',
        gated: false
      },
      {
        title: 'ROI Benchmark Report',
        description: 'Industry benchmarks for predictive marketing performance across verticals.',
        type: 'PDF Report',
        pages: '10 pages',
        icon: '📊',
        downloadUrl: '#',
        gated: false
      }
    ]
  }
]

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showDownloadForm, setShowDownloadForm] = useState(false)
  const [selectedResource, setSelectedResource] = useState<any>(null)

  const categories = ['All', ...resources.map(section => section.category)]
  
  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(section => section.category === selectedCategory)

  const handleDownload = (resource: any) => {
    if (resource.gated) {
      setSelectedResource(resource)
      setShowDownloadForm(true)
    } else {
      // Direct download for ungated resources
      alert('Download started: ' + resource.title)
    }
  }

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
              <Link href="/results" className="text-gray-300 hover:text-white transition-colors">Results</Link>
              <Link href="/insights" className="text-gray-300 hover:text-white transition-colors">Insights</Link>
              <Link href="/resources" className="text-white font-semibold">Resources</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            </div>
            <a href="https://calendar.app.google/DHopiSfnLiH5xwKo9" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105">
              Book Strategy Call
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Resources & Downloads
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Free guides, templates, and tools to help you implement predictive AI marketing and accelerate your growth.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-blue-400">{section.category}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {section.items.map((resource, resourceIndex) => (
                  <div key={resourceIndex} className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-200">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl flex-shrink-0">{resource.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                        <p className="text-gray-300 mb-4">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-400">
                            <span>{resource.type}</span>
                            <span className="mx-2">•</span>
                            <span>{resource.pages}</span>
                          </div>
                          <button
                            onClick={() => handleDownload(resource)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                          >
                            {resource.gated ? (
                              <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                  <path d="M7 11V7a5 5 0 0110 0v4"></path>
                                </svg>
                                Get Access
                              </>
                            ) : (
                              <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                                  <polyline points="7 10 12 15 17 10"></polyline>
                                  <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Download
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900/30 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400">15+</div>
              <div className="text-gray-400 mt-2">Resources Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">5,000+</div>
              <div className="text-gray-400 mt-2">Downloads</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400">4.8/5</div>
              <div className="text-gray-400 mt-2">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400">Weekly</div>
              <div className="text-gray-400 mt-2">New Resources</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-blue-900/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready for Personalized Intelligence?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Discuss your specific needs and get a custom Intelligence Report tailored to your market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendar.app.google/DHopiSfnLiH5xwKo9" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              📅 Book Strategy Call
            </a>
            <Link href="/contact" className="inline-block px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 border border-gray-700">
              Get Intelligence Report
            </Link>
          </div>
        </div>
      </section>

      {/* Download Form Modal */}
      {showDownloadForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-800">
            <h3 className="text-2xl font-bold mb-4">Get Instant Access</h3>
            <p className="text-gray-300 mb-6">
              Enter your details to download: <span className="font-semibold text-blue-400">{selectedResource?.title}</span>
            </p>
            <form onSubmit={(e) => {
              e.preventDefault()
              alert('Download link sent to your email!')
              setShowDownloadForm(false)
            }}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Business Email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Company"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Get Download Link
                </button>
                <button
                  type="button"
                  onClick={() => setShowDownloadForm(false)}
                  className="px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 Hendricks.AI. Demand Intelligence to Demand Capture. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}