import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Calendar } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { TiltCard } from '@/components/ui/tilt-card';

export function EducationSection() {
  const { t } = useTranslation();

  const education = t('about.education.items', { returnObjects: true }) as Array<{
    degree: string;
    institution: string;
    period: string;
    description: string;
  }>;

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          badge={t('about.education.badge')}
          badgeIcon={GraduationCap}
          title={t('about.education.title')}
          subtitle={t('about.education.subtitle')}
        />

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {education.map((edu, index) => (
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
              <TiltCard tiltAmount={6} scale={1.02}>
                <Card className="h-full border-border/50 shadow-sm bg-card/80 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">{edu.degree}</CardTitle>
                    <CardDescription className="text-base md:text-lg font-medium text-primary">
                      {edu.institution}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground text-sm">{edu.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{edu.description}</p>
                  </CardContent>
                </Card>
              </TiltCard>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
