import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, AlertCircle } from 'lucide-react';
import { ProjectCard } from '@/components/project-card';
import { ProjectCardSkeleton } from '@/components/project-card-skeleton';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import type { Project } from '@/hooks/use-projects';

interface ProjectsGridProps {
  projects?: Project[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function ProjectsGrid({ projects, isLoading, error, refetch }: ProjectsGridProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6 md:gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">{t('projects.error')}</p>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => refetch()} variant="outline" className="mt-4">
            {t('projects.retry')}
          </Button>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Code className="w-12 h-12 text-muted-foreground" />
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">{t('projects.noProjects')}</p>
          <p className="text-muted-foreground">{t('projects.noProjectsMessage')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:space-y-10">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Code className="w-3 h-3 mr-1 text-primary" />
            {t('projects.allProjects')}
          </Badge>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t('projects.allProjects')}</h2>
          <p className="text-muted-foreground px-4">
            {t('projects.projectsCount', {
              count: projects.length,
              s: projects.length !== 1 ? 's' : '',
            })}
          </p>
        </div>
      </FadeIn>

      <StaggerContainer
        className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6 md:gap-8"
        staggerDelay={0.1}
      >
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
