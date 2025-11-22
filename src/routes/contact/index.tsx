import { useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { typeschemaResolver } from '@hookform/resolvers/typeschema';
import ReCAPTCHA from 'react-google-recaptcha';
import { Briefcase, Clock, Coffee, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

export const Route = createFileRoute('/contact/')({
  component: ContactComponent,
});

function ContactComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  const contactMethods = [
    {
      icon: Mail,
      title: t('contact.info.email'),
      value: 'contacto@elmerjacobo.dev',
      description: t('contact.info.emailDescription'),
      link: 'mailto:contacto@elmerjacobo.dev',
      external: false,
      color: 'text-primary',
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      value: '+51 92 7347 691',
      description: t('contact.info.phoneDescription'),
      link: 'tel:+51927347691',
      external: false,
      color: 'text-primary',
    },
    {
      icon: MapPin,
      title: t('contact.info.location'),
      value: 'Trujillo, Perú',
      description: t('contact.info.locationDescription'),
      link: 'https://www.google.com/maps?q=Trujillo,+Perú',
      external: true,
      color: 'text-primary',
    },
  ];

  const projectTypes = t('contact.projectTypes', { returnObjects: true }) as string[];

  const ContactSchema = z.object({
    name: z.string().min(2, t('contact.form.validation.nameMin')),
    email: z.string().min(1, t('contact.form.validation.emailRequired')).email(t('contact.form.validation.emailInvalid')),
    subject: z.string().min(15, t('contact.form.validation.subjectMin')),
    message: z.string().min(20, t('contact.form.validation.messageMin')),
    projectType: z.string().optional(),
  });

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: typeschemaResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      projectType: projectTypes[0],
    },
    // mode: 'onChange',
  });

  const onSubmit = async (data: z.infer<typeof ContactSchema>) => {
    // Validar reCAPTCHA antes de enviar
    if (!recaptchaToken) {
      toast({
        variant: 'destructive',
        title: t('contact.form.error'),
        description: t('contact.form.recaptchaRequired'),
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Inicializar EmailJS con la clave pública
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      // Enviar email usando EmailJS
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          project_type: data.projectType || 'No especificado',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        form.reset();
        // Resetear reCAPTCHA después de envío exitoso
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);

        // Trackear envío exitoso del formulario
        trackEvent('generate_lead', {
          form_name: 'contact_form',
          method: 'contact_form',
          project_type: data.projectType || 'No especificado',
          message_length: data.message.length,
        });

        toast({
          title: t('contact.form.success'),
          description: t('contact.form.successDescription'),
        });
      }
    } catch {
      // Trackear error en el envío
      trackEvent('form_error', {
        form_name: 'contact_form',
        error_message: 'Email sending failed',
      });

      toast({
        variant: 'destructive',
        title: t('contact.form.error'),
        description: t('contact.form.errorDescription'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="pt-8 sm:pt-12 lg:pt-20 pb-12 lg:pb-16 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center space-y-6 lg:space-y-8">
              <Badge variant="outline" className="mx-auto">
                <MessageCircle className="w-3 h-3 mr-1 text-primary" />
                {t('contact.badge')}
              </Badge>

              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {t('contact.title').split('<gradient>')[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {t('contact.title').split('<gradient>')[1]?.split('</gradient>')[0]}
                  </span>
                  {t('contact.title').split('</gradient>')[1]}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                  {t('contact.subtitle')}
                </p>
              </div>

              {/* Quick Response Promise */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
                <div className="flex items-center gap-2 text-muted-foreground w-48 sm:w-auto">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm">{t('contact.promise.response')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground w-48 sm:w-auto">
                  <Coffee className="w-4 h-4 text-primary" />
                  <span className="text-sm">{t('contact.promise.consultation')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground w-48 sm:w-auto">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="text-sm">{t('contact.promise.proposal')}</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <FadeIn direction="right" className="space-y-6 md:space-y-8 order-2 md:order-1">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t('contact.form.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('contact.form.description')}
                </p>
              </div>

              <Card className="shadow-sm bg-card/50 overflow-hidden">
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('contact.form.name')}</FormLabel>
                              <FormControl>
                                <Input type="text" placeholder={t('contact.form.namePlaceholder')} className="w-full" {...field} />
                              </FormControl>
                              <FormDescription>{t('contact.form.nameDescription')}</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('contact.form.email')}</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder={t('contact.form.emailPlaceholder')} className="w-full" {...field} />
                              </FormControl>
                              <FormDescription>{t('contact.form.emailDescription')}</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('contact.form.subject')}</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder={t('contact.form.subjectPlaceholder')} className="w-full" {...field} />
                            </FormControl>
                            <FormDescription>{t('contact.form.subjectDescription')}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('contact.form.projectType')}</FormLabel>
                            <Select
                              defaultValue={projectTypes[0]}
                              value={field.value}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger className="h-10 w-full">
                                <SelectValue placeholder={t('contact.form.projectTypePlaceholder')} />
                              </SelectTrigger>
                              <SelectContent>
                                {projectTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                              <FormDescription>{t('contact.form.projectTypeDescription')}</FormDescription>
                              <FormMessage />
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('contact.form.message')}</FormLabel>
                            <FormControl>
                              <Textarea
                                id="message"
                                placeholder={t('contact.form.messagePlaceholder')}
                                className="w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>{t('contact.form.messageDescription')}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* reCAPTCHA */}
                      <div className="flex justify-center">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                          onChange={(token) => setRecaptchaToken(token)}
                          onExpired={() => setRecaptchaToken(null)}
                          hl={i18n.language}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full hover-lift" disabled={isSubmitting || !recaptchaToken}>
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                            {t('contact.form.sending')}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2 text-primary-foreground" />
                            {t('contact.form.send')}
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Contact Information */}
            <FadeIn direction="left" className="space-y-6 lg:space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t('contact.info.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('contact.info.description')}
                </p>
              </div>

              {/* Contact Methods */}
              <StaggerContainer className="space-y-3 lg:space-y-4" staggerDelay={0.1}>
                {contactMethods.map((method, index) => (
                  <StaggerItem key={index}>
                    <Card className="shadow-sm bg-card/50 overflow-hidden">
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted">
                            <method.icon className={`w-6 h-6 ${method.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{method.title}</h3>
                            {method.link ? (
                              <a
                                href={method.link}
                                target={method.external ? '_blank' : '_self'}
                                rel={method.external ? 'noopener noreferrer' : undefined}
                                className="text-primary hover:underline font-medium"
                                onClick={() =>
                                  trackEvent('contact_method_click', {
                                    method: method.title.toLowerCase(),
                                    value: method.value,
                                  })
                                }
                              >
                                {method.value}
                              </a>
                            ) : (
                              <p className="font-medium">{method.value}</p>
                            )}
                            <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-20 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12 lg:mb-16">
              <Badge variant="outline" className="mb-4">
                <MessageCircle className="w-3 h-3 mr-1 text-primary" />
                {t('contact.faq.badge')}
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{t('contact.faq.title')}</h2>
              <p className="text-base lg:text-lg text-muted-foreground">
                {t('contact.faq.subtitle')}
              </p>
            </div>
          </FadeIn>

          {/* Mobile: Cards */}
          <StaggerContainer className="space-y-4 md:hidden" staggerDelay={0.1}>
            {(t('contact.faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>).map((faq, index) => (
              <StaggerItem key={index}>
                <Card className="shadow-sm bg-card/50 overflow-hidden">
                  <CardContent>
                    <h3 className="font-semibold text-base mb-3">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Tablet/Desktop: Accordion */}
          <FadeIn delay={0.2}>
            <Accordion type="single" collapsible className="hidden md:block">
            {(t('contact.faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-left hover:no-underline py-4 lg:py-6">
                  <h3 className="font-semibold text-base lg:text-lg pr-4">{faq.q}</h3>
                </AccordionTrigger>
                <AccordionContent className="pb-4 lg:pb-6">
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {t('contact.ctaSection.title').split('<gradient>')[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {t('contact.ctaSection.title').split('<gradient>')[1]?.split('</gradient>')[0]}
                  </span>
                  {t('contact.ctaSection.title').split('</gradient>')[1]}
                </h2>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                  {t('contact.ctaSection.subtitle')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 hover-lift">
                  <a
                    href="https://wa.me/51927347691?text=Hola%20Elmer!%20Vi%20tu%20portafolio%20y%20quiero%20agendar%20una%20llamada"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 lg:w-5 h-4 lg:h-5 mr-2 text-primary-foreground" />
                    {t('contact.ctaSection.whatsapp')}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 hover-lift"
                >
                  <a href="mailto:contacto@elmerjacobo.dev?subject=Hola!%20Vi%20tu%20portafolio&body=Me%20gustaría%20contactar%20contigo...">
                    <Mail className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                    {t('contact.ctaSection.email')}
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
