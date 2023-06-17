import { EnumUserRoles, User} from '@prisma/client';
import {ApiProperty} from '@nestjs/swagger';

export class UserEntity implements User {

  @ApiProperty({example: 1})
  id: number

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string

  @ApiProperty()
  role: EnumUserRoles

  @ApiProperty()
  name: string

  @ApiProperty()
  avatarPath: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}