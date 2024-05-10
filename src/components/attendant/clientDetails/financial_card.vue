<template>
  <div
    class="bg-white border-2 border-solid border-slate-200 rounded-xl flex h-1/2 flex-row overflow-hidden p-2"
  >
    <div
      class="w-full h-full flex flex-col"
      v-if="financial && financial.length > 0"
    >
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
            @click="selectTitle(item)"
            class="flex flex-row items-center p-2 space-x-2 cursor-pointer border-solid border-b border-slate-200 hover:bg-orange-100 rounded-xl"
          >
            <div class="w-16">
              <financialIlustration :status="item.status" />
            </div>
            <div class="flex flex-row space-x-8">
              <div class="flex flex-col text-sm">
                <span class="font-semibold">Data do vencimento</span>
                <span>{{ item.formattedDate }}</span>
              </div>
              <div class="flex flex-col text-sm">
                <span class="font-semibold">Valor</span>
                <span>{{
                  `R$${parseFloat(item.title_amount).toFixed(2)}`
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
          v-if="selectedTitle && selectedTitle.title_amount !== undefined"
          class="w-full h-96 border-solid border-r border-slate-200 overflow-scroll pb-6 space-y-1"
        >
          <div class="flex flex-col p-4">
            <span class="text-lg font-semibold">Valor</span>
            <span class="text-2xl font-extrabold">{{
              `R$${parseFloat(selectedTitle.title_amount).toFixed(2)}`
            }}</span>
          </div>
          <div class="flex flex-row w-full p-4">
            <div class="w-1/2 space-y-8">
              <div class="flex flex-row space-x-4 items-center">
                <div class="w-6">
                  <calendarIcon class="fill-age-colorOrange" />
                </div>
                <div class="flex flex-col">
                  <span class="font-medium text-xs">Data da vigência</span>
                  <span class="font-bold text-xs">
                    {{ selectedTitle.formattedDate }}</span
                  >
                </div>
              </div>
              <div class="flex flex-row space-x-4 items-center">
                <div class="w-6">
                  <calendarIcon class="fill-age-colorOrange" />
                </div>
                <div class="flex flex-col">
                  <span class="font-medium text-xs">Data do vencimento</span>
                  <span class="font-bold text-xs">
                    {{ selectedTitle.formattedDate }}</span
                  >
                </div>
              </div>
            </div>
            <div class="w-1/2 space-y-8">
              <div
                class="flex flex-row space-x-2 items-center"
                @click="sendInvoiceToWhatsApp"
              >
                <div class="w-8">
                  <whatsappIcon
                    class="fill-age-colorOrange w-full cursor-pointer"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="font-bold text-xs">Whatsapp</span>
                  <span class="font-medium text-xs"
                    >Enviar fatura do cliente</span
                  >
                </div>
              </div>
              <!-- <div class="flex flex-row space-x-2 items-center">
                <div class="w-8">
                  <emailIcon
                    class="fill-age-colorOrange w-full cursor-pointer"
                  />
                </div>
                <div class="flex flex-col">
                  <span class="font-bold text-xs">E-mail</span>
                  <span class="font-medium text-xs">
                    Enviar fatura do cliente</span
                  >
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div
          v-else
          class="w-full h-96 border-solid border-r border-slate-200 overflow-scroll pb-6 space-y-1"
        >
          <div
            class="w-full h-full flex flex-col p-8 justify-center items-center"
          >
            <span class="font-semibold"
              >Escolha uma fatura para visualizá-la</span
            >
            <financialChooseIlustration
              class="flex justify-center items-center"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full flex flex-col">
      <div
        class="flex items-center bg-age-colorOrange border-solid border-b border-slate-200 p-2 rounded-xl space-x-4 w-full"
      >
        <div class="w-14">
          <billetIlustration />
        </div>
        <div class="font-semibold text-xl ml-2 text-white">Dados da fatura</div>
      </div>
      <div class="flex justify-center pt-8">
        <span>Não foi registrado nenhuma fatura.</span>
      </div>
      <div
        class="w-full h-96 border-solid border-r border-slate-200 overflow-scroll pb-6 space-y-1"
      >
        <div class="w-full h-full flex justify-center items-center">
          <emptyIlustration />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import billetIlustration from "@/assets/ilustrations/attendant/billetIlustration.vue";
import { defineProps, computed, ref } from "vue";
import financialIlustration from "@/assets/ilustrations/attendant/financialIlustration.vue";
import financialChooseIlustration from "@/assets/ilustrations/attendant/financialChooseIlustration.vue";
import emptyIlustration from "@/assets/ilustrations/attendant/emptyIlustration.vue";
import calendarIcon from "@/assets/icons/attendant/calendarIcon.vue";
import whatsappIcon from "@/assets/icons/attendant/whatsAppIcon.vue";
// import emailIcon from "@/assets/icons/attendant/emailIcon.vue";

const props = defineProps({
  financial: Array,
});

const selectedTitle = ref("");

function selectTitle(title) {
  selectedTitle.value = title;
}

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
    formattedDate: formatExpirationDate(item.title_expiration_date),
  }));
});

function formatExpirationDate(expirationDateStr) {
  const date = new Date(expirationDateStr);
  if (!isNaN(date.getTime())) {
    let day = (date.getDate() + 1).toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return "";
}

import { useToast } from 'vue-toastification';
import { useClientDetailsStore } from '@/stores/clientDetailsStore';
import axiosInstance from '@/api/axios';

const clientDetailsStore = useClientDetailsStore();

function sendInvoiceToWhatsApp() {
  const toast = useToast();
  const client = clientDetailsStore.client;

  if (client) {
    const invoiceData = {
      billet_id: selectedTitle.value.title_id,
      to: client.cell_phone_1,
      client: client.name,
    };

    axiosInstance
      .post("/api/v1/send_billet/whatsapp", invoiceData)
      .then((response) => {
        console.log(response.data);
        toast.success("Fatura enviada com sucesso via WhatsApp");
      })
      .catch((error) => {
        console.error(error);
        console.error(invoiceData)
        toast.error("Erro ao enviar fatura via WhatsApp");
      });
  } else {
    console.error("Nenhum cliente disponível");
    toast.error("Nenhum cliente disponível para enviar a fatura");
  }
}


</script>

<style lang="scss" scoped></style>
