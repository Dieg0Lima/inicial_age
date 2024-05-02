import axiosInstance from "@/api/axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useClientRebootStore = defineStore("clientRebootStore", {
  state: () => ({
    equipment: "",
    slot: "",
    pon: "",
    port: "",
    olt_id: "",
    provisionResponse: null,
    error: null,
  }),
  actions: {
    async submitReboot(submissionData) {
      const toast = useToast();
      try {
        const requestData = {
          sernum: submissionData.sernum,
          slot: submissionData.slot,
          pon: submissionData.pon,
          port: submissionData.port,
          olt_id: submissionData.olt_id,
        };

        const response = await axiosInstance.post(
          "/api/v1/reboot/reboot_onu",
          requestData
        );

        if (response.status === 200) {
          if (response.data && response.data.success) {
            this.provisionResponse = response.data.message;
            this.error = null;
            toast.success(
              "Operação realizada com sucesso: " + this.provisionResponse
            );
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
