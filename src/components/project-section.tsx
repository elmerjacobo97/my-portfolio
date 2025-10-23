import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, Rocket } from 'lucide-react';
import { ProjectCard, type Project } from './project-card';

const projects: Project[] = [
  {
    id: '1',
    title: 'ShopFlow Pro',
    description: 'Plataforma de e-commerce completa',
    image: '/projects/shopflow-pro.jpg',
    category: 'E-commerce',
    featured: true,
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    liveUrl: 'https://shopflow-pro.example.com',
    githubUrl: 'https://github.com/username/shopflow-pro',

    highlights: [
      'Integración con pasarela de pago',
      'Panel de administración completo',
      'Sistema de recomendaciones con IA',
    ],
  },
  {
    id: '2',
    title: 'DataViz Analytics',
    description: 'Dashboard de visualización de datos',
    image: '/projects/dataviz-analytics.jpg',
    category: 'SaaS',
    featured: false,
    technologies: ['Next.js', 'D3.js', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://dataviz-analytics.example.com',
    githubUrl: 'https://github.com/username/dataviz-analytics',
    highlights: [
      'Visualizaciones interactivas',
      'Exportación de reportes en PDF/Excel',
      'Autenticación y roles de usuario',
    ],
  },
  {
    id: '3',
    title: 'FitTracker AI',
    description: 'App de fitness con IA',
    image: '/projects/fittracker-ai.jpg',
    category: 'Mobile',
    featured: false,
    technologies: ['React Native', 'Python', 'TensorFlow', 'Firebase'],
    liveUrl: 'https://fittracker-ai.example.com',
    githubUrl: 'https://github.com/username/fittracker-ai',
    highlights: [
      'Reconocimiento de ejercicios con IA',
      'Plan de entrenamiento personalizado',
      'Seguimiento de progreso con gráficos',
    ],
  },
];

export function ProjectsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <Badge variant="outline" className="mb-4">
            <Code className="w-3 h-3 mr-1" />
            Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Proyectos destacados</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una selección curada de mis trabajos más impactantes y tecnológicamente avanzados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="hover-lift">
            <Rocket className="w-5 h-5 mr-2" />
            Ver todos los proyectos
          </Button>
        </div>
      </div>
    </section>
  );
}
