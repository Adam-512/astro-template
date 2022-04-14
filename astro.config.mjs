import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

import nodePolyfills from 'rollup-plugin-polyfill-node';
const production = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact(),
  ],
  vite: {
    plugins: [
      // ↓ Needed for development mode
      !production && nodePolyfills({
        include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')]
      })
    ],

    build: {
      rollupOptions: {
        plugins: [
          // ↓ Needed for build
          nodePolyfills()
        ]
      },
      // ↓ Needed for build if using WalletConnect and other providers
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }
  }
});