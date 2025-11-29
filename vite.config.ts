import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true, // ← Esto hace code splitting automático
    }),
    react(),
    tailwindcss(),
    visualizer({
      open: true, // Abre el reporte automáticamente en tu navegador al terminar
      filename: 'stats.html', // Nombre del archivo que se generará
      gzipSize: true, // Muestra el tamaño comprimido (Gzip), que es lo real que descarga el usuario
      brotliSize: true, // Opcional: si usas compresión Brotli
    }) as PluginOption,
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'og-image.png'],
      manifest: {
        name: 'Elmer Jacobo - Desarrollador Full Stack',
        short_name: 'ElmerJacobo',
        description:
          'Portafolio profesional de Elmer Jacobo, desarrollador Full Stack especializado en React y Node.js',
        theme_color: '#3206A4',
        background_color: '#FAFAFF',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'es',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        categories: ['portfolio', 'developer', 'technology'],
        screenshots: [
          {
            src: '/preview.webp',
            sizes: '1920x1080',
            type: 'image/webp',
            form_factor: 'wide',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.github\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'github-api-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60, // 1 hora
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false, // Deshabilitado en dev para evitar cache
        type: 'module',
      },
    }) as PluginOption,
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separa lucide-react en su propio chunk para mejor caching
          if (id.includes('lucide-react')) {
            return 'lucide-icons';
          }
          // Separa otras dependencias grandes
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('@tanstack/react-router')) {
              return 'react-router';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
    // Optimizaciones adicionales
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild', // esbuild es más rápido que terser y viene por defecto
  },
  server: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
});
