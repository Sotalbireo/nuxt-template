<script lang="ts" setup>

</script>

<template>
<header
  class="flex h-12 w-screen items-center justify-between border-b bg-gray-400 ps-5"
>
  Application bar
</header>

<div class="mb-0 grid size-full min-h-full grid-cols-[256px_1fr] grid-rows-[1fr_56px]">
  <div
    style="grid-area: 1/1/6/2"
    class="bg-slate-300"
  >
    nav
  </div>
  <div
    style="grid-area: 1/2/2/4"
    class="bg-blue-50"
  >
    body
  </div>
  <footer
    style="grid-area: 2/2/2/4"
    class="bg-gray-500 py-4 ps-8"
  >
    footer
  </footer>
</div>
</template>
