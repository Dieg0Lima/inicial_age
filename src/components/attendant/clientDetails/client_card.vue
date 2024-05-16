<template>
  <div class="bg-white border-solid border-2 border-slate-200 rounded-xl p-2">
    <div
      class="w-full flex flex-row items-center space-x-4 bg-age-colorOrange rounded-xl"
      v-if="client"
    >
      <div class="mb-[-50px]"><userIlustration class="p-2" /></div>
      <div class="font-bold text-white text-xl">Dados do cliente</div>
    </div>
    <div class="flex justify-end pt-2">
      <div
        :style="{ backgroundColor: insigniaBgColor, color: insigniaFontColor }"
        class="w-44 h-8 rounded-lg flex justify-center items-center font-bold"
      >
        <span>{{ props.client.insignia }}</span>
      </div>
    </div>

    <div class="w-full" style="user-select: text">
      <div class="p-4 space-y-4">
        <div class="flex flex-col space-y-2 text-sm">
          <div class="flex flex-col">
            <div class="font-bold">
              {{ props.client.name || "Sem nome cadastrado" }}
            </div>
            <div class="space-x-2">
              <span>{{
                props.client.cell_phone_1 || "Sem telefone cadastrado"
              }}</span>
              <span>|</span>
              <span>{{ formattedTxId || "Sem CPF/CNPJ cadastrado" }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col text-sm">
          <span class="font-semibold">Email</span>
          <span>
            {{ props.client.email || "Sem email cadastrado" }}
          </span>
        </div>
        <div class="flex flex-col text-sm">
          <span class="font-semibold">Bairro</span>
          <span>
            {{ props.client.neighborhood || "Sem endereço cadastrado" }}
          </span>
        </div>
        <div class="flex flex-row space-x-6 justify-between text-sm">
          <div class="flex flex-col">
            <span class="font-semibold">Endereço</span>
            <span> {{ props.client.street || "Sem bairro cadastrado" }} </span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">Número</span>
            <span> {{ props.client.number || "Sem número cadastrado" }} </span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">CEP</span>
            <span>
              {{ props.client.postal_code || "Sem CEP cadastrado" }}
            </span>
          </div>
        </div>
        <div class="flex flex-col text-sm">
          <span class="font-semibold">Complemento</span>
          <span>
            {{
              props.client.address_complement || "Sem complemento cadastrado"
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { computed } from "vue";
import userIlustration from "@/assets/ilustrations/attendant/userIlustration.vue";

const props = defineProps({
  client: {
    type: Object,
    default: () => ({ tx_id: "" }),
  },
});

const insigniaBgColor = computed(() => {
  switch (props.client.insignia) {
    case "Cliente Ouro":
      return "#FFD700";
    case "Prata":
      return "#C0C0C0";
    case "Cliente bronze":
      return "#CD7F32";
    case "Diamante":
      return "#70d1f4";
    default:
      return "#E0E0E0";
  }
});

const insigniaFontColor = computed(() => {
  if (
    props.client.insignia === "Cliente Ouro" ||
    props.client.insignia === "Diamante" || 
    props.client.insignia === "Cliente bronze"
  ) {
    return "#FFFFFF";
  } else {
    return "#000000";
  }
});

const formattedTxId = computed(() => {
  const value = props.client.tx_id;
  if (!value) return "";
  const cleanValue = value.toString().replace(/\D/g, "");

  if (cleanValue.length === 11) {
    return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (cleanValue.length === 14) {
    return cleanValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }
  return value;
});
</script>

<style lang="scss" scoped></style>
