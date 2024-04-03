<template>
  <div class="flex justify-center items-center flex-col">
    <div class="p-12">
      <AgeLogoFull class="w-64" />
    </div>
    <div class="w-5/12 h-14 p-2 rounded-full bg-white flex flex-row border-solid border-b-4 border-l-2 border-gray-200">
      <div class="w-1/12 flex justify-center items-center mr-2">
        <SearchIcon class="w-5/12" />
      </div>
      <div class="w-full h-full mr-4">
        <input
          class="w-full h-full text-lg outline-none"
          v-model="searchQuery"
          @keyup.enter="fetchContract"
          placeholder="Pressione Enter para realizer sua pesquisa"
          type="text"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import AgeLogoFull from "@/assets/logos/logoAgeFull.vue";
import SearchIcon from "@/assets/icons/searchClient/searchIcon.vue";
import { useSearchStore } from "@/stores/searchStore";
import { ref } from "vue";

const searchStore = useSearchStore();
const searchQuery = ref("");

const fetchContract = async () => {
  await searchStore.search({ value: searchQuery.value });
};
</script>

<style lang="scss" scoped>
</style>
