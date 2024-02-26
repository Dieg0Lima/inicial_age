<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import AgeLogo from "@/assets/icons/AgeLogo.vue";
import GLPIcon from "@/assets/icons/GLPIcon.vue";

const payload = ref({
  email: "",
  password: "",
});

const authStore = useAuthStore();

const login = () => {
  authStore.login(payload.value);
};

const showPassword = ref(false);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

</script>

<template>
  <div class="login-container h-50 bg-white shadow-md rounded-lg px-12 pt-8 pb-8 flex justify-center">
    <form @submit.prevent="login" class="bg-white flex flex-col justify-center items-center">

      <div class="w-40 mb-12 flex justify-center">
        <AgeLogo></AgeLogo>
      </div>

      <div class="mb-20 text-center">
        <span class="block text-blue-900 text-2xl font-bold mb-2">Bem-vindo à <b>AGE</b> Telecom</span>
        <span class="block text-blue-900 text-sm">Acesse com seu perfil AGE Telecom</span>
      </div>

      <div class="mb-4 relative">
        <label class="block text-blue-900 text-sm font-bold mb-1 flex items-center" for="username">
          Usuário
        </label>
        <input class="appearance-none border rounded w-96 h-12 py-2 px-3 font-medium leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Digite seu usuário" v-model="payload.email" required>
      </div>

      <div class="mb-6 relative">
        <label class="block text-blue-900 text-sm font-bold mb-2" for="password">Senha</label>
        <div class="flex items-center">
          <input :type="showPassword ? 'text' : 'password'" class="appearance-none border rounded w-96 h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="Digite sua senha" v-model="payload.password" required>
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" class="cursor-pointer text-red-500" @click="togglePasswordVisibility" />
          </div>
        </div>
        <p class="mt-4 font-bold text-xs text-gray-600 text-right">
          <a href="https://api.whatsapp.com/send?phone=5561920037326" target="_blank" class="hover:text-blue-800 transition-colors duration-200">Esqueceu a senha?</a>
        </p>
      </div>

      <div class="flex items-center justify-between m-4">
        <button type="submit" class="text-white font-bold w-96 h-14 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" style="background-image: linear-gradient(to right, #FFB600 -20%, #F93822 180%);">
          Entrar
        </button>
      </div>

      <div class="flex items-center justify-between">
        <button type="submit" class="text-white font-bold w-96 h-14 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center" style="background-color: #60BCFF;">
          <div class="flex items-center justify-center space-x-1"> <!-- Adiciona espaçamento entre ícone e texto se necessário -->
            <GLPIcon class="h-12 w-12"></GLPIcon> <!-- Certifique-se de que seu ícone SVG tenha classes para definir o tamanho se necessário -->
            <span>Abrir chamado</span>
          </div>
        </button>
      </div>

    </form>
  </div>


  <!--  <div class="flex justify-center items-center ">-->
  <!--    <form @submit.prevent="login" class="bg-white shadow-md rounded px-12 pt-8 pb-8">-->
  <!--      <img src="@/assets/AgeLogo.svg" alt="AGE Telecom" class="mx-auto mb-6 w-1/3" />-->

  <!--      <div class="mb-4">-->
  <!--        <span class="block text-blue-900 text-2xl text-center font-bold mb-2">Bem-vindo à <b>AGE</b> Telecom</span>-->
  <!--        <span class="block text-blue-900 text-sm text-center">Acesse com seu perfil AGE Telecom</span>-->
  <!--      </div>-->

<!--        <div class="mb-4 relative">-->
<!--          <label class="block text-blue-900 text-sm font-bold mb-2 flex items-center" for="username">-->
<!--            Usuário-->
<!--            <div class="relative ml-2 flex items-center">-->
<!--              <div :class="['absolute', 'z-10', 'bg-black', 'text-white', 'text-xs', 'py-1', 'px-2', { 'hidden': !showTooltip }, 'left-full', 'ml-2', 'whitespace-no-wrap']">-->
<!--                O Usuário é o mesmo que você utiliza para acessar seu computador-->
<!--              </div>-->
<!--            </div>-->
<!--          </label>-->
<!--          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Digite seu usuário" v-model="payload.email" required>-->
<!--        </div>-->

<!--        <div class="mb-6 relative">-->
<!--          <label class="block text-blue-900 text-sm font-bold mb-2" for="password">Senha</label>-->
<!--          <div class="flex items-center">-->
<!--            <input :type="showPassword ? 'text' : 'password'" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="Digite sua senha" v-model="payload.password" required>-->
<!--            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">-->
<!--              <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" class="cursor-pointer text-red-500" @click="togglePasswordVisibility" />-->
<!--            </div>-->
<!--          </div>-->
<!--          <p class="mt-4 font-bold text-xs text-gray-600 text-right">-->
<!--            <a href="https://api.whatsapp.com/send?phone=5561920037326" target="_blank" class="hover:text-blue-800 transition-colors duration-200">Esqueceu a senha?</a>-->
<!--          </p>-->
<!--        </div>-->

<!--        <div class="flex items-center justify-between">-->
<!--          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" style="background-image: linear-gradient(to right, #FFB600, #F93822);">-->
<!--            Entrar-->
<!--          </button>-->
<!--        </div>-->
  <!--    </form>-->
  <!--  </div>-->
</template>


<style scoped>
.login-container {
  width: 25vw;
}
</style>