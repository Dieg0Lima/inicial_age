<template>
  <div class="grid-container">
    <div v-for="item in items" :key="item.id" class="grid-item">
      <a :href="item.externalUrl" target="_blank" rel="noopener noreferrer">
        <div :style="{ backgroundColor: item.bgColor }" class="">
          <img :src="item.imageUrl" :alt="`Ícone do ${item.name}`" class="" />
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import portal from "@/assets/modules/Portal.png";
import makesystem from "@/assets/modules/MakeSystem.png";
import native from "@/assets/modules/Native.png";
import takeblip from "@/assets/modules/TakeBlip.png";
import blipdesk from "@/assets/modules/BlipDesk.png";
import ozmap from "@/assets/modules/OzMap.png";
import voalle from "@/assets/modules/Voalle.png";
import clicksign from "@/assets/modules/Clicksign.png";
import glpi from "@/assets/modules/GLPI.png";

export default {
  name: "GridSystem",
  data() {
    return {
      items: [
        {
          id: 1,
          bgColor: "#0057FF",
          imageUrl: portal,
          externalUrl: "https://siteexterno1.com",
        },
        {
          id: 2,
          bgColor: "#0057FF",
          imageUrl: makesystem,
          externalUrl: "https://siteexterno1.com",
        },
        {
          id: 3,
          bgColor: "#0057FF",
          imageUrl: native,
          externalUrl: "https://siteexterno1.com",
        },
        {
          id: 4,
          bgColor: "#0057FF",
          imageUrl: takeblip,
          externalUrl: "https://siteexterno1.com",
        },
        {
          id: 5,
          bgColor: "#0057FF",
          imageUrl: blipdesk,
          externalUrl: "https://siteexterno1.com",
        },
        {
          id: 6,
          bgColor: "#0057FF",
          imageUrl: ozmap,
          externalUrl: "https://siteexterno1.com",
        },
        {
          id: 7,
          bgColor: "#0057FF",
          imageUrl: voalle,
          externalUrl: "https://siteexterno1.com",
        },
        {
          id: 8,
          bgColor: "#0057FF",
          imageUrl: clicksign,
          externalUrl: "https://siteexterno1.com",
        },
        {
          id: 9,
          bgColor: "#0057FF",
          imageUrl: glpi,
          externalUrl: "https://siteexterno1.com",
        },
      ],
    };
  },
};
</script>

<style>
.grid-item {
  aspect-ratio: 1 / 1; /* Garante que cada item da grid seja quadrado */
  padding: 1rem; /* Espaçamento interno para o conteúdo */
}

.grid-item img {
  max-width: 100%; /* Garante que a imagem se ajuste ao contêiner */
  height: auto; /* Mantém a proporção da imagem */
}
</style>
