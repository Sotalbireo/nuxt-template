import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import { PageVuetifySnackbar } from '#components'

it('sample test', async () => {
  const props = {
    modelValue: true,
    type: 'info',
    text: 'sample',
  } as const

  const component = await mountSuspended(PageVuetifySnackbar, { props })
  expect(component.text()).toMatchInlineSnapshot(`"情報sample"`)

  await component.setProps({ ...props, type: 'error' })
  expect(component.text()).toMatchInlineSnapshot('"エラーsample"')
})
