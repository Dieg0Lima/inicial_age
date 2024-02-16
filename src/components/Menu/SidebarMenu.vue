<template>
  <div class="w-20 bg-white text-white h-screen with-right-border flex flex-col">
    <div class="bg-white border-b p-5">
      <img src="@/assets/icons/AgeLogo.svg" alt="">
    </div>
    <nav class="mt-4 mb-auto">
      <ul class="text-center">
<!--        <li class="mb-4">-->
<!--          <router-link to="/inicio" class="text-gray-900 hover:bg-gray-200 p-4 block">-->
<!--            <font-awesome-icon :icon="['fas', 'home']" />-->
<!--          </router-link>-->
<!--        </li>-->
        <li class="mb-4">
          <router-link to="/atendimento/inicio" class="text-gray-900 hover:bg-gray-200 p-4 block">
            <font-awesome-icon :icon="['fas', 'headset']" />
          </router-link>
        </li>
<!--        <li class="mb-4">-->
<!--          <router-link to="/relatorio/inicio" class="text-gray-900 hover:bg-gray-200 p-4 block">-->
<!--            <font-awesome-icon :icon="['fas', 'paste']" />-->
<!--          </router-link>-->
<!--        </li>-->
      </ul>
    </nav>
    <nav>
      <ul class="text-center">
        <li class="mb-4">
          <router-link to="/login" class="text-gray-900 hover:bg-gray-200 p-4 block">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
</script>

<style scoped>
.with-right-border {
  border-right: 2px solid #e1e1e1;
}

.border-b {
  border-bottom: 2px solid #e1e1e1;
}

.nav li {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
