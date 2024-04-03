<template>
  <div>
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-full svg-logout"
    >
      <path
        d="M11 31H4.33333C3.44928 31 2.60143 30.6488 1.97631 30.0237C1.35119 29.3986 1 28.5507 1 27.6667V4.33333C1 3.44928 1.35119 2.60143 1.97631 1.97631C2.60143 1.35119 3.44928 1 4.33333 1H11"
        stroke="#BFBFBF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="path-1"
      />
      <path
        d="M22.6665 24.3334L30.9998 16.0001L22.6665 7.66675"
        stroke="#D0D0D0"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="path-2"
      />
      <path
        d="M31 16H11"
        stroke="#D0D0D0"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="path-3"
      />
    </svg>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.svg-logout {
  &:hover {
    .path-1,
    .path-2,
    .path-3 {
      stroke: $primary-color;
    }
  }
}
</style>
