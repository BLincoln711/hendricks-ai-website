import {
  findResearchArticle,
  latestResearchArticle,
  researchArticles,
} from '@/content/research'
import { renderOgImage } from '@/lib/seo/og-image'

export { size, contentType } from '@/lib/seo/og-image'

/**
 * Declared here as well as on `page.tsx`.
 *
 * A metadata image route is its own route handler, and without its own params
 * list Next builds it on demand: the first build of this route reported it as
 * dynamic while every other route's card was prerendered. One function
 * invocation per social crawler, for an image whose inputs are a static array.
 */
export function generateStaticParams() {
  return researchArticles.map((article) => ({ slug: article.slug }))
}

/**
 * `alt` has to be a module constant, so it describes the section rather than the
 * individual study. Per-article alt text needs `generateImageMetadata`, which
 * moves the image to a `/opengraph-image/<id>` URL for no gain a reader can
 * detect: the article's own headline is rendered inside the image, and the alt
 * text is read by nothing that cannot already see the card's title.
 */
export const alt = 'Hendricks research study'

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // `dynamicParams` is false on the page, so an unregistered slug never reaches
  // this route. The fallback exists so the image builder cannot throw during a
  // build where the registry and the route table are momentarily out of step.
  const article = findResearchArticle(slug) ?? latestResearchArticle

  return renderOgImage({
    eyebrow: article ? article.designation : 'Hendricks Research',
    title: article ? article.title : 'Research for the AI Search Era.',
  })
}
