import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import type { ComponentProps } from 'vue-component-type-helpers'

import { PagesVuetifySnackbar } from '#components'

it('sample test', async () => {
  const props = {
    modelValue: true,
    type: 'info',
    text: 'sample',
  } as ComponentProps<typeof PagesVuetifySnackbar>

  const component = await mountSuspended(PagesVuetifySnackbar, { props })
  expect(component.text()).toMatchInlineSnapshot(`"情報sample"`)

  await component.setProps({ ...props, type: 'error' })
  expect(component.text()).toMatchInlineSnapshot('"エラーsample"')
})
