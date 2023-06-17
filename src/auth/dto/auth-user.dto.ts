import {IsEmail, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AuthUserDto {

  @ApiProperty({
    description: 'User email address',
    example: 'maks@gmail.com',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'User password. Must be at least 6 characters long',
    example: 'Qwerty123',
  })
  @MinLength(6, {
    message: 'Password must be at least 6 characters long'
  })
  @IsString()
  password: string
}