// app/components/client-layout.tsx
'use client'

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Área principal com Header e Conteúdo */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Conteúdo das páginas */}
        <main className="flex-1 overflow-auto p-6 mt-16 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}