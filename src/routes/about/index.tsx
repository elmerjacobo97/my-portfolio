import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  User,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Code2,
  Globe,
  Heart,
  Coffee,
  Music,
  Camera,
  Download,
  Mail,
  ExternalLink,
  Users,
  Eye,
  ChevronDown,
  FileText,
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
  NextJSLogo,
  NestJSLogo,
  SQLiteLogo,
} from '@/components/tech-logos';
import ProfileImage from '@/assets/images/profile-about.png';
import { GitHubActivity } from '@/components/github-activity';

export const Route = createFileRoute('/about/')({
  component: AboutComponent,
});

function AboutComponent() {
  const navigate = useNavigate();

  const skillsByCategory = {
    Frontend: [
      {
        name: 'React',
        icon: ReactLogo,
        description:
          'Biblioteca de JavaScript para crear interfaces de usuario interactivas con componentes reutilizables y gestión eficiente del estado.',
        experience: '4+ años',
        color: '#61DAFB', // Cyan oficial de React
      },
      {
        name: 'Next.js',
        icon: NextJSLogo,
        description:
          'Framework de React para construir aplicaciones web rápidas, con renderizado híbrido (SSR/SSG), rutas optimizadas y excelente rendimiento.',
        experience: '3+ años',
        color: 'currentColor', // Negro/Blanco según tema
      },
      {
        name: 'Astro',
        icon: AstroLogo,
        description:
          'Framework moderno para sitios web ultra-rápidos con arquitectura de islas y contenido estático optimizado.',
        experience: '2+ años',
        color: '#FF5D01', // Naranja oficial de Astro
      },
      {
        name: 'TypeScript',
        icon: TypeScriptLogo,
        description:
          'Superset de JavaScript con tipado estático que permite escribir código más seguro, robusto y fácil de mantener.',
        experience: '3+ años',
        color: '#3178C6', // Azul oficial de TypeScript
      },
      {
        name: 'Tailwind CSS',
        icon: TailwindLogo,
        description:
          'Framework CSS utility-first para crear diseños modernos y responsivos de forma rápida sin salir del HTML.',
        experience: '2+ años',
        color: '#06B6D4', // Cyan oficial de Tailwind
      },
    ],
    Backend: [
      {
        name: 'Node.js',
        icon: NodejsLogo,
        description:
          'Entorno de ejecución de JavaScript del lado del servidor para construir aplicaciones backend rápidas y escalables.',
        experience: '3+ años',
        color: '#339933', // Verde oficial de Node.js
      },
      {
        name: 'Express',
        icon: ExpressLogo,
        description:
          'Framework minimalista y flexible para Node.js, ideal para crear APIs RESTful y aplicaciones web de forma rápida.',
        experience: '3+ años',
        color: 'currentColor', // Negro/Blanco según tema
      },
      {
        name: 'NestJS',
        icon: NestJSLogo,
        description:
          'Framework para Node.js con arquitectura modular y soporte nativo para TypeScript, ideal para APIs escalables y mantenibles.',
        experience: '2+ años',
        color: '#E0234E', // Rojo oficial de NestJS
      },
      {
        name: 'PHP',
        icon: PHPLogo,
        description:
          'Lenguaje de programación del lado del servidor, ampliamente usado para desarrollo web dinámico y aplicaciones empresariales.',
        experience: '2+ años',
        color: '#777BB4', // Púrpura oficial de PHP
      },
      {
        name: 'Laravel',
        icon: LaravelLogo,
        description:
          'Framework PHP moderno y elegante con sintaxis expresiva, ideal para desarrollar aplicaciones web robustas y escalables.',
        experience: '2+ años',
        color: '#FF2D20', // Rojo oficial de Laravel
      },
    ],
    Database: [
      {
        name: 'PostgreSQL',
        icon: PostgreSQLLogo,
        description:
          'Sistema de base de datos relacional avanzado y open-source con potentes características de rendimiento y confiabilidad.',
        experience: '3+ años',
        color: '#4169E1', // Azul oficial de PostgreSQL
      },
      {
        name: 'MySQL',
        icon: MySQLLogo,
        description:
          'Sistema de gestión de bases de datos relacional open-source, ampliamente utilizado para aplicaciones web de alto tráfico.',
        experience: '2+ años',
        color: '#4479A1', // Azul oficial de MySQL
      },
      {
        name: 'MongoDB',
        icon: MongoDBLogo,
        description:
          'Base de datos NoSQL orientada a documentos, flexible y escalable, ideal para aplicaciones modernas con datos no estructurados.',
        experience: '2+ años',
        color: '#47A248', // Verde oficial de MongoDB
      },
      {
        name: 'SQLite',
        icon: SQLiteLogo,
        description:
          'Base de datos relacional ligera y embebida, ideal para aplicaciones móviles y de escritorio sin necesidad de un servidor dedicado.',
        experience: '2+ años',
        color: '#0F80CC', // Azul más claro para mejor contraste
      },
    ],
    DevOps: [
      {
        name: 'Docker',
        icon: DockerLogo,
        description:
          'Plataforma de contenedores que permite empaquetar aplicaciones con todas sus dependencias para un despliegue consistente.',
        experience: '2+ años',
        color: '#2496ED', // Azul oficial de Docker
      },
      {
        name: 'Google Cloud',
        icon: GoogleCloudLogo,
        description:
          'Plataforma de servicios en la nube con infraestructura escalable, almacenamiento y soluciones de computación empresarial.',
        experience: '1+ año',
        color: '#4285F4', // Azul oficial de Google Cloud
      },
      {
        name: 'Git',
        icon: GitLogo,
        description:
          'Sistema de control de versiones distribuido para rastrear cambios en el código y facilitar la colaboración en equipo.',
        experience: '4+ años',
        color: '#F05032', // Naranja/Rojo oficial de Git
      },
    ],
  };

  const experience = [
    {
      title: 'Full Stack Developer',
      company: 'ABEHA',
      period: '2023 - Presente',
      description:
        'Desarrollo de aplicaciones web y móviles, creación de APIs con Laravel, integración con servicios externos y construcción de interfaces modernas y responsivas.',
      achievements: [
        'Diseño y desarrollo de dashboards administrativos para gestión interna',
        'Creación y mantenimiento de APIs REST con Laravel para productos en producción',
        'Implementación de flujos completos de autenticación, registro y manejo de usuarios',
        'Optimización visual y de rendimiento utilizando Tailwind CSS y buenas prácticas de UI/UX',
        'Participación en la documentación técnica de módulos y componentes',
      ],
      technologies: [
        'React',
        'Next.js',
        'React Native',
        'TypeScript',
        'Vite',
        'TanStack (Query, Router, Table)',
        'Laravel',
        'PostgreSQL',
        'Tailwind CSS',
        'REST APIs',
        'Google Cloud',
      ],
    },
    {
      title: 'Full Stack Developer – Freelancer',
      project: 'Service Management Platform',
      period: '2022 - 2023',
      description:
        'Desarrollé una plataforma web completa para la gestión de clientes, servicios y soporte técnico, integrando un backend robusto con una interfaz moderna y fácil de usar.',
      achievements: [
        'Creación de un sistema de autenticación seguro con roles y permisos',
        'Diseño de dashboard administrativo para seguimiento de actividades',
        'Implementación de CRUD completos para usuarios, servicios y tickets de soporte',
        'Despliegue en producción con integración a base de datos y logs de actividad',
      ],
      technologies: ['React', 'TypeScript', 'Laravel', 'PostgreSQL', 'Bootstrap', 'Sass', 'REST APIs', 'Vercel'],
    },
  ];

  const education = [
    {
      degree: 'Formación Superior Autodidacta en Desarrollo Web',
      institution: 'Recursos de la Industria',
      period: '2020 - Actualidad',
      description:
        'He desarrollado habilidades avanzadas en desarrollo web y móvil de manera autodidacta, abarcando tanto Frontend como Backend, con un enfoque práctico en proyectos reales.',
    },
    {
      degree: 'Especialización Práctica en Tecnologías Modernas',
      institution: 'Udemy / Platzi / freeCodeCamp',
      period: '2020 - Actualidad',
      description:
        'He profundizado mis conocimientos mediante cursos y proyectos prácticos, trabajando con frameworks y librerías modernas, buenas prácticas de desarrollo y metodologías ágiles.',
    },
  ];

  const interests = [
    {
      name: 'Fotografía',
      icon: Camera,
      description: 'Capturando momentos únicos',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: 'Música',
      icon: Music,
      description: 'Toco la guitarra en mi tiempo libre',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: 'Café',
      icon: Coffee,
      description: 'Apasionado del café de especialidad',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: 'Viajes',
      icon: Globe,
      description: 'Explorando nuevas culturas',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Profile Info */}
            <div className="space-y-6 md:space-y-8 animate-fade-in sm:order-2 lg:order-1">
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
                  <Users className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Trabajo en equipo</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-row justify-start gap-4">
                <Button className="hover-lift" onClick={() => navigate({ to: '/contact' })}>
                  <Mail className="w-4 h-4 mr-2 text-primary-foreground" />
                  Contáctame
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="hover-lift">
                      <FileText className="w-4 h-4 mr-2" />
                      Currículum
                      <ChevronDown className="w-3 h-3 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem asChild>
                      <a
                        href="/ELMER-JACOBO-OTINIANO-CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center cursor-pointer"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver PDF
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a
                        href="/ELMER-JACOBO-OTINIANO-CV.pdf"
                        download="Elmer-Jacobo-CV.pdf"
                        className="flex items-center cursor-pointer"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar PDF
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative mt-8 lg:mt-0 sm:order-1 lg:order-2 hidden sm:block">
              <div className="relative mx-auto lg:mx-0 w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl -rotate-3" />

                {/* Main image container */}
                <div className="relative w-full h-full bg-card rounded-2xl overflow-hidden border shadow-xl">
                  <Avatar className="w-full h-full rounded-2xl">
                    <AvatarImage src={ProfileImage} alt="Profile" className="object-cover pointer-events-none" />
                    <AvatarFallback className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-primary text-primary-foreground rounded-2xl">
                      EJ
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-2 sm:p-3 rounded-xl shadow-lg">
                  <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground p-2 sm:p-3 rounded-xl shadow-lg">
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
                        <Card className="group hover-lift shadow-sm bg-card/50">
                          <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                            <div
                              className="w-10 h-10 sm:w-12 sm:h-12 transition-all dark:brightness-110 dark:contrast-90"
                              style={{ color: skill.color }}
                            >
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
            {/* Vertical Line - Solo visible en tablets y desktop */}
            <div className="hidden md:block absolute md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/70 to-primary/40 md:transform md:-translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="space-y-6 md:space-y-16">
              {experience.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline Dot - Solo visible en tablets y desktop */}
                  <div className="hidden md:block absolute md:left-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full md:transform md:-translate-x-1/2 shadow-lg z-10"></div>

                  {/* Content Card */}
                  <div
                    className={`md:w-[calc(50%-3rem)] ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                    }`}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50">
                      <CardHeader>
                        <div className="flex flex-col gap-2">
                          <Badge variant="secondary" className="w-fit text-xs">
                            {exp.period}
                          </Badge>
                          <CardTitle className="text-lg md:text-xl">{exp.title}</CardTitle>
                          {exp.company && (
                            <Button asChild variant="link" className="justify-start w-fit p-0">
                              <a
                                href="https://abeha.mx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base md:text-lg font-medium text-primary"
                              >
                                {exp.company}
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Más allá del código</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aprendizaje continuo que impulsa mi desarrollo técnico y creativo
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="group hover-lift shadow-sm bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">{edu.degree}</CardTitle>
                  <CardDescription className="text-base md:text-lg font-medium text-primary">
                    {edu.institution}
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
              <Card key={index} className="group hover-lift shadow-sm bg-card/50">
                <CardContent className="p-4 sm:p-6">
                  <div
                    className={`mx-auto w-12 h-12 sm:w-16 sm:h-16 ${interest.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4`}
                  >
                    <interest.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${interest.color}`} />
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="text-lg px-8 py-6 hover-lift" onClick={() => navigate({ to: '/contact' })}>
                <Mail className="w-5 h-5 mr-2" />
                Hablemos
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 hover-lift">
                <a href="https://www.linkedin.com/in/elmerjacobo97/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Ver mi LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
