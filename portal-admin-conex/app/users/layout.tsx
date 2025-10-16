// app/dashboard/layout.tsx
"use client"

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { useSidebar } from "@/app/providers/sidebar-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className={`flex-1 overflow-auto transition-all duration-300 pt-16 ${
          isCollapsed ? "ml-0" : "ml-0"
        }`}>
          {children}
        </main>
      </div>
    </div>
  )
}