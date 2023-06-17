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
import { ReviewService } from './review.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {GetUser} from "../auth/decorators/get-user.decorator";
import {ReviewDto} from "./dto/review.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AdminRoleGuard} from "../user/guards/admin-role.guard";
import {ApiTags} from "@nestjs/swagger";

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create/:productId')
  @HttpCode(200)
  @Auth()
  async createReview(
    @GetUser('id') userId: number,
    @Body() reviewDto: ReviewDto,
    @Param('productId', ParseIntPipe) productId: number
  ) {
    return this.reviewService.createReview(userId, reviewDto, productId)
  }

  @Get('')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async getReviews() {
    return this.reviewService.getReviews()
  }

  @Get(':id')
  @HttpCode(200)
  @Auth()
  async getReview(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.reviewService.getReview(id)
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() reviewDto: ReviewDto
  ) {
    return this.reviewService.updateReview(id, reviewDto)
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  async deleteReview(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.reviewService.deleteReview(id)
  }
}
