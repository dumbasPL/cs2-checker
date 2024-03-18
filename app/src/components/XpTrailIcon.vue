<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';
import honor from '../img/honor.svg';
import { computed } from 'vue';

const props = defineProps<{
  level: number;
}>();

let rarityColors = [
  [176, 195, 217],
  [176, 195, 217],
  [94, 152, 217],
  [75, 105, 255],
  [136, 71, 255],
  [211, 44, 230],
  [235, 75, 75],
  [235, 75, 75],
];

let color = computed(() => {
  const level = Math.max(0, Math.min(rarityColors.length - 1, props.level));
  return `rgb(${rarityColors[level].join(', ')})`;
});

</script>

<template>
  <SvgIcon :src="honor" class="size-6" :style="{backgroundColor: color}" alt="XP overload" />
</template>