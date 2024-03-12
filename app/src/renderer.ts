import { createApp } from 'vue';
import App from './App.vue';
import { VueQueryPlugin } from "vue-query";

import './app.css';

createApp(App).use(VueQueryPlugin).mount('#app');