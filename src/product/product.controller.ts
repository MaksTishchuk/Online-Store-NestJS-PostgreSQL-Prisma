import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put, Query, UseGuards
} from '@nestjs/common';
import { ProductService } from './product.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CreateProductDto} from "./dto/create-product.dto";
import {FiltersProductsDto} from "./dto/filters-products.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminRoleGuard} from "../user/guards/admin-role.guard";
import {ApiTags} from "@nestjs/swagger";

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async createProduct(@Body() productDto: CreateProductDto) {
    return this.productService.createProduct(productDto)
  }

  @Get('')
  @HttpCode(200)
  async getProducts(@Query() filtersProductsDto: FiltersProductsDto) {
    return this.productService.getProducts(filtersProductsDto)
  }

  @Get(':id')
  @HttpCode(200)
  @Auth()
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProduct(id)
  }

  @Get('by-slug/:slug')
  @HttpCode(200)
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.getProductBySlug(slug)
  }

  @Get('by-category-slug/:categorySlug')
  @HttpCode(200)
  async getProductsByCategorySlug(@Param('categorySlug') categorySlug: string) {
    return this.productService.getProductsByCategorySlug(categorySlug)
  }

  @Get('similar-products/:id')
  @HttpCode(200)
  @Auth()
  async getSimilarProducts(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getSimilarProducts(id)
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productDto: UpdateProductDto
  ) {
    return this.productService.updateProduct(id, productDto)
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id)
  }
}
