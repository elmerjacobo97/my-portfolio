import axios, { type AxiosResponse, type AxiosError } from 'axios';

// Configuración de axios con la base URL y timeout desde variables de entorno
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests - aquí puedes agregar tokens de autenticación
api.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación si existe
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses - manejo global de errores
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Manejo de errores comunes
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      switch (error.response.status) {
        case 401:
          // Token inválido o expirado
          console.error('No autorizado');
          // Aquí podrías redirigir al login
          break;
        case 403:
          console.error('Acceso prohibido');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 500:
          console.error('Error del servidor');
          break;
        default:
          console.error('Error en la petición:', error.response.data);
      }
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor');
    } else {
      // Algo pasó al configurar la petición
      console.error('Error al configurar la petición:', error.message);
    }
    return Promise.reject(error);
  }
);

// Cliente de axios para GitHub API (opcional)
export const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    ...(import.meta.env.VITE_GITHUB_TOKEN && {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    }),
  },
});
