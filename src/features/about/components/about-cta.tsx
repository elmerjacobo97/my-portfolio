import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Mail, ExternalLink } from 'lucide-react';
import { trackLinkClick } from '@/lib/analytics';
import { FadeIn } from '@/components/ui/motion';

export function AboutCta() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-muted/20 to-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {t('about.ctaSection.title').split('<gradient>')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {t('about.ctaSection.title').split('<gradient>')[1]?.split('</gradient>')[0]}
                </span>
                {t('about.ctaSection.title').split('</gradient>')[1]}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('about.ctaSection.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="text-lg px-8 py-6 hover-lift" onClick={() => navigate({ to: '/contact' })}>
                <Mail className="w-5 h-5 mr-2" />
                {t('about.ctaSection.talk')}
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 hover-lift">
                <a
                  href="https://www.linkedin.com/in/elmerjacobo97/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLinkClick('https://www.linkedin.com/in/elmerjacobo97/', 'LinkedIn CTA')}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {t('about.ctaSection.linkedin')}
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
