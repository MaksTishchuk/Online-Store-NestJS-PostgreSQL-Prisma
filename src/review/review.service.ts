import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {ReviewDto} from "./dto/review.dto";
import {returnReviewObject} from "./return-review.object";

@Injectable()
export class ReviewService {
  constructor(
    private prismaService: PrismaService
  ) {}

  async createReview(userId: number, reviewDto: ReviewDto, productId: number) {
    return await this.prismaService.review.create({
      data: {
        rating: reviewDto.rating,
        text: reviewDto.text,
        product: {
          connect: {id: productId}
        },
        user: {
          connect: {id: userId}
        }
      }
    })
  }

  async getReviews() {
    return await this.prismaService.review.findMany({
      orderBy: {createdAt: 'desc'},
      select: returnReviewObject
    })
  }

  async getReview(id: number) {
    const category = await this.prismaService.review.findUnique({
      where: {id: id},
      select: returnReviewObject,
    })
    if (!category) throw new NotFoundException('Review not found!')
    return category
  }

  async getAverageValueByProductId(productId: number) {
    return this.prismaService.review.aggregate({
      where: { productId },
      _avg: { rating: true }
    }).then(data => data._avg)
  }

  async updateReview(id: number, reviewDto: ReviewDto) {
    return await this.prismaService.review.update({
      where: {id: id},
      data: {
        rating: reviewDto.rating,
        text: reviewDto.text
      }
    })
  }

  async deleteReview(id: number) {
    return await this.prismaService.review.delete({where: {id}})
  }
}
