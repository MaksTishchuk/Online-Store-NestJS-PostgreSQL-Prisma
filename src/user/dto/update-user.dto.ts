import {IsOptional, IsString} from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  avatarPath?: string

  @IsOptional()
  @IsString()
  phone?: string
}