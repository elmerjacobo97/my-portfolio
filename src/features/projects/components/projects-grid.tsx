import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Code, AlertCircle, FolderOpen } from 'lucide-react';
import { ProjectCard } from '@/components/project-card';
import { ProjectCardSkeleton } from '@/components/project-card-skeleton';
import { TiltCard } from '@/components/ui/tilt-card';
import { SectionHeader } from '@/components/ui/section-header';
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
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            badge={t('projects.badge')}
            badgeIcon={FolderOpen}
            title={t('projects.title')}
            subtitle={t('projects.subtitle')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Code className="w-12 h-12 text-muted-foreground" />
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">{t('projects.noProjects')}</p>
              <p className="text-muted-foreground">{t('projects.noProjectsMessage')}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          badge={t('projects.badge')}
          badgeIcon={FolderOpen}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <m.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: Math.min(index * 0.1, 0.5),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="h-full"
            >
              <TiltCard tiltAmount={6} scale={1.02} className="h-full">
                <ProjectCard project={project} className="h-full" />
              </TiltCard>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
