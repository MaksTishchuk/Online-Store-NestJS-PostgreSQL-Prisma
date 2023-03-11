import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthUserDto} from "./dto/auth-user.dto";
import {RefreshTokenDto} from "./dto/refresh-token.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register')
  async register(
    @Body() authUserDto: AuthUserDto
  ) {
    return this.authService.register(authUserDto)
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() authUserDto: AuthUserDto
  ) {
    return this.authService.login(authUserDto)
  }

  @HttpCode(200)
  @Post('refresh-tokens')
  async refreshTokens(
    @Body() refreshTokenDto: RefreshTokenDto
  ) {
    return this.authService.refreshTokens(refreshTokenDto)
  }
}
