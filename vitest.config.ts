import { defineVitestConfig } from '@nuxt/test-utils/config'

/**
 * @see https://nuxt.com/docs/getting-started/testing
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
  },
})
