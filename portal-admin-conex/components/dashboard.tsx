"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu, TrendingUp, Star } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const servicesData = [
  { month: "Jan", value1: 300, value2: 200, value3: 400 },
  { month: "Fev", value1: 400, value2: 350, value3: 300 },
  { month: "Mar", value1: 200, value2: 400, value3: 350 },
  { month: "Abr", value1: 450, value2: 300, value3: 200 },
  { month: "Mai", value1: 300, value2: 250, value3: 400 },
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
          <Button variant="ghost" size="icon" className="w-12 h-12 bg-[#41af12] text-white hover:bg-[#01800d]">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 text-[#0097b2]">
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
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-[#e3e3e3]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-[#787a82]">Total de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-[#0097b2]">5.800.100</div>
                  <TrendingUp className="h-6 w-6 text-[#41af12]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#e3e3e3]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-[#787a82]">Serviços Completos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-[#0097b2]">10.000.000</div>
                  <TrendingUp className="h-6 w-6 text-[#41af12]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#e3e3e3]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-[#787a82]">Feedbacks Negativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-[#0097b2]">100</div>
                  <TrendingUp className="h-6 w-6 text-[#41af12]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and feedback */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feedbacks section */}
            <Card className="bg-white border-[#e3e3e3]">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-[#222222]">Classificação média dos Donos</CardTitle>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-[#41af12] text-[#41af12]" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-[#222222]">Feedbacks recentes</h3>
                  <div className="space-y-3">
                    {feedbacks.map((feedback, i) => (
                      <div key={i} className="flex gap-3 p-3 bg-[#f8f8f8] rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={feedback.name} />
                          <AvatarFallback>GP</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-[#222222]">{feedback.name}</p>
                            <span className="text-xs text-[#787a82]">{feedback.time}</span>
                          </div>
                          <div className="flex gap-0.5 my-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-3 w-3 fill-[#41af12] text-[#41af12]" />
                            ))}
                          </div>
                          <p className="text-xs text-[#787a82]">{feedback.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services chart */}
            <Card className="bg-white border-[#e3e3e3]">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-[#222222]">Serviços mais procurados</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={servicesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e3e3e3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#787a82" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#787a82" />
                    <Line type="monotone" dataKey="value1" stroke="#ff6b6b" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="value2" stroke="#ffd93d" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="value3" stroke="#0097b2" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
                <Button variant="outline" size="sm" className="w-full mt-4 text-[#787a82] bg-transparent">
                  Mês
                </Button>
              </CardContent>
            </Card>

            {/* Cadastros chart */}
            <Card className="bg-white border-[#e3e3e3]">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-[#222222]">Novos cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={cadastrosData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e3e3e3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#787a82" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#787a82" />
                    <Bar dataKey="value" fill="#0097b2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <Button variant="outline" size="sm" className="w-full mt-4 text-[#787a82] bg-transparent">
                  Mês
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
