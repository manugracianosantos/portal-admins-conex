import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ConexUser } from "./entities/user.entity";
import { NaturalPerson } from "./entities/natural-person.entity";
import { Business } from "./entities/business.entity";
import { Condominium } from "./entities/condominium.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        ConexUser,
        NaturalPerson,
        Business,
        Condominium
      ],
      'u112555686_conex'  // 🔹 aqui indicamos a conexão correta
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
