import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {PrismaService} from "../prisma.service";
import {UserModule} from "../user/user.module";
import {PaginationModule} from "../pagination/pagination.module";
import {CategoryModule} from "../category/category.module";

@Module({
  imports: [UserModule, CategoryModule, PaginationModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  exports: [ProductService]
})
export class ProductModule {}
