import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import {
  User,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Code2,
  Globe,
  Award,
  Heart,
  Coffee,
  Music,
  Camera,
  Download,
  Mail,
  ExternalLink,
} from 'lucide-react';
import {
  ReactLogo,
  TypeScriptLogo,
  NodejsLogo,
  PHPLogo,
  PostgreSQLLogo,
  TailwindLogo,
  DockerLogo,
  ExpressLogo,
  MySQLLogo,
  LaravelLogo,
  GoogleCloudLogo,
  GitLogo,
  AstroLogo,
  MongoDBLogo,
} from '@/components/tech-logos';
import ProfileImage from '@/assets/images/profile-about.png';
import { GitHubActivity } from '@/components/github-activity';

export const Route = createFileRoute('/about/')({
  component: AboutComponent,
});

function AboutComponent() {
  // Organizado por categorías para mejor visualización
  const skillsByCategory = {
    Frontend: [
      {
        name: 'React',
        icon: ReactLogo,
        description: 'Desarrollo de interfaces modernas con componentes reutilizables y gestión de estado eficiente.',
        experience: '4+ años',
      },
      {
        name: 'TypeScript',
        icon: TypeScriptLogo,
        description: 'Tipado estático para código más robusto y mantenible.',
        experience: '3+ años',
      },
      {
        name: 'Tailwind CSS',
        icon: TailwindLogo,
        description: 'Framework de utilidades para diseños responsivos y personalizados.',
        experience: '2+ años',
      },
      {
        name: 'Astro',
        icon: AstroLogo,
        description: 'Framework de utilidades para diseños responsivos y personalizados.',
        experience: '2+ años',
      },
    ],
    Backend: [
      {
        name: 'Node.js',
        icon: NodejsLogo,
        description: 'Desarrollo de APIs y servicios backend escalables.',
        experience: '3+ años',
      },
      {
        name: 'Express',
        icon: ExpressLogo,
        description: 'Framework minimalista para crear APIs RESTful rápidas.',
        experience: '3+ años',
      },
      {
        name: 'PHP',
        icon: PHPLogo,
        description: 'Desarrollo backend con enfoque en aplicaciones empresariales.',
        experience: '2+ años',
      },
      {
        name: 'Laravel',
        icon: LaravelLogo,
        description: 'Framework PHP elegante para aplicaciones web robustas.',
        experience: '2+ años',
      },
    ],
    Database: [
      {
        name: 'PostgreSQL',
        icon: PostgreSQLLogo,
        description: 'Base de datos relacional avanzada con optimización de consultas.',
        experience: '3+ años',
      },
      {
        name: 'MySQL',
        icon: MySQLLogo,
        description: 'Sistema de gestión de bases de datos relacional.',
        experience: '2+ años',
      },
      {
        name: 'MongoDB',
        icon: MongoDBLogo,
        description: 'Base de datos NoSQL para aplicaciones modernas.',
        experience: '2+ años',
      },
    ],
    DevOps: [
      {
        name: 'Docker',
        icon: DockerLogo,
        description: 'Containerización para desarrollo y despliegue consistente.',
        experience: '2+ años',
      },
      {
        name: 'Google Cloud',
        icon: GoogleCloudLogo,
        description: 'Infraestructura cloud escalable y servicios en la nube.',
        experience: '1+ año',
      },
      {
        name: 'Git',
        icon: GitLogo,
        description: 'Control de versiones y colaboración en equipo.',
        experience: '4+ años',
      },
    ],
  };

  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      period: '2022 - Presente',
      description:
        'Lidero el desarrollo de aplicaciones web escalables, implementando arquitecturas modernas y mejorando la experiencia del usuario.',
      achievements: [
        'Implementé una arquitectura de microservicios que mejoró el rendimiento en un 40%',
        'Desarrollé un sistema de autenticación SSO que redujo los tickets de soporte en un 60%',
        'Mentoré a 5 desarrolladores junior en mejores prácticas de desarrollo',
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Innovations',
      period: '2020 - 2022',
      description:
        'Desarrollé aplicaciones web completas desde el diseño hasta el despliegue, trabajando estrechamente con equipos de UX/UI.',
      achievements: [
        'Creé una plataforma de e-commerce que generó $2M en ventas el primer año',
        'Optimicé el tiempo de carga de la aplicación principal en un 65%',
        'Implementé un pipeline CI/CD que redujo el tiempo de despliegue de 4 horas a 15 minutos',
      ],
      technologies: ['React', 'Python', 'Django', 'MySQL', 'Docker'],
    },
    {
      title: 'Frontend Developer',
      company: 'Creative Studio',
      period: '2019 - 2020',
      description:
        'Me especialicé en crear interfaces de usuario atractivas y responsivas para clientes de diversos sectores.',
      achievements: [
        'Desarrollé más de 20 sitios web responsive con altos estándares de calidad',
        'Implementé un sistema de design tokens que mejoró la consistencia visual',
        'Logré un puntaje promedio de 95+ en Google PageSpeed Insights',
      ],
      technologies: ['JavaScript', 'Vue.js', 'SASS', 'Figma'],
    },
  ];

  const education = [
    {
      degree: 'Ingeniería en Sistemas Computacionales',
      institution: 'Universidad Tecnológica',
      period: '2015 - 2019',
      description: 'Especialización en desarrollo de software y arquitectura de sistemas.',
    },
    {
      degree: 'Certificación AWS Solutions Architect',
      institution: 'Amazon Web Services',
      period: '2022',
      description: 'Certificación en diseño de arquitecturas cloud escalables y seguras.',
    },
  ];

  const interests = [
    { name: 'Fotografía', icon: Camera, description: 'Capturando momentos únicos' },
    { name: 'Música', icon: Music, description: 'Toco la guitarra en mi tiempo libre' },
    { name: 'Café', icon: Coffee, description: 'Apasionado del café de especialidad' },
    { name: 'Viajes', icon: Globe, description: 'Explorando nuevas culturas' },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Profile Info */}
            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  <User className="w-3 h-3 mr-1" />
                  Sobre mí
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  Construyendo el{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    futuro digital
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Soy un desarrollador full stack apasionado por crear experiencias digitales que marquen la diferencia.
                  Con más de 4 años de experiencia, combino creatividad y tecnología para resolver problemas complejos.
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Trujillo, Perú</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>4+ años experiencia</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Disponible para proyectos</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>AWS Certified</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="hover-lift">
                  <Mail className="w-5 h-5 mr-2" />
                  Contáctame
                </Button>
                <Button variant="outline" size="lg" className="hover-lift">
                  <Download className="w-5 h-5 mr-2" />
                  Descargar CV
                </Button>
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative mx-auto lg:mx-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl -rotate-3" />

                {/* Main image container */}
                <div className="relative w-full h-full bg-card rounded-2xl overflow-hidden border shadow-xl">
                  <Avatar className="w-full h-full rounded-2xl">
                    <AvatarImage src={ProfileImage} alt="Profile" className="object-cover" />
                    <AvatarFallback className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-primary text-primary-foreground rounded-2xl">
                      EJ
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-2 sm:p-3 rounded-xl shadow-lg">
                  <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground p-2 sm:p-3 rounded-xl shadow-lg">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">
              <Code2 className="w-3 h-3 mr-1" />
              Habilidades
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tecnologías y herramientas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mi stack tecnológico actual, organizado por categorías
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                  <span className="text-primary">{category}</span>
                  <div className="flex-1 h-px bg-border"></div>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                  {skills.map((skill) => (
                    <HoverCard key={skill.name}>
                      <HoverCardTrigger asChild>
                        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50">
                          <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 text-primary">
                              <skill.icon className="w-full h-full" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-semibold text-sm">{skill.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {skill.experience}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-72" side="top">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold">{skill.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {skill.experience}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{skill.description}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <GitHubActivity username="elmerjacobo97" />

      {/* Experience Section */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">
              <Briefcase className="w-3 h-3 mr-1" />
              Experiencia
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mi trayectoria profesional</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un recorrido por mi evolución como desarrollador y los proyectos que han marcado mi carrera
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/70 to-primary/40 md:transform md:-translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-16">
              {experience.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full md:transform md:-translate-x-1/2 shadow-lg z-10"></div>

                  {/* Content Card */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                    }`}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50">
                      <CardHeader className="p-4 md:p-6">
                        <div className="flex flex-col gap-2">
                          <Badge variant="secondary" className="w-fit text-xs">
                            {exp.period}
                          </Badge>
                          <CardTitle className="text-lg md:text-xl">{exp.title}</CardTitle>
                          <CardDescription className="text-base md:text-lg font-medium text-primary">
                            {exp.company}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 md:p-6 pt-0">
                        <p className="text-muted-foreground mb-4 md:mb-6">{exp.description}</p>

                        <div className="mb-4 md:mb-6">
                          <h4 className="font-semibold mb-2 md:mb-3">Logros principales:</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-muted-foreground text-sm md:text-base">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 md:mb-3">Tecnologías utilizadas:</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">
              <GraduationCap className="w-3 h-3 mr-1" />
              Educación
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Formación académica</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="hover-lift shadow-sm bg-card/50 transition-all duration-300 hover:shadow-md">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">{edu.degree}</CardTitle>
                  <CardDescription className="text-base md:text-lg font-medium text-primary">
                    {edu.institution}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground text-sm md:text-base">{edu.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="mb-4">
              <Heart className="w-3 h-3 mr-1" />
              Intereses
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Más allá del código</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Las pasiones que me inspiran y mantienen mi creatividad en constante movimiento
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {interests.map((interest, index) => (
              <Card
                key={index}
                className="hover-lift shadow-sm bg-card/50 backdrop-blur-sm text-center transition-all duration-300 hover:shadow-md"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                    <interest.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{interest.name}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{interest.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                ¿Trabajamos{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">juntos?</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Siempre estoy buscando nuevos desafíos y oportunidades para crear algo extraordinario.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 hover-lift">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Envíame un mensaje
              </Button>
              <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 hover-lift">
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Ver mi LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
