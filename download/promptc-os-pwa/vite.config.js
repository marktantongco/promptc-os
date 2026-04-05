import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['manifest.json'],
      manifest: {
        name: 'promptc OS — AI Prompt Engineering Reference',
        short_name: 'promptc OS',
        description: 'Senior-dev prompt engineering system with copy-ready outputs, 6 zones, 22 workflows',
        theme_color: '#0B0D10',
        background_color: '#0B0D10',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: './',
        scope: './',
        icons: [
          {
            src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect width='512' height='512' rx='80' fill='%230B0D10'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='300'>⚡</text></svg>",
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect width='192' height='192' rx='30' fill='%230B0D10'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='110'>⚡</text></svg>",
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        categories: ['productivity', 'utilities', 'developer-tools']
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          }
        ]
      }
    })
  ],
  base: './',
  build: { target: 'es2020' }
})
