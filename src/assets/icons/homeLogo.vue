<template>
  <div>
    <svg
      width="39"
      height="37"
      viewBox="0 0 39 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-full svg-home"
      :class="{ selected: isSelected('/inicio') }"
    >
      <rect
        class="rect-1"
        x="4.28979"
        y="20.2266"
        width="12.011"
        height="12.011"
        rx="2"
        transform="rotate(-6.76808 4.28979 20.2266)"
        fill="#D0D0D0"
      />
      <rect
        class="rect-2"
        x="19.3054"
        y="4.32373"
        width="13.3637"
        height="26.8193"
        rx="1"
        transform="rotate(-3.99644 19.3054 4.32373)"
        fill="#BFBFBF"
      />
      <rect
        class="rect-3"
        x="2.82104"
        y="6.43652"
        width="12.011"
        height="12.011"
        rx="2"
        transform="rotate(-5.25219 2.82104 6.43652)"
        fill="#D0D0D0"
      />
    </svg>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const isSelected = (path) => route.path === path;
</script>

<style lang="scss" scoped>
.svg-home {
  .rect-1,
  .rect-3 {
    transition: fill 0.3s ease;
  }

  &:hover {
    .rect-1,
    .rect-3 {
      fill: $primary-color;
    }

    transform: rotate(15deg);
    transition: transform 0.3s ease;
  }

  &:not(:hover) {
    transform: rotate(0deg);
    transition: transform 0.3s ease;
  }
}

.selected {
  .rect-1, .rect-2, .rect-3 {
    fill: $primary-color;
    transition: fill 0.3s ease-in;
  }

  &:hover {
  
    transform: rotate(0deg);
  }
}
</style>
