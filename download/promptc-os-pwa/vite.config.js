import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'manifest.json',
        'icon-192.png',
        'icon-512.png',
        'apple-touch-icon.png',
        'favicon-32.png',
        'favicon-16.png'
      ],
      manifest: {
        name: 'promptc OS — AI Prompt Engineering Reference',
        short_name: 'promptc OS',
        description: 'Senior-dev prompt engineering system with copy-ready outputs, 6 zones, 22 workflows, PWA',
        theme_color: '#0B0D10',
        background_color: '#0B0D10',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['productivity', 'utilities', 'developer-tools'],
        shortcuts: [
          { name: 'Master Prompt', url: './?zone=activate' },
          { name: 'Workflow Builder', url: './?zone=build&section=workflow' },
          { name: 'Prompt Diff', url: './?zone=validate' },
          { name: 'Monetize', url: './?zone=monetize' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,ico}'],
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
        ],
        navigateFallback: './index.html'
      }
    })
  ],
  base: './',
  build: {
    target: 'es2020',
    cssMinify: true,
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: false }
    }
  }
})
