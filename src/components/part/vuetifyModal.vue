<script lang="ts" setup>
import { breakpointsVuetifyV3 } from '@vueuse/core'
import type { ComponentProps } from 'vue-component-type-helpers'
import { VCard, VCardActions, VCardText, VDialog, VDivider } from 'vuetify/components'

import { LayoutButtonGroup } from '#components'

export interface Props {
  actions: ComponentProps<typeof LayoutButtonGroup>['actions']
  fluid: boolean
  settings?: ComponentProps<typeof VDialog>
  title: string
}

defineProps<Props>()

const model = defineModel<boolean>({ required: true })
</script>

<template>
<VDialog
  v-bind="$props.settings"
  v-model="model"
  :close-on-back="false"
  :max-width="breakpointsVuetifyV3.lg"
>
  <VCard
    class="overscroll-contain"
    :elevation="4"
    :title="$props.title"
  >
    <VDivider
      class="mx-4"
      :tickness="2"
    />
    <VCardText>
      <slot />
    </VCardText>
    <VCardActions
      v-if="$slots.footer || $props.actions.length"
      class="block"
    >
      <slot name="footer">
        <LayoutButtonGroup
          :actions="$props.actions"
          align="end"
          :fluid="$props.fluid"
        />
      </slot>
    </VCardActions>
  </VCard>
</VDialog>
</template>
