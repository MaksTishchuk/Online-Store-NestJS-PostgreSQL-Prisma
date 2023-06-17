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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam, ApiSecurity,
  ApiTags
} from "@nestjs/swagger";
import {CategoryEntity} from "./category.entity";
import {returnCategoryObject} from "./return-category.object";

@Controller('categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({description: 'Create category'})
  @ApiSecurity('bearer')
  @ApiCreatedResponse({
    description: 'Category created successfully',
    type: CategoryEntity
  })
  @Post('')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async createCategory(
    @Body() categoryDto: CategoryDto
  ) {
    return this.categoryService.createCategory(categoryDto)
  }

  @ApiOperation({description: 'Get all categories'})
  @ApiOkResponse({
    description: 'Get all categories success',
    type: CategoryEntity,
    isArray: true
  })
  @Get('')
  @HttpCode(200)
  async getCategories() {
    return this.categoryService.getCategories()
  }

  @ApiOperation({description: 'Get one category'})
  @ApiSecurity('bearer')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a category that exists in the database',
    type: Number
  })
  @ApiOkResponse({
    description: 'Get one category success',
    type: CategoryEntity
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    schema: {
      example: {
        statusCode: 404,
        message: "Category not found!",
        error: "Not found"
      }
    }
  })
  @Get(':id')
  @HttpCode(200)
  @Auth()
  async getCategory(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.categoryService.getCategory(id)
  }

  @ApiOperation({description: 'Get one category by slug'})
  @ApiParam({
    name: 'slug',
    required: true,
    description: 'Should be a slug of a category that exists in the database',
    type: Number
  })
  @ApiOkResponse({
    description: 'Get one category success',
    type: CategoryEntity
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    schema: {
      example: {
        statusCode: 404,
        message: "Category not found!",
        error: "Not found"
      }
    }
  })
  @Get('by-slug/:slug')
  @HttpCode(200)
  async getCategoryBySlug(
    @Param('slug') slug: string
  ) {
    return this.categoryService.getCategoryBySlug(slug)
  }

  @ApiOperation({description: 'Update one category'})
  @ApiSecurity('bearer')
  @Put(':id')
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
