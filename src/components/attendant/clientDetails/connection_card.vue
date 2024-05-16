<template>
  <div class="bg-white border-solid border-2 border-slate-200 rounded-xl p-2">
    <div
      class="w-full flex flex-row items-center space-x-4 bg-age-colorOrange rounded-xl"
    >
      <div class="mb-[-50px]"><connectionIlustration class="p-2" /></div>
      <div class="font-bold text-white text-xl">Dados da conexão</div>
    </div>
    <div class="flex justify-end pt-2">
      <div
        :class="signalBgClass"
        class="w-44 h-8 rounded-lg flex justify-center items-center"
      >
        <img
          v-if="isLoading"
          class="w-5"
          src="@/assets/loadings/potencyLoading.gif"
          alt=""
        />

        <span v-else class="text-white font-bold select-text">{{
          onuPower.rx_signal_level || "Aguardando"
        }}</span>
      </div>
    </div>
    <div class="w-full pt-[10px]" style="user-select: text">
      <div class="p-4 space-y-4">
        <div class="flex flex-row space-x-6">
          <div class="flex flex-col text-sm">
            <span class="font-bold">{{
              props.connection.equipment_serial_number ||
              "Sem equipamento cadastrado"
            }}</span>
            <span>{{
              props.connection.access_point || "Sem OLT cadastrada"
            }}</span>
          </div>
        </div>
        <div class="flex flex-row space-x-8 text-sm">
          <div class="flex flex-col">
            <span class="font-semibold">SSID do Wi-Fi</span>
            <span>{{
              props.connection.wifi_name || "Sem SSID cadastrado"
            }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">Senha do Wi-Fi</span>
            <span>{{
              props.connection.wifi_password || "Sem senha cadastrada"
            }}</span>
          </div>
        </div>
        <div class="flex flex-row space-x-6 justify-between text-sm">
          <div class="flex flex-col">
            <span class="font-semibold">Slot</span>
            <span>{{
              props.connection.slot_olt || "Sem slot cadastrado"
            }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">PON</span>
            <span>{{ props.connection.port_olt || "Sem PON cadastrada" }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">ID na OLT</span>
            <span>{{
              props.connection.olt_id || "Sem ID na OLT cadastrado"
            }}</span>
          </div>
        </div>
        <div class="flex justify-end pt-2">
          <div
            :class="[
              'h-8 rounded-lg flex justify-center items-center text-white pl-8 pr-8 font-bold',
              statusColorClass,
            ]"
          >
            {{ formattedTitle }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, computed, ref } from "vue";
import connectionIlustration from "@/assets/ilustrations/attendant/connectionIlustration.vue";
import axiosInstance from "@/api/axios";

const statusColorClass = computed(() => {
  const title = props.connection.authentication_address_list_title;
  return title === "Bloqueio Financeiro" ||
    title === "Aviso_Bloqueio" ||
    title === "Bloqueio Administrativo"
    ? "bg-red-500"
    : "bg-age-colorLightGreen";
});

const formattedTitle = computed(() => {
  const title = props.connection.authentication_address_list_title;
  return title === "Aviso_Bloqueio" ? "Aviso de Redução de Velocidade" : title;
});

const props = defineProps({
  connection: Object,
});

const onuPower = reactive({
  rx_signal_level: null,
});

const signalBgClass = computed(() => {
  if (onuPower.rx_signal_level >= -24) {
    return "bg-green-500";
  } else if (onuPower.rx_signal_level >= -27) {
    return "bg-yellow-500";
  } else {
    return "bg-red-500";
  }
});

const isLoading = ref();

onMounted(async () => {
  isLoading.value = true;
  try {
    const requestBody = {
      olt_id: props.connection.access_point_id,
      sernum: props.connection.equipment_serial_number,
      slot: props.connection.slot_olt,
      pon: props.connection.port_olt,
      port: props.connection.olt_id,
    };

    const response = await axiosInstance.post(
      "/api/v1/potency/fetch_onu_power",
      requestBody
    );
    onuPower.rx_signal_level = response.data.rx_signal_level;
  } catch (error) {
    console.error("Erro ao buscar dados: " + error.message);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.bg-green-500 {
  background-color: #90ca54;
}
.bg-yellow-500 {
  background-color: #ffeb3b;
}
.bg-red-500 {
  background-color: #f44336;
}
.triangle {
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 75px 0 75px 200px;
  border-color: transparent transparent transparent #ff4532;
  transform: rotate(0deg);
}
</style>
