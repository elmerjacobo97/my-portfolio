import { createFileRoute } from '@tanstack/react-router';
import { ContactHero } from '@/features/contact/components/contact-hero';
import { ContactForm } from '@/features/contact/components/contact-form';
import { ContactInfo } from '@/features/contact/components/contact-info';
import { FaqSection } from '@/features/contact/components/faq-section';
import { ContactCta } from '@/features/contact/components/contact-cta';

export const Route = createFileRoute('/contact/')({
  component: ContactComponent,
});

function ContactComponent() {
  return (
    <div className="w-full min-h-screen">
      <ContactHero />

      {/* Contact Form & Info Section */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <FaqSection />
      <ContactCta />
    </div>
  );
}
