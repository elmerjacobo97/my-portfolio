import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { TiltCard } from '@/components/ui/tilt-card';

export function ContactInfo() {
  const { t } = useTranslation();

  const contactMethods = [
    {
      icon: Mail,
      title: t('contact.info.email'),
      value: 'contacto@elmerjacobo.dev',
      description: t('contact.info.emailDescription'),
      link: 'mailto:contacto@elmerjacobo.dev',
      external: false,
      color: 'text-primary',
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      value: '+51 92 7347 691',
      description: t('contact.info.phoneDescription'),
      link: 'tel:+51927347691',
      external: false,
      color: 'text-primary',
    },
    {
      icon: MapPin,
      title: t('contact.info.location'),
      value: 'Trujillo, Perú',
      description: t('contact.info.locationDescription'),
      link: 'https://www.google.com/maps?q=Trujillo,+Perú',
      external: true,
      color: 'text-primary',
    },
  ];

  return (
    <FadeIn direction="left" className="space-y-6 lg:space-y-8 order-1 lg:order-2">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t('contact.info.title')}</h2>
        <p className="text-muted-foreground leading-relaxed">{t('contact.info.description')}</p>
      </div>

      <StaggerContainer className="space-y-3 lg:space-y-4" staggerDelay={0.1}>
        {contactMethods.map((method, index) => (
          <StaggerItem key={index}>
            <TiltCard tiltAmount={6} scale={1.02} glare={true}>
              <Card className="shadow-sm bg-card/50 overflow-hidden">
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted">
                      <method.icon className={`w-6 h-6 ${method.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{method.title}</h3>
                      {method.link ? (
                        <a
                          href={method.link}
                          target={method.external ? '_blank' : '_self'}
                          rel={method.external ? 'noopener noreferrer' : undefined}
                          className="text-primary hover:underline font-medium"
                          onClick={() =>
                            trackEvent('contact_method_click', {
                              method: method.title.toLowerCase(),
                              value: method.value,
                            })
                          }
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="font-medium">{method.value}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </FadeIn>
  );
}
