import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {PrismaService} from "../prisma.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getJwtConfig} from "../config/jwt.config";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService]
})
export class AuthModule {}
