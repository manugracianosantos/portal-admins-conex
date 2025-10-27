// admin.module.ts - CORRIGIDO
import { Module } from "@nestjs/common"
import { AdminService } from "./admin.service"
import { AdminController } from "./admin.controller"
import { PrismaModule } from "../prisma/prisma.module"
import { UploadModule } from "../upload/upload.module" // ← Adicione esta linha

@Module({
  imports: [PrismaModule, UploadModule], // ← Adicione UploadModule aqui
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}