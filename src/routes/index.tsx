import { createFileRoute } from '@tanstack/react-router';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { ProjectsSection } from '@/components/project-section';
import { ContactSection } from '@/components/contact-section';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  const skills = ['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'PHP', 'Laravel'];

  return (
    <div className="w-full">
      <HeroSection skills={skills} />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
