<template>
  <div class="bg-white border-solid border-2 border-slate-200 rounded-xl p-2">
    <div
      class="w-full flex flex-row items-center space-x-4 bg-age-colorOrange rounded-xl"
    >
      <div class="mb-[-50px]"><contractIlustration class="p-2" /></div>
      <div class="font-bold text-white text-xl">Dados do contrato</div>
    </div>
    <div class="flex justify-end pt-2">
      <div
        :class="[
          'h-8 rounded-lg flex justify-center items-center text-white pl-8 pr-8 font-bold',
          statusColorClass,
        ]"
      >
        {{ props.contract.status }}
      </div>
    </div>
    <div class="w-full pt-[10px] text-sm" style="user-select: text">
      <div class="p-4 space-y-4">
        <div class="flex flex-row space-x-6 justify-between">
          <div class="flex flex-col">
            <span class="font-semibold">Contrato</span>
            <span>{{ props.contract.contract_id }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">Estágio</span>
            <span>{{ props.contract.stage }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">Bloqueios</span>
            <span>0</span>
          </div>
        </div>
        <div>
          <div class="flex flex-col">
            <span class="font-semibold">Plano</span>
            <span>{{ props.contract.contract_item }}</span>
          </div>
        </div>
        <div class="flex flex-row space-x-6 justify-between">
          <div class="flex flex-col">
            <span class="font-semibold">Inicio da Vigência</span>
            <span>{{ props.contract.beginning_date }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">Fim da Vigência</span>
            <span>{{ formattedDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import contractIlustration from "@/assets/ilustrations/attendant/contractIlustration.vue";
import { useToast } from "vue-toastification";

const contractData = ref(null);
const toast = useToast();

onMounted(() => {
  const storedData = localStorage.getItem("clientDetails");
  if (storedData) {
    console.log(storedData)
  } else {
    toast.error("Nenhum dado de contrato encontrado.");
  }
});

const statusColorClass = computed(() => {
  return contractData.value.status === "Bloqueio Financeiro" ||
    contractData.value.status === "Cancelado" ||
    contractData.value.status === "Bloqueio Administrativo"
    ? "bg-red-500"
    : "bg-age-colorLightGreen";
});

const formattedDate = computed(() => {
  const date = new Date(contractData.value.final_date);
  if (!isNaN(date.getTime())) {
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return "";
});
</script>

<style lang="scss" scoped></style>
