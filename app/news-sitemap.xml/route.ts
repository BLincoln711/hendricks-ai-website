export async function GET() {
  // Get all news articles - in production, this would come from a database
  const newsArticles = [
    {
      headline: "The B2B Marketing Funnel is Dead: Why 80% of Buying Happens in Chaos",
      date: "2025-08-20",
      slug: "b2b-funnel-is-dead",
      keywords: "B2B marketing, sales funnel, predictive AI"
    },
    {
      headline: "Google Meridian MMM Meets Predictive AI: The Future of Marketing Attribution",
      date: "2025-08-19",
      slug: "modern-measurement-meets-predictive-ai",
      keywords: "Google Meridian, MMM, marketing attribution, AI"
    },
    {
      headline: "Hendricks.AI Achieves 74% Accuracy in Predicting Market Demand 2-4 Weeks Early",
      date: "2025-08-18",
      slug: "hendricks-ai-achieves-74-percent-prediction-accuracy",
      keywords: "predictive AI, demand forecasting, B2B SaaS"
    },
    {
      headline: "Former SolarWinds Global Search Lead Launches First Predictive AI Marketing Agency",
      date: "2025-08-15",
      slug: "former-solarwinds-exec-launches-predictive-ai-agency",
      keywords: "Hendricks.AI, SolarWinds, AI marketing agency"
    },
    {
      headline: "Predictive AI Correctly Forecasts Post-Holiday E-commerce Surge 3 Weeks in Advance",
      date: "2025-08-10",
      slug: "predictive-ai-forecasts-ecommerce-surge",
      keywords: "ecommerce, predictive analytics, AI forecasting"
    },
    {
      headline: "Google Performance Max Gets Predictive: How AI Changes the PMax Game",
      date: "2025-08-08",
      slug: "google-performance-max-predictive-ai",
      keywords: "Google Performance Max, PMax, AI optimization"
    }
  ]

  // Only include articles from the last 2 days for Google News
  const twoDaysAgo = new Date()
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
  
  const recentArticles = newsArticles.filter(article => {
    const articleDate = new Date(article.date)
    return articleDate >= twoDaysAgo
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentArticles.map(article => `  <url>
    <loc>https://hendricks.ai/news/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Hendricks.AI</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${article.date}T00:00:00+00:00</news:publication_date>
      <news:title>${article.headline}</news:title>
      <news:keywords>${article.keywords}</news:keywords>
    </news:news>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}