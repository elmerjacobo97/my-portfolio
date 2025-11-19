import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Terminal, Zap } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

export function ServicesSection() {
  const { t } = useTranslation();
  const services = t('services.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    content: string;
    skills: string[];
  }>;

  const icons = [Code, Terminal, Zap];

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="w-3 h-3 mr-1 text-primary" />
              {t('services.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('services.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <ServiceCard {...service} icon={icons[index]} iconColor="text-primary" bgColor="bg-primary/10" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string;
  skills: string[];
  iconColor: string;
  bgColor: string;
};

function ServiceCard({ title, description, icon: Icon, content, skills, iconColor, bgColor }: ServiceCardProps) {
  return (
    <Card className="hover-lift shadow-sm bg-card/50">
      <CardHeader className="text-center">
        <div className={`mx-auto w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mb-4`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center mb-4">{content}</p>
        <div className="flex flex-wrap gap-1 justify-center">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
