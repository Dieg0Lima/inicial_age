<template>
  <font-awesome-icon :icon="icon" />
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    icon: {
      type: Array,
      required: true,
    },
  },
};
</script>
