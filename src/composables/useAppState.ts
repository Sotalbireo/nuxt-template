import type { ComponentProps } from 'vue-component-type-helpers'

import type { PageVuetifySnackbar } from '#components'

export const useAppState = () => {
  const state = useState<{
    snackbar: {
      show: boolean
      text: string
      title?: string
      type: ComponentProps<typeof PageVuetifySnackbar>['type']
    }
  }>('AppState', () => ({
    snackbar: {
      show: false,
      text: '',
      title: undefined,
      type: 'info',
    },
  }))

  const snackbar = computed({
    get: () => state.value.snackbar,
    set: v => state.value.snackbar = v,
  })

  return {
    snackbar,
  }
}
