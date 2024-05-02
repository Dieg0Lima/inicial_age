<template>
  <div class="mx-auto px-0 w-full">
    <div class="grid grid-cols-4 gap-4 w-full">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex flex-row border w-full rounded-xl shadow bg-white items-center min-h-[150px]"
      >
        <div
          class="w-1/3 h-full flex items-center justify-center rounded-xl p-4 bg-age-colorOrange cursor-pointer"
          @click="handleButtonClick(item)"
        >
          <img
            :src="
              require('@/assets/icons/attendant/actionsButtons/' + item.svg)
            "
            alt="Icon"
            class="w-12 h-auto"
          />
        </div>

        <div class="w-2/3 p-2 flex flex-col justify-between">
          <div>
            <div class="font-bold">
              {{ item.name }}
            </div>
            <div>
              {{ item.description }}
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-end items-end h-full p-2">
          <div
            class="flex justify-center items-center border-2 border-solid border-age-colorOrange p-2 rounded-lg cursor-pointer"
            @click="handleButtonClick(item)"
          >
            <i class="fa-solid fa-play text-age-colorOrange"></i>
          </div>
        </div>
      </div>
    </div>
    <ProvisionModal
      :connection="clientDetailsStore.connection"
      :contract="clientDetailsStore.contract"
      :isVisible="isProvisionVisible"
      :olts="olts"
      @update:isVisible="isProvisionVisible = $event"
    />

    <DeprovisionModal
      :connection="clientDetailsStore.connection"
      :isVisible="isDeprovisionVisible"
      @update:isVisible="isDeprovisionVisible = $event"
    />

    <RebootModal
      :connection="clientDetailsStore.connection"
      :isVisible="isRebootVisible"
      @update:isVisible="isRebootVisible = $event"
    />

    <ManagementModal
      :connection="clientDetailsStore.connection"
      :isVisible="isManagementVisible"
      @update:isVisible="isManagementVisible = $event"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axiosInstance from "@/api/axios";
import ProvisionModal from "@/components/_fragments/modal/ProvisionModal.vue";
import DeprovisionModal from "@/components/_fragments/modal/DeprovisionModal.vue";
import RebootModal from "@/components/_fragments/modal/RebootModal.vue";
import ManagementModal from "@/components/_fragments/modal/ManagementModal.vue";

import { useClientDetailsStore } from "@/stores/clientDetailsStore";
const clientDetailsStore = useClientDetailsStore();

const items = ref([
  {
    id: 1,
    name: "Provisionamento",
    description:
      "Processo de configuração e ativação de serviços ou equipamentos",
    svg: "check-solid.svg",
    action: "Provision",
  },
  {
    id: 2,
    name: "Desprovisionamento",
    description:
      "Processo oposto ao provisionamento e envolve a remoção ou desativação de serviços ou equipamentos",
    svg: "xmark-solid.svg",
    action: "Deprovision",
  },
  {
    id: 3,
    name: "Reiniciar equipamento",
    description: "Processo de desligar e ligar novamente um dispositivo",
    svg: "rotate-right-solid.svg",
    action: "Reboot",
  },
  {
    id: 4,
    name: "Acessar gerência",
    description: "Acessar gerência na interface de gerenciamento",
    svg: "gear-solid.svg",
    action: "Management",
  },
]);

const isProvisionVisible = ref(false);
const isDeprovisionVisible = ref(false);
const isRebootVisible = ref(false);
const isManagementVisible = ref(false);

const olts = ref([]);

async function fetchOlts() {
  try {
    const response = await axiosInstance.get(
      "/api/v1/provision/list_valid_olts"
    );
    olts.value = response.data;
    isProvisionVisible.value = true;
  } catch (error) {
    console.error("Failed to fetch OLTs:", error);
  }
}

async function deprovisionOnu() {
  try {
    isDeprovisionVisible.value = true;
  } catch (error) {
    console.error("Failed to deprovision ONU:", error);
  }
}

async function rebootOnu() {
  try {
    isRebootVisible.value = true;
  } catch (error) {
    console.error("Failed to deprovision ONU:", error);
  }
}

async function managementOnu() {
  try {
    isManagementVisible.value = true;
  } catch (error) {
    console.error("Failed to deprovision ONU:", error);
  }
}

function handleButtonClick(item) {
  if (item.action === "Provision") {
    fetchOlts();
  }
  if (item.action === "Deprovision") {
    deprovisionOnu();
  }
  if (item.action === "Reboot") {
    rebootOnu();
  }
  if (item.action === "Management") {
    managementOnu();
  } else {
    null
  }
}
</script>
