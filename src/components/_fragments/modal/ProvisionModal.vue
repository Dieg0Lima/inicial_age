<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content w-4/12">
      <div class="modal-header flex flex-row justify-between space-x-8">
        <div v-if="currentPage === 'form'" class="flex flex-col space-y-4">
          <h1 class="font-bold text-xl">Formulário de Provisionamento</h1>
          <span
            >Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus eaque sit itaque porro culpa amet natus facere
            corrupti enim, iste ullam ad quas, impedit explicabo consequatur
            aliquam nam architecto esse.
          </span>
        </div>
        <div v-else class="flex flex-col space-y-4">
          <h1 class="font-bold text-xl">Listagem de OLTs</h1>
          <span class="text-gray-400"
            >Escolha a OLT na qual o cliente está sendo instalado de acordo com
            o código da CTO</span
          >
        </div>
        <div class="flex flex-row items-start">
          <button
            v-if="currentPage !== 'form'"
            @click="back"
            class="w-8 flex flex-col justify-center items-center"
          >
            <i class="fa-solid fa-chevron-left text-xl text-gray-700"></i>
          </button>
          <button
            @click="close"
            class="w-8 flex flex-col justify-center items-center"
          >
            <i class="fa-solid fa-xmark text-2xl text-gray-700"></i>
          </button>
        </div>
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <div v-if="currentPage === 'form'" class="w-full">
          <form
            @submit.prevent="submitForm"
            class="flex flex-col items-end pt-8 space-y-6 w-full"
          >
            <div class="w-full flex flex-col space-y-2">
              <span class="w-full font-semibold">Equipamento</span>
              <input
                class="p-2 border w-full border-solid border-slate-200 rounded-md"
                type="text"
                v-model="formData.equipment"
                placeholder="Número de serial"
                required
              />
            </div>

            <div class="w-full flex flex-col space-y-2">
              <span class="w-full font-semibold"
                >Caixa de Transmissão Óptica</span
              >

              <input
                class="p-2 border w-full border-solid border-slate-200 rounded-md"
                type="text"
                v-model="formData.cto"
                placeholder="CTO"
                required
              />
            </div>

            <div class="h-full w-full flex flex-row justify-between items-end">
              <modalIlustration />
              <button
                v-if="currentPage.value !== 'oltList'"
                class="bg-age-colorOrange items-end justify-end text-white font-bold p-2 rounded-xl hover:bg-age-colorLightOrangeHover w-4/12 h-1/2"
                type="submit"
                @click="submitForm"
              >
                Próximo
              </button>
            </div>
          </form>
        </div>
        <div v-else class="w-full">
          <div class="h-96 overflow-scroll w-full">
            <div
              class="w-full px-2 flex flex-row items-center my-4 border border-solid border-slate-200 rounded-md"
            >
              <i
                class="fa-solid fa-magnifying-glass text-xl text-age-colorOrange p-3"
              ></i>
              <input
                type="text"
                class="p-3 w-full"
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
          <div class="h-full w-full flex flex-row justify-between items-end pt-4">
            <modalIlustration />
            <button
              v-if="currentPage.value !== 'oltList'"
              class="bg-age-colorOrange items-end justify-end text-white font-bold p-2 rounded-xl hover:bg-age-colorLightOrangeHover w-4/12 h-1/2"
              type="submit"
              @click="submitForm"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, computed, watch } from "vue";
import { useClientProvisionStore } from "@/stores/clientProvisionStore";
import { useToast } from "vue-toastification";
import modalIlustration from "@/assets/ilustrations/attendant/modalIlustration.vue";

const toast = useToast();

const props = defineProps({
  isVisible: Boolean,
  olts: Array,
  connection: Object,
});

const emit = defineEmits(["update:isVisible"]);

const currentPage = ref("form");
const clientProvisionStore = useClientProvisionStore();
const formData = ref({ equipment: "", cto: "" });

watch(
  () => props.connection,
  (newVal) => {
    if (newVal) {
      formData.value.equipment = newVal.equipment_serial_number || "";
    } else {
      formData.value.equipment = "";
    }
  },
  { deep: true, immediate: true }
);

function back() {
  currentPage.value = "form";
}

function close() {
  emit("update:isVisible", false);
  resetPagination();
}

function submitForm() {
  if (!formData.value.cto || formData.value.equipment === "") {
    toast.error("Por favor, preencha todos os campos do formulário.");
    return;
  } else {
    const formDataValue = formData.value;
    clientProvisionStore.submitProvision(formDataValue);
    currentPage.value = "oltList";
  }
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
