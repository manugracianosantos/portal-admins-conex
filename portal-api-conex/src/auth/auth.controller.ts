// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() registerDto: any) {
    console.log('📝 Registrando usuário:', registerDto);
    
    // Mock response - depois implemente a lógica real
    return {
      message: 'Usuário registrado com sucesso!',
      user: {
        id: '1',
        name: registerDto.name,
        email: registerDto.email,
      },
      token: 'mock-jwt-token-' + Date.now()
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: any) {
    console.log('🔐 Login attempt:', loginDto);
    
    // Mock response - depois implemente a lógica real
    return {
      message: 'Login realizado com sucesso!',
      user: {
        id: '1',
        name: 'Usuário Demo',
        email: loginDto.email,
      },
      token: 'mock-jwt-token-' + Date.now()
    };
  }
}