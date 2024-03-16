<script setup lang="ts">
import AvatarImage from './AvatarImage.vue';
import BanBanner from './BanBanner.vue';
import PremierRating from './PremierRating.vue';
import XpProgress from './XpProgress.vue';
</script>

<template>
  <div class="w-96 bg-base-300 shadow-xl rounded-2xl p-4">
    <div class="flex gap-4">
      <div class="flex flex-col gap-2 items-center">
        <AvatarImage src="https://avatars.akamai.steamstatic.com/063070817fd3fa76d116fb835868dc9a7082be84_full.jpg" class="size-16 "/>
        <PremierRating :rating="25727" />
      </div>
      <div class="w-full">
        <BanBanner class="mb-1" :vac="false" :locked="false" :communityBanned="false" :penaltyReason="'GriefingReports'" :penaltyExpires="Date.now() / 1000 + 65" />
        <div class="font-bold text-lg">
          <img src="/img/prime.svg" alt="prime" class="inline align-text-bottom h-6">
          Bread
        </div>
        <XpProgress :xp="124345" />
      </div>
    </div>
  </div>
</template>