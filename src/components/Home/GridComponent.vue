<script setup>
  import portal from "@/assets/modules/Portal.png";
  import makesystem from "@/assets/modules/MakeSystem.png";
  import native from "@/assets/modules/Native.png";
  import takeblip from "@/assets/modules/TakeBlip.png";
  import blipdesk from "@/assets/modules/BlipDesk.png";
  import ozmap from "@/assets/modules/OzMap.png";
  import voalle from "@/assets/modules/Voalle.png";
  import clicksign from "@/assets/modules/Clicksign.png";
  import glpi from "@/assets/modules/GLPI.png";
  import guacamole from "@/assets/modules/Guacamole.png";
  import onvio from "@/assets/modules/ONVIO.png";
  import microsoft365 from "@/assets/modules/Microsoft365.png"
  import wiki from "@/assets/modules/AtendimentoWiki.png"
  import assinante from "@/assets/modules/AssinantePortal.png"
  import deezer from "@/assets/modules/Deezer.png"

  import { ref, onMounted, watch, computed } from "vue";

  const items = ref([
    {
      id: 1,
      bgColor: "linear-gradient(to right, #FFB600, #F93822)",
      imageUrl: portal,
      externalUrl: "http://portal/",
      favorited: false,
      originalIndex: 0,
    },
    {
      id: 2,
      bgColor: "linear-gradient(to right, #21ADE3, #333F96)",
      imageUrl: makesystem,
      externalUrl: "https://agetelecom.makesystem.com.br/webcrm/",
      favorited: false,
      originalIndex: 1,
    },
    {
      id: 3,
      bgColor: "#313F5D",
      imageUrl: native,
      externalUrl: "https://native.agetelecom.com.br/#!/login",
      favorited: false,
      originalIndex: 2,
    },
    {
      id: 4,
      bgColor: "#FFFFFF",
      imageUrl: takeblip,
      externalUrl:
          "https://account.blip.ai/login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dblip-portal%26redirect_uri%3Dhttps%253A%252F%252Fagetelecom.blip.ai%252Fauthorize%26response_type%3Did_token%2520token%26scope%3Doffline_access%2520openid%2520profile%2520email%2520api-payment-service.full_access%2520api-extension-service.full_access%26state%3Dd385d68e2511409fa76518333c660803%26nonce%3Dada3d2b435404da4873c04289ef2a7f3",
      favorited: false,
      originalIndex: 3,
    },
    {
      id: 5,
      bgColor: "#F3F6FA",
      imageUrl: blipdesk,
      externalUrl:
          "https://account.blip.ai/login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dblip-desk%26redirect_uri%3Dhttps%253A%252F%252Fagetelecom.desk.blip.ai%252Fauthorize%26response_type%3Did_token%2520token%26scope%3Dopenid%2520profile%2520email%26state%3D2ba1a58f0f6f4e9ea373af804f616f00%26nonce%3D4b63a24fc9b241a4bba5916859e610ff",
      favorited: false,
      originalIndex: 4,
    },
    {
      id: 6,
      bgColor: "#FFFFFF",
      imageUrl: ozmap,
      externalUrl: "http://agetelecom.ozmap.com.br:9090/",
      favorited: false,
      originalIndex: 5,
    },
    {
      id: 7,
      bgColor: "#FFFFFF",
      imageUrl: voalle,
      externalUrl: "https://erp.agetelecom.com.br/users/login",
      favorited: false,
      originalIndex: 6,
    },
    {
      id: 8,
      bgColor: "#0057FF",
      imageUrl: clicksign,
      externalUrl: "https://app.clicksign.com/accounts/190196/memberships",
      favorited: false,
      originalIndex: 7,
    },
    {
      id: 9,
      bgColor: "#FFFFFF",
      imageUrl: glpi,
      externalUrl: "http://suporte/",
      favorited: false,
      originalIndex: 8,
    },
    {
      id: 10,
      bgColor: "#FFFFFF",
      imageUrl: guacamole,
      externalUrl: "http://10.25.3.174:8080/guacamole/#/",
      favorited: false,
      originalIndex: 9,
    },
    {
      id: 11,
      bgColor: "#FFFFFF",
      imageUrl: onvio,
      externalUrl: "https://auth.thomsonreuters.com/u/login/identifier?state=hKFo2SBKVThHazBMbkpDWU1mVjYyd2EwRTI2UG5KLV9UYThtU6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHZsR2NiOUR3dzNWeUdzNDVSZjl4TGQyS2VDcHAwOFpBo2NpZNkgR0JVcFBwT1V3QmY0cGhTdjllSXFGMnhpOExTUHNrdEs&ui_locales=pt-BR",
      favorited: false,
      originalIndex: 10,
    },
    {
      id: 12,
      bgColor: "#FFFFFF",
      imageUrl: microsoft365,
      externalUrl: "https://login.microsoftonline.com/",
      favorited: false,
      originalIndex: 11,
    },
    {
      id: 13,
      bgColor: "linear-gradient(to right, #FFB600, #F93822)",
      imageUrl: wiki,
      externalUrl: "https://agetelecomltda.sharepoint.com/sites/atendimento/SitePages/Home.aspx?ga=1",
      favorited: false,
      originalIndex: 12,
    },
    {
      id: 14,
      bgColor: "linear-gradient(to right, #FFB600, #F93822)",
      imageUrl: assinante,
      externalUrl: "https://www.portaldoassinante.com/agetelecom",
      favorited: false,
      originalIndex: 13,
    },
    {
      id: 15,
      bgColor: "#FFFFFF",
      imageUrl: deezer,
      externalUrl: "https://www.deezer.com/br/activate/playhubbr",
      favorited: false,
      originalIndex: 14,
    },
  ]);
  const hoveredItem = ref(null);

  const toggleFavorite = (item) => {
    const index = items.value.indexOf(item);
    if (item.favorited) {
      items.value.splice(item.originalIndex, 0, items.value.splice(index, 1)[0]);
    } else {
      item.originalIndex = index;
      items.value = [item, ...items.value.filter((i) => i !== item)];
    }
    item.favorited = !item.favorited;

    localStorage.setItem('favoritedItems', JSON.stringify(items.value));
  };

  onMounted(() => {
    const storedItems = JSON.parse(localStorage.getItem('favoritedItems'));
    if (storedItems) {
      items.value = storedItems;
    }
  });

  watch(items, (newValue) => {
    localStorage.setItem('favoritedItems', JSON.stringify(newValue));
  });

  const sortedItems = computed(() => {
    const favoritedItems = items.value.filter((item) => item.favorited);
    const nonFavoritedItems = items.value.filter((item) => !item.favorited);
    return [...favoritedItems, ...nonFavoritedItems];
  });
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
    <div
        v-for="item in sortedItems"
        :key="item.id"
        :style="{ background: item.bgColor }"
        class="relative grid-item"
        :class="{ 'favorite': item.favorited }"
        @mouseenter="hoveredItem = item"
        @mouseleave="hoveredItem = null"
    >
      <a :href="item.externalUrl" target="_blank" rel="noopener noreferrer">
        <div class="item-img">
          <img :src="item.imageUrl" :alt="`Ícone do ${item.name}`" />
        </div>
      </a>
      <div class="favorite-icon absolute top-2 right-2" @click="toggleFavorite(item)">
        <font-awesome-icon
            :icon="item.favorited ? ['fas', 'star'] : ['far', 'star']"
            :class="{ 'text-yellow-400': hoveredItem === item, 'text-transparent': hoveredItem !== item }"
            class="cursor-pointer transition"
        />
      </div>
      <div
          class="corner-shadow absolute top-0 right-0 w-4 h-4 bg-gray-500 opacity-50 transform rotate-45 hidden"
          :class="{ 'block': hoveredItem === item }"
      ></div>
    </div>
  </div>
</template>




<style scoped>

.grid-item {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 15vh;
  width: 15vw;
  border-radius: 15px;
  animation: fadeIn 1.5s ease forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.grid-item:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.item-img {
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-enter-active,
.favorite-leave-active {
  transition: all 0.5s;
}
.favorite-enter,
.favorite-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>