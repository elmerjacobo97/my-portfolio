import * as React from 'react';
import { createRootRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ScrollToTop } from '@/components/scroll-to-top';
import NotFoundError from '@/components/errors/not-found-error';
import GeneralError from '@/components/errors/general-error';

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="relative z-10">
          <Header />
          <main className="pt-16">
            <Outlet />
          </main>
          <Footer />
        </div>
        <ScrollToTop />
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
  ),
  pendingComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl font-bold text-gray-500">Cargando...</div>
    </div>
  ),
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
});
