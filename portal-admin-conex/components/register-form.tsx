"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AtSign, Lock, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function RegisterForm() {
  const router = useRouter()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica de cadastro
    // Por enquanto, vamos apenas redirecionar para o login
    router.push("/")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Registration form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0097b2] to-[#41af12] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-[#222222]">
                Nome Completo
              </Label>
              <div className="relative">
                <Input 
                  id="fullname" 
                  type="text" 
                  placeholder="Seu nome completo" 
                  className="pr-10 bg-[#f8f8f8] border-[#e3e3e3]" 
                  required
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#787a82]" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#222222]">
                Email
              </Label>
              <div className="relative">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="pr-10 bg-[#f8f8f8] border-[#e3e3e3]" 
                  required
                />
                <AtSign className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#787a82]" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#222222]">
                Crie uma senha
              </Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Mínimo 8 caracteres" 
                  className="pr-10 bg-[#f8f8f8] border-[#e3e3e3]" 
                  required
                  minLength={8}
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#787a82]" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-[#222222]">
                Confirme sua senha
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Digite a senha novamente"
                  className="pr-10 bg-[#f8f8f8] border-[#e3e3e3]"
                  required
                  minLength={8}
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#787a82]" />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#41af12] text-white hover:bg-[#01800d]"
            >
              Cadastrar
            </Button>

            {/* Link para login */}
            <div className="text-center">
              <p className="text-sm text-[#787a82]">
                Já tem uma conta?{" "}
                <Link 
                  href="/" 
                  className="text-[#0097b2] hover:text-[#41af12] hover:underline font-medium"
                >
                  Fazer login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
          {/* Green flowing lines */}
          <path d="M 100 200 Q 200 400 400 300 T 700 100" stroke="#41af12" strokeWidth="2" fill="none" opacity="0.3" />
          {Array.from({ length: 30 }).map((_, i) => (
            <path
              key={`green-${i}`}
              d={`M 100 ${200 + i * 3} Q 200 ${400 + i * 3} 400 ${300 + i * 3} T 700 ${100 + i * 3}`}
              stroke="#41af12"
              strokeWidth="1"
              fill="none"
              opacity={0.1 + i * 0.01}
            />
          ))}

          {/* Cyan flowing lines */}
          <path d="M 700 400 Q 600 200 400 300 T 100 500" stroke="#0097b2" strokeWidth="2" fill="none" opacity="0.3" />
          {Array.from({ length: 30 }).map((_, i) => (
            <path
              key={`cyan-${i}`}
              d={`M 700 ${400 + i * 3} Q 600 ${200 + i * 3} 400 ${300 + i * 3} T 100 ${500 + i * 3}`}
              stroke="#0097b2"
              strokeWidth="1"
              fill="none"
              opacity={0.1 + i * 0.01}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}