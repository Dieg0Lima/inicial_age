<template>
  <div
    class="w-16 bg-white text-white rounded-2xl h-full with-right-border flex flex-col"
  >
    <div class="flex justify-center items-center p-4 mb-10">
      <LogoAge class="w-full" />
    </div>
    <nav class="flex flex-col items-center mb-auto">
      <div class="items w-full">
        <router-link
          class="cursor-pointer relative"
          to="/inicio"
          :class="{ selected: isSelected('/inicio') }"
        >
          <div class="icon-wrapper">
            <div class="flex justify-center items-center">
              <HomeIcon class="w-8" />
            </div>
            <div
              class="selected-bar"
              v-if="isSelected('/inicio')"
              :class="{ 'show-bar': isSelected('/inicio') }"
            ></div>
          </div>
        </router-link>
      </div>

      <div class="items w-full">
        <router-link
          class="cursor-pointer relative"
          to="/atendimento/inicio"
          :class="{ selected: isSelected('/atendimento') }"
        >
          <div class="icon-wrapper">
            <div class="flex justify-center items-center">
              <SearchIcon class="w-8" />
            </div>
            <div
              class="selected-bar"
              v-if="isSelected('/atendimento')"
              :class="{ 'show-bar': isSelected('/atendimento') }"
            ></div>
          </div>
        </router-link>
      </div>
      <div class="items w-full">
        <router-link
          class="cursor-pointer relative"
          to="/solicitacoes/inicio"
          :class="{ selected: isSelected('/solicitacoes') }"
        >
          <div class="icon-wrapper">
            <div class="flex justify-center items-center">
              <ClipboardIcon class="w-5" />
            </div>
            <div
              class="selected-bar"
              v-if="isSelected('/solicitacoes')"
              :class="{ 'show-bar': isSelected('/solicitacoes') }"
            ></div>
          </div>
        </router-link>
      </div>
      <div class="items w-full">
        <router-link
          class="cursor-pointer relative"
          to="/native"
          :class="{ selected: isSelected('/native') }"
        >
          <div class="icon-wrapper">
            <div class="flex justify-center items-center">
              <NativeIcon class="w-8" />
            </div>
            <div
              class="selected-bar"
              v-if="isSelected('/native')"
              :class="{ 'show-bar': isSelected('/native') }"
            ></div>
          </div>
        </router-link>
      </div>
    </nav>
    <div>
      <div class="cursor-pointer text-black" @click="logout">
        <div class="flex justify-center items-center">
          <LogoutIcon class="w-6 mb-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import LogoAge from "@/assets/logos/logoAge.vue";
import HomeIcon from "@/assets/icons/homeLogo.vue";
import SearchIcon from "@/assets/icons/searchClient.vue";
import LogoutIcon from "@/assets/icons/logoutIcon.vue";
import { useAuthStore } from "@/stores/authStore";
import ClipboardIcon from "@/assets/icons/ClipboardIcon.vue"
import NativeIcon from "@/assets/icons/native/nativeIcon.vue"

const route = useRoute();
const authStore = useAuthStore();

const isSelected = (path) => {
  const isCurrentRoute = route.path === path || route.path.startsWith(path);
  return isCurrentRoute;
};

const logout = () => {
  authStore.logout();
};
</script>

<style lang="scss" scoped>
.bg {
  background-color: $background-color;
}

nav .items {
  margin-bottom: 40px;
}

.icon-wrapper {
  position: relative;
}

.selected-bar {
  position: absolute;
  top: 0;
  border-radius: 5px 0 0 5px;
  left: 95%;
  width: 0px;
  height: 100%;
  background-color: $primary-color;
}

.show-bar {
  width: 4px;
}
</style>
