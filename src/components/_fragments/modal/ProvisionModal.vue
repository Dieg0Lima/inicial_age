<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content w-4/12">
      <div class="modal-header flex flex-row justify-between space-x-8">
        <h4 v-if="currentPage === 'form'" class="font-bold">
          Formulário de Provisionamento
        </h4>
        <h4 v-else class="font-bold">Listagem de OLTs</h4>
        <button
          @click="close"
          class="bg-age-colorOrange rounded-md flex flex-col justify-center items-center hover:bg-age-colorLightOrangeHover"
        >
          <i class="fa-solid fa-xmark p-2 text-white"></i>
        </button>
      </div>
      <div class="modal-body w-full flex flex-col justify-center items-center">
        <div v-if="currentPage === 'form'" class="w-full">
          <form
            @submit.prevent="submitForm"
            class="flex flex-col pt-8 space-y-6 w-full"
          >
            <input
              class="p-2 border border-solid border-slate-200 rounded-md"
              type="text"
              v-model="equipment"
              placeholder="Equipamento"
              required
            />
            <input
              class="p-2 border border-solid border-slate-200 rounded-md"
              type="text"
              v-model="ceo"
              placeholder="CEO"
              required
            />
            <div class="flex flex-col items-end w-full"></div>
          </form>
        </div>
        <div v-else class="h-96 overflow-scroll w-full p-2">
          <div class="my-4">
            <span class="text-gray-400"
              >Escolha a OLT na qual o cliente está sendo instalado de acordo
              com o código da CTO</span
            >
          </div>
          <div class="w-full flex flex-row my-4">
            <input
              type="text"
              class="p-2 w-full border border-solid border-slate-200 rounded-md"
              placeholder="Pesquise"
              v-model="searchText"
            />
          </div>

          <div
            class="overflow-scroll flex flex-row items-center mb-2 space-x-2 cursor-pointer hover:bg-amber-100"
            v-for="olt in filteredOlts"
            :key="olt.id"
          >
            <div class="bg-age-colorOrange rounded-md">
              <i class="fa-solid fa-server text-white p-2 rounded-md"></i>
            </div>
            <span class="font-semibold">{{ olt.olt_name }}</span>
          </div>
        </div>
        <div class="w-full flex justify-end pt-6">
          <button
            v-if="currentPage.value !== 'oltList'"
            class="bg-age-colorOrange items-end justify-end text-white font-bold p-2 rounded-xl hover:bg-age-colorLightOrangeHover w-4/12"
            type="submit"
            @click="submitProvision"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, computed } from "vue";
import { useClientProvisionStore } from "@/stores/clientProvisionStore";

const props = defineProps({
  isVisible: Boolean,
  olts: Array,
});

const emit = defineEmits(["update:isVisible"]);
const currentPage = ref("form");
const clientProvisionStore = useClientProvisionStore();

function close() {
  emit("update:isVisible", false);
  resetPagination();
}

function submitProvision() {
  clientProvisionStore.submitProvision();
  currentPage.value = "oltList";
}

function resetPagination() {
  currentPage.value = "form";
}

const searchText = ref("");

const filteredOlts = computed(() => {
  return props.olts.filter((olt) =>
    olt.olt_name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 10;
}
</style>
