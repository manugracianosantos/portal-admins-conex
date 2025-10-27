// src/main.ts

// Importa as dependências principais do NestJS
import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module" // Módulo raiz da aplicação

async function bootstrap() {
  // 🔹 Cria a instância principal do aplicativo Nest
  const app = await NestFactory.create(AppModule)

  // 🔹 Define um prefixo global para as rotas (opcional, mas organizado)
  // Isso faz com que todas as rotas comecem com /api (ex: /api/users)
  app.setGlobalPrefix("api")

  // 🔹 Configuração de CORS (permite que o frontend acesse a API)
  app.enableCors({
    origin: process.env.CORS_ORIGIN || ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true, // permite cookies, tokens, etc.
  })

  // 🔹 Ativa o ValidationPipe global (validação automática dos DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // remove propriedades não declaradas nos DTOs
      forbidNonWhitelisted: true, // lança erro se houver campos indevidos
      transform: true,            // converte tipos automaticamente (string → number, etc.)
    }),
  )

  // 🔹 Configuração do Swagger (documentação interativa da API)
  const config = new DocumentBuilder()
    .setTitle("Conex Admin API") // título que aparece na página do Swagger
    .setDescription("API documentation for Conex Administrator Portal") // descrição da API
    .setVersion("1.0") // versão do seu backend
    .addBearerAuth() // adiciona suporte para autenticação via token (Bearer)
    .build()

  // Cria o documento do Swagger com base nas configurações acima
  const document = SwaggerModule.createDocument(app, config)

  // Define a rota onde a documentação estará disponível
  SwaggerModule.setup("api/docs", app, document)

  // 🔹 Define a porta do servidor (usa variável de ambiente se existir)
  const port = process.env.PORT || 3001

  // 🔹 Inicia o servidor
  await app.listen(port)

  // 🔹 Exibe mensagens amigáveis no terminal
  console.log(`🚀 Application is running on: http://localhost:${port}/api`)
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`)
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
}

// Executa a função principal
bootstrap()
