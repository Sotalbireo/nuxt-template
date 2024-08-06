import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
      },
    },
    rootId: 'app',
  },
  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2024-04-03',
  css: [
    '~/assets/vuetify.sass',
    '~/assets/tailwind.sass',
  ],
  devtools: { enabled: true },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  experimental: {
    crossOriginPrefetch: true,
    defaults: {
      useAsyncData: {
        deep: true,
        errorValue: 'null',
        value: 'undefined',
      },
    },
  },
  features: {
    inlineStyles: false,
  },
  imports: {
    dirs: ['~/composables', '~/utils', '~/composables/**'],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@vueuse/nuxt',
    'nuxt-typed-router',
    'vuetify-nuxt-module',
  ],
  nitro: {
    compressPublicAssets: true,
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss': {},
      'autoprefixer': {},
      'cssnano': {
        preset: 'cssnano-preset-advanced',
      },
    },
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  srcDir: 'src',
  typescript: {
    typeCheck: true,
  },
  vite: {
    css: {
      modules: {
        generateScopedName: '[local]_[xxhash64:contenthash:base62:6]',
      },
      preprocessorMaxWorkers: true,
      preprocessorOptions: {
        sass: {
          api: 'modern',
          quietDeps: true,
        },
      },
    },
  },
  vuetify: {
    moduleOptions: {
      importComposables: false,
      prefixComposables: true,
      ssrClientHints: {
        viewportSize: true,
      },
      styles: {
        configFile: 'assets/vuetify.config.scss',
      },
    },
    vuetifyOptions: './vuetify.config.ts',
  },
})
