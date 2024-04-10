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
        class="w-44 h-8 bg-age-colorLightGreen rounded-lg flex justify-center items-center"
      >
        <span class="text-white font-bold">-21,509</span>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

import connectionIlustration from "@/assets/ilustrations/attendant/connectionIlustration.vue";

const props = defineProps({
  connection: Object,
});
</script>

<style lang="scss" scoped>
.triangle {
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 75px 0 75px 200px;
  border-color: transparent transparent transparent #ff4532;
  transform: rotate(0deg);
}
</style>
