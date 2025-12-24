import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Clock, Coffee, Briefcase } from 'lucide-react';

export function ContactHero() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const titleParts = t('contact.title').split(/<\/?gradient>/);

  const promises = [
    { icon: Clock, text: t('contact.promise.response') },
    { icon: Coffee, text: t('contact.promise.consultation') },
    { icon: Briefcase, text: t('contact.promise.proposal') },
  ];

  return (
    <section className="pt-8 sm:pt-12 lg:pt-20 pb-12 lg:pb-16 bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-6 lg:space-y-8">
          {/* Badge */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium">
              <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-primary" />
              {t('contact.badge')}
            </Badge>
          </m.div>

          {/* Title */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
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
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4"
            >
              {t('contact.subtitle')}
            </m.p>
          </div>

          {/* Line */}
          <m.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"
          />

          {/* Promises */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4"
          >
            {promises.map((item, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <item.icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm">{item.text}</span>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
