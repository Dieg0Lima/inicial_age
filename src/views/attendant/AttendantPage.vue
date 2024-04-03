<template>
  <div class="w-screen h-screen bg-ellipse bg-white flex flex-col">
    <div class="flex-none bg-black" style="height: 5%"></div>
    <div class="flex-grow gap-2 flex p-2">
      <!-- Coluna Esquerda com Quadrados -->
      <div class="flex-1 p-1 grid grid-cols-2 grid-rows-2 gap-2">
        <!-- Quadrado 1 -->
        <div class="p-3 bg-white border-solid border-2 border-slate-200 rounded-xl">
          <div>Teste</div>
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Voluptatibus ducimus nisi numquam optio similique amet nobis quo
            doloremque? Possimus porro beatae pariatur aspernatur nisi officiis,
            libero sed veritatis aut nihil.
          </div>
        </div>
        <!-- Quadrado 2 -->
        <div class="bg-yellow-400 flex justify-center items-center">
          <!-- Conteúdo do Quadrado 2 -->
        </div>
        <!-- Quadrado 3 -->
        <div class="bg-yellow-400 flex justify-center items-center">
          <!-- Conteúdo do Quadrado 3 -->
        </div>
        <!-- Quadrado 4 -->
        <div class="bg-yellow-400 flex justify-center items-center">
          <!-- Conteúdo do Quadrado 4 -->
        </div>
      </div>
      <!-- Coluna Direita -->
      <div class="flex-1 bg-green-500">
        <!-- Conteúdo da Coluna Direita -->
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bg-ellipse {
  background-image: url("/src/assets/ellipses/Ellipse-3.png");
  background-position: center;
  background-size: cover;
}
</style>
