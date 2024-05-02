<template>
  <div>
    <div v-if="searchStore.loading" class="flex justify-center items-center">
      <img src="@/assets/loadings/paperPlane.gif" alt="" />
    </div>
    <div
      v-else-if="hasResults"
      class="space-y-4 bg-white p-4 border-solid border-2 border-gray-100 rounded-2xl"
    >
      <div class="custom-grid bg-age-colorLightingOrange rounded-md p-12">
        <div
          v-for="(result, index) in paginatedResults"
          :key="index"
          class="flex flex-col space-y-4 border shadow rounded-lg bg-white p-2"
        >
          <div
            class="flex flex-row justify-between bg-age-colorOrange p-6 rounded-2xl"
          >
            <div class="flex flex-row items-center space-x-6">
              <h1 class="font-bold text-xl text-white">Dados da conexão</h1>
            </div>
            <div class="flex flex-row items-center space-x-8">
              <div
                class="w-6 cursor-pointer"
                @click="fetchClientDetails(result.id)"
              >
                <infoIcon class="" />
              </div>

              <div class="w-6 cursor-pointer">
                <headsetIcon class="" />
              </div>
            </div>
          </div>
          <div class="flex flex-row select-text">
            <div class="w-full space-y-4 ml-6 mr-6">
              <div>
                <h1 class="font-semibold">Nome</h1>
                <span>{{ result.name }}</span>
              </div>
              <div>
                <h1 class="font-semibold">Email</h1>
                <span>{{ result.email }}</span>
              </div>
              <div>
                <h1 class="font-semibold">Bairro</h1>
                <span>{{ result.neighborhood }}</span>
              </div>
              <div>
                <h1 class="font-semibold">Contrato</h1>
                <span>{{ result.contract_id }}</span>
              </div>
            </div>
            <div class="w-full space-y-4 mr-12">
              <div>
                <h1 class="font-semibold">CPF/CNPJ</h1>
                <span>{{ result.tx_id }}</span>
              </div>
              <div>
                <h1 class="font-semibold">Contato</h1>
                <span>{{ result.cell_phone_1 }}</span>
              </div>
              <div>
                <h1 class="font-semibold">Endereço</h1>
                <span>{{ result.street }}</span>
              </div>
              <div>
                <h1 class="font-semibold">Status</h1>
                <span>{{ result.v_status }}</span>
              </div>
            </div>
            <div class="w-full space-y-4">
              <div>
                <h1 class="font-semibold">Equipamento</h1>
                <span>{{ result.equipment_serial_number }}</span>
              </div>
              <div>
                <h1 class="font-semibold">Contato</h1>
                <span>{{ result.cell_phone_2 }}</span>
              </div>
              <div>
                <h1 class="font-semibold">CEP</h1>
                <span>{{ result.postal_code }}</span>
              </div>
              <div>
                <h1 class="font-semibold">Estágio</h1>
                <span>{{ result.v_stage }}</span>
              </div>
            </div>
          </div>
          <div class="ml-6 mr-6 pb-4">
            <h1 class="font-semibold">Descrição</h1>
            <span>{{ result.description }}</span>
          </div>
        </div>
      </div>
      <div class="flex justify-center gap-4">
        <button
          @click="currentPage > 1 && currentPage--"
          :disabled="currentPage === 1"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
          :class="{ 'opacity-100 cursor-pointer': currentPage > 1 }"
        >
          Anterior
        </button>
        <button
          @click="currentPage < totalPages && currentPage++"
          :disabled="currentPage === totalPages"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
          :class="{ 'opacity-100 cursor-pointer': currentPage < totalPages }"
        >
          Próximo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useSearchStore } from "@/stores/searchStore";
import { useClientDetailsStore } from "@/stores/clientDetailsStore";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import infoIcon from "@/assets/icons/searchClient/infoIcon.vue";
import headsetIcon from "@/assets/icons/searchClient/headsetIcon.vue";

const router = useRouter();
const toast = useToast();

const searchStore = useSearchStore();
const searchResults = computed(() => searchStore.results);
const hasResults = computed(() => searchResults.value.length > 0);
const currentPage = ref(1);
const itemsPerPage = ref(4);
const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return searchResults.value.slice(start, end);
});
const totalPages = computed(() =>
  Math.ceil(searchResults.value.length / itemsPerPage.value)
);

const clientDetailsStore = useClientDetailsStore();

const fetchClientDetails = async (id) => {
  await clientDetailsStore.fetchDetails(id);
  if (clientDetailsStore.error) {
    toast.error(clientDetailsStore.error.message);
  } else {
    router.push({ name: "client-details", params: { id } });
  }
};
</script>

<style scoped>
.custom-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(0, 1fr);
  gap: 1rem;
}
</style>
