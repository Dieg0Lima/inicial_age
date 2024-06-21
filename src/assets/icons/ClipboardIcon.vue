<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" class="svg-clipboard" viewBox="0 0 384 512">
      <path class="path-1"
        d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z"
      />
    </svg>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.svg-clipboard {
  path {
    transition: stroke 0.3s ease;
    fill: #BFBFBF;
  }

  &:hover {
    .path-1 {
      stroke: $primary-color;
      fill: $primary-color;
    }

    transform: scale(1.1);
    transition: transform 0.3s ease;
  }

  &:not(:hover) {
    transform: scale(1);
    transition: transform 0.3s ease;
  }
}

.selected {
  .path-1,
  .path-3,
  .path-4,
  .path-5,
  .path-6,
  .path-7,
  .path-8 {
    stroke: $primary-color;
    fill: $primary-color;
  }
  .path-2 {
    stroke: $primary-color;
  }

  &:hover {
    transform: scale(1);
  }
}
</style>
