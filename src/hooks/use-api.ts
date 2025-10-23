import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';

// ============================================
// TIPOS DE EJEMPLO
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// ============================================
// QUERY KEYS - Importante para la gestión de caché
// ============================================

export const queryKeys = {
  users: ['users'] as const,
  user: (id: number) => ['users', id] as const,
  projects: ['projects'] as const,
  project: (id: number) => ['projects', id] as const,
};

// ============================================
// API FUNCTIONS
// ============================================

// Obtener todos los usuarios
const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>('/users');
  return data;
};

// Obtener un usuario específico
const fetchUser = async (id: number): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
};

// Obtener todos los proyectos
const fetchProjects = async (): Promise<Project[]> => {
  const { data } = await api.get<Project[]>('/projects');
  return data;
};

// Crear un nuevo proyecto
const createProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  const { data } = await api.post<Project>('/projects', project);
  return data;
};

// Actualizar un proyecto
const updateProject = async ({ id, ...project }: Project): Promise<Project> => {
  const { data } = await api.put<Project>(`/projects/${id}`, project);
  return data;
};

// Eliminar un proyecto
const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

// Enviar formulario de contacto
const sendContactForm = async (formData: ContactForm): Promise<{ message: string }> => {
  const { data } = await api.post<{ message: string }>('/contact', formData);
  return data;
};

// ============================================
// CUSTOM HOOKS - Query Hooks
// ============================================

/**
 * Hook para obtener todos los usuarios
 */
export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: fetchUsers,
  });
}

/**
 * Hook para obtener un usuario específico
 */
export function useUser(id: number) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => fetchUser(id),
    enabled: !!id, // Solo ejecuta si hay un ID válido
  });
}

/**
 * Hook para obtener todos los proyectos
 */
export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: fetchProjects,
  });
}

// ============================================
// CUSTOM HOOKS - Mutation Hooks
// ============================================

/**
 * Hook para crear un nuevo proyecto
 */
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      // Invalidar y refetch de proyectos después de crear uno nuevo
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
}

/**
 * Hook para actualizar un proyecto
 */
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: (data) => {
      // Invalidar la lista de proyectos
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      // Actualizar el proyecto específico en caché
      queryClient.setQueryData(queryKeys.project(data.id), data);
    },
  });
}

/**
 * Hook para eliminar un proyecto
 */
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      // Invalidar la lista de proyectos después de eliminar
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
}

/**
 * Hook para enviar el formulario de contacto
 */
export function useContactForm() {
  return useMutation({
    mutationFn: sendContactForm,
    onSuccess: (data) => {
      console.log('Formulario enviado:', data.message);
    },
    onError: (error) => {
      console.error('Error al enviar formulario:', error);
    },
  });
}
