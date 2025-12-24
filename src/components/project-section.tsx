import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Code, ArrowRight, Sparkles } from 'lucide-react';
import { ProjectCard } from '@/components/project-card';
import { useProjects } from '@/hooks/use-projects';
import { ProjectCardSkeleton } from '@/components/project-card-skeleton';
import { SectionHeader } from '@/components/ui/section-header';
import { TiltCard } from '@/components/ui/tilt-card';

export function ProjectsSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: projects, isLoading } = useProjects();

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          badge={t('projects.badge')}
          badgeIcon={Code}
          title={t('projects.sectionTitle')}
          subtitle={t('projects.description')}
        />

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading && projects && projects.projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.projects.slice(0, 3).map((project, index) => (
              <m.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
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
        )}

        {!isLoading && projects && projects.projects.length > 3 && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12 md:mt-16"
          >
            <Button
              size="lg"
              className="group px-8 py-6 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              onClick={() => navigate({ to: '/projects' })}
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              {t('projects.cta.viewAll')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </m.div>
        )}
      </div>
    </section>
  );
}
