import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';

export function ContactCta() {
  const { t } = useTranslation();

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {t('contact.ctaSection.title').split('<gradient>')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {t('contact.ctaSection.title').split('<gradient>')[1]?.split('</gradient>')[0]}
                </span>
                {t('contact.ctaSection.title').split('</gradient>')[1]}
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                {t('contact.ctaSection.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 hover-lift">
                <a
                  href="https://wa.me/51927347691?text=Hola%20Elmer!%20Vi%20tu%20portafolio%20y%20quiero%20agendar%20una%20llamada"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 lg:w-5 h-4 lg:h-5 mr-2 text-primary-foreground" />
                  {t('contact.ctaSection.whatsapp')}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 hover-lift"
              >
                <a href="mailto:contacto@elmerjacobo.dev?subject=Hola!%20Vi%20tu%20portafolio&body=Me%20gustaría%20contactar%20contigo...">
                  <Mail className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                  {t('contact.ctaSection.email')}
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
