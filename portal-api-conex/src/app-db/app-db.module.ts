// src/app-db/app-db.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConexUser } from '../user/entities/user.entity';
import { NaturalPerson } from '../user/entities/natural-person.entity';
import { Business } from '../user/entities/business.entity';
import { Condominium } from '../user/entities/condominium.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'u112555686_conex', // nome da conexão
      type: 'mysql',
      host: process.env.APP_DB_HOST,
      port: parseInt(process.env.APP_DB_PORT || '3306'),
      username: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASS,
      database: process.env.APP_DB_NAME,
      entities: [ConexUser, NaturalPerson, Business, Condominium],
      synchronize: false, // nunca habilitar no banco remoto
    }),
    TypeOrmModule.forFeature(
      [ConexUser, NaturalPerson, Business, Condominium],
      'u112555686_conex'
    ),
  ],
  exports: [TypeOrmModule],
})
export class AppDbModule {}
