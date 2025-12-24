import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mail, Phone } from 'lucide-react';

export function ContactCta() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const titleParts = t('contact.ctaSection.title').split(/<\/?gradient>/);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <m.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium">
              <Phone className="w-3.5 h-3.5 mr-1.5 text-primary" />
              Contacto directo
            </Badge>
          </m.div>

          {/* Title */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
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
                        ? 'inline-block mr-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary'
                        : 'inline-block mr-[0.25em]'
                    }
                  >
                    {word}
                  </m.span>
                ));
              })}
            </h2>

            <m.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {t('contact.ctaSection.subtitle')}
            </m.p>
          </div>

          {/* Line */}
          <m.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"
          />

          {/* CTAs */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button
              asChild
              size="lg"
              className="group text-lg px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              <a
                href="https://wa.me/51927347691?text=Hola%20Elmer!%20Vi%20tu%20portafolio%20y%20quiero%20agendar%20una%20llamada"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {t('contact.ctaSection.whatsapp')}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="group text-lg px-8 py-6 transition-all">
              <a href="mailto:contacto@elmerjacobo.dev?subject=Hola!%20Vi%20tu%20portafolio&body=Me%20gustaría%20contactar%20contigo...">
                <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                {t('contact.ctaSection.email')}
              </a>
            </Button>
          </m.div>
        </div>
      </div>
    </section>
  );
}
