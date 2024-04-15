<template>
  <div class="flex-1 p-1 grid grid-cols-2 grid-rows-2 gap-2">
    <ClientCard :client="clientDetailsStore.client" />
    <ConnectionCard :connection="clientDetailsStore.connection" />
    <ContractCard :contract="clientDetailsStore.contract" />
    <AppCard :app="clientDetailsStore.app" />
  </div>
  <div class="flex-1 flex flex-col space-y-2">
    <FinancialCard :financial="clientDetailsStore.financial" />
    <AssignmentCard :assignment="clientDetailsStore.assignment" />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
const route = useRoute();

const ClientCard = defineAsyncComponent(() =>
  import("@/components/attendant/clientDetails/client_card.vue")
);
const ConnectionCard = defineAsyncComponent(() =>
  import("@/components/attendant/clientDetails/connection_card.vue")
);
const ContractCard = defineAsyncComponent(() =>
  import("@/components/attendant/clientDetails/contract_card.vue")
);
const AppCard = defineAsyncComponent(() =>
  import("@/components/attendant/clientDetails/app_card.vue")
);
const FinancialCard = defineAsyncComponent(() =>
  import("@/components/attendant/clientDetails/financial_card.vue")
);
const AssignmentCard = defineAsyncComponent(() =>
  import("@/components/attendant/clientDetails/assignment_card.vue")
);

import { useClientDetailsStore } from "@/stores/clientDetailsStore";
const clientDetailsStore = useClientDetailsStore();

const clientId = route.params.id;

onMounted(async () => {
  if (!clientDetailsStore.client) {
    await clientDetailsStore.fetchClientDetails(clientId);
  }
});
</script>

<style lang="scss" scoped></style>
