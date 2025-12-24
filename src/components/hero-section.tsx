import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
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
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import avatar from '@/assets/images/avatar.webp';

export function HeroSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="min-h-dvh flex items-center justify-center relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <m.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Status Badge */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center lg:justify-start"
            >
              <Status status="online" className="text-xs sm:text-sm px-4 py-1.5 shadow-lg">
                <StatusIndicator />
                <StatusLabel>{t('hero.status')}</StatusLabel>
              </Status>
            </m.div>

            {/* Main heading */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="space-y-3 sm:space-y-4">
                <p className="block text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
                  <span className="text-muted-foreground">
                    <m.span
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ display: 'inline-block', transformOrigin: '70% 70%' }}
                    >
                      👋
                    </m.span>{' '}
                    {t('hero.greeting')}
                  </span>{' '}
                  <span className="text-foreground/80">{t('hero.name')}</span>
                </p>
                <h1 className="font-black leading-[0.9]">
                  <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-glow">
                    {t('hero.title1')}
                  </span>
                  <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_auto] animate-glow">
                    {t('hero.title2')}
                  </span>
                </h1>
              </div>

              <TextGenerateEffect
                words={t('hero.description')
                  .replace(/<\/strong>/g, '')
                  .replace(/<strong>/g, '')}
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                filter={true}
                duration={0.5}
                staggerDelay={0.1}
              />
            </m.div>

            {/* Tech Stack Pills */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {(t('hero.techStack', { returnObjects: true }) as string[]).map((tech: string) => (
                <Badge key={tech} variant="outline" className="transition-colors">
                  {tech}
                </Badge>
              ))}
            </m.div>

            {/* CTA Buttons */}
            <m.div
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
                {t('hero.cta.viewProjects')}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base xs:text-lg px-8 py-6 hover-lift w-full xs:w-auto"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    {t('hero.cta.resume')}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  <DropdownMenuItem asChild>
                    <a
                      href="https://docs.google.com/document/d/1fy4Od_4WoEu3_2Namww1evF5vnZd96avfyJqB6tce-I/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center cursor-pointer"
                      onClick={() => trackSelectContent('cv', 'view_pdf')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {t('hero.cta.viewPdf')}
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="https://docs.google.com/document/d/1fy4Od_4WoEu3_2Namww1evF5vnZd96avfyJqB6tce-I/export?format=pdf"
                      download="Elmer-Jacobo-CV.pdf"
                      className="flex items-center cursor-pointer"
                      onClick={() => trackDownload('Elmer-Jacobo-CV.pdf')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t('hero.cta.downloadPdf')}
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </m.div>

            <HeroSocialLinks />
          </m.div>

          {/* Right side - Avatar with decorative elements */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative lg:p-16">
              {/* Decorative rings - Hidden on mobile */}
              <m.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 m-4 hidden lg:block"
              >
                <div className="w-full h-full rounded-full border-2 border-primary/20 border-dashed" />
              </m.div>
              <m.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 hidden lg:block"
              >
                <div className="w-full h-full rounded-full border-2 border-accent/20 border-dashed" />
              </m.div>

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
                <m.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-background/80 backdrop-blur-sm border-2 border-accent/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-xl hidden xs:block"
                >
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-primary">4+</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">{t('hero.stats.years')}</div>
                  </div>
                </m.div>

                <m.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-background/80 backdrop-blur-sm border-2 border-accent/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-xl hidden xs:block"
                >
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-primary">15+</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">{t('hero.stats.projects')}</div>
                  </div>
                </m.div>
              </div>
            </div>
          </m.div>
        </div>
      </div>

      {/* Scroll indicator - Only on large screens with enough vertical space */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 hidden xl:block"
      >
        <m.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          <span className="text-xs font-medium">{t('hero.scroll')}</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center p-2">
            <m.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 bg-muted-foreground/50 rounded-full"
            />
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
