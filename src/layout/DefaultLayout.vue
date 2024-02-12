<script setup>
import SidebarMenu from "@/components/Menu/SidebarMenu.vue";

</script>

<template>
  <div class="w-screen h-screen flex">
    <SidebarMenu class="w-20"></SidebarMenu>
    <router-view class="w-80"></router-view>
  </div>
</template>
