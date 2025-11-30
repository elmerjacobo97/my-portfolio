import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Code } from 'lucide-react';
import { FadeIn } from '@/components/ui/motion';
import { ProjectsStats } from '@/features/projects/components/projects-stats';
import type { ProjectStatistics } from '@/hooks/use-projects';

interface ProjectsHeroProps {
  projectCount: number;
  statistics?: ProjectStatistics;
}

export function ProjectsHero({ projectCount, statistics }: ProjectsHeroProps) {
  const { t } = useTranslation();

  return (
    <section className="pt-8 sm:pt-12 lg:pt-20 pb-12 lg:pb-16 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center space-y-6 lg:space-y-8">
            <Badge variant="outline" className="mx-auto">
              <Code className="w-3 h-3 mr-1 text-primary" />
              {t('projects.badge')}
            </Badge>

            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('projects.title').split('<gradient>')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {t('projects.title').split('<gradient>')[1]?.split('</gradient>')[0] || t('projects.title')}
                </span>
                {t('projects.title').split('</gradient>')[1] || ''}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                {t('projects.subtitle')}
              </p>
            </div>

            <ProjectsStats projectCount={projectCount} statistics={statistics} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
