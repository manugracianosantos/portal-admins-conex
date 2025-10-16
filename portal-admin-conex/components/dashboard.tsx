/*Já os componentes fora da pasta ui são funcionalidades mais específicos da aplicação, módulos completos*/
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TrendingUp, Star } from "lucide-react"
import { useTheme } from '@/app/providers/theme-provider'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { useSidebar } from "@/app/providers/sidebar-provider"

const servicesData = [
  { month: "Jan", value1: 300, value2: 200, value3: 400 },
  { month: "Fev", value1: 400, value2: 350, value3: 300 },
  { month: "Mar", value1: 200, value2: 400, value3: 350 },
  { month: "Abr", value1: 450, value2: 300, value3: 200 },
  { month: "Mai", value1: 300, value2: 250, value3: 400 },
  { month: "Jun", value1: 300, value2: 250, value3: 400 },
  { month: "Jul", value1: 300, value2: 250, value3: 400 },
  { month: "Ago", value1: 300, value2: 250, value3: 400 },
  { month: "Set", value1: 300, value2: 250, value3: 400 },
  { month: "Out", value1: 300, value2: 250, value3: 400 },
  { month: "Nov", value1: 300, value2: 250, value3: 400 },
  { month: "Dez", value1: 300, value2: 250, value3: 400 },
]

const cadastrosData = [
  { month: "Jan", value: 10 },
  { month: "Fev", value: 12 },
  { month: "Mar", value: 14 },
  { month: "Abr", value: 8 },
  { month: "Mai", value: 10 },
  { month: "Jun", value: 8 },
  { month: "Jul", value: 6 },
]

const feedbacks = [
  {
    name: "Griselda Pereira",
    rating: 5,
    comment: "Ótimo trabalho! Muito profissional e pontual.",
    time: "2h",
  },
  {
    name: "Griselda Pereira",
    rating: 5,
    comment: "Serviço excelente, recomendo!",
    time: "5h",
  },
  {
    name: "Griselda Pereira",
    rating: 5,
    comment: "Muito satisfeito com o resultado.",
    time: "1d",
  },
]

export function Dashboard() {
  const { isCollapsed } = useSidebar()
  const { theme } = useTheme()

  // Cores baseadas no tema
  const colors = {
    light: {
      background: "#f8f8f8",
      cardBackground: "#ffffff",
      border: "#e3e3e3",
      textPrimary: "#222222",
      textSecondary: "#787a82",
      accent: "#0097b2",
      success: "#41af12",
      feedbackBackground: "#f8f8f8"
    },
    dark: {
      background: "#1a1a1a",
      cardBackground: "#2d2d2d",
      border: "#404040",
      textPrimary: "#ffffff",
      textSecondary: "#a0a0a0",
      accent: "#0097b2",
      success: "#41af12",
      feedbackBackground: "#363636"
    }
  }

  const currentColors = colors[theme]

  return (
    <div className={`min-h-screen p-0 transition-all duration-300 ${
      isCollapsed ? "ml-20" : "ml-64"
    } ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total de Usuários", value: "5.800.100" },
            { title: "Serviços Completos", value: "10.000.000" },
            { title: "Feedbacks Negativos", value: "100" },
          ].map((card, i) => (
            <Card
              key={i}
              className={`border rounded-2xl shadow-sm p-4 flex flex-col justify-between ${
                theme === 'dark' 
                  ? 'bg-[#2d2d2d] border-[#404040]' 
                  : 'bg-white border-[#e3e3e3]'
              }`}
            >
              <CardHeader className="p-0">
                <CardTitle className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-[#a0a0a0]' : 'text-[#787a82]'
                }`}>
                  {card.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 flex flex-col items-center justify-center flex-1">
                <div className={`text-4xl font-bold leading-none ${
                  theme === 'dark' ? 'text-[#0097b2]' : 'text-[#0097b2]'
                }`}>
                  {card.value}
                </div>
              </CardContent>
              <div className="flex justify-end mt-3">
                <TrendingUp className="h-5 w-5 text-[#41af12]" />
              </div>
            </Card>
          ))}
        </div>

        {/* Charts and feedback */}
        <div className={`grid gap-6 ${
          isCollapsed 
            ? "xl:col-span-2 xl:grid-cols-[25%_75%] xl:gap-6 xl:space-y-0"
            : "grid-cols-1 xl:grid-cols-3"
        }`}>
          {/* Coluna 1 - Classificação média dos Donos */}
          <div className={isCollapsed ? "" : "xl:col-span-1"}>
            <Card className={`h-full ${
              theme === 'dark' 
                ? 'bg-[#2d2d2d] border-[#404040]' 
                : 'bg-white border-[#e3e3e3]'
            }`}>
              <CardHeader>
                <CardTitle className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-[#222222]'
                }`}>
                  Classificação média dos Donos
                </CardTitle>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-[#41af12] text-[#41af12]" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-[#222222]'
                  }`}>
                    Feedbacks recentes
                  </h3>
                  <div className="space-y-3">
                    {feedbacks.map((feedback, i) => (
                      <div 
                        key={i} 
                        className={`flex gap-3 p-3 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-[#363636]' 
                            : 'bg-[#f8f8f8]'
                        }`}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={feedback.name} />
                          <AvatarFallback>GP</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-[#222222]'
                            }`}>
                              {feedback.name}
                            </p>
                            <span className={`text-xs ${
                              theme === 'dark' ? 'text-[#a0a0a0]' : 'text-[#787a82]'
                            }`}>
                              {feedback.time}
                            </span>
                          </div>
                          <div className="flex gap-0.5 my-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-3 w-3 fill-[#41af12] text-[#41af12]" />
                            ))}
                          </div>
                          <p className={`text-xs ${
                            theme === 'dark' ? 'text-[#a0a0a0]' : 'text-[#787a82]'
                          }`}>
                            {feedback.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Container para os 2 gráficos lado a lado */}
          <div className={`grid gap-6 ${isCollapsed ? "grid-cols-1" : "xl:col-span-2 xl:grid-cols-2"}`}>
            {/* Gráfico de Novos cadastrados */}
            <Card className={theme === 'dark' ? 'bg-[#2d2d2d] border-[#404040]' : 'bg-white border-[#e3e3e3]'}>
              <CardHeader>
                <CardTitle className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-[#222222]'
                }`}>
                  Novos cadastrados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={cadastrosData}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={theme === 'dark' ? '#404040' : '#e3e3e3'} 
                    />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }} 
                      stroke={theme === 'dark' ? '#a0a0a0' : '#787a82'} 
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      stroke={theme === 'dark' ? '#a0a0a0' : '#787a82'} 
                    />
                    <Bar dataKey="value" fill="#0097b2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-end mt-4">
                  <select
                    className={`border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#0097b2] ${
                      theme === 'dark' 
                        ? 'bg-[#363636] border-[#404040] text-white' 
                        : 'border-gray-300'
                    }`}
                  >
                    <option>Ano</option>
                    <option>Mês</option>
                    <option>Semana</option>
                    <option>Dia</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Gráfico de Serviços mais procurados */}
            <Card className={theme === 'dark' ? 'bg-[#2d2d2d] border-[#404040]' : 'bg-white border-[#e3e3e3]'}>
              <CardHeader>
                <CardTitle className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-[#222222]'
                }`}>
                  Serviços mais procurados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={servicesData}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={theme === 'dark' ? '#404040' : '#e3e3e3'} 
                    />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }} 
                      stroke={theme === 'dark' ? '#a0a0a0' : '#787a82'} 
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      stroke={theme === 'dark' ? '#a0a0a0' : '#787a82'} 
                    />
                    <Line type="monotone" dataKey="value1" stroke="#ff6b6b" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="value2" stroke="#ffd93d" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="value3" stroke="#0097b2" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-end mt-4">
                  <select
                    className={`border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#0097b2] ${
                      theme === 'dark' 
                        ? 'bg-[#363636] border-[#404040] text-white' 
                        : 'border-gray-300'
                    }`}
                  >
                    <option>Ano</option>
                    <option>Mês</option>
                    <option>Semana</option>
                    <option>Dia</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}