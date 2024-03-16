<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps<{
  expires: number,
}>();

const emit = defineEmits(['expired']);

const remaining = ref(0);

function updateRemaining() {
  const now = Math.floor(Date.now() / 1000);
  remaining.value = Math.max(0, Math.floor(props.expires) - now);
  if (remaining.value === 0) {
    // this will only emit once since the interval will be cleared
    emit('expired');
  }
}

let interval: ReturnType<typeof setInterval> | undefined = undefined;

watch(() => props.expires, () => {
  clearInterval(interval);
  interval = setInterval(() => {
    updateRemaining();
    if (remaining.value === 0) {
      clearInterval(interval);
    }
  }, 1000);
  updateRemaining();
}, { immediate: true });

// Cleanup
onBeforeUnmount(() => {
  clearInterval(interval);
});

const remainingText = computed(() => {
  const days = Math.floor(remaining.value / 86400);
  const hours = Math.floor((remaining.value % 86400) / 3600);
  const minutes = Math.floor((remaining.value % 3600) / 60);
  const seconds = remaining.value % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
});

</script>

<template>
  <span>{{ remainingText }}</span>
</template>