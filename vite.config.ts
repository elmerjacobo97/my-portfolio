import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { visualizer } from 'rollup-plugin-visualizer';

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
    }),
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
