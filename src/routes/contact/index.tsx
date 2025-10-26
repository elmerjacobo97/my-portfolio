import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { typeschemaResolver } from '@hookform/resolvers/typeschema';
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

export const Route = createFileRoute('/contact/')({
  component: ContactComponent,
});

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'ejacobotiniano@gmail.com',
    description: 'Respondo en menos de 24 horas',
    link: 'mailto:ejacobotiniano@gmail.com',
    external: false,
    color: 'text-primary',
  },
  {
    icon: Phone,
    title: 'Teléfono',
    value: '+51 92 7347 691',
    description: 'Lun - Vie, 9:00 AM - 6:00 PM',
    link: 'tel:+51927347691',
    external: false,
    color: 'text-primary',
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    value: 'Trujillo, Perú',
    description: 'Disponible para trabajo remoto',
    link: 'https://www.google.com/maps?q=Trujillo,+Perú',
    external: true,
    color: 'text-primary',
  },
];

const projectTypes = [
  'Desarrollo Web',
  'Aplicación Móvil',
  'E-commerce',
  'SaaS/Dashboard',
  'API/Backend',
  'Consultoría',
  'Otro',
];

const ContactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().min(1, 'El email es requerido').email('El email no es válido'),
  subject: z.string().min(15, 'El asunto debe tener al menos 15 caracteres'),
  message: z.string().min(20, 'El mensaje debe tener al menos 20 caracteres'),
  projectType: z.string().optional(),
});

function ContactComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

        toast({
          title: '¡Mensaje enviado!',
          description: '¡Gracias por escribirme! Me pondré en contacto contigo muy pronto.',
        });
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error al enviar',
        description: 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente o contáctame directamente.',
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
          <div className="text-center space-y-6 lg:space-y-8 animate-fade-in">
            <Badge variant="outline" className="mx-auto">
              <MessageCircle className="w-3 h-3 mr-1 text-primary" />
              Contacto
            </Badge>

            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Hablemos sobre tu{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  próximo proyecto
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                ¿Tienes una idea increíble? Me encantaría escucharla y ayudarte a convertirla en realidad. Trabajemos
                juntos para crear algo extraordinario.
              </p>
            </div>

            {/* Quick Response Promise */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">Respuesta en 24h</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Coffee className="w-4 h-4 text-primary" />
                <span className="text-sm">Consulta gratuita</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm">Propuesta personalizada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="space-y-6 md:space-y-8 order-2 md:order-1">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">Envíame un mensaje</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cuéntame sobre tu proyecto y te contactaré lo antes posible con una propuesta detallada.
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
                              <FormLabel>Nombre *</FormLabel>
                              <FormControl>
                                <Input type="text" placeholder="Tu nombre" className="w-full" {...field} />
                              </FormControl>
                              <FormDescription>Por favor, ingresa tu nombre.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="tu@email.com" className="w-full" {...field} />
                              </FormControl>
                              <FormDescription>Por favor, ingresa tu email.</FormDescription>
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
                            <FormLabel>Asunto *</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Asunto" className="w-full" {...field} />
                            </FormControl>
                            <FormDescription>Ej: Consulta sobre un proyecto web</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de proyecto</FormLabel>
                            <Select
                              defaultValue={projectTypes[0]}
                              value={field.value}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger className="h-10 w-full">
                                <SelectValue placeholder="Selecciona un tipo de proyecto" />
                              </SelectTrigger>
                              <SelectContent>
                                {projectTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                              <FormDescription>Por favor, selecciona un tipo de proyecto.</FormDescription>
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
                            <FormLabel>Mensaje *</FormLabel>
                            <FormControl>
                              <Textarea
                                id="message"
                                placeholder="Cuéntame sobre tu proyecto, objetivos, timeline y presupuesto estimado..."
                                className="w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Ej: Necesito un sitio web para mi negocio</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full hover-lift" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2 text-primary-foreground" />
                            Enviar mensaje
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">Información de contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ¿Prefieres contacto directo? Aquí tienes todas las formas de encontrarme.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-3 lg:space-y-4">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="shadow-sm bg-card/50 overflow-hidden">
                    <CardContent>
                      <div className="flex items-start gap-4">
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-20 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-4">
              <MessageCircle className="w-3 h-3 mr-1 text-primary" />
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Preguntas frecuentes</h2>
            <p className="text-base lg:text-lg text-muted-foreground">
              Respuestas a las dudas más comunes sobre mi proceso de trabajo
            </p>
          </div>

          {/* Mobile: Cards */}
          <div className="space-y-4 md:hidden">
            {[
              {
                q: '¿Cuánto tiempo toma desarrollar un proyecto?',
                a: 'Depende de la complejidad del proyecto. Un sitio web simple puede tomar 2-4 semanas, mientras que una aplicación compleja puede tomar 2-6 meses. Te daré un timeline detallado después de evaluar tu proyecto.',
              },
              {
                q: '¿Trabajas con clientes internacionales?',
                a: 'Trabajo con clientes de todo el mundo, pero mi comunicación principal es en español. Si tu equipo habla español, estaré encantado de colaborar y coordinar horarios en distintas zonas horarias.',
              },
              {
                q: '¿Ofreces mantenimiento post-lanzamiento?',
                a: 'Sí, ofrezco diferentes planes de mantenimiento que incluyen actualizaciones de seguridad, optimizaciones de rendimiento, y nuevas funcionalidades según tus necesidades.',
              },
              {
                q: '¿Cuál es tu stack tecnológico preferido?',
                a: 'Trabajo principalmente con React/Next.js para frontend, Node.js/NestJS o PHP/Laravel para backend, y PostgreSQL o MySQL para bases de datos. Sin embargo, me adapto a las necesidades específicas de cada proyecto.',
              },
            ].map((faq, index) => (
              <Card key={index} className="shadow-sm bg-card/50 overflow-hidden">
                <CardContent>
                  <h3 className="font-semibold text-base mb-3">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tablet/Desktop: Accordion */}
          <Accordion type="single" collapsible className="hidden md:block">
            {[
              {
                q: '¿Cuánto tiempo toma desarrollar un proyecto?',
                a: 'Depende de la complejidad del proyecto. Un sitio web simple puede tomar 2-4 semanas, mientras que una aplicación compleja puede tomar 2-6 meses. Te daré un timeline detallado después de evaluar tu proyecto.',
              },
              {
                q: '¿Trabajas con clientes internacionales?',
                a: 'Trabajo con clientes de todo el mundo, pero mi comunicación principal es en español. Si tu equipo habla español, estaré encantado de colaborar y coordinar horarios en distintas zonas horarias.',
              },
              {
                q: '¿Ofreces mantenimiento post-lanzamiento?',
                a: 'Sí, ofrezco diferentes planes de mantenimiento que incluyen actualizaciones de seguridad, optimizaciones de rendimiento, y nuevas funcionalidades según tus necesidades.',
              },
              {
                q: '¿Cuál es tu stack tecnológico preferido?',
                a: 'Trabajo principalmente con React/Next.js para frontend, Node.js/NestJS o PHP/Laravel para backend, y PostgreSQL o MySQL para bases de datos. Sin embargo, me adapto a las necesidades específicas de cada proyecto.',
              },
            ].map((faq, index) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                ¿Listo para{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">empezar?</span>
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                No importa si tu idea está en etapa conceptual o ya tienes especificaciones detalladas. Podemos trabajar
                juntos para hacerla realidad.
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
                  Contactar por WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 hover-lift"
              >
                <a href="mailto:ejacobotiniano@gmail.com?subject=Hola!%20Vi%20tu%20portafolio&body=Me%20gustaría%20contactar%20contigo...">
                  <Mail className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                  Enviar email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
