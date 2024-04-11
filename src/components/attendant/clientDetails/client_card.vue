<template>
  <div class="bg-white border-solid border-2 border-slate-200 rounded-xl p-2">
    <!-- <div
      class="w-full flex flex-row items-center space-x-4 bg-age-colorOrange rounded-xl"
    >
      <div class="mb-[-50px]"><userIlustration class="p-2" /></div>
      <div class="font-bold text-white text-xl">Dados do cliente</div>
    </div>
    <div class="w-full pt-[50px]" style="user-select: text;">
      <div class="p-4 space-y-4">
        <div class="flex flex-col space-y-2 text-sm">
          <div class="flex flex-col">
            <div class="font-bold">
              {{ props.client.name || "Sem nome cadastrado"}}
            </div>
            <div class="space-x-2">
              <span>{{ props.client.cell_phone_1 || "Sem telefone cadastrado"}}</span>
              <span>|</span>
              <span>{{ formattedTxId || "Sem CPF/CNPJ cadastrado"}}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col text-sm">
          <span class="font-semibold">Bairro</span>
          <span> {{ props.client.neighborhood || "Sem endereço cadastrado"}} </span>
        </div>
        <div class="flex flex-row space-x-6 justify-between text-sm">
          <div class="flex flex-col">
            <span class="font-semibold">Endereço</span>
            <span> {{ props.client.street || "Sem bairro cadastrado"}} </span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">Número</span>
            <span> {{ props.client.number || "Sem número cadastrado"}} </span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">CEP</span>
            <span> {{ props.client.postal_code || "Sem CEP cadastrado"}} </span>
          </div>
        </div>
        <div class="flex flex-col text-sm">
          <span class="font-semibold">Complemento</span>
          <span> {{ props.client.address_complement || "Sem complemento cadastrado"}} </span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const client = ref(null);

onMounted(() => {
  openIndexedDB()
    .then((db) => {
      const transaction = db.transaction(["clientDetails"], "readonly");
      const objectStore = transaction.objectStore("clientDetails");

      const request = objectStore.get(props.clientId);

      request.onsuccess = (event) => {
        const clientData = event.target.result;
        client.value = clientData.data;
      };

      request.onerror = (event) => {
        console.error("Erro ao obter dados do cliente:", event.target.error);
      };
    })
    .catch((error) => {
      console.error("Erro ao abrir IndexedDB:", error);
    });
});

function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ageAtendeDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("clientDetails", { keyPath: "id" });
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}
</script>

<style lang="scss" scoped></style>
