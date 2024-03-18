<script setup lang="ts">
import AvatarImage from './AvatarImage.vue';
import BanBanner from './BanBanner.vue';
import PerMapRanks from './PerMapRanks.vue';
import PremierRating from './PremierRating.vue';
import XpProgress from './XpProgress.vue';
import type { IAccountData } from '../../../checker/src/index';

defineProps<{
  account: IAccountData
}>();
</script>

<template>
  <div class="w-96 bg-base-300 shadow-xl rounded-lg p-4">
    <div class="flex gap-4">
      <AvatarImage :src="account.avatarUrl" class="size-16"/>
      <div class="w-full">
        <BanBanner class="mb-1" :vac="account.vac" :locked="account.locked" :communityBanned="account.communityBanned" 
          :penaltyReason="account.penaltyReason" :penaltyExpires="account.penaltyExpires" />
        <div class="font-bold text-lg">
          <img v-if="account.prime" src="../img/prime.svg" alt="prime" class="inline align-text-bottom h-6 mr-2">
          <span>{{ account.personaName }}</span>
        </div>
        <XpProgress :level="account.level" :xp="account.curXp" :drops="account.redeemableDrops" :xpTrail="account.xpTrailLevel" /> <!-- TODO: redeemableDropsGenerated -->
      </div>
    </div>
    <div class="flex gap-4 mt-1">
      <div>
        <div class="flex justify-center w-16">
          <div class="dropdown dropdown-hover">
            <PremierRating :rating="account.ranks.premier?.rating ?? 0" tabindex="0" role="button" />
            <div tabindex="0" class="card compact dropdown-content z-[1] shadow bg-base-200 rounded-box w-max">
              <div tabindex="0" class="card-body">
                <PerMapRanks :perMapRanks="account.ranks.perMapRank" :wingman="account.ranks.wingman" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full"></div>
    </div>
  </div>
</template>