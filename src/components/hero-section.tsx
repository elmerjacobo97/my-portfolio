import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Rocket, Github, Linkedin, Mail, Download, Sparkles } from 'lucide-react';
import avatar from '@/assets/images/avatar.png';

export function HeroSection() {
  return (
    <section className="min-h-dvh flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 animate-fade-in">
          {/* Avatar */}
          <div className="flex justify-center w-full">
            <div className="relative group">
              <Avatar className="w-40 h-40 border-4 border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden">
                <AvatarImage
                  src={avatar}
                  alt="Elmer Jacobo"
                  className="object-cover w-full h-full"
                  width={160}
                  height={160}
                />
                <AvatarFallback className="text-2xl font-bold bg-gradient-primary text-primary-foreground">
                  EJ
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Status Badge */}
          <Badge variant="secondary" className="mx-auto text-sm">
            <Sparkles className="w-3 h-3 mr-1 text-primary" />
            Disponible para nuevos proyectos
          </Badge>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Hola, soy{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">
                Desarrollador
              </span>{' '}
              <span className="text-accent font-bold">Full Stack</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Transformo ideas en experiencias digitales excepcionales. Especializado en crear aplicaciones web modernas
              con <span className="text-primary font-semibold">código limpio</span> y{' '}
              <span className="text-primary font-semibold">diseño elegante</span>.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6 hover-lift">
              <Rocket className="w-5 h-5 mr-2 text-primary-foreground" />
              Ver mis proyectos
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 hover-lift">
              <Download className="w-5 h-5 mr-2" />
              Descargar CV
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="icon" className="hover-lift">
              <Github className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
            </Button>
            <Button variant="ghost" size="icon" className="hover-lift">
              <Linkedin className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
            </Button>
            <Button variant="ghost" size="icon" className="hover-lift">
              <Mail className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
