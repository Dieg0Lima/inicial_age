<script>
import GridComponent from "@/components/Home/GridComponent.vue";
import LoginComponent from "@/components/Home/LoginComponent.vue";

export default {
  name: "GridSystem",
  components: {LoginComponent, GridComponent},
};
</script>

<template>
  <div class="container-page relative flex items-center justify-center">
    <div class="absolute inset-0 bg-background-img bg-cover bg-center blur-2xl"></div>
    <div style="z-index: 1; display: flex; flex-direction: row; height: 80vh; gap: 4rem">
      <grid-component></grid-component>
      <login-component></login-component>
    </div>
  </div>
</template>

<style>
.container-page {
  background: #e2e2e2;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 5rem;
  animation: fadeIn 0.5s ease forwards;
  position: relative;
  overflow: hidden; /* Isso garante que o fundo não exceda o container */
}

/* Classe personalizada para o background */
.bg-background-img {
  background-image: url("@/assets/AgeBackground.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

img {
  max-width: 12vw;
  max-height: 12vh;
  object-fit: contain;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

