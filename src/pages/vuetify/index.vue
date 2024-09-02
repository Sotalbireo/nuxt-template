<script lang="ts" setup>
import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core'

import { PartsVuetifyModal } from '#components'

definePageMeta({
  layout: 'vuetify',
})

const { snackbar } = useAppState()
const { smaller } = useBreakpoints(breakpointsVuetifyV3)

const modal = ref(false)

function openSnackbar() {
  snackbar.value = {
    show: true,
    text: 'Lorem ipsum '.repeat(10),
    type: 'success',
  }
}
</script>

<template>
<div class="flex flex-row gap-4">
  <NuxtLink to="/vuetify/table">
    link
  </NuxtLink>

  <button
    class="inline-block border border-solid border-black"
    @click="modal = true"
  >
    modal
  </button>

  <button
    class="inline-block border border-solid border-black"
    @click="openSnackbar"
  >
    snackbar
  </button>
</div>

<PartsVuetifyModal
  v-model="modal"
  :actions="[
    { click: () => modal = false, label: 'OK' },
    { click: () => modal = false, label: 'Cancel' },
  ]"
  :fluid="smaller('md').value"
  title="モーダル"
>
  test
</PartsVuetifyModal>
</template>
