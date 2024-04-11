<template>
  <div
    class="bg-white border-2 border-solid border-slate-200 rounded-xl flex h-1/2 flex-row overflow-hidden p-2"
  >
    <div class="w-full h-full flex flex-col">
      <div
        class="flex justify-between items-center bg-age-colorOrange border-solid border-b border-slate-200 p-2 rounded-xl space-x-4"
      >
        <div class="flex flex-row justify-center items-center">
          <div class="w-14">
            <assignmentIlustration />
          </div>
          <div class="font-semibold text-xl ml-2 text-white">
            Aberturas de atendimento
          </div>
        </div>
        <div class="flex">
          <div
            class="flex items-center bg-white w-full h-12 space-x-2 rounded-xl text-sm"
          >
            <homeIcon class="cursor-pointer p-4" @click="cleanProtocol" />

            <button
              :disabled="currentIndex === 0"
              @click="moveLeft"
              class="p-4 disabled:opacity-50"
            >
              &#8592;
            </button>
            <div
              class="font-semibold text-white cursor-pointer p-2 rounded-lg"
              :class="
                selectedProtocolId.value ===
                protocol.incidents[0].incident_protocol
                  ? 'bg-age-colorOrange'
                  : 'hover:bg-orange-100'
              "
              v-for="protocol in visibleItems"
              :key="protocol.incidents[0].incident_protocol"
              @click="selectProtocol(protocol.incidents[0].incident_protocol)"
            >
              <span class="text-black">{{
                protocol.incidents[0].incident_protocol
              }}</span>
            </div>

            <button
              :disabled="currentIndex >= assignment.length - 3"
              @click="moveRight"
              class="p-4 disabled:opacity-50"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="selectedReport && selectedReport.length > 0"
        class="report-details w-full h-96 overflow-scroll p-6 flex flex-col space-x-2"
      >
        <div
          v-for="report in selectedReport"
          :key="report.report_id"
          class="rounded-lg flex flex-col w-1/2 h-full"
        >
          <div
            class="bg-white border-solid border-2 border-slate-300 rounded-xl p-4 space-y-2"
          >
            <div class="flex flex-row items-center space-x-4">
              <img src="@/assets/icons/attendant/historyIcon.png" alt="" />
              <h1 class="font-bold">Histórico de solicitação</h1>
            </div>
            <div class="flex flex-row items-center justify-between">
              <img
                src="@/assets/icons/attendant/shareIcon.png"
                class="w-4 h-4"
                alt=""
              />
              <h4 class="font-semibold text-sm">
                #{{ report.report_id }} | {{ report.report_title }}
              </h4>
              <div
                class="bg-white border-2 border-solid border-age-colorOrange rounded-xl flex flex-row text-xs"
              >
                <span class="p-1 font-bold text-age-colorOrange">{{
                  report.report_beginning_date
                }}</span>
              </div>
            </div>
            <div
              class="flex flex-row items-center justify-between pb-6 border-b-2 border-solid border-slate-300"
            >
              <div class="flex flex-col text-sm">
                <span class="text-gray-500 font-medium"
                  >De: {{ report.report_person }}</span
                >
              </div>
              <div class="text-sm">
                <span class="text-gray-500 font-medium">{{
                  report.report_team
                }}</span>
              </div>
            </div>
            <div class="flex flex-col">
              <h4 class="font-semibold text-sm">
                {{ report.report_title }}
              </h4>
              <h4 class="text-gray-500 font-medium text-sm">
                {{ report.report_description }}
              </h4>
            </div>
          </div>
        </div>
        <div
          v-for="incident in selectedAssignment.incidents"
          :key="incident.incident_id"
          class="rounded-lg flex flex-col space-x-2 w-1/2"
        >
          <div
            class="bg-white border-solid border-2 border-slate-300 rounded-xl p-4 space-y-2"
          >
            <div class="flex flex-row items-center space-x-4">
              <img src="@/assets/icons/attendant/historyIcon.png" alt="" />
              <h1 class="font-bold">{{ incident.incident_type }}</h1>
            </div>

            <div class="flex flex-col justify-between pb-6">
              <div class="flex flex-col text-sm">
                <span class="font-medium"> Descrição</span>
              </div>
              <div class="text-sm">
                <span class="text-gray-500 font-medium">{{
                  incident.incident_description
                }}</span>
              </div>
            </div>
            <div class="flex flex-col">
              <h4 class="font-semibold text-sm"></h4>
              <h4 class="text-gray-500 font-medium text-sm"></h4>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-row w-full h-full text-sm">
        <div
          class="w-full h-96 border-solid border-r border-slate-200 overflow-scroll"
        >
          <div
            v-for="item in formattedAssignments"
            :key="item.assignment_id"
            class="flex flex-row items-center p-4 space-x-8 cursor-pointer border-solid border-b border-slate-200 hover:bg-orange-100 rounded-xl"
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
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { ref } from "vue";

import assignmentIlustration from "@/assets/ilustrations/attendant/assignmentIlustration.vue";
import homeIcon from "@/assets/icons/attendant/homeIcon.vue";

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

const currentIndex = ref(0);

const visibleItems = computed(() => {
  return props.assignment.slice(currentIndex.value, currentIndex.value + 3);
});

const moveLeft = () => {
  if (currentIndex.value > 0) currentIndex.value -= 3;
};

const moveRight = () => {
  if (currentIndex.value < props.assignment.length - 3) currentIndex.value += 3;
};

const selectedProtocolId = ref(0);
const selectedReport = ref(null);

function cleanProtocol() {
  selectedProtocolId.value = 0;
  selectedReport.value = null;
}

function selectProtocol(protocolId) {
  console.log("Selected Protocol ID:", protocolId, typeof protocolId);
  selectedProtocolId.value = protocolId;
  const assignment = props.assignment.find((assignment) =>
    assignment.incidents.some(
      (incident) => incident.incident_protocol === protocolId
    )
  );
  if (assignment && assignment.reports) {
    selectedReport.value = assignment.reports;
  } else {
    selectedReport.value = null;
  }
}

const selectedAssignment = computed(() => {
  return formattedAssignments.value.length > 0
    ? formattedAssignments.value[0]
    : null;
});
</script>

<style lang="scss" scoped></style>
