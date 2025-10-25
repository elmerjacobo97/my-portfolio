import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Terminal, Zap } from 'lucide-react';

const services = [
  {
    title: 'Desarrollo Frontend',
    description: 'Interfaces modernas y responsivas',
    icon: Code,
    content: 'Creo experiencias de usuario excepcionales con las tecnologías más avanzadas',
    skills: ['React', 'TypeScript', 'Next.js'],
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Desarrollo Backend',
    description: 'APIs robustas y escalables',
    icon: Terminal,
    content: 'Arquitecturas sólidas que soportan aplicaciones de alta demanda',
    skills: ['Node.js', 'Python', 'PostgreSQL'],
    iconColor: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    title: 'Optimización & UX',
    description: 'Rendimiento y experiencia premium',
    icon: Zap,
    content: 'Optimizo cada detalle para lograr la máxima velocidad y usabilidad',
    skills: ['SEO', 'Web Vitals', 'A11y'],
    iconColor: 'text-accent-foreground',
    bgColor: 'bg-accent',
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <Badge variant="outline" className="mb-4">
            <Zap className="w-3 h-3 mr-1 text-success" />
            Servicios
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Lo que hago</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Especializado en crear soluciones digitales que combinan funcionalidad, rendimiento y estética moderna
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string;
  skills: string[];
  iconColor: string;
  bgColor: string;
};

function ServiceCard({ title, description, icon: Icon, content, skills, iconColor, bgColor }: ServiceCardProps) {
  return (
    <Card className="hover-lift shadow-sm bg-card/50">
      <CardHeader className="text-center">
        <div className={`mx-auto w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mb-4`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center mb-4">{content}</p>
        <div className="flex flex-wrap gap-1 justify-center">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
