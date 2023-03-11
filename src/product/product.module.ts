import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {PrismaService} from "../prisma.service";
import {PaginationService} from "../pagination/pagination.service";
import {UserModule} from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, PaginationService]
})
export class ProductModule {}
