import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { glossaryTerms } from "../terms"
import { DefinitionBody } from "../components/DefinitionBody"
import { RelatedTerms } from "../components/RelatedTerms"

type Props = {
  params: { slug: string }
}

// Generate static params for all glossary terms
export async function generateStaticParams() {
  return glossaryTerms.map((term) => ({
    slug: term.slug,
  }))
}

// Generate metadata for each term page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const term = glossaryTerms.find((t) => t.slug === params.slug)

  if (!term) {
    return {
      title: "Term Not Found | Hendricks.AI"
    }
  }

  const title = `${term.name} - AI Search Visibility Glossary`
  const description = term.shortDefinition
  const url = `https://hendricks.ai/glossary/${term.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "Hendricks.AI",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  }
}

export default function GlossaryTermPage({ params }: Props) {
  const term = glossaryTerms.find((t) => t.slug === params.slug)

  if (!term) {
    notFound()
  }

  // Schema.org markup for the defined term
  const termSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `https://hendricks.ai/glossary/${term.slug}#term`,
    name: term.name,
    description: term.longDefinition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": "https://hendricks.ai/glossary#termset",
      name: "AI Search Visibility Glossary",
      description: "Comprehensive glossary of AI search visibility, attribution, and search intelligence engineering terms.",
      url: "https://hendricks.ai/glossary"
    },
    url: `https://hendricks.ai/glossary/${term.slug}`
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `https://hendricks.ai/glossary/${term.slug}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://hendricks.ai/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Glossary",
        item: "https://hendricks.ai/glossary",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: term.name,
        item: `https://hendricks.ai/glossary/${term.slug}`,
      },
    ],
  }

  // Article schema for the term page
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://hendricks.ai/glossary/${term.slug}#article`,
    headline: term.name,
    description: term.shortDefinition,
    articleBody: term.longDefinition,
    author: {
      "@type": "Person",
      "@id": "https://hendricks.ai/#brandon-hendricks",
      name: "Brandon Lincoln Hendricks",
      url: "https://hendricks.ai/about",
      jobTitle: "Founder, Search Intelligence Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Hendricks.AI",
        url: "https://hendricks.ai"
      }
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://hendricks.ai/#organization",
      name: "Hendricks.AI",
      url: "https://hendricks.ai",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://hendricks.ai/glossary/${term.slug}`,
    },
    articleSection: term.category,
  }

  return (
    <>
      <Script
        id={`glossary-${term.slug}-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([termSchema, breadcrumbSchema, articleSchema])
        }}
      />

      <div className="space-y-8">
        {/* Breadcrumb navigation */}
        <nav className="text-xs text-neutral-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-neutral-700 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/glossary" className="hover:text-neutral-700 transition-colors">
                Glossary
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-900 font-medium">{term.name}</li>
          </ol>
        </nav>

        {/* Term definition */}
        <DefinitionBody
          name={term.name}
          category={term.category}
          shortDefinition={term.shortDefinition}
          longDefinition={term.longDefinition}
          whyItMatters={term.whyItMatters}
          examples={term.examples}
        />

        {/* Related terms */}
        <RelatedTerms currentSlug={term.slug} category={term.category} />

        {/* Back to glossary */}
        <div className="border-t border-neutral-100 pt-6">
          <Link
            href="/glossary"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            ← Back to Glossary Index
          </Link>
        </div>
      </div>
    </>
  )
}
