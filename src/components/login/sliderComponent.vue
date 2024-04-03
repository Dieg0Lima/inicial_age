<script setup>
import { ref } from "vue";
import SliderWelcome from "@/assets/ilustrations/login/sliderWelcome.vue";
import SliderWhatIs from "@/assets/ilustrations/login/sliderWhatIs.vue";
import SliderWebBuilder from "@/assets/ilustrations/login/sliderWebBuilder.vue";
import SliderPassword from "@/assets/ilustrations/login/sliderPassword.vue";

const currentSlide = ref(0);
const totalSlides = ref(4);

const updateSlide = (index) => {
  currentSlide.value = index;
};

const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = totalSlides.value - 1;
  }
};
</script>

<template>
  <div class="flex flex-col items-center mt-4">
    <div
      class="relative w-12/12 max-h-[50vh] flex justify-center items-center rounded-2xl"
    >
      <button
        class="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 hover:bg-gray-400 text-black font-bold p-2 rounded-full"
        @click="prevSlide"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>

      <div
        v-show="currentSlide === 0"
        class="flex justify-center items-center flex-wrap"
      >
        <SliderWelcome />
        <div class="text-center">
          <p class="font-semibold text-2xl">Bem-vindo ao Age Atende</p>
          <span>A plataforma de atendimento da Age Telecom!</span>
        </div>
      </div>
      <div
        v-show="currentSlide === 1"
        class="flex justify-center items-center flex-wrap"
      >
        <SliderWhatIs class="mb-12" />
        <div class="text-center mb-4">
          <p class="font-semibold text-2xl">Solução Rápida de Problemas</p>
          <span>Esqueça as longas esperas e os processos complicados.</span>
        </div>
      </div>
      <div
        v-show="currentSlide === 2"
        class="flex justify-center items-center flex-wrap"
      >
        <SliderWebBuilder class="mb-12" />
        <div class="text-center mb-6 w-10/12">
          <p class="font-semibold text-2xl">Facilidade de Uso</p>
          <span
            >Com apenas alguns cliques, você tem acesso a todas as informações e
            suporte que precisa.</span
          >
        </div>
      </div>
      <div
        v-show="currentSlide === 3"
        class="flex justify-center items-center flex-wrap"
      >
        <SliderPassword class="mb-16" />
        <div class="text-center w-10/12">
          <p class="font-semibold text-2xl">Como acesso?</p>
          <span
            >Utilize o seu usuário e senha do computador para ter acesso ao Age
            Atende!</span
          >
        </div>
      </div>

      <button
        class="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 hover:bg-gray-400 text-black font-bold p-2 rounded-full"
        @click="nextSlide"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>

    <div class="bolinhas flex justify-center items-center mt-6">
      <span
        v-for="index in totalSlides"
        @click="updateSlide(index - 1)"
        :key="index"
        :class="[
          'bolinha',
          'rounded-full',
          'cursor-pointer',
          currentSlide === index - 1 ? 'current-slide' : '',
        ]"
      ></span>
    </div>
  </div>
</template>

<style lang="scss">
.bolinhas {
  text-align: center;
}

.bolinha {
  width: 10px;
  height: 10px;
  margin: 0 5px;
  display: inline-block;
  transition: all 0.3s ease;
  background-color: gray;
}

.current-slide {
  width: 20px;
  background-color: $primary-color;
}
</style>
