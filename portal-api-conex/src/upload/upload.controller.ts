import { Controller, Post, UseInterceptors, UploadedFile, UseGuards } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from "@nestjs/swagger"
import type { Express } from "express"
import type { UploadService } from "./upload.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("Upload")
@Controller("upload")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Upload a file" })
  @ApiResponse({ status: 200, description: "File uploaded successfully" })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.uploadService.uploadFile(file)
    return { url }
  }
}
