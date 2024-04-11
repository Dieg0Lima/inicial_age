import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";
import { useAuthStore } from "@/stores/authStore";

function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ageAtendeDB", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      db.createObjectStore("clientDetails", { keyPath: "id" });
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export const useClientDetailsStore = defineStore("clientDetailsStore", {
  state: () => ({
    loading: false,
    responseMessage: "",
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
          this.error = "Token não encontrado";
          this.responseMessage = "Falha de autenticação: token ausente.";
          throw new Error(this.error);
        }

        const response = await axiosInstance.get(
          `/api/v1/connection_details?id=${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { client, contract, connection, financial, assignment } =
          response.data;

        const db = await openIndexedDB();

        const transaction = db.transaction(["clientDetails"], "readwrite");
        const objectStore = transaction.objectStore("clientDetails");

        const putClient = objectStore.put({
          id: clientId,
          data: client,
        });
        const putContract = objectStore.put({
          id: `${clientId}_contract`,
          data: contract,
        });
        const putConnection = objectStore.put({
          id: `${clientId}_connection`,
          data: connection,
        });
        const putFinancial = objectStore.put({
          id: `${clientId}_financial`,
          data: financial,
        });
        const putAssignment = objectStore.put({
          id: `${clientId}_assignment`,
          data: assignment,
        });

        Promise.all([
          putClient,
          putContract,
          putConnection,
          putFinancial,
          putAssignment,
        ])
          .then(() => {
            console.log("Dados do cliente gravados no IndexedDB com sucesso.");
          })
          .catch((error) => {
            console.error(
              "Erro ao gravar dados do cliente no IndexedDB:",
              error
            );
          });

        transaction.oncomplete = function () {
          console.log("Transação concluída.");
        };
      } catch (error) {
        this.error = error;
        this.responseMessage = "Erro ao carregar detalhes: " + error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
