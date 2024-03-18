<script setup lang="ts">
import MapIcon from './MapIcon.vue';
import SkillgroupIcon from './SkillgroupIcon.vue';
import scrimcomp2v2 from '../img/scrimcomp2v2.svg';
import SkillgroupIconWingman from './SkillgroupIconWingman.vue';

defineProps<{
  perMapRanks: Record<string, {rank: number, wins: number}>;
  wingman?: {rank: number, wins: number};
}>();
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex gap-2">
      <img :src="scrimcomp2v2" alt="Wingman" class="inline-block align-baseline w-fit h-6" />
      <SkillgroupIconWingman :skillgroup="wingman?.rank ?? 0" :wins="wingman?.wins ?? 0" class="h-6"/>
    </div>
    <div class="flex gap-2"></div>
    <div v-for="(rank, map) in perMapRanks" :key="map" class="flex gap-2">
      <MapIcon :map="map" class="h-6"/>
      <SkillgroupIcon :skillgroup="rank.rank" :wins="rank.wins" class="h-6"/>
    </div>
  </div>
</template>