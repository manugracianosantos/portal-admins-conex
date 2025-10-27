import {
  Controller,
  Get,
  Put,
  Patch,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UploadedFile,
  Req,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from "@nestjs/swagger"
import { AdminService } from "./admin.service"
import { UpdateAdminDto } from "./dto/update-admin.dto"
import { UpdatePasswordDto } from "./dto/update-password.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { UploadService } from "../upload/upload.service"
import  { Express } from "express"

@ApiTags("Admin Profile")
@Controller("admin")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly uploadService: UploadService,
  ) {}

  @Get("profile")
  @ApiOperation({ summary: "Get admin profile" })
  @ApiResponse({ status: 200, description: "Profile retrieved successfully" })
  async getProfile(@Req() req: any) {
    return this.adminService.getProfile(req.user.id)
  }

  @Put("profile")
  @ApiOperation({ summary: "Update admin profile" })
  @ApiResponse({ status: 200, description: "Profile updated successfully" })
  async updateProfile(@Req() req: any, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateProfile(req.user.id, updateAdminDto)
  }

  @Patch("password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update admin password" })
  @ApiResponse({ status: 200, description: "Password updated successfully" })
  async updatePassword(@Req() req: any, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.adminService.updatePassword(req.user.id, updatePasswordDto)
  }

  @Post("photo")
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Upload admin photo" })
  @ApiResponse({ status: 200, description: "Photo uploaded successfully" })
  async uploadPhoto(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    const photoUrl = await this.uploadService.uploadFile(file)
    return this.adminService.updatePhoto(req.user.id, photoUrl)
  }
}