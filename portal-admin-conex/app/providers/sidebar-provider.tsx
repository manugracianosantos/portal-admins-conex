// app/providers/sidebar-provider.tsx
'use client'

import { createContext, useContext, useState } from 'react'

interface SidebarContextType {
  isCollapsed: boolean
  toggleSidebar: () => void
  sidebarWidth: number
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  // Larguras para sidebar expandido e recolhido
  const sidebarWidth = isCollapsed ? 80 : 256

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev)
  }

  return (
    <SidebarContext.Provider value={{ 
      isCollapsed, 
      toggleSidebar, 
      sidebarWidth 
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}