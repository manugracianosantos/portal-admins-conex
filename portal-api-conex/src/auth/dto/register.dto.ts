import { IsEmail, IsString, MinLength, MaxLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class RegisterDto {
  @ApiProperty({ example: "admin@conex.com" })
  @IsEmail()
  email: string

  @ApiProperty({ example: "Admin User" })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string

  @ApiProperty({ example: "password123" })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string
}
