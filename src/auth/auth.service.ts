import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import {AuthUserDto} from "./dto/auth-user.dto";
import {PrismaService} from "../prisma.service";
import {hash, verify} from "argon2";
import {JwtService} from "@nestjs/jwt";
import { User } from '@prisma/client';
import {RefreshTokenDto} from "./dto/refresh-token.dto";

@Injectable()
export class AuthService {

  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(authUserDto: AuthUserDto ) {
    const existUser = await this.prismaService.user.findUnique({
      where: {email: authUserDto.email}
    })
    if (existUser) throw new BadRequestException('User already exist!')

    const user = await this.prismaService.user.create({
      data: {
        email: authUserDto.email,
        password: await hash(authUserDto.password),
        name: ""
      }
    })
    const tokens = await this.generateTokens(user.id)
    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }

  async login(authUserDto: AuthUserDto) {
    const user = await this.validateUser(authUserDto)
    const tokens = await this.generateTokens(user.id)
    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const result = await this.jwtService.verify(refreshTokenDto.refreshToken)
    if (!result) throw new UnauthorizedException('Invalid Refresh token')
    const user = await this.prismaService.user.findUnique({
      where: {id: result.id}
    })
    const tokens = await this.generateTokens(user.id)
    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }

  private async generateTokens(userId: number) {
    const data = {id: userId}

    const accessToken = this.jwtService.sign(data, {
      expiresIn: "1h"
    })
    const refreshToken = this.jwtService.sign(data, {
      expiresIn: "7d"
    })
    return {accessToken, refreshToken}
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email
    }
  }

  private async validateUser(authUserDto: AuthUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {email: authUserDto.email}
    })
    if (!user) throw new NotFoundException('Invalid credentials!')
    const isValid = await verify(user.password, authUserDto.password)
    if (!isValid) throw new NotFoundException('Invalid credentials!')
    return user
  }
}
