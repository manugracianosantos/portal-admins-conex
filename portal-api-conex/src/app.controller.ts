// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return { 
      message: '🚀 Conex Admin API está funcionando!',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      status: 'online',
      endpoints: {
        documentation: '/api/docs',
        users: '/api/users',
        auth: '/api/auth'
      }
    };
  }

  @Get('api')
  getApi() {
    return this.getHello();
  }
}