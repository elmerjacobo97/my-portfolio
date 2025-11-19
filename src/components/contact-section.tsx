import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';

export function ContactSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="space-y-8">
            <Badge variant="outline" className="mx-auto">
              <Mail className="w-3 h-3 mr-1 text-primary" />
              {t('contact.badge')}
            </Badge>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                {t('contact.title').split('<gradient>')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {t('contact.title').split('<gradient>')[1].split('</gradient>')[0]}
                </span>
                {t('contact.title').split('</gradient>')[1]}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </div>

            {/* Contact methods */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="text-lg px-8 py-6 hover-lift" onClick={() => navigate({ to: '/contact' })}>
                <Mail className="w-5 h-5 mr-2 text-primary-foreground" />
                {t('contact.cta.talk')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 hover-lift"
                onClick={() => navigate({ to: '/about' })}
              >
                {t('contact.cta.viewProfile')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
