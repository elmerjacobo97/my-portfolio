import { useTranslation } from 'react-i18next';
import NumberFlow from '@number-flow/react';
import { getNumberSuffix } from '@/lib/utils';
import type { ProjectStatistics } from '@/hooks/use-projects';

interface ProjectsStatsProps {
  projectCount: number;
  statistics?: ProjectStatistics;
}

export function ProjectsStats({ projectCount, statistics }: ProjectsStatsProps) {
  const { t } = useTranslation();

  const totalUsers = statistics?.totalUsers || 0;
  const suffix = getNumberSuffix(totalUsers);
  const shortValue = totalUsers >= 1_000 ? totalUsers / 1_000 : totalUsers;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-2xl mx-auto pt-6 lg:pt-8">
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">
          <NumberFlow value={projectCount} />
          <span>+</span>
        </div>
        <div className="text-sm text-muted-foreground">{t('projects.stats.projects')}</div>
      </div>

      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">
          <NumberFlow value={statistics?.totalTechnologies || 0} />
          <span>+</span>
        </div>
        <div className="text-sm text-muted-foreground">{t('projects.stats.technologies')}</div>
      </div>

      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">
          <NumberFlow value={shortValue} />
          <span>{suffix}</span>
        </div>
        <div className="text-sm text-muted-foreground">{t('projects.stats.users')}</div>
      </div>

      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">
          <NumberFlow value={statistics?.satisfactionRate || 0} />
          <span>%</span>
        </div>
        <div className="text-sm text-muted-foreground">{t('projects.stats.satisfaction')}</div>
      </div>
    </div>
  );
}
