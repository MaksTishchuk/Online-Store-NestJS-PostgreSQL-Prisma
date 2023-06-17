import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthUserDto} from "./dto/auth-user.dto";
import {RefreshTokenDto} from "./dto/refresh-token.dto";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({description: 'User registration'})
  @ApiOkResponse({
    description: 'User registration success',
    schema: {
      example: {
        user: {},
        accessToken: `accessToken string`,
        refreshToken: `refreshToken string`
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'User registration bad request',
    schema: {
      example: {
        statusCode: 400,
        message: "User already exist!",
        error: "Bad Request"
      }
    }
  })
  @HttpCode(200)
  @Post('register')
  async register(
    @Body() authUserDto: AuthUserDto
  ) {
    return this.authService.register(authUserDto)
  }

  @ApiOperation({description: 'User login'})
  @ApiOkResponse({
    description: 'User login success',
    schema: {
      example: {
        user: {},
        accessToken: `accessToken string`,
        refreshToken: `refreshToken string`
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'User login not found exception',
    schema: {
      example: {
        statusCode: 404,
        message: "Invalid credentials!",
        error: "Not found"
      }
    }
  })
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() authUserDto: AuthUserDto
  ) {
    return this.authService.login(authUserDto)
  }

  @ApiOperation({description: 'User refresh tokens'})
  @ApiOkResponse({
    description: 'Tokens refresh success',
    schema: {
      example: {
        user: {},
        accessToken: `accessToken string`,
        refreshToken: `refreshToken string`
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Token refresh Unauthorized Exception',
    schema: {
      example: {
        statusCode: 403,
        message: "Invalid Refresh token!",
        error: "Unauthorized"
      }
    }
  })
  @HttpCode(200)
  @Post('refresh-tokens')
  async refreshTokens(
    @Body() refreshTokenDto: RefreshTokenDto
  ) {
    return this.authService.refreshTokens(refreshTokenDto)
  }
}
