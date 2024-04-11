import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";
import { useToast } from "vue-toastification";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    token: null,
    loading: false,
    responseMessage: "",
  }),
  actions: {
    async login(payload) {
      const toast = useToast();
      this.loading = true;
      this.responseMessage = "";

      try {
        await delay(1000);
        const response = await axios.post(
          "http://192.168.1.30:3000/signin/login",
          payload
        );
        this.token = response.data.token;
        this.loading = false;
        toast.success("Login bem-sucedido!");
        router.push("/inicio");
        this.saveToken(response.data.token);
      } catch (error) {
        this.loading = false;
        let errorMessage = "Falha ao fazer login. Tente novamente mais tarde.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        }
        this.responseMessage = errorMessage;
        toast.error(errorMessage);
      }
    },

    saveToken(token) {
      localStorage.setItem("auth_token", token);
      this.token = token;
    },

    loadToken() {
      const token = localStorage.getItem("auth_token");
      if (token) {
        this.token = token;
      }
    },
    logout() {
      localStorage.removeItem("auth_token");
      this.token = null;
      router.push("/login");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
