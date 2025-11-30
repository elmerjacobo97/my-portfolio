import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Zap, Code } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { FadeIn } from '@/components/ui/motion';

export function ProjectsCta() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-br from-muted/20 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {t('projects.cta.title').split('<gradient>')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {t('projects.cta.title').split('<gradient>')[1]?.split('</gradient>')[0]}
                </span>
                {t('projects.cta.title').split('</gradient>')[1]}
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                {t('projects.cta.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 hover-lift"
                onClick={() => navigate({ to: '/contact' })}
              >
                <Zap className="w-4 lg:w-5 h-4 lg:h-5 mr-2 text-primary-foreground" />
                {t('projects.cta.startProject')}
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 hover-lift"
              >
                <a
                  href="https://github.com/elmerjacobo97"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('cta_click', { cta_name: 'view_github', location: 'projects_page' })}
                >
                  <Code className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                  {t('projects.cta.viewGithub')}
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
