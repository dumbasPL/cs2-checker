<script setup lang="ts">
import { faGear, faGun, faSliders, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import TagsModal from './TagsModal.vue';

const tagsModal = ref<null | typeof TagsModal>(null);
</script>

<template>
  <header class="bg-base-200">
    <nav class="navbar">
      <div class="navbar-start">
        <a href="/" class="btn btn-ghost font-bold text-lg">
          <FontAwesomeIcon :icon="faGun" class="w-5 h-5"/>
          CS2 checker
        </a>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end gap-4">
        <div class="dropdown dropdown-end">
          <div tabindex="0" class="btn btn-ghost rounded-btn">
            <FontAwesomeIcon :icon="faGear" class="w-5 h-5"/>
          </div>
          <ul tabindex="0" class="dropdown-content z-[1] menu shadow bg-base-300 rounded-box w-52">
            <li>
              <a @click="tagsModal?.open()">
                <FontAwesomeIcon :icon="faTag" class="w-5 h-5"/>
                <span>Tags</span>
              </a>
            </li>
            <li>
              <a>
                <FontAwesomeIcon :icon="faSliders" class="w-5 h-5"/>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <TagsModal ref="tagsModal" />
</template>