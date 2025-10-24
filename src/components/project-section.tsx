import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, Rocket } from 'lucide-react';
import { ProjectCard } from '@/components/project-card';
import { useProjects } from '@/hooks/use-projects';
import { ProjectCardSkeleton } from '@/components/project-card-skeleton';

export function ProjectsSection() {
  const { data: projects, isLoading } = useProjects();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <Badge variant="outline" className="mb-4">
            <Code className="w-3 h-3 mr-1" />
            Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Proyectos destacados</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una selección destacada de mis proyectos más impactantes y tecnológicamente avanzados
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6 md:gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading && projects && projects.projects.length > 0 && (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6 md:gap-8">
            {projects?.projects.slice(0, 4).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" className="hover-lift">
            <Rocket className="w-5 h-5 mr-2" />
            Ver todos los proyectos
          </Button>
        </div>
      </div>
    </section>
  );
}
