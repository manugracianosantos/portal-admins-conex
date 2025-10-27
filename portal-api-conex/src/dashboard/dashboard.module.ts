// src/dashboard/dashboard.module.ts
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DashboardService } from "./dashboard.service"
import { DashboardController } from "./dashboard.controller"
import { ConexUser } from "../user/entities/user.entity"
import { Service } from "../user/entities/services.entity"
import { ServicePhoto } from "../user/entities/service-photo.entity"

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ConexUser, Service, ServicePhoto], 
      'conexApp'
    )
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}