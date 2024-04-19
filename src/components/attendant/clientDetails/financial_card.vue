<template>
  <div
    class="bg-white border-2 border-solid border-slate-200 rounded-xl flex h-1/2 flex-row overflow-hidden p-2"
  >
    <div
      class="w-full h-full flex flex-col"
      v-if="financial && financial.length > 0"
    >
      <div
        class="flex items-center bg-age-colorOrange border-solid border-b border-slate-200 p-2 rounded-xl space-x-4"
      >
        <div class="w-14">
          <billetIlustration />
        </div>
        <div class="font-semibold text-xl ml-2 text-white">Dados da fatura</div>
      </div>
      <div class="flex flex-row w-full h-full">
        <div
          class="w-full h-96 border-solid border-r border-slate-200 overflow-scroll pb-6 space-y-1"
        >
          <div
            v-for="item in financialWithStatus"
            :key="item.title_id"
            class="flex flex-row items-center p-2 space-x-2 cursor-pointer border-solid border-b border-slate-200 hover:bg-orange-100 rounded-xl"
          >
            <div class="w-16">
              <financialIlustration :status="item.status" />
            </div>
            <div class="flex flex-row space-x-8">
              <div class="flex flex-col text-sm">
                <span class="font-semibold">Data do vencimento</span>
                <span>{{ item.title_expiration_date }}</span>
              </div>
              <div class="flex flex-col text-sm">
                <span class="font-semibold">Valor</span>
                <span>{{
                  `R$ ${parseFloat(item.title_amount).toFixed(2)}`
                }}</span>
              </div>
              <div class="flex flex-col text-sm">
                <span class="font-semibold">Status</span>
                <span>{{ item.title_status ? "Não Pago" : "Pago" }}</span>
              </div>
              <button @click="downloadBillet(item.title_id)">
                Baixar Boleto
              </button>
            </div>
          </div>
        </div>
        <div
          class="w-full h-96 border-solid border-r border-slate-200 overflow-scroll pb-6 space-y-1"
        >
          <div class="w-full h-full flex justify-center items-center">
            <img src="@/assets/ilustrations/attendant/workingIn.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Nenhum dado disponível para exibição.</p>
    </div>
  </div>
</template>

<script setup>
import billetIlustration from "@/assets/ilustrations/attendant/billetIlustration.vue";
import { defineProps, computed } from "vue";
import financialIlustration from "@/assets/ilustrations/attendant/financialIlustration.vue";

const props = defineProps({
  financial: Array,
});

const currentDate = new Date();

const getStatus = (item) => {
  const expirationDate = new Date(item.title_expiration_date);
  if (item.title_status === false) {
    return "paid";
  } else if (expirationDate < currentDate) {
    return "expired";
  } else if (expirationDate > currentDate) {
    return "open";
  } else {
    return "pending";
  }
};

const financialWithStatus = computed(() => {
  return props.financial.map((item) => ({
    ...item,
    status: getStatus(item) || "",
  }));
});

const downloadBillet = async (titleId) => {
  const url = `https://erp.agetelecom.com.br:45715/external/integrations/thirdparty/GetBillet/${titleId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBBRjZDREEyRDU0MTRDRTY1MUM0RTk3NTM3QTFGNEY0QTMyNUQ5QTMiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJDdmJOb3RWQlRPWlJ4T2wxTjZIMDlLTWwyYU0ifQ.eyJuYmYiOjE3MTM0NjE1MzEsImV4cCI6MTcxMzQ2NTEzMSwiaXNzIjoiaHR0cHM6Ly9lcnAuYWdldGVsZWNvbS5jb20uYnI6NDU3MDAiLCJhdWQiOlsiaHR0cHM6Ly9lcnAuYWdldGVsZWNvbS5jb20uYnI6NDU3MDAvcmVzb3VyY2VzIiwic3luZ3ciXSwiY2xpZW50X2lkIjoiMWZhODYzOTEtZTQ3ZC00YWFiLWEzZjAtM2M0NWY2OTI3Yzg4IiwiaWQiOiIxMTg5IiwibG9naW4iOiJkZWllZ29AYWdldGVsZWNvbS5jb20uYnIiLCJtb2RlIjoic3lzdGVtIiwibmFtZSI6IkRlaWVnbyIsInBlcnNvbmVtYWlsIjoiZGllZ28ubGltYUBhZ2V0ZWxlY29tLmNvbS5iciIsInBlcnNvbmlkIjoiMTMwMTkxIiwicGVyc29ubmFtZSI6IkRlaWVnbyIsInBsYWNlaWQiOiIiLCJwcm9maWxlaWQiOiI2MiIsInN5bmRhdGEiOiJUV3BOTVU5RVl6VmFha2sxVDBkU2FVMVVTbXhhYWxwcldsZEZkMDB5U1RGWlYxSnNUVEpSTUZwdFVUMDZXbGhzUzFaSFZsaE9WV3hwVFRBMGQxTlhjSFpoVlRGeFVWUktUV0ZyYkROVWEwMHdaVlUxUlZvelZsQlNSbXh3VkVWT1MxWkhWbGhPVlZaYVlWVnJNbE5YTVZOaFZuQllUVmhrVGxKRlJYZFVNRkp5WVZkYVVsQlVNRDA2V2xSb2EwMXFUVEZaYW1zd1dYcHNhVTVFVG0xYVJHY3pUVVJzYTAxcVdUSlpla0Y0VFVkTk0wMUhWVDA9IiwidHhpZCI6Ijk2ODE3NTY5MDg3IiwidHlwZXR4aWQiOiIyIiwibW9kdWxlcyI6IjEsMyw0LDUsNiw4LDEwLDEyLDE1LDE2LDIxLDI2LDI3LDI4LDMxLDMyLDUwLDUzLDU1LDU2LDU4LDU5LDk5LDE1MywxNjEsMTcwLDE3NSIsImlzT21uaSI6IkZhbHNlIiwidHlwZSI6ImludGVncmF0aW9uIiwiaW50ZWdyYXRpb24iOiJ0aGlyZHBhcnR5Iiwic3ViIjoiZGVpZWdvQGFnZXRlbGVjb20uY29tLmJyIiwic2NvcGUiOlsic3luZ3ciXX0.f6eEzbgn7QVFbVXG-CJeUybEcwhH8UBJxLbhvEGrEO163Du3H6_3DpcKrhcB1TiN--jOuu_z81Sxp8_54inx9NbRMX7Ee4uV7FPMtGk2-xqX8xFC6c932FtEmHQB59K5rxwJZtbIzdNQVA96Hh8_142x_jCwXO8FBiJ9znlIWgpLnM4yI1bIPajxxHLEoklse_cnah1PxS932Adk0dY06teXMlJKe-cyG3diALEIXacBBA_Cd-Jyr0VsbGuldjL-EGgtArNZxKHTod9321c_ub95aW5Tlx6XNDazLPNu8ynYkMc-WRpT2AQZO7sT3cbijr7rOV-sZC4ldtPF_s4NdfNBm6wwIJvj-CIxs5XzkOk59eOe4PGda2-c2S2nWADcBthQeraC2tUSeh0rGtQFlFP8WWDoKZkF4uEsUZxbybp5FNywmTHGW-Tpk7UmD2k030ynjxg2Jqip-fksdJvG9jnWDsBfYlY9lWtVdp8QPFsqmtej1_rpi28tOuDg2C_7hPutsu3NhwU3Qp6j-msRseGZh85gpuf8TLsKjg-ccYf1FQWzH5ybGRBxKF7oUGVeoZwjkYsWxAdNapXjkOjy4wGJzJyLirj5k8_P82TA9TIFVxUpEPnKDJS_6Ya952LMwdIRICILkIw--lagCAx6Ow8Ss_4lGFnYNkzwP7voc4A",
        "Content-Type": "application/pdf",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");

    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.error("Falha ao baixar o boleto:", error);
  }
};
</script>

<style lang="scss" scoped></style>
