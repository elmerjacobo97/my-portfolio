import { createFileRoute } from '@tanstack/react-router';
import { AboutHero } from '@/features/about/components/about-hero';
import { SkillsSection } from '@/features/about/components/skills-section';
import { ExperienceSection } from '@/features/about/components/experience-section';
import { EducationSection } from '@/features/about/components/education-section';
import { InterestsSection } from '@/features/about/components/interests-section';
import { AboutCta } from '@/features/about/components/about-cta';
import { GitHubActivity } from '@/components/github-activity';

export const Route = createFileRoute('/about/')({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="w-full min-h-screen">
      <AboutHero />
      <SkillsSection />
      <GitHubActivity username="elmerjacobo97" />
      <ExperienceSection />
      <EducationSection />
      <InterestsSection />
      <AboutCta />
    </div>
  );
}
