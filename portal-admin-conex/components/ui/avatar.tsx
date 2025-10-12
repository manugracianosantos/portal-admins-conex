/*A pasta components usamos para adicionar todo tipo de componente que pode ou não ser reutilizável, os
que estão dentro desta página ui por exemplo são componenentes bem básicos e usados no código varias vezes,
como botões, cards, */

"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { Camera, User } from "lucide-react"
import { cn } from "@/lib/utils"

// Função para gerar cores baseadas no nome (degrade consistente)
function generateColorFromName(name: string) {
  const colors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500", 
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500",
    "from-teal-500 to-blue-500",
    "from-rose-500 to-pink-500",
    "from-amber-500 to-yellow-500"
  ]
  
  // Gera um índice baseado no nome (sempre mesma cor para mesmo nome)
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % colors.length
  return colors[index]
}

// Função para pegar as iniciais do nome
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  name?: string
  onImageChange?: (file: File) => void
}

function Avatar({
  className,
  name = "Usuário",
  onImageChange,
  ...props
}: AvatarProps) {
  const [imageUrl, setImageUrl] = React.useState<string | undefined>()
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Cria URL temporária para preview
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      
      // Chama callback se fornecido
      onImageChange?.(file)
    }
  }

  const gradientClass = generateColorFromName(name)
  const initials = getInitials(name)

  return (
    <div className="relative group">
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn(
          "relative flex size-10 shrink-0 overflow-hidden rounded-full cursor-pointer transition-all duration-200",
          "group-hover:ring-2 group-hover:ring-primary group-hover:ring-offset-2",
          className
        )}
        onClick={handleAvatarClick}
        {...props}
      >
        {/* Imagem do usuário (se existir) */}
        <AvatarPrimitive.Image
          data-slot="avatar-image"
          className={cn("aspect-square size-full object-cover", 
            imageUrl ? "opacity-100" : "opacity-0"
          )}
          src={imageUrl}
          alt={`Avatar de ${name}`}
        />
        
        {/* Fallback com degrade e iniciais */}
        <AvatarPrimitive.Fallback
          data-slot="avatar-fallback"
          className={cn(
            "flex size-full items-center justify-center rounded-full text-white font-semibold text-sm",
            `bg-gradient-to-br ${gradientClass}`,
            imageUrl && "opacity-0" // Esconde fallback se tiver imagem
          )}
          delayMs={600}
        >
          {initials}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>

      {/* Overlay de câmera ao passar mouse */}
      <div className={cn(
        "absolute inset-0 bg-black/50 rounded-full flex items-center justify-center",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
        "cursor-pointer"
      )}>
        <Camera className="size-4 text-white" />
      </div>

      {/* Input de arquivo invisível */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}

// Componentes básicos mantidos para compatibilidade
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  name = "Usuário",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & { name?: string }) {
  const gradientClass = generateColorFromName(name)
  const initials = getInitials(name)

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full text-white font-semibold text-sm",
        `bg-gradient-to-br ${gradientClass}`,
        className
      )}
      {...props}
    >
      {initials}
    </AvatarPrimitive.Fallback>
  )
}

export { Avatar, AvatarImage, AvatarFallback }