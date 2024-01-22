<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
// import {storeToRefs} from "pinia";

const payload = ref({
  email: "",
  password: "",
});

const authStore = useAuthStore();

const login = () => {
  authStore.login(payload.value);
};

// const { loading, responseMessage } = storeToRefs(authStore);

const showTooltip = ref(false);

const showPassword = ref(false);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

</script>

<template>
  <div class="flex justify-center items-center ">
    <form @submit.prevent="login" class="bg-white shadow-md rounded px-12 pt-8 pb-8">
      <img src="@/assets/AgeLogo.svg" alt="AGE Telecom" class="mx-auto mb-6 w-1/3" />

      <div class="mb-4">
        <span class="block text-blue-900 text-2xl text-center font-bold mb-2">Bem-vindo à <b>AGE</b> Telecom</span>
        <span class="block text-blue-900 text-sm text-center">Acesse com seu perfil AGE Telecom</span>
      </div>

      <div class="mb-4 relative">
        <label class="block text-blue-900 text-sm font-bold mb-2 flex items-center" for="username">
          Usuário
          <div class="relative ml-2 flex items-center">
            <div :class="['absolute', 'z-10', 'bg-black', 'text-white', 'text-xs', 'py-1', 'px-2', { 'hidden': !showTooltip }, 'left-full', 'ml-2', 'whitespace-no-wrap']">
              O Usuário é o mesmo que você utiliza para acessar seu computador
            </div>
          </div>
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Digite seu usuário" v-model="payload.email" required>
      </div>

      <div class="mb-6 relative">
        <label class="block text-blue-900 text-sm font-bold mb-2" for="password">Senha</label>
        <div class="flex items-center">
          <input :type="showPassword ? 'text' : 'password'" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="Digite sua senha" v-model="payload.password" required>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" class="cursor-pointer text-red-500" @click="togglePasswordVisibility" />
          </div>
        </div>
        <p class="mt-4 font-bold text-xs text-gray-600 text-right">
          <a href="https://api.whatsapp.com/send?phone=5561920037326" target="_blank" class="hover:text-blue-800 transition-colors duration-200">Esqueceu a senha?</a>
        </p>
      </div>

      <div class="flex items-center justify-between">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" style="background-image: linear-gradient(to right, #FFB600, #F93822);">
          Entrar
        </button>
      </div>
    </form>
  </div>
</template>



<style scoped>

</style>