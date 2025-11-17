import Link from 'next/link'
import Script from 'next/script'
import { ArrowRight, Linkedin, Twitter, Mail } from 'lucide-react'
import Navigation from '../../components/navigation'
import { Footer } from '../../components/Footer'
import { BreadcrumbSchema } from '../../components/seo-improvements'

export async function generateMetadata() {
  return {
    title: 'Brandon Lincoln Hendricks - Founder & CEO | Hendricks.AI',
    description: 'Brandon Lincoln Hendricks is the Founder & CEO of Hendricks.AI, the AI Search Intelligence Firm for B2B SaaS. Google ML certified engineer with 15+ years in B2B SaaS marketing.',
    alternates: {
      canonical: 'https://hendricks.ai/authors/brandon-lincoln-hendricks',
    },
    openGraph: {
      title: 'Brandon Lincoln Hendricks - Founder & CEO | Hendricks.AI',
      description: 'Google ML certified engineer pioneering AI Search Intelligence for B2B SaaS',
      type: 'profile',
      firstName: 'Brandon',
      lastName: 'Hendricks',
      username: 'brandonlhendricks',
      images: [{
        url: 'https://hendricks.ai/brandon-headshot.jpg',
        width: 1200,
        height: 630,
      }],
    },
  }
}

export default function AuthorPage() {
  // Author schema for Google
  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Brandon Lincoln Hendricks',
    jobTitle: 'Founder & CEO',
    worksFor: {
      '@type': 'Organization',
      name: 'Hendricks.AI',
      url: 'https://hendricks.ai'
    },
    url: 'https://hendricks.ai/authors/brandon-lincoln-hendricks',
    image: 'https://hendricks.ai/brandon-headshot.jpg',
    sameAs: [
      'https://linkedin.com/in/brandonlhendricks',
      'https://twitter.com/brandonlhendricks'
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Texas A&M University'
    },
    knowsAbout: [
      'Search Engine Marketing',
      'Artificial Intelligence',
      'Machine Learning',
      'B2B SaaS Marketing',
      'Demand Generation',
      'Marketing Attribution'
    ],
    description: 'Google ML certified engineer with 15+ years experience in B2B SaaS marketing. Former Global Lead of Total Search at SolarWinds. Pioneer in AI-powered search intelligence and unified Google & Bing strategies.'
  }

  // Author's articles
  const authorArticles = [
    {
      title: "The B2B Marketing Funnel is Dead: Why 80% of Buying Happens in Chaos",
      date: "2025-08-20",
      category: "B2B Marketing",
      slug: "b2b-funnel-is-dead"
    },
    {
      title: "Google Meridian MMM Meets Predictive AI: The Future of Marketing Attribution",
      date: "2025-08-19",
      category: "AI Marketing",
      slug: "modern-measurement-meets-predictive-ai"
    },
    {
      title: "Hendricks.AI Achieves 74% Accuracy in Predicting Market Demand 2-4 Weeks Early",
      date: "2025-08-18",
      category: "Company News",
      slug: "hendricks-ai-achieves-74-percent-prediction-accuracy"
    },
    {
      title: "AI Marketing Beyond Smart Bidding: How Custom AI Models Reduce CPA by 32%",
      date: "2025-08-16",
      category: "AI Marketing",
      slug: "ai-marketing-beyond-smart-bidding"
    }
  ]

  return (
    <>
      <Script
        id="author-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(authorSchema)
        }}
      />
      <BreadcrumbSchema 
        items={[
          { name: 'Home', url: 'https://hendricks.ai' },
          { name: 'Authors', url: 'https://hendricks.ai/authors' },
          { name: 'Brandon Lincoln Hendricks', url: 'https://hendricks.ai/authors/brandon-lincoln-hendricks' }
        ]} 
      />
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Author Header */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-950/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Author Photo */}
            <div className="flex-shrink-0">
              <img 
                src="/brandon-headshot.jpg" 
                alt="Brandon Lincoln Hendricks"
                className="w-48 h-48 rounded-full border-4 border-blue-500/30"
              />
            </div>

            {/* Author Info */}
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Brandon Lincoln Hendricks</h1>
              <p className="text-xl text-blue-400 mb-4">Founder & CEO, Hendricks.AI</p>
              
              <p className="text-gray-300 mb-6 max-w-3xl">
                Google ML certified engineer with 15+ years experience in B2B SaaS marketing. 
                Former Global Lead of Total Search at SolarWinds. Pioneer in AI-powered search 
                intelligence and unified Google & Bing strategies. Speaker at industry conferences 
                and thought leader in predictive demand generation.
              </p>

              {/* Social Links */}
              <div className="flex gap-4 justify-center md:justify-start">
                <a 
                  href="https://linkedin.com/in/brandonlhendricks" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com/brandonlhendricks" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:brandon@hendricks.ai"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author's Articles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Latest Articles by Brandon</h2>
          
          <div className="grid gap-6">
            {authorArticles.map((article, index) => (
              <article key={index} className="bg-gray-900/50 rounded-xl p-6 hover:bg-gray-800/50 transition-all">
                <Link href={`/news/${article.slug}`} className="block">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-xs bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                        <span className="text-sm text-gray-400">
                          {new Date(article.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-400 flex-shrink-0 ml-4" />
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* View All Articles */}
          <div className="text-center mt-12">
            <Link 
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              View All News & Insights
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Author Expertise */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Areas of Expertise</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-transparent p-6 rounded-xl border border-blue-800/30">
              <h3 className="text-xl font-bold mb-3 text-blue-400">AI & Machine Learning</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Google ML Professional Certified</li>
                <li>• OpenAI GPT Early Beta Tester</li>
                <li>• Production AI System Architecture</li>
                <li>• Predictive Analytics at Scale</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/20 to-transparent p-6 rounded-xl border border-purple-800/30">
              <h3 className="text-xl font-bold mb-3 text-purple-400">B2B SaaS Marketing</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 15+ Years Experience</li>
                <li>• Former SolarWinds Global Search Lead</li>
                <li>• $10M+ Monthly Ad Spend Managed</li>
                <li>• Enterprise Demand Generation</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-900/20 to-transparent p-6 rounded-xl border border-cyan-800/30">
              <h3 className="text-xl font-bold mb-3 text-cyan-400">Search Intelligence</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Google & Bing Unification Pioneer</li>
                <li>• Advanced Attribution Modeling</li>
                <li>• Predictive Demand Forecasting</li>
                <li>• Cross-Channel Orchestration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}