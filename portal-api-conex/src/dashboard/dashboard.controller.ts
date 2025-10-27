import { Controller, Get, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import type { DashboardService } from "./dashboard.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("Dashboard")
@Controller("dashboard")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("overview")
  @ApiOperation({ summary: "Get dashboard overview statistics" })
  @ApiResponse({ status: 200, description: "Overview statistics retrieved" })
  async getOverview() {
    return this.dashboardService.getOverview()
  }

  @Get("average-rating")
  @ApiOperation({ summary: "Get average app rating" })
  @ApiResponse({ status: 200, description: "Average rating retrieved" })
  async getAverageRating() {
    return this.dashboardService.getAverageRating()
  }

  @Get("recent-feedbacks")
  @ApiOperation({ summary: "Get recent feedbacks" })
  @ApiResponse({ status: 200, description: "Recent feedbacks retrieved" })
  async getRecentFeedbacks(limit?: string) {
    return this.dashboardService.getRecentFeedbacks(Number(limit) || 10)
  }

  @Get("charts/users")
  @ApiOperation({ summary: "Get users chart data" })
  @ApiResponse({ status: 200, description: "Users chart data retrieved" })
  async getUsersChart(period?: "day" | "week" | "month" | "year") {
    return this.dashboardService.getUsersChart(period || "month")
  }

  @Get("charts/services")
  @ApiOperation({ summary: "Get services chart data" })
  @ApiResponse({ status: 200, description: "Services chart data retrieved" })
  async getServicesChart(period?: "day" | "week" | "month" | "year") {
    return this.dashboardService.getServicesChart(period || "month")
  }

  @Get("charts/feedbacks")
  @ApiOperation({ summary: "Get feedbacks chart data" })
  @ApiResponse({ status: 200, description: "Feedbacks chart data retrieved" })
  async getFeedbacksChart(period?: "day" | "week" | "month" | "year") {
    return this.dashboardService.getFeedbacksChart(period || "month")
  }

  @Get("ratings-distribution")
  @ApiOperation({ summary: "Get ratings distribution" })
  @ApiResponse({ status: 200, description: "Ratings distribution retrieved" })
  async getRatingsDistribution() {
    return this.dashboardService.getRatingsDistribution()
  }
}
