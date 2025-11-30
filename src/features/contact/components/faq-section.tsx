import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

export function FaqSection() {
  const { t } = useTranslation();
  const faqs = t('contact.faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <section className="py-12 lg:py-20 bg-muted/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-4">
              <MessageCircle className="w-3 h-3 mr-1 text-primary" />
              {t('contact.faq.badge')}
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{t('contact.faq.title')}</h2>
            <p className="text-base lg:text-lg text-muted-foreground">{t('contact.faq.subtitle')}</p>
          </div>
        </FadeIn>

        {/* Mobile: Cards */}
        <StaggerContainer className="space-y-4 md:hidden" staggerDelay={0.1}>
          {faqs.map((faq, index) => (
            <StaggerItem key={index}>
              <Card className="shadow-sm bg-card/50 overflow-hidden">
                <CardContent>
                  <h3 className="font-semibold text-base mb-3">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Desktop: Accordion */}
        <FadeIn delay={0.2}>
          <Accordion type="single" collapsible className="hidden md:block">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-left hover:no-underline py-4 lg:py-6">
                  <h3 className="font-semibold text-base lg:text-lg pr-4">{faq.q}</h3>
                </AccordionTrigger>
                <AccordionContent className="pb-4 lg:pb-6">
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
