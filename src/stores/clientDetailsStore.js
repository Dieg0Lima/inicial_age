import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";
import { useAuthStore } from "@/stores/authStore";

export const useClientDetailsStore = defineStore("clientDetailsStore", {
  state: () => ({
    loading: false,
    responseMessage: "",
    client: null,
    connection: null,
    contract: null,
    app: null,
    financial: null,
    assignment: null,
    error: null,
  }),
  actions: {
    async fetchDetails(clientId) {
      this.loading = true;
      const authStore = useAuthStore();
      const token = authStore.token;

      if (!token) {
        this.error = "Token não encontrado";
        this.loading = false;
        return;
      }

      try {
        const response = await axiosInstance.get(`/api/v1/connection_details?id=${clientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { client, connection, contract, app, financial, assignment } = response.data;
        this.client = client;
        this.connection = connection;
        this.contract = contract;
        this.app = app;
        this.financial = financial;
        this.assignment = assignment.assignments; 
        this.totalAssignmentsCount = assignment.total_assignments_count; 
        this.recentAssignmentsCount = assignment.recent_assignments_count; 
        this.responseMessage = "Dados carregados com sucesso!";
        this.error = null;
      } catch (error) {
        this.responseMessage = "";
        this.error = "Falha ao carregar dados: " + error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
