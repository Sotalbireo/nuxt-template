import type { Config } from 'tailwindcss'

export default {
  cssPath: '~/assets/tailwind.sass',
  content: [
    './src/components/**/*.{vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.ts',
    './src/app.vue',
    './src/error.vue',
  ],
  corePlugins: {
    preflight: false,
    size: true,
  },
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
  viewer: true,
} satisfies Config
