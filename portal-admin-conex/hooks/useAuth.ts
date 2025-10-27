// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { api } from '../services/api'; // ← IMPORTAR A API

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperar token do localStorage
    const storedToken = localStorage.getItem('adminToken');
    
    if (storedToken) {
      setToken(storedToken);
      // Buscar perfil do admin
      api.admin.getProfile(storedToken)
        .then(setAdmin)
        .catch((error) => {
          console.error('Error fetching admin profile:', error);
          // Se der erro (token inválido), limpa o token
          localStorage.removeItem('adminToken');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (newToken: string) => {
    try {
      setToken(newToken);
      localStorage.setItem('adminToken', newToken);
      
      // Buscar dados do admin após login
      const adminData = await api.admin.getProfile(newToken);
      setAdmin(adminData);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
  };

  return { 
    token, 
    admin, 
    login, 
    logout,
    loading 
  };
};