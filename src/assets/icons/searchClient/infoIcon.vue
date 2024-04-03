<template>
  <div class="w-full h-full">
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="svg"
    >
      <path
        d="M6.76923 12.9999C9.95549 12.9999 12.5385 10.4169 12.5385 7.23066C12.5385 4.0444 9.95549 1.46143 6.76923 1.46143C3.58297 1.46143 1 4.0444 1 7.23066C1 10.4169 3.58297 12.9999 6.76923 12.9999Z"
        stroke="#c1c1c1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="path-1"
      />
      <path
        d="M6.76929 9.53841V7.23071"
        stroke="#c0c0c0"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="path-2"
      />
      <path
        d="M6.76929 4.92285H6.77429"
        stroke="#c0c0c0"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="path-3"
      />
    </svg>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.svg {
  transition: transform 0.2s ease-in-out; 
  cursor: pointer;
  stroke: #B9B9B9;

  .path-1, .path-2, .path-3 {
    transition: stroke 0.2s ease-in-out; 
  }

  &:hover {
    transform: scale(1.1); 

    .path-1, .path-2, .path-3 {
      stroke: $primary-color;
    }
  }
}

</style>
