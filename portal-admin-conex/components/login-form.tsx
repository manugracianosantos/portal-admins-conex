"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AtSign, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica de autenticação
    // Por enquanto, vamos apenas redirecionar para o dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
          {/* Cyan flowing lines */}
          <path d="M 100 400 Q 200 200 400 300 T 700 500" stroke="#0097b2" strokeWidth="2" fill="none" opacity="0.3" />
          {Array.from({ length: 30 }).map((_, i) => (
            <path
              key={`cyan-${i}`}
              d={`M 100 ${400 + i * 3} Q 200 ${200 + i * 3} 400 ${300 + i * 3} T 700 ${500 + i * 3}`}
              stroke="#0097b2"
              strokeWidth="1"
              fill="none"
              opacity={0.1 + i * 0.01}
            />
          ))}

          {/* Green flowing lines */}
          <path d="M 700 200 Q 600 400 400 300 T 100 100" stroke="#41af12" strokeWidth="2" fill="none" opacity="0.3" />
          {Array.from({ length: 30 }).map((_, i) => (
            <path
              key={`green-${i}`}
              d={`M 700 ${200 + i * 3} Q 600 ${400 + i * 3} 400 ${300 + i * 3} T 100 ${100 + i * 3}`}
              stroke="#41af12"
              strokeWidth="1"
              fill="none"
              opacity={0.1 + i * 0.01}
            />
          ))}
        </svg>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0097b2] to-[#41af12] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
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
                Senha
              </Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Sua senha" 
                  className="pr-10 bg-[#f8f8f8] border-[#e3e3e3]" 
                  required
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#787a82]" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-[#0097b2] cursor-pointer">
                  Lembrar de mim
                </label>
              </div>
              <a href="#" className="text-sm text-[#41af12] hover:underline">
                Esqueceu sua senha?
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#41af12] to-[#0097b2] text-white hover:opacity-90"
            >
              Login
            </Button>

            {/* Link para cadastro */}
            <div className="text-center">
              <p className="text-sm text-[#787a82]">
                Ainda não tem uma conta?{" "}
                <Link 
                  href="/register" 
                  className="text-[#0097b2] hover:text-[#41af12] hover:underline font-medium"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}