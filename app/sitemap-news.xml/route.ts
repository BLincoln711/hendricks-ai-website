export async function GET() {
  // Get all news articles - in production, this would come from a database
  const newsArticles = [
    {
      headline: "The B2B Marketing Funnel is Dead: Why 80% of Buying Happens in Chaos",
      date: "2025-08-20",
      author: "Brandon Lincoln Hendricks",
      slug: "b2b-funnel-is-dead"
    },
    {
      headline: "Google Meridian MMM Meets Predictive AI: The Future of Marketing Attribution",
      date: "2025-08-19",
      author: "Brandon Lincoln Hendricks", 
      slug: "modern-measurement-meets-predictive-ai"
    },
    {
      headline: "Hendricks.AI Achieves 74% Accuracy in Predicting Market Demand 2-4 Weeks Early",
      date: "2025-08-18",
      author: "Brandon Lincoln Hendricks",
      slug: "hendricks-ai-achieves-74-percent-prediction-accuracy"
    },
    // Add more articles as needed
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsArticles.map(article => `  <url>
    <loc>https://hendricks.ai/news/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Hendricks.AI News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${article.date}</news:publication_date>
      <news:title>${article.headline}</news:title>
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