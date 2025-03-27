<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="flex p-4 w-full justify-between items-center">
    <img class="w-16 h-auto" src="/logos/fleo-logo.svg" alt="logo de Fléo Web" />
    <h2 class="font-bold text-lg">LoremByFLEO</h2>
  </header>
  <main class="h-[90vh] flex flex-col items-center justify-center">
    <RouterView />
  </main>
</template>
<style scoped></style>
