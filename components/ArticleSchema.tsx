import Script from 'next/script'

interface ArticleSchemaProps {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  author: {
    name: string
    title?: string
  }
  image?: string
  articleType?: 'BlogPosting' | 'NewsArticle'
  keywords?: string[]
  wordCount?: number
  readingTime?: number
}

export default function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  image,
  articleType = 'BlogPosting',
  keywords = [],
  wordCount,
  readingTime
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': articleType,
    headline: headline,
    description: description,
    image: image ? `https://hendricks.ai${image}` : 'https://hendricks.ai/og-image.jpg',
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.title || 'Search Intelligence Expert',
      url: 'https://hendricks.ai/about/brandon-lincoln-hendricks',
      sameAs: [
        'https://www.linkedin.com/in/brandonlincolnhendricks/',
        'https://twitter.com/hendricksai'
      ]
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hendricks.AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hendricks.ai/hendricks_logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hendricks.ai/${articleType === 'NewsArticle' ? 'news' : 'insights'}/${headline.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`
    },
    keywords: keywords.join(', '),
    ...(wordCount && { wordCount: wordCount }),
    ...(readingTime && { timeRequired: `PT${readingTime}M` }),
    ...(articleType === 'NewsArticle' && {
      dateline: 'United States',
      articleSection: 'B2B SaaS Search Intelligence'
    })
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}