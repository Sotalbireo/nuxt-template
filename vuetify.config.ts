import { en, ja } from 'vuetify/locale'
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

/**
 * @see https://vuetify-nuxt-module.netlify.app/guide/
 */
export default defineVuetifyConfiguration({
  components: false,
  display: {
    mobileBreakpoint: 'md',
  },
  icons: {
    defaultSet: 'mdi',
  },
  locale: {
    fallback: 'en',
    locale: 'ja',
    messages: { en, ja },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      default: {
        variables: {
          'theme-overlay-multiplier': 1.5,
        },
      },
      light: {
        dark: false,
      },
    },
  },
})
