<script lang="ts" setup>
export interface Props {
  actions: Array<{ click: (ev?: MouseEvent) => void, label: string }>
  align: 'start' | 'end'
  fluid: boolean
}

const props = withDefaults(defineProps<Props>(), {
  align: 'start',
  fluid: false,
})
</script>

<template>
<div
  :class="[
    fluid ? 'grid justify-items-stretch' : 'ml-24 flex *:basis-44',
    fluid ? (props.actions.length > 1 ? 'grid-cols-2' : 'grid-cols-1') : '',
    props.align === 'start' ? 'justify-start' : 'justify-end',
    'min-h-12 gap-x-2 gap-y-6 px-2 py-4',
  ]"
>
  <button
    v-for="act in $props.actions"
    :key="act.label"
    class="h-10 rounded border border-solid border-black text-sm/none uppercase hover:bg-gray-500/5 active:bg-gray-500/30"
    @click.stop="act.click"
  >
    {{ act.label }}
  </button>
</div>
</template>
