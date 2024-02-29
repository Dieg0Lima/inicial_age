<script setup>
import { ref } from 'vue';
import { nextTick } from 'vue';
import axios from '@/api/axios';

const searchTerm = ref("");

const contracts = ref(null);
const error = ref(null);
const currentPage = ref(1);
const totalPages = ref(0);
const totalContracts = ref(0);

const isLoading = ref(false);

const determineSearchType = (term) => {
  if (isCPF(term)) {
    return 'tx_id';
  } else if (isCNPJ(term)) {
    return 'tx_id';
  } else if (isContractNumber(term)) {
    return 'id';
  } else if (isName(term)) {
    return 'client_name';
  } else if (isEquipmentSerial(term)) {
    return 'equipment_serial_number';
  }
  return null;
};

const fetchContract = async (page = 1) => {
  error.value = null;

  if (!searchTerm.value) {
    error.value = "Por favor, insira um termo de pesquisa.";
    return;
  }

  isLoading.value = true;
  const searchType = determineSearchType(searchTerm.value);

  if (!searchType) {
    error.value = "Termo de pesquisa inválido.";
    isLoading.value = false;
    return;
  }

  try {
    const params = {
      [searchType]: searchTerm.value,
      page: page
    };
    const response = await axios.get(`https://ageatende/contracts`, { params });
    contracts.value = response.data.contracts;
    currentPage.value = response.data.meta.current_page;
    totalPages.value = response.data.meta.total_pages;
    totalContracts.value = response.data.meta.total_count;
  } catch (e) {
    error.value = e.response?.data?.error || e.message;
  } finally {
    isLoading.value = false;
  }
};

const changePage = async (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    await fetchContract(newPage);

    await nextTick(() => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }
};

const statusClass = (contract) => {
  if (contract.v_status === 'Normal') {
    return 'text-green';
  } else if (contract.v_status === 'Cancelado') {
    return 'text-red';
  } else {
    return '';
  }
};

const isName = (term) => {
  const nameRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ' -]+$/;
  return nameRegex.test(term);
};

const isContractNumber = (term) => {
  const numberRegex = /^\d+$/;
  return numberRegex.test(term) && !isCPF(term) && !isCNPJ(term);
};

const isCPF = (term) => {
  const cpfRegex = /^\d{11}$/;
  return cpfRegex.test(term);
};

const isCNPJ = (term) => {
  const cnpjRegex = /^\d{14}$/;
  return cnpjRegex.test(term);
};

const isEquipmentSerial = (term) => {
  return term.startsWith("ALCL");
};

</script>

<template>
  <div class="page-container">
    <div class="title-page">
      <label>Pesquisar</label>
    </div>
    <div class="subtitle-page">
      <label>Experimente realizar a consulta com Nome, CPF, Telefone, Contrato, ONU e mais!</label>
    </div>
    <form @submit.prevent="fetchContract" class="search-container">
      <input type="text" placeholder="Digite aqui..." v-model="searchTerm" />
      <div class="options-container">
        <button class="button-with-spinner px-4 py-2 text-sm font-medium rounded text-white bg-orange-500 hover:bg-orange-600 transition">
          <font-awesome-icon v-show="isLoading" class="spinner animate-spin h-5 w-5" :icon="['fas', 'spinner']" />
          <font-awesome-icon :class="{'invisible': isLoading}" class="mr-4" :icon="['fas', 'magnifying-glass']" />
          <span :class="{'invisible': isLoading}">Pesquisar</span>
        </button>
      </div>

    </form>

    <div class="grid-container">
      <div class="contract-card" v-for="contract in contracts" :key="contract.equipment_serial_number">
        <router-link :to="{ name: 'detalhes-contrato', params: { id: contract.equipment_serial_number || '-', id1: contract.id, id2: contract.connection_id || '-' } }">
          <div class="flex space-x-2 items-center">
            <font-awesome-icon :icon="['fas', 'user']"/>
            <h1 class="font-extrabold">Dados do Contrato</h1>
          </div>
          <div class="mt-4 flex justify-between">
            <div v-if="contract.client_name">
              <p class="font-bold">Nome</p>
              <p>{{ contract.client_name }}</p>
            </div>
            <div v-if="contract.tx_id">
              <p class="font-bold">CPF/CNPJ</p>
              <p>{{ contract.tx_id }}</p>
            </div>
          </div>
          <div class="mt-2 flex justify-between">
            <div v-if="contract.id">
              <p class="font-bold">Contrato</p>
              <p>{{ contract.id }}</p>
            </div>
            <div v-if="contract.v_status">
              <p class="font-bold flex">Status</p>
              <p class="font-bold" :class="statusClass(contract)">{{ contract.v_status }}</p>
            </div>
            <div v-if="contract.v_stage">
              <p class="font-bold">Estágio</p>
              <p>{{ contract.v_stage }}</p>
            </div>
            <div v-if="contract.equipment_serial_number || 'sem serial'">
              <p class="font-bold">Equipamento</p>
              <p>{{ contract.equipment_serial_number || 'Não possui equipamento' }}</p>
            </div>
          </div>
          <div class="mt-2 flex justify-between">
            <div v-if="contract.email">
              <p class="font-bold">E-mail</p>
              <p>{{ contract.email }}</p>
            </div>
            <div v-if="contract.cell_phone_1">
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
              <p class="font-bold">Descrição</p>
              <p>{{ contract.complement }}</p>
            </div>
          </div>
        </router-link>

      </div>
    </div>

    <div class="mb-6" v-if="totalPages > 1">
      <button class="mr-4" @click="changePage(currentPage - 1)" :class="{ 'disabled-class': currentPage <= 1 }" :disabled="currentPage <= 1">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button class="ml-4" @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>

  </div>
</template>

<style scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  background-color: whitesmoke;
}

.title-page {
  margin-top: 5vh;
  font-size: 2.5rem;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #333333;
}

.subtitle-page {
  margin-top: 2vh;
  font-size: 1rem;
  font-weight: 600;
  color: #444444;
}

.button-with-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.button-with-spinner .spinner {
  position: absolute;
}

.btn-back {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #ffffff;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  gap: 0 10px;
  position: absolute;
  margin-top: 2vh;
  margin-left: 2vw;
  left: 0;

  a {
    color: inherit;
    text-decoration: none;
    background-color: transparent;
    cursor: auto;
  }

  label {
    cursor: pointer;
    margin-left: 1vw;
  }

  svg {
    cursor: pointer;
  }
}

.options-container {
  display: flex;
}

.btn-options {
  display: flex;
  width: 1.5vw;
  margin-right: .8vw;
  cursor: pointer;
}

.btn-search {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, #ffb600, #f93822);
  padding: 0.5rem 1rem;
  color: #ffffff;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  gap: 0 10px;

  label {
    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }
}

.search-container {
  padding: 0.2rem;
  margin-top: 4vh;
  display: flex;
  flex-direction: row;
  border: 2px solid #e3e3e3;
  border-radius: .5rem;
  background-color: #ffffff;
}

input {
  margin-left: .5vw;
  margin-right: .5vw;
  width: 35vw;
  height: 5vh;
  border: none;
  font-size: 1.2rem;
  background-color: #ffffff;
}

input::placeholder {
  font-size: 1rem;
  color: #00000050;
}

input:focus {
  outline: none;
  border: none;
}

.disabled-class {
  opacity: 0.5;
  cursor: not-allowed;
}

.grid-container {
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
  gap: 20px;
  padding: 20px;
}

.contract-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  user-select: text;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contract-card:hover {
  transform: scale(1.03);
}

.contract-details {
  margin-top: 10px;
}

.text-green {
  color: green;
}

.text-red {
  color: red;
}
</style>
