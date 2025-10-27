"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreVertical, Plus, Loader2, Edit, Trash2 } from "lucide-react"
import { useSidebar } from "@/app/providers/sidebar-provider"
import { useTheme } from '@/app/providers/theme-provider'
import { UserProfileCard } from "./user-profile-card"
import { api } from "@/services/api"
import { useAuth } from "@/hooks/useAuth"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type UserType = "cliente" | "profissional" | "condominio"

interface User {
  id: string
  name: string
  email: string
  phone: string
  birthDate: string
  cpf: string
  userType: UserType
  createdDate: string
  updatedDate: string
  photoUrl?: string
  status?: "active" | "inactive"
}

export function UserList() {
  const { isCollapsed } = useSidebar()
  const { theme } = useTheme()
  const { token } = useAuth()
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userList, setUserList] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("Sem filtros")
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  
  const hasLoaded = useRef(false)
  const lastToken = useRef<string | null>(null)

  // 🔥 CARREGAR USUÁRIOS COM DEBUG DETALHADO
  const loadUsers = async () => {
    if (!token) {
      setError("Token de autenticação não encontrado")
      setLoading(false)
      return
    }
    
    try {
      setLoading(true)
      setError("")
      console.log("🔍 Iniciando carregamento de usuários...")
      
      // 🔥 CHAMA SUA API
      const response = await api.users.getAll(token)
      console.log("📦 Resposta COMPLETA da API:", response)
      console.log("🔎 Tipo da resposta:", typeof response)
      console.log("🔎 É array?", Array.isArray(response))
      
      if (response && typeof response === 'object') {
        console.log("🔍 Chaves do response:", Object.keys(response))
      }
      
      // 🔥 ADAPTA A RESPOSTA CONFORME SUA API
      let users: User[] = []
      let rawUsers: any[] = []
      
      // Tenta encontrar o array de usuários em diferentes estruturas
      if (Array.isArray(response)) {
        console.log("✅ Resposta é um array diretamente")
        rawUsers = response
      } else if (response?.users && Array.isArray(response.users)) {
        console.log("✅ Resposta tem propriedade 'users'")
        rawUsers = response.users
      } else if (response?.data && Array.isArray(response.data)) {
        console.log("✅ Resposta tem propriedade 'data'")
        rawUsers = response.data
      } else if (response?.content && Array.isArray(response.content)) {
        console.log("✅ Resposta tem propriedade 'content'")
        rawUsers = response.content
      } else if (response?.result && Array.isArray(response.result)) {
        console.log("✅ Resposta tem propriedade 'result'")
        rawUsers = response.result
      } else if (response?.items && Array.isArray(response.items)) {
        console.log("✅ Resposta tem propriedade 'items'")
        rawUsers = response.items
      } else {
        console.error("❌ Estrutura de resposta inesperada")
        console.log("🔍 Response completo:", response)
        
        // Tenta encontrar qualquer array no response
        const arrayKeys = Object.keys(response || {}).filter(key => 
          Array.isArray((response as any)[key])
        )
        
        if (arrayKeys.length > 0) {
          console.log("🔍 Arrays encontrados no response:", arrayKeys)
          rawUsers = (response as any)[arrayKeys[0]]
        } else {
          setError("Estrutura de dados inesperada do servidor")
          // 🔥 DADOS DE TESTE TEMPORÁRIOS
          console.log("🧪 Usando dados de teste temporários...")
          rawUsers = [
            {
              _id: "1",
              name: "João Silva (Teste)",
              email: "joao.silva@email.com",
              phone: "(11) 99999-9999",
              birthDate: "1990-05-15",
              cpf: "123.456.789-00",
              userType: "cliente",
              createdAt: new Date().toISOString(),
              status: "active"
            },
            {
              _id: "2",
              name: "Maria Santos (Teste)", 
              email: "maria.santos@email.com",
              phone: "(11) 98888-8888",
              birthDate: "1985-08-20",
              cpf: "987.654.321-00",
              userType: "profissional",
              createdAt: new Date().toISOString(),
              status: "active"
            }
          ]
        }
      }
      
      console.log("👥 Usuários brutos encontrados:", rawUsers)
      
      // Processa os usuários
      users = rawUsers.map((user: any) => {
        const processedUser = {
          id: user.id || user._id || `temp-${Math.random()}`,
          name: user.name || user.nome || 'Nome não informado',
          email: user.email || 'Email não informado',
          phone: user.phone || user.telefone || 'Telefone não informado',
          birthDate: user.birthDate || user.dataNascimento || new Date().toISOString().split('T')[0],
          cpf: user.cpf || 'CPF não informado',
          userType: (user.userType || user.tipoUsuario || 'cliente') as UserType,
          createdDate: user.createdDate || user.createdAt || user.dataCriacao || new Date().toISOString(),
          updatedDate: user.updatedDate || user.updatedAt || user.dataAtualizacao || new Date().toISOString(),
          photoUrl: user.photoUrl || user.fotoUrl,
          status: user.status || "active"
        }
        
        console.log(`👤 Usuário processado [${processedUser.name}]:`, processedUser)
        return processedUser
      })
      
      console.log("📊 Total de usuários processados:", users.length)
      
      if (users.length === 0) {
        console.warn("⚠️ Nenhum usuário foi encontrado após o processamento")
        setError("Nenhum usuário encontrado no banco de dados")
      } else {
        setError("") // Limpa erro se encontrou usuários
      }
      
      setUserList(users)
      hasLoaded.current = true
      lastToken.current = token
      
    } catch (error: any) {
      console.error('❌ Erro ao carregar usuários:', error)
      setError(error.message || "Erro ao carregar usuários do banco de dados")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token && (!hasLoaded.current || token !== lastToken.current)) {
      loadUsers()
    } else if (!token) {
      setLoading(false)
    }
  }, [token])

  const handleForceReload = async () => {
    hasLoaded.current = false
    await loadUsers()
  }

  // 🔥 FUNÇÃO PARA CRIAR USUÁRIO
  const handleCreate = async (newUserData: User) => {
    if (!token) {
      setError("Token de autenticação não encontrado")
      return
    }
    
    try {
      setLoading(true)
      console.log("Criando usuário:", newUserData)
      
      const userData = {
        name: newUserData.name,
        email: newUserData.email,
        phone: newUserData.phone,
        birthDate: newUserData.birthDate,
        cpf: newUserData.cpf,
        userType: newUserData.userType,
      }
      
      const response = await api.users.create(token, userData)
      console.log("Usuário criado:", response)
      
      await handleForceReload()
      setIsCreatingUser(false)
      setSelectedUser(null)
      
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error)
      setError(error.message || "Erro ao criar usuário")
    } finally {
      setLoading(false)
    }
  }

  // 🔥 FUNÇÃO PARA ATUALIZAR USUÁRIO
  const handleSave = async (updatedData: User) => {
    if (!token || !selectedUser) {
      setError("Token ou usuário não encontrado")
      return
    }
    
    try {
      setLoading(true)
      console.log("Atualizando usuário:", updatedData)
      
      const userData = {
        name: updatedData.name,
        email: updatedData.email,
        phone: updatedData.phone,
        birthDate: updatedData.birthDate,
        cpf: updatedData.cpf,
        userType: updatedData.userType,
      }
      
      const response = await api.users.update(token, selectedUser.id, userData)
      console.log("Usuário atualizado:", response)
      
      await handleForceReload()
      setSelectedUser(null)
      
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error)
      setError(error.message || "Erro ao atualizar usuário")
    } finally {
      setLoading(false)
    }
  }

  // 🔥 FUNÇÃO PARA DELETAR USUÁRIO
  const handleDelete = async () => {
    if (!token || !userToDelete) return
    
    try {
      setLoading(true)
      console.log("Deletando usuário:", userToDelete.id)
      
      const response = await api.users.delete(token, userToDelete.id)
      console.log("Usuário deletado:", response)
      
      await handleForceReload()
      setDeleteDialogOpen(false)
      setUserToDelete(null)
      setSelectedUser(null)
      
    } catch (error: any) {
      console.error('Erro ao deletar usuário:', error)
      setError(error.message || "Erro ao deletar usuário")
    } finally {
      setLoading(false)
    }
  }

  const openDeleteDialog = (user: User) => {
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return userList

    const lowercasedSearch = searchTerm.toLowerCase()

    switch (selectedFilter) {
      case "Nome":
        return userList.filter(user => 
          user.name.toLowerCase().includes(lowercasedSearch)
        )
      case "E-mail":
        return userList.filter(user => 
          user.email.toLowerCase().includes(lowercasedSearch)
        )
      case "Profissional":
        return userList.filter(user => 
          user.userType === "profissional" && 
          user.name.toLowerCase().includes(lowercasedSearch)
        )
      case "Cliente":
        return userList.filter(user => 
          user.userType === "cliente" && 
          user.name.toLowerCase().includes(lowercasedSearch)
        )
      case "Condomínio":
        return userList.filter(user => 
          user.userType === "condominio" && 
          user.name.toLowerCase().includes(lowercasedSearch)
        )
      case "Telefone":
        return userList.filter(user => 
          user.phone.includes(searchTerm)
        )
      case "CPF":
        return userList.filter(user => 
          user.cpf.includes(searchTerm)
        )
      default:
        return userList.filter(user => 
          Object.values(user).some(value => 
            value?.toString().toLowerCase().includes(lowercasedSearch)
          )
        )
    }
  }, [userList, searchTerm, selectedFilter])

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR')
    } catch {
      return dateString
    }
  }

  return (
    <div className={`min-h-screen p-8 transition-all duration-300 ${
      isCollapsed ? "ml-20" : "ml-64"
    } ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Search bar */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#0097b2]" />
            <Input 
              placeholder="Buscar usuário..." 
              className="pl-10 border-[#0097b2] focus:ring-0 bg-white dark:bg-[#363636] text-black dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="appearance-none rounded-lg border border-[#41af12] px-3 py-2 focus:ring-1 focus:ring-[#41af12] bg-white dark:bg-[#363636] text-black dark:text-white"
          >
            <option>Sem filtros</option>
            <option>Nome</option>
            <option>E-mail</option>
            <option>Profissional</option>
            <option>Cliente</option>
            <option>Condomínio</option>
            <option>Telefone</option>
            <option>CPF</option>
          </select>

          <Button
            onClick={() => {
              setIsCreatingUser(true)
              setSelectedUser({
                id: "",
                name: "",
                email: "",
                phone: "",
                birthDate: "",
                cpf: "",
                userType: "cliente",
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
              })
            }}
            className="bg-[#41af12] hover:bg-[#2f9e0b] text-white"
          >
            <Plus className="h-5 w-5" />
            Criar usuário
          </Button>

          <Button
            onClick={handleForceReload}
            variant="outline"
            className="flex items-center gap-2 border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2] hover:text-white"
            disabled={loading}
          >
            <Loader2 className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Carregando...' : 'Recarregar'}
          </Button>
        </div>

        {/* Mensagens de status */}
        {error && (
          <div className={`mb-4 px-4 py-3 rounded-md text-sm ${
            error.includes('cache') 
              ? 'bg-yellow-50 border border-yellow-200 text-yellow-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#0097b2]" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Carregando usuários...</span>
          </div>
        )}

        {/* Tabela de usuários */}
        {!loading && (
          <div className="rounded-lg border overflow-hidden bg-white dark:bg-[#2d2d2d] border-gray-200 dark:border-[#404040]">
            <table className="w-full">
              <thead className="bg-[#f8f8f8] dark:bg-[#363636] border-b border-gray-200 dark:border-[#404040]">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white">Usuário</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white">Data criação</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white">Tipo</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white">Status</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 dark:border-[#404040] hover:bg-gray-50 dark:hover:bg-[#363636]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.photoUrl} alt={user.name} />
                          <AvatarFallback className="bg-[#0097b2] text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{formatDate(user.createdDate)}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
                        {user.userType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {user.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                          className="border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2] hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteDialog(user)}
                          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {userList.length === 0 ? "Nenhum usuário cadastrado" : "Nenhum usuário encontrado"}
              </div>
            )}
          </div>
        )}

        {/* Modal de edição/criação */}
        {selectedUser && (
          <UserProfileCard
            {...selectedUser}
            open={true}
            onSave={isCreatingUser ? handleCreate : handleSave}
            onDelete={isCreatingUser ? undefined : () => openDeleteDialog(selectedUser)}
            onClose={() => {
              setSelectedUser(null)
              setIsCreatingUser(false)
            }}
            isCreateMode={isCreatingUser}
          />
        )}

        {/* Dialog de confirmação para deletar */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="bg-white dark:bg-[#2d2d2d]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900 dark:text-white">
                Confirmar exclusão
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                Tem certeza que deseja excluir o usuário <strong>{userToDelete?.name}</strong>? 
                Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-100 dark:bg-[#363636] text-gray-900 dark:text-white">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}