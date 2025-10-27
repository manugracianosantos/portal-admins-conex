// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// DTOs
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService, // Adicione o PrismaService
  ) {}

  // Método auxiliar para converter expiresIn
  private parseExpiresIn(configKey: string): number {
    const expiresIn = this.configService.get<string>(configKey);
    return expiresIn ? parseInt(expiresIn, 10) : 3600;
  }

  async register(registerDto: RegisterDto) {
    // Verificar se o admin já existe
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email: registerDto.email }
    });

    if (existingAdmin) {
      throw new ConflictException('Admin já existe');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Criar novo admin no banco
    const newAdmin = await this.prisma.admin.create({
      data: {
        email: registerDto.email,
        name: registerDto.name,
        password: hashedPassword,
      },
    });

    // Gerar tokens
    return this.generateTokens(newAdmin);
  }

  async login(loginDto: LoginDto) {
    // Encontrar admin no banco
    const admin = await this.prisma.admin.findUnique({
      where: { email: loginDto.email }
    });

    if (!admin) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(loginDto.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar tokens
    return this.generateTokens(admin);
  }

  async logout(userId: string, refreshToken: string) {
    // Implementar lógica de logout (invalidar refresh token)
    return { message: 'Logout realizado com sucesso' };
  }

  async refreshTokens(refreshToken: string) {
    try {
      // Verificar o refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Buscar admin no banco
      const admin = await this.prisma.admin.findUnique({
        where: { id: payload.sub }
      });

      if (!admin) {
        throw new UnauthorizedException('Admin não encontrado');
      }

      // Gerar novos tokens
      return this.generateTokens(admin);
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async getAdminById(id: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        photoUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      throw new UnauthorizedException('Admin não encontrado');
    }

    return admin;
  }

  async validateAdmin(email: string, password: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return null;
    }

    // Não retornar a senha
    const { password: _, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
  }

  private async generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.parseExpiresIn('JWT_EXPIRATION'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.parseExpiresIn('JWT_REFRESH_EXPIRATION'),
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        photoUrl: user.photoUrl,
      },
    };
  }
}