import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hendricks.ai'
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/results`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brandon-lincoln-hendricks`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/authors/brandon-lincoln-hendricks`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // News articles
  const newsArticles = [
    {
      url: `${baseUrl}/news/b2b-funnel-is-dead`,
      lastModified: '2025-08-20',
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news/modern-measurement-meets-predictive-ai`,
      lastModified: '2025-08-19',
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news/hendricks-ai-achieves-74-percent-prediction-accuracy`,
      lastModified: '2025-08-18',
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news/former-solarwinds-exec-launches-predictive-ai-agency`,
      lastModified: '2025-08-15',
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news/predictive-ai-forecasts-ecommerce-surge`,
      lastModified: '2025-08-10',
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news/google-performance-max-predictive-ai`,
      lastModified: '2025-08-08',
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
  ]

  // Insights articles
  const insightsArticles = [
    {
      url: `${baseUrl}/insights/b2b-marketing-funnel-is-dead`,
      lastModified: '2025-08-20',
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/insights/google-meridian-mmm-predictive-ai`,
      lastModified: '2025-08-19',
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/insights/ai-marketing-beyond-smart-bidding`,
      lastModified: '2025-08-16',
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
  ]

  return [...staticPages, ...newsArticles, ...insightsArticles]
}