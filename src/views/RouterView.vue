<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const searchTerm = ref("");

const contract = ref(null);
const error = ref(null);

const fetchContract = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/contracts/69352');
    contract.value = response.data;
  } catch (e) {
    error.value = e.message;
  }
};

onMounted(fetchContract);


const sampleData = [
  {
    Contrato: "C12345",
    Cliente: "Empresa XYZ",
    Status: "Contrato: Ativo",
    Estagio: "Contrato: Em andamento",
    IniciodoContrato: "2023-01-15",
    Telefone1: "11987654321",
    Telefone2: "11987654322",
    CPF: "123.456.789-00",
    Email: "cliente@empresaxyz.com",
    Endereco: "Rua Exemplo, 123",
    Cidade: "São Paulo",
    CEP: "12345-678",
    Plano: "Fibra Ótica 100MB",
    OLT: "OLT-Modelo123",
    Usuario: "usuarioXYZ",
    Senha: "senha123",
    IdONU: "ONU12345678",
    Slot: "5",
    Port: "10",
    Splitter: "Splitter-ModeloA",
  },
  {
    Contrato: "C12345",
    Cliente: "Empresa XYZ",
    Status: "Contrato: Ativo",
    Estagio: "Contrato: Em andamento",
    IniciodoContrato: "2023-01-15",
    Telefone1: "11987654321",
    Telefone2: "11987654322",
    CPF: "123.456.789-00",
    Email: "cliente@empresaxyz.com",
    Endereco: "Rua Exemplo, 123",
    Cidade: "São Paulo",
    CEP: "12345-678",
    Plano: "Fibra Ótica 100MB",
    OLT: "OLT-Modelo123",
    Usuario: "usuarioXYZ",
    Senha: "senha123",
    IdONU: "ONU12345678",
    Slot: "5",
    Port: "10",
    Splitter: "Splitter-ModeloA",
  },
  {
    Contrato: "C12345",
    Cliente: "Empresa XYZ",
    Status: "Contrato: Ativo",
    Estagio: "Contrato: Em andamento",
    IniciodoContrato: "2023-01-15",
    Telefone1: "11987654321",
    Telefone2: "11987654322",
    CPF: "123.456.789-00",
    Email: "cliente@empresaxyz.com",
    Endereco: "Rua Exemplo, 123",
    Cidade: "São Paulo",
    CEP: "12345-678",
    Plano: "Fibra Ótica 100MB",
    OLT: "OLT-Modelo123",
    Usuario: "usuarioXYZ",
    Senha: "senha123",
    IdONU: "ONU12345678",
    Slot: "5",
    Port: "10",
    Splitter: "Splitter-ModeloA",
  },
  {
    Contrato: "C12345",
    Cliente: "Empresa XYZ",
    Status: "Contrato: Ativo",
    Estagio: "Contrato: Em andamento",
    IniciodoContrato: "2023-01-15",
    Telefone1: "11987654321",
    Telefone2: "11987654322",
    CPF: "123.456.789-00",
    Email: "cliente@empresaxyz.com",
    Endereco: "Rua Exemplo, 123",
    Cidade: "São Paulo",
    CEP: "12345-678",
    Plano: "Fibra Ótica 100MB",
    OLT: "OLT-Modelo123",
    Usuario: "usuarioXYZ",
    Senha: "senha123",
    IdONU: "ONU12345678",
    Slot: "5",
    Port: "10",
    Splitter: "Splitter-ModeloA",
  },
  {
    Contrato: "C12345",
    Cliente: "Empresa XYZ",
    Status: "Contrato: Ativo",
    Estagio: "Contrato: Em andamento",
    IniciodoContrato: "2023-01-15",
    Telefone1: "11987654321",
    Telefone2: "11987654322",
    CPF: "123.456.789-00",
    Email: "cliente@empresaxyz.com",
    Endereco: "Rua Exemplo, 123",
    Cidade: "São Paulo",
    CEP: "12345-678",
    Plano: "Fibra Ótica 100MB",
    OLT: "OLT-Modelo123",
    Usuario: "usuarioXYZ",
    Senha: "senha123",
    IdONU: "ONU12345678",
    Slot: "5",
    Port: "10",
    Splitter: "Splitter-ModeloA",
  },
  {
    Contrato: "C12345",
    Cliente: "Empresa XYZ",
    Status: "Contrato: Ativo",
    Estagio: "Contrato: Em andamento",
    IniciodoContrato: "2023-01-15",
    Telefone1: "11987654321",
    Telefone2: "11987654322",
    CPF: "123.456.789-00",
    Email: "cliente@empresaxyz.com",
    Endereco: "Rua Exemplo, 123",
    Cidade: "São Paulo",
    CEP: "12345-678",
    Plano: "Fibra Ótica 100MB",
    OLT: "OLT-Modelo123",
    Usuario: "usuarioXYZ",
    Senha: "senha123",
    IdONU: "ONU12345678",
    Slot: "5",
    Port: "10",
    Splitter: "Splitter-ModeloA",
  },
  {
    Contrato: "C12345",
    Cliente: "Empresa XYZ",
    Status: "Contrato: Ativo",
    Estagio: "Contrato: Em andamento",
    IniciodoContrato: "2023-01-15",
    Telefone1: "11987654321",
    Telefone2: "11987654322",
    CPF: "123.456.789-00",
    Email: "cliente@empresaxyz.com",
    Endereco: "Rua Exemplo, 123",
    Cidade: "São Paulo",
    CEP: "12345-678",
    Plano: "Fibra Ótica 100MB",
    OLT: "OLT-Modelo123",
    Usuario: "usuarioXYZ",
    Senha: "senha123",
    IdONU: "ONU12345678",
    Slot: "5",
    Port: "10",
    Splitter: "Splitter-ModeloA",
  },
  {
    Contrato: "C12345",
    Cliente: "Empresa XYZ",
    Status: "Contrato: Ativo",
    Estagio: "Contrato: Em andamento",
    IniciodoContrato: "2023-01-15",
    Telefone1: "11987654321",
    Telefone2: "11987654322",
    CPF: "123.456.789-00",
    Email: "cliente@empresaxyz.com",
    Endereco: "Rua Exemplo, 123",
    Cidade: "São Paulo",
    CEP: "12345-678",
    Plano: "Fibra Ótica 100MB",
    OLT: "OLT-Modelo123",
    Usuario: "usuarioXYZ",
    Senha: "senha123",
    IdONU: "ONU12345678",
    Slot: "5",
    Port: "10",
    Splitter: "Splitter-ModeloA",
  },
  {
    Contrato: "C12345",
    Cliente: "Empresa XYZ",
    Status: "Contrato: Ativo",
    Estagio: "Contrato: Em andamento",
    IniciodoContrato: "2023-01-15",
    Telefone1: "11987654321",
    Telefone2: "11987654322",
    CPF: "123.456.789-00",
    Email: "cliente@empresaxyz.com",
    Endereco: "Rua Exemplo, 123",
    Cidade: "São Paulo",
    CEP: "12345-678",
    Plano: "Fibra Ótica 100MB",
    OLT: "OLT-Modelo123",
    Usuario: "usuarioXYZ",
    Senha: "senha123",
    IdONU: "ONU12345678",
    Slot: "5",
    Port: "10",
    Splitter: "Splitter-ModeloA",
  },
  {
    Contrato: "C12345",
    Cliente: "Empresa XYZ",
    Status: "Contrato: Ativo",
    Estagio: "Contrato: Em andamento",
    IniciodoContrato: "2023-01-15",
    Telefone1: "11987654321",
    Telefone2: "11987654322",
    CPF: "123.456.789-00",
    Email: "cliente@empresaxyz.com",
    Endereco: "Rua Exemplo, 123",
    Cidade: "São Paulo",
    CEP: "12345-678",
    Plano: "Fibra Ótica 100MB",
    OLT: "OLT-Modelo123",
    Usuario: "usuarioXYZ",
    Senha: "senha123",
    IdONU: "ONU12345678",
    Slot: "5",
    Port: "10",
    Splitter: "Splitter-ModeloA",
  },
  {
    Contrato: "C12345",
    Cliente: "Empresa XYZ",
    Status: "Contrato: Ativo",
    Estagio: "Contrato: Em andamento",
    IniciodoContrato: "2023-01-15",
    Telefone1: "11987654321",
    Telefone2: "11987654322",
    CPF: "123.456.789-00",
    Email: "cliente@empresaxyz.com",
    Endereco: "Rua Exemplo, 123",
    Cidade: "São Paulo",
    CEP: "12345-678",
    Plano: "Fibra Ótica 100MB",
    OLT: "OLT-Modelo123",
    Usuario: "usuarioXYZ",
    Senha: "senha123",
    IdONU: "ONU12345678",
    Slot: "5",
    Port: "10",
    Splitter: "Splitter-ModeloA",
  },
];
</script>
<template>
  <div class="page-container">
    <div class="btn-back">
      <router-link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="16"
          viewBox="0 0 512 512"
        >
          <path
            fill="#ffffff"
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"
          />
        </svg>
      </router-link>
    </div>
    <div class="title-page">
      <label>Pesquisar</label>
    </div>
    <div class="subtitle-page">
      <label
        >Experimente realizar a consulta com Nome, CPF, Telefone, Contrato ou ONU</label
      >
    </div>
    <div class="search-container">
      <input type="text" placeholder="Digite aqui..." v-model="searchTerm" />
      <div class="options-container">
        <select v-model="selectedSearchType">
          <option value="nome">Nome</option>
          <option value="cpf">CPF</option>
          <option value="telefone">Telefone</option>
          <option value="contrato">Contrato</option>
          <option value="onu">ONU</option>
        </select>
        <div class="btn-search" @click="search">
          <label>Pesquisar</label>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
          >
            <path
                fill="#ffffff"
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6
          457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4
          25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416
          208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="grid-container">
      <div class="contract-card" v-for="item in sampleData" :key="item.Contrato">
        <h3>{{ item.Contrato }}</h3>
        <div class="contract-details">
          <p>{{ item.IdONU }}</p>
          <p>{{ item.CPF }}</p>
          <p>{{ item.Cliente }}</p>
          <p v-if="contract">ID do Contrato: {{ contract.id }}</p>
          <p v-if="error">{{ error }}</p>
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
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.contract-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  user-select: text;
}

.contract-details {
  margin-top: 10px;
}
</style>
