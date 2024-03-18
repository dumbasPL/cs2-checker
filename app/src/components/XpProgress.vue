<script setup lang="ts">
import { computed } from 'vue';
import SvgIcon from './SvgIcon.vue';
import carePackage from '../img/care_package.svg';
import XpTrailIcon from './XpTrailIcon.vue';

const props = defineProps<{
  level: number;
  xp: number;
  drops: number;
  xpTrail: number;
}>();

const xpPerLevel = 5000; // MyPersonaAPI.GetXpPerLevel()

const tooltip = computed(() => {
  const xpRemaining = xpPerLevel - props.xp;
  return `${xpRemaining} xp remaining`;
});

const progress = computed(() => {
  return (props.xp / xpPerLevel) * 100;
});

</script>

<template>
  <div class="block">
    <div class="flex gap-2">
      <XpTrailIcon v-if="xpTrail > 0" :level="xpTrail" class="h-6" />
      <div class="flex grow gap-2 items-center tooltip tooltip-right" :data-tip="tooltip">
        <span class="font-semibold">{{ level }}</span>
        <progress class="progress progress-info" :value="progress" max="100"></progress>
      </div>
      <div class="tooltip tooltip-right whitespace-pre-wrap" :data-tip="`Care package available&#10;${drops} unclaimed drops`">
        <SvgIcon :src="carePackage" class="size-6" :class="drops > 0 ? 'bg-success' : 'bg-current'" alt="Care package" />
      </div>
    </div>
  </div>
</template>