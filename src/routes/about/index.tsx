import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
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
import { trackDownload, trackSelectContent, trackLinkClick } from '@/lib/analytics';
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
  Camera,
  Download,
  Mail,
  ExternalLink,
  Users,
  Eye,
  ChevronDown,
  FileText,
  Cpu,
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
import ProfileImage from '@/assets/images/profile-about.webp';
import { GitHubActivity } from '@/components/github-activity';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

export const Route = createFileRoute('/about/')({
  component: AboutComponent,
});

function AboutComponent() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const skillsData = t('about.skills.skillsData', { returnObjects: true }) as Record<string, { description: string; experience: string }>;

  const skillsByCategory = {
    Frontend: [
      {
        name: 'React',
        icon: ReactLogo,
        description: skillsData['React'].description,
        experience: skillsData['React'].experience,
        color: '#61DAFB',
      },
      {
        name: 'Next.js',
        icon: NextJSLogo,
        description: skillsData['Next.js'].description,
        experience: skillsData['Next.js'].experience,
        color: 'currentColor',
      },
      {
        name: 'Astro',
        icon: AstroLogo,
        description: skillsData['Astro'].description,
        experience: skillsData['Astro'].experience,
        color: '#FF5D01',
      },
      {
        name: 'TypeScript',
        icon: TypeScriptLogo,
        description: skillsData['TypeScript'].description,
        experience: skillsData['TypeScript'].experience,
        color: '#3178C6',
      },
      {
        name: 'Tailwind CSS',
        icon: TailwindLogo,
        description: skillsData['Tailwind CSS'].description,
        experience: skillsData['Tailwind CSS'].experience,
        color: '#06B6D4',
      },
    ],
    Backend: [
      {
        name: 'Node.js',
        icon: NodejsLogo,
        description: skillsData['Node.js'].description,
        experience: skillsData['Node.js'].experience,
        color: '#339933',
      },
      {
        name: 'Express',
        icon: ExpressLogo,
        description: skillsData['Express'].description,
        experience: skillsData['Express'].experience,
        color: 'currentColor',
      },
      {
        name: 'NestJS',
        icon: NestJSLogo,
        description: skillsData['NestJS'].description,
        experience: skillsData['NestJS'].experience,
        color: '#E0234E',
      },
      {
        name: 'PHP',
        icon: PHPLogo,
        description: skillsData['PHP'].description,
        experience: skillsData['PHP'].experience,
        color: '#777BB4',
      },
      {
        name: 'Laravel',
        icon: LaravelLogo,
        description: skillsData['Laravel'].description,
        experience: skillsData['Laravel'].experience,
        color: '#FF2D20',
      },
    ],
    Database: [
      {
        name: 'PostgreSQL',
        icon: PostgreSQLLogo,
        description: skillsData['PostgreSQL'].description,
        experience: skillsData['PostgreSQL'].experience,
        color: '#4169E1',
      },
      {
        name: 'MySQL',
        icon: MySQLLogo,
        description: skillsData['MySQL'].description,
        experience: skillsData['MySQL'].experience,
        color: '#4479A1',
      },
      {
        name: 'MongoDB',
        icon: MongoDBLogo,
        description: skillsData['MongoDB'].description,
        experience: skillsData['MongoDB'].experience,
        color: '#47A248',
      },
      {
        name: 'SQLite',
        icon: SQLiteLogo,
        description: skillsData['SQLite'].description,
        experience: skillsData['SQLite'].experience,
        color: '#0F80CC',
      },
    ],
    DevOps: [
      {
        name: 'Docker',
        icon: DockerLogo,
        description: skillsData['Docker'].description,
        experience: skillsData['Docker'].experience,
        color: '#2496ED',
      },
      {
        name: 'Google Cloud',
        icon: GoogleCloudLogo,
        description: skillsData['Google Cloud'].description,
        experience: skillsData['Google Cloud'].experience,
        color: '#4285F4',
      },
      {
        name: 'Git',
        icon: GitLogo,
        description: skillsData['Git'].description,
        experience: skillsData['Git'].experience,
        color: '#F05032',
      },
    ],
  };

  const experience = t('about.experience.items', { returnObjects: true }) as Array<{
    title: string;
    company?: string;
    project?: string;
    period: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }>;

  const education = t('about.education.items', { returnObjects: true }) as Array<{
    degree: string;
    institution: string;
    period: string;
    description: string;
  }>;

  const interestsData = t('about.interests.items', { returnObjects: true }) as Array<{
    name: string;
    description: string;
  }>;

  const interests = [
    {
      name: interestsData[0].name,
      icon: Cpu,
      description: interestsData[0].description,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: interestsData[1].name,
      icon: Camera,
      description: interestsData[1].description,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: interestsData[2].name,
      icon: Coffee,
      description: interestsData[2].description,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      name: interestsData[3].name,
      icon: Globe,
      description: interestsData[3].description,
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
            <FadeIn direction="right" className="space-y-6 md:space-y-8 sm:order-2 lg:order-1">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  <User className="w-3 h-3 mr-1" />
                  {t('about.badge')}
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  {t('about.title').split('<gradient>')[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {t('about.title').split('<gradient>')[1]?.split('</gradient>')[0]}
                  </span>
                  {t('about.title').split('</gradient>')[1]}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {t('about.subtitle')}
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{t('about.quickInfo.location')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{t('about.quickInfo.experience')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{t('about.quickInfo.availability')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{t('about.quickInfo.teamwork')}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-row justify-start gap-4">
                <Button className="hover-lift" onClick={() => navigate({ to: '/contact' })}>
                  <Mail className="w-4 h-4 mr-2 text-primary-foreground" />
                  {t('about.cta.contact')}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="hover-lift">
                      <FileText className="w-4 h-4 mr-2" />
                      {t('about.cta.resume')}
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
                        onClick={() => trackSelectContent('cv', 'view_pdf_about_page')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {t('about.cta.viewPdf')}
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a
                        href="/ELMER-JACOBO-OTINIANO-CV.pdf"
                        download="Elmer-Jacobo-CV.pdf"
                        className="flex items-center cursor-pointer"
                        onClick={() => trackDownload('Elmer-Jacobo-CV.pdf')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {t('about.cta.downloadPdf')}
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </FadeIn>

            {/* Profile Image */}
            <FadeIn direction="left" className="relative mt-8 lg:mt-0 sm:order-1 lg:order-2 hidden sm:block">
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
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <Badge variant="outline" className="mb-4">
                <Code2 className="w-3 h-3 mr-1" />
                {t('about.skills.badge')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.skills.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('about.skills.subtitle')}
              </p>
            </div>
          </FadeIn>

          <div className="space-y-8 md:space-y-12">
            {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
              <StaggerContainer key={category} staggerDelay={0.08}>
                <FadeIn delay={categoryIndex * 0.1}>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                    <span className="text-primary">{t(`about.skills.categories.${category.toLowerCase()}` as any) || category}</span>
                    <div className="flex-1 h-px bg-border"></div>
                  </h3>
                </FadeIn>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                  {skills.map((skill) => (
                    <StaggerItem key={skill.name}>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Card className="group hover-lift shadow-sm bg-card/50">
                            <CardContent className="flex flex-col items-center text-center gap-3">
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
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <GitHubActivity username="elmerjacobo97" />

      {/* Experience Section */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <Badge variant="outline" className="mb-4">
                <Briefcase className="w-3 h-3 mr-1" />
                {t('about.experience.badge')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.experience.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('about.experience.subtitle')}
              </p>
            </div>
          </FadeIn>

          {/* Timeline Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line - Solo visible en tablets y desktop */}
            <div className="hidden md:block absolute md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/70 to-primary/40 md:transform md:-translate-x-1/2"></div>

            {/* Timeline Items */}
            <StaggerContainer className="space-y-6 md:space-y-16" staggerDelay={0.15}>
              {experience.map((exp, index) => (
                <StaggerItem key={index} className="relative">
                  {/* Timeline Dot - Solo visible en tablets y desktop */}
                  <div className="hidden md:block absolute md:left-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full md:transform md:-translate-x-1/2 shadow-lg z-10"></div>

                  {/* Content Card */}
                  <div
                    className={`md:w-[calc(50%-3rem)] ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                    }`}
                  >
                    <Card className="group hover-lift shadow-sm bg-card/50">
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
                                onClick={() => trackLinkClick('https://abeha.mx', 'ABEHA Company')}
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
                          <h4 className="font-semibold mb-2 md:mb-3">{t('about.experience.achievements')}</h4>
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
                          <h4 className="font-semibold mb-2 md:mb-3">{t('about.experience.technologies')}</h4>
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
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <Badge variant="outline" className="mb-4">
                <GraduationCap className="w-3 h-3 mr-1" />
                {t('about.education.badge')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.education.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('about.education.subtitle')}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6 md:gap-8" staggerDelay={0.15}>
            {education.map((edu, index) => (
              <StaggerItem key={index}>
                <Card className="group hover-lift shadow-sm bg-card/50">
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Interests Section */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <Badge variant="outline" className="mb-4">
                <Heart className="w-3 h-3 mr-1" />
                {t('about.interests.badge')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.interests.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('about.interests.subtitle')}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            staggerDelay={0.1}
          >
            {interests.map((interest, index) => (
              <StaggerItem key={index}>
                <Card className="group hover-lift shadow-sm bg-card/50">
                  <CardContent className="text-center flex flex-col items-center">
                    <div
                      className={`mx-auto w-12 h-12 sm:w-16 sm:h-16 ${interest.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4`}
                    >
                      <interest.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${interest.color}`} />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{interest.name}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">{interest.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {t('about.ctaSection.title').split('<gradient>')[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {t('about.ctaSection.title').split('<gradient>')[1]?.split('</gradient>')[0]}
                  </span>
                  {t('about.ctaSection.title').split('</gradient>')[1]}
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  {t('about.ctaSection.subtitle')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button size="lg" className="text-lg px-8 py-6 hover-lift" onClick={() => navigate({ to: '/contact' })}>
                  <Mail className="w-5 h-5 mr-2" />
                  {t('about.ctaSection.talk')}
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 hover-lift">
                  <a
                    href="https://www.linkedin.com/in/elmerjacobo97/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackLinkClick('https://www.linkedin.com/in/elmerjacobo97/', 'LinkedIn CTA')}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {t('about.ctaSection.linkedin')}
                  </a>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
