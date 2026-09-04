import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container } from '@/components/layout/container'
import { IllustrativeLegend } from '@/components/visuals/illustrative-legend'
import { SelectionMapPlate } from '@/components/visuals/selection-map-plate'
import { selectionMapData } from '@/content/instruments/selection-map-data'
import { isProduction } from '@/lib/env'

/**
 * Plate fixtures: the plate system rendered outside any page, so the unit,
 * census, motion and label-collision gates have a built route to read before
 * the homepage consumes the components.
 *
 * The plate is given the container's full width, which is the width the hero
 * gives it, because the label-collision gate is only meaningful at the
 * proportion the instrument actually ships at.
 *
 * Not a site route: unregistered in `src/config/routes.ts`, so the sitemap,
 * `llms.txt` and the e2e sweeps never see it; disallowed in `robots.ts`;
 * `noindex` here; and a 404 in production, because a fixture is not content.
 */

export const metadata: Metadata = {
  title: 'Plate fixtures',
  robots: { index: false, follow: false },
}

export default function PlateFixturesPage() {
  if (isProduction) notFound()

  return (
    <Container>
      <h1 className="text-h3 pt-8 text-ink">Plate fixtures</h1>
      <p className="text-small mt-2 text-ink-2">Redesign components rendered from their typed data, in their resting state. Not a site page.</p>

      <section id="fixture-plate-01" aria-labelledby="fixture-plate-01-title" className="mt-10 overflow-x-clip pb-16">
        <h2 id="fixture-plate-01-title" className="text-h4 mb-6 text-ink">
          Plate 01, hero variant
        </h2>
        <SelectionMapPlate data={selectionMapData} />
        <IllustrativeLegend />
      </section>
    </Container>
  )
}
