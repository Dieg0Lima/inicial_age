import axiosInstance from "@/api/axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useClientProvisionStore = defineStore("clientProvisionStore", {
  state: () => ({
    equipment: "",
    ceo: "",
    selectedOltId: null,
    provisionResponse: null,
    error: null,
  }),
  actions: {
    setEquipment(value) {
      this.equipment = value;
    },
    setCeo(value) {
      this.cto = value;
    },
    setSelectedOlt(oltId) {
      this.selectedOltId = oltId;
    },

    async submitProvision(provisionData) {
      const toast = useToast();
      try {
        const requestData = {
          sernum: provisionData.equipment || this.equipment,
          cto: provisionData.cto || this.cto,
          olt_id: provisionData.oltId,
          contract: provisionData.contract,
          connection_id: provisionData.connection_id,
        };

        const response = await axiosInstance.post(
          "/api/v1/provision/provision_onu",
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
