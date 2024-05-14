<template>
  <div
    class="bg-white border-2 border-solid border-slate-200 rounded-xl flex h-1/2 flex-row overflow-hidden p-2"
  >
    <div
      class="w-full h-full flex flex-col"
      v-if="assignment && assignment.length > 0"
    >
      <div
        class="flex flex-col justify-between items-center bg-age-colorOrange border-solid border-b border-slate-200 p-2 rounded-xl space-x-4"
      >
        <div class="flex flex-row justify-between items-center w-full">
          <div class="flex flex-row justify-center items-center">
            <div class="w-14">
              <assignmentIlustration />
            </div>
            <div class="font-semibold text-xl ml-2 text-white">
              Aberturas de atendimento
            </div>
          </div>
          <div class="w-6/12">
            <div
              class="flex items-center justify-around bg-white w-full h-12 space-x-2 rounded-xl text-sm"
            >
              <div class="flex flex-row items-center space-x-4">
                <span class="text-age-colorOrange font-bold text-lg"
                  >{{ totalAssignmentsCount }} Atendimentos totais</span
                >
              </div>

              <home-icon class="cursor-pointer p-4" @click="cleanProtocol" />
            </div>
          </div>
        </div>
        <div v-if="recentAssignmentsCount > 0" class="pt-2 p-2">
          <div class="flex flex-row space-x-2 items-center">
            <alertAssignment />

            <span class=" text-white font-bold text-lg">{{ recentAssignmentsCount }} Visitas técnicas nos últimos 30 dias</span>
          </div>
        </div>
      </div>
      <div
        v-if="selectedReport && selectedReport.length > 0"
        class="report-details w-full h-96 p-2 flex flex-row space-x-2"
      >
        <div
          class="flex flex-col w-full overflow-scroll border-r-2 border-solid border-slate-300 pr-6 mb-6"
        >
          <div class="flex flex-row items-center space-x-2 pt-4 pb-4">
            <img src="@/assets/icons/attendant/historyIcon.png" alt="" />
            <h1 class="font-semibold text-xl">Histórico de solicitação</h1>
          </div>
          <div
            v-for="report in selectedReport"
            :key="report.report_id"
            class="rounded-lg flex flex-col w-full h-full mb-2"
          >
            <div
              class="bg-white border-solid border-2 border-slate-300 rounded-xl p-4 space-y-2"
            >
              <div class="flex flex-col">
                <div
                  class="flex flex-row items-center space-x-2 justify-between"
                >
                  <div class="flex flex-row items-center space-x-1">
                    <h4 class="font-semibold text-sm mr-4">
                      #{{ report.report_id }} | {{ report.report_title }}
                    </h4>
                  </div>
                  <div
                    class="bg-white border-2 border-solid border-age-colorOrange rounded-xl flex flex-row text-xs ml-2"
                  >
                    <span class="p-1 font-bold text-age-colorOrange text-xs">{{
                      formatDate(report.report_beginning_date)
                    }}</span>
                  </div>
                </div>
              </div>
              <div
                class="flex flex-row items-center justify-between pb-6 space-x-2 border-b-2 border-solid border-slate-300"
              >
                <div class="flex flex-col text-sm">
                  <span class="text-gray-500 font-medium"
                    >De: {{ report.report_person || "Sem pessoa" }}</span
                  >
                </div>
                <div class="text-sm">
                  <span class="text-gray-500 font-medium">{{
                    report.report_team || "Sem equipe"
                  }}</span>
                </div>
              </div>
              <div class="flex flex-col space-y-2">
                <h4 class="font-semibold text-sm">
                  {{ report.report_title }}
                </h4>
                <h4 class="text-gray-500 font-medium text-sm">
                  {{ report.report_description }}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full space-y-3">
          <div
            v-if="selectedAssignment"
            class="flex flex-col w-full h-full overflow-scroll mb-4 ml-4"
          >
            <div
              v-for="incident in selectedIncident"
              :key="incident.incident_id"
              class="rounded-lg flex flex-col space-x-2 w-full"
            >
              <div class="flex flex-row items-center space-x-2 pt-4">
                <div class="w-7">
                  <networkIcon />
                </div>
                <h1 class="font-semibold text-xl">
                  {{ incident.incident_type }}
                </h1>
              </div>
              <div class="bg-white p-4 space-y-2">
                <div class="flex flex-col justify-between space-y-2 pb-6">
                  <div class="flex flex-col">
                    <span class="font-medium text-lg"> Descrição</span>
                  </div>
                  <div>
                    <span class="text-gray-500 font-medium text-sm">{{
                      incident.incident_description
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-row w-full h-full text-sm">
        <div
          class="w-full h-96 border-solid border-r border-slate-200 overflow-scroll pb-6"
        >
          <div
            v-for="item in formattedAssignments"
            :key="item.assignment_id"
            class="flex flex-row items-center p-4 space-x-8 cursor-pointer border-solid border-b border-slate-200 hover:bg-orange-100 rounded-xl"
            @click="selectProtocol(item.incidents[0].incident_protocol)"
          >
            <div class="flex flex-row space-x-8">
              <div class="w-16 flex justify-center items-center">
                <img
                  class="w-full"
                  src="@/assets/ilustrations/attendant/Icon.png"
                  alt=""
                />
              </div>
              <div class="flex flex-row space-x-8">
                <div class="flex flex-col text-sm w-44 space-y-1">
                  <span class="font-semibold">Protocolo</span>
                  <span>{{
                    item.incidents[0].incident_protocol || "Sem protocolo"
                  }}</span>
                  <span class="font-semibold">Protocolo</span>
                  <span>{{
                    item.incidents[0].incident_type || "Sem protocolo"
                  }}</span>
                </div>
                <div class="flex flex-col text-sm w-44 space-y-1">
                  <span class="font-semibold">Abertura</span>
                  <span>{{ item.beginning_date || "Sem data de inicio" }}</span>
                  <span class="font-semibold">Status</span>
                  <span>{{
                    item.conclusion_date || "Sem data de conclusão"
                  }}</span>
                </div>
                <div class="flex flex-col text-sm space-y-1">
                  <span class="font-semibold">{{
                    item.team_name || "Sem time"
                  }}</span>
                  <span>{{ item.responsible_name || "Sem responsável" }}</span>
                  <span class="font-semibold">Solicitante</span>
                  <span>{{ item.requestor_name || "Sem requerente" }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full">
      <div
        class="flex justify-between items-center bg-age-colorOrange border-solid border-b border-slate-200 p-2 rounded-xl space-x-4 w-full"
      >
        <div class="flex flex-row justify-center items-center">
          <div class="w-14">
            <assignmentIlustration />
          </div>
          <div class="font-semibold text-xl ml-2 text-white">
            Aberturas de atendimento
          </div>
        </div>
      </div>
      <div class="flex justify-center pt-2 text-center">
        <span class="w-1/2"
          >Não foi realizado nenhum atendimento. Assim que for efetuado, o
          atendimento será exibido aqui.</span
        >
      </div>
      <div
        class="w-full h-96 border-solid border-r border-slate-200 overflow-scroll pb-6 space-y-1"
      >
        <div class="w-full h-full flex justify-center items-center">
          <emptyIlustration />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { ref } from "vue";
import { useClientDetailsStore } from "@/stores/clientDetailsStore";

import emptyIlustration from "@/assets/ilustrations/attendant/emptyIlustration.vue";
import assignmentIlustration from "@/assets/ilustrations/attendant/assignmentIlustration.vue";
import homeIcon from "@/assets/icons/attendant/homeIcon.vue";
import alertAssignment from "@/assets/icons/attendant/alertAssignment.vue";

import networkIcon from "@/assets/icons/attendant/networkIcon.vue";

const store = useClientDetailsStore();
const totalAssignmentsCount = ref(store.totalAssignmentsCount);

const recentAssignmentsCount = ref(store.recentAssignmentsCount);

const props = defineProps({
  assignment: Array,
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const formattedAssignments = computed(() => {
  return props.assignment.map((item) => ({
    ...item,
    beginning_date: formatDate(item.beginning_date),
    conclusion_date: formatDate(item.conclusion_date),
  }));
});

const selectedProtocolId = ref(0);
const selectedReport = ref(null);
const selectedIncident = ref(null);

function cleanProtocol() {
  selectedProtocolId.value = 0;
  selectedReport.value = null;
}

function selectProtocol(protocolId) {
  selectedProtocolId.value = protocolId;
  const assignment = props.assignment.find((assignment) =>
    assignment.incidents.some(
      (incident) => incident.incident_protocol === protocolId
    )
  );
  if (assignment && assignment.reports) {
    selectedReport.value = assignment.reports;
    selectedIncident.value = assignment.incidents;
  } else {
    selectedReport.value = null;
    selectedIncident.value = null;
  }
}

const selectedAssignment = computed(() => {
  return formattedAssignments.value.length > 0
    ? formattedAssignments.value[0]
    : null;
});
</script>

<style lang="scss" scoped></style>
