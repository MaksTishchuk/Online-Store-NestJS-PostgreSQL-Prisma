import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import {PrismaService} from "../prisma.service";
import {UserModule} from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService]
})
export class ReviewModule {}
