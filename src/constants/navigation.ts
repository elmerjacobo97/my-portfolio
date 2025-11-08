import { Home, User, Code, Mail, Github, Linkedin, BookOpen } from 'lucide-react';

export const navigation = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Sobre mí', href: '/about', icon: User },
  { name: 'Proyectos', href: '/projects', icon: Code },
  { name: 'Contacto', href: '/contact', icon: Mail },
  { name: 'Blog', href: 'https://blog.elmerjacobo.dev', icon: BookOpen, external: true },
];

export const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/elmerjacobo97', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/elmerjacobo97', icon: Linkedin },
];

export const services = ['Desarrollo Web', 'Aplicaciones Móviles', 'E-commerce', 'Consultoría Técnica'];

export const contactInfo = {
  email: 'contacto@elmerjacobo.dev',
  phone: '+51 92 7347 691',
  location: 'Trujillo, Perú',
  availability: 'Disponible para proyectos',
};

export const brandInfo = {
  name: 'Elmer Jacobo',
  description: 'Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales.',
  copyright: `© ${new Date().getFullYear()} Elmer Jacobo. Todos los derechos reservados.`,
  madeWith: 'Hecho con ❤️ usando React & TailwindCSS',
};
