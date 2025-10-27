"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TrendingUp, Star } from "lucide-react"
import { useTheme } from '@/app/providers/theme-provider'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { useSidebar } from "@/app/providers/sidebar-provider"
import { useEffect, useState } from "react"
import { api } from "@/services/api"
import { useAuth } from "@/hooks/useAuth"

export function Dashboard() {
  const { isCollapsed } = useSidebar()
  const { theme } = useTheme()
  const { token } = useAuth()
  
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalUsers: 0,
      totalServices: 0,
      completedServices: 0,
      servicesWithPhotos: 0,
      completionRate: 0
    },
    usersChart: [],
    servicesChart: [],
    popularServices: [],
    servicesStatus: [],
    loading: true
  })

  const [timeFilter, setTimeFilter] = useState("month")

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

  // No seu dashboard.tsx - atualize a parte do useEffect
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return
      
      try {
        setDashboardData(prev => ({ ...prev, loading: true }))
        
        const [overview, usersChart, servicesChart, popularServices, servicesStatus] = await Promise.all([
          api.dashboard.getOverview(token),
          api.dashboard.getUsersChart(token, timeFilter),
          api.dashboard.getServicesChart(token, timeFilter),
          api.dashboard.getPopularServices(token, timeFilter),
          api.dashboard.getServicesStatus(token, timeFilter)
        ])

        setDashboardData({
          overview,
          usersChart,
          servicesChart,
          popularServices,
          servicesStatus,
          loading: false
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setDashboardData(prev => ({ ...prev, loading: false }))
      }
    }

    fetchDashboardData()
  }, [token, timeFilter])

  // Format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const statsCards = [
    { 
      title: "Total de Usuários", 
      value: formatNumber(dashboardData.overview.totalUsers),
      trend: "up" 
    },
    { 
      title: "Serviços Completos", 
      value: formatNumber(dashboardData.overview.completedServices),
      trend: "up" 
    },
    { 
      title: "Serviços com Fotos", 
      value: formatNumber(dashboardData.overview.servicesWithPhotos),
      trend: "up" 
    },
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

  return (
    <div className={`min-h-screen p-0 transition-all duration-300 ${
      isCollapsed ? "ml-20" : "ml-64"
    } ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#f8f8f8]'}`}>
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsCards.map((card, i) => (
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
                  {dashboardData.loading ? "..." : card.value}
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
                  <BarChart data={dashboardData.usersChart}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={theme === 'dark' ? '#404040' : '#e3e3e3'} 
                    />
                    <XAxis 
                      dataKey="label" 
                      tick={{ fontSize: 12 }} 
                      stroke={theme === 'dark' ? '#a0a0a0' : '#787a82'} 
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      stroke={theme === 'dark' ? '#a0a0a0' : '#787a82'} 
                    />
                    <Bar dataKey="count" fill="#0097b2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-end mt-4">
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className={`border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#0097b2] ${
                      theme === 'dark' 
                        ? 'bg-[#363636] border-[#404040] text-white' 
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="year">Ano</option>
                    <option value="month">Mês</option>
                    <option value="week">Semana</option>
                    <option value="day">Dia</option>
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
                  <BarChart data={dashboardData.popularServices}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={theme === 'dark' ? '#404040' : '#e3e3e3'} 
                    />
                    <XAxis 
                      dataKey="serviceName" 
                      tick={{ fontSize: 12 }} 
                      stroke={theme === 'dark' ? '#a0a0a0' : '#787a82'} 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      stroke={theme === 'dark' ? '#a0a0a0' : '#787a82'} 
                    />
                    <Bar dataKey="photoCount" fill="#41af12" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-end mt-4">
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className={`border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#0097b2] ${
                      theme === 'dark' 
                        ? 'bg-[#363636] border-[#404040] text-white' 
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="year">Ano</option>
                    <option value="month">Mês</option>
                    <option value="week">Semana</option>
                    <option value="day">Dia</option>
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