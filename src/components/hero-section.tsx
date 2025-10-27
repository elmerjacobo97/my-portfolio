import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Rocket, Github, Linkedin, Mail, Download, Sparkles, Eye, FileText, ChevronDown } from 'lucide-react';
import avatar from '@/assets/images/avatar.png';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="min-h-dvh flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/30 dark:from-background dark:via-primary/10 dark:to-secondary/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <div className="space-y-4 sm:space-y-8 animate-fade-in">
          {/* Avatar */}
          <div className="flex justify-center w-full">
            <Avatar className="w-28 h-28 sm:w-40 sm:h-40 border-4 border-primary/20 shadow-lg">
              <AvatarImage
                src={avatar}
                alt="Elmer Jacobo"
                className="object-cover w-full h-full"
                width={160}
                height={160}
              />
              <AvatarFallback className="text-xl sm:text-2xl font-bold bg-gradient-primary text-primary-foreground">
                EJ
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Status Badge */}
          <Badge variant="secondary" className="mx-auto text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-1.5">
            <Sparkles className="w-3 h-3 mr-1 sm:mr-1.5 text-primary" />
            <span className="hidden sm:inline">Disponible para nuevos proyectos</span>
            <span className="sm:hidden">Disponible</span>
          </Badge>

          {/* Main heading */}
          <div className="space-y-3 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="block text-base sm:text-lg font-normal mb-2 sm:mb-4">👋 Hola, soy Elmer Jacobo</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Desarrollador Full Stack
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              <span className="sm:hidden">
                Creo aplicaciones web modernas con <span className="text-primary font-semibold">código limpio</span>.
              </span>
              <span className="hidden sm:inline">
                Transformo ideas en experiencias digitales excepcionales.
                <br className="hidden md:block" />
                Especializado en crear aplicaciones web modernas con{' '}
                <span className="text-primary font-semibold">código limpio</span> y{' '}
                <span className="text-primary font-semibold">diseño elegante</span>.
              </span>
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
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Abrir en nueva pestaña
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href="/ELMER-JACOBO-OTINIANO-CV.pdf"
                    download="Elmer-Jacobo-CV.pdf"
                    className="flex items-center cursor-pointer"
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
                    <a href="https://github.com/elmerjacobo97/" target="_blank" rel="noopener noreferrer">
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
                    <a href="https://www.linkedin.com/in/elmerjacobo97/" target="_blank" rel="noopener noreferrer">
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
                    <a href="mailto:contacto@elmerjacobo.dev?subject=Hola!%20Vi%20tu%20portafolio&body=Me%20gustaría%20contactar%20contigo...">
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
