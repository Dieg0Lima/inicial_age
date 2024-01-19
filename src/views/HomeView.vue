<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { AXIOS } from "@/Auth/adAuth.js";
import GridComponent from "@/components/Home/GridComponent.vue";
import LoginComponent from "@/components/Home/LoginComponent.vue";

export default {
  name: "GridSystem",
  components: {LoginComponent, GridComponent},
  setup() {
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

    return {
      payload,
      loading,
      response,
      login,
    };
  },
};
</script>

<template>
  <div class="container-page p-8 relative flex items-center justify-center">
    <!-- Background com Efeito Blur -->
    <div class="absolute inset-0 bg-background-img bg-cover bg-center blur-2xl"></div>

    <!-- Seus componentes principais -->
    <div style="z-index: 1; display: flex; justify-content: center; align-content: center; flex-direction: row; height: 60vh; gap: 4rem">
      <grid-component></grid-component>
      <login-component></login-component>
    </div>
  </div>
</template>

<style>
.container-page {
  background: #e2e2e2;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 5rem;
  animation: fadeIn 0.5s ease forwards;
  position: relative;
  overflow: hidden; /* Isso garante que o fundo não exceda o container */
}

/* Classe personalizada para o background */
.bg-background-img {
  background-image: url("@/assets/AgeBackground.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

img {
  max-width: 12vw;
  max-height: 12vh;
  object-fit: contain;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

