<script setup>
import SidebarMenu from "@/components/Menu/SidebarMenu.vue";
</script>

<template>
  <div class="w-screen h-screen flex bg overflow-hidden bg-ellipse">
    <SidebarMenu class="w-20"></SidebarMenu>
    <router-view class="w-full overflow-scroll scroll-smooth"></router-view>
  </div>
</template>

<style lang="scss">
.bg {
  background-color: $background-color;
}

.bg-ellipse {
  background-color: #fdf6f2;
}
</style>
