// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://ayuntamientoelrecuenco.es',
  base: '/',
  integrations: [
    sitemap(),
    AstroPWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{html,css,js,svg,woff2}'],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /\.(?:webp|jpg|jpeg|png)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
      manifest: {
        name: 'El Recuenco — Un pueblo con futuro',
        short_name: 'El Recuenco',
        description: 'Web oficial del municipio de El Recuenco, Guadalajara.',
        theme_color: '#1B3A2D',
        background_color: '#FAFAF7',
        display: 'standalone',
        lang: 'es',
        icons: [
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  security: {
    checkOrigin: true,
  },
});
