import { Button } from '@/components/ui/button';
import { ArrowLeftCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import './glitch.css';

export default function NotFoundError() {
  return (
    <div className="fixed inset-0 bg-background text-foreground flex items-center justify-center p-4 overflow-hidden z-[100]">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        {/* Glitchy 404 Text */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-black glitch-text select-none text-primary">404</h1>
          <h1 className="absolute inset-0 text-9xl md:text-[12rem] font-black glitch-text-shadow select-none text-accent-foreground/70">
            404
          </h1>
          <h1 className="absolute inset-0 text-9xl md:text-[12rem] font-black glitch-text-shadow-2 select-none text-destructive/60">
            404
          </h1>
        </div>

        {/* Glitchy Message */}
        <div className="space-y-4">
          <p className="text-xl md:text-2xl glitch-message font-light text-foreground/90">
            Esta página se ha perdido en el vacío digital.
          </p>
          <p className="text-sm md:text-base glitch-subtitle font-mono text-destructive">
            {'// 404: Ruta no encontrada en el portafolio'}
          </p>
        </div>

        {/* Glitchy Button */}
        <div className="pt-4">
          <Button asChild variant="default" size="lg">
            <Link to="/" className="flex items-center">
              <ArrowLeftCircle className="w-4 h-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
