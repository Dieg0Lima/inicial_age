<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-background" @click="close"></div>
    <div v-if="loading" class="loading-overlay">
      <img src="@/assets/loadings/rolling.gif" alt="Carregando..." />
    </div>
    <div class="modal-content w-4/12">
      <div class="modal-header flex flex-row justify-between space-x-8">
        <div v-if="currentPage === 'form'" class="flex flex-col space-y-4">
          <h1 class="font-bold text-xl">Formulário de Gerenciamento</h1>
          <span
            >Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus eaque sit itaque porro culpa amet natus facere
            corrupti enim, iste ullam ad quas, impedit explicabo consequatur
            aliquam nam architecto esse.
          </span>
        </div>
        <div class="flex flex-row items-start">
          <button
            @click="close"
            class="w-8 flex flex-col justify-center items-center"
          >
            <i class="fa-solid fa-xmark text-xl text-gray-700"></i>
          </button>
        </div>
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <div v-if="currentPage === 'form'" class="w-full">
          <form
            @submit.prevent="submitForm"
            class="flex flex-col items-end pt-8 space-y-6 w-full"
          >
            <div class="flex flex-row w-full space-x-4"></div>
            <div class="flex flex-row w-full space-x-4">
              <div class="w-full flex flex-col space-y-2">
                <span class="w-full font-semibold">Equipamento</span>

                <input
                  class="p-2 border w-full border-solid border-slate-200 rounded-md"
                  type="text"
                  v-model="formManagenent.sernum"
                  placeholder="Número de Serial"
                  required
                />
              </div>
            </div>

            <div class="h-full w-full flex flex-row justify-between items-end">
              <modalIlustration />
              <div class="flex justify-end mt-8">
                <button
                  class="bg-green-500 text-white font-bold p-2 rounded-xl hover:bg-green-600 px-8"
                  @click="finalSubmit"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, reactive, watch, onMounted } from "vue";
import { useClientManagementStore } from "@/stores/clientManagementStore";
import { useToast } from "vue-toastification";
import modalIlustration from "@/assets/ilustrations/attendant/modalIlustration.vue";
import router from "@/router";
import { useRoute } from "vue-router";
const route = useRoute();

const toast = useToast();
const props = defineProps({
  isVisible: Boolean,
  olts: Array,
  connection: Object,
  contract: Object,
});

const loading = ref(false);

const clientId = route.params.id;

const emit = defineEmits(["update:isVisible"]);
const formManagenent = reactive({
  sernum: "",
});
const currentPage = ref("form");
const clientManagementStore = useClientManagementStore();

watch(
  () => props.connection,
  (newVal) => {
    if (newVal) {
      formManagenent.sernum = newVal.equipment_serial_number || "";
    }
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  if (!props.connection) {
    router.push(`/atendimento/detalhes/${clientId}`);
  }
});

function close() {
  emit("update:isVisible", false);
}

const finalSubmit = () => {
  loading.value = true;
  const submissionData = {
    sernum: formManagenent.sernum,
  };

  clientManagementStore
    .submitManagement(submissionData)
    .then(() => {
      loading.value = false;
      close();
    })
    .catch((error) => {
      console.error("Falha ao submeter os dados. Tente novamente.", error);
      toast.error("Erro na submissão: " + error.message);
      loading.value = false;
    });
};
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

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8); 
  z-index: 20;
}
</style>
