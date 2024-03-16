<script setup lang="ts">
import { computed, ref } from 'vue';
import BanCountdown from './BanCountdown.vue';

const props = defineProps<{
  vac: boolean,
  locked: boolean,
  communityBanned: boolean,
  penaltyReason: string | null,
  penaltyExpires: number | null,
}>();

function getPenaltyReason(reason: string) {
  switch (reason) {
  case 'Kicked':
    return "You were kicked from the last match";
  case 'Abandon':
    return "You abandoned the last match";
  case 'Abandon_Grace':
    return "Resolving matchmaking state for your account";
  case 'DisconnectedTooLong':
    return "You failed to reconnect to the last match";
  case 'DisconnectedTooLong_Grace':
    return "Resolving matchmaking state after the last match";
  case 'SkillGroupCalibration': 
    return "Rank calibration in progress";
  case 'FailedToConnect': 
    return "You failed to connect by match start";
  case 'TK_Spawn':
    return "You killed a teammate at round start";
  case 'TK_Limit':
    return "You killed too many teammates";
  case 'TH_Spawn':
    return "You did too much damage to your teammates at round start";
  case 'TH_Limit':
    return "You did too much damage to your teammates";
  case 'OfficialBan':
    return "This account is permanently Untrusted";
  case 'KickedTooMuch':
    return "You were kicked from too many recent matches";
  case 'KickAbuse':
    return "You have kicked too many teammates in recent matches";
  case 'ConvictedForCheating':
    return "Convicted by Overwatch - Majorly Disruptive";
  case 'ConvictedForBehavior':
    return "Convicted by Overwatch - Minorly Disruptive";
  case 'GsltViolation':
    return "A server using your game server login token has been banned";
  case 'GriefingReports':
    return "You have received significantly more griefing reports than most players";
  default:
    return `Unknown reason: ${reason}`
  }
}

function permanentPenaltyMessage(reason: string) {
  switch (reason) {
  case 'OfficialBan':
    return "Untrusted";
  case 'ConvictedForCheating':
    return "Overwatch";
  default:
    return null;
  }
}

const refreshKey = ref(0);

const bans = computed(() => {
  refreshKey.value; // Trigger reactivity
  let bans = [];
  if (props.communityBanned) {
    bans.push({
      key: 'communityBanned',
      text: 'Community',
      class: ['bg-orange-600', 'text-black'],
      tooltip: 'Community banned',
    });
  }
  if (props.locked) {
    bans.push({
      key: 'locked',
      text: 'Locked',
      class: ['bg-orange-500', 'text-black'],
      tooltip: 'Account locked by owner',
    });
  }
  if (props.vac) {
    bans.push({
      key: 'vac',
      text: 'VAC',
      tooltip: 'Valve Anti-Cheat',
      class: ['bg-[#BE0000]', 'text-black'],
    });
  }
  if (props.penaltyReason) {
    const penaltyMessage = permanentPenaltyMessage(props.penaltyReason);
    const expired = props.penaltyExpires ? Math.floor(Date.now() / 1000) >= Math.floor(props.penaltyExpires) : false;
    bans.push({
      key: props.penaltyReason,
      text: penaltyMessage ?? expired ? 'Expired' : null,
      class: [
        expired ? 'bg-success' : penaltyMessage ? 'bg-[#BE0000]' : 'bg-[#E1C111]',
        'text-black'
      ],
      tooltip: getPenaltyReason(props.penaltyReason),
      expires: penaltyMessage || expired ? null : props.penaltyExpires,
    });
  }
  return bans;
});
</script>

<template>
  <div class="flex gap-1">
    <div v-for="ban in bans" :key="ban.key" 
      class="w-full text-sm font-bold text-center rounded tooltip tooltip-bottom"
      :class="ban.class" :data-tip="ban.tooltip"
    >
      <BanCountdown v-if="ban.expires" :expires="ban.expires" @expired="() => refreshKey++" />
      <span v-else>{{ ban.text }}</span>
    </div>
  </div>
</template>