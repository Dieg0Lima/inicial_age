<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import axios from 'axios';
import { format } from 'date-fns';

const route = useRoute();
const contractNumber = ref('');
const equipmentSerial = ref('');
const connection = ref('');
const contracts = ref({});
const FAT = ref({});
const assignments = ref({});
const authentications = ref({});
const contractStatus = ref('');


onMounted(async () => {
  contractNumber.value = route.params.id1;
  equipmentSerial.value = route.params.id;
  connection.value = route.params.id2;

  try {
    const response = await axios.get(`http://192.168.69.80:3000/api/contracts/${contractNumber.value}/details`, {
      params: {
        equipment_serial_number: equipmentSerial.value,
        connection: connection.value,
      }
    });
    contracts.value = response.data || [];
    contractStatus.value = response.data[0]?.v_status || 'Indefinido';
  } catch (error) {
    console.error("Erro ao buscar os detalhes do contrato:", error);
    contracts.value = [];
  }

  try {
    const responseFAT = await axios.get(`http://192.168.69.80:3000/financial_info/${contractNumber.value}`);
    FAT.value = responseFAT.data || {};
  } catch (error) {
    console.error("Erro ao buscar informações financeiras:", error);
    FAT.value = {};
  }

  try {
    const responseAssignments = await axios.get(`http://192.168.69.80:3000/assignments/${contractNumber.value}`);
    assignments.value = responseAssignments.data || [];
  } catch (error) {
    console.error("Erro ao buscar as atribuições:", error);
    assignments.value = [];
  }

  try {
    const responseAuthentication = await axios.get(`http://192.168.69.80:3000/equipment/${equipmentSerial.value}`);
    authentications.value = responseAuthentication.data || {};
  } catch (error) {
    console.error("Erro ao buscar autenticações:", error);
    authentications.value = {};
  }

});

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

function formatBillingFinalDateOrText(dateString) {
  const date = new Date(dateString);
  if (date.getFullYear() >= 2040) {
    return "NÃO FIDELIZADO";
  }
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}

function formatLastBlock(dateString) {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm:ss');
}

function formatText(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

function formatCPForCNPJ(value) {
  if (value && value.length === 11) {
    return `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9, 11)}`;
  } else if (value && value.length === 14) {
    return `${value.substring(0, 2)}.${value.substring(2, 5)}.${value.substring(5, 8)}/${value.substring(8, 12)}-${value.substring(12, 14)}`;
  }
  return '';
}

const isExpanded = ref(false);

function toggle() {
  isExpanded.value = !isExpanded.value;
}

const isExpandedAtt = ref(false);

function toggleAtt() {
  isExpandedAtt.value = !isExpandedAtt.value;
}

const statusClass = (contract) => {
  if (contract.v_status === 'Normal') {
    return 'text-green';
  } else if (contract.v_status === 'Cancelado') {
    return 'text-red';
  } else {
    return '';
  }
};

const statusFATClass = (fat) => {
  if (fat.Boleto_situation === 'Pago') {
    return 'text-green';
  } else if (fat.Boleto_situation === 'Cancelado') {
    return 'text-red';
  } else {
    return '';
  }
};

</script>

<template>
  <div class="page-container">
    <div class="grid grid-cols-3">
      <div class="col-span-1" v-for="contract in contracts" :key="contract.contract_number">
        <div class="contract-card mt-2 mb-2">
          <div class="flex space-x-2 items-center">
            <font-awesome-icon :icon="['fas', 'user']" />
            <h1 class="font-extrabold">Dados do Cliente</h1>
          </div>
          <div class="mt-4 flex justify-between">
            <div v-if="contract.client_name">
              <p class="font-bold">Nome</p>
              <p>{{ formatText(contract.client_name) }}</p>
            </div>
            <div v-if="contract.tx_id">
              <p class="font-bold">CPF/CNPJ</p>
              <p>{{ formatCPForCNPJ(contract.tx_id) }}</p>
            </div>
          </div>
          <div class="mt-2 flex justify-between">
            <div v-if="contract.email">
              <p class="font-bold">E-mail</p>
              <p>{{ contract.email }}</p>
            </div>
            <div class="mr-4" v-if="contract.cell_phone_1">
              <p class="font-bold">Contato 1</p>
              <p>{{ contract.cell_phone_1 }}</p>
            </div>
            <div v-if="contract.cell_phone_2">
              <p class="font-bold">Contato 2</p>
              <p>{{ contract.cell_phone_2 }}</p>
            </div>
          </div>
          <div class="mt-2 flex justify-between">
            <div v-if="contract.street">
              <p class="font-bold">Endereço</p>
              <p>{{ contract.street }} {{ contract.number }}</p>
            </div>
            <div v-if="contract.neighborhood">
              <p class="font-bold">Bairro</p>
              <p>{{ contract.neighborhood }}</p>
            </div>
            <div v-if="contract.postal_code">
              <p class="font-bold">CEP</p>
              <p>{{ contract.postal_code }}</p>
            </div>
          </div>
          <div class="mt-2 flex justify-between">
            <div v-if="contract.complement">
              <p class="font-bold">Complemento</p>
              <p>{{ contract.complement }}</p>
            </div>
          </div>
        </div>
        <div class="contract-card mt-2 mb-2">
          <div class="flex space-x-2 items-center">
            <font-awesome-icon :icon="['fas', 'file']" />
            <h1 class="font-extrabold">Dados do Contrato</h1>
          </div>
          <div class="mt-4 flex justify-between">
            <div v-if="contract.id">
              <p class="font-bold">Contrato</p>
              <p>{{ contract.id }}</p>
            </div>
            <div v-if="contract.v_status">
              <p class="font-bold flex">Status</p>
              <p class="font-bold" :class="statusClass(contract)">{{ contract.v_status }}</p>
            </div>
          </div>
          <div class="mt-2 flex justify-between">
            <div>
              <p class="font-bold">Bloqueios</p>
              <p>{{ contract.desbloqueios }}</p>
            </div>
            <div class="mr-4" v-if="contract.ultimo_bloqueio">
              <p class="font-bold">Último Bloqueio</p>
              <p>{{ formatLastBlock(contract.ultimo_bloqueio) }}</p>
            </div>
          </div>
          <div class="mt-2 flex justify-between">
            <div v-if="contract.billing_beginning_date">
              <p class="font-bold">Inicio do Contrato</p>
              <p>{{ formatDate(contract.billing_beginning_date) }}</p>
            </div>
            <div v-if="contract.billing_final_date">
              <p class="font-bold">Fim da Vigência</p>
              <p>{{ formatBillingFinalDateOrText(contract.billing_final_date) }}</p>
            </div>
          </div>
        </div>
        <div class="contract-card mt-2 mb-2">
          <div class="flex mb-4 space-x-2 items-center justify-between">
            <div class="flex space-x-2 items-center">
              <font-awesome-icon :icon="['fas', 'file-invoice-dollar']" />
              <h1 class="font-extrabold">Dados de Fatura</h1>
            </div>
            <div class="cursor-pointer" @click="toggle">
              <font-awesome-icon :icon="isExpanded ? ['fas', 'chevron-up'] : ['fas', 'chevron-down']" />
            </div>
          </div>
          <div v-if="isExpanded">
            <div class="contract-card" v-for="fat in FAT" :key="fat.contract_number">
              <div class="flex justify-between">
                <div>
                  <div v-if="fat.fat_number">
                    <p class="font-bold">Fatura</p>
                    <p>{{ fat.fat_number }}</p>
                  </div>
                  <div class="mt-2" v-if="fat.expiration_date">
                    <p class="font-bold">Data de vencimento</p>
                    <p>{{ formatDate(fat.expiration_date) }}</p>
                  </div>
                </div>
                <div>
                  <div v-if="fat.Boleto_situation">
                    <p class="font-bold">Status</p>
                    <p :class="statusFATClass(fat)">{{ fat.Boleto_situation }}</p>
                  </div>
                  <div class="mt-2" v-if="fat.value">
                    <p class="font-bold">Valor</p>
                    <p>{{ fat.value }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1">
          <div  class="contract-card mt-2 mb-2">
            <div class="flex mb-4 space-x-2 items-center justify-between">
              <div class="flex space-x-2 items-center">
                <font-awesome-icon :icon="['fas', 'ticket']" />
                <h1 class="font-extrabold">Aberturas de Atendimento</h1>
              </div>
              <div class="cursor-pointer" @click="toggleAtt">
                <font-awesome-icon :icon="isExpandedAtt ? ['fas', 'chevron-up'] : ['fas', 'chevron-down']" />
              </div>
            </div>
            <div v-if="isExpandedAtt">
              <div v-for="assignments in assignments" :key="assignments.tag_id" class="contract-card">
                <div class="flex justify-between">
                  <div class="mr-4">
                    <div v-if="assignments.assignment_title">
                      <p class="font-bold">Atendimento</p>
                      <p>{{ assignments.assignment_title }}</p>
                    </div>
                    <div class="mt-2" v-if="assignments.name">
                      <p class="font-bold">Atendente</p>
                      <p>{{ assignments.name }}</p>
                    </div>
                  </div>
                  <div>
                    <div class="mt-2" v-if="assignments.assignment_created">
                      <p class="font-bold">Data</p>
                      <p>{{ formatDate(assignments.assignment_created) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1" v-for="authentication in authentications" :key="authentication.equipment">
        <div class="contract-card mt-2 mb-2">
          <div class="flex space-x-2 items-center">
            <font-awesome-icon :icon="['fas', 'user']" />
            <h1 class="font-extrabold">Dados de Conexão</h1>
          </div>
          <div class="mt-4 flex justify-between">
            <div v-if="authentication.product">
              <p class="font-bold">Plano</p>
              <p>{{ authentication.product }}</p>
            </div>
          </div>
          <div class="mt-4 flex justify-between">
            <div v-if="authentication.equipment">
              <p class="font-bold">Equipamento</p>
              <p>{{ authentication.equipment }}</p>
            </div>
            <div v-if="authentication.pop">
              <p class="font-bold">POP</p>
              <p>{{ authentication.pop }}</p>
            </div>
            <div v-if="authentication.status">
              <p class="font-bold">Status</p>
              <p>{{ authentication.status }}</p>
            </div>
          </div>
          <div class="mt-2 flex justify-between">
            <div v-if="authentication.slot">
              <p class="font-bold">Slot</p>
              <p>{{ authentication.slot }}</p>
            </div>
            <div class="mr-4" v-if="authentication.pon">
              <p class="font-bold">PON</p>
              <p>{{ authentication.pon }}</p>
            </div>
            <div v-if="authentication.olt_id">
              <p class="font-bold">ID na OLT</p>
              <p>{{ authentication.olt_id }}</p>
            </div>
          </div>
          <div class="mt-4 flex ">
            <div class="mr-8" v-if="authentication.ssid">
              <p class="font-bold">SSID do Wi-Fi</p>
              <p>{{ authentication.ssid }}</p>
            </div>
            <div v-if="authentication.password">
              <p class="font-bold">Senha do Wi-Fi</p>
              <p>{{ authentication.password }}</p>
            </div>
            <div v-if="authentication.postal_code">
              <p class="font-bold">CEP</p>
              <p>{{ authentication.postal_code }}</p>
            </div>
          </div>
          <div class="mt-2 flex justify-between">
            <div v-if="authentication.complement">
              <p class="font-bold">Complemento</p>
              <p>{{ authentication.complement }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1">
        <div v-if="contracts.length > 0">
          <router-link :to="{ name: 'olt-list', params: { contractId: contracts[0].id } }">
            <div class="function-btn p-4 mt-4 rounded text-white font-medium text-center bg-amber-500">
              <span>Provisionamento</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  background-color: whitesmoke;
}

.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}

.contract-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  user-select: text;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.col-span-1 {
  grid-column: span 1;
}

.text-green {
  color: green;
}

.text-red {
  color: red;
}

</style>
