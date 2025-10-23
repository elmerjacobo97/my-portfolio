import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ExternalLink, Github, Star } from 'lucide-react';
import type { Project } from '@/hooks/use-projects';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

export function ProjectCard({ project, featured = false, className = '' }: ProjectCardProps) {
  const maxTechBadges = featured ? 6 : 4;
  const showHighlights = featured && project.highlights.length > 0;
  const remainingTechs = project.technologies.slice(maxTechBadges);
  const hasMoreTechs = remainingTechs.length > 0;

  return (
    <Card className={`group hover-lift shadow-sm bg-card/50 ${className}`}>
      {/* Project Preview Image */}
      <div className="relative h-48 overflow-hidden">
        {/* Imagen principal */}
        {project.image ? (
          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5" />
        )}

        {/* Capa de oscurecimiento para contraste */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {project.featured && (
            <Badge variant="default" className="text-xs shadow-lg">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Destacado
            </Badge>
          )}
        </div>
      </div>

      {/* Card Content */}
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
            {/* Categoría más pequeña */}
            <Badge variant="outline" className="text-xs shrink-0">
              {project.category}
            </Badge>
          </div>
          <CardDescription className="text-sm line-clamp-3">{project.description}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Technologies con Tooltip */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, maxTechBadges).map((tech: string) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {hasMoreTechs && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs cursor-help">
                  +{remainingTechs.length}
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs" align="center">
                <div className="flex flex-wrap gap-1">
                  {remainingTechs.map((tech: string) => (
                    <Badge key={tech} variant="default" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Highlights - Solo para featured */}
        {showHighlights && (
          <div className="pt-2 border-t">
            <ul className="space-y-1.5">
              {project.highlights.slice(0, 2).map((highlight: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          {project.liveUrl && (
            <Button variant="default" size="sm" className="flex-1" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver proyecto
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="sm" className={project.liveUrl ? 'w-auto' : 'flex-1'} asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                {!project.liveUrl && <span className="ml-2">Ver código</span>}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export type { Project, ProjectCardProps };
