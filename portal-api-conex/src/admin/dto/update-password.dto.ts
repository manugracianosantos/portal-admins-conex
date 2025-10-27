import { IsString, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  currentPassword: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  newPassword: string
}
