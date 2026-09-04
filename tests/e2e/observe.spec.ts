import { expect, test } from '@playwright/test'

import { disclosure, formCopy, hero, queued } from '@/content/pages/observe'

test.describe('/observe shell', () => {
  test('returns 200 with the brand and category form and the disclosure', async ({ page }) => {
    const response = await page.goto('/observe')
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(hero.title)
    await expect(page.getByLabel(new RegExp('^Brand'))).toBeVisible()
    await expect(page.getByLabel(new RegExp('^Category'))).toBeVisible()
    await expect(page.getByRole('button', { name: formCopy.submit })).toBeVisible()
    await expect(page.getByText(disclosure.sample)).toBeVisible()
    await expect(page.getByText(disclosure.limits)).toBeVisible()
    await expect(page.getByRole('link', { name: 'Start with a Search Intelligence Diagnostic' })).toBeVisible()
  })

  test('queues an observation without inventing a selection map', async ({ page }) => {
    await page.goto('/observe')
    await page.getByLabel(new RegExp('^Brand')).fill('Northwind')
    await page.getByLabel(new RegExp('^Category')).selectOption('b2b-software')
    await page.getByRole('button', { name: formCopy.submit }).click()

    await expect(page).toHaveURL(/\/observe\?/)
    await expect(page.getByText(queued.status).first()).toBeVisible()
    await expect(page.getByText(queued.mapEmpty)).toBeVisible()
    await expect(page.getByText(queued.intentsNote)).toBeVisible()
    await expect(page.getByText('Perplexity')).toBeVisible()
    await expect(page.getByText('not probed in this sample')).toBeVisible()

    await expect(page.getByText('Brand A')).toHaveCount(0)
    await expect(page.getByText('shortlisted')).toHaveCount(0)
    await expect(page.locator('#plate-01')).toHaveCount(0)
    await expect(page.locator('.drawing-desktop, .drawing-mobile')).toHaveCount(0)
  })

  test('keeps empty invalid submits on the form', async ({ page }) => {
    await page.goto('/observe?brand=&category=')

    await expect(page.getByText(formCopy.brandError)).toBeVisible()
    await expect(page.getByText(formCopy.categoryError)).toBeVisible()
    await expect(page.getByText(queued.mapEmpty)).toHaveCount(0)
  })
})

test.describe('Observation doors', () => {
  test('home links to /observe beside Plate 01 and leaves the plate illustrative', async ({
    page,
  }) => {
    await page.goto('/')

    const door = page.getByRole('link', { name: 'Try a public observation' })
    await expect(door).toHaveAttribute('href', '/observe')

    await expect(page.locator('#plate-01 .plate-no')).toHaveText('Plate 01')
    await expect(page.locator('#plate-01 .plate-title')).toHaveText('Selection Map')
    await expect(page.locator('#plate-01 .illus')).toHaveText(
      'Illustrative interface. Not a client result.',
    )
  })

  test('diagnostic offers a secondary observation door', async ({ page }) => {
    await page.goto('/diagnostic')

    const door = page.getByRole('link', { name: 'try an observation' })
    await expect(door).toHaveAttribute('href', '/observe')
    await expect(page.getByText('It is not the Diagnostic.')).toBeVisible()
  })
})
