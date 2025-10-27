// src/user/dto/create-user.dto.ts
import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';

// src/user/dto/create-user.dto.ts
export class CreateUserDto {
  userId?: string;
  fullName?: string;
  type?: 'natural_person' | 'business' | 'condominium';
  cpf?: string;
  cpfCnpj?: string;
  specialty?: string;
  cnpj?: string;
  profilePicture?: string;

    // Novas propriedades
  phone?: string;
  birthDate?: string; // ou Date, dependendo de como você armazena no banco

}
