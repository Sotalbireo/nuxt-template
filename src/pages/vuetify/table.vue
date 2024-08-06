<script lang="ts" setup>
import type { Endpoints } from '@octokit/types'
import type { ComponentProps } from 'vue-component-type-helpers'
import { VDataTable } from 'vuetify/components'

definePageMeta({
  layout: 'vuetify',
})

type ListPublicRepositories = Endpoints['GET /repositories']

const headers: ComponentProps<typeof VDataTable>['headers'] = [
  { key: 'full_name', title: 'Name' },
  { key: 'owner_name', title: 'Owner' },
  { key: 'url', title: 'Url' },
]

const { data: items, status } = await useAsyncData('listPublicRepositories', () => $fetch<ListPublicRepositories['response']['data']>('https://api.github.com/repositories', {
  headers: {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
}), {
  transform: res => res.map(d => ({
    full_name: d.full_name,
    owner_name: d.owner.login,
    url: d.html_url,
  })) ?? [],
})
</script>

<template>
<VDataTable
  :headers
  :items="(items as any)"
  :loading="status === 'pending'"
/>
</template>
