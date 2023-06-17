import {Module} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { StatisticsModule } from './statistics/statistics.module';
import { PaginationModule } from './pagination/pagination.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {PrismaService} from "./prisma.service";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ServeStaticModule.forRoot({serveRoot: '/images', rootPath: path.resolve(__dirname, 'static')}),
    AuthModule,
    UserModule,
    ProductModule,
    ReviewModule,
    CategoryModule,
    OrderModule,
    StatisticsModule,
    PaginationModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
