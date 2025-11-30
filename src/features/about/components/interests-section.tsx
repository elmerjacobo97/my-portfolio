import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Cpu, Camera, Coffee, Globe } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

const interestIcons = [Cpu, Camera, Coffee, Globe];

export function InterestsSection() {
  const { t } = useTranslation();

  const interestsData = t('about.interests.items', { returnObjects: true }) as Array<{
    name: string;
    description: string;
  }>;

  const interests = interestsData.map((item, index) => ({
    ...item,
    icon: interestIcons[index],
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  }));

  return (
    <section className="py-16 md:py-20 bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">
              <Heart className="w-3 h-3 mr-1" />
              {t('about.interests.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.interests.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('about.interests.subtitle')}</p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.1}>
          {interests.map((interest, index) => (
            <StaggerItem key={index}>
              <Card className="group hover-lift shadow-sm bg-card/50">
                <CardContent className="text-center flex flex-col items-center">
                  <div
                    className={`mx-auto w-12 h-12 sm:w-16 sm:h-16 ${interest.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4`}
                  >
                    <interest.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${interest.color}`} />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{interest.name}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{interest.description}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
