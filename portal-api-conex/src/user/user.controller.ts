// src/user/user.controller.ts - VERSÃO CORRIGIDA
import { Controller, Get, Post, Put, Delete, Query, Param, UseGuards, HttpCode, HttpStatus, Body } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { UserService } from "./user.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("Users")
@Controller("users") // ← MUDADO: removido /auth da rota
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  async create(@Body() createUserDto: CreateUserDto) { // ← Adicionado @Body()
    return this.userService.create(createUserDto)
  }

  @Get()
  @ApiOperation({ summary: "Get all users with pagination" })
  @ApiResponse({ status: 200, description: "Users retrieved successfully" })
  async findAll(
    @Query("page") page?: string, 
    @Query("limit") limit?: string, 
    @Query("search") search?: string
  ) {
    return this.userService.findAll(
      Number(page) || 1, 
      Number(limit) || 10, 
      search
    )
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, description: "User retrieved successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(id)
  }

  @Put(":id")
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Get('test/connection')
  @ApiOperation({ summary: 'Test database connection' })
  async testConnection() {
    try {
      const users = await this.userService.findAll(1, 5)
      return { 
        success: true, 
        message: 'Database connection successful',
        data: users 
      }
    } catch (error: any) {
      return { 
        success: false, 
        message: 'Database connection failed',
        error: error.message 
      }
    }
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  async remove(@Param("id") id: string) {
    return this.userService.remove(id)
  }
}