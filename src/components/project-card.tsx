import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ExternalLink, GithubIcon, Star } from 'lucide-react';
import type { Project } from '@/hooks/use-projects';
import { trackLinkClick } from '@/lib/analytics';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

export function ProjectCard({ project, featured = false, className = '' }: ProjectCardProps) {
  const { t } = useTranslation();
  const maxTechBadges = featured ? 6 : 4;
  const showHighlights = featured && project.highlights.length > 0;
  const remainingTechs = project.technologies.slice(maxTechBadges);
  const hasMoreTechs = remainingTechs.length > 0;

  return (
    <Card
      className={cn(
        'group relative bg-card/80 backdrop-blur-sm overflow-hidden py-0 gap-0',
        'border-border/50 shadow-sm',
        'transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10',
        className
      )}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        {project.image ? (
          <m.img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="default" className="text-xs shadow-lg backdrop-blur-sm">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {t('projects.featured')}
            </Badge>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="text-xs shadow-sm backdrop-blur-sm bg-background/80">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="pt-4 pb-0">
        <div className="space-y-2">
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {project.title}
          </CardTitle>
          <CardDescription className="text-sm line-clamp-2 leading-relaxed">{project.description}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4 pb-5">
        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, maxTechBadges).map((tech: string) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs transition-colors hover:bg-primary/20 hover:text-primary"
            >
              {tech}
            </Badge>
          ))}
          {hasMoreTechs && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs cursor-help hover:bg-muted">
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

        {/* Highlights */}
        {showHighlights && (
          <div className="pt-2 border-t border-border/50">
            <ul className="space-y-1.5">
              {project.highlights.slice(0, 2).map((highlight: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          {project.liveUrl && (
            <Button variant="default" size="sm" className="flex-1 group/btn" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLinkClick(project.liveUrl!, project.title)}
              >
                <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                {t('projects.viewProject')}
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className={cn('group/btn', project.liveUrl ? 'px-3' : 'flex-1')}
              asChild
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLinkClick(project.githubUrl!, `${project.title} - GitHub`)}
              >
                <GithubIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                {!project.liveUrl && <span className="ml-2">{t('projects.viewCode')}</span>}
              </a>
            </Button>
          )}
        </div>
      </CardContent>

      {/* Bottom accent line */}
      <m.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </Card>
  );
}

export type { Project, ProjectCardProps };
