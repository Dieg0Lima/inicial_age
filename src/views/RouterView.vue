<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const searchTerm = ref("");
const searchType = ref("contract_number");

const contracts = ref(null);
const error = ref(null);

const fetchContract = async () => {
  error.value = null;

  if (!searchTerm.value) {
    error.value = "Por favor, insira um termo de pesquisa.";
    return;
  }

  try {
    const params = {
      [searchType.value]: searchTerm.value
    };
    const response = await axios.get(`http://192.168.69.80:3000/api/contracts`, { params });
    contracts.value = response.data.contracts;
  } catch (e) {
    error.value = e.response?.data?.error || e.message;
  }
};

onMounted(fetchContract);

</script>

<template>
  <div class="page-container">
    <div class="btn-back">
      <router-link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
          <path fill="#ffffff"
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
        </svg>
      </router-link>
    </div>
    <div class="title-page">
      <label>Pesquisar</label>
    </div>
    <div class="subtitle-page">
      <label>Experimente realizar a consulta com Nome, CPF, Telefone, Contrato, ONU e mais!</label>
    </div>
    <form @submit.prevent="fetchContract" class="search-container">
      <input type="text" placeholder="Digite aqui..." v-model="searchTerm" />
      <div class="search-type-selector mr-2">
        <select v-model="searchType" class="bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 p-2">
          <option value="contract_number">Número do Contrato</option>
          <option value="client_name">Nome do Cliente</option>
          <option value="tx_id">CPF/CNPJ</option>
          <option value="email">Email</option>
          <option value="cell_phone_1">Telefone 1</option>
          <option value="cell_phone_2">Telefone 2</option>
          <option value="postal_code">CEP</option>
          <option value="v_status">STATUS</option>
        </select>
      </div>
      <div class="options-container">
        <button type="submit" class="btn-search">
          <label>Pesquisar</label>
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
            <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6
          457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4
          25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416
          208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </button>
      </div>
    </form>

    <div class="grid-container">
      <div class="contract-card" v-for="contract in contracts" :key="contract.contract_number">
          <div class="flex space-x-2 items-center">
            <font-awesome-icon :icon="['fas', 'user']" />
            <h1 class="font-extrabold">Dados do Contrato</h1>
          </div>
        <div class="mt-4 flex justify-between">
          <div>
            <p class="font-bold">Nome</p>
            <p>{{ contract.client_name}}</p>
          </div>
          <div>
            <p class="font-bold">CPF/CNPJ</p>
            <p>{{ contract.tx_id}}</p>
          </div>
        </div>
          <div class="mt-2 flex justify-between">
            <div>
              <p class="font-bold">Contrato</p>
              <p>{{ contract.contract_number }}</p>
            </div>
            <div>
              <p class="font-bold flex">Status</p>
              <p>{{ contract.v_status }}</p>
            </div>
            <div>
              <p class="font-bold">Estágio</p>
              <p>{{ contract.v_stage }}</p>
            </div>
            <div>
              <p class="font-bold">Equipamento</p>
              <p>{{ contract.equipment_serial_number }}</p>
            </div>
          </div>
        <div class="mt-2 flex justify-between">
            <div>
              <p class="font-bold">E-mail</p>
              <p>{{ contract.email }}</p>
            </div>
          <div>
            <p class="font-bold">Contato 1</p>
            <p>{{ contract.cell_phone_1 }}</p>
          </div>
          <div>
            <p class="font-bold">Contato 2</p>
            <p>{{ contract.cell_phone_2 }}</p>
          </div>
          </div>
        <div class="mt-2 flex justify-between">
          <div>
            <p class="font-bold">Logradouro</p>
            <p>{{ contract.neighborhood }}</p>
          </div>
          <div>
            <p class="font-bold">Rua</p>
            <p>{{ contract.street }}</p>
          </div>
          <div>
            <p class="font-bold">CEP</p>
            <p>{{ contract.postal_code }}</p>
          </div>
        </div>
        <div class="mt-2 flex justify-between">
          <div>
            <p class="font-bold">Descrição</p>
            <p>{{ contract.complement }}</p>
          </div>
        </div>
        </div>
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
}

input {
  margin-left: .5vw;
  margin-right: .5vw;
  width: 35vw;
  height: 5vh;
  border: none;
  font-size: 1.2rem;
}

input::placeholder {
  font-size: 1rem;
  color: #00000050;
}

input:focus {
  outline: none;
  border: none;
}

.grid-container {
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
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
</style>
