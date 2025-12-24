import { useRef } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { useTranslation } from 'react-i18next';
import { m, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Github } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { TiltCard } from '@/components/ui/tilt-card';

type GitHubActivityProps = {
  username: string;
};

export function GitHubActivity({ username }: GitHubActivityProps) {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const customTheme = {
    light: ['hsl(var(--muted))', '#c6b3e8', '#9b7bd6', '#7044c4', 'hsl(var(--primary))'],
    dark: ['hsl(var(--card))', '#5a3d99', '#7044c4', '#9b7bd6', '#c6b3e8'],
  };

  // Labels based on current language
  const labels =
    i18n.language === 'en'
      ? {
          totalCount: '{{count}} contributions in the last year',
          legend: {
            less: 'Less',
            more: 'More',
          },
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        }
      : {
          totalCount: '{{count}} contribuciones en el último año',
          legend: {
            less: 'Menos',
            more: 'Más',
          },
          months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          weekdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
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
          badge="GitHub"
          badgeIcon={Github}
          title={t('about.github.title')}
          subtitle={t('about.github.description')}
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
                <div className="flex justify-center overflow-x-auto">
                  <GitHubCalendar
                    username={username}
                    theme={customTheme}
                    colorScheme="dark"
                    blockSize={12}
                    blockMargin={4}
                    fontSize={14}
                    showWeekdayLabels
                    labels={labels}
                  />
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </m.div>
      </div>
    </section>
  );
}
