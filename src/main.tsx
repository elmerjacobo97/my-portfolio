import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import { ThemeProvider } from '@/components/theme-provider';
import { queryClient } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { domAnimation, LazyMotion } from 'framer-motion';
import { PWAUpdatePrompt } from '@/components/pwa-update-prompt';
import { initGA } from '@/lib/analytics';
import '@/lib/i18n';
import './index.css';

// Inicializar Google Analytics
initGA();

// Create a new router instance
const router = createRouter({
  routeTree,
  // Habilitar la restauración del scroll
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <ThemeProvider defaultTheme="light" storageKey="my-portfolio-theme">
          <RouterProvider router={router} />
          <PWAUpdatePrompt />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </LazyMotion>
    </QueryClientProvider>
  </StrictMode>
);
