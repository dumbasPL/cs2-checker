<script setup lang="ts">
import { computed } from 'vue';
import wingman_expired from '../img/ranks/wingman_expired.svg'
import skillgroup_need_wins from '../img/ranks/skillgroup_need_wins.svg';
import wingman0 from '../img/ranks/wingman0.svg';
import wingman1 from '../img/ranks/wingman1.svg';
import wingman2 from '../img/ranks/wingman2.svg';
import wingman3 from '../img/ranks/wingman3.svg';
import wingman4 from '../img/ranks/wingman4.svg';
import wingman5 from '../img/ranks/wingman5.svg';
import wingman6 from '../img/ranks/wingman6.svg';
import wingman7 from '../img/ranks/wingman7.svg';
import wingman8 from '../img/ranks/wingman8.svg';
import wingman9 from '../img/ranks/wingman9.svg';
import wingman10 from '../img/ranks/wingman10.svg';
import wingman11 from '../img/ranks/wingman11.svg';
import wingman12 from '../img/ranks/wingman12.svg';
import wingman13 from '../img/ranks/wingman13.svg';
import wingman14 from '../img/ranks/wingman14.svg';
import wingman15 from '../img/ranks/wingman15.svg';
import wingman16 from '../img/ranks/wingman16.svg';
import wingman17 from '../img/ranks/wingman17.svg';
import wingman18 from '../img/ranks/wingman18.svg';

const skillgroups = [
  wingman0,
  wingman1,
  wingman2,
  wingman3,
  wingman4,
  wingman5,
  wingman6,
  wingman7,
  wingman8,
  wingman9,
  wingman10,
  wingman11,
  wingman12,
  wingman13,
  wingman14,
  wingman15,
  wingman16,
  wingman17,
  wingman18
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
    return wingman_expired;
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