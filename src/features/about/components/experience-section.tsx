import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { trackLinkClick } from '@/lib/analytics';
import { SectionHeader } from '@/components/ui/section-header';
import { TiltCard } from '@/components/ui/tilt-card';
import { cn } from '@/lib/utils';

export function ExperienceSection() {
  const { t } = useTranslation();

  const experience = t('about.experience.items', { returnObjects: true }) as Array<{
    title: string;
    company?: string;
    period: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }>;

  return (
    <section className="py-20 md:py-28 bg-muted/20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          badge={t('about.experience.badge')}
          badgeIcon={Briefcase}
          title={t('about.experience.title')}
          subtitle={t('about.experience.subtitle')}
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/70 to-primary/40 -translate-x-1/2" />

          <div className="space-y-8 md:space-y-16">
            {experience.map((exp, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative"
              >
                {/* Timeline dot */}
                <m.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
                  className="hidden md:block absolute left-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full -translate-x-1/2 shadow-lg z-10"
                />

                <div
                  className={cn('md:w-[calc(50%-3rem)]', index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8')}
                >
                  <TiltCard tiltAmount={6} scale={1.02}>
                    <Card className="border-border/50 shadow-sm bg-card/80 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
                      <CardHeader>
                        <div className="flex flex-col gap-2">
                          <Badge variant="secondary" className="w-fit text-xs">
                            {exp.period}
                          </Badge>
                          <CardTitle className="text-lg md:text-xl">{exp.title}</CardTitle>
                          {exp.company && (
                            <Button asChild variant="link" className="justify-start w-fit p-0 h-auto">
                              <a
                                href="https://abeha.mx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base md:text-lg font-medium text-primary hover:text-primary/80"
                                onClick={() => trackLinkClick('https://abeha.mx', 'ABEHA Company')}
                              >
                                {exp.company}
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{exp.description}</p>

                        <div>
                          <h4 className="font-semibold mb-2">{t('about.experience.achievements')}</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                <span className="text-muted-foreground text-sm">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">{t('about.experience.technologies')}</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs transition-colors hover:bg-primary/20 hover:text-primary"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
