<template>
  <div class="mx-auto px-0 w-full">
    <div class="grid grid-cols-4 gap-4 w-full">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex flex-row border w-full rounded-xl shadow bg-white items-center min-h-[150px]"
      >
        <div
          class="w-1/3 h-full flex items-center justify-center rounded-xl p-4 bg-age-colorOrange"
        >
          <img
            :src="
              require('@/assets/icons/attendant/actionsButtons/' + item.svg)
            "
            alt="Icon"
            class="w-12 h-auto"
          />
        </div>

        <div class="w-2/3 p-2 flex flex-col justify-around">
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
      :isVisible="isModalVisible"
      :olts="olts"
      @update:isVisible="isModalVisible = $event"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axiosInstance from "@/api/axios";
import ProvisionModal from "@/components/_fragments/modal/ProvisionModal.vue";

import { useClientDetailsStore } from "@/stores/clientDetailsStore";
const clientDetailsStore = useClientDetailsStore();

const items = ref([
  {
    id: 1,
    name: "Item 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam nisi ea rem ut cupiditate iusto ",
    svg: "check-solid.svg",
    action: "Provision",
  },
  {
    id: 2,
    name: "Item 2",
    description: "sla",
    svg: "check-solid.svg",
    action: "api/sla/2",
  },
  {
    id: 3,
    name: "Item 3",
    description: "sla",
    svg: "check-solid.svg",
    action: "api/sla/3",
  },
  {
    id: 4,
    name: "Item 4",
    description: "sla",
    svg: "check-solid.svg",
    action: "api/sla/4",
  },
  {
    id: 5,
    name: "Item 5",
    description: "sla",
    svg: "check-solid.svg",
    action: "api/sla/5",
  },
]);

const isModalVisible = ref(false);
const olts = ref([]);

async function fetchOlts() {
  try {
    const response = await axiosInstance.get(
      "/api/v1/provision/list_valid_olts"
    );
    olts.value = response.data;
    isModalVisible.value = true;
  } catch (error) {
    console.error("Failed to fetch OLTs:", error);
  }
}

function handleButtonClick(item) {
  if (item.action === "Provision") {
    fetchOlts();
  } else {
    console.log("Esta ação não abre o modal de OLTs.");
  }
}
</script>

<style scoped>
/* Adicione estilos adicionais se necessário */
</style>
