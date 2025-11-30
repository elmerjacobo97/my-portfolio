import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { trackLinkClick } from '@/lib/analytics';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

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
    <section className="py-16 md:py-20 bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">
              <Briefcase className="w-3 h-3 mr-1" />
              {t('about.experience.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.experience.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('about.experience.subtitle')}</p>
          </div>
        </FadeIn>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden md:block absolute md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/70 to-primary/40 md:transform md:-translate-x-1/2" />

          <StaggerContainer className="space-y-6 md:space-y-16" staggerDelay={0.15}>
            {experience.map((exp, index) => (
              <StaggerItem key={index} className="relative">
                <div className="hidden md:block absolute md:left-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full md:transform md:-translate-x-1/2 shadow-lg z-10" />

                <div
                  className={`md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}
                >
                  <Card className="group hover-lift shadow-sm bg-card/50">
                    <CardHeader>
                      <div className="flex flex-col gap-2">
                        <Badge variant="secondary" className="w-fit text-xs">
                          {exp.period}
                        </Badge>
                        <CardTitle className="text-lg md:text-xl">{exp.title}</CardTitle>
                        {exp.company && (
                          <Button asChild variant="link" className="justify-start w-fit p-0">
                            <a
                              href="https://abeha.mx"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-base md:text-lg font-medium text-primary"
                              onClick={() => trackLinkClick('https://abeha.mx', 'ABEHA Company')}
                            >
                              {exp.company}
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 md:mb-6">{exp.description}</p>
                      <div className="mb-4 md:mb-6">
                        <h4 className="font-semibold mb-2 md:mb-3">{t('about.experience.achievements')}</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground text-sm md:text-base">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 md:mb-3">{t('about.experience.technologies')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
