import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put, UseGuards
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {GetUser} from "../auth/decorators/get-user.decorator";
import {CategoryDto} from "./dto/category.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminRoleGuard} from "../user/guards/admin-role.guard";

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async createCategory(
    @Body() categoryDto: CategoryDto
  ) {
    return this.categoryService.createCategory(categoryDto)
  }

  @Get('')
  @HttpCode(200)
  async getCategories() {
    return this.categoryService.getCategories()
  }

  @Get(':id')
  @HttpCode(200)
  @Auth()
  async getCategory(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.categoryService.getCategory(id)
  }

  @Get('by-slug/:slug')
  @HttpCode(200)
  async getCategoryBySlug(
    @Param('slug') slug: string
  ) {
    return this.categoryService.getCategoryBySlug(slug)
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryDto: CategoryDto
  ) {
    return this.categoryService.updateCategory(id, categoryDto)
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.categoryService.deleteCategory(id)
  }
}
