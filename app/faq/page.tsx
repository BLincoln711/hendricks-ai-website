'use client'

import Link from 'next/link'
import { useState } from 'react'

const faqs = [
  {
    category: 'About Predictive AI Marketing',
    questions: [
      {
        q: 'How can you really predict market demand 2-4 weeks in advance?',
        a: 'Our proprietary AI models analyze over 2.8 million data points daily across search patterns, social signals, competitor movements, and industry trends. By identifying micro-patterns that precede major market shifts, we achieve 74% prediction accuracy. This isn\'t magic — it\'s systematic pattern recognition at scale.'
      },
      {
        q: 'What makes your predictions more accurate than Google\'s own AI?',
        a: 'Google\'s AI optimizes for their platform alone. We aggregate signals across Google, Microsoft, social platforms, and proprietary data sources. Our models are specifically trained on marketing performance data, not general search patterns. Plus, we see cross-platform trends Google\'s siloed data might miss.'
      },
      {
        q: 'Is 74% accuracy really good enough to bet my marketing budget on?',
        a: 'Consider this: even with 74% accuracy, you\'re positioned for opportunities 2-4 weeks before competitors who have 0% foresight. Our clients see an average 312% ROI because being mostly right with advance notice beats being perfectly reactive. Plus, our recommendations include confidence scores so you can adjust investment accordingly.'
      }
    ]
  },
  {
    category: 'Services & Implementation',
    questions: [
      {
        q: 'Why do I need both Google AND Bing Performance Max?',
        a: 'While Google has larger market share, our data shows Bing users have 41% higher average order values and 2.6x higher B2B engagement rates. Plus, Bing Performance Max faces 28% less competition, meaning lower CPCs for high-value keywords. Running both captures the full market while competitors fight over Google-only inventory.'
      },
      {
        q: 'How quickly can I see results from predictive intelligence?',
        a: 'Initial insights are delivered within 48 hours via your custom Intelligence Report. Campaign optimizations based on predictions typically show impact within 7-14 days. Full ROI acceleration is usually evident by day 30, with compound benefits growing over time as our models learn your specific market dynamics.'
      },
      {
        q: 'Do you require long-term contracts?',
        a: 'No. We offer month-to-month engagements because our results speak for themselves. Our 94% client retention rate exists because clients choose to stay, not because they\'re locked in. That said, predictive intelligence improves over time, so longer engagements yield exponentially better results.'
      }
    ]
  },
  {
    category: 'Pricing & Investment',
    questions: [
      {
        q: 'What\'s the minimum budget to work with Hendricks.AI?',
        a: 'We typically work with clients investing $10,000+ per month in digital marketing. This isn\'t about being exclusive — it\'s about having enough data and budget flexibility to act on predictions effectively. Smaller budgets can\'t pivot quickly enough to capitalize on the 2-4 week windows we identify.'
      },
      {
        q: 'How do your fees work?',
        a: 'We offer two models: 1) Flat monthly retainer based on service scope, or 2) Performance-based pricing tied to ROI improvements. Most clients prefer the predictability of retainers, which range from $5,000-$25,000/month depending on spend levels and service complexity. This is in addition to your ad spend.'
      },
      {
        q: 'What\'s included in the monthly investment?',
        a: 'Everything needed for predictive marketing success: demand intelligence reports, campaign management across Google and Bing, creative optimization, weekly predictions, conversion tracking setup, monthly strategy calls, and white-label reporting. We don\'t nickel-and-dime — if it\'s needed for success, it\'s included.'
      }
    ]
  },
  {
    category: 'Technology & Data',
    questions: [
      {
        q: 'How do you protect my competitive advantage?',
        a: 'Your data trains models specific to your account — we never share insights across clients. All data is encrypted, access is role-based, and we sign comprehensive NDAs. Your predictive advantages remain yours exclusively. We\'re SOC 2 compliant and undergo annual security audits.'
      },
      {
        q: 'What data do you need from me to get started?',
        a: 'Initially, just read-only access to your Google Ads, Analytics, and Microsoft Advertising accounts. For deeper predictions, we may request CRM data, historical sales data, and competitive intelligence you\'ve gathered. The more data we have, the more accurate our predictions become.'
      },
      {
        q: 'Can your system integrate with my existing marketing stack?',
        a: 'Yes. We integrate with all major platforms including Salesforce, HubSpot, Marketo, Google Analytics 4, Microsoft Clarity, and most CRMs. Our API can push predictive insights directly into your existing workflows. If you use it for marketing, we probably integrate with it.'
      }
    ]
  },
  {
    category: 'Results & Guarantees',
    questions: [
      {
        q: 'Do you guarantee specific results?',
        a: 'We guarantee our prediction accuracy (74%) and our process, not specific ROI outcomes. Why? Because results depend on factors beyond predictions — your offer quality, competitive landscape, and execution speed. That said, our average client sees 312% ROI, and we\'re confident enough to offer performance-based pricing options.'
      },
      {
        q: 'What if your predictions are wrong?',
        a: 'With 74% accuracy, we\'re wrong 26% of the time. But here\'s the key: being wrong about a future trend is far less costly than missing an opportunity entirely. Our recommendations always include confidence levels and portfolio approaches to minimize downside while maximizing upside capture.'
      },
      {
        q: 'How do you measure and report success?',
        a: 'We track both predictive accuracy and business outcomes. Monthly reports show: prediction hit rates, ROI by channel, cost per acquisition trends, revenue attribution, and competitive share of voice. Our custom dashboards update in real-time, so you always know exactly how predictions translate to performance.'
      }
    ]
  },
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What happens after I submit the contact form?',
        a: 'Within 24 hours, you\'ll receive your custom Intelligence Report showing hidden opportunities in your market. We\'ll schedule a 30-minute strategy call to discuss findings and potential ROI. If we\'re a fit, we can begin implementation within 48 hours. No lengthy onboarding — we move at market speed.'
      },
      {
        q: 'Who will actually manage my campaigns?',
        a: 'Your account is managed by senior strategists with 10+ years of experience, overseen directly by Brandon Lincoln Hendricks. We don\'t outsource or use junior staff for strategy. Our AI handles predictions; experienced humans handle strategy and relationships.'
      },
      {
        q: 'What makes you different from other agencies using "AI"?',
        a: 'Most agencies use "AI" to mean Google\'s automated bidding. We\'ve built proprietary predictive models trained on millions of marketing-specific data points. We\'re not using off-the-shelf tools — we\'re applying genuine machine learning to see market shifts before they happen. Plus, we\'re the only agency truly optimizing both Google AND Bing Performance Max with predictive intelligence.'
      }
    ]
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(section => section.category === selectedCategory)

  const categories = ['All', ...faqs.map(section => section.category)]

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
              <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
              <Link href="/results" className="text-gray-300 hover:text-white transition-colors">Results</Link>
              <Link href="/insights" className="text-gray-300 hover:text-white transition-colors">Insights</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/faq" className="text-white font-semibold">FAQ</Link>
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about predictive AI marketing and how Hendricks.AI helps you see demand before it happens.
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

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">{section.category}</h2>
              <div className="space-y-4">
                {section.questions.map((item, itemIndex) => {
                  const itemId = `${sectionIndex}-${itemIndex}`
                  const isOpen = openItems.has(itemId)
                  
                  return (
                    <div key={itemIndex} className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-900/70 transition-colors"
                      >
                        <span className="font-medium text-lg pr-8">{item.q}</span>
                        <span className={`flex-shrink-0 text-blue-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-300 leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-blue-900/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get your custom Intelligence Report and see exactly how predictive AI can transform your marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Get Your Intelligence Report
            </Link>
            <Link href="/insights" className="inline-block px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 border border-gray-700">
              Read Our Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 Hendricks.AI - Demand Intelligence to Demand Capture. All rights reserved.</p>
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