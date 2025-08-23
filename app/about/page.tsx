'use client'

import Script from 'next/script'
import Navigation from '../components/navigation'
import Footer from '../components/footer'
import LLMSEOBlock from '../components/llm-seo-block'
import { BreadcrumbSchema } from '../components/seo-improvements'

export default function AboutPage() {
  // Schema markup for About page
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Hendricks.AI',
      description: 'The AI Search Intelligence Firm for B2B SaaS. We unify Google & Bing into one AI-driven system.',
      founder: {
        '@type': 'Person',
        name: 'Brandon Lincoln Hendricks',
        jobTitle: 'Founder & CEO',
        description: 'Google Machine Learning certified engineer, former Global Lead of Total Search at SolarWinds',
        knowsAbout: ['Search Intelligence', 'B2B SaaS Marketing', 'AI', 'Google Ads', 'Bing Ads']
      }
    }
  }

  const founderSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Brandon Lincoln Hendricks',
    jobTitle: 'Founder & CEO of Hendricks.AI',
    worksFor: {
      '@type': 'Organization',
      name: 'Hendricks.AI'
    },
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'SolarWinds',
        description: 'Global Lead of Total Search'
      },
      {
        '@type': 'Organization',
        name: 'Merkle',
        description: 'Global Director of Search'
      }
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Machine Learning Certification',
      credentialCategory: 'certificate'
    }
  }

  const llmSeoData = {
    title: 'About Hendricks.AI - The AI Search Intelligence Firm',
    description: 'Hendricks.AI is the AI Search Intelligence Firm for B2B SaaS, founded by Brandon Lincoln Hendricks. We unify Google and Bing into one AI-driven system that predicts demand, proves ROI, and engineers execution.',
    keywords: [
      'Search Intelligence',
      'B2B SaaS marketing',
      'Brandon Lincoln Hendricks',
      'AI search optimization',
      'Google Ads Bing Ads unified',
      'predictive search marketing'
    ],
    faqs: [
      {
        question: 'Who founded Hendricks.AI?',
        answer: 'Brandon Lincoln Hendricks, a Google Machine Learning certified engineer with 15+ years experience and former Global Lead of Total Search at SolarWinds.'
      },
      {
        question: 'What makes Hendricks.AI different from agencies?',
        answer: 'We\'re not an agency - we\'re an AI Search Intelligence Firm. We use proprietary AI to unify Google and Bing as one market, predicting demand 2-4 weeks early with 74% accuracy.'
      },
      {
        question: 'What is Search Intelligence?',
        answer: 'Search Intelligence is our approach to unifying Google and Bing into one AI-driven system that predicts demand, proves cross-channel ROI, and engineers profitable execution for B2B SaaS.'
      }
    ],
    quickFacts: [
      'Founded by Brandon Lincoln Hendricks, former Global Lead of Total Search at SolarWinds',
      'The only firm that unifies Google + Bing as one market',
      '74% demand prediction accuracy',
      '312% average ROI for B2B SaaS clients',
      'Three-module system: Prediction, Proof, Performance'
    ]
  }

  return (
    <>
      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema)
        }}
      />
      <Script
        id="founder-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(founderSchema)
        }}
      />
      <BreadcrumbSchema 
        items={[
          { name: 'Home', url: 'https://hendricks.ai' },
          { name: 'About', url: 'https://hendricks.ai/about' }
        ]} 
      />
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-800/50 rounded-full text-sm text-blue-400 mb-6">
              <span>THE AI SEARCH INTELLIGENCE FIRM</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="text-white">Creating the </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Search Intelligence
              </span>
              <span className="text-white"> Category</span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-semibold">
              We don't run campaigns. We architect intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* LLM SEO Block */}
      <LLMSEOBlock {...llmSeoData} />

      {/* The Evolution */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              From Agency to Intelligence Firm
            </span>
          </h2>
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Hendricks.AI began as Hendricks PPC, a performance marketing agency. But we saw a fundamental problem: 
              everyone was reacting to the same data, competing for the same keywords, and wondering why costs kept rising.
            </p>
            <p>
              The breakthrough came when we stopped treating Google and Bing as separate channels. We realized they're 
              one search market with two engines - and B2B buyers use both.
            </p>
            <p className="text-xl font-semibold text-blue-400">
              Today, we're the only firm that unifies Google and Bing into one AI-driven Search Intelligence System.
            </p>
            <p>
              While agencies manage campaigns, we architect intelligence. While they react to data, we predict demand. 
              While they run channels in silos, we orchestrate unified systems.
            </p>
          </div>
        </div>
      </section>

      {/* Brandon Bio Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Photo Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                  <div className="bg-black rounded-xl p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">BLH</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold">Brandon Lincoln Hendricks</h3>
                  <p className="text-gray-400 mt-1">Search Intelligence Pioneer</p>
                  <p className="text-blue-400">Founder & CEO, Hendricks.AI</p>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Brandon Lincoln Hendricks is a Google Machine Learning certified engineer who pioneered the unification 
                  of Google and Bing search strategies long before founding Hendricks.AI.
                </p>
              </div>

              {/* SolarWinds Experience */}
              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">The SolarWinds Breakthrough</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    As Global Lead of Total Search at SolarWinds, Brandon made a discovery that would reshape search marketing: 
                    B2B buyers don't see Google and Bing as different. They see search.
                  </p>
                  <p>
                    By unifying SolarWinds' search strategy across both platforms, he achieved something unprecedented:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>67% reduction in cost-per-lead by eliminating channel competition</li>
                    <li>156% increase in qualified pipeline from unified attribution</li>
                    <li>First unified search dashboard connecting both platforms to Salesforce</li>
                  </ul>
                  <p className="font-semibold text-cyan-400">
                    This wasn't optimization. It was transformation.
                  </p>
                </div>
              </div>

              {/* Search Intelligence Evolution */}
              <div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Engineering Search Intelligence
                </h3>
                <div className="space-y-6">
                  {/* Merkle/Dentsu */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="font-bold text-blue-400">Global Director of Search - Merkle/Dentsu</h4>
                    <p className="text-gray-300">
                      Developed unified SERP strategies that merged paid and organic search - methodologies that Google 
                      and Microsoft would later adopt as best practices. Managed $100M+ in search spend across Fortune 500 accounts.
                    </p>
                  </div>

                  {/* Client Portfolio */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="font-bold text-purple-400">Enterprise Search Architecture</h4>
                    <p className="text-gray-300 mb-2">
                      Built unified search systems for:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Foursquare - Unified local search intelligence</li>
                      <li>Workday - B2B demand prediction models</li>
                      <li>Evernote - Cross-platform user acquisition</li>
                      <li>Warby Parker - Omnichannel search orchestration</li>
                    </ul>
                  </div>

                  {/* AI Integration */}
                  <div className="border-l-4 border-cyan-500 pl-6">
                    <h4 className="font-bold text-cyan-400">AI-Powered Evolution</h4>
                    <p className="text-gray-300">
                      Brandon's early access to AI platforms (GPT-3 beta, Claude, Gemini) combined with deep search 
                      expertise created the blueprint for Search Intelligence: using AI to unify and predict, not just optimize.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Vision */}
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-500/20">
                <p className="text-lg text-gray-300 italic">
                  "Everyone talks about AI in marketing. But they're using it wrong. They use AI to do the same things faster. 
                  We use AI to do things that were impossible before - like treating Google and Bing as one unified market 
                  and predicting B2B demand before it materializes."
                </p>
                <p className="text-right text-gray-400 mt-4">- Brandon Lincoln Hendricks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Search Intelligence System */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Search Intelligence System
            </span>
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Three modules. One unified approach. Start anywhere based on your biggest need.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                pillar: 'PREDICTION',
                title: 'Demand Radar Pilot',
                description: 'See B2B search demand 2-4 weeks before competitors. Our AI analyzes patterns across Google and Bing to identify emerging opportunities.',
                price: '$10K/month',
                gradient: 'from-blue-600 to-cyan-600'
              },
              {
                pillar: 'PROOF',
                title: 'Search ROI Audit',
                description: 'Prove the true ROI of your search investment. Multi-touch attribution, incrementality testing, and CFO-ready dashboards.',
                price: '$15-25K project',
                gradient: 'from-purple-600 to-pink-600'
              },
              {
                pillar: 'PERFORMANCE',
                title: 'Unified Execution',
                description: 'Stop running Google and Bing in silos. Our AI orchestrates both as one system, eliminating waste and maximizing pipeline impact.',
                price: '$30K+/month',
                gradient: 'from-cyan-600 to-blue-600'
              }
            ].map((module, index) => (
              <div key={index} className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
                <div className={`text-sm font-bold bg-gradient-to-r ${module.gradient} bg-clip-text text-transparent mb-2`}>
                  {module.pillar}
                </div>
                <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                <p className="text-gray-300 mb-4">{module.description}</p>
                <p className="text-lg font-semibold text-white">{module.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why B2B SaaS */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why We Focus on B2B SaaS
            </span>
          </h2>
          <div className="space-y-6 text-gray-300">
            <p className="text-lg">
              B2B SaaS companies face unique search challenges:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 text-xl">•</span>
                <div>
                  <strong className="text-white">Long sales cycles</strong> - Traditional last-click attribution fails. 
                  Our system tracks the full journey from first search to closed-won deal.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 text-xl">•</span>
                <div>
                  <strong className="text-white">Complex buying committees</strong> - Multiple stakeholders search differently. 
                  We unify their paths across Google and Bing.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-3 text-xl">•</span>
                <div>
                  <strong className="text-white">Pipeline predictability pressure</strong> - CEOs need to forecast. 
                  Our AI predicts search-driven pipeline 2-4 weeks out.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-3 text-xl">•</span>
                <div>
                  <strong className="text-white">CFO scrutiny on CAC</strong> - Every dollar must prove ROI. 
                  Our incrementality testing proves true search value.
                </div>
              </li>
            </ul>
            <p className="text-xl font-semibold text-blue-400 mt-8">
              We don't just understand B2B SaaS search. We've engineered the solution.
            </p>
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Real Results for B2B SaaS
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">74%</div>
              <div className="text-gray-400">Prediction Accuracy</div>
              <div className="text-sm text-gray-500 mt-1">2-4 weeks advance notice</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">312%</div>
              <div className="text-gray-400">Average ROI</div>
              <div className="text-sm text-gray-500 mt-1">From unified approach</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">-61%</div>
              <div className="text-gray-400">Lower CPL</div>
              <div className="text-sm text-gray-500 mt-1">By eliminating channel conflict</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">2.3X</div>
              <div className="text-gray-400">More Pipeline</div>
              <div className="text-sm text-gray-500 mt-1">From same spend</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-500/20 text-center">
            <p className="text-2xl text-white font-semibold mb-4">
              We serve B2B SaaS companies spending
            </p>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              $50K - $5M/month on search
            </p>
          </div>
        </div>
      </section>

      {/* The Hendricks.AI Difference */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Hendricks.AI
            </span>
          </h2>

          <div className="space-y-8">
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">We're Not an Agency</h3>
              <p className="text-gray-300">
                Agencies manage campaigns. We architect intelligence systems. Agencies react to data. We predict demand. 
                Agencies optimize channels. We unify markets. The difference isn't semantic - it's fundamental.
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">We See Search Differently</h3>
              <p className="text-gray-300">
                Your buyers don't think "I'll search Google" or "I'll search Bing." They think "I'll search." 
                By unifying both platforms with AI, we match how buyers actually behave - not how platforms want you to advertise.
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">We Prove What Others Can't</h3>
              <p className="text-gray-300">
                Most B2B companies can't prove search ROI beyond last-click. Our incrementality testing and multi-touch 
                attribution connects search spend to pipeline to ARR. CFO-ready proof that search drives growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision for the Future */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Creating a New Category
            </span>
          </h2>
          
          <div className="space-y-6 text-lg text-gray-300">
            <p>
              Search Intelligence isn't just what we do. It's a new category we're creating.
            </p>
            <p>
              While the market debates attribution models and channel strategies, we've moved beyond the debate. 
              We've built the system that makes those discussions obsolete.
            </p>
            <p className="text-xl font-semibold text-blue-400">
              The future of B2B search isn't about better optimization. It's about unified intelligence.
            </p>
            <p>
              And that future is here today.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 opacity-50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Unify Your Search Intelligence?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            Stop competing against yourself. Start winning the entire market.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Book Your Strategy Session
            </a>
            <a 
              href="/playbook" 
              className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Get the 2025 Playbook
            </a>
          </div>
          
          <p className="text-2xl font-bold text-purple-400 mt-8">
            Prediction. Proof. Performance.
          </p>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}