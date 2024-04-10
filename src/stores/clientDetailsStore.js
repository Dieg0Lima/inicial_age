import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";
import { useAuthStore } from "@/stores/authStore";

export const useClientDetailsStore = defineStore("clientDetailsStore", {
  state: () => ({
    loading: false,
    responseMessage: "",
    results: [],
    error: null,
  }),
  actions: {
    async fetchDetails(clientId) {
      this.loading = true;
      this.responseMessage = "";
      this.error = null;
      const authStore = useAuthStore();
      authStore.loadToken();

      try {
        const token = authStore.token;
        if (!token) {
          this.error = new Error("Token não encontrado");
          throw this.error;
        }
        const response = await axiosInstance.get(
          `/api/v1/connection_details?id=${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.results = [response.data];
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
