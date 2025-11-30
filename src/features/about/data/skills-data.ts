import type { TFunction } from 'i18next';
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

export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  experience: string;
  color: string;
}

export type SkillsByCategory = Record<string, Skill[]>;

export function getSkillsByCategory(t: TFunction): SkillsByCategory {
  const skillsData = t('about.skills.skillsData', { returnObjects: true }) as Record<
    string,
    { description: string; experience: string }
  >;

  return {
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
}
