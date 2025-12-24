import { useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { m, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { trackDownload, trackSelectContent } from '@/lib/analytics';
import { User, MapPin, Calendar, Heart, Mail, Download, Eye, ChevronDown, FileText, Code2, Users } from 'lucide-react';
import ProfileImage from '@/assets/images/profile-about.webp';

export function AboutHero() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const titleParts = t('about.title').split(/<\/?gradient>/);

  const quickInfo = [
    { icon: MapPin, text: t('about.quickInfo.location') },
    { icon: Calendar, text: t('about.quickInfo.experience') },
    { icon: Heart, text: t('about.quickInfo.availability') },
    { icon: Users, text: t('about.quickInfo.teamwork') },
  ];

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 md:space-y-8 sm:order-2 lg:order-1">
            {/* Badge */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium">
                <User className="w-3.5 h-3.5 mr-1.5 text-primary" />
                {t('about.badge')}
              </Badge>
            </m.div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                {titleParts.map((part, index) => {
                  const isGradient = index === 1;
                  const words = part.split(' ').filter(Boolean);

                  return words.map((word, wordIndex) => (
                    <m.span
                      key={`${index}-${wordIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 + (index * 3 + wordIndex) * 0.06,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className={
                        isGradient
                          ? 'inline-block mr-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent'
                          : 'inline-block mr-[0.25em]'
                      }
                    >
                      {word}
                    </m.span>
                  ));
                })}
              </h1>

              <m.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
              >
                {t('about.subtitle')}
              </m.p>
            </div>

            {/* Quick Info */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {quickInfo.map((item, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <item.icon className="w-4 h-4 text-primary shrink-0" />
                  <span>{item.text}</span>
                </m.div>
              ))}
            </m.div>

            {/* CTAs */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-row gap-4"
            >
              <Button
                className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                onClick={() => navigate({ to: '/contact' })}
              >
                <Mail className="w-4 h-4 mr-2" />
                {t('about.cta.contact')}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    {t('about.cta.resume')}
                    <ChevronDown className="w-3 h-3 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <a
                      href="https://docs.google.com/document/d/1fy4Od_4WoEu3_2Namww1evF5vnZd96avfyJqB6tce-I/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center cursor-pointer"
                      onClick={() => trackSelectContent('cv', 'view_pdf_about_page')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {t('about.cta.viewPdf')}
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
                      {t('about.cta.downloadPdf')}
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </m.div>
          </div>

          {/* Image */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mt-8 lg:mt-0 sm:order-1 lg:order-2 hidden sm:block"
          >
            <div className="relative mx-auto lg:mx-0 w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
              {/* Decorative backgrounds */}
              <m.div
                animate={{ rotate: [6, 8, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl"
              />
              <m.div
                animate={{ rotate: [-3, -5, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl"
              />

              {/* Avatar */}
              <div className="relative w-full h-full bg-card rounded-2xl overflow-hidden border shadow-xl">
                <Avatar className="w-full h-full rounded-2xl">
                  <AvatarImage src={ProfileImage} alt="Profile" className="object-cover pointer-events-none" />
                  <AvatarFallback className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-2xl">
                    EJ
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Floating badges */}
              <m.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-xl shadow-lg"
              >
                <Code2 className="w-6 h-6" />
              </m.div>
              <m.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground p-3 rounded-xl shadow-lg"
              >
                <Heart className="w-6 h-6" />
              </m.div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
