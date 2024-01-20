<script setup>
import { ref } from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/authStore";
import {AXIOS} from "@/Auth/adAuth";

const payload = ref({
  email: "",
  password: "",
});
const loading = ref(false);
const response = ref({
  status: "",
  message: "",
  class: "",
  display: false,
});

const router = useRouter();
const authStore = useAuthStore();

// eslint-disable-next-line no-unused-vars
const login = async () => {
  loading.value = true;
  response.value.display = false;
  response.value.class = "";

  try {
    const res = await AXIOS.post("auth/login_ad", payload.value, {
      headers: {
        "Content-Type": "application/json",
        Access: "application/json",
      },
    });
    authStore.loginUser({ token: res.data.access_token });
    router.replace("/inicio");
  } catch (error) {
    loading.value = false;
    if (error.response) {
      const errorResponse = error.response.status;
      switch (errorResponse) {
        case 401:
          response.value.display = true;
          response.value.status = "Erro:";
          response.value.message = "Usuário ou senha incorretos.";
          response.value.class = "trigger";
          break;
        case 500:
          break;
      }
    }
    response.value.display = true;
    response.value.status = "Erro:";
    response.value.message = "Erro interno, tente novamente mais tarde.";
    response.value.class = "";
  }
};

const showTooltip = ref(false);

const showPassword = ref(false);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

</script>

<template>
  <div class="flex justify-center items-center ">
    <div class="bg-white shadow-md rounded px-12 pt-8 pb-8">
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
        <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" style="background-image: linear-gradient(to right, #FFB600, #F93822);" type="button" @click="login">
          Entrar
        </button>
      </div>
    </div>
  </div>
</template>



<style scoped>

</style>