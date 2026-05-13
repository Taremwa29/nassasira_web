import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        works: resolve(__dirname, 'works.html'),
        exhibitions: resolve(__dirname, 'exhibitions.html'),
        videos: resolve(__dirname, 'videos.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
