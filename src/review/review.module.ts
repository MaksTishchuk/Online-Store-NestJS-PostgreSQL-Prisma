import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import {PrismaService} from "../prisma.service";
import {UserModule} from "../user/user.module";
import {ProductModule} from "../product/product.module";

@Module({
  imports: [UserModule, ProductModule],
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService]
})
export class ReviewModule {}
