import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'drum-kit': resolve(__dirname, 'projects/drum-kit/index.html'),
        'vanilla-clock': resolve(__dirname, 'projects/vanilla-clock/index.html'),
      }
    }
  }
})