import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Pencil, Trash2 } from "lucide-react"

interface UserProfileCardProps {
  name: string
  email: string
  createdDate: string
  updatedDate: string
  id: string
  phone: string
  birthDate: string
  cpf: string
  userType: "cliente" | "profissional" | "condominio"
}

export function UserProfileCard({
  name,
  email,
  createdDate,
  updatedDate,
  id,
  phone,
  birthDate,
  cpf,
  userType,
}: UserProfileCardProps) {
  return (
    <Card className="w-full max-w-sm bg-[#f8f8f8] border-[#e3e3e3]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-[#222222]">{name}</h3>
              <p className="text-sm text-[#787a82]">{email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="h-8 w-8 text-[#41af12]">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-[#0097b2]">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-[#787a82]">Criado em: {createdDate}</p>
          <p className="text-xs text-[#787a82]">Atualizado em: {updatedDate}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-[#787a82]">ID:</span> <span className="text-[#222222] font-medium">{id}</span>
          </p>
          <p className="text-sm">
            <span className="text-[#787a82]">TELEFONE:</span>{" "}
            <span className="text-[#222222] font-medium">{phone}</span>
          </p>
          <p className="text-sm">
            <span className="text-[#41af12] font-medium">DATA DE NASCIMENTO:</span>{" "}
            <span className="text-[#222222]">{birthDate}</span>
          </p>
          <p className="text-sm">
            <span className="text-[#787a82]">CPF:</span> <span className="text-[#222222] font-medium">{cpf}</span>
          </p>
        </div>

        <div className="pt-2">
          <Label className="text-sm text-[#222222] font-medium">Tipo de Usuário:</Label>
          <RadioGroup defaultValue={userType} className="flex gap-2 mt-2">
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="cliente" id="cliente" />
              <Label htmlFor="cliente" className="text-sm cursor-pointer">
                Cliente
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="profissional" id="profissional" />
              <Label htmlFor="profissional" className="text-sm cursor-pointer">
                Profissional
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="condominio" id="condominio" />
              <Label htmlFor="condominio" className="text-sm cursor-pointer">
                Condomínio
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1 bg-[#0097b2] text-white border-[#0097b2] hover:bg-[#0097b2]/90">
            Cancelar
          </Button>
          <Button className="flex-1 bg-[#41af12] text-white hover:bg-[#01800d]">Salvar alterações</Button>
        </div>
      </CardContent>
    </Card>
  )
}
