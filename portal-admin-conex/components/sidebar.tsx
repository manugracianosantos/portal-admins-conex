// components/Sidebar/Sidebar.tsx - VERSÃO CORRIGIDA
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, LayoutDashboard, Users, ChevronLeft } from 'lucide-react'; 
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/app/providers/sidebar-provider';

// Componente para um item de navegação
const SidebarItem = ({ 
  icon: Icon, 
  label, 
  href, 
  isOpen 
}: { 
  icon: any; 
  label: string; 
  href: string; 
  isOpen: boolean; 
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center p-3 my-1 rounded-lg transition-colors",
        isActive 
          ? 'bg-green-100 text-green-700 font-semibold dark:bg-green-900 dark:text-green-300' 
          : 'hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-700 dark:text-gray-300',
        !isOpen && "justify-center"
      )}
    >
      <Icon className="w-5 h-5" />
      {isOpen && <span className="ml-3 truncate">{label}</span>}
    </Link>
  );
};

export default function Sidebar() {
  const { isCollapsed, sidebarWidth, toggleSidebar } = useSidebar();
  const [userPhoto, setUserPhoto] = useState<string | undefined>();
  
  const userName = "Manu Graciano";
  const userRole = "Administrador";

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserPhoto(data.imageUrl);
      }
    } catch (error) {
      console.error('Erro no upload:', error);
    }
  };

  return (
    <div className={cn(
      "h-screen fixed top-0 left-0 shadow-xl z-50",
      "transition-all duration-300 ease-in-out flex flex-col border-r",
      "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    )}
    style={{ width: `${sidebarWidth}px` }}>
      
      {/* 1. Header e Botão Hambúrguer */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <h1 className="text-sm font-semibold text-green-600 dark:text-green-400 truncate">
            Portal Conex ADM
          </h1>
        )}
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          aria-label={isCollapsed ? "Abrir Menu" : "Fechar Menu"}
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* 2. Conteúdo do Perfil e Links */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        
        {/* Perfil do Usuário com Avatar Inteligente */}
        <div className={cn(
          "flex flex-col items-center pb-4 border-b border-gray-200 dark:border-gray-700",
          isCollapsed && "px-0"
        )}>
          <div className={cn(
            "transition-all duration-300",
            !isCollapsed ? "mb-3" : "mb-2"
          )}>
            <Avatar 
              name={userName}
              onImageChange={handleUpload}
              className={cn(
                "transition-all duration-300",
                !isCollapsed ? "size-16" : "size-12"
              )}
            />
          </div>
          
          {!isCollapsed && (
            <div className="text-center truncate w-full">
              <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                Olá, {userName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {userRole}
              </p>
            </div>
          )}
        </div>

        {/* Links de Navegação */}
        <nav className="space-y-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            href="/dashboard" 
            isOpen={!isCollapsed}
          />
          <SidebarItem 
            icon={Users} 
            label="Usuários" 
            href="/users" 
            isOpen={!isCollapsed}
          />
        </nav>
      </div>

      {/* 3. Logotipo da Conex na parte inferior */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className={cn(
          "flex justify-center transition-all duration-300",
          !isCollapsed ? "flex-row items-center gap-2" : "flex-col items-center gap-1"
        )}>
          <div className={cn(
            "bg-green-600 text-white rounded flex items-center justify-center font-bold",
            !isCollapsed ? "w-8 h-8 text-lg" : "w-6 h-6 text-sm"
          )}>
            C
          </div>
          {!isCollapsed && (
            <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
              CONEX
            </span>
          )}
        </div>
      </div>
    </div>
  );
}