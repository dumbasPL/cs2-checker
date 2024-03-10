import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  plugins: [vue()],
  build: {
    outDir: 'dist'
  },
  clearScreen: false,
})
