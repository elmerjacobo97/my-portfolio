import { createFileRoute } from '@tanstack/react-router';
import { useProjects } from '@/hooks/use-projects';
import { ProjectsHero } from '@/features/projects/components/projects-hero';
import { ProjectsGrid } from '@/features/projects/components/projects-grid';
import { ProjectsCta } from '@/features/projects/components/projects-cta';

export const Route = createFileRoute('/projects/')({
  component: ProjectsComponent,
});

function ProjectsComponent() {
  const { data, isLoading, error, refetch } = useProjects();

  return (
    <div className="w-full min-h-screen">
      <ProjectsHero projectCount={data?.projects.length || 0} statistics={data?.statistics} />

      <section className="py-12 lg:py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-16">
            <ProjectsGrid projects={data?.projects} isLoading={isLoading} error={error} refetch={refetch} />
          </div>
        </div>
      </section>

      <ProjectsCta />
    </div>
  );
}
