<script setup lang="ts">
import { computed } from 'vue';
import ar_baggage from '../img/maps/ar_baggage.svg';
import ar_shoots from '../img/maps/ar_shoots.svg';
import cs_italy from '../img/maps/cs_italy.svg';
import cs_office from '../img/maps/cs_office.svg';
import de_ancient from '../img/maps/de_ancient.svg';
import de_anubis from '../img/maps/de_anubis.svg';
import de_dust from '../img/maps/de_dust.svg';
import de_dust2 from '../img/maps/de_dust2.svg';
import de_inferno from '../img/maps/de_inferno.svg';
import de_mirage from '../img/maps/de_mirage.svg';
import de_nuke from '../img/maps/de_nuke.svg';
import de_overpass from '../img/maps/de_overpass.svg';
import de_vertigo from '../img/maps/de_vertigo.svg';
import none from '../img/maps/none.png';

const mapImages: Record<string, string> = {
  ar_baggage,
  ar_shoots,
  cs_italy,
  cs_office,
  de_ancient,
  de_anubis,
  de_dust,
  de_dust2,
  de_inferno,
  de_mirage,
  de_nuke,
  de_overpass,
  de_vertigo,
};

const props = defineProps<{
  map: string;
}>();

const mapIcon = computed(() => {
  return mapImages[props.map] || none;
});

</script>

<template>
  <img :src="mapIcon" :alt="props.map" class="inline-block align-baseline w-fit" />
</template>