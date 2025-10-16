// components/header.tsx
"use client";

import React from 'react';
import { LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/app/providers/theme-provider';
import { useSidebar } from '@/app/providers/sidebar-provider';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { sidebarWidth } = useSidebar();
  const router = useRouter();
  const isDarkMode = theme === 'dark';

  const handleLogout = async () => {
    try {
      console.log('Iniciando logout...');
      
      // 1. Chama a API de logout no backend
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro no logout');
      }

      console.log('Logout realizado com sucesso no backend');

      // 2. Limpa dados locais (se houver)
      localStorage.removeItem('user-data');
      localStorage.removeItem('auth-token');
      sessionStorage.clear();

      // 3. Redireciona para login
      router.push('/login');
      router.refresh(); // Força atualização do cache

    } catch (error) {
      console.error('Erro no logout:', error);
      // Mesmo com erro, redireciona para login como fallback
      router.push('/login');
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 h-16 border-b border-gray-200 z-40",
        "transition-all duration-300 ease-in-out",
        "flex items-center justify-between px-4 sm:px-6",
        "bg-white dark:bg-gray-800",
        "border-gray-200 dark:border-gray-700",
        "text-gray-900 dark:text-white"
      )}
      style={{ 
        left: `${sidebarWidth}px`,
        width: `calc(100vw - ${sidebarWidth}px)`
      }}
    >
      {/* Lado Esquerdo - Título */}
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Portal Admin CONEX
        </h1>
      </div>

      {/* Lado Direito - Ações */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Botão Modo Claro/Escuro */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={isDarkMode ? "Modo Claro" : "Modo Escuro"}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {/* Botão Logout */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          aria-label="Sair"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}