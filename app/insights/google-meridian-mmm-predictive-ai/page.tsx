import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import { modernMeasurementArticle } from '../../news/[slug]/modern-measurement-meets-predictive-ai'

export default function GoogleMeridianInsightPage() {
  const article = modernMeasurementArticle

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

      {/* Article Content */}
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link 
            href="/insights" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              {article.headline}
            </h1>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-4">
                <span>{article.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <button className="flex items-center gap-1 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </header>

          {/* Article Body */}
          <div 
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-4">Ready to Add Predictive Power to Your MMM?</h3>
            <p className="text-gray-300 mb-6">
              See how Hendricks.AI can enhance your Google Meridian implementation with forward-looking insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://calendar.app.google/DHopiSfnLiH5xwKo9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all"
              >
                Book Strategy Call
              </a>
              <Link 
                href="/predictive-attribution"
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
              >
                Learn More About Predictive Attribution
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8">Related Insights</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/insights/ai-marketing-beyond-smart-bidding" className="group">
                <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all">
                  <h4 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    AI Marketing Beyond Smart Bidding
                  </h4>
                  <p className="text-gray-400 text-sm">
                    How custom AI models reduce CPA by 32%
                  </p>
                </div>
              </Link>
              <Link href="/insights/marketing-attribution-solved" className="group">
                <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all">
                  <h4 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    Multi-Touch Attribution That Actually Works
                  </h4>
                  <p className="text-gray-400 text-sm">
                    AI-powered attribution with 89% confidence
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </article>

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