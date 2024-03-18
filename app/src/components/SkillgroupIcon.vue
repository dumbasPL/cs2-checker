<script setup lang="ts">
import { computed } from 'vue';
import skillgroup_expired from '../img/ranks/skillgroup_expired.svg'
import skillgroup_need_wins from '../img/ranks/skillgroup_need_wins.svg';
import skillgroup0 from '../img/ranks/skillgroup0.svg';
import skillgroup1 from '../img/ranks/skillgroup1.svg';
import skillgroup2 from '../img/ranks/skillgroup2.svg';
import skillgroup3 from '../img/ranks/skillgroup3.svg';
import skillgroup4 from '../img/ranks/skillgroup4.svg';
import skillgroup5 from '../img/ranks/skillgroup5.svg';
import skillgroup6 from '../img/ranks/skillgroup6.svg';
import skillgroup7 from '../img/ranks/skillgroup7.svg';
import skillgroup8 from '../img/ranks/skillgroup8.svg';
import skillgroup9 from '../img/ranks/skillgroup9.svg';
import skillgroup10 from '../img/ranks/skillgroup10.svg';
import skillgroup11 from '../img/ranks/skillgroup11.svg';
import skillgroup12 from '../img/ranks/skillgroup12.svg';
import skillgroup13 from '../img/ranks/skillgroup13.svg';
import skillgroup14 from '../img/ranks/skillgroup14.svg';
import skillgroup15 from '../img/ranks/skillgroup15.svg';
import skillgroup16 from '../img/ranks/skillgroup16.svg';
import skillgroup17 from '../img/ranks/skillgroup17.svg';
import skillgroup18 from '../img/ranks/skillgroup18.svg';

const skillgroups = [
  skillgroup0,
  skillgroup1,
  skillgroup2,
  skillgroup3,
  skillgroup4,
  skillgroup5,
  skillgroup6,
  skillgroup7,
  skillgroup8,
  skillgroup9,
  skillgroup10,
  skillgroup11,
  skillgroup12,
  skillgroup13,
  skillgroup14,
  skillgroup15,
  skillgroup16,
  skillgroup17,
  skillgroup18
];

const skillgroupNames = [
  'Unranked',
  'Silver I',
  'Silver II',
  'Silver III',
  'Silver IV',
  'Silver Elite',
  'Silver Elite Master',
  'Gold Nova I',
  'Gold Nova II',
  'Gold Nova III',
  'Gold Nova Master',
  'Master Guardian I',
  'Master Guardian II',
  'Master Guardian Elite',
  'Distinguished Master Guardian',
  'Legendary Eagle',
  'Legendary Eagle Master',
  'Supreme Master First Class',
  'Global Elite'
];

const props = defineProps<{
  skillgroup: number;
  wins: number;
}>();

const skillgroupIcon = computed(() => {
  if (props.wins >= 10 && props.skillgroup == 0) {
    return skillgroup_expired;
  } else if (props.wins > 0 && props.wins < 10 && props.skillgroup == 0) {
    return skillgroup_need_wins;
  } else {
    return skillgroups[props.skillgroup];
  }
});

const skillgroupName = computed(() => {
  return skillgroupNames[props.skillgroup];
});

const winsText = computed(() => {
  return `${props.wins} win${props.wins != 1 ? 's' : ''}`;
});

</script>

<template>
  <div class="inline-block relative w-fit text-slate-300 tooltip tooltip-right" :data-tip="winsText">
    <img :src="skillgroupIcon" :alt="skillgroupName" class="h-full"/>
    <div v-if="wins > 0 && wins < 10 && skillgroup == 0" class="absolute inset-0 text-center leading-normal">
      {{ winsText }}
    </div>
  </div>
</template>