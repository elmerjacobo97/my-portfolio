import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Code2 } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { getSkillsByCategory } from '@/features/about/data/skills-data';

export function SkillsSection() {
  const { t } = useTranslation();
  const skillsByCategory = getSkillsByCategory(t);

  return (
    <section className="py-16 md:py-20 bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">
              <Code2 className="w-3 h-3 mr-1" />
              {t('about.skills.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.skills.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('about.skills.subtitle')}</p>
          </div>
        </FadeIn>

        <div className="space-y-8 md:space-y-12">
          {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
            <StaggerContainer key={category} staggerDelay={0.08}>
              <FadeIn delay={categoryIndex * 0.1}>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                  <span className="text-primary">
                    {t(`about.skills.categories.${category.toLowerCase()}`, { defaultValue: category })}
                  </span>
                  <div className="flex-1 h-px bg-border"></div>
                </h3>
              </FadeIn>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {skills.map((skill) => (
                  <StaggerItem key={skill.name}>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Card className="group hover-lift shadow-sm bg-card/50">
                          <CardContent className="flex flex-col items-center text-center gap-3">
                            <div
                              className="w-10 h-10 sm:w-12 sm:h-12 transition-all dark:brightness-110 dark:contrast-90"
                              style={{ color: skill.color }}
                            >
                              <skill.icon className="w-full h-full" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-semibold text-sm">{skill.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {skill.experience}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-72" side="top">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold">{skill.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {skill.experience}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{skill.description}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
