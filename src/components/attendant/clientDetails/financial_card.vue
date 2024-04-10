<template>
  <div
    class="bg-white border-2 border-solid border-slate-200 rounded-xl flex h-1/2 flex-row overflow-hidden p-2"
  >
    <div class="w-full h-full flex flex-col">
      <div
        class="flex items-center bg-age-colorOrange border-solid border-b border-slate-200 p-2 rounded-xl space-x-4"
      >
        <div class="w-14">
          <billetIlustration />
        </div>
        <div class="font-semibold text-xl ml-2 text-white">Dados da fatura</div>
      </div>
      <div class="flex flex-row w-full h-full">
        <div
          class="w-full h-96 border-solid border-r border-slate-200 overflow-scroll pb-6 space-y-1"
        >
          <div
            v-for="item in financialWithStatus"
            :key="item.title_id"
            class="flex flex-row items-center p-2 space-x-2 cursor-pointer border-solid border-b border-slate-200 hover:bg-orange-100 rounded-xl"
          >
            <div class="w-16">
              <financialIlustration :status="item.status" />
            </div>
            <div class="flex flex-row space-x-8">
              <div class="flex flex-col text-sm">
                <span class="font-semibold">Data do vencimento</span>
                <span>{{ item.title_expiration_date }}</span>
              </div>
              <div class="flex flex-col text-sm">
                <span class="font-semibold">Valor</span>
                <span>{{
                  `R$ ${parseFloat(item.title_amount).toFixed(2)}`
                }}</span>
              </div>
              <div class="flex flex-col text-sm">
                <span class="font-semibold">Status</span>
                <span>{{ item.title_status ? "Não Pago" : "Pago" }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full h-96 border-solid border-r border-slate-200 overflow-scroll pb-6 space-y-1"
        >
          <div class="w-full h-full flex justify-center items-center">
            <img src="@/assets/ilustrations/attendant/workingIn.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import billetIlustration from "@/assets/ilustrations/attendant/billetIlustration.vue";
import { defineProps, computed } from "vue";
import financialIlustration from "@/assets/ilustrations/attendant/financialIlustration.vue";

const props = defineProps({
  financial: Array,
});

const currentDate = new Date();

const getStatus = (item) => {
  const expirationDate = new Date(item.title_expiration_date);
  if (item.title_status === false) {
    return "paid";
  } else if (expirationDate < currentDate) {
    return "expired";
  } else if (expirationDate > currentDate) {
    return "open";
  } else {
    return "pending";
  }
};

const financialWithStatus = computed(() => {
  return props.financial.map((item) => ({
    ...item,
    status: getStatus(item),
  }));
});

</script>

<style lang="scss" scoped></style>
