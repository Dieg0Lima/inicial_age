<template>
  <div>
    <div
      class="w-full h-screen bg-ellipse bg-white flex flex-col overflow-hidden"
    >
      <nav
        class="flex flex-row items-center justify-between p-4 w-full"
        style="height: 5%; position: relative"
      >
        <div class="space-x-8 pl-8">
          <router-link
            class="cursor-pointer relative font-semibold"
            :to="`/atendimento/detalhes/${clientId}`"
            :class="{ selected: isSelected('/atendimento/detalhes/') }"
          >
            Informação geral
            <div
              class="selected-bar"
              v-if="isSelected('/atendimento/detalhes/')"
              :class="{ 'show-bar': isSelected('/atendimento/detalhes/') }"
            ></div>
          </router-link>

          <router-link
            class="cursor-pointer relative font-semibold"
            :to="`/atendimento/acoes/${clientId}`"
            :class="{ selected: isSelected('/atendimento/acoes/') }"
          >
            Menu de ações
            <div
              class="selected-bar"
              v-if="isSelected('/atendimento/acoes/')"
              :class="{ 'show-bar': isSelected('/atendimento/acoes/') }"
            ></div>
          </router-link>
        </div>
        <div class="pr-8">
          <router-link
            class="cursor-pointer relative px-6 py-2 bg-age-colorOrange rounded-xl text-white font-bold text-sm hover:bg-age-colorLightOrangeHover"
            :to="`/atendimento/inicio`"
          >
            Voltar
          </router-link>
        </div>
      </nav>

      <div class="flex-grow gap-2 flex p-2" style="height: 90%">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

const isSelected = (path) => {
  const isCurrentRoute = route.path === path || route.path.startsWith(path);
  return isCurrentRoute;
};

const clientId = route.params.id;
</script>

<style lang="scss" scoped>
.bg-ellipse {
  background-image: url("/src/assets/ellipses/Ellipse-3.png");
  background-position: center;
  background-size: cover;
}
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  width: 100%;
  height: 5%;
  position: relative;
}

.router-link {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px;
  color: #666;
  font-weight: 400;
  transition: color 0.3s ease, font-weight 0.3s ease;
}

.selected {
  font-weight: 700;
  color: $primary-color;
}

.selected-bar {
  position: absolute;
  bottom: -14px;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: $primary-color;
  border-radius: 5px 5px 0 0;
  transition: width 0.3s ease;
}

.show-bar {
  width: 100%;
}
</style>
