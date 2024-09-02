import { defineVitestConfig } from '@nuxt/test-utils/config'

/**
 * @see https://nuxt.com/docs/getting-started/testing
 * @see https://vitest.dev/config/
 */
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    reporters: [
      'basic',
      'html',
    ],
    outputFile: {
      html: '../tests/result/index.html',
    },
    testTimeout: 60_000,
  },
})
