import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
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
import { FadeIn } from '@/components/ui/motion';
import ProfileImage from '@/assets/images/profile-about.webp';

export function AboutHero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Profile Info */}
          <FadeIn direction="right" className="space-y-6 md:space-y-8 sm:order-2 lg:order-1">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit">
                <User className="w-3 h-3 mr-1" />
                {t('about.badge')}
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                {t('about.title').split('<gradient>')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {t('about.title').split('<gradient>')[1]?.split('</gradient>')[0]}
                </span>
                {t('about.title').split('</gradient>')[1]}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{t('about.subtitle')}</p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{t('about.quickInfo.location')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{t('about.quickInfo.experience')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{t('about.quickInfo.availability')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{t('about.quickInfo.teamwork')}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row justify-start gap-4">
              <Button className="hover-lift" onClick={() => navigate({ to: '/contact' })}>
                <Mail className="w-4 h-4 mr-2 text-primary-foreground" />
                {t('about.cta.contact')}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hover-lift">
                    <FileText className="w-4 h-4 mr-2" />
                    {t('about.cta.resume')}
                    <ChevronDown className="w-3 h-3 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <a
                      href="/ELMER-JACOBO-OTINIANO-CV.pdf"
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
                      href="/ELMER-JACOBO-OTINIANO-CV.pdf"
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
            </div>
          </FadeIn>

          {/* Profile Image */}
          <FadeIn direction="left" className="relative mt-8 lg:mt-0 sm:order-1 lg:order-2 hidden sm:block">
            <div className="relative mx-auto lg:mx-0 w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl -rotate-3" />

              <div className="relative w-full h-full bg-card rounded-2xl overflow-hidden border shadow-xl">
                <Avatar className="w-full h-full rounded-2xl">
                  <AvatarImage src={ProfileImage} alt="Profile" className="object-cover pointer-events-none" />
                  <AvatarFallback className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-primary text-primary-foreground rounded-2xl">
                    EJ
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-2 sm:p-3 rounded-xl shadow-lg">
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground p-2 sm:p-3 rounded-xl shadow-lg">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
