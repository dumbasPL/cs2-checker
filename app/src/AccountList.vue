<script setup lang="ts">
import AccountCard from './components/AccountCard.vue';

const test = {
  // TODO: steamid
  personaName: 'nezu',
  avatarUrl: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/42/420993ab6da5d1e5c0dba8e3de69c74d10b622ea_full.jpg',
  limited: false,
  locked: false,
  communityBanned: false,
  level: 10,
  curXp: 31,
  prime: true,
  bonusXpTimestampRefresh: 1710896400,
  bonusXpUsedflags: 19,
  xpTrailLevel: 0,
  xpTrailTimestampRefresh: null,
  redeemableDrops: 0,
  redeemableDropsGenerated: 1710684758,
  vac: false,
  penaltyReason: 'GriefingReports',
  penaltyExpires: 1711149783,
  ranks: {
    perMapRank: {
      de_dust2: { rank: 0, wins: 7 },
      de_inferno: { rank: 0, wins: 4 },
      cs_office: { rank: 0, wins: 2 },
      de_mirage: { rank: 10, wins: 19 }
    },
    premier: {
      rating: 27334,
      wins: 29,
      leaderboardName: 'nezu',
      leaderboardNameStatus: 0
    },
    wingman: { rank: 0, wins: 4 }
  }
}
</script>

<template>
  <div class="grid grid-cols-3 gap-4 m-4">
    <AccountCard :account="test" />
  </div>
</template>