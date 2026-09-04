import { expect, test, type Page } from '@playwright/test'

import { disclosure, formCopy, hero, queued } from '@/content/pages/observe'
import { MINIMUM_SUBMIT_SECONDS } from '@/lib/forms/limits'

async function waitForObserveTimingFloor(page: Page) {
  await expect
    .poll(async () => {
      const value = await page.locator('input[name="startedAt"]').inputValue()
      return Date.now() - Number(value)
    })
    .toBeGreaterThanOrEqual(MINIMUM_SUBMIT_SECONDS * 1000)
}

function publicObserveAbuse(overrides?: { honeypot?: string; startedAt?: number }) {
  return {
    honeypot: overrides?.honeypot ?? '',
    startedAt: overrides?.startedAt ?? Date.now() - 5_000,
  }
}

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
    await expect(page.locator('input[name="honeypot"]')).toHaveCount(1)
    await expect(page.locator('input[name="startedAt"]')).toHaveCount(1)
    const robots = await page.locator('head meta[name="robots"]').getAttribute('content')
    expect(robots ?? '').toMatch(/noindex/)
  })

  test('queues an observation and shows a pending board without a selection map', async ({ page }) => {
    await page.goto('/observe')
    await page.getByLabel(new RegExp('^Brand')).fill('Northwind')
    await page.getByLabel(new RegExp('^Category')).selectOption('b2b-software')
    await waitForObserveTimingFloor(page)
    await page.getByRole('button', { name: formCopy.submit }).click()

    await expect(page).toHaveURL(/\/observe\?job=/)
    await expect(page.getByText(queued.status).first()).toBeVisible()
    await expect(page.getByText(queued.boardCaption)).toBeVisible()
    await expect(page.getByText(queued.intentsNote)).toBeVisible()
    await expect(page.getByRole('rowheader', { name: 'Perplexity' })).toBeVisible()
    await expect(page.getByText('not probed in this sample').first()).toBeVisible()
    await expect(page.locator('[data-observe-poll]')).toHaveAttribute('data-observe-poll', 'queued')

    const instrument = page.locator('#observation')
    await expect(instrument.getByText('Brand A', { exact: true })).toHaveCount(0)
    await expect(instrument.getByText('shortlisted', { exact: true })).toHaveCount(0)
    await expect(instrument.getByText('cited', { exact: true })).toHaveCount(0)
    await expect(instrument.getByText('invisible', { exact: true })).toHaveCount(0)
    await expect(page.locator('#plate-01')).toHaveCount(0)
    await expect(page.locator('.drawing-desktop, .drawing-mobile')).toHaveCount(0)
  })

  test('keeps empty invalid submits on the form', async ({ page }) => {
    await page.goto('/observe?brand=&category=')

    await expect(page.getByText(formCopy.brandError)).toBeVisible()
    await expect(page.getByText(formCopy.categoryError)).toBeVisible()
    await expect(page.getByText(queued.boardCaption)).toHaveCount(0)
  })

  test('prefills a valid query without creating a job', async ({ page }) => {
    const response = await page.goto('/observe?brand=Northwind&category=b2b-software')
    expect(response?.status()).toBe(200)

    await expect(page).toHaveURL(/\/observe\?brand=Northwind&category=b2b-software/)
    await expect(page.getByLabel(new RegExp('^Brand'))).toHaveValue('Northwind')
    await expect(page.getByLabel(new RegExp('^Category'))).toHaveValue('b2b-software')
    await expect(page.getByRole('button', { name: formCopy.submit })).toBeVisible()
    await expect(page.getByText(queued.boardCaption)).toHaveCount(0)
  })
})

test.describe('Observation job API', () => {
  test('POST create then GET poll stay pending or unmeasured', async ({ request }) => {
    const created = await request.post('/api/observe/jobs', {
      data: {
        brand_name: 'Northwind',
        category: 'b2b-software',
        contexts: [
          'Which platform should a mid-market operations team use in this category?',
          'Who should a buyer compare for this category this quarter?',
          'What should a first-time buyer compare before choosing a vendor in this category?',
          'Which option fits a team replacing a spreadsheet process in this category?',
        ],
        consent: true,
        ...publicObserveAbuse(),
      },
    })

    expect(created.status()).toBe(201)
    const body = (await created.json()) as {
      ok: boolean
      job: { job_id: string; status: string }
      payload: { gemini_row: { state: string }; cells: { state: string }[] }
    }
    expect(body.ok).toBe(true)
    expect(body.job.status).toBe('queued')
    expect(body.payload.gemini_row.state).toBe('unmeasured')
    expect(body.payload.cells.every((cell) => cell.state === 'pending')).toBe(true)

    const polled = await request.get(`/api/observe/jobs/${encodeURIComponent(body.job.job_id)}`)
    expect(polled.status()).toBe(200)
    const text = await polled.text()
    expect(text).not.toMatch(/"state":"cited"/)
    expect(text).not.toMatch(/"state":"invisible"/)
  })

  test('POST without honeypot and timing fields is rejected', async ({ request }) => {
    const created = await request.post('/api/observe/jobs', {
      data: {
        brand_name: 'Northwind',
        category: 'b2b-software',
        contexts: [
          'Which platform should a mid-market operations team use in this category?',
          'Who should a buyer compare for this category this quarter?',
          'What should a first-time buyer compare before choosing a vendor in this category?',
        ],
        consent: true,
      },
    })

    expect(created.status()).toBe(400)
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
    await expect(page.locator('#plate-01 .illus')).toHaveCount(0)
    await expect(
      page.locator('.illus', { hasText: 'Illustrative interface. Not a client result.' }),
    ).toHaveCount(1)
  })

  test('diagnostic offers a secondary observation door', async ({ page }) => {
    await page.goto('/diagnostic')

    const door = page.getByRole('link', { name: 'try an observation' })
    await expect(door).toHaveAttribute('href', '/observe')
    await expect(page.getByText('It is not the Diagnostic.')).toBeVisible()
  })
})
