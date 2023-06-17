import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UpdateUserDto} from "./dto/update-user.dto";
import {PrismaService} from "../prisma.service";
import {hash} from "argon2";
import {returnUserObject} from "./return-user.object";
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {

  constructor(
    private prismaService: PrismaService
  ) {}

  async getUser(id: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prismaService.user.findUnique({
      where: {id: id},
      select: {
        ...returnUserObject,
        ...selectObject
      }
    })
    if (!user) throw new NotFoundException('User not found!')
    delete user.password
    return user
  }

  async updateProfile(id: number, updateUserDto: UpdateUserDto) {
    await this.getUser(id)
    const updatedUser = await this.prismaService.user.update({
      where: {id},
      data: {
        name: updateUserDto.name,
        avatarPath: updateUserDto.avatarPath,
        phone: updateUserDto.phone
      }
    })
    delete updatedUser.password
    return updatedUser
  }

  async getUserByEmail(email: string, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prismaService.user.findUnique({
      where: {email},
      select: {
        ...returnUserObject,
        ...selectObject
      }
    })
    if (!user) throw new NotFoundException('User not found!')
    return user
  }

  async findUserByEmail(email: string, selectObject: Prisma.UserSelect = {}) {
    return await this.prismaService.user.findUnique({
      where: {email},
      select: {
        ...returnUserObject,
        ...selectObject
      }
    })
  }
}
