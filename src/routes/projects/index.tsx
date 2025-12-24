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
      <ProjectsGrid projects={data?.projects} isLoading={isLoading} error={error} refetch={refetch} />
      <ProjectsCta />
    </div>
  );
}
