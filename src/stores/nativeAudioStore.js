import axiosInstance from "@/api/axios";
import { defineStore } from "pinia";

export const useNativeAudioStore = defineStore("audioNativeStore", {
  state: () => ({
    start: "",
    continuation_token: "",
    provisionResponse: [],
    error: null,
  }),
  actions: {
    async nativeAudio(submissionData) {
      try {
        const params = {
          start: submissionData.start,
          src: submissionData.src,
          dst: submissionData.dst,
        };

        const response = await axiosInstance.get("/api/v1/native_bkps/search", {
          params,
        });

        if (response.status === 200) {
          if (response.data && response.data.files) {
            this.provisionResponse = response.data.files;
            this.error = null;
          } else {
            throw new Error("Erro no servidor: " + response.data.error);
          }
        } else {
          throw new Error(
            "Erro ao realizar a operação: " + response.statusText
          );
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          this.error =
            "Falha ao realizar a operação: " + error.response.data.error;
        } else {
          this.error = "Falha ao realizar a operação: " + error.message;
        }
        console.error("Erro na operação:", this.error);
      }
    },
  },
});
