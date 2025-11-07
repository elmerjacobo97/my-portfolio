import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Rocket, Download, Eye, FileText, ChevronDown } from 'lucide-react';
import { trackDownload, trackSelectContent } from '@/lib/analytics';
import { Status, StatusIndicator, StatusLabel } from '@/components/status';
import { HeroSocialLinks } from '@/components/hero-social-links';
import avatar from '@/assets/images/avatar.webp';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="min-h-dvh flex items-center justify-center relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30">
        {/* Main gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-primary/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-accent/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-3xl"
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center lg:justify-start"
            >
              <Status status="online" className="text-xs sm:text-sm px-4 py-1.5 shadow-lg">
                <StatusIndicator />
                <StatusLabel>Disponible para nuevos proyectos</StatusLabel>
              </Status>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="space-y-3 sm:space-y-4">
                <p className="block text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
                  <span className="text-muted-foreground">
                    <motion.span
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ display: 'inline-block', transformOrigin: '70% 70%' }}
                    >
                      👋
                    </motion.span>{' '}
                    Hola, soy
                  </span>{' '}
                  <span className="text-foreground/80">Elmer Jacobo</span>
                </p>
                <h1 className="font-black leading-[0.9]">
                  <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-glow">
                    Full Stack
                  </span>
                  <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_auto] animate-glow">
                    Developer
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Creo <span className="text-primary font-semibold">experiencias digitales</span> que unen diseño y
                desarrollo para convertir ideas en productos eficientes y atractivos.
              </p>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {['React', 'React Native', 'TypeScript', 'Node.js', 'PostgreSQL'].map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-3 py-1 text-sm font-medium bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="text-base xs:text-lg px-8 py-6 hover-lift w-full xs:w-auto shadow-lg shadow-primary/25"
                onClick={() => navigate({ to: '/projects' })}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Ver proyectos
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base xs:text-lg px-8 py-6 hover-lift w-full xs:w-auto"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Currículum
                    <ChevronDown className="w-4 h-4 ml-2" />
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
            </motion.div>

            <HeroSocialLinks />
          </motion.div>

          {/* Right side - Avatar with decorative elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative lg:p-16">
              {/* Decorative rings - Hidden on mobile */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 m-4 hidden lg:block"
              >
                <div className="w-full h-full rounded-full border-2 border-primary/20 border-dashed" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 hidden lg:block"
              >
                <div className="w-full h-full rounded-full border-2 border-accent/20 border-dashed" />
              </motion.div>

              {/* Main avatar container */}
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary via-accent to-primary rounded-full opacity-75 group-hover:opacity-100 blur-2xl transition-all duration-500" />

                {/* Avatar - Responsive sizes */}
                <Avatar className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 ring-4 ring-background shadow-2xl">
                  <AvatarImage
                    src={avatar}
                    alt="Elmer Jacobo"
                    className="object-cover object-center w-full h-full pointer-events-none"
                  />
                  <AvatarFallback className="text-6xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    {''}
                  </AvatarFallback>
                </Avatar>

                {/* Floating badges around avatar - Hidden on small mobile */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-background/80 backdrop-blur-sm border-2 border-accent/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-xl hidden xs:block"
                >
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-primary">4+</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Años</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-background/80 backdrop-blur-sm border-2 border-accent/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-xl hidden xs:block"
                >
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-primary">15+</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Proyectos</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - Only on large screens with enough vertical space */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          <span className="text-xs font-medium">Scroll</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 bg-muted-foreground/50 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
