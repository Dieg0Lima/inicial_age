<template>
  <div
    class="w-screen h-screen bg-ellipse bg-white flex flex-col overflow-hidden"
  >
    <!-- <div class="flex flex-row" style="height: 5%">
      <div>
        <router-link to="/atendimento/detalhes/inicio">Informações Gerais</router-link>
      </div>
      <div>
        <router-link to="/atendimento/detalhes/acoes">Menu de ações</router-link>
      </div>
    </div> -->
    <div class="flex-grow gap-2 flex p-2">
      <!-- Coluna Esquerda com Quadrados -->
      <div class="flex-1 p-1 grid grid-cols-2 grid-rows-2 gap-2">
        <!-- Quadrado 1 -->
        <clientCard :client="newClient" />
        <!-- Quadrado 2 -->
        <!-- <connectionCard :connection="newConnection" /> -->
        <!-- Quadrado 3 -->
        <!-- <contractCard :contract="newContract" /> -->
        <!-- Quadrado 4 -->
        <!-- <appCard :app="newApp" /> -->
      </div>
      <!-- Coluna Direita -->
      <div class="flex-1 flex flex-col space-y-2">
        <!-- Card de Dados da Fatura -->
        <!-- <financialCard :financial="newFinancial" /> -->

        <!-- Card de Dados dos Chamados -->
        <!-- <assignmentCard :assignment="newAssignment" /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from "vue";
// import { defineProps } from "vue";
import clientCard from "@/components/attendant/clientDetails/client_card.vue";
// import connectionCard from "@/components/attendant/clientDetails/connection_card.vue";
// import contractCard from "@/components/attendant/clientDetails/contract_card.vue";
// import appCard from "@/components/attendant/clientDetails/app_card.vue";
// import financialCard from "@/components/attendant/clientDetails/financial_card.vue";
// import assignmentCard from "@/components/attendant/clientDetails/assignment_card.vue";

import { useRoute } from "vue-router";
const route = useRoute();
const clientId = route.params.clientId;
// const props = defineProps({
//   details: {
//     type: Object,
//     default: () => ({}),
//   },
// });

// const dataClient = ref(props.details.client);
// const newClient = ref(dataClient.value);

// const dataConnection = ref(props.details.connection);
// const newConnection = ref(dataConnection.value);

// const dataContract = ref(props.details.contract);
// const newContract = ref(dataContract.value);

// const dataApp = ref(props.details.app);
// const newApp = ref(dataApp.value);

// const dataFinancial = ref(props.details.financial);
// const newFinancial = ref(dataFinancial.value);

// const dataAssignment = ref(props.details.assignment);
// const newAssignment = ref(dataAssignment.value);
</script>

<style lang="scss" scoped>
.bg-ellipse {
  background-image: url("/src/assets/ellipses/Ellipse-3.png");
  background-position: center;
  background-size: cover;
}
</style>
