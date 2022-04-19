import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import vue from "@astrojs/vue";
const production = process.env.NODE_ENV === 'production';


// https://astro.build/config
export default defineConfig({
  integrations: [preact(), vue()],
  vite: {
    plugins: [
      !production && nodePolyfills({
        include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')]
      }),
    ],
    build: {
      rollupOptions: {
        plugins: [
          nodePolyfills(),
        ]
      },
      commonjsOptions: {
        transformMixedEsModules: true
      },
    },
  }
});