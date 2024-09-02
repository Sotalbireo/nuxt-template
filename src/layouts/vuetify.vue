<script lang="ts" setup>
import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core'
import { VApp, VAppBar, VBtn, VFooter, VList, VListItem, VMain, VNavigationDrawer, VSpacer, VSpeedDial, VSystemBar } from 'vuetify/components'

import { PagesVuetifySnackbar } from '#components'

const { snackbar } = useAppState()
const { greaterOrEqual, isGreaterOrEqual } = useBreakpoints(breakpointsVuetifyV3)
const isPrint = useMediaQuery('print')

const nav = reactive({
  rail: greaterOrEqual('md'),
  show: isGreaterOrEqual('md'),
})

function reload() {
  window.location.reload()
}

function toggleMenu() {
  if (greaterOrEqual('md').value) {
    nav.rail = !nav.rail
  }
  else {
    nav.show = !nav.show
  }
}
</script>

<template>
<VApp
  full-height
>
  <DevOnly>
    <VSystemBar
      class="gap-x-2 *:rounded-none *:text-sm/none"
      :height="36"
      tile
    >
      <VBtn
        density="comfortable"
        icon="mdi-cog"
        readonly
        variant="text"
      />
      <span class="max-md:hidden">デバッグ用表示・コマンド</span>
      <ClientOnly>
        <VBtn
          density="comfortable"
          :icon="greaterOrEqual('md').value ? 'mdi-laptop' : 'mdi-cellphone'"
          readonly
          variant="text"
        />
      </ClientOnly>
      <VBtn
        aria-label="Refresh"
        density="comfortable"
        icon="mdi-cached"
        title="Refresh"
        variant="text"
        @click="reload"
      />
      <VSpeedDial
        location="bottom center"
        transition="fade-transition"
      >
        <template #activator="{ props: activatorProps }">
          <VBtn
            v-bind="activatorProps"
            density="comfortable"
            icon="mdi-account-settings"
            title="ユーザ切替"
            variant="text"
          />
        </template>
        <VBtn
          key="1"
          icon="mdi-account"
          title="ユーザ1"
        />
        <VBtn
          key="2"
          icon="mdi-account-tie"
          title="ユーザ2"
        />
      </VSpeedDial>
      <VSpacer />
      <span>route: {{ $route.name }}</span>
    </VSystemBar>
  </DevOnly>

  <VAppBar
    border
    flat
    :height="64"
    tile
  >
    <template #prepend>
      <VBtn
        icon="mdi-menu"
        :size="40"
        @click.stop="toggleMenu"
      />
      <div>
        業務アプリケーション デザインテンプレート
      </div>
    </template>
  </VAppBar>

  <VNavigationDrawer
    v-if="!isPrint"
    v-model="nav.show"
    absolute
    border
    disable-route-watcher
    mobile-breakpoint="md"
    :rail="nav.rail"
  >
    <VList
      density="compact"
      nav
    >
      <VListItem
        prepend-icon="mdi-circle"
        title="リンク"
        to="/vuetify"
      />
      <VListItem
        prepend-icon="mdi-table"
        title="テーブル例"
        to="/vuetify/table"
      />
      <VListItem
        prepend-icon="mdi-alert-circle-outline"
        title="エラーページ"
        to="/vuetify/error"
      />
    </VList>
  </VNavigationDrawer>

  <VMain>
    <div class="container-fluid relative min-h-full">
      <NuxtPage />
    </div>
  </VMain>

  <PagesVuetifySnackbar
    v-bind="snackbar"
    v-model="snackbar.show"
  />

  <VFooter
    absolute
    app
    border
    class="min-h-24"
  >
    Application footer
  </VFooter>
</Vapp>
</template>
