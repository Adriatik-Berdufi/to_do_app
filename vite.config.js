import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import dotenv from 'dotenv';

// Carica le variabili di ambiente dal file .env
dotenv.config();

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
  ],
  //aggiunto per prob con cors policy
  server: {
    proxy: {
      '/xkcd': {
        target: 'https://xkcd.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/xkcd/, ''),
      },
    },
  },
  define: {
    'process.env': process.env,
  },
});
