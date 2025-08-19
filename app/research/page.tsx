import { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Download, ExternalLink, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Research Papers | Brandon Lincoln Hendricks | Hendricks.AI',
  description: 'Academic research and papers by Brandon Lincoln Hendricks on predictive AI marketing, demand forecasting, and marketing analytics.',
  keywords: ['research papers', 'predictive AI marketing', 'Brandon Lincoln Hendricks', 'marketing analytics', 'demand forecasting'],
}

export default function ResearchPage() {
  const papers = [
    {
      title: "The Hendricks Method: A Novel Approach to Predictive AI Marketing with 74% Demand Forecasting Accuracy",
      year: "2024",
      journal: "Hendricks.AI Research Papers",
      abstract: "This paper presents the Hendricks Method, a revolutionary approach to digital marketing that leverages predictive AI to forecast market demand 2-4 weeks in advance with 74% accuracy.",
      keywords: ["predictive AI", "marketing analytics", "demand forecasting", "machine learning"],
      pdfUrl: "/research/hendricks-method-predictive-ai-marketing.pdf",
      htmlUrl: "/research/predictive-ai-marketing-hendricks-method",
      citations: "Hendricks, B.L. (2024). Hendricks.AI Research Papers, 1(1), 1-15."
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
              <Link href="/brandon-lincoln-hendricks" className="text-gray-300 hover:text-white transition-colors">About Brandon</Link>
              <Link href="/research" className="text-white font-semibold">Research</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Research & Publications
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Academic papers and research by Brandon Lincoln Hendricks on predictive AI marketing, 
            demand forecasting, and the future of marketing analytics.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Google Scholar Profile</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{papers.length} Papers Published</span>
            </div>
          </div>
        </div>
      </section>

      {/* Papers Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {papers.map((paper, index) => (
              <article 
                key={index}
                className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-8 border border-gray-800 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-white flex-1">
                    {paper.title}
                  </h2>
                  <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full whitespace-nowrap">
                    {paper.year}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4 italic">{paper.journal}</p>
                
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">Abstract</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {paper.abstract}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {paper.keywords.map((keyword, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-300 mb-1">Citation</h3>
                  <p className="text-sm text-gray-400 font-mono">
                    {paper.citations}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={paper.htmlUrl}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Online
                  </a>
                  <a 
                    href={paper.pdfUrl}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20">
            <h3 className="text-xl font-bold mb-4">Upcoming Research</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• The Economic Impact of Predictive Marketing Systems (Q4 2024)</li>
              <li>• Cross-Platform Signal Processing for Demand Intelligence (Q1 2025)</li>
              <li>• AI-Driven Budget Optimization: A Comparative Study (Q1 2025)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Interested in Collaborating?
          </h2>
          <p className="text-gray-300 mb-8">
            I'm always open to research collaborations and speaking opportunities.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  )
}