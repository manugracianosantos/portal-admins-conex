// components/header.tsx
"use client";

import React from 'react';
import { LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/app/providers/theme-provider';
import { useSidebar } from '@/app/providers/sidebar-provider';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { sidebarWidth } = useSidebar();
  const isDarkMode = theme === 'dark';

  const handleLogout = () => {
    console.log('Fazendo logout...');
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
      {/* Lado Esquerdo - Título ou espaço vazio */}
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

        {/* Logout */}
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