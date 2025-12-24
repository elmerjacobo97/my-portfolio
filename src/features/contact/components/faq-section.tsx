import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';

export function FaqSection() {
  const { t } = useTranslation();
  const faqs = t('contact.faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <section className="py-20 md:py-28 bg-muted/20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          badge={t('contact.faq.badge')}
          badgeIcon={HelpCircle}
          title={t('contact.faq.title')}
          subtitle={t('contact.faq.subtitle')}
        />

        {/* Mobile: Cards */}
        <div className="space-y-4 md:hidden">
          {faqs.map((faq, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Card className="border-border/50 shadow-sm bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-5">
                  <h3 className="font-semibold text-base mb-3">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </div>

        {/* Desktop: Accordion */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block"
        >
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <h3 className="font-semibold text-base lg:text-lg pr-4">{faq.q}</h3>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </m.div>
      </div>
    </section>
  );
}
