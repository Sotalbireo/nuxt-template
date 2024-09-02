import { createPage, setup, url } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('sample', async () => {
  await setup({
    browser: true,
    nuxtConfig: {
      sourcemap: false,
    },
  })

  it('test', async () => {
    const page = await createPage()
    await page.goto(url('/'), { waitUntil: 'hydration' })
    expect(await page.getByRole('heading').innerHTML()).toBe('Nuxt Routing set up successfully!')
  })
})
