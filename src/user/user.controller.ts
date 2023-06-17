import {Body, Controller, Get, HttpCode, Param, ParseIntPipe, Patch, Put} from '@nestjs/common';
import { UserService } from './user.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {GetUser} from "../auth/decorators/get-user.decorator";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiConsumes, ApiTags} from "@nestjs/swagger";

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@GetUser('id') id: number) {
    return this.userService.getUser(id)
  }

  @ApiConsumes('multipart/form-data')
  @Put('profile')
  @HttpCode(200)
  @Auth()
  async updateProfile(
    @GetUser('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateProfile(id, updateUserDto)
  }
}
