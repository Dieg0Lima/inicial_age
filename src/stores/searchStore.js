import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "vue-toastification";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    loading: false,
    responseMessage: "",
    searchHistory: JSON.parse(localStorage.getItem("searchHistory") || "[]"),
    results: [],
  }),
  actions: {
    async search(payload) {
      const toast = useToast();
      this.loading = true;
      this.responseMessage = "";
      const authStore = useAuthStore();

      authStore.loadToken();

      try {
        const token = authStore.token;
        if (!token) {
          throw new Error("Token não encontrado");
        }
        const response = await axiosInstance.get(
          `/api/v1/search_clients?value=${encodeURIComponent(payload.value)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.results = response.data.results;
        this.loading = false;

        this.updateSearchHistory(payload.query);
      } catch (error) {
        this.loading = false;
        let errorMessage =
          "Falha ao realizar a busca. Tente novamente mais tarde.";
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
    updateSearchHistory(query) {
      this.searchHistory = [
        query,
        ...this.searchHistory.filter((q) => q !== query),
      ].slice(0, 10);
      localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
    },
  },
});
