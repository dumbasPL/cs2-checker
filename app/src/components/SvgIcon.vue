<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  src: string;
}>();

const mask = computed(() => {
  return `url("${props.src}") center center / contain no-repeat`;
});

</script>

<template>
  <div role="img" :style="{mask}">
    <img :src="src" class="opacity-0">
  </div>
</template>