import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { m, useInView } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import { getNumberSuffix } from '@/lib/utils';
import type { ProjectStatistics } from '@/hooks/use-projects';

interface ProjectsStatsProps {
  projectCount: number;
  statistics?: ProjectStatistics;
}

export function ProjectsStats({ projectCount, statistics }: ProjectsStatsProps) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const totalUsers = statistics?.totalUsers || 0;
  const suffix = getNumberSuffix(totalUsers);
  const shortValue = totalUsers >= 1_000 ? totalUsers / 1_000 : totalUsers;

  const stats = [
    { value: projectCount, suffix: '+', label: t('projects.stats.projects') },
    { value: statistics?.totalTechnologies || 0, suffix: '+', label: t('projects.stats.technologies') },
    { value: shortValue, suffix: suffix, label: t('projects.stats.users') },
    { value: statistics?.satisfactionRate || 0, suffix: '%', label: t('projects.stats.satisfaction') },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-2xl mx-auto pt-6 lg:pt-8">
      {stats.map((stat, index) => (
        <m.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.6 + index * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="text-center"
        >
          <div className="text-2xl md:text-3xl font-bold text-primary">
            <NumberFlow value={stat.value} />
            <span>{stat.suffix}</span>
          </div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </m.div>
      ))}
    </div>
  );
}
