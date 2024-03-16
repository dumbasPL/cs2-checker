<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  xp: number;
}>();

const xpPerLevel = 5000; // MyPersonaAPI.GetXpPerLevel()

const level = computed(() => Math.floor(props.xp / xpPerLevel));

const tooltip = computed(() => {
  const xpRemaining = xpPerLevel - (props.xp % xpPerLevel);
  return `${xpRemaining} xp remaining`;
});

const progress = computed(() => {
  return (props.xp % xpPerLevel) / xpPerLevel * 100;
});

</script>

<template>
  <div class="tooltip tooltip-right block" :data-tip="tooltip">
    <div class="flex gap-2 items-center">
      <span class="font-semibold">{{ level }}</span>
      <progress class="progress progress-info" :value="progress" max="100"></progress>
    </div>
  </div>
</template>