import {Controller, Get} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {GetUser} from "../auth/decorators/get-user.decorator";

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('main')
  @Auth()
  getMainStatistics(@GetUser('id') id: number) {
    return this.statisticsService.getMain(id)
  }
}
