// src/dashboard/dashboard.service.ts
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, Between, IsNull, Not } from "typeorm"
import { ConexUser } from "../user/entities/user.entity"
import { Service } from "../user/entities/services.entity"
import { ServicePhoto } from "../user/entities/service-photo.entity"

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(ConexUser, 'conexApp')
    private userRepository: Repository<ConexUser>,

    @InjectRepository(Service, 'conexApp')
    private serviceRepository: Repository<Service>,

    @InjectRepository(ServicePhoto, 'conexApp')
    private servicePhotoRepository: Repository<ServicePhoto>,
  ) {}

  // Método que estava faltando
  async getOverview() {
    const [
      totalUsers,
      totalServices,
      completedServices,
      servicesWithPhotos
    ] = await Promise.all([
      this.getTotalUsers(),
      this.getTotalServices(),
      this.getCompletedServices(),
      this.getServicesWithPhotos()
    ])

    return {
      totalUsers,
      totalServices,
      completedServices,
      servicesWithPhotos,
      completionRate: totalServices > 0 ? (completedServices / totalServices) * 100 : 0
    }
  }

  // Método que estava faltando
  async getAverageRating() {
    // Como não temos tabela de feedbacks ainda, retornamos 0
    return {
      averageRating: 0,
    }
  }

  // Método que estava faltando
  async getRecentFeedbacks(limit = 10) {
    // Retornar array vazio até ter a tabela de feedbacks
    return []
  }

  // Método que estava faltando
  async getUsersChart(period: "day" | "week" | "month" | "year" = "month") {
    const dateRange = this.getStartDate(period)
    
    const users = await this.userRepository.find({
      where: {
        created_at: Between(dateRange.startDate, dateRange.endDate)
      },
      select: ['created_at'],
      order: { created_at: 'ASC' }
    })

    return this.groupByPeriod(users, period, 'created_at')
  }

  // Método que estava faltando
  async getServicesChart(period: "day" | "week" | "month" | "year" = "month") {
    const dateRange = this.getStartDate(period)
    
    const services = await this.serviceRepository.find({
      where: {
        completed_at: Between(dateRange.startDate, dateRange.endDate)
      },
      select: ['completed_at'],
      order: { completed_at: 'ASC' }
    })

    return this.groupByPeriod(services, period, 'completed_at')
  }

  // Método que estava faltando
  async getFeedbacksChart(period: "day" | "week" | "month" | "year" = "month") {
    // Retornar array vazio até ter a tabela de feedbacks
    return []
  }

  // Método que estava faltando
  async getRatingsDistribution() {
    // Retornar array vazio até ter a tabela de feedbacks
    return []
  }

  // Métodos adicionais que criamos anteriormente
  async getPopularServices(period: "day" | "week" | "month" | "year" = "month") {
    const dateRange = this.getStartDate(period)
    
    const popularServices = await this.serviceRepository
      .createQueryBuilder('service')
      .select('service.description', 'serviceName')
      .addSelect('COUNT(photos.id)', 'photoCount')
      .leftJoin('service_photos', 'photos', 'photos.service_id = service.id')
      .where('service.created_at BETWEEN :start AND :end', {
        start: dateRange.startDate,
        end: dateRange.endDate
      })
      .groupBy('service.description')
      .orderBy('photoCount', 'DESC')
      .limit(10)
      .getRawMany()

    return popularServices
  }

  async getServicesStatus(period: "day" | "week" | "month" | "year" = "month") {
    const dateRange = this.getStartDate(period)
    
    const [completed, pending] = await Promise.all([
      this.serviceRepository.count({
        where: {
          completed_at: Between(dateRange.startDate, dateRange.endDate)
        }
      }),
      this.serviceRepository.count({
        where: {
          created_at: Between(dateRange.startDate, dateRange.endDate),
          completed_at: IsNull()
        }
      })
    ])

    return [
      { status: 'Concluídos', count: completed },
      { status: 'Pendentes', count: pending }
    ]
  }

  // Métodos auxiliares
  private getStartDate(period: "day" | "week" | "month" | "year") {
    const now = new Date()
    const startDate = new Date(now)

    switch (period) {
      case "day":
        startDate.setHours(0, 0, 0, 0)
        break
      case "week":
        startDate.setDate(startDate.getDate() - 7)
        break
      case "month":
        startDate.setMonth(startDate.getMonth() - 1)
        break
      case "year":
        startDate.setFullYear(startDate.getFullYear() - 1)
        break
    }

    return { startDate, endDate: new Date() }
  }

  private async getTotalUsers(): Promise<number> {
    return this.userRepository.count()
  }

  private async getTotalServices(): Promise<number> {
    return this.serviceRepository.count()
  }

  private async getCompletedServices(): Promise<number> {
    return this.serviceRepository.count({
      where: {
        completed_at: Not(IsNull())
      }
    })
  }

  private async getServicesWithPhotos(): Promise<number> {
    const servicesWithPhotos = await this.serviceRepository
      .createQueryBuilder('service')
      .innerJoin('service_photos', 'photos', 'photos.service_id = service.id')
      .getCount()

    return servicesWithPhotos
  }

  private groupByPeriod(data: any[], period: string, dateField: string) {
    const grouped = new Map<string, number>()

    data.forEach((item) => {
      if (!item[dateField]) return
      
      const date = new Date(item[dateField])
      let key: string

      switch (period) {
        case "day":
          key = `${date.getHours()}:00`
          break
        case "week":
          key = date.toLocaleDateString("pt-BR", { weekday: "short" })
          break
        case "month":
          key = date.toLocaleDateString("pt-BR", { month: "short", day: "numeric" })
          break
        case "year":
          key = date.toLocaleDateString("pt-BR", { month: "short" })
          break
      }

      grouped.set(key, (grouped.get(key) || 0) + 1)
    })

    return Array.from(grouped.entries()).map(([label, count]) => ({
      label,
      count,
    }))
  }
}