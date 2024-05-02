import axiosInstance from "@/api/axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useClientManagementStore = defineStore("clientManagementStore", {
  state: () => ({
    equipment: "",
    provisionResponse: null,
    error: null,
  }),
  actions: {
    async submitManagement(submissionData) {
      const toast = useToast();
      try {
        const requestData = {
          sernum: submissionData.sernum,
        };

        const response = await axiosInstance.post(
          "/api/v1/management/management_onu",
          requestData
        );

        if (response.status === 200) {
          if (response.data && response.data.success) {
            this.provisionResponse = response.data.message;
            this.error = null;
            toast.success(
              "Operação realizada com sucesso: " + this.provisionResponse
            );

            if (response.data.ip) {
              const url = `http://${response.data.ip}:8080`;
              window.open(url, "_blank");
            }
          } else {
            throw new Error("Erro no servidor: " + response.data.error);
          }
        } else {
          throw new Error(
            "Erro ao realizar o provisionamento: " + response.statusText
          );
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          this.error =
            "Falha ao realizar o provisionamento: " + error.response.data.error;
        } else {
          this.error = "Falha ao realizar o provisionamento: " + error.message;
        }
        console.error("Erro no provisionamento:", this.error);
        toast.error(this.error);
      }
    },
  },
});
