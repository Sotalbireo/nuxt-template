<script lang="ts" setup>
import { VEmptyState } from 'vuetify/components/VEmptyState'

import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'vuetify',
})

const el = ref<HTMLDivElement>()
const parent = useParentElement()

tryOnMounted(() => {
  parent.value!.style.height = '100%'
  el.value!.style.visibility = 'visible'
})

tryOnUnmounted(() => {
  parent.value!.style.height = ''
})
</script>

<template>
<VEmptyState
  ref="el"
  headline="What's happened?"
  icon="$vuetify"
  style="visibility: 'hidden'"
  title="nanik[A] atta"
/>
</template>
