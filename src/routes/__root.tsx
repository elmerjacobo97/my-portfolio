import * as React from 'react';
import { createRootRoute, useRouterState } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Footer } from '@/components/footer';
import { ScrollProgressBar } from '@/components/scroll-progress-bar';
import NotFoundError from '@/components/errors/not-found-error';
import GeneralError from '@/components/errors/general-error';
import { trackPageView } from '@/lib/analytics';
import { usePageAnalytics } from '@/hooks/use-page-analytics';
// import { DockMenu } from '@/components/dock-menu';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { FloatingControls } from '@/components/floating-controls';
import { Snowfall } from '@/components/ui/snowfall';
import { Separator } from '@/components/ui/separator';

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
      <Snowfall />
      <ScrollProgressBar />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Header for mobile */}
          <header className="md:hidden sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="font-semibold">Elmer Jacobo</h1>
          </header>

          <FloatingControls />

          <main className="flex-1">
            <Outlet />
          </main>

          <Footer />

          {/* Dock Menu comentado - ahora usamos Sidebar */}
          {/* <div className="hidden md:block">
            <DockMenu />
          </div> */}
        </SidebarInset>
      </SidebarProvider>
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
