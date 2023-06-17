import {Controller, Get, UseGuards} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {GetUser} from "../auth/decorators/get-user.decorator";
import {ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminRoleGuard} from "../user/guards/admin-role.guard";

@Controller('statistics')
@ApiTags('Statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('main')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  getMainStatistics() {
    return this.statisticsService.getMainStatistics()
  }

  @Get('user-statistics')
  @Auth()
  getUserStatistics(@GetUser('id') id: number) {
    return this.statisticsService.getUserStatistics(id)
  }
}
