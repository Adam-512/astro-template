import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import vue from "@astrojs/vue";
import WindiCSS from 'vite-plugin-windicss'

const production = process.env.NODE_ENV === 'production';


// https://astro.build/config
export default defineConfig({
  integrations: [preact(), vue()],
  vite: {
    plugins: [
      !production && nodePolyfills({
        include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')]
      }),
      WindiCSS()
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