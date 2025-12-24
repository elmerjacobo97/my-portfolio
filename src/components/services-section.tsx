import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Terminal, Zap } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { TiltCard } from '@/components/ui/tilt-card';
import { cn } from '@/lib/utils';

export function ServicesSection() {
  const { t } = useTranslation();

  const services = t('services.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    content: string;
    skills: string[];
  }>;

  const icons = [Code, Terminal, Zap];
  const gradients = [
    'from-blue-500/20 to-cyan-500/20',
    'from-purple-500/20 to-pink-500/20',
    'from-orange-500/20 to-yellow-500/20',
  ];
  const iconColors = ['text-blue-500', 'text-purple-500', 'text-orange-500'];

  return (
    <section className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          badge={t('services.badge')}
          badgeIcon={Zap}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = icons[index];

            return (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <TiltCard tiltAmount={8} scale={1.02}>
                  <Card className="h-full border-border/50 shadow-sm bg-card/80 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
                    <CardHeader className="text-center pb-4">
                      <m.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className={cn(
                          'mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4',
                          'bg-gradient-to-br border border-primary/10',
                          gradients[index]
                        )}
                      >
                        <Icon className={cn('w-8 h-8', iconColors[index])} />
                      </m.div>
                      <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-center leading-relaxed">{service.content}</p>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {service.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs transition-colors hover:bg-primary/20 hover:text-primary"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
