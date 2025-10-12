"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, MoreVertical } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const users = [
  {
    name: "Griselda Pereira da Silva",
    email: "griselapereira@gmail.com",
    createdDate: "27/05/2025",
    userType: "Profissional",
  },
]

export function UserList() {
  return (
    <div className="flex min-h-screen bg-[#f8f8f8]">
      {/* Sidebar */}
      <aside className="w-20 bg-white border-r border-[#e3e3e3] flex flex-col items-center py-6 space-y-8">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6 text-[#0097b2]" />
        </Button>

        <div className="flex-1 flex flex-col items-center space-y-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Mário Graciano" />
            <AvatarFallback>MG</AvatarFallback>
          </Avatar>
          <p className="text-xs text-center text-[#222222] font-medium -rotate-90 whitespace-nowrap">
            Olá, Mário Graciano
          </p>
        </div>

        <div className="space-y-4">
          <Button variant="ghost" size="icon" className="w-12 h-12 text-[#787a82]">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 bg-[#41af12] text-white hover:bg-[#01800d]">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </Button>
        </div>

        <div className="w-8 h-8 bg-gradient-to-br from-[#0097b2] to-[#41af12] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">A</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-[#e3e3e3] px-8 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6 text-[#222222]" />
          </Button>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <div className="w-6 h-6 rounded-full bg-[#222222]" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Search bar */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#787a82]" />
                <Input placeholder="" className="pl-10 bg-white border-[#0097b2] focus-visible:ring-[#0097b2]" />
              </div>
              <Button variant="outline" className="text-[#41af12] border-[#41af12] bg-transparent">
                Sem filtros
              </Button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-[#e3e3e3] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#f8f8f8] border-b border-[#e3e3e3]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#222222]">Informações do usuário</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#222222]">Data criação</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#222222]">Tipo de Usuário</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-[#222222]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={i} className="border-b border-[#e3e3e3] last:border-0">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.name} />
                            <AvatarFallback>GP</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-[#222222]">{user.name}</p>
                            <p className="text-sm text-[#787a82]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#222222]">{user.createdDate}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#f8f8f8] text-[#222222] border border-[#e3e3e3]">
                          {user.userType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-5 w-5 text-[#222222]" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Excluir</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
