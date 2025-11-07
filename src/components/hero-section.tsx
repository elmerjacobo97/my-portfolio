import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Rocket, Github, Linkedin, Mail, Download, Eye, FileText, ChevronDown } from 'lucide-react';
import { trackDownload, trackSelectContent, trackEvent } from '@/lib/analytics';
import avatar from '@/assets/images/avatar.webp';
import { Status, StatusIndicator, StatusLabel } from '@/components/status';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="min-h-dvh flex items-center justify-center relative overflow-hidden py-16 sm:py-0">
      {/* Fondo con resplandor radial púrpura - responsive */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] bg-primary/20 dark:bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] bg-accent/25 dark:bg-accent/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl" />
      </div>

      {/* Puntos decorativos sutiles */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, oklch(var(--primary) / 0.15) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          {/* Avatar - diseño limpio y profesional */}
          <div className="flex justify-center w-full">
            <div className="relative group">
              {/* Borde degradado animado */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary via-accent to-primary rounded-full opacity-75 group-hover:opacity-100 blur-sm transition-all duration-300" />

              {/* Avatar con ring doble */}
              <Avatar className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 ring-[3px] ring-background/30 ring-offset-4 ring-offset-primary/30">
                <AvatarImage
                  src={avatar}
                  alt="Elmer Jacobo"
                  className="object-cover object-center w-full h-full pointer-events-none"
                  width={192}
                  height={192}
                />
                <AvatarFallback className="text-2xl sm:text-3xl font-bold bg-gradient-primary text-primary-foreground">
                  EJ
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Status Badge */}
          <Status status="online" className="mx-auto text-xs sm:text-sm px-4 py-1.5 sm:px-4 sm:py-1.5 shadow-md">
            <StatusIndicator />
            <StatusLabel>Disponible para nuevos proyectos</StatusLabel>
          </Status>

          {/* Main heading - mejor jerarquía */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="block text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-muted-foreground">
                👋 Hola, soy <span className="text-foreground">Elmer Jacobo</span>
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Desarrollador Full Stack
              </span>
            </h1>

            <p className="text-base sm:text-xl md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Transformo ideas en experiencias digitales excepcionales.
              <br className="hidden xs:block" />
              Especializado en crear aplicaciones web modernas con{' '}
              <span className="text-primary font-semibold">código limpio</span> y{' '}
              <span className="text-primary font-semibold">diseño elegante</span>.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-base xs:text-lg px-6 py-5 xs:px-8 xs:py-6 hover-lift w-full xs:w-auto"
              onClick={() => navigate({ to: '/projects' })}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Ver proyectos
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base xs:text-lg px-6 py-5 xs:px-8 xs:py-6 hover-lift w-full xs:w-auto"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Currículum
                  <ChevronDown className="w-3 h-3 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem asChild>
                  <a
                    href="/ELMER-JACOBO-OTINIANO-CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center cursor-pointer"
                    onClick={() => trackSelectContent('cv', 'view_pdf')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver PDF
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href="/ELMER-JACOBO-OTINIANO-CV.pdf"
                    download="Elmer-Jacobo-CV.pdf"
                    className="flex items-center cursor-pointer"
                    onClick={() => trackDownload('Elmer-Jacobo-CV.pdf')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PDF
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="w-11 h-11 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <a
                      href="https://github.com/elmerjacobo97/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('social_click', { platform: 'github', location: 'hero' })}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>GitHub</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="w-11 h-11 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <a
                      href="https://www.linkedin.com/in/elmerjacobo97/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('social_click', { platform: 'linkedin', location: 'hero' })}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>LinkedIn</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="w-11 h-11 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <a
                      href="mailto:contacto@elmerjacobo.dev?subject=Hola!%20Vi%20tu%20portafolio&body=Me%20gustaría%20contactar%20contigo..."
                      onClick={() => trackEvent('social_click', { platform: 'email', location: 'hero' })}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </section>
  );
}
