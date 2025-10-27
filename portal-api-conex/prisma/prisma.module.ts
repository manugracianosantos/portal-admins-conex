// src/prisma/prisma.module.ts (se não existir, crie)
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ← Torna o PrismaService disponível globalmente
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}