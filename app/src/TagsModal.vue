<script setup lang="ts">
import { faExclamationTriangle, faPlus, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, ref } from 'vue';
import { useMutation, useQuery } from 'vue-query';
import trpc from './trpc';

const modal = ref<null | HTMLDialogElement>(null);
const inputName = ref('');

function open() {
  modal.value?.showModal();
}

const {data: tags, refetch, error: queryError} = useQuery('tags', async () => {
  return trpc.tagList.query({});
});

const {mutate: createTag, isLoading: submitting, error: createError} = useMutation('tagCreate', async (data: {name: string}) => {
  return trpc.tagCreate.mutate(data);
}, {
  onSuccess: () => {
    refetch.value();
  }
});

const {mutate: deleteTag, isLoading: deleting, error: deleteError} = useMutation('tagDelete', async (id: number) => {
  return trpc.tagDelete.mutate({id});
}, {
  onSuccess: () => {
    refetch.value();
  }
});

const error = computed(() => queryError.value || createError.value || deleteError.value);

const canSubmit = computed(() => {
  if (!inputName.value || submitting.value) {
    return false;
  }
  if (tags.value) {
    return !tags.value.some((tag) => tag.name === inputName.value);
  }
  return true;
});

async function add() {
  createTag({name: inputName.value});
  inputName.value = '';
}

defineExpose({ open });

</script>

<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <h3 class="font-bold text-lg">
          <FontAwesomeIcon :icon="faTag"/>
          Tags
        </h3>
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <div v-if="error" role="alert" class="alert alert-error mt-4">
        <FontAwesomeIcon :icon="faExclamationTriangle" class="mr-2"/>
        <span>{{ error }}</span>
      </div>

      <div v-if="tags" class="gap-1 flex flex-wrap mt-4">
        <span v-if="tags.length === 0">No tags</span>
        <div v-for="tag in tags" :key="tag.id" class="badge badge-primary gap-2">
          {{ tag.name }}
          <button @click.stop="deleteTag(tag.id)" :disabled="deleting">✕</button>
        </div>
      </div>

      <form @submit.prevent="add()" class="mt-4">
        <label class="input input-primary input-bordered flex items-center pr-0">
          <input v-model="inputName" type="text" class="grow" placeholder="Add new" />
          <button class="btn btn-ghost" :disabled="!canSubmit">
            <FontAwesomeIcon :icon="faPlus"/>
          </button>
        </label>
      </form>
    </div>
  </dialog>
</template>