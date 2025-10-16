"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, X } from "lucide-react"
import { useTheme } from '@/app/providers/theme-provider'

type UserType = "cliente" | "profissional" | "condominio"



// E use isso para modificar o comportamento:
// - No título: "Criar Novo Usuário" vs "Editar Usuário"
// - No botão salvar: "Criar" vs "Salvar"
// - Remover o botão de deletar no modo criação

interface UserProfileCardProps {
  isCreateMode?: boolean
  name: string
  email: string
  createdDate: string
  updatedDate: string
  id: string
  phone: string
  birthDate: string
  cpf: string
  userType: UserType
  onSave?: (data: {
    name: string
    email: string
    createdDate: string
    updatedDate: string
    id: string
    phone: string
    birthDate: string
    cpf: string
    userType: UserType
  }) => void
  onDelete?: () => void
  onClose?: () => void
  open?: boolean
}

export function UserProfileCard(props: UserProfileCardProps) {
  const { theme } = useTheme()
  const [form, setForm] = useState({
    name: props.name,
    email: props.email,
    createdDate: props.createdDate,
    updatedDate: props.updatedDate,
    id: props.id,
    phone: props.phone,
    birthDate: props.birthDate,
    cpf: props.cpf,
    userType: props.userType as UserType,
  })

  const [isEditing, setIsEditing] = useState(false)

  const options: { value: UserType; label: string }[] = [
    { value: "cliente", label: "Cliente" },
    { value: "profissional", label: "Profissional" },
    { value: "condominio", label: "Condomínio" },
  ]

  function handleCancel() {
    setForm({
      name: props.name,
      email: props.email,
      createdDate: props.createdDate,
      updatedDate: props.updatedDate,
      id: props.id,
      phone: props.phone,
      birthDate: props.birthDate,
      cpf: props.cpf,
      userType: props.userType,
    })
    setIsEditing(false)
  }

  function handleSave() {
    props.onSave?.({
      name: form.name,
      email: form.email,
      createdDate: form.createdDate,
      updatedDate: form.updatedDate,
      id: form.id,
      phone: form.phone,
      birthDate: form.birthDate,
      cpf: form.cpf,
      userType: form.userType,
    })
    setIsEditing(false)
  }

  const onChange = (field: keyof typeof form, value: string) =>
    setForm((s) => ({ ...s, [field]: value }))

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      props.onDelete?.()
      props.onClose?.()
    }
  }

  if (!props.open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative">
        <Card className={`w-full max-w-sm border ${
          theme === 'dark' 
            ? 'bg-[#2d2d2d] border-[#404040]' 
            : 'bg-[#f8f8f8] border-[#e3e3e3]'
        }`}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt={form.name} />
                  <AvatarFallback>
                    {form.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {isEditing ? (
                    <>
                      <input
                        value={form.name}
                        onChange={(e) => onChange("name", e.target.value)}
                        className={`border rounded px-2 py-1 text-sm w-full ${
                          theme === 'dark' 
                            ? 'bg-[#363636] border-[#404040] text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                      />
                      <input
                        value={form.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        className={`border rounded px-2 py-1 text-sm w-full mt-1 ${
                          theme === 'dark' 
                            ? 'bg-[#363636] border-[#404040] text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                      />
                    </>
                  ) : (
                    <>
                      <h3 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-[#222222]'
                      }`}>
                        {form.name}
                      </h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-[#a0a0a0]' : 'text-[#787a82]'
                      }`}>
                        {form.email}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-[#41af12] hover:bg-[#0097b2]/50"
                  onClick={() => setIsEditing((s) => !s)}
                  aria-label={isEditing ? "Fechar edição" : "Editar"}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-[#0097b2] hover:bg-[#41af12]/50"
                  onClick={handleDelete}
                  aria-label="Deletar"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="space-y-1">
              <p className={`text-xs ${
                theme === 'dark' ? 'text-[#a0a0a0]' : 'text-[#787a82]'
              }`}>
                Criado em:{" "}
                {isEditing ? (
                  <input
                    value={form.createdDate}
                    onChange={(e) => onChange("createdDate", e.target.value)}
                    className={`border rounded px-2 py-1 text-sm ${
                      theme === 'dark' 
                        ? 'bg-[#363636] border-[#404040] text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                ) : (
                  form.createdDate
                )}
              </p>

              <p className={`text-xs ${
                theme === 'dark' ? 'text-[#a0a0a0]' : 'text-[#787a82]'
              }`}>
                Atualizado em:{" "}
                {isEditing ? (
                  <input
                    value={form.updatedDate}
                    onChange={(e) => onChange("updatedDate", e.target.value)}
                    className={`border rounded px-2 py-1 text-sm ${
                      theme === 'dark' 
                        ? 'bg-[#363636] border-[#404040] text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                ) : (
                  form.updatedDate
                )}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm">
                <span className="text-[#41af12]">ID:</span>{" "}
                {isEditing ? (
                  <input
                    value={form.id}
                    onChange={(e) => onChange("id", e.target.value)}
                    className={`border rounded px-2 py-1 text-sm w-full ${
                      theme === 'dark' 
                        ? 'bg-[#363636] border-[#404040] text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                ) : (
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-[#222222]'
                  }`}>
                    {form.id}
                  </span>
                )}
              </p>

              <p className="text-sm">
                <span className="text-[#41af12]">TELEFONE:</span>{" "}
                {isEditing ? (
                  <input
                    value={form.phone}
                    onChange={(e) => onChange("phone", e.target.value)}
                    className={`border rounded px-2 py-1 text-sm w-full ${
                      theme === 'dark' 
                        ? 'bg-[#363636] border-[#404040] text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                ) : (
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-[#222222]'
                  }`}>
                    {form.phone}
                  </span>
                )}
              </p>

              <p className="text-sm">
                <span className="text-[#41af12] font-medium">DATA DE NASCIMENTO:</span>{" "}
                {isEditing ? (
                  <input
                    value={form.birthDate}
                    onChange={(e) => onChange("birthDate", e.target.value)}
                    className={`border rounded px-2 py-1 text-sm w-full ${
                      theme === 'dark' 
                        ? 'bg-[#363636] border-[#404040] text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                ) : (
                  <span className={theme === 'dark' ? 'text-white' : 'text-[#222222]'}>
                    {form.birthDate}
                  </span>
                )}
              </p>

              <p className="text-sm">
                <span className="text-[#41af12]">CPF:</span>{" "}
                {isEditing ? (
                  <input
                    value={form.cpf}
                    onChange={(e) => onChange("cpf", e.target.value)}
                    className={`border rounded px-2 py-1 text-sm w-full ${
                      theme === 'dark' 
                        ? 'bg-[#363636] border-[#404040] text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                ) : (
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-[#222222]'
                  }`}>
                    {form.cpf}
                  </span>
                )}
              </p>
            </div>

            <div className="pt-2">
              <Label className={`text-sm font-medium ${
                theme === 'dark' ? 'text-white' : 'text-[#222222]'
              }`}>
                Tipo de Usuário:
              </Label>
              <div className="flex gap-2 mt-2">
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => isEditing && setForm((s) => ({ ...s, userType: option.value }))}
                    disabled={!isEditing}
                    className={`
                      px-3 py-1.5 text-sm rounded-full border transition-all duration-300 ease-in-out
                      ${
                        form.userType === option.value
                          ? "border-[#41af12] text-[#41af12] bg-[#e9f8eb]"
                          : theme === 'dark' 
                            ? "border-[#404040] text-white bg-[#363636]"
                            : "border-[#d0d0d0] text-[#222222]"
                      }
                      ${isEditing ? "hover:border-[#41af12] hover:bg-[#f5fbf5]" : "opacity-60 cursor-not-allowed"}
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-[#0097b2] text-white border-[#0097b2] hover:bg-[#0097b2]/90"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
                <Button className="flex-1 bg-[#41af12] text-white hover:bg-[#01800d]" onClick={handleSave}>
                  Salvar alterações
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Button
          variant="ghost"
          size="icon"
          className={`absolute -top-2 -right-2 h-6 w-6 rounded-full border shadow-sm ${
            theme === 'dark' 
              ? 'bg-[#363636] border-[#404040] hover:bg-[#2d2d2d]' 
              : 'bg-white border-[#e3e3e3] hover:bg-[#f8f8f8]'
          }`}
          onClick={props.onClose}
        >
          <X className={`h-3 w-3 ${theme === 'dark' ? 'text-white' : 'text-[#222222]'}`} />
        </Button>
      </div>
    </div>
  )
}
