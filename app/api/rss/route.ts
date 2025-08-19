import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://hendricks.ai'
  
  const articles = [
    {
      title: "Building Production AI: Why 99% of AI POCs Fail to Scale",
      link: `${baseUrl}/news/building-production-ai-why-pocs-fail`,
      description: "Technical deep-dive into the engineering challenges of scaling AI from prototype to production, based on lessons learned building systems that process 2.8M signals daily.",
      pubDate: new Date('2025-01-20').toUTCString(),
      category: "AI Engineering",
      author: "Brandon Lincoln Hendricks"
    },
    {
      title: "The Hidden Cost of AI Hallucinations in Marketing: A $4.2B Problem",
      link: `${baseUrl}/news/ai-hallucinations-marketing-cost`,
      description: "New research reveals how AI hallucinations in marketing automation tools are costing enterprises billions in wasted ad spend and missed opportunities.",
      pubDate: new Date('2025-01-19').toUTCString(),
      category: "AI Research",
      author: "Brandon Lincoln Hendricks"
    },
    {
      title: "Hendricks.AI Achieves 74% Accuracy in Predicting Market Demand 2-4 Weeks Early",
      link: `${baseUrl}/news/hendricks-ai-achieves-74-percent-prediction-accuracy`,
      description: "New predictive AI system analyzes 2.8 million daily signals to forecast market demand with unprecedented accuracy, delivering average ROI of 312% for enterprise clients.",
      pubDate: new Date('2025-01-18').toUTCString(),
      category: "Company News",
      author: "Brandon Lincoln Hendricks"
    },
    {
      title: "From GPT to Production: Engineering Lessons from Early OpenAI Beta Access",
      link: `${baseUrl}/news/gpt-to-production-engineering-lessons`,
      description: "Exclusive insights from beta testing GPT-3, ChatGPT, and GPT-4, including architectural decisions that enabled 74% prediction accuracy.",
      pubDate: new Date('2025-01-17').toUTCString(),
      category: "AI Engineering",
      author: "Brandon Lincoln Hendricks"
    },
    {
      title: "Former SolarWinds Global Search Lead Launches First Predictive AI Marketing Agency",
      link: `${baseUrl}/news/former-solarwinds-exec-launches-predictive-ai-agency`,
      description: "Brandon Lincoln Hendricks, former Global Lead of Total Search at SolarWinds, announces the launch of Hendricks.AI, the first marketing agency that predicts demand before it happens.",
      pubDate: new Date('2025-01-15').toUTCString(),
      category: "Industry News",
      author: "Brandon Lincoln Hendricks"
    }
  ]

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Hendricks.AI News</title>
    <link>${baseUrl}/news</link>
    <description>Breaking news and insights on predictive AI marketing, AI engineering, and the future of demand intelligence.</description>
    <language>en-us</language>
    <copyright>Copyright ${new Date().getFullYear()} Hendricks.AI</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/hendricks_logo.png</url>
      <title>Hendricks.AI News</title>
      <link>${baseUrl}</link>
    </image>
    ${articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${article.link}</link>
      <guid isPermaLink="true">${article.link}</guid>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${article.pubDate}</pubDate>
      <category>${article.category}</category>
      <dc:creator>${article.author}</dc:creator>
      <content:encoded><![CDATA[${article.description}]]></content:encoded>
    </item>`).join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}