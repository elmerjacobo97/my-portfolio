import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Clock, Coffee, Briefcase } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';

export function ContactHero() {
  const { t } = useTranslation();

  return (
    <section className="pt-8 sm:pt-12 lg:pt-20 pb-12 lg:pb-16 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center space-y-6 lg:space-y-8">
            <Badge variant="outline" className="mx-auto">
              <MessageCircle className="w-3 h-3 mr-1 text-primary" />
              {t('contact.badge')}
            </Badge>

            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('contact.title').split('<gradient>')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {t('contact.title').split('<gradient>')[1]?.split('</gradient>')[0]}
                </span>
                {t('contact.title').split('</gradient>')[1]}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground w-48 sm:w-auto">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">{t('contact.promise.response')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground w-48 sm:w-auto">
                <Coffee className="w-4 h-4 text-primary" />
                <span className="text-sm">{t('contact.promise.consultation')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground w-48 sm:w-auto">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm">{t('contact.promise.proposal')}</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
