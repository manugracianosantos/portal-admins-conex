import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppDbModule } from './app-db/app-db.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'u112555686_conex',
      type: 'mysql',
      host: process.env.DB_HOST || 'auth-db728.hstgr.io',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'u112555686_adm',
      password: process.env.DB_PASSWORD || 'tcc@3M25',
      database: process.env.DB_NAME || 'u112555686_conex',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,  // Banco local do site
    AppDbModule,   // Banco remoto do app
    UserModule,
    AuthModule, // ← FALTAVA ADICIONAR AQUI!
  ],
  controllers: [AppController],
})
export class AppModule {}