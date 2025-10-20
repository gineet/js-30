import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'drum-kit': resolve(__dirname, 'projects/drum-kit/index.html'),
        'vanilla-clock': resolve(__dirname, 'projects/vanilla-clock/index.html'),
        'css-variables': resolve(__dirname, 'projects/css-variables/index.html'),
        'flex-panels-gallery': resolve(__dirname, 'projects/flex-panels-gallery/index.html'),
        'ajax-typeahead': resolve(__dirname, 'projects/ajax-typeahead/index.html'),
        'canvas-fun': resolve(__dirname, 'projects/canvas-fun/index.html'),
        'shift-select-checkboxes': resolve(__dirname, 'projects/shift-select-checkboxes/index.html'),
        'video-player': resolve(__dirname, 'projects/video-player/index.html'),
        'key-sequence-detection': resolve(__dirname, 'projects/key-sequence-detection/index.html'),
        'slide-in-on-scroll': resolve(__dirname, 'projects/slide-in-on-scroll/index.html'),
        'local-storage-and-event-delegation': resolve(__dirname, 'projects/local-storage-and-event-delegation/index.html'),
        'mouse-move-shadow': resolve(__dirname, 'projects/mouse-move-shadow/index.html'),
        'webcam-fun': resolve(__dirname, 'projects/webcam-fun/index.html'),
        'follow-along-highlighter': resolve(__dirname, 'projects/follow-along-highlighter/index.html'),
      }
    }
  }
})