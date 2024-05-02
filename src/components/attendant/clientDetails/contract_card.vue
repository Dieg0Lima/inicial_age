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
            <span>{{ formattedDate }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">Fim da Vigência</span>
            <span
              :class="
                contractStatus.isFidelizado
                  ? ' bg-age-colorLightGreen text-white text-center p-1 px-4 rounded-lg font-bold'
                  : ' bg-red-500 text-white text-center p-1 px-4 rounded-lg font-bold'
              "
              >{{ contractStatus.status }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import contractIlustration from "@/assets/ilustrations/attendant/contractIlustration.vue";
import { computed, defineProps } from "vue";

const props = defineProps({
  contract: {
    type: Object,
    default: () => ({ final_date: "", status: "" }),
  },
});

const statusColorClass = computed(() => {
  return props.contract.status === "Bloqueio Financeiro" ||
    props.contract.status === "Cancelado" ||
    props.contract.status === "Bloqueio Administrativo"
    ? "bg-red-500"
    : "bg-age-colorLightGreen";
});

const contractStatus = computed(() => {
  const contractDate = new Date(props.contract.final_date);
  const currentDate = new Date();

  if (contractDate.getFullYear() > (currentDate.getFullYear() + 2)) {
    return { status: `Não fidelizado`, isFidelizado: false };
  }

  if (contractDate > currentDate) {
    let day = contractDate.getDate().toString().padStart(2, "0");
    let month = (contractDate.getMonth() + 1).toString().padStart(2, "0");
    let year = contractDate.getFullYear();
    return { status: `Fidelizado ${day}/${month}/${year}`, isFidelizado: true };
  }

  return { status: "", isFidelizado: true };
});

const formattedDate = computed(() => {
  const date = new Date(props.contract.beginning_date);
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
