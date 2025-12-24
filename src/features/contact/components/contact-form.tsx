import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { typeschemaResolver } from '@hookform/resolvers/typeschema';
import emailjs from '@emailjs/browser';
// import ReCAPTCHA from 'react-google-recaptcha';
import { z } from 'zod';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FadeIn } from '@/components/ui/motion';
import { TiltCard } from '@/components/ui/tilt-card';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';

export function ContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  // const recaptchaRef = useRef<ReCAPTCHA>(null);

  const projectTypes = t('contact.projectTypes', { returnObjects: true }) as string[];

  const ContactSchema = z.object({
    name: z.string().min(2, t('contact.form.validation.nameMin')),
    email: z
      .string()
      .min(1, t('contact.form.validation.emailRequired'))
      .email(t('contact.form.validation.emailInvalid')),
    subject: z.string().min(15, t('contact.form.validation.subjectMin')),
    message: z.string().min(20, t('contact.form.validation.messageMin')),
    projectType: z.string().optional(),
  });

  type ContactFormData = z.infer<typeof ContactSchema>;

  const form = useForm<ContactFormData>({
    resolver: typeschemaResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      projectType: projectTypes[0],
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Validar reCAPTCHA antes de enviar
    // if (!recaptchaToken) {
    //   toast({
    //     variant: 'destructive',
    //     title: t('contact.form.error'),
    //     description: t('contact.form.recaptchaRequired'),
    //   });
    //   return;
    // }

    setIsSubmitting(true);

    try {
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

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
        // recaptchaRef.current?.reset();
        // setRecaptchaToken(null);

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
    <FadeIn direction="right" className="space-y-6 md:space-y-8 order-2 md:order-1">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t('contact.form.title')}</h2>
        <p className="text-muted-foreground leading-relaxed">{t('contact.form.description')}</p>
      </div>

      <TiltCard tiltAmount={4} scale={1.01} glare={true}>
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
                          <Input
                            type="text"
                            placeholder={t('contact.form.namePlaceholder')}
                            className="w-full"
                            {...field}
                          />
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
                          <Input
                            type="email"
                            placeholder={t('contact.form.emailPlaceholder')}
                            className="w-full"
                            {...field}
                          />
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
                        <Input
                          type="text"
                          placeholder={t('contact.form.subjectPlaceholder')}
                          className="w-full"
                          {...field}
                        />
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
                      <Select defaultValue={projectTypes[0]} value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="h-10 w-full">
                          <SelectValue placeholder={t('contact.form.projectTypePlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type: string) => (
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
                        <Textarea placeholder={t('contact.form.messagePlaceholder')} className="w-full" {...field} />
                      </FormControl>
                      <FormDescription>{t('contact.form.messageDescription')}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* reCAPTCHA - Comentado temporalmente */}
                {/* <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                  hl={i18n.language}
                />
              </div> */}

                <Button type="submit" size="lg" className="w-full hover-lift" disabled={isSubmitting}>
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
      </TiltCard>
    </FadeIn>
  );
}
