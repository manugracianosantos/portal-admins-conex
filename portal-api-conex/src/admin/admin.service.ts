import { Injectable, NotFoundException, ConflictException, BadRequestException } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { PrismaService } from "../prisma/prisma.service"
import { UpdateAdminDto } from "./dto/update-admin.dto"
import { UpdatePasswordDto } from "./dto/update-password.dto"

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getProfile(adminId: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        email: true,
        name: true,
        photoUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!admin) {
      throw new NotFoundException("Admin not found")
    }

    return admin
  }

  async updateProfile(adminId: string, updateAdminDto: UpdateAdminDto) {
    // Check if email is being changed and if it's already in use
    if (updateAdminDto.email) {
      const existingAdmin = await this.prisma.admin.findUnique({
        where: { email: updateAdminDto.email },
      })

      if (existingAdmin && existingAdmin.id !== adminId) {
        throw new ConflictException("Email already in use")
      }
    }

    const admin = await this.prisma.admin.update({
      where: { id: adminId },
      data: updateAdminDto,
      select: {
        id: true,
        email: true,
        name: true,
        photoUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return admin
  }

  async updatePassword(adminId: string, updatePasswordDto: UpdatePasswordDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    })

    if (!admin) {
      throw new NotFoundException("Admin not found")
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(updatePasswordDto.currentPassword, admin.password)

    if (!isPasswordValid) {
      throw new BadRequestException("Current password is incorrect")
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10)

    await this.prisma.admin.update({
      where: { id: adminId },
      data: { password: hashedPassword },
    })

    return { message: "Password updated successfully" }
  }

  async updatePhoto(adminId: string, photoUrl: string) {
    const admin = await this.prisma.admin.update({
      where: { id: adminId },
      data: { photoUrl },
      select: {
        id: true,
        email: true,
        name: true,
        photoUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return admin
  }
}
