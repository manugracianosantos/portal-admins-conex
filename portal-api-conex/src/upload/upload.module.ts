// upload/upload.module.ts
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config" // ← Importar ConfigModule
import { UploadService } from "./upload.service"

@Module({
  imports: [ConfigModule], // ← Adicionar ConfigModule aqui
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}