<template>
  <div class="w-screen h-screen bg-ellipse bg-white mb-8">
    <SearchComponent />
    <div class="w-full p-8">
      <ResultSearch :isLoading="isLoading" :error="error" />
    </div>
  </div>
</template>

<script setup>
import ResultSearch from "@/components/searchClient/ResultSearch.vue";
import SearchComponent from "@/components/searchClient/SearchComponent.vue";

</script>

<style lang="scss" scoped>
.bg-ellipse {
  background-image: url("/src/assets/ellipses/Ellipse-2.png");
  background-position: center;
  background-size: cover;
}
</style>
