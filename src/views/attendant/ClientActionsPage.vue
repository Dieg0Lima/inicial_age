<template>
  <div class="p-8 w-full h-full flex flex-col justify-between">
    <div class="flex flex-col space-y-8">
      <div class="">
        <h1 class="font-bold text-3xl">Menu de Ações</h1>
      </div>
      <div class="">
        <h4 class="w-3/12 text-2xl">
          Nesta janela, você deve determinar as ações a serem tomadas com o
          cliente escolhido.
        </h4>
      </div>
    </div>
    <div class="w-full">
      <ActionsButtons />
    </div>
  </div>
</template>

<script setup>
import ActionsButtons from "@/components/attendant/clientActions/actions_buttons.vue";
</script>

<style lang="scss" scoped></style>
