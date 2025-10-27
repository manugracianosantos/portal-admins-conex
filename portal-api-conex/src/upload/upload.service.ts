import { Injectable, BadRequestException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { v2 as cloudinary } from "cloudinary"
import * as fs from "fs"
import * as path from "path"
import { Express } from "express"

@Injectable()
export class UploadService {
  private useCloudinary: boolean

  constructor(private configService: ConfigService) {
    const cloudName = this.configService.get<string>("CLOUDINARY_CLOUD_NAME")
    const apiKey = this.configService.get<string>("CLOUDINARY_API_KEY")
    const apiSecret = this.configService.get<string>("CLOUDINARY_API_SECRET")

    this.useCloudinary = !!(cloudName && apiKey && apiSecret)

    if (this.useCloudinary) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      })
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException("No file provided")
    }

    const maxSize = this.configService.get<number>("MAX_FILE_SIZE") || 5242880 // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException("File size exceeds maximum allowed size")
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException("Invalid file type. Only JPEG, PNG, and WebP are allowed")
    }

    if (this.useCloudinary) {
      return this.uploadToCloudinary(file)
    } else {
      return this.uploadToLocal(file)
    }
  }

  private async uploadToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "conex-admin" }, (error, result) => {
          if (error) return reject(error)
          resolve(result.secure_url)
        })
        .end(file.buffer)
    })
  }

  private async uploadToLocal(file: Express.Multer.File): Promise<string> {
    const uploadDir = this.configService.get<string>("UPLOAD_DEST") || "./uploads"

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const filename = `${Date.now()}-${file.originalname}`
    const filepath = path.join(uploadDir, filename)

    fs.writeFileSync(filepath, file.buffer)

    // Return relative URL
    return `/uploads/${filename}`
  }
}
