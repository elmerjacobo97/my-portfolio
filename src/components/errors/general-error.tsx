import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeftCircle, RefreshCcw } from 'lucide-react';
import './glitch.css';

export default function GeneralError() {
  return (
    <div className="fixed inset-0 bg-background text-foreground flex items-center justify-center p-4 overflow-hidden z-[100]">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        {/* Glitchy 500 Text */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-black glitch-text select-none text-primary">500</h1>
          <h1 className="absolute inset-0 text-9xl md:text-[12rem] font-black glitch-text-shadow select-none text-warning/80">
            500
          </h1>
          <h1 className="absolute inset-0 text-9xl md:text-[12rem] font-black glitch-text-shadow-2 select-none text-destructive/60">
            500
          </h1>
        </div>

        {/* Glitchy Message */}
        <div className="space-y-4">
          <p className="text-xl md:text-2xl glitch-message font-light text-foreground/90">
            Houston, tenemos un problema.
          </p>
          <p className="text-sm md:text-base glitch-subtitle font-mono text-warning">
            {'// 500: Error interno del servidor'}
          </p>
        </div>

        {/* Glitchy Button */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button asChild variant="outline" size="lg">
            <Link to="/" className="flex items-center">
              <ArrowLeftCircle className="w-4 h-4" />
              Volver al inicio
            </Link>
          </Button>

          <Button onClick={() => window.location.reload()} size="lg">
            <RefreshCcw className="w-4 h-4" />
            Intentar de nuevo
          </Button>
        </div>
      </div>
    </div>
  );
}
