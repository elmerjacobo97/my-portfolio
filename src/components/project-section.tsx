import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, ArrowRight } from 'lucide-react';
import { ProjectCard } from '@/components/project-card';
import { useProjects } from '@/hooks/use-projects';
import { ProjectCardSkeleton } from '@/components/project-card-skeleton';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

export function ProjectsSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: projects, isLoading } = useProjects();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Code className="w-3 h-3 mr-1 text-primary" />
              {t('projects.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('projects.sectionTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('projects.description')}
            </p>
          </div>
        </FadeIn>

        {isLoading && (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6 md:gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading && projects && projects.projects.length > 0 && (
          <StaggerContainer className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6 md:gap-8" staggerDelay={0.1}>
            {projects?.projects.slice(0, 4).map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {!isLoading && projects && projects.projects.length > 4 && (
          <FadeIn delay={0.5}>
            <div className="text-center mt-12">
              <Button type="button" size="lg" className="hover-lift" onClick={() => navigate({ to: '/projects' })}>
                  {t('projects.cta.viewAll')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
