import { Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  Home,
  User,
  Briefcase,
  Mail,
  BookOpen,
  Code,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GithubIcon,
  LinkedinIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import avatarImg from '@/assets/images/avatar.webp';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const navItems = [
    { name: 'header.nav.home', icon: Home, href: '/' },
    { name: 'header.nav.about', icon: User, href: '/about' },
    { name: 'header.nav.projects', icon: Briefcase, href: '/projects' },
    { name: 'header.nav.contact', icon: Mail, href: '/contact' },
    {
      name: 'header.nav.blog',
      icon: BookOpen,
      href: 'https://blog.elmerjacobo.dev/',
      external: true,
    },
  ];

  const socialItems = [
    { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/elmerjacobo97' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/elmerjacobo97/' },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border/50 p-0">
        <div className={cn('flex items-center', isCollapsed ? 'justify-center p-2' : 'gap-4 p-4')}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/" className="group shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg transition-shadow hover:shadow-primary/25',
                    isCollapsed ? 'size-10' : 'size-12'
                  )}
                >
                  <Code className={cn('text-primary-foreground', isCollapsed ? 'size-5' : 'size-6')} />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent to-white/20" />
                </motion.div>
              </Link>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="text-sm font-semibold">
                Elmer Jacobo
              </TooltipContent>
            )}
          </Tooltip>

          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-1 items-center justify-between gap-3 overflow-hidden"
              >
                <div className="grid min-w-0 flex-1 text-left leading-tight">
                  <span className="truncate text-base font-bold">Elmer Jacobo</span>
                  <span className="truncate text-sm text-muted-foreground">Full Stack Developer</span>
                </div>
                <button
                  onClick={toggleSidebar}
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
                >
                  <ChevronLeft className="size-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Expand button when collapsed */}
        {isCollapsed && (
          <div className="flex justify-center pb-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleSidebar}
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
                >
                  <ChevronRight className="size-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Expandir</TooltipContent>
            </Tooltip>
          </div>
        )}
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className={cn('py-4', isCollapsed ? 'px-1.5' : 'px-3')}>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = !item.external && location.pathname === item.href;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const label = t(item.name as any) as string;

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={label}
                      className={cn(
                        'relative h-12 transition-all',
                        isCollapsed && 'justify-center px-0',
                        isActive && 'bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary'
                      )}
                    >
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn('gap-4', isCollapsed && 'gap-0')}
                        >
                          <Icon className={cn('shrink-0', isCollapsed ? 'size-6' : 'size-5')} />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1 truncate text-[15px] font-medium">{label}</span>
                              <ExternalLink className="size-4 text-muted-foreground" />
                            </>
                          )}
                        </a>
                      ) : (
                        <Link to={item.href} className={cn('gap-4', isCollapsed && 'gap-0')}>
                          <Icon className={cn('shrink-0', isCollapsed ? 'size-6' : 'size-5')} />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1 truncate text-[15px] font-medium">{label}</span>
                              {isActive && (
                                <motion.div
                                  layoutId="nav-indicator"
                                  className="size-2 rounded-full bg-primary"
                                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                              )}
                            </>
                          )}
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Social Links */}
        <SidebarGroup className="p-0 pt-4 border-t border-sidebar-border/50">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {socialItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.name}
                      className={cn('h-12 transition-all', isCollapsed && 'justify-center px-0')}
                    >
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn('gap-4', isCollapsed && 'gap-0')}
                      >
                        <Icon className={cn('shrink-0', isCollapsed ? 'size-6' : 'size-5')} />
                        {!isCollapsed && <span className="truncate text-[15px] font-medium">{item.name}</span>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border/50 p-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/about"
              className={cn(
                'flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-sidebar-accent',
                isCollapsed && 'justify-center p-2'
              )}
            >
              <Avatar className={cn('border-2 border-primary/20', isCollapsed ? 'size-9' : 'size-10')}>
                <AvatarImage src={avatarImg} alt="Elmer Jacobo" className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-sm font-bold text-primary">EJ</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="grid min-w-0 flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-semibold">Elmer Jacobo</span>
                  <span className="truncate text-xs text-muted-foreground">v2.0.0</span>
                </div>
              )}
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right" className="text-sm">
              Ver perfil
            </TooltipContent>
          )}
        </Tooltip>
      </SidebarFooter>
    </Sidebar>
  );
}
