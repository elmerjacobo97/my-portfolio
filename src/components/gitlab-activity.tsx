import { useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useInView } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { GitlabIcon } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { TiltCard } from '@/components/ui/tilt-card';
import { Skeleton } from '@/components/ui/skeleton';

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

type DayData = {
  date: string;
  count: number;
  level: ContributionLevel;
};

// GitLab devuelve { "2024-01-15": 5, "2024-01-16": 0, ... }
type GitLabCalendarData = Record<string, number>;

function getContributionLevel(count: number): ContributionLevel {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function generateCalendarData(data: GitLabCalendarData): DayData[] {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const days: DayData[] = [];
  const current = new Date(oneYearAgo);

  // Ajustar al domingo más cercano
  current.setDate(current.getDate() - current.getDay());

  while (current <= today) {
    const dateStr = current.toISOString().split('T')[0];
    const count = data[dateStr] || 0;
    days.push({
      date: dateStr,
      count,
      level: getContributionLevel(count),
    });
    current.setDate(current.getDate() + 1);
  }

  return days;
}

function CalendarGrid({ data, labels }: { data: DayData[]; labels: { months: string[]; less: string; more: string } }) {
  // Agrupar por semanas
  const weeks = useMemo(() => {
    const result: DayData[][] = [];
    for (let i = 0; i < data.length; i += 7) {
      result.push(data.slice(i, i + 7));
    }
    return result;
  }, [data]);

  // Calcular meses para labels
  const monthLabels = useMemo(() => {
    const result: { month: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          result.push({ month: labels.months[month], weekIndex });
          lastMonth = month;
        }
      }
    });

    return result;
  }, [weeks, labels.months]);

  const totalContributions = data.reduce((sum, day) => sum + day.count, 0);

  const levelColors = [
    'bg-muted dark:bg-card',
    'bg-purple-200 dark:bg-purple-900/60',
    'bg-purple-300 dark:bg-purple-700',
    'bg-purple-500 dark:bg-purple-500',
    'bg-purple-700 dark:bg-purple-300',
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* Month labels */}
      <div className="flex text-xs text-muted-foreground ml-8">
        {monthLabels.map(({ month, weekIndex }, i) => (
          <span
            key={i}
            style={{ marginLeft: i === 0 ? 0 : `${(weekIndex - (monthLabels[i - 1]?.weekIndex || 0)) * 14 - 20}px` }}
          >
            {month}
          </span>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex gap-[3px] overflow-x-auto pb-2">
        {/* Weekday labels */}
        <div className="flex flex-col gap-[3px] text-xs text-muted-foreground pr-1">
          <span className="h-[12px]"></span>
          <span className="h-[12px] leading-[12px]">L</span>
          <span className="h-[12px]"></span>
          <span className="h-[12px] leading-[12px]">M</span>
          <span className="h-[12px]"></span>
          <span className="h-[12px] leading-[12px]">V</span>
          <span className="h-[12px]"></span>
        </div>

        {/* Weeks */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-[12px] h-[12px] rounded-sm ${levelColors[day.level]} transition-colors`}
                title={`${day.date}: ${day.count} contribuciones`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
        <span>{totalContributions} contribuciones en el último año</span>
        <div className="flex items-center gap-1">
          <span>{labels.less}</span>
          {levelColors.map((color, i) => (
            <div key={i} className={`w-[12px] h-[12px] rounded-sm ${color}`} />
          ))}
          <span>{labels.more}</span>
        </div>
      </div>
    </div>
  );
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

  const labels =
    i18n.language === 'en'
      ? {
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          less: 'Less',
          more: 'More',
        }
      : {
          months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          less: 'Menos',
          more: 'Más',
        };

  const calendarData = useMemo(() => {
    if (!data) return [];
    return generateCalendarData(data);
  }, [data]);

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
                  <div className="flex justify-center overflow-x-auto">
                    <CalendarGrid data={calendarData} labels={labels} />
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
