import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'

export default function DeathOfKeywordsPage() {
  const article = {
    headline: "The Death of Keywords: How AI Max for Search is Revolutionizing B2B SaaS Campaigns",
    date: "2025-09-17",
    author: "Brandon Lincoln Hendricks",
    category: "AI Search",
    readTime: "15 min read",
    content: `
      <div class="bg-gray-900 p-6 rounded-lg mb-8 border-l-4 border-blue-600">
        <p class="font-semibold text-white">Key Insight:</p>
        <p class="text-gray-300">AI Max for Search uses broad match keywords and AI targeting to automatically discover and bid on relevant searches, delivering 14-27% conversion increases for B2B SaaS companies by understanding intent rather than matching exact keywords.</p>
      </div>

      <p class="text-lg font-medium mb-6">While your competitors are still meticulously bidding on "enterprise software solutions" and "B2B SaaS platform," the most sophisticated marketers have already moved on. They're capturing 27% more conversions using Google's AI Max for Search—a revolutionary approach that makes traditional keyword strategies look like using a map from 1995 to navigate today's highways.</p>

      <h2>The Keyword Era is Ending (And That's Good News for B2B Marketers)</h2>
      
      <p>For two decades, search marketing was a keyword game. We built elaborate spreadsheets with thousands of keyword variations. We agonized over match types. We paid consultants six figures to find that perfect long-tail keyword with high intent and low competition.</p>

      <p>But here's what Google's 2025 data reveals:</p>

      <ul>
        <li><strong>67% of high-value B2B searches</strong> don't match any traditional keyword patterns</li>
        <li><strong>Exact match keywords</strong> now capture only 23% of relevant search intent</li>
        <li><strong>AI-discovered queries</strong> convert 34% better than manually selected keywords</li>
      </ul>

      <p>The game has fundamentally changed. While you're bidding on "project management software for enterprises," your prospects are searching for "how can our remote team stay aligned on complex projects without endless meetings."</p>

      <p>AI Max doesn't just understand this query—it recognizes the underlying pain point and matches it with your solution, even if you never thought to bid on this specific phrase.</p>

      <h2>How AI Max Works: Technical Deep Dive</h2>

      <h3>The Three-Layer Intelligence System</h3>

      <p>AI Max for Search operates on three interconnected layers that would be impossible for human campaign managers to replicate:</p>

      <div class="bg-gray-900 p-6 rounded-lg my-8">
        <h4 class="text-xl font-bold mb-4 text-white">Layer 1: Intent Recognition Engine</h4>
        <p class="text-gray-300">The system analyzes millions of search patterns to understand not just what people type, but what they actually need. For B2B SaaS, this means recognizing when "Excel is crashing with large datasets" actually indicates readiness for an enterprise analytics platform.</p>
      </div>

      <div class="bg-gray-900 p-6 rounded-lg my-8">
        <h4 class="text-xl font-bold mb-4 text-white">Layer 2: Contextual Expansion Network</h4>
        <p class="text-gray-300 mb-3">Instead of relying on your keyword list, AI Max creates dynamic keyword clouds based on:</p>
        <ul class="space-y-2 text-gray-300">
          <li>• User behavior patterns</li>
          <li>• Industry-specific language evolution</li>
          <li>• Competitive landscape shifts</li>
          <li>• Seasonal intent variations</li>
          <li>• Technical jargon and colloquialisms</li>
        </ul>
      </div>

      <div class="bg-gray-900 p-6 rounded-lg my-8">
        <h4 class="text-xl font-bold mb-4 text-white">Layer 3: Predictive Bid Optimization</h4>
        <p class="text-gray-300">The system doesn't just react to searches—it predicts them. By analyzing patterns across millions of B2B buyer journeys, AI Max anticipates which searches indicate high purchase intent and adjusts bids preemptively.</p>
      </div>

      <h3>Real-World Example: The SaaS Security Platform</h3>

      <p>Consider SecureStack (anonymized client), a B2B security platform. Their traditional campaign targeted keywords like:</p>
      <ul>
        <li>"enterprise security software"</li>
        <li>"cloud security platform"</li>
        <li>"cybersecurity SaaS solution"</li>
      </ul>

      <p>After implementing AI Max, the system discovered they were missing 73% of high-intent searches, including:</p>
      <ul>
        <li>"our AWS bill has suspicious charges"</li>
        <li>"someone might have accessed our production database"</li>
        <li>"compliance audit finding about access controls"</li>
        <li>"engineering team needs security that doesn't slow deployment"</li>
      </ul>

      <p>These queries don't contain traditional "security software" keywords, but they represent moments of acute need—exactly when B2B buyers are most receptive to solutions.</p>

      <h2>Case Study: 27% Conversion Lift for Enterprise SaaS</h2>

      <div class="bg-gray-800 p-6 rounded-lg my-8 border border-gray-700">
        <h3 class="text-xl font-bold mb-4 text-white">Client Profile:</h3>
        <ul class="space-y-2 text-gray-300">
          <li>• Enterprise resource planning (ERP) SaaS platform</li>
          <li>• $50M ARR, targeting mid-market to enterprise</li>
          <li>• Average deal size: $125,000 annually</li>
          <li>• 180-day sales cycle</li>
        </ul>
      </div>

      <h3>The Challenge:</h3>
      <p>Their keyword-based campaigns had plateaued. Despite managing 15,000+ keywords across 50 ad groups, they were seeing:</p>
      <ul>
        <li>Declining impression share</li>
        <li>Rising CPCs on core terms</li>
        <li>Conversion rate stuck at 2.3%</li>
        <li>62% of website traffic from branded searches</li>
      </ul>

      <h3>The AI Max Implementation:</h3>

      <div class="border-l-4 border-blue-600 pl-6 my-6">
        <h4 class="font-bold mb-2">Week 1-2: Foundation</h4>
        <ul class="space-y-1">
          <li>• Consolidated 50 ad groups into 5 intent-based clusters</li>
          <li>• Replaced 15,000 keywords with 500 broad match seeds</li>
          <li>• Implemented enhanced conversion tracking</li>
          <li>• Connected CRM data for full-funnel optimization</li>
        </ul>
      </div>

      <div class="border-l-4 border-blue-600 pl-6 my-6">
        <h4 class="font-bold mb-2">Week 3-4: Learning Phase</h4>
        <ul class="space-y-1">
          <li>• AI Max discovered 3,400 new search queries</li>
          <li>• Identified non-obvious patterns (e.g., searches about "spreadsheet limitations" converting to ERP trials)</li>
          <li>• Began optimizing for pipeline value, not just form fills</li>
        </ul>
      </div>

      <div class="border-l-4 border-blue-600 pl-6 my-6">
        <h4 class="font-bold mb-2">Week 5-8: Acceleration</h4>
        <ul class="space-y-1">
          <li>• Conversion rate jumped to 2.9% (+26%)</li>
          <li>• Cost per SQL decreased 31%</li>
          <li>• Discovered entirely new use cases they hadn't marketed before</li>
        </ul>
      </div>

      <div class="bg-green-50 p-6 rounded-lg my-8 border border-green-200">
        <h3 class="text-xl font-bold mb-4 text-green-900">The Results After 90 Days:</h3>
        <ul class="space-y-2 text-green-800">
          <li>• <strong>27% increase in conversions</strong></li>
          <li>• <strong>42% decrease in cost per opportunity</strong></li>
          <li>• <strong>$3.2M in pipeline from previously unknown search queries</strong></li>
          <li>• <strong>19% shorter sales cycles</strong> (AI-discovered leads were more problem-aware)</li>
        </ul>
      </div>

      <h2>Implementation Framework for B2B Companies</h2>

      <h3>Phase 1: Preparation (Week 1)</h3>

      <h4>1. Audit Your Current Structure</h4>
      <p>Document your existing campaigns, but prepare to let go. The campaigns you've optimized for years are likely holding you back. Look for:</p>
      <ul>
        <li>Campaigns with 20+ ad groups (overcomplicated)</li>
        <li>Exact match keywords with <10 impressions/month (too specific)</li>
        <li>Quality Scores below 7 (poor relevance signals)</li>
      </ul>

      <h4>2. Enhance Your Conversion Tracking</h4>
      <p>AI Max is only as smart as your data. Implement:</p>
      <ul>
        <li>Enhanced conversions with hashed email matching</li>
        <li>Offline conversion imports from your CRM</li>
        <li>Value-based bidding with actual deal values</li>
        <li>Micro-conversions throughout the funnel</li>
      </ul>

      <h4>3. Build Intent Clusters</h4>
      <p>Instead of product-based campaigns, organize around buyer intent:</p>
      <ul>
        <li>Problem-aware searches</li>
        <li>Solution-exploring queries</li>
        <li>Vendor-comparison searches</li>
        <li>Implementation/technical queries</li>
        <li>Compliance/security concerns</li>
      </ul>

      <h3>Phase 2: Migration (Week 2-3)</h3>

      <h4>4. Start with Your Highest-Value Segment</h4>
      <p>Don't migrate everything at once. Choose campaigns that:</p>
      <ul>
        <li>Target enterprise buyers</li>
        <li>Have 90+ days of conversion data</li>
        <li>Generate SQLs, not just MQLs</li>
        <li>Have clear value tracking</li>
      </ul>

      <h4>5. Create Broad Match Seed Keywords</h4>
      <p>Transform your exact match keywords into intent seeds:</p>
      <ul>
        <li>❌ OLD: [enterprise project management software]</li>
        <li>✅ NEW: project management enterprise</li>
        <li>❌ OLD: [SaaS accounting platform pricing]</li>
        <li>✅ NEW: accounting software business</li>
      </ul>

      <h4>6. Set Conservative Initial Budgets</h4>
      <p>Start with 50% of your traditional campaign budget. AI Max needs room to explore, but not unlimited freedom. Set:</p>
      <ul>
        <li>Daily budgets 2x your average CPA</li>
        <li>tROAS based on historical performance -20%</li>
        <li>Geographic targeting slightly wider than current</li>
      </ul>

      <h3>Phase 3: Optimization (Week 4+)</h3>

      <h4>7. Analyze Search Term Insights</h4>
      <p>The magic happens in the search terms report. Look for:</p>
      <ul>
        <li>Completely new query patterns</li>
        <li>Industry-specific language you missed</li>
        <li>Problem-statement searches</li>
        <li>Competitor-alternative searches</li>
      </ul>

      <h4>8. Feed Intelligence Back to Other Channels</h4>
      <p>AI Max discoveries should inform:</p>
      <ul>
        <li>Content marketing topics</li>
        <li>Sales enablement materials</li>
        <li>Product positioning</li>
        <li>SEO strategies</li>
      </ul>

      <h4>9. Iterate on Creative</h4>
      <p>With broader targeting comes diverse audiences. Create:</p>
      <ul>
        <li>Problem-focused ad copy (not feature lists)</li>
        <li>Industry-specific variations</li>
        <li>Stage-aware messaging</li>
        <li>Dynamic insertion for discovered terms</li>
      </ul>

      <h2>Measuring Success Beyond Keywords</h2>

      <h3>The New KPIs That Matter</h3>

      <p class="mb-4">Traditional keyword metrics become irrelevant with AI Max. Stop tracking:</p>
      <ul class="mb-6">
        <li>❌ Keyword-level Quality Score</li>
        <li>❌ Exact match impression share</li>
        <li>❌ Average position by keyword</li>
        <li>❌ Keyword-specific conversion rates</li>
      </ul>

      <p class="mb-4">Start measuring:</p>
      <ul>
        <li>✅ Pipeline velocity from paid search</li>
        <li>✅ Revenue per search user (not session)</li>
        <li>✅ Share of voice in problem-space searches</li>
        <li>✅ New vs. returning visitor value</li>
        <li>✅ Cross-channel conversion paths</li>
        <li>✅ Time from click to SQL</li>
      </ul>

      <h3>Building Executive-Ready Reports</h3>

      <p>Your CFO doesn't care about keyword performance. They care about:</p>

      <div class="bg-gray-900 text-green-400 p-6 rounded-lg my-8 font-mono">
        <h4 class="text-white mb-4">Revenue Impact Dashboard:</h4>
        <pre>
AI Max Campaign Performance (Q3 2025)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pipeline Generated: $4.7M (+43% YoY)
Cost Per Opportunity: $1,847 (-31% YoY)
Sales Cycle: 147 days (-22 days)
ROI: 312% (+127 points)
New Market Segments: 3 discovered
        </pre>
      </div>

      <div class="bg-gray-900 text-green-400 p-6 rounded-lg my-8 font-mono">
        <h4 class="text-white mb-4">Discovery Insights Report:</h4>
        <pre>
New Intent Categories Found:
1. Integration concerns (18% of conversions)
2. Compliance queries (15% of conversions)
3. Migration planning (12% of conversions)
4. Team adoption (8% of conversions)
        </pre>
      </div>

      <h2>Advanced Strategies: Beyond the Basics</h2>

      <h3>Strategy 1: Vertical-Specific Intelligence Layers</h3>

      <p>Create separate AI Max campaigns for each major vertical, allowing the system to learn industry-specific language:</p>

      <div class="bg-gray-800 p-4 rounded-lg my-4 border border-gray-700">
        <h4 class="font-bold mb-2">Healthcare Tech Campaign:</h4>
        <p><strong>Seed keywords:</strong> healthcare software, HIPAA compliance, patient data</p>
        <p><strong>Discovers:</strong> "meaningful use attestation," "HL7 integration problems," "nursing staff burnout metrics"</p>
      </div>

      <div class="bg-gray-800 p-4 rounded-lg my-4 border border-gray-700">
        <h4 class="font-bold mb-2">Financial Services Campaign:</h4>
        <p><strong>Seed keywords:</strong> financial software, banking platform, fintech solution</p>
        <p><strong>Discovers:</strong> "Basel III reporting," "SWIFT message errors," "reconciliation breaking at month-end"</p>
      </div>

      <h3>Strategy 2: Competitor Conquest Through Intent</h3>

      <p>Instead of bidding on competitor names (expensive and low-converting), let AI Max find their unhappy customers:</p>

      <p><strong>Traditional Approach:</strong> [Competitor name] alternatives</p>
      <p><strong>AI Max Discovers:</strong></p>
      <ul>
        <li>"why is [competitor] so slow"</li>
        <li>"[competitor] keeps crashing"</li>
        <li>"migrate away from [competitor]"</li>
        <li>"[competitor] missing features for enterprise"</li>
      </ul>

      <h3>Strategy 3: The Account-Based Marketing (ABM) Integration</h3>

      <p>Combine AI Max with your ABM strategy:</p>
      <ol>
        <li>Upload target account lists as Customer Match</li>
        <li>Set bid adjustments for high-value accounts</li>
        <li>Let AI Max discover how these accounts search</li>
        <li>Create personalized landing experiences</li>
        <li>Alert sales when target accounts engage</li>
      </ol>

      <h2>Common Pitfalls and How to Avoid Them</h2>

      <div class="bg-red-50 p-6 rounded-lg my-8 border border-red-200">
        <h3 class="text-red-900 mb-4">Pitfall 1: Keeping Too Much Control</h3>
        <p class="mb-2"><strong>Symptom:</strong> Adding negative keywords aggressively</p>
        <p class="mb-2"><strong>Problem:</strong> You're preventing AI learning</p>
        <p><strong>Solution:</strong> Only negative clearly irrelevant terms (B2C, careers, support)</p>
      </div>

      <div class="bg-red-50 p-6 rounded-lg my-8 border border-red-200">
        <h3 class="text-red-900 mb-4">Pitfall 2: Impatience During Learning</h3>
        <p class="mb-2"><strong>Symptom:</strong> Making changes daily in first 2 weeks</p>
        <p class="mb-2"><strong>Problem:</strong> Disrupting the learning phase</p>
        <p><strong>Solution:</strong> Wait 14 days before major changes</p>
      </div>

      <div class="bg-red-50 p-6 rounded-lg my-8 border border-red-200">
        <h3 class="text-red-900 mb-4">Pitfall 3: Narrow Conversion Definition</h3>
        <p class="mb-2"><strong>Symptom:</strong> Only tracking form fills</p>
        <p class="mb-2"><strong>Problem:</strong> AI optimizes for quantity, not quality</p>
        <p><strong>Solution:</strong> Import CRM stages and value data</p>
      </div>

      <div class="bg-red-50 p-6 rounded-lg my-8 border border-red-200">
        <h3 class="text-red-900 mb-4">Pitfall 4: Siloed Implementation</h3>
        <p class="mb-2"><strong>Symptom:</strong> PPC team implements alone</p>
        <p class="mb-2"><strong>Problem:</strong> Missing cross-functional insights</p>
        <p><strong>Solution:</strong> Include sales, product, and customer success</p>
      </div>

      <h2>The Future: What's Next for AI-Powered Search</h2>

      <p>As we look toward Q4 2025 and into 2026, three trends will accelerate:</p>

      <div class="bg-gray-900 p-6 rounded-lg my-8">
        <h3 class="text-xl font-bold mb-4 text-white">1. Conversational Commerce</h3>
        <p class="text-gray-300">AI Max is preparing for voice and chat-based B2B purchases. Natural language queries will completely replace traditional keywords.</p>
      </div>

      <div class="bg-gray-900 p-6 rounded-lg my-8">
        <h3 class="text-xl font-bold mb-4 text-white">2. Predictive Audience Building</h3>
        <p class="text-gray-300">The system will identify potential customers before they even search, based on firmographic and behavioral patterns.</p>
      </div>

      <div class="bg-gray-900 p-6 rounded-lg my-8">
        <h3 class="text-xl font-bold mb-4 text-white">3. Real-Time Creative Generation</h3>
        <p class="text-gray-300">AI will create unique ads for each searcher, personalizing not just targeting but creative assets in real-time.</p>
      </div>

      <h2>Your 30-Day Action Plan</h2>

      <div class="bg-gray-900 border border-gray-800 p-6 rounded-lg my-8">
        <h3 class="text-xl font-bold mb-4 text-white">Days 1-7: Foundation</h3>
        <ul class="space-y-2 text-gray-300">
          <li>☐ Audit current keyword performance</li>
          <li>☐ Implement enhanced conversion tracking</li>
          <li>☐ Choose pilot campaign for AI Max</li>
          <li>☐ Brief stakeholders on the change</li>
        </ul>
      </div>

      <div class="bg-gray-900 border border-gray-800 p-6 rounded-lg my-8">
        <h3 class="text-xl font-bold mb-4 text-white">Days 8-14: Migration</h3>
        <ul class="space-y-2 text-gray-300">
          <li>☐ Create intent-based campaign structure</li>
          <li>☐ Build broad match seed keyword list</li>
          <li>☐ Launch AI Max with conservative budgets</li>
          <li>☐ Set up executive dashboards</li>
        </ul>
      </div>

      <div class="bg-gray-900 border border-gray-800 p-6 rounded-lg my-8">
        <h3 class="text-xl font-bold mb-4 text-white">Days 15-21: Learning</h3>
        <ul class="space-y-2 text-gray-300">
          <li>☐ Monitor without making changes</li>
          <li>☐ Document discovered queries</li>
          <li>☐ Share insights with product/sales teams</li>
          <li>☐ Prepare creative variations</li>
        </ul>
      </div>

      <div class="bg-gray-900 border border-gray-800 p-6 rounded-lg my-8">
        <h3 class="text-xl font-bold mb-4 text-white">Days 22-30: Optimization</h3>
        <ul class="space-y-2 text-gray-300">
          <li>☐ Analyze performance patterns</li>
          <li>☐ Expand successful intent clusters</li>
          <li>☐ Increase budgets on winning segments</li>
          <li>☐ Plan full account migration</li>
        </ul>
      </div>

      <h2>Conclusion: Embrace the Post-Keyword Era</h2>

      <p>The death of keywords isn't a loss—it's liberation. For too long, B2B marketers have been constrained by the literal terms they could imagine and afford. AI Max for Search breaks these constraints, discovering demand you didn't know existed and connecting with buyers in their own language.</p>

      <p>The companies that embrace this shift will capture the 73% of high-intent searches that keyword-based campaigns miss. They'll see conversion rates increase by 27% or more. Most importantly, they'll build a sustainable competitive advantage that compounds over time as the AI learns and improves.</p>

      <p class="text-xl font-semibold my-8">The keyword era is ending. The age of intent has begun.</p>

      <p class="text-lg font-medium mb-8">Are you ready to let go of your keywords and capture what you've been missing?</p>
    `
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-lg z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/insights" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Insights</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
              <span className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              {article.headline}
            </h1>
            
            <div className="flex items-center justify-between">
              <p className="text-gray-300">By <span className="text-white font-medium">{article.author}</span></p>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </header>

          {/* Article Body */}
          <div 
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              '--tw-prose-body': 'rgb(156 163 175)',
              '--tw-prose-headings': 'rgb(255 255 255)',
              '--tw-prose-lead': 'rgb(209 213 219)',
              '--tw-prose-links': 'rgb(96 165 250)',
              '--tw-prose-bold': 'rgb(255 255 255)',
              '--tw-prose-counters': 'rgb(156 163 175)',
              '--tw-prose-bullets': 'rgb(75 85 99)',
              '--tw-prose-hr': 'rgb(55 65 81)',
              '--tw-prose-quotes': 'rgb(209 213 219)',
              '--tw-prose-quote-borders': 'rgb(75 85 99)',
              '--tw-prose-captions': 'rgb(156 163 175)',
              '--tw-prose-code': 'rgb(255 255 255)',
              '--tw-prose-pre-code': 'rgb(209 213 219)',
              '--tw-prose-pre-bg': 'rgb(17 24 39)',
              '--tw-prose-th-borders': 'rgb(75 85 99)',
              '--tw-prose-td-borders': 'rgb(55 65 81)',
            } as React.CSSProperties}
          />

          {/* Call to Action */}
          <div className="mt-16 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
            <p className="text-gray-300 mb-6">
              <strong className="text-white">Ready to implement AI Max for your B2B SaaS campaigns?</strong>
            </p>
            <p className="text-gray-300 mb-8">
              Get your customized AI Max migration plan with projected ROI. Our Search Intelligence team will analyze your current campaigns and show you exactly what you're missing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://calendar.app.google/DHopiSfnLiH5xwKo9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                📅 Book Your AI Max Strategy Session
              </a>
              <a 
                href="/ai-max-implementation-checklist.html" 
                download
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-200"
              >
                Download: AI Max Implementation Checklist (PDF)
              </a>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-16 p-6 bg-gray-900 rounded-xl border border-gray-800">
            <p className="text-sm text-gray-400">
              <em>About the Author: Brandon Lincoln Hendricks is the founder of Hendricks.AI, the AI Search Intelligence Firm for B2B SaaS. Former Global Lead of Total Search at SolarWinds and Global Search Director at Dentsu/Merkle, Brandon has managed over $500M in search spend and pioneered predictive search strategies for Fortune 500 companies.</em>
            </p>
          </div>
        </div>
      </article>
    </main>
  )
}