<template>
  <div class="w-full bg-amber-300 flex flex-col">
    <div class="flex justify-start items-start">
      <h1 class="text-3xl font-semibold">Histórico</h1>
    </div>
    <div>
      <ul>
        <li v-for="query in searchStore.searchHistory" :key="query">{{ query }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from '@/stores/searchStore';

const searchStore = useSearchStore();

</script>

<style lang="scss" scoped>
</style>
