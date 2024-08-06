<script lang="ts" setup>
import type { ComponentProps } from 'vue-component-type-helpers'
import { VAlert, VSnackbar } from 'vuetify/components'

export interface Props {
  text: string
  title?: string
  type: NonNullable<ComponentProps<typeof VAlert>['type']>
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
})

const title = computed(() => {
  if (props.title) return props.title
  switch (props.type) {
    case 'error':
      return 'エラー'
    case 'info':
    case 'success':
      return '情報'
    case 'warning':
      return '警告'
    default:
    {
      const _unreachable: never = props.type
      return ''
    }
  }
})

const model = defineModel<boolean>({ required: true })
</script>

<template>
<VSnackbar
  v-model="model"
  :close-on-back="false"
  disabled
  position="fixed"
  style="--v-layout-bottom:36px"
  :timeout="-1"
  variant="plain"
  width="100%"
>
  <VAlert
    border="start"
    class="[&_.v-alert\_\_content]:break-words"
    closable
    density="compact"
    :elevation="4"
    height="auto"
    :rounded="4"
    :text
    :title
    :type
    variant="elevated"
    @click:close="model = false"
  />
</VSnackbar>
</template>
