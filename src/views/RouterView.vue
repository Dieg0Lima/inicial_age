<script setup>
import { ref } from "vue";

const searchTerm = ref("");
// const searchResults = ref([]);
// const searchType = ref("");

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
];

// const isClienteSearch = (term) => {
//   // Implemente sua lógicaaqui. Exemplo:
//   return isNaN(term);
// };

// const search = async () => {
//   if (isClienteSearch(searchTerm.value)) {
//     searchType.value = "cliente";
//     searchResults.value = await fetchContratosByCliente(searchTerm.value);
//   } else {
//     searchType.value = "contrato";
//     searchResults.value = await fetchConexoesByContrato(searchTerm.value);
//   }
// };

// Funções de busca (a serem implementadas)
//sync function fetchContratosByCliente(cliente) {
// Lógica de busca
//}

//async function fetchConexoesByContrato(contrato) {
// Lógica de busca
//}
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
        <label>Voltar</label>
      </router-link>
    </div>
    <div class="title-page">
      <label>Faça aqui</label>
      <label class="gradient-text">Pesquisa do Cliente</label>
      <label>Em Segundos</label>
    </div>
    <div class="subtitle-page">
      <label
        >Experimente realizar a consulta com Nome, CPF, Contrato ou ONU</label
      >
    </div>
    <div class="search-container">
      <input type="text" placeholder="Digite aqui..." v-model="searchTerm" />
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

    <div class="contract-item">
      <label>Dados do Contrato</label>
      <div v-for="item in sampleData" :key="item.Contrato">
        <label>{{ item.Contrato }}</label>
      </div>
    </div>

    <!-- <div v-if="searchType === 'cliente'">
      <h3>Contratos do Cliente:</h3>
      <ul>
        <li v-for="contrato in searchResults" :key="contrato.id">
          {{ contrato.info }}
        </li>
      </ul>
    </div>

    <div v-if="searchType === 'contrato'">
      <h3>Conexões do Contrato:</h3>
      <ul>
        <li v-for="conexao in searchResults" :key="conexao.id">
          {{ conexao.info }}
        </li>
      </ul>
    </div> -->
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
  font-size: 3rem;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.gradient-text {
  background-image: linear-gradient(to right, #ffb600, #f93822);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 3.5rem;
  font-weight: 800;
}

.subtitle-page {
  margin-top: 3vh;
  font-size: 1rem;
}

.btn-back {
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

.search-container {
  padding: 0.5rem;
  margin-top: 4vh;
  display: flex;
  flex-direction: row;
  border: 2px solid #e3e3e3;
  border-radius: 1rem;

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

  input {
    margin-left: 1vw;
    width: 30vw;
    height: 5vh;
    border: none;
    font-size: 1.5rem;
  }

  input::placeholder {
    font-size: 1.2rem;
    color: #00000050;
  }

  input:focus {
    outline: none;
    border: none;
  }
}
</style>
