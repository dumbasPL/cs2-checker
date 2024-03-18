<script setup lang="ts">
import { computed } from 'vue';
import csRating0 from '../img/rating/cs_rating_0.svg';
import csRating1 from '../img/rating/cs_rating_1.svg';
import csRating2 from '../img/rating/cs_rating_2.svg';
import csRating3 from '../img/rating/cs_rating_3.svg';
import csRating4 from '../img/rating/cs_rating_4.svg';
import csRating5 from '../img/rating/cs_rating_5.svg';

const props = defineProps<{
  rating: number
}>();

const ratingTier = computed(() => Math.min(6, Math.floor(props.rating / 5000)));
const thousands = computed(() => Math.floor(props.rating / 1000));
const remainder = computed(() => props.rating % 1000);

const ratingImages = [
  csRating0,
  csRating1,
  csRating2,
  csRating3,
  csRating4,
  csRating5,
];

</script>

<template>
  <div class="relative">
    <img :src="ratingImages[ratingTier]" :alt="`${thousands},${remainder}`" />
    <div class="absolute inset-y-0 left-[11px] font-bold leading-tight text-center" :class="`cs-rating-tier-${ratingTier}`">
      <template v-if="thousands > 0">
        <span class="text-sm">{{ thousands }}</span>
        <span class="text-[0.7rem]">,{{ remainder }}</span>
      </template>
      <span v-else-if="rating > 0" class="text-sm">{{ props.rating }}</span>
    </div>
  </div>
</template>

<style>
.cs-rating-tier-0 {
  color: #b0c3d9;
  text-shadow: 1px 1px #2d435d
}

.cs-rating-tier-1 {
  color: #8cc6ff;
  text-shadow: 1px 1px #00478c
}

.cs-rating-tier-2 {
  color: #6a7dff;
  text-shadow: 1px 1px #000e6a
}

.cs-rating-tier-3 {
  color: #c166ff;
  text-shadow: 1px 1px #3d0066
}

.cs-rating-tier-4 {
  color: #f03cff;
  text-shadow: 1px 1px #37003c
}

.cs-rating-tier-5 {
  color: #eb4b4b;
  text-shadow: 1px 1px #320606
}

.cs-rating-tier-6 {
  color: gold;
  text-shadow: 1px 1px #000
}
</style>