import Link from 'next/link'
import { Calendar, User, ArrowRight, TrendingUp, Brain, BarChart3 } from 'lucide-react'
import Script from 'next/script'

export async function generateMetadata() {
  return {
    title: 'News | Hendricks.AI News',
    description: 'Breaking news and insights on predictive AI marketing and AI engineering',
    alternates: {
      canonical: 'https://hendricks.ai/news',
    },
    other: {
      'google-site-verification': 'E7JSaK23DaXqx3yMqAiM1WHNx6zrcWrg9zJ5yvfZN4I',
    },
  }
}

export default function NewsPage() {
  const newsArticles = [
    {
      headline: "Hendricks.AI Achieves 74% Accuracy in Predicting Market Demand 2-4 Weeks Early",
      date: "2025-01-18",
      author: "Brandon Lincoln Hendricks",
      category: "Company News",
      image: "/news/predictive-ai-breakthrough.jpg",
      summary: "New predictive AI system analyzes 2.8 million daily signals to forecast market demand with unprecedented accuracy, delivering average ROI of 312% for enterprise clients.",
      slug: "hendricks-ai-achieves-74-percent-prediction-accuracy"
    },
    {
      headline: "Former SolarWinds Global Search Lead Launches First Predictive AI Marketing Agency",
      date: "2025-01-15",
      author: "Brandon Lincoln Hendricks",
      category: "Industry News",
      image: "/news/hendricks-ai-launch.jpg",
      summary: "Brandon Lincoln Hendricks, former Global Lead of Total Search at SolarWinds, announces the launch of Hendricks.AI, the first marketing agency that predicts demand before it happens.",
      slug: "former-solarwinds-exec-launches-predictive-ai-agency"
    },
    {
      headline: "Study: 87% of Marketers Still Using Reactive Strategies, Missing Revenue Opportunities",
      date: "2025-01-12",
      author: "Brandon Lincoln Hendricks",
      category: "Research",
      image: "/news/marketing-study.jpg",
      summary: "New research reveals the majority of marketing teams are analyzing yesterday's data while tomorrow's opportunities pass by, resulting in an estimated $47 billion in missed revenue annually.",
      slug: "study-marketers-reactive-strategies-missing-revenue"
    },
    {
      headline: "Predictive AI Correctly Forecasts Post-Holiday E-commerce Surge 3 Weeks in Advance",
      date: "2025-01-10",
      author: "Brandon Lincoln Hendricks",
      category: "Case Study",
      image: "/news/ecommerce-prediction.jpg",
      summary: "Hendricks.AI's predictive system identified early signals of a 68% surge in specific e-commerce categories, enabling clients to capture market share before competitors.",
      slug: "predictive-ai-forecasts-ecommerce-surge"
    },
    {
      headline: "Google Performance Max Gets Predictive: How AI Changes the PMax Game",
      date: "2025-01-08",
      author: "Brandon Lincoln Hendricks",
      category: "Analysis",
      image: "/news/google-performance-max.jpg",
      summary: "Analysis of how predictive AI transforms Performance Max campaigns from reactive optimization to proactive market capture, with case studies showing 287% ROI improvement.",
      slug: "google-performance-max-predictive-ai"
    },
    {
      headline: "Building Production AI: Why 99% of AI POCs Fail to Scale",
      date: "2025-01-20",
      author: "Brandon Lincoln Hendricks",
      category: "AI Engineering",
      image: "/news/ai-engineering-scale.jpg",
      summary: "Technical deep-dive into the engineering challenges of scaling AI from prototype to production, based on lessons learned building systems that process 2.8M signals daily.",
      slug: "building-production-ai-why-pocs-fail"
    },
    {
      headline: "The Hidden Cost of AI Hallucinations in Marketing: A $4.2B Problem",
      date: "2025-01-19",
      author: "Brandon Lincoln Hendricks",
      category: "AI Research",
      image: "/news/ai-hallucinations-cost.jpg",
      summary: "New research reveals how AI hallucinations in marketing automation tools are costing enterprises billions in wasted ad spend and missed opportunities.",
      slug: "ai-hallucinations-marketing-cost"
    },
    {
      headline: "From GPT to Production: Engineering Lessons from Early OpenAI Beta Access",
      date: "2025-01-17",
      author: "Brandon Lincoln Hendricks",
      category: "AI Engineering",
      image: "/news/gpt-production-lessons.jpg",
      summary: "Exclusive insights from beta testing GPT-3, ChatGPT, and GPT-4, including architectural decisions that enabled 74% prediction accuracy.",
      slug: "gpt-to-production-engineering-lessons"
    }
  ]

  // Schema for NewsArticle
  const newsListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hendricks.AI News",
    "description": "Latest news and insights on predictive AI marketing",
    "url": "https://hendricks.ai/news",
    "numberOfItems": newsArticles.length,
    "itemListElement": newsArticles.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "NewsArticle",
        "@id": `https://hendricks.ai/news/${article.slug}`,
        "headline": article.headline,
        "datePublished": article.date,
        "dateModified": article.date,
        "author": {
          "@type": "Person",
          "name": article.author,
          "url": "https://hendricks.ai/brandon-lincoln-hendricks"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Hendricks.AI",
          "logo": {
            "@type": "ImageObject",
            "url": "https://hendricks.ai/hendricks_logo.png"
          }
        },
        "image": `https://hendricks.ai${article.image}`,
        "description": article.summary,
        "articleSection": article.category,
        "url": `https://hendricks.ai/news/${article.slug}`
      }
    }))
  }

  return (
    <>
      <Script
        id="news-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(newsListSchema)
        }}
      />
      
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
                <Link href="/news" className="text-white font-semibold">News</Link>
                <Link href="/predictions" className="text-gray-300 hover:text-white transition-colors">Predictions</Link>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-full text-sm text-blue-400 mb-6">
                <TrendingUp className="w-4 h-4" />
                <span>Latest News & Insights</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Hendricks.AI News
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Breaking news, research, and insights on predictive AI marketing and the future of demand intelligence.
              </p>
            </div>

            {/* News Grid */}
            <div className="grid gap-8">
              {newsArticles.map((article, index) => (
                <article 
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-xl rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all group"
                >
                  <Link href={`/news/${article.slug}`}>
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Brain className="w-20 h-20 text-white/20" />
                        </div>
                      </div>
                      
                      <div className="p-8 md:w-2/3">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-xs bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(article.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                          {article.headline}
                        </h2>
                        
                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {article.summary}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author}
                          </span>
                          
                          <span className="text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Stay Ahead of the Market</h3>
                <p className="text-gray-300 mb-6">
                  Get weekly predictions and insights delivered to your inbox.
                </p>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105"
                >
                  Subscribe to Predictions
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm">
                © {new Date().getFullYear()} Hendricks.AI. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                For press inquiries: press@hendricks.ai
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}