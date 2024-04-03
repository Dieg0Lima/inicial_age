<script setup>
import loginForm from "@/components/login/loginForm.vue"
import sliderComponent from "@/components/login/sliderComponent.vue"

</script>

<template>
  <div class="bg h-screen w-screen relative flex items-center justify-center">
    <div class="h-5/6 w-8/12 flex columns-2">
      <div class="bg-white h-full w-1/2 flex justify-center items-center rounded-l-3xl">
        <sliderComponent></sliderComponent>
      </div>
      <div class="bg-white h-full w-1/2 flex justify-center items-center rounded-r-3xl">
        <loginForm></loginForm>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .bg {
    background-color: $background-color;
  }

</style>

