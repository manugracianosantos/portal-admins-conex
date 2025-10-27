// src/services/api.ts
const API_BASE_URL = 'http://localhost:3001/api';

async function request(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Verifica se a resposta é JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Servidor retornou resposta não-JSON');
    }

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}
export const api = {
  // Métodos de autenticação
  auth: {
    login: (email: string, password: string) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    register: (data: { name: string; email: string; password: string }) =>
      request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    logout: (token: string) =>
      request('/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }),
  },

  // Métodos para admin
  admin: {
    getProfile: (token: string) =>
      request('/admin/profile', {
        headers: { Authorization: `Bearer ${token}` },
      }),

    updateProfile: (token: string, data: any) =>
      request('/admin/profile', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),

    updatePassword: (token: string, data: any) =>
      request('/admin/password', {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),

    uploadPhoto: async (token: string, file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${API_BASE_URL}/admin/photo`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      return response.json();
    },
  },

  // Métodos para usuários - ATUALIZADOS
  users: {
    getAll: (token: string, page?: number, limit?: number, search?: string) => {
      const params = new URLSearchParams();
      if (page) params.append('page', page.toString());
      if (limit) params.append('limit', limit.toString());
      if (search) params.append('search', search);
      
      return request(`/users?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },

    getById: (token: string, id: string) =>
      request(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),

    create: (token: string, data: any) =>
      request('/users', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),

    update: (token: string, id: string, data: any) =>
      request(`/users/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),

    delete: (token: string, id: string) =>
      request(`/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }),
  },

  // Métodos para dashboard
  dashboard: {
    getOverview: (token: string) =>
      request('/dashboard/overview', {
        headers: { Authorization: `Bearer ${token}` },
      }),

    getUsersChart: (token: string, period?: string) =>
      request(`/dashboard/charts/users?period=${period || 'month'}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),

    getServicesChart: (token: string, period?: string) =>
      request(`/dashboard/charts/services?period=${period || 'month'}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),

    getPopularServices: (token: string, period?: string) =>
      request(`/dashboard/charts/popular-services?period=${period || 'month'}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),

    getServicesStatus: (token: string, period?: string) =>
      request(`/dashboard/charts/services-status?period=${period || 'month'}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),

    getFeedbacksChart: (token: string, period?: string) =>
      request(`/dashboard/charts/feedbacks?period=${period || 'month'}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),

    getAverageRating: (token: string) =>
      request('/dashboard/average-rating', {
        headers: { Authorization: `Bearer ${token}` },
      }),

    getRecentFeedbacks: (token: string, limit?: number) =>
      request(`/dashboard/recent-feedbacks?limit=${limit || 10}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),

    getRatingsDistribution: (token: string) =>
      request('/dashboard/ratings-distribution', {
        headers: { Authorization: `Bearer ${token}` },
      }),
  },
};