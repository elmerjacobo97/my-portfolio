import { createFileRoute } from '@tanstack/react-router';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { ProjectsSection } from '@/components/project-section';
import { ContactSection } from '@/components/contact-section';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="w-full">
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
