import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectCard } from '@/components/project-card';
import { Code, Zap, AlertCircle } from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { useProjects } from '@/hooks/use-projects';
import { ProjectCardSkeleton } from '@/components/project-card-skeleton';
import { getNumberSuffix } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export const Route = createFileRoute('/projects/')({
  component: ProjectsComponent,
});

function ProjectsComponent() {
  const navigate = useNavigate();
  const { data: projects, isLoading, error, refetch } = useProjects();

  const totalUsers = projects?.statistics.totalUsers || 0;
  const suffix = getNumberSuffix(totalUsers);
  const shortValue = totalUsers >= 1_000 ? totalUsers / 1_000 : totalUsers;

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="pt-8 sm:pt-12 lg:pt-20 pb-12 lg:pb-16 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 lg:space-y-8 animate-fade-in">
            <Badge variant="outline" className="mx-auto">
              <Code className="w-3 h-3 mr-1 text-primary" />
              Portafolio
            </Badge>

            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Mis{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Proyectos</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                Una colección de proyectos que demuestran mi experiencia en desarrollo full stack, desde aplicaciones
                web hasta soluciones móviles y plataformas SaaS.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-2xl mx-auto pt-6 lg:pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  <NumberFlow value={projects?.projects.length || 0} />
                  <span>+</span>
                </div>
                <div className="text-sm text-muted-foreground">Proyectos</div>
              </div>

              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  <NumberFlow value={projects?.statistics.totalTechnologies || 0} />
                  <span>+</span>
                </div>
                <div className="text-sm text-muted-foreground">Tecnologías</div>
              </div>

              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  <NumberFlow value={shortValue} />
                  <span>{suffix}</span>
                </div>
                <div className="text-sm text-muted-foreground">Usuarios</div>
              </div>

              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  <NumberFlow value={projects?.statistics.satisfactionRate || 0} />
                  <span>%</span>
                </div>
                <div className="text-sm text-muted-foreground">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-16">
            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6 md:gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <AlertCircle className="w-12 h-12 text-destructive" />
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold">Error al cargar proyectos</p>
                  <p className="text-muted-foreground">{error.message}</p>
                  <Button onClick={() => refetch()} variant="outline" className="mt-4">
                    Reintentar
                  </Button>
                </div>
              </div>
            )}

            {/* Projects List */}
            {!isLoading && !error && projects && projects.projects.length > 0 && (
              <div className="space-y-8 lg:space-y-10">
                <div className="text-center max-w-3xl mx-auto">
                  <Badge variant="outline" className="mb-4">
                    <Code className="w-3 h-3 mr-1 text-primary" />
                    Portafolio completo
                  </Badge>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">Todos los proyectos</h2>
                  <p className="text-muted-foreground px-4">
                    {projects.projects.length} proyecto{projects.projects.length !== 1 ? 's' : ''} que muestran mi
                    experiencia y habilidades técnicas
                  </p>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6 md:gap-8">
                  {projects.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && projects && projects.projects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Code className="w-12 h-12 text-muted-foreground" />
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold">No hay proyectos disponibles</p>
                  <p className="text-muted-foreground">Los proyectos se mostrarán aquí cuando estén disponibles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                ¿Te gusta lo que{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">ves?</span>
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Cada proyecto es una oportunidad para crear algo extraordinario. Hablemos sobre tu próxima idea.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 hover-lift"
                onClick={() => navigate({ to: '/contact' })}
              >
                <Zap className="w-4 lg:w-5 h-4 lg:h-5 mr-2 text-primary-foreground" />
                Iniciar proyecto
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 hover-lift"
              >
                <a
                  href="https://github.com/elmerjacobo97"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('cta_click', { cta_name: 'view_github', location: 'projects_page' })
                  }
                >
                  <Code className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                  Ver en GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
