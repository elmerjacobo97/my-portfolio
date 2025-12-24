import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Code2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { TiltCard } from '@/components/ui/tilt-card';
import { getSkillsByCategory } from '@/features/about/data/skills-data';

export function SkillsSection() {
  const { t } = useTranslation();
  const skillsByCategory = getSkillsByCategory(t);

  return (
    <section className="py-20 md:py-28 bg-muted/20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          badge={t('about.skills.badge')}
          badgeIcon={Code2}
          title={t('about.skills.title')}
          subtitle={t('about.skills.subtitle')}
        />

        <div className="space-y-8 md:space-y-10">
          {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
            <SkillCategory key={category} category={category} skills={skills} categoryIndex={categoryIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface SkillCategoryProps {
  category: string;
  skills: Array<{
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    experience: string;
    description: string;
  }>;
  categoryIndex: number;
}

function SkillCategory({ category, skills, categoryIndex }: SkillCategoryProps) {
  return (
    <div>
      <m.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: categoryIndex * 0.05 }}
        className="text-lg md:text-xl font-bold mb-4 flex items-center gap-3"
      >
        <span className="text-primary">{category}</span>
        <div className="flex-1 h-px bg-border" />
      </m.h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {skills.map((skill, index) => (
          <m.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.3,
              delay: index * 0.03,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <TiltCard tiltAmount={8} scale={1.03}>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card className="border-border/50 shadow-sm bg-card/80 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer">
                    <CardContent className="flex flex-col items-center text-center gap-2 py-4 px-2">
                      <m.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="w-8 h-8 sm:w-10 sm:h-10"
                        style={{ color: skill.color }}
                      >
                        <skill.icon className="w-full h-full" />
                      </m.div>
                      <h4 className="font-medium text-xs sm:text-sm leading-tight">{skill.name}</h4>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-64" side="top">
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
            </TiltCard>
          </m.div>
        ))}
      </div>
    </div>
  );
}
