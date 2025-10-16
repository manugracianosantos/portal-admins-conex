"use client"

import { useState, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreVertical, Plus } from "lucide-react"
import { useSidebar } from "@/app/providers/sidebar-provider"
import { useTheme } from '@/app/providers/theme-provider'
import { UserProfileCard } from "./user-profile-card"

type UserType = "cliente" | "profissional" | "condominio"

interface User {
  name: string
  email: string
  createdDate: string
  updatedDate: string
  id: string
  phone: string
  birthDate: string
  cpf: string
  userType: UserType
}

const initialUsers: User[] = [
  {
    name: "Griselda Pereira da Silva",
    email: "griselapereira@gmail.com",
    createdDate: "27/05/2025",
    updatedDate: "28/05/2025",
    id: "USR001",
    phone: "(11) 99999-9999",
    birthDate: "15/03/1985",
    cpf: "123.456.789-00",
    userType: "profissional",
  },
  {
    name: "João Silva Santos",
    email: "joaosilva@email.com",
    createdDate: "26/05/2025",
    updatedDate: "27/05/2025",
    id: "USR002",
    phone: "(11) 88888-8888",
    birthDate: "20/04/1990",
    cpf: "987.654.321-00",
    userType: "cliente",
  },
  {
    name: "Maria Oliveira Costa",
    email: "mariaoliveira@email.com",
    createdDate: "25/05/2025",
    updatedDate: "26/05/2025",
    id: "USR003",
    phone: "(11) 77777-7777",
    birthDate: "10/05/1988",
    cpf: "456.789.123-00",
    userType: "condominio",
  },
]

export function UserList() {
  const { isCollapsed } = useSidebar()
  const { theme } = useTheme()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userList, setUserList] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("Sem filtros")
  const [isCreatingUser, setIsCreatingUser] = useState(false)

  // Cores baseadas no tema
  const colors = {
    light: {
      background: "#f8f8f8",
      cardBackground: "#ffffff",
      border: "#e3e3e3",
      textPrimary: "#222222",
      textSecondary: "#787a82",
      inputBackground: "#ffffff",
    },
    dark: {
      background: "#1a1a1a",
      cardBackground: "#2d2d2d",
      border: "#404040",
      textPrimary: "#ffffff",
      textSecondary: "#a0a0a0",
      inputBackground: "#363636",
    }
  }

  const currentColors = colors[theme]

  // Função para gerar novo ID de usuário
  const generateNewUserId = () => {
    const lastId = userList[userList.length - 1]?.id || "USR000"
    const lastNumber = parseInt(lastId.slice(3))
    return `USR${String(lastNumber + 1).padStart(3, '0')}`
  }

  // Usuário vazio para criação
  const emptyUser: User = {
    name: "",
    email: "",
    createdDate: new Date().toLocaleDateString('pt-BR'),
    updatedDate: new Date().toLocaleDateString('pt-BR'),
    id: generateNewUserId(),
    phone: "",
    birthDate: "",
    cpf: "",
    userType: "cliente",
  }

  // Função para filtrar usuários baseada na busca e filtro selecionado
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return userList

    const lowercasedSearch = searchTerm.toLowerCase()

    switch (selectedFilter) {
      case "Nome":
        return userList.filter(user => 
          user.name.toLowerCase().includes(lowercasedSearch)
        )
      
      case "ID":
        return userList.filter(user => 
          user.id.toLowerCase().includes(lowercasedSearch)
        )
      
      case "E-mail":
        return userList.filter(user => 
          user.email.toLowerCase().includes(lowercasedSearch)
        )
      
      case "Data de criação":
        return userList.filter(user => 
          user.createdDate.includes(searchTerm)
        )
      
      case "Profissional":
        return userList.filter(user => 
          user.userType === "profissional" && 
          Object.values(user).some(value => 
            value.toString().toLowerCase().includes(lowercasedSearch)
          )
        )
      
      case "Cliente":
        return userList.filter(user => 
          user.userType === "cliente" && 
          Object.values(user).some(value => 
            value.toString().toLowerCase().includes(lowercasedSearch)
          )
        )
      
      case "Condomínio":
        return userList.filter(user => 
          user.userType === "condominio" && 
          Object.values(user).some(value => 
            value.toString().toLowerCase().includes(lowercasedSearch)
          )
        )
      
      case "Telefone":
        return userList.filter(user => 
          user.phone.includes(searchTerm)
        )
      
      case "CPF":
        return userList.filter(user => 
          user.cpf.includes(searchTerm)
        )
      
      case "Sem filtros":
      default:
        return userList.filter(user => 
          Object.values(user).some(value => 
            value.toString().toLowerCase().includes(lowercasedSearch)
          )
        )
    }
  }, [userList, searchTerm, selectedFilter])

  const handleSave = (updatedData: User) => {
    if (selectedUser) {
      setUserList(prev => prev.map(user => 
        user.email === selectedUser.email ? { ...user, ...updatedData } : user
      ))
      setSelectedUser(null)
    }
  }

  const handleCreate = (newUserData: User) => {
    setUserList(prev => [...prev, newUserData])
    setIsCreatingUser(false)
  }

  const handleDelete = () => {
    if (selectedUser) {
      setUserList(prev => prev.filter(user => user.email !== selectedUser.email))
      setSelectedUser(null)
    }
  }

  const handleCreateUserClick = () => {
    setIsCreatingUser(true)
    setSelectedUser(emptyUser)
  }

  return (
    <div className={`min-h-screen p-8 transition-all duration-300 ${
      isCollapsed ? "ml-20" : "ml-64"
    } ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Search bar */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#0097b2] pointer-events-none`} />
            <Input 
              placeholder="Buscar usuário..." 
              className={`pl-10 border-[#0097b2] focus:ring-0 ${
                theme === 'dark' 
                  ? 'bg-[#363636] border-[#404040] text-white' 
                  : 'bg-white border-[#0097b2]'
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative inline-block min-w-[150px] max-w-[300px]">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className={`
                appearance-none rounded-lg border-1 w-auto pr-8 px-3 py-1 focus:ring-1
                ${theme === 'dark' 
                  ? 'bg-[#363636] border-[#41af12] text-white focus:border-[#2f9e0b] focus:ring-[#41af12]' 
                  : 'bg-white border-[#41af12] text-[#222222] focus:border-[#2f9e0b] focus:ring-[#41af12]'
                }
              `}
            >
              <option>Sem filtros</option>
              <option>Nome</option>
              <option>ID</option>
              <option>E-mail</option>
              <option>Data de criação</option>
              <option>Profissional</option>
              <option>Cliente</option>
              <option>Condomínio</option>
              <option>Telefone</option>
              <option>CPF</option>
            </select>
            <svg
              className={`w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${
                theme === 'dark' ? 'text-[#41af12]' : 'text-[#41af12]'
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Botão Criar Usuário */}
          <Button
            onClick={handleCreateUserClick}
            className={`flex items-center gap-2 ${
              theme === 'dark' 
                ? 'bg-[#41af12] hover:bg-[#2f9e0b] text-white' 
                : 'bg-[#41af12] hover:bg-[#2f9e0b] text-white'
            }`}
          >
            <Plus className="h-5 w-5" />
            Criar usuário
          </Button>
        </div>

        {/* Table */}
        <div className={`rounded-lg border overflow-hidden ${
          theme === 'dark' 
            ? 'bg-[#2d2d2d] border-[#404040]' 
            : 'bg-white border-[#e3e3e3]'
        }`}>
          <table className="w-full">
            <thead className={theme === 'dark' ? 'bg-[#363636] border-b border-[#404040]' : 'bg-[#f8f8f8] border-b border-[#e3e3e3]'}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: currentColors.textPrimary }}>
                  Informações do usuário
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: currentColors.textPrimary }}>
                  Data criação
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: currentColors.textPrimary }}>
                  Tipo de Usuário
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium" style={{ color: currentColors.textPrimary }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => (
                <tr 
                  key={i} 
                  className={theme === 'dark' ? 'border-b border-[#404040] last:border-0' : 'border-b border-[#e3e3e3] last:border-0'}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium" style={{ color: currentColors.textPrimary }}>
                          {user.name}
                        </p>
                        <p className="text-sm" style={{ color: currentColors.textSecondary }}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4" style={{ color: currentColors.textPrimary }}>
                    {user.createdDate}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${
                      theme === 'dark' 
                        ? 'bg-[#363636] border-[#404040] text-white' 
                        : 'bg-[#f8f8f8] border-[#e3e3e3] text-[#222222]'
                    }`}>
                      {user.userType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      onClick={() => setSelectedUser(user)}
                    >
                      <MoreVertical style={{ color: currentColors.textPrimary }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Mensagem quando não há resultados */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p style={{ color: currentColors.textSecondary }}>Nenhum usuário encontrado</p>
            </div>
          )}
        </div>

        {/* Pop-up do UserProfileCard para edição */}
        {selectedUser && !isCreatingUser && (
          <UserProfileCard
            {...selectedUser}
            open={true}
            onSave={handleSave}
            onDelete={handleDelete}
            onClose={() => setSelectedUser(null)}
          />
        )}

        {/* Pop-up do UserProfileCard para criação */}
        {selectedUser && isCreatingUser && (
          <UserProfileCard
            {...selectedUser}
            open={true}
            onSave={handleCreate}
            onClose={() => {
              setSelectedUser(null)
              setIsCreatingUser(false)
            }}
            isCreateMode={true}
          />
        )}
      </div>
    </div>
  )
}