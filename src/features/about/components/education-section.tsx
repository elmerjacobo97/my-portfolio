import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Calendar } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

export function EducationSection() {
  const { t } = useTranslation();

  const education = t('about.education.items', { returnObjects: true }) as Array<{
    degree: string;
    institution: string;
    period: string;
    description: string;
  }>;

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">
              <GraduationCap className="w-3 h-3 mr-1" />
              {t('about.education.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.education.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('about.education.subtitle')}</p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 gap-6 md:gap-8" staggerDelay={0.15}>
          {education.map((edu, index) => (
            <StaggerItem key={index}>
              <Card className="group hover-lift shadow-sm bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">{edu.degree}</CardTitle>
                  <CardDescription className="text-base md:text-lg font-medium text-primary">
                    {edu.institution}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground text-sm md:text-base">{edu.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">{edu.description}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
