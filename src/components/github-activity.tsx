import GitHubCalendar from 'react-github-calendar';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github } from 'lucide-react';

type GitHubActivityProps = {
  username: string;
};

export function GitHubActivity({ username }: GitHubActivityProps) {
  const { t, i18n } = useTranslation();

  const customTheme = {
    light: ['hsl(var(--muted))', '#c6b3e8', '#9b7bd6', '#7044c4', 'hsl(var(--primary))'],
    dark: ['hsl(var(--card))', '#5a3d99', '#7044c4', '#9b7bd6', '#c6b3e8'],
  };

  // Labels based on current language
  const labels = i18n.language === 'en' 
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
    <section className="py-16 md:py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Github className="w-3 h-3 mr-1" />
            GitHub
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.github.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.github.description')}
          </p>
        </div>

        <Card className="shadow-sm bg-card/50 overflow-hidden">
          <CardContent>
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
      </div>
    </section>
  );
}
