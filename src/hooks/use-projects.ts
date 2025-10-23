import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api } from '@/lib/axios';
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
async function fetchProjects(): Promise<ProjectsResponse> {
  // Simular un delay
  await sleep(1000);
  const response = await api.get<ProjectsResponse>('/projects.json');
  return response.data;
}

// ============================================
// CUSTOM HOOKS
// ============================================

/**
 * Hook para obtener todos los proyectos
 */
export function useProjects(): UseQueryResult<ProjectsResponse> {
  return useQuery({
    queryKey: ['portfolio', 'projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
