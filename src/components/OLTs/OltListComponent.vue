<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const isLoading = ref(false);
const valid_olt = ref([]);
const unprovision = ref([]);
const availability = ref([]);
const lastClickedOltId = ref(null);
const activeOnuId = ref(null);
const selectedItemIndex = ref(null);
const availabilityResponses = ref([]);

const connectionId = route.params.connectionId;

onMounted(async () => {
  try {
    const response = await axios.get(`http://192.168.69.80:3000/valid_olts`);
    valid_olt.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar a lista de OLTs:", error);
  }
});

async function unprovision_list(id) {
  lastClickedOltId.value = id;
  isLoading.value = true;

  try {
    const response = await axios.post('http://192.168.69.80:3000/equipment/execute_command', {
      command: "unprovision_list",
      id: id
    });
    activeOnuId.value = id;
    unprovision.value = response.data.response;
    availabilityResponses.value = [];
  } catch (error) {
    console.error("Erro ao executar o comando de desprovisionamento:", error);
  } finally {
    isLoading.value = false;
  }
}

async function availability_pon(slot, pon, index) {
  isLoading.value = true;

  try {
    const response = await axios.post('http://192.168.69.80:3000/equipment/execute_command', {
      command: "availability_pon",
      slot: slot,
      pon: pon,
      id: lastClickedOltId.value,
      index: index
    });

    availabilityResponses.value[index] = response.data.response;

  } catch (error) {
    console.error("Erro ao executar o comando de disponibilidade PON:", error);
  } finally {
    isLoading.value = false;
  }
}


async function provision_onu(index, port, slot, pon, serial) {
  const contractId = route.params.contractId;
  if (!contractId) {
    console.error("Contract ID não encontrado na URL.");
    return;
  }

  selectedItemIndex.value = index;
  try {
    const response = await axios.post('http://192.168.69.80:3000/equipment/execute_command', {
      command: "provision_onu",
      port: port,
      slot: slot,
      pon: pon,
      id: lastClickedOltId.value,
      contract: contractId,
      sernum: serial,
      connection_id: connectionId
    });
    availability.value = response.data.response;
  } catch (error) {
    console.error("Erro ao executar o comando de disponibilidade PON:", error);
  }
}


</script>


<template>
  <div class="page-container">
    <div class="olt-list-container p-4">
      <div class="olt_card cursor-pointer mt-2 mb-4 p-4" v-for="item in valid_olt" :key="item.id" @click="unprovision_list(item.id)">
        <div class="flex space-x-2 items-center justify-between">
          <div class="flex space-x-4 items-center">
            <font-awesome-icon :icon="['fas', 'server']" />
            <h1 class="font-extrabold">{{ item.olt_name }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-if="isLoading">
      <div class="loadingio-spinner-dual-ring-pelu7rtlzto"><div class="ldio-kh5o7t8djcs">
        <div></div><div><div></div></div>
      </div></div>
    </div>
    <div class="olt-details-container p-4" v-else>
      <div class="onu_card mt-2 mb-2 p-4" v-for="(item, index) in unprovision" :key="`item-${index}`">
        <div @click="availability_pon(item.slot, item.pon, index)" class="flex cursor-pointer space-x-2 items-center justify-between">
          <div class="flex space-x-4 items-center">
            <font-awesome-icon :icon="['fas', 'sitemap']" />
            <div class="">
              <div>
                <h2 class="font-bold">{{ item.path }}</h2>
                <p>{{ item.serial }}</p>
              </div>
              <div>
                <p class="font-medium text-red-600">ONU Desprovisionada</p>
              </div>
            </div>
          </div>
          <div class="loading" v-if="isLoading">
            <div class="loadingio-spinner-dual-ring-pelu7rtlzto"><div class="ldio-kh5o7t8djcs">
              <div></div><div><div></div></div>
            </div></div>
          </div>
        </div>
        <div v-for="(responseItem, responseIndex) in availabilityResponses[index]" :key="`response-${responseIndex}`">
          <div class="slot_id_card cursor-pointer mt-2 mb-2 p-4" @click="provision_onu(index, responseItem.port, responseItem.slot, responseItem.pon, item.serial)">
            <div class="flex space-x-2 items-center justify-between">
              <div>
                <h2 class="font-bold">1/1/{{ responseItem.slot }}/{{ responseItem.pon }}/{{ responseItem.port }}</h2>
              </div>
              <p class="text-green-600 font-medium">{{ responseItem.status }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.olt_card {
  user-select: text;
  border: 2px solid #e1e1e1;
  border-radius: .5rem;
}

.onu_card {
  user-select: text;
  border: 2px solid #e1e1e1;
  border-radius: .5rem;
}

.slot_id_card {
  user-select: text;
  border: 2px solid #e1e1e1;
  border-radius: .5rem;
}

.page-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.olt-list-container {
  width: 30%;
  overflow-y: auto;
}

.olt-details-container {
  width: 70%;
  overflow-y: auto;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.loading {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes ldio-kh5o7t8djcs {
  0% { transform: rotate(0) }
  100% { transform: rotate(360deg) }
}
.ldio-kh5o7t8djcs div { box-sizing: border-box!important }
.ldio-kh5o7t8djcs > div {
  position: absolute;
  width: 72px;
  height: 72px;
  top: 14px;
  left: 14px;
  border-radius: 50%;
  border: 8px solid #000;
  border-color: #ff8200 transparent #ff8200 transparent;
  animation: ldio-kh5o7t8djcs 1s linear infinite;
}
.ldio-kh5o7t8djcs > div:nth-child(2) { border-color: transparent }
.ldio-kh5o7t8djcs > div:nth-child(2) div {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}
.ldio-kh5o7t8djcs > div:nth-child(2) div:before, .ldio-kh5o7t8djcs > div:nth-child(2) div:after {
  content: "";
  display: block;
  position: absolute;
  width: 8px;
  height: 8px;
  top: -8px;
  left: 24px;
  background: #ff8200;
  border-radius: 50%;
  box-shadow: 0 64px 0 0 #ff8200;
}
.ldio-kh5o7t8djcs > div:nth-child(2) div:after {
  left: -8px;
  top: 24px;
  box-shadow: 64px 0 0 0 #ff8200;
}
.loadingio-spinner-dual-ring-pelu7rtlzto {
  width: 50px;
  height: 50px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-kh5o7t8djcs {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.5);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-kh5o7t8djcs div { box-sizing: content-box; }
/* generated by https://loading.io/ */

</style>

