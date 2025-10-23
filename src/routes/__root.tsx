import { createRootRoute } from '@tanstack/react-router';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10">
        <Header />

        <main className="pt-16">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  ),
});
