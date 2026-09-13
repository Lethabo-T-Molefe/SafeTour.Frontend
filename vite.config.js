import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'SafeTour AI Sentinel',
        short_name: 'SafeTour',
        description: 'Move and plan with a clearer sense of relative safety.',
        theme_color: '#022c22',
        background_color: '#022c22',
        display: 'standalone',
        start_url: '/',
        icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
      },
      workbox: {
        // Cache read-only reference/risk data so the map and reports pages
        // still render from the last successful fetch when offline
        // (FR-LOC-2: "offline cache with a staleness notice" — the
        // staleness side is surfaced in the UI via useOnlineStatus/isStale,
        // not by workbox itself).
        runtimeCaching: [
          {
            urlPattern: ({ url }) => /\/api\/v1\/(geo|risk)(\/|$)/.test(url.pathname),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'safetour-reference-data',
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
