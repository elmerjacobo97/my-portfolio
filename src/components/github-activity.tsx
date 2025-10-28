import GitHubCalendar from 'react-github-calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github } from 'lucide-react';

type GitHubActivityProps = {
  username: string;
};

export function GitHubActivity({ username }: GitHubActivityProps) {
  const customTheme = {
    light: ['hsl(var(--muted))', '#c6b3e8', '#9b7bd6', '#7044c4', 'hsl(var(--primary))'],
    dark: ['hsl(var(--card))', '#5a3d99', '#7044c4', '#9b7bd6', '#c6b3e8'],
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Github className="w-3 h-3 mr-1" />
            GitHub
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Actividad reciente</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mi compromiso con el código y el aprendizaje continuo
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
                labels={{
                  totalCount: '{{count}} contribuciones en el último año',
                  legend: {
                    less: 'Menos',
                    more: 'Más',
                  },
                  months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                  weekdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
