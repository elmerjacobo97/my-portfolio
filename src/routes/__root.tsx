import * as React from 'react';
import { createRootRoute, useRouterState } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ScrollProgressBar } from '@/components/scroll-progress-bar';
import NotFoundError from '@/components/errors/not-found-error';
import GeneralError from '@/components/errors/general-error';
import { trackPageView } from '@/lib/analytics';
import { usePageAnalytics } from '@/hooks/use-page-analytics';
import { DockMenu } from '@/components/dock-menu';
import { FloatingControls } from '@/components/floating-controls';

function RootComponent() {
  const router = useRouterState();
  const location = router.location;

  // Trackear vista de página al cambiar de ruta
  React.useEffect(() => {
    if (location.pathname) {
      trackPageView(location.pathname, document.title);
    }
  }, [location.pathname]);

  // Trackear tiempo en página (sin scroll depth para evitar ruido)
  usePageAnalytics({
    pageName: location.pathname,
    minTimeThreshold: 10, // 10 segundos mínimo
    trackScroll: false, // Desactivado para portafolio
  });

  return (
    <React.Fragment>
      <ScrollProgressBar />
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="relative z-10">
          <Header />
          <FloatingControls />
          <main className="pt-16 md:pt-0 pb-24">
            <Outlet />
          </main>
          <Footer />
          <div className="hidden md:block">
            <DockMenu />
          </div>
        </div>
      </div>
      <Toaster />
      <SonnerToaster />
      {import.meta.env.MODE === 'development' && (
        <>
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
    </React.Fragment>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  pendingComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl font-bold text-gray-500">Cargando...</div>
    </div>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
});
