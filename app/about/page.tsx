'use client'

import Link from 'next/link'

export default function AboutPage() {
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
              <Link href="/about" className="text-white font-semibold">About</Link>
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
                About Hendricks.AI
              </span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-semibold">
              Stop Reacting. Start Predicting.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Hendricks.AI is the Predictive AI Marketing Agency that gives brands an unfair advantage by forecasting market demand 2–4 weeks before it materializes — with 74% accuracy — and converting that foresight into measurable ROI.
            </p>
            <p>
              We&apos;re the only agency mastering both Google Performance Max & Bing Performance Max with predictive intelligence, transforming how enterprise brands capture demand from pre-intent discovery through high-intent conversion.
            </p>
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Evolution: From Performance Marketing to Predictive Intelligence
            </span>
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Before becoming Hendricks.AI, we operated as Hendricks PPC — building a reputation for precision targeting and optimization that delivered consistent growth for enterprise clients across e-commerce, B2B/SaaS, retail, and professional services.
            </p>
            <p>
              That foundation of performance excellence now powers something revolutionary: predictive systems that see market shifts before they happen.
            </p>
            <p className="text-xl font-semibold text-blue-400">
              While traditional agencies react to yesterday&apos;s data, we&apos;re already positioned for next month&apos;s opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Brandon Bio Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Photo Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                  <img 
                    src="/brandon-hendricks.jpg" 
                    alt="Brandon Lincoln Hendricks"
                    className="rounded-xl w-full"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold">Brandon Lincoln Hendricks</h3>
                  <p className="text-gray-400 mt-1">Search Intelligence Engineer</p>
                  <p className="text-blue-400">Founder, Hendricks.AI</p>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Brandon is a certified Google Machine Learning Engineer who has spent over 15 years architecting the intersection of search technology and artificial intelligence — long before &quot;AI marketing&quot; became an industry standard.
                </p>
              </div>

              {/* Building Tomorrow's Marketing */}
              <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Building Tomorrow&apos;s Marketing Infrastructure</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Most recently as Global Lead of Total Search at SolarWinds, Brandon developed predictive intent systems that unified search strategies across 150+ markets worldwide. His approach to demand forecasting and cross-platform optimization caught the attention of industry leaders, leading to strategic engagements with Foursquare, Workday, Evernote, and Warby Parker.
                  </p>
                  <p>
                    Previously, as Global Director of Search at Merkle and Dentsu, Brandon pioneered unified SERP strategies that merged paid search and SEO — methodologies that major platforms would later adopt as best practices.
                  </p>
                </div>
              </div>

              {/* Shaping AI Revolution */}
              <div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Shaping the AI Marketing Revolution
                </h3>
                <p className="text-gray-300 mb-6">Brandon&apos;s involvement in AI extends beyond traditional marketing applications:</p>
                
                <div className="space-y-6">
                  {/* 2013-2014 */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="font-bold text-blue-400">2013-2014</h4>
                    <p className="text-gray-300">
                      Participated in Google&apos;s internal AI research groups and invite-only Google Brain workshops — laying groundwork for understanding machine learning applications in search
                    </p>
                  </div>

                  {/* 2019-2021 */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="font-bold text-purple-400">2019-2021: Selected for foundational AI programs</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
                      <li>GPT-3 API beta testing before public launch</li>
                      <li>ChatGPT prototype testing through OpenAI&apos;s trusted tester program</li>
                      <li>Claude&apos;s first iterations via Anthropic&apos;s private program</li>
                      <li>Google LaMDA early access demos</li>
                    </ul>
                  </div>

                  {/* 2022-2023 */}
                  <div className="border-l-4 border-pink-500 pl-6">
                    <h4 className="font-bold text-pink-400">2022-2023: Continuous beta access across emerging platforms</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
                      <li>Google Bard and Gemini pre-release testing</li>
                      <li>Perplexity AI early access through founder connections</li>
                      <li>Claude 2 partner program participation</li>
                    </ul>
                  </div>

                  {/* 2024-Present */}
                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="font-bold text-green-400">2024-Present</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
                      <li>Ahrefs Customer Advisory Board Member, bridging AI capabilities with search intelligence</li>
                      <li>Maintains beta access across OpenAI, Anthropic, Google, Meta, and Perplexity</li>
                      <li>Regular participant in product development sessions that shape AI platform features</li>
                      <li>Previews major AI capabilities 2-3 months before market release</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-500/20">
                <p className="text-lg text-gray-300 italic">
                  &quot;This unique vantage point — seeing AI developments before they reach market while understanding enterprise search needs — enables Brandon to build predictive systems that don&apos;t just respond to demand, they anticipate it.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Stage Process */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Three-Stage AI Growth Process
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stage: '01',
                title: 'Pre-Intent Discovery',
                subtitle: 'Google Demand Gen Campaigns',
                points: [
                  'Reach high-value prospects before they search',
                  '+3x ROAS compared to search-only campaigns',
                  '-32% CPA through predictive audience targeting'
                ],
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                stage: '02',
                title: 'Cross-Channel Acceleration',
                subtitle: 'Dual Performance Max Mastery',
                points: [
                  'The only agency optimizing both Google & Microsoft Performance Max',
                  '10% ROAS lift in global markets with Bing PMax',
                  '2.6x higher engagement through Microsoft ecosystem integration'
                ],
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                stage: '03',
                title: 'High-Intent Capture',
                subtitle: 'AI Max for Search',
                points: [
                  'Win when intent peaks with AI-driven coverage',
                  '8x higher conversion rates at peak intent moments',
                  'Full-funnel attribution across both ecosystems'
                ],
                gradient: 'from-pink-500 to-red-500'
              }
            ].map((stage, index) => (
              <div key={index} className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
                <div className={`text-sm font-bold bg-gradient-to-r ${stage.gradient} bg-clip-text text-transparent mb-2`}>
                  STAGE {stage.stage}
                </div>
                <h3 className="text-xl font-bold mb-2">{stage.title}</h3>
                <p className="text-sm text-purple-400 mb-4">{stage.subtitle}</p>
                <ul className="space-y-2">
                  {stage.points.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-gray-300 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six Core Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Six Core Services That Define the Future
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                number: '1',
                title: 'Demand Intelligence',
                description: 'Custom ML models trained on your industry data, delivering 2-4 week advance predictions with real-time signal monitoring and competitor movement tracking.'
              },
              {
                number: '2',
                title: 'Google Performance Max',
                description: 'AI-powered bid optimization with dynamic creative testing, achieving 14% average conversion lift through cross-channel attribution.'
              },
              {
                number: '3',
                title: 'Bing Performance Max',
                description: 'Cross-Microsoft inventory optimization with LinkedIn B2B integration, delivering 2.6x higher engagement rates through Edge and Microsoft ecosystem targeting.'
              },
              {
                number: '4',
                title: 'Amplification Engine',
                description: 'Multi-channel orchestration with dynamic budget allocation, generating 5x efficiency gains through real-time performance optimization.'
              },
              {
                number: '5',
                title: 'Conversion Capture',
                description: 'AI-powered landing page optimization with automated A/B testing, achieving 3-4x conversion rate improvement through intelligent cart recovery systems.'
              },
              {
                number: '6',
                title: 'Intelligence Command',
                description: 'Custom KPI dashboards with predictive alert systems, white-label reporting, and real-time decision-making capabilities.'
              }
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {service.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proven Impact */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Proven Impact Across Industries
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Who We Serve */}
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Who We Serve</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  <span className="text-gray-300"><strong>E-Commerce:</strong> Fashion brands, D2C companies, subscription services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3">•</span>
                  <span className="text-gray-300"><strong>B2B/SaaS:</strong> Enterprise software, technology platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">•</span>
                  <span className="text-gray-300"><strong>Retail:</strong> Multi-location chains, home improvement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">•</span>
                  <span className="text-gray-300"><strong>Professional Services:</strong> Legal firms, consulting agencies</span>
                </li>
              </ul>
            </div>

            {/* Our Track Record */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-500/20">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Our Track Record</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">$47.3M</div>
                  <div className="text-sm text-gray-400">Revenue Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">2.8M+</div>
                  <div className="text-sm text-gray-400">Predictions Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">312%</div>
                  <div className="text-sm text-gray-400">Average ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">94%</div>
                  <div className="text-sm text-gray-400">Client Retention</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  74% Prediction Accuracy
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Hendricks.AI Difference */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Hendricks.AI Difference
            </span>
          </h2>

          <div className="space-y-8">
            {[
              {
                title: 'We See What Others Can\'t',
                description: 'Our predictive models analyze hundreds of demand signals, identifying market shifts 2-4 weeks before they materialize. This isn\'t guesswork — it\'s systematic pattern recognition powered by custom ML models.'
              },
              {
                title: 'We Master What Others Won\'t',
                description: 'As the only agency truly optimizing both Google and Microsoft ecosystems, we capture demand wherever it emerges — from LinkedIn B2B audiences to Microsoft Edge users to traditional search queries.'
              },
              {
                title: 'We Deliver What Others Don\'t',
                items: [
                  'Transparent Predictions: Know exactly what\'s coming and why',
                  'Dual-Ecosystem Dominance: One strategy, two platforms, total coverage',
                  'Proactive Optimization: Adjustments before problems arise',
                  'White-Label Intelligence: Your brand, our predictive power'
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">{section.title}</h3>
                {section.description && (
                  <p className="text-gray-300">{section.description}</p>
                )}
                {section.items && (
                  <ul className="space-y-2 mt-4">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-gradient-to-b from-gray-900/20 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Philosophy
            </span>
          </h2>
          
          <blockquote className="text-2xl text-gray-300 italic mb-8">
            &quot;The future of marketing isn&apos;t about having more data — it&apos;s about knowing what happens next.&quot;
          </blockquote>
          
          <p className="text-gray-300 mb-6">
            This principle, discovered through years of building predictive systems and testing AI capabilities before market release, drives everything we do.
          </p>
          
          <p className="text-lg text-gray-300 mb-6">
            Every client engagement begins with one question: <span className="text-blue-400 font-semibold">What if you could see demand before your competitors even know it exists?</span>
          </p>
          
          <p className="text-xl font-semibold text-purple-400">
            For our clients, this isn&apos;t hypothetical. It&apos;s their competitive advantage.
          </p>
        </div>
      </section>

      {/* From Discovery to Decision */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              From Discovery to Decision
            </span>
          </h2>
          
          <div className="space-y-4 text-gray-300">
            <p>
              The marketing landscape has shifted. Reactive strategies based on historical data no longer win. The future belongs to brands that can predict, position, and capture demand before it peaks.
            </p>
            <p>
              Brandon&apos;s unique position — testing tomorrow&apos;s AI today while architecting enterprise search strategies — created the blueprint for Hendricks.AI&apos;s predictive methodology.
            </p>
            <p className="text-xl font-semibold text-blue-400">
              We don&apos;t just use AI tools. We architect intelligence systems that transform marketing from a cost center into a predictive profit engine.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 opacity-50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Join the <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Predictive Revolution</span>
          </h2>
          
          <div className="space-y-4 text-xl text-gray-300 mb-8">
            <p>Your competitors are still optimizing last week&apos;s campaigns.</p>
            <p className="text-blue-400 font-semibold">We&apos;re already positioned for next month&apos;s demand surge.</p>
            <p>The question isn&apos;t whether AI will transform your marketing.</p>
            <p className="font-semibold">It&apos;s whether you&apos;ll be ahead of that transformation or behind it.</p>
          </div>
          
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl mb-6">
            Book Your Predictive Strategy Session
          </Link>
          
          <p className="text-2xl font-bold text-purple-400">
            See Tomorrow&apos;s Demand Today
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <img 
                  src="/hendricks_logo.png" 
                  alt="Hendricks.AI" 
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="text-sm mb-4">
                Demand Intelligence to Demand Capture. Transform your marketing with predictive AI technology.
              </p>
              <p className="text-xl font-semibold">
                <span className="text-gray-400">Hendricks.AI:</span>{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Where Demand Intelligence Meets Demand Capture
                </span>
              </p>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-white font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/solutions" className="text-sm hover:text-white transition-colors duration-200">
                    Demand Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="/solutions" className="text-sm hover:text-white transition-colors duration-200">
                    Predictive Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/solutions" className="text-sm hover:text-white transition-colors duration-200">
                    Campaign Optimization
                  </Link>
                </li>
                <li>
                  <Link href="/solutions" className="text-sm hover:text-white transition-colors duration-200">
                    ROI Maximization
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm hover:text-white transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/results" className="text-sm hover:text-white transition-colors duration-200">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-sm hover:text-white transition-colors duration-200">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-white transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-sm hover:text-white transition-colors duration-200">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-white transition-colors duration-200">
                    Intelligence Report
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-white transition-colors duration-200">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-white transition-colors duration-200">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm hover:text-white transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm hover:text-white transition-colors duration-200">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/privacy#security" className="text-sm hover:text-white transition-colors duration-200">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Hendricks.AI. All rights reserved.
              </p>
              <div className="flex items-center mt-4 md:mt-0 text-sm text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Houston, Texas</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}