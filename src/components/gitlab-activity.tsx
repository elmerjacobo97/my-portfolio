import { useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useInView } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ContributionCalendar } from 'react-contribution-calendar';
import { Card, CardContent } from '@/components/ui/card';
import { GitlabIcon } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { TiltCard } from '@/components/ui/tilt-card';
import { Skeleton } from '@/components/ui/skeleton';

// GitLab API devuelve { "2024-01-15": 5, "2024-01-16": 2, ... }
type GitLabCalendarData = Record<string, number>;

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

export function GitLabActivity() {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const { data, isLoading, error } = useQuery<GitLabCalendarData>({
    queryKey: ['gitlab-calendar'],
    queryFn: async () => {
      const res = await fetch('/api/gitlab-calendar');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hora
  });

  // Convertir datos de GitLab al formato de react-contribution-calendar
  const calendarData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data).map(([date, count]) => ({
      [date]: { level: getLevel(count), data: { count } },
    }));
  }, [data]);

  // Calcular total de contribuciones
  const totalContributions = useMemo(() => {
    if (!data) return 0;
    return Object.values(data).reduce((sum, count) => sum + count, 0);
  }, [data]);

  // Fechas del último año
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const daysOfWeek =
    i18n.language === 'en'
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Tema púrpura personalizado
  const purpleTheme = {
    level0: 'hsl(var(--muted))',
    level1: '#c6b3e8',
    level2: '#9b7bd6',
    level3: '#7044c4',
    level4: '#5a2d9e',
  };

  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          badge="GitLab"
          badgeIcon={GitlabIcon}
          title={t('about.gitlab.title')}
          subtitle={t('about.gitlab.description')}
        />

        <m.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <TiltCard tiltAmount={4} scale={1.01}>
            <Card className="border-border/50 shadow-sm bg-card/80 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10 overflow-hidden">
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="flex justify-center">
                    <Skeleton className="h-[140px] w-full max-w-[900px]" />
                  </div>
                ) : error ? (
                  <p className="text-center text-muted-foreground">Error al cargar actividad</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-center overflow-x-auto">
                      <ContributionCalendar
                        data={calendarData}
                        dateOptions={{
                          start: oneYearAgo.toISOString().split('T')[0],
                          end: today.toISOString().split('T')[0],
                          daysOfTheWeek: daysOfWeek,
                          startsOnSunday: true,
                          includeBoundary: true,
                        }}
                        styleOptions={{
                          theme: purpleTheme,
                          cx: 12,
                          cy: 12,
                          cr: 2,
                        }}
                        visibilityOptions={{
                          hideDescription: true,
                          hideMonthLabels: false,
                          hideDayLabels: false,
                        }}
                        scroll={false}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      {totalContributions}{' '}
                      {i18n.language === 'en' ? 'contributions in the last year' : 'contribuciones en el último año'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TiltCard>
        </m.div>
      </div>
    </section>
  );
}
