'use client'

import Link from 'next/link'
import { useState } from 'react'

// Sample blog posts data - in production, this would come from a CMS or database
const blogPosts = [
  {
    id: 'google-meridian-mmm-predictive-ai',
    title: 'Google Meridian MMM Meets Predictive AI: The Future of Marketing Attribution',
    excerpt: 'Breaking analysis: How Hendricks.AI\'s predictive capabilities enhance Google\'s new Meridian MMM framework to forecast incrementality before spending. Learn how to combine historical MMM with forward-looking AI.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-19',
    readTime: '6 min read',
    category: 'AI Marketing',
    featured: true,
    image: '/blog/meridian-mmm-hero.jpg'
  },
  {
    id: 'ai-marketing-beyond-smart-bidding',
    title: 'AI Marketing Beyond Smart Bidding: How Custom AI Models Reduce CPA by 32%',
    excerpt: 'Google\'s Smart Bidding is just the beginning. Learn how proprietary AI models can predict bid adjustments with 74% accuracy, reducing CPA by 32% while your competitors plateau at 15%.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-16',
    readTime: '12 min read',
    category: 'AI Marketing',
    featured: true,
    image: '/blog/ai-bidding-hero.jpg'
  },
  {
    id: 'predictive-ai-marketing-2025',
    title: 'The Future of Marketing: How Predictive AI Changes Everything in 2025',
    excerpt: 'Traditional marketing reacts to yesterday\'s data. Predictive AI sees tomorrow\'s opportunities. Learn how forward-thinking brands are using AI to anticipate demand 2-4 weeks before competitors.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-14',
    readTime: '12 min read',
    category: 'AI Marketing',
    featured: true,
    image: '/blog-images/predictive-ai-future-marketing.html'
  },
  {
    id: 'google-performance-max-bing',
    title: 'Why Running Both Google and Bing Performance Max Delivers 10% Higher ROAS',
    excerpt: 'Most agencies ignore Bing Performance Max, leaving money on the table. Our data shows dual-platform strategies capture 28% more conversions at lower CPAs.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-12',
    readTime: '5 min read',
    category: 'Performance Marketing',
    featured: true,
    image: '/blog/dual-platform.jpg'
  },
  {
    id: 'demand-intelligence-case-study',
    title: 'Case Study: How We Predicted a 127% Surge in "AI Automation" Searches',
    excerpt: 'Three weeks before the trend exploded, our models identified early signals. Here\'s exactly how we positioned our client to capture $2.3M in additional revenue.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-10',
    readTime: '10 min read',
    category: 'Case Studies',
    featured: false,
    image: '/blog/case-study.jpg'
  },
  {
    id: 'b2b-demand-gen-strategies',
    title: 'B2B Demand Gen: Reaching Decision Makers Before They Start Searching',
    excerpt: 'The average B2B buyer is 57% through their journey before contacting sales. Here\'s how to influence them in the pre-intent phase.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-08',
    readTime: '6 min read',
    category: 'B2B Marketing',
    featured: false,
    image: '/blog/b2b-demand.jpg'
  },
  {
    id: 'ai-bidding-strategies',
    title: 'Beyond Smart Bidding: How Custom AI Models Reduce CPA by 32%',
    excerpt: 'Google\'s Smart Bidding is just the beginning. Learn how proprietary AI models can predict bid adjustments with 74% accuracy.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-05',
    readTime: '8 min read',
    category: 'AI Marketing',
    featured: false,
    image: '/blog/ai-bidding.jpg'
  },
  {
    id: 'marketing-attribution-solved',
    title: 'Finally: Multi-Touch Attribution That Actually Works',
    excerpt: 'Stop arguing about last-click vs first-touch. Our AI-powered attribution model shows the true impact of every touchpoint with 89% confidence.',
    author: 'Brandon Lincoln Hendricks',
    date: '2025-08-03',
    readTime: '9 min read',
    category: 'Analytics',
    featured: false,
    image: '/blog/attribution.jpg'
  }
]

const categories = ['All', 'AI Marketing', 'Performance Marketing', 'Case Studies', 'B2B Marketing', 'Analytics']

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

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
              <Link href="/insights" className="text-white font-semibold">Insights</Link>
              <Link href="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link>
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
                Predictive Intelligence Insights
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge strategies, case studies, and thought leadership from the team predicting tomorrow's marketing trends today.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
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

      {/* Featured Posts */}
      {filteredPosts.some(post => post.featured) && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Featured Insights</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredPosts.filter(post => post.featured).map(post => (
                <article key={post.id} className="group">
                  <Link href={`/insights/${post.id}`} className="block">
                    <div className="relative h-64 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl overflow-hidden mb-6">
                      {post.image && post.image.endsWith('.html') ? (
                        <iframe 
                          src={post.image}
                          className="w-full h-full"
                          title={post.title}
                        />
                      ) : post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-sm text-blue-400 font-medium">{post.category}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="py-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">
            {selectedCategory === 'All' ? 'All Insights' : selectedCategory}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map(post => (
              <article key={post.id} className="group">
                <Link href={`/insights/${post.id}`}>
                  <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-200">
                    <div className="mb-4">
                      <span className="text-sm text-blue-400 font-medium">{post.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-blue-900/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Get Tomorrow's Marketing Trends Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 5,000+ marketers receiving weekly predictions and strategies.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
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