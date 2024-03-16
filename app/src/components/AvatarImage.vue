<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();
</script>

<template>
  <div class="avatar">
    <div class="rounded-full" v-bind="$attrs">
      <img :src="props.src" alt="avatar"/>
    </div>
  </div>
</template>