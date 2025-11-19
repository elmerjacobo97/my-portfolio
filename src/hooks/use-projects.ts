import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { sleep } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  technologies: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  highlights: string[];
}

export interface ProjectStatistics {
  totalTechnologies: number;
  totalUsers: number;
  satisfactionRate: number;
}

export interface ApiResponse<T> {
  projects: T;
  statistics: ProjectStatistics;
}

export type ProjectsResponse = ApiResponse<Project[]>;

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Obtener todos los proyectos desde la API
 */
async function fetchProjects(language: string): Promise<ProjectsResponse> {
  // Simular un delay
  await sleep(1000);
  // Usar axios con ruta absoluta para archivos estáticos en /public
  const response = await axios.get<ProjectsResponse>(`/projects-${language}.json`);
  return response.data;
}

// ============================================
// CUSTOM HOOKS
// ============================================

/**
 * Hook para obtener todos los proyectos
 */
export function useProjects(): UseQueryResult<ProjectsResponse> {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'es';

  return useQuery({
    queryKey: ['portfolio', 'projects', currentLanguage],
    queryFn: () => fetchProjects(currentLanguage),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
