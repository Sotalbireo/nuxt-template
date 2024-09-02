import { createPage, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('example', async () => {
  await setup({
    browser: true,
    nuxtConfig: {
      sourcemap: false,
    },
  })

  it('has title', async () => {
    const page = await createPage()
    await page.goto('https://playwright.dev/')

    // Expect a title "to contain" a substring.
    expect(await page.title()).toMatch(/Playwright/)
  })

  it('get started link', async () => {
    const page = await createPage()
    await page.goto('https://playwright.dev/')

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click()

    // Wait for page transition.
    await page.waitForLoadState('networkidle')
    // await page.screenshot({ path: './ss.png' })

    // Expects page to have a heading with the name of Installation.
    expect(await page.getByRole('heading', { name: 'Installation' }).isVisible()).toBe(true)
  })
})
