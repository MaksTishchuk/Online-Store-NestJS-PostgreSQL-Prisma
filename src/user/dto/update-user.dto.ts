import {IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class UpdateUserDto {
  @ApiProperty({
    description: 'Update user password',
    example: 'Qwerty135',
  })
  @IsOptional()
  @IsString()
  password?: string

  @ApiProperty({
    description: 'Update user name',
    example: 'maks',
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiModelPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsString()
  avatarPath?: string

  @ApiProperty({
    description: 'Update user phone',
    example: '0993332323',
  })
  @IsOptional()
  @IsString()
  phone?: string
}